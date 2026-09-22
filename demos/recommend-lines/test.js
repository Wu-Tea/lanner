'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {run,legacyDistance,geographicDistance}=require('./engine');
const {dataset}=require('./fixtures');
const {createServer}=require('./server');
const q={objectIds:[1,2,3,4,5,6,7,8],smx:'10.0005',smy:'20.0005',startObjectId:1};
test('legacy pure distance retains the previously observed Java sample',()=>{
  assert.ok(Math.abs(legacyDistance(0,0,0,1)-63781)<1e-7);
  assert.ok(Math.abs(legacyDistance(30,120,30,121)-9442.09549869929)<1e-7);
});
test('corrected distance agrees with analytic equator arc and symmetry',()=>{
  assert.ok(Math.abs(geographicDistance(0,0,0,1)-6371000*Math.PI/180)<1e-7);
  assert.equal(geographicDistance(20,10,20,10),0);
  assert.ok(Math.abs(geographicDistance(20,10,21,11)-geographicDistance(21,11,20,10))<1e-8);
});
test('legacy returns three complete permutations with requested starting object',()=>{
  const r=run(q,dataset(),{random:()=>.5});assert.equal(r.result.length,3);assert.equal(r.demo.candidateCount,7);
  for(const p of r.result){assert.equal(p.pathNodes[0].objectId,1);assert.deepEqual(p.pathNodes.map(o=>o.objectId).sort((a,b)=>a-b),q.objectIds);}
  assert.equal(r.result[1].totalDistance,Math.floor((r.demo.audits[0].rawDistance*.95+1e-10)*100)/100);
  assert.ok(Math.abs(r.demo.audits[1].factor-.95)<1e-12);
});
test('large scenario chooses tenth candidate as the third display',()=>{
  const d=dataset('large'),r=run({...q,objectIds:d.objects.map(o=>o.objectId)},d,{random:()=>0});
  assert.equal(r.demo.candidateCount,11);assert.equal(r.demo.audits[2].rank,10);
});
test('corrected results preserve distance and ETA consistency without random data',()=>{
  const r=run(q,dataset(),{mode:'corrected',random:()=>{throw new Error('must not randomize');}});
  for(const [i,p] of r.result.entries()){
    const sum=r.demo.audits[i].edges.reduce((s,e)=>s+e.distance,0);
    assert.ok(Math.abs(p.totalDistance-sum)<.01001);assert.equal(p.eta,Math.round(sum/1000/5*1.2*3600)+8*25);
  }
});
test('space and directed history weights can be independently disabled',()=>{
  const r=run(q,dataset(),{random:()=>0}),off=run(q,dataset(),{spatial:false,history:false,random:()=>0});
  assert.equal(r.demo.matrices.spatial[0][1],10);assert.equal(r.demo.matrices.history[0][2],18);assert.equal(r.demo.matrices.history[2][0],0);
  assert.deepEqual(off.demo.matrices.final,off.demo.matrices.distance);
});
test('empty, one and two object behavior is explicit',()=>{
  assert.equal(run({...q,objectIds:[],startObjectId:null},dataset()).result.length,0);
  assert.equal(run({...q,objectIds:[1]},dataset()).result.length,0);
  assert.equal(run({...q,objectIds:[1,2]},dataset()).result.length,1);
});
test('nearest point and trust boundary validation',()=>{
  assert.equal(run({...q,startObjectId:null,smx:'10.00096',smy:'20.00110'},dataset(),{mode:'corrected'}).demo.startObjectId,1);
  for(const bad of [{...q,startObjectId:12},{...q,objectIds:[1,1]},{...q,objectIds:[99]},{...q,startObjectId:null,smx:''},null])assert.throws(()=>run(bad,dataset()));
});
test('missing coordinates expose original inconsistency; corrected mode rejects them',()=>{
  const d=dataset('missing');assert.throws(()=>run(q,d,{mode:'corrected'}),/缺少坐标/);
  const r=run(q,d,{random:()=>0});assert.equal(r.demo.matrices.distance[5][0],10000000);
  assert.ok(r.demo.audits.some(a=>a.edges.some(e=>e.missing&&e.distance===0)));
});
test('fixture remains unchanged after repeated calculations',()=>{
  const d=dataset(),before=JSON.stringify(d);run(q,d);run(q,d,{mode:'corrected'});assert.equal(JSON.stringify(d),before);
});
test('local HTTP contract, static files, malformed requests and path boundary',async()=>{
  const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base=`http://127.0.0.1:${server.address().port}`;
  try{
    const page=await fetch(base);assert.equal(page.status,200);assert.match(await page.text(),/巡检路线实验室/);
    const result=await fetch(base+'/api/inspect/line/recommend/list?mode=corrected',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(q)});
    assert.equal(result.status,200);assert.equal((await result.json()).result.length,3);
    const bad=await fetch(base+'/api/inspect/line/recommend/list',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'});assert.equal(bad.status,400);
    const long=await fetch(base+'/api/inspect/line/recommend/list',{method:'POST',headers:{'Content-Type':'application/json'},body:' '.repeat(17000)});assert.equal(long.status,413);
    assert.equal((await fetch(base+'/../server.js')).status,404);
  }finally{await new Promise(r=>server.close(r));}
});
