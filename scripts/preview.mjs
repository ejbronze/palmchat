import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve(new URL('../', import.meta.url).pathname);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png'};
createServer((req,res)=>{
 const path = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const local = resolve(root,'.'+path);
 if(!local.startsWith(root+sep)&&local!==root){res.writeHead(403).end();return;}
 if(path.split('/').some(x=>x.startsWith('.')&&x)){res.writeHead(404).end();return;}
 for(const file of [local,local+'.html',resolve(local,'index.html')]){
  try {if(statSync(file).isFile()){res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(readFileSync(file));return;}}catch{}
 }
 res.writeHead(404).end('Page not found');
}).listen(8765,'127.0.0.1',()=>console.log('PalmChat preview: http://127.0.0.1:8765'));
