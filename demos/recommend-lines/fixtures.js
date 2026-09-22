(function (root) {
  'use strict';
  const layout = [
    [96,110,'A','1','101'], [194,118,'A','1','102'], [120,206,'A','2','201'],
    [236,230,'A','2','202'], [378,104,'B','1','101'], [483,130,'B','1','102'],
    [379,234,'B','2','201'], [500,240,'B','2','202'], [642,126,'C','1','101'],
    [751,159,'C','1','102'], [649,245,'C','2','201'], [759,259,'C','2','202']
  ];
  // Entirely synthetic. No transform, lookup table or sample from a private database.
  const objects = layout.map(([x,y,b,f,r],i) => ({
    objectId:i+1, objectName:`设备 ${String(i+1).padStart(2,'0')}`, capitalId:100+i+1,
    kindId:1, buildingName:`${b} 区`, floorName:`${f} 层`, roomName:`${r} 室`, x,y,
    capitalModel:{smx:(10+x/100000).toFixed(6), smy:(20+y/100000).toFixed(6)}
  }));
  const history = [[1,3,18],[3,4,12],[4,2,16],[2,5,20],[5,7,19],[7,8,14],[8,6,17],
    [6,9,15],[9,11,18],[11,12,16],[12,10,13]].map(([startNodeId,endNodeId,weight])=>({startNodeId,endNodeId,weight}));
  function dataset(scenario='standard') {
    if (!['standard','large','single','missing'].includes(scenario)) throw new Error('未知的合成场景');
    const count=scenario==='large'?12:scenario==='single'?1:8;
    const list=JSON.parse(JSON.stringify(objects.slice(0,count)));
    if (scenario==='missing') list[5].capitalModel=null;
    return {objects:list,history:history.filter(e=>e.startNodeId<=count&&e.endNodeId<=count)};
  }
  const api={dataset,scenarios:['standard','large','single','missing']};
  if (typeof module!=='undefined'&&module.exports) module.exports=api; else root.DemoFixtures=api;
})(typeof globalThis!=='undefined'?globalThis:this);
