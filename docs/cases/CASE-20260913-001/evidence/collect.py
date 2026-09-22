"""Read-only local Git inventory for the yxyw-safe-check documentation case.

Writes only beside this script. No remote fetch, source edits, or credential values.
"""
from pathlib import Path
from collections import Counter
import hashlib
import json
import re
import subprocess

ROOT = Path(r'E:\work\yxyw\yxyw-safe-check')
OUT = Path(__file__).resolve().parent

def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args], encoding='utf-8').strip()

def save(name, value):
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

head = git('rev-parse', 'HEAD')
head_commits = set(git('rev-list', 'HEAD').splitlines())
commits = []
for line in git('log', '--all', '--format=%H%x09%ad%x09%an%x09%P%x09%s', '--date=short').splitlines():
    sha, date, author, parents, subject = line.split('\t', 4)
    if author != 'wutea':
        continue
    paths = git('diff-tree', '--root', '--no-commit-id', '--name-only', '-r', sha).splitlines()
    commits.append(dict(commit=sha, date=date, author=author, parents=parents.split(),
                        subject=subject, reachable_from_head=sha in head_commits, paths=paths))
save('wutea-commits.json', commits)
paths = Counter(p for c in commits if c['reachable_from_head'] for p in c['paths'])
all_paths = Counter(p for c in commits for p in c['paths'])
tracked = git('ls-files').splitlines()
java = [p for p in tracked if p.startswith('src/main/java/') and p.endswith('.java')]
controllers = []
for p in java:
    if not p.endswith('Controller.java'):
        continue
    source = (ROOT / p).read_text(encoding='utf-8')
    annotations = [dict(line=i, text=line.strip()) for i, line in enumerate(source.splitlines(), 1)
                   if re.match(r'\s*@(Api\(|.*Mapping\b)', line)]
    controllers.append(dict(path=p, annotations=annotations))
save('controller-inventory.json', controllers)
save('source-inventory.json', dict(
    date='2026-09-13', root=str(ROOT), head=head, branch=git('branch', '--show-current'),
    worktree_status=git('status', '--porcelain'), shallow=git('rev-parse', '--is-shallow-repository'),
    tracked_files=len(tracked), java_files=len(java),
    java_packages=dict(Counter(str(Path(p).parent).replace('\\', '/') for p in java)),
    controller_files=len(controllers), test_paths=[p for p in tracked if '/test/' in p],
    wutea_all_refs=len(commits), wutea_head=sum(c['reachable_from_head'] for c in commits),
    wutea_merges=sum(len(c['parents']) > 1 for c in commits),
    wutea_date_range=[min(c['date'] for c in commits), max(c['date'] for c in commits)],
    changed_paths_head=dict(paths.most_common()), changed_paths_all=dict(all_paths.most_common()),
    refs_not_fetched=True, author_identity='Exact raw Git author name; email and aliases not recorded',
    inventory_is_not_read_coverage=True))
print(json.dumps(dict(head=head, commits_all=len(commits), commits_head=sum(c['reachable_from_head'] for c in commits),
                     paths_head=len(paths), paths_all=len(all_paths), java=len(java), controllers=len(controllers),
                     top_paths=paths.most_common(16), other_ref_commits=[c['commit'][:8] for c in commits if not c['reachable_from_head']]), ensure_ascii=False))
