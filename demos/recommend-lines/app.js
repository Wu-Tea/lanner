'use strict';
const $=id=>document.getElementById(id);
let scenario='standard',mode='legacy',data=DemoFixtures.dataset(),selected=new Set(data.objects.map(o=>o.objectId)),response=null,routeIndex=0,busy=false,settingsVersion=0;
const create=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!=null)el.textContent=text;return el;};
function settings(){return {mode,history:$('history').checked,spatial:$('spatial').checked};}
function query(){return {objectIds:[...selected],smx:$('smx').value,smy:$('smy').value,startObjectId:$('start').value==='near'?null:Number($('start').value)};}
function edit(){settingsVersion++;response=null;routeIndex=0;$('error').hidden=true;$('run-status').textContent='设置已更改，点击生成候选路线。';renderResult();syncQuery();drawMap();}
function syncQuery(){$('query-json').value=JSON.stringify(query(),null,2);}
function objectsUI(){
  const old=$('start').value;$('objects').replaceChildren();
  data.objects.forEach(o=>{const row=create('label','object-row'),cb=create('input');cb.type='checkbox';cb.checked=selected.has(o.objectId);cb.dataset.id=o.objectId;cb.setAttribute('aria-label',o.objectName);
    cb.onchange=()=>{cb.checked?selected.add(o.objectId):selected.delete(o.objectId);objectsUI();edit();};
    row.append(cb,create('span','',o.objectName),create('span','zone',`${o.buildingName} · ${o.floorName}`));$('objects').append(row);});
  $('selected-count').textContent=`${selected.size}/${data.objects.length}`;
  $('toggle-all').textContent=selected.size===data.objects.length?'取消全选':'全部选择';
  $('start').replaceChildren();data.objects.filter(o=>selected.has(o.objectId)).forEach(o=>{const opt=create('option','',o.objectName);opt.value=o.objectId;$('start').append(opt);});
  const near=create('option','','按输入坐标找最近点');near.value='near';$('start').append(near);
  if([...$('start').options].some(o=>o.value===old))$('start').value=old;
  $('coordinate-inputs').hidden=$('start').value!=='near';
  renderData();
}
const svgNS='http://www.w3.org/2000/svg';
function svg(tag,attrs={},text){const e=document.createElementNS(svgNS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!=null)e.textContent=text;return e;}
function drawMap(){const map=$('map');map.replaceChildren();map.setAttribute('viewBox',matchMedia('(max-width:740px)').matches&&scenario!=='large'?'45 60 500 245':'0 0 880 360');
  const defs=svg('defs'),pattern=svg('pattern',{id:'grid',width:24,height:24,patternUnits:'userSpaceOnUse'});pattern.append(svg('circle',{cx:1,cy:1,r:.65,fill:'#e0e7d8'}));defs.append(pattern);
  const marker=svg('marker',{id:'arrow',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:4,markerHeight:4,orient:'auto-start-reverse'});marker.append(svg('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'#17674e'}));defs.append(marker);map.append(defs,svg('rect',{width:880,height:360,fill:'url(#grid)'}));
  [[54,232,'A 区'],[338,207,'B 区'],[598,217,'C 区']].forEach(([x,w,name])=>{map.append(svg('rect',{x,y:60,width:w,height:226,rx:14,fill:'#eef1e6',stroke:'#dfe6d4','stroke-width':1}));map.append(svg('text',{x:x+16,y:84,fill:'#9ba890','font-size':12},name));});
  map.append(svg('path',{d:'M 18 314 L 856 314 M 312 28 L 312 332 M 570 28 L 570 332',stroke:'#e6ebdf','stroke-width':14,fill:'none'}));
  const r=response?.result[routeIndex];
  if(r&&r.pathNodes.length>1){const pts=r.pathNodes.map(o=>`${o.x},${o.y}`).join(' ');map.append(svg('polyline',{points:pts,fill:'none',stroke:'#fff','stroke-width':7,'stroke-linejoin':'round'}));map.append(svg('polyline',{points:pts,fill:'none',stroke:'#17674e','stroke-width':2.5,'stroke-linejoin':'round','marker-mid':'url(#arrow)','marker-end':'url(#arrow)',class:'route-line'}));}
  data.objects.forEach(o=>{const checked=selected.has(o.objectId),rank=r?r.pathNodes.findIndex(x=>x.objectId===o.objectId):-1,isStart=rank===0;
    const g=svg('g',{class:'map-point',tabindex:0,role:'button','aria-label':`${o.objectName}，${o.buildingName}，点击查看位置`});
    g.append(svg('circle',{cx:o.x,cy:o.y,r:isStart?17:14,fill:!checked?'#edf0e8':isStart?'#17674e':'#fff',stroke:checked?'#17674e':'#c8d2bf','stroke-width':checked?2:1}));
    g.append(svg('text',{x:o.x,y:o.y+4,'text-anchor':'middle','font-size':11,'font-weight':600,fill:isStart?'#fff':checked?'#17674e':'#a4af9a'},rank>=0?rank+1:o.objectId));
    g.append(svg('text',{x:o.x,y:o.y+30,'text-anchor':'middle','font-size':10,fill:checked?'#607459':'#aeb9a4'},o.objectName));
    const show=()=>{$('node-info').textContent=`${o.objectName} / ID ${o.objectId} · ${o.buildingName} / ${o.floorName} / ${o.roomName} · ${o.capitalModel?`合成坐标 ${o.capitalModel.smx}, ${o.capitalModel.smy}`:'坐标缺失'}${isStart?' · 本次起点':''}`;};g.onclick=show;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show();}};map.append(g);
  });
  map.append(svg('text',{x:812,y:39,'font-size':10,fill:'#98a68d'},'N ↑'));
}
function renderResult(){
  $('routes').replaceChildren();$('sequence').replaceChildren();$('export').disabled=!response;
  const result=response?.result||[];
  result.forEach((r,i)=>{const a=response.demo.audits[i],button=create('button','route-button');button.setAttribute('aria-pressed',String(routeIndex===i));button.setAttribute('aria-label',`查看${r.name}`);
    const top=create('div','route-top');top.append(create('span','route-name',r.name),create('span','route-tag',r.type||'备选顺序'));
    const val=create('div','route-values');val.append(create('strong','',r.totalDistance.toFixed(2)),create('small','','米'),create('span','eta',`${Math.floor(r.eta/60)}分${r.eta%60}秒`));button.append(top,val);
    if(a.factor!==null)button.append(create('span','route-hint',`随机显示：路线1 × ${(a.factor*100).toFixed(1)}%`));
    button.onclick=()=>{routeIndex=i;renderResult();drawMap();};$('routes').append(button);
  });
  if(result.length){const seq=result[routeIndex].pathNodes;$('sequence').append(create('span','','访问顺序'));seq.forEach((o,i)=>{if(i)$('sequence').append(create('span','','→'));$('sequence').append(create('b','',String(o.objectId).padStart(2,'0')));});}
  else $('sequence').textContent=response?'没有候选路线，请选择至少两个有效对象。':'生成路线后，这里显示访问顺序。';
  $('summary').textContent=response?`${response.demo.objectIds.length} 个对象 · ${response.demo.candidateCount} 个候选 · 展示 ${result.length} 条`:'调整设置，观察空间和历史信息怎样影响选择。';
  $('response-json').textContent=response?JSON.stringify(response,null,2):'尚未计算';
  $('notice').classList.toggle('corrected',mode==='corrected');
  $('notice').textContent=response?response.demo.warnings.join(' '):mode==='legacy'?'原逻辑包含距离计算偏差及路线2的随机改写，用于观察实现行为。':'距离校正对照统一单位和坐标顺序；候选搜索仍不保证全局最优。';
  $('steps').replaceChildren();(response?.demo.steps||['合成对象与资产信息','距离矩阵','空间奖励','历史边权','合并权重','候选排序']).forEach((s,i)=>{if(i)$('steps').append(create('span','','→'));$('steps').append(create('span','step',s));});
  renderMatrix();
}
function renderMatrix(){const type=$('matrix-type').value,labels={final:'合并权重',distance:'距离矩阵',spatial:'空间奖励',history:'历史边权'};
  const descriptions={final:'距离矩阵减去空间奖励和历史边权；候选展开时还会设置 -1000 的起始边。',distance:'距离计算结果经缩放和舍入后参与搜索，不等于输出的总路程。',spatial:'同楼栋、同楼层、同房间，按连续层级每级奖励 5。',history:'合成的有向历史边权；行表示起点、列表示到点，未执行历史 SQL。'};
  $('matrix-title').textContent=labels[type];$('matrix-description').textContent=descriptions[type];$('matrix').replaceChildren();if(!response)return;
  const table=create('table'),head=create('tr');head.append(create('th','','从 / 到'));response.demo.objectIds.forEach(id=>head.append(create('th','',`点 ${id}`)));table.append(head);
  response.demo.matrices[type].forEach((row,i)=>{const tr=create('tr');tr.append(create('th','',`点 ${response.demo.objectIds[i]}`));row.forEach((v,j)=>tr.append(create('td',v<0?'negative':i===j?'diagonal':'',Math.abs(v)>=100000?String(v):v.toFixed(1))));table.append(tr);});$('matrix').append(table);
}
function renderData(){const table=create('table'),head=create('tr');['对象','ID','楼栋','楼层','房间','经度（合成）','纬度（合成）'].forEach(t=>head.append(create('th','',t)));table.append(head);data.objects.forEach(o=>{const tr=create('tr');[o.objectName,o.objectId,o.buildingName,o.floorName,o.roomName,o.capitalModel?.smx||'缺失',o.capitalModel?.smy||'缺失'].forEach(t=>tr.append(create('td','',t)));table.append(tr);});$('data-table').replaceChildren(table);}
async function calculate(custom){if(busy)return;busy=true;const requestVersion=settingsVersion;$('run').disabled=true;$('run-json').disabled=true;$('reset').disabled=true;$('error').hidden=true;$('run-status').textContent='正在计算…';
  try{const q=custom||query();const options=settings();let next;
    if(location.protocol==='file:'){next=DemoEngine.run(q,data,options);}
    else{const params=new URLSearchParams({mode,scenario,history:options.history?'on':'off',spatial:options.spatial?'on':'off'});const r=await fetch(`/api/inspect/line/recommend/list?${params}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(q)});next=await r.json();if(!r.ok||!next.success)throw new Error(next.message);}
    if(requestVersion!==settingsVersion)return;
    if(custom){selected=new Set(q.objectIds);objectsUI();$('start').value=q.startObjectId==null?'near':String(q.startObjectId);$('smx').value=q.smx??'';$('smy').value=q.smy??'';$('coordinate-inputs').hidden=$('start').value!=='near';}
    response=next;routeIndex=0;syncQuery();renderResult();drawMap();$('run-status').textContent='已完成 · 点击候选路线切换查看';
  }catch(e){if(requestVersion!==settingsVersion)return;response=null;renderResult();drawMap();$('error').textContent=e.message;$('error').hidden=false;$('run-status').textContent='请检查输入后重试';}
  finally{busy=false;$('run').disabled=false;$('run-json').disabled=false;$('reset').disabled=false;}
}
$('scenario').onchange=()=>{scenario=$('scenario').value;data=DemoFixtures.dataset(scenario);selected=new Set(data.objects.map(o=>o.objectId));objectsUI();edit();};
$('toggle-all').onclick=()=>{selected=selected.size===data.objects.length?new Set():new Set(data.objects.map(o=>o.objectId));objectsUI();edit();};
$('start').onchange=()=>{$('coordinate-inputs').hidden=$('start').value!=='near';edit();};
['smx','smy','spatial','history'].forEach(id=>$(id).onchange=edit);
document.querySelectorAll('[data-mode]').forEach(button=>button.onclick=()=>{mode=button.dataset.mode;document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));edit();});
document.querySelectorAll('[data-tab]').forEach(button=>button.onclick=()=>{document.querySelectorAll('[data-tab]').forEach(b=>{const active=b===button;b.setAttribute('aria-selected',String(active));$(b.dataset.tab).hidden=!active;});});
$('matrix-type').onchange=renderMatrix;$('run').onclick=()=>calculate();
$('run-json').onclick=()=>{try{calculate(JSON.parse($('query-json').value));}catch(e){$('error').textContent='JSON 格式不正确';$('error').hidden=false;}};
$('reset').onclick=()=>{scenario='standard';mode='legacy';$('scenario').value=scenario;data=DemoFixtures.dataset();selected=new Set(data.objects.map(o=>o.objectId));$('spatial').checked=$('history').checked=true;$('smx').value='10.0005';$('smy').value='20.0005';document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));$('start').value='1';objectsUI();calculate();};
$('export').onclick=()=>{if(!response)return;const blob=new Blob([JSON.stringify(response,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=create('a');a.href=url;a.download=`recommend-lines-${mode}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('request-mode').textContent=location.protocol==='file:'?'当前为离线文件模式，调用同一 JavaScript 引擎。启动 Node 服务后，此操作将发送真实本地 HTTP 请求。':'当前通过本地 HTTP 接口计算；响应的 demo 字段包含额外解释数据。';
objectsUI();syncQuery();drawMap();calculate();
matchMedia('(max-width:740px)').addEventListener('change',drawMap);
