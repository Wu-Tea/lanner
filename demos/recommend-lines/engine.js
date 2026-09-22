(function(root){
  'use strict';
  const round=(n,s=0)=>Math.floor(n*10**s+0.5+1e-9)/10**s;
  const floor2=n=>Math.floor(n*100+1e-9)/100;
  const coords=o=>o.capitalModel&&o.capitalModel.smx!=null&&o.capitalModel.smy!=null;
  function legacyDistance(lat1,lon1,lat2,lon2){
    const a=Number(lat1)-Number(lat2),b=Number(lon1)-Number(lon2);
    const t=Math.sin(a/2)**2+Math.cos(Number(lat1))*Math.cos(Number(lat2))*Math.sin(b/2)**2;
    return 63781*2*Math.asin(Math.sqrt(t));
  }
  function geographicDistance(lat1,lon1,lat2,lon2){
    const rad=Math.PI/180, a=(lat2-lat1)*rad,b=(lon2-lon1)*rad;
    const t=Math.sin(a/2)**2+Math.cos(lat1*rad)*Math.cos(lat2*rad)*Math.sin(b/2)**2;
    return 6371000*2*Math.asin(Math.sqrt(Math.max(0,Math.min(1,t))));
  }
  // Same sift-up/down tie handling as Java PriorityQueue for its g-cost comparator.
  class Queue {
    constructor(){this.a=[];}
    push(x){let i=this.a.length;this.a.push(x);while(i>0){const p=(i-1)>>>1;if(x.cost>=this.a[p].cost)break;this.a[i]=this.a[p];i=p;}this.a[i]=x;}
    pop(){const r=this.a[0],x=this.a.pop();if(this.a.length){let i=0,half=this.a.length>>>1;while(i<half){let c=i*2+1;if(c+1<this.a.length&&this.a[c].cost>this.a[c+1].cost)c++;if(x.cost<=this.a[c].cost)break;this.a[i]=this.a[c];i=c;}this.a[i]=x;}return r;}
  }
  function candidate(objects,matrix,start,second,mode){
    const weights=matrix.map(r=>r.slice()),n=objects.length;
    weights[start][second]=weights[second][start]=-1000;
    const q=new Queue(),closed=new Set(),costs=Array(n).fill(Infinity),order=[];
    costs[start]=0;q.push({index:start,cost:0});
    while(q.a.length){const cur=q.pop();if(closed.has(cur.index))continue;
      closed.add(cur.index);order.push(cur.index);
      for(let j=0;j<n;j++){if(closed.has(j))continue;const g=cur.cost+weights[cur.index][j];
        if(g<costs[j]){costs[j]=g;q.push({index:j,cost:g});}}
    }
    let distance=0,totalWeight=0;const edges=[];
    for(let i=1;i<order.length;i++){
      const a=objects[order[i-1]],b=objects[order[i]];let d=0;
      if(coords(a)&&coords(b)) d=mode==='legacy'
        ?legacyDistance(a.capitalModel.smx,a.capitalModel.smy,b.capitalModel.smx,b.capitalModel.smy)
        :geographicDistance(a.capitalModel.smy,a.capitalModel.smx,b.capitalModel.smy,b.capitalModel.smx);
      const w=weights[order[i-1]][order[i]];
      distance+=d;totalWeight+=w;edges.push({from:a.objectId,to:b.objectId,distance:d,weight:w,missing:!coords(a)||!coords(b)});
    }
    const eta=mode==='legacy'?Math.trunc(round(round(round(distance/1000,3)/5,3)*1.2*3600,2)):Math.round(distance/1000/5*1.2*3600);
    return {pathNodes:order.map(i=>objects[i]),rawDistance:distance,totalDistance:distance,eta,
      totalWeight,edges,secondObjectId:objects[second].objectId};
  }
  function validate(query,data,mode){
    if(!query||typeof query!=='object'||Array.isArray(query))throw new Error('请求体必须是 JSON 对象');
    if(!Array.isArray(query.objectIds))throw new Error('objectIds 必须为数组');
    if(query.objectIds.length>12)throw new Error('演示最多支持 12 个对象');
    if(query.objectIds.some(id=>!Number.isSafeInteger(id)))throw new Error('对象 ID 必须为整数');
    if(new Set(query.objectIds).size!==query.objectIds.length)throw new Error('对象 ID 不能重复');
    if(query.objectIds.some(id=>!data.objects.some(o=>o.objectId===id)))throw new Error('对象 ID 不在当前合成场景中');
    if(query.objectIds.length&&query.startObjectId!=null&&!query.objectIds.includes(query.startObjectId))throw new Error('起点必须属于所选对象');
    if(query.objectIds.length&&query.startObjectId==null){
      for(const [key,max] of [['smx',180],['smy',90]]){
        if(!['string','number'].includes(typeof query[key])||String(query[key]).trim()===''||!Number.isFinite(Number(query[key]))||Math.abs(Number(query[key]))>max)
          throw new Error(`${key} 需要有效的经纬度数值`);
      }
    }
    if(!['legacy','corrected'].includes(mode))throw new Error('未知的演示模式');
  }
  function run(query,data,options={}){
    const mode=options.mode||'legacy';validate(query,data,mode);
    const objects=data.objects.filter(o=>query.objectIds.includes(o.objectId));
    const n=objects.length,missing=objects.filter(o=>!coords(o));
    if(missing.length&&(mode==='corrected'||query.startObjectId==null))throw new Error(`设备 ${missing.map(o=>o.objectId).join('、')} 缺少坐标。请使用完整场景，或在原逻辑模式指定对象起点观察差异。`);
    const warnings=mode==='legacy'?['原逻辑移植：含原距离计算与路线2随机改写；数值不可用于实际导航。']:['距离校正对照：统一经纬度、球面米制和 ETA，去掉随机改写；搜索策略仍未证明全局最优。'];
    if(missing.length)warnings.push('缺失坐标：原逻辑矩阵使用大惩罚，路径距离汇总却按 0 处理。');
    if(n<2)warnings.push(n===1?'只有一个对象，原服务不生成非起点候选。':'未选择对象，演示边界直接返回空结果。');
    const distance=Array.from({length:n},()=>Array(n).fill(0));
    const spatial=distance.map(r=>r.slice()),history=distance.map(r=>r.slice());
    for(let i=0;i<n;i++)for(let j=0;j<n;j++){
      const a=objects[i],b=objects[j];
      if(!coords(a)||!coords(b))distance[i][j]=10000000;
      else if(i!==j){const fn=mode==='legacy'?legacyDistance:geographicDistance;
        const d=fn(a.capitalModel.smy,a.capitalModel.smx,b.capitalModel.smy,b.capitalModel.smx);
        distance[i][j]=round(round(d,1)/100,1);}
      if(i!==j){let reward=0,invalid=false;
        for(const key of ['buildingName','floorName','roomName']){
          // Java getter normalizes empty values to null; a null left value throws.
          const left=a[key]||null,right=b[key]||null;
          if(left===null){invalid=true;break;}if(left!==right)break;reward+=5;
        }
        spatial[i][j]=options.spatial===false||invalid?0:reward;
      }
    }
    if(options.history!==false)for(const e of data.history){const i=objects.findIndex(o=>o.objectId===e.startNodeId),j=objects.findIndex(o=>o.objectId===e.endNodeId);if(i>=0&&j>=0)history[i][j]+=e.weight;}
    const final=distance.map((row,i)=>row.map((v,j)=>v-spatial[i][j]-history[i][j]));
    let start=0;
    if(query.startObjectId!=null)start=objects.findIndex(o=>o.objectId===query.startObjectId);
    else if(n){let best=Infinity;objects.forEach((o,i)=>{const m=o.capitalModel;
      const d=mode==='legacy'?legacyDistance(query.smx,query.smy,m.smx,m.smy):geographicDistance(query.smy,query.smx,m.smy,m.smx);
      if(d<best){best=d;start=i;}});}
    const candidates=[];
    for(let j=0;j<n;j++)if(j!==start)candidates.push(candidate(objects,final,start,j,mode));
    candidates.sort((a,b)=>a.totalDistance-b.totalDistance);
    const chosen=candidates.length?[candidates[0]]:[];
    if(candidates.length>1)chosen.push(candidates[1]);
    if(candidates.length>2)chosen.push(candidates[candidates.length>10?9:candidates.length-1]);
    const audits=[];
    const result=chosen.map((p,i)=>{
      let shown=p.totalDistance,factor=null;
      if(mode==='legacy'&&i===1){factor=.92+(options.random||Math.random)()*.06;shown=chosen[0].rawDistance*factor;}
      const rank=candidates.indexOf(p)+1;
      audits.push({rank,rawDistance:p.rawDistance,displayDistance:floor2(shown),factor,
        edges:p.edges,totalWeight:p.totalWeight,secondObjectId:p.secondObjectId});
      return {pathNodes:p.pathNodes,totalDistance:floor2(shown),eta:p.eta+n*25,name:`路线${i+1}`,
        type:mode==='legacy'?(i===0?'耗时最少':i===1?'最短路线':null):`候选排序第 ${rank} 位`};
    });
    return {success:true,code:8000000,message:'演示计算完成',result,
      demo:{mode,synthetic:true,startObjectId:n?objects[start].objectId:null,objectIds:objects.map(o=>o.objectId),
        candidateCount:candidates.length,warnings,matrices:{distance,spatial,history,final},audits,
        steps:['合成对象与资产信息','距离矩阵','空间奖励','历史有向边权','合并权重','枚举候选顺序','排序与输出加工']}};
  }
  function recommendLines(objectIds,smx,smy,startObjectId,data,options){return run({objectIds,smx,smy,startObjectId},data,options).result;}
  const api={run,recommendLines,legacyDistance,geographicDistance,candidate};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DemoEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
