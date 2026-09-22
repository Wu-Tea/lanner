'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {run}=require('./engine');
const {dataset}=require('./fixtures');
const files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/engine.js':'engine.js','/fixtures.js':'fixtures.js','/style.css':'style.css'};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
function createServer(){return http.createServer(async(req,res)=>{
  const json=(code,value)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
  const url=new URL(req.url,'http://localhost');
  if(req.method==='GET'&&url.pathname==='/api/demo/data'){
    try{return json(200,dataset(url.searchParams.get('scenario')||'standard'));}catch(e){return json(400,{success:false,message:e.message});}
  }
  if(req.method==='POST'&&url.pathname==='/api/inspect/line/recommend/list'){
    if(!(req.headers['content-type']||'').startsWith('application/json'))return json(415,{success:false,message:'需要 application/json'});
    try{
      let body='',size=0;for await(const chunk of req){size+=chunk.length;if(size>16384)return json(413,{success:false,message:'演示请求体最大 16 KiB'});body+=chunk;}
      const query=JSON.parse(body),options={mode:url.searchParams.get('mode')||'legacy',history:url.searchParams.get('history')!=='off',spatial:url.searchParams.get('spatial')!=='off'};
      return json(200,run(query,dataset(url.searchParams.get('scenario')||'standard'),options));
    }catch(e){return json(400,{success:false,code:400,message:e instanceof SyntaxError?'JSON 格式不正确':e.message,result:null});}
  }
  if(req.method==='GET'&&files[url.pathname]){const file=files[url.pathname];res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-store'});return fs.createReadStream(path.join(__dirname,file)).pipe(res);}
  json(404,{success:false,message:'接口不存在'});
});}
if(require.main===module){const port=Number(process.env.PORT||4173);const server=createServer();
  server.listen(port,'127.0.0.1',()=>console.log(`Recommend Lines demo: http://127.0.0.1:${port}`));
  server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'端口被占用，请设置 PORT 后重试。':e.message);process.exitCode=1;});}
module.exports={createServer};
