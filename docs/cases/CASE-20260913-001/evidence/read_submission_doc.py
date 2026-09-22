"""Index source DOCX structure without retaining original text/images or metadata identities."""
from zipfile import ZipFile
from xml.etree import ElementTree as E
from pathlib import Path
import hashlib,json

source=Path(r'E:\file\文档\word源文件\渝西运维巡检任务提交流程优化方案.docx')
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(source) as z:
    root=E.fromstring(z.read('word/document.xml'))
    paragraphs=[''.join(t.text or '' for t in p.findall('.//w:t',ns)) for p in root.findall('.//w:p',ns)]
    paragraphs=[s for s in paragraphs if s.strip()]
    result={'source':str(source),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
      'read_date':'2026-09-13','nonempty_paragraphs':len(paragraphs),'tables':len(root.findall('.//w:tbl',ns)),
      'insertions':len(root.findall('.//w:ins',ns)),'deletions':len(root.findall('.//w:del',ns)),
      'has_comments_part':'word/comments.xml' in z.namelist(),
      'media':[{'part':n,'sha256':hashlib.sha256(z.read(n)).hexdigest(),'reviewed':True} for n in z.namelist() if n.startswith('word/media/')],
      'reading_method':'All 56 nonempty OOXML paragraphs including table cells, all 4 embedded images visually inspected; no page-number claims',
      'render_gap':'Bundled runtime has no LibreOffice; no DOCX page render. Original document unchanged.',
      'document_status':'Source-authored account and proposal; not independently measured performance evidence',
      'source_locators':[
        {'paragraphs':'P003-P017','topic':'Attachment volume and synchronous write latency as two stages of perceived submission failure'},
        {'paragraphs':'P018-P029','topic':'Document reports attachment preupload/fileToken change completed, qualitative benefits'},
        {'paragraphs':'P030-P042','topic':'Storage section heading in progress plus completion annotation 2025-05-28 15:00; MQ rationale and expected benefits'},
        {'paragraphs':'P043-P056','topic':'Risk table: dead letter, idempotency, bounded delayed retry'},
        {'media':'image3.jpeg','topic':'Redis replay idea, dead letters and identity/retry assumptions in diagram notes'}],
      'privacy':'No full source text, original illustrations, author identity, watermark identity or DOCX core properties retained here; demo is independently synthetic'}
Path(__file__).with_name('submission-doc-source.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'paragraphs':len(paragraphs),'media':len(result['media']),'tables':result['tables']},ensure_ascii=False))
