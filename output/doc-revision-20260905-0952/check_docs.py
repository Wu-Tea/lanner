"""One-off validation for the authorized Markdown revision; not a product test suite."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import difflib
import json
import re
import sys
from markdown_it import MarkdownIt
import yaml

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
md = MarkdownIt().enable('table')
changed = (OUT / 'files.txt').read_text(encoding='utf-8-sig').splitlines()
decision = '.agent-context/decisions/DEC-2026-09-05-001-staged-validation-and-evidence-review.md'
changed.append(decision)
paths = list(dict.fromkeys(changed + [str(p.relative_to(ROOT)).replace('\\', '/') for p in (ROOT / 'docs/contracts').glob('*.md')]))
errors = []
links_checked = 0
yaml_checked = 0
parsed = {}

def parse(path):
    path = path.resolve()
    if path not in parsed:
        body = path.read_text(encoding='utf-8-sig')
        parsed[path] = (body, md.parse(body))
    return parsed[path]

def anchors(tokens):
    found, counts = set(), {}
    for i, token in enumerate(tokens):
        if token.type == 'heading_open':
            content = tokens[i + 1].content
            content = re.sub(r'[`*_]', '', content).lower().strip()
            slug = re.sub(r'[^\w\- ]', '', content).replace(' ', '-')
            count = counts.get(slug, 0)
            counts[slug] = count + 1
            found.add(slug if count == 0 else f'{slug}-{count}')
    return found

for relative in paths:
    path = ROOT / relative
    body, tokens = parse(path)
    if '\ufffd' in body:
        errors.append(f'{relative}: replacement character in text')
    if re.search(r'^(<{7}|={7}|>{7})( |$)', body, re.M):
        errors.append(f'{relative}: possible merge marker')
    fence = None
    for n, line in enumerate(body.splitlines(), 1):
        match = re.match(r'^\s{0,3}(`{3,}|~{3,})(.*)$', line)
        if not match:
            continue
        marker, tail = match.groups()
        if fence is None:
            fence = (marker[0], len(marker), n)
        elif marker[0] == fence[0] and len(marker) >= fence[1] and not tail.strip():
            fence = None
    if fence:
        errors.append(f'{relative}:{fence[2]}: unclosed fence')
    for token in tokens:
        if token.type == 'fence' and token.info.strip() in {'yaml', 'yml'}:
            try:
                yaml.safe_load(token.content)
                yaml_checked += 1
            except yaml.YAMLError as exc:
                errors.append(f'{relative}: invalid YAML example: {exc}')
        for child in token.children or []:
            if child.type != 'link_open':
                continue
            href = child.attrGet('href')
            parts = urlsplit(href)
            if parts.scheme or parts.netloc:
                continue
            target = (path.parent / unquote(parts.path)).resolve() if parts.path else path
            links_checked += 1
            if not target.exists():
                errors.append(f'{relative}: missing local link {href}')
            elif parts.fragment and target.suffix == '.md':
                if unquote(parts.fragment) not in anchors(parse(target)[1]):
                    errors.append(f'{relative}: missing heading {href}')

cases = (ROOT / 'docs/validation/golden-cases.md').read_text(encoding='utf-8')
ids = re.findall(r'^## \d+\. (GC-\d{3})\b', cases, re.M)
expected = [f'GC-{i:03}' for i in range(1, 15)]
if ids != expected:
    errors.append(f'case IDs mismatch: {ids}')
for name in ('session-log.md',):
    relative = f'.agent-context/{name}'
    before = (OUT / 'before' / relative).read_text(encoding='utf-8')
    after = (ROOT / relative).read_text(encoding='utf-8')
    if not after.startswith(before.rstrip()):
        errors.append(f'{relative}: existing history was changed')
before_agents = (OUT / 'before/AGENTS.md').read_text(encoding='utf-8').splitlines()
after_agents = iter((ROOT / 'AGENTS.md').read_text(encoding='utf-8').splitlines())
if not all(any(current == old for current in after_agents) for old in before_agents):
    errors.append('AGENTS.md: pre-existing instructions were removed or changed')

patches, stats = [], []
for relative in changed:
    before_path, after_path = OUT / 'before' / relative, ROOT / relative
    before = before_path.read_text(encoding='utf-8').splitlines(keepends=True) if before_path.exists() else []
    after = after_path.read_text(encoding='utf-8').splitlines(keepends=True)
    patch = list(difflib.unified_diff(before, after, fromfile=f'a/{relative}' if before_path.exists() else '/dev/null', tofile=f'b/{relative}'))
    patches.extend(patch)
    stats.append({'file': relative, 'before_lines': len(before), 'after_lines': len(after), 'changed': bool(patch)})
(OUT / 'changes.patch').write_text(''.join(patches), encoding='utf-8')
report = {'status': 'pass' if not errors else 'fail', 'markdown_files': len(paths), 'local_links_and_anchors': links_checked, 'yaml_examples': yaml_checked, 'case_ids': ids, 'session_history_preserved': not any('existing history' in e for e in errors), 'errors': errors, 'changes': stats, 'limits': ['Static documentation checks only', 'No Golden Run, runtime test, reuse experiment or reader study performed', 'GitHub-style heading slugs approximated; linked headings are also reviewed manually']}
(OUT / 'verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({k: v for k, v in report.items() if k != 'changes'}, ensure_ascii=False, indent=2))
print('\n'.join(f"{s['file']}: {s['before_lines']} -> {s['after_lines']} lines" for s in stats))
sys.exit(bool(errors))
