"""Package only the synthetic portable demo; exclude the private case/source materials."""
from pathlib import Path
import hashlib,json,re,subprocess,zipfile

REPO=Path(__file__).resolve().parents[4]
DEMO=REPO/'demos/recommend-lines'
OUT=Path(__file__).resolve().parent
# The public guide is generated from the beginner article; private review material is excluded.
article=(OUT.parent/'route-recommendation.md').read_text(encoding='utf-8').split('<details>',1)[0]
article=article.replace('../../../demos/recommend-lines/index.html','index.html').replace('../../../demos/recommend-lines/README.md','README.md')
(DEMO/'guide.md').write_text(article,encoding='utf-8')
names=['guide.md','index.html','style.css','app.js','fixtures.js','engine.js','server.js','test.js','start.cmd','README.md']
forbidden=['渝西','wutea','yxyw','com.ecidi','fawkes','Administrator']
violations=[]
for name in names:
    content=(DEMO/name).read_text(encoding='utf-8')
    for term in forbidden:
        if term in content:violations.append(f'{name}: prohibited private identifier')
    if re.search(r'[A-Z]:[\\/](?:work|file|Users)[\\/]',content):violations.append(f'{name}: absolute private path')
    if re.search(r'[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}',content):violations.append(f'{name}: email')
    if re.search(r'-----BEGIN .*PRIVATE KEY-----',content):violations.append(f'{name}: private key')
    for ip in re.findall(r'\b(?:\d{1,3}\.){3}\d{1,3}\b',content):
        if ip!='127.0.0.1':violations.append(f'{name}: unexpected IP')
assert not violations,violations
tests=subprocess.run(['node','test.js'],cwd=DEMO,capture_output=True,text=True,encoding='utf-8')
assert tests.returncode==0,tests.stdout+tests.stderr
(OUT/'demo-test-output.txt').write_text(tests.stdout,encoding='utf-8')
ui=json.loads((REPO/'output/playwright/recommend-lines/ui-checks.json').read_text(encoding='utf-8'))
assert ui['status']=='pass'
target=REPO/'output/recommend-lines-demo.zip'
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
    for name in names:z.write(DEMO/name,'recommend-lines/'+name)
with zipfile.ZipFile(target) as z:
    assert sorted(z.namelist())==sorted('recommend-lines/'+n for n in names)
    assert z.testzip() is None
report={'date':'2026-09-13','status':'pass','artifact':str(target),'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),
        'privacy':{'method':'independent synthetic fixtures, not reversible masking of private records',
                   'files_scanned':len(names),'violations':violations,'original_images_documents_history_included':False,
                   'scope':'portable demo allowlist; private workspace case retains source references'},
        'algorithm_http_tests':{'command':'node test.js','passed':11,'output':'demo-test-output.txt'},
        'browser_checks':ui,'source_runtime':'Node.js '+subprocess.check_output(['node','--version'],text=True).strip(),
        'artifact_files':{name:hashlib.sha256((DEMO/name).read_bytes()).hexdigest() for name in names},
        'limits':['JavaScript behavior port, not full Java service','No production data or services','No performance or business acceptance'],
        'word_evidence':'submission-doc-source.json'}
(OUT/'demo-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'status':'pass','package':str(target),'files':len(names),'tests':11,'browser_checks':len(ui['checks'])},ensure_ascii=False))
