"""Verify this case's local references and source revision; no application test claim."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
CASE = OUT.parent
ROOT = Path(r'E:\work\yxyw\yxyw-safe-check')
errors, checks = [], []
inv = json.loads((OUT/'source-inventory.json').read_text(encoding='utf-8'))
refs = json.loads((OUT/'source-refs.json').read_text(encoding='utf-8'))
commits = json.loads((OUT/'wutea-commits.json').read_text(encoding='utf-8'))
def check(label, condition):
    checks.append(dict(check=label, passed=bool(condition)))
    if not condition:
        errors.append(label)
revision = subprocess.check_output(['git','-C',str(ROOT),'rev-parse','HEAD'], text=True).strip()
status = subprocess.check_output(['git','-C',str(ROOT),'status','--porcelain'], text=True).strip()
check('Source HEAD unchanged', revision == inv['head'])
check('Source tracked/untracked status unchanged', status == inv['worktree_status'] == '')
check('Exact-author all-ref inventory = 88', len(commits)==88 and all(c['author']=='wutea' for c in commits))
check('HEAD reachable wutea commits = 81', sum(c['reachable_from_head'] for c in commits)==81)
check('No wutea merge commits in inventory', all(len(c['parents'])<=1 for c in commits))
for ref in refs:
    raw = (ROOT/ref['path']).read_bytes()
    check(ref['id']+' source hash and anchor', hashlib.sha256(raw).hexdigest()==ref['sha256']
          and ref['anchor'] in raw.decode('utf-8-sig').splitlines()[ref['line']-1])
link_count = 0
for md in CASE.rglob('*.md'):
    text = md.read_text(encoding='utf-8')
    for match in re.finditer(r'(?<!!)\[[^\]\n]+\]\(([^)\n]+)\)', text):
        target = match[1].strip('<>')
        if target.startswith(('http:', 'https:')):
            continue
        target, _, fragment = target.partition('#')
        target = re.sub(r':\d+$', '', target)
        path = Path(target) if re.match(r'^[A-Za-z]:[/\\]', target) else (md.parent/target)
        link_count += 1
        if not path.exists():
            errors.append(f'Broken link: {md.name}: {match[1]}')
        elif fragment and path.suffix=='.md':
            # All fragment links in this case use uncomplicated heading IDs.
            headings = [re.sub(r'\s+', '-', h.strip().lower()) for h in
                        re.findall(r'^#+\s+(.+)$', path.read_text(encoding='utf-8'), re.M)]
            if fragment not in headings:
                errors.append(f'Missing heading: {md.name}: {fragment}')
    if '-----BEGIN PRIVATE KEY-----' in text or re.search(r'[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}', text):
        errors.append(f'Unexpected credential/private identity material in {md.name}')
probe = json.loads((OUT/'distance-probe.json').read_text(encoding='utf-8'))
check('Probe uses same revision and source hash', probe['revision']==revision and probe['sha256']==next(r['sha256'] for r in refs if r['id']=='S12'))
check('Three numeric examples executed; reference mismatch observed', len(probe['samples'])==3 and probe['observed_disagreement'])
report = dict(date='2026-09-13', reviewer='Codex self-check; no independent human acceptance',
              revision=revision, checks=checks, markdown_links_checked=link_count, errors=errors,
              status='pass' if not errors else 'revise',
              exclusions=['Full Gradle build', 'HTTP integration', 'Database execution', 'Broker delivery',
                          'Performance', 'Business acceptance', 'All-source semantic understanding'],
              artifacts={str(p.relative_to(CASE)).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest()
                         for p in CASE.rglob('*') if p.is_file() and p.name!='verification.json'})
(OUT/'verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(dict(status=report['status'], checks=len(checks), links=link_count, errors=errors), ensure_ascii=False))
raise SystemExit(bool(errors))
