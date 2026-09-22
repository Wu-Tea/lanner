from pathlib import Path
import json
from playwright.sync_api import sync_playwright

OUT=Path(__file__).resolve().parent
checks=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    page=browser.new_page(viewport={'width':1440,'height':1080},device_scale_factor=1)
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto('http://127.0.0.1:4173')
    page.get_by_role('button',name='查看路线1',exact=True).wait_for()
    checks.append({'check':'initial_three_candidates','passed':page.locator('.route-button').count()==3})
    page.get_by_role('button',name='查看路线2',exact=True).click()
    checks.append({'check':'route_selection','passed':page.get_by_role('button',name='查看路线2',exact=True).get_attribute('aria-pressed')=='true'})
    page.screenshot(path=str(OUT/'desktop.png'),full_page=True,animations='disabled')
    page.get_by_role('button',name='距离校正对照',exact=True).click()
    page.get_by_role('button',name='生成候选路线').click()
    page.wait_for_function("document.querySelector('#run-status').textContent.startsWith('已完成')")
    checks.append({'check':'corrected_mode','passed':'距离校正对照' in page.locator('#notice').inner_text()})
    page.locator('#scenario').select_option('large')
    page.get_by_role('button',name='生成候选路线').click()
    page.wait_for_function("document.querySelector('#summary').textContent.includes('11 个候选')")
    checks.append({'check':'large_scenario','passed':True})
    page.get_by_role('tab',name='请求与响应').click()
    checks.append({'check':'request_tab','passed':page.locator('#query-json').is_visible()})
    page.locator('#query-json').fill('{')
    page.get_by_role('button',name='用这个请求计算',exact=True).click()
    checks.append({'check':'invalid_json_message','passed':'JSON' in page.locator('#error').inner_text()})
    page.get_by_role('button',name='重置示例').click()
    page.wait_for_function("document.querySelector('#run-status').textContent.startsWith('已完成')")
    page.locator('#scenario').select_option('single')
    page.get_by_role('button',name='生成候选路线').click()
    page.wait_for_function("document.querySelector('#summary').textContent.includes('0 个候选')")
    checks.append({'check':'single_empty_state','passed':page.locator('.route-button').count()==0})
    page.locator('#scenario').select_option('missing')
    page.get_by_role('button',name='距离校正对照',exact=True).click()
    page.get_by_role('button',name='生成候选路线').click()
    page.locator('#error').wait_for(state='visible')
    checks.append({'check':'missing_coordinate_error','passed':'缺少坐标' in page.locator('#error').inner_text()})
    page.get_by_role('button',name='重置示例').click()
    page.get_by_role('tab',name='计算过程').click()
    page.wait_for_function("document.querySelector('#run-status').textContent.startsWith('已完成')")
    with page.expect_download() as dl:
        page.get_by_role('button',name='导出本次结果').click()
    checks.append({'check':'export_json','passed':dl.value.suggested_filename=='recommend-lines-legacy.json'})
    page.set_viewport_size({'width':390,'height':844})
    page.screenshot(path=str(OUT/'mobile.png'),full_page=True,animations='disabled')
    checks.append({'check':'mobile_no_horizontal_overflow','passed':page.evaluate('document.documentElement.scrollWidth <= innerWidth')})
    # Direct-file mode is an independent promised entrypoint.
    page.goto(Path(r'D:\work\AI\project-cognition\demos\recommend-lines\index.html').as_uri())
    page.get_by_role('button',name='查看路线1',exact=True).wait_for()
    checks.append({'check':'file_offline_entry','passed':page.locator('.route-button').count()==3})
    checks.append({'check':'no_browser_errors','passed':not errors,'errors':errors})
    browser.close()
result={'status':'pass' if all(x['passed'] for x in checks) else 'fail','checks':checks}
(OUT/'ui-checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
assert result['status']=='pass'
