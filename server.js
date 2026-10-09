'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8'};
const read = name => JSON.parse(fs.readFileSync(path.join(root, 'data', name + '.json'), 'utf8'));
const headers = {
  'X-Content-Type-Options':'nosniff',
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'X-Frame-Options':'DENY',
  'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"
};
function json(res, status, data) {
  res.writeHead(status, {...headers, 'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
  res.end(JSON.stringify(data));
}
async function collect(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > 15000) throw new Error('Submitted form is too large.');
  }
  let parsed;
  try { parsed = JSON.parse(body || '{}'); } catch { throw new Error('Invalid JSON request.'); }
  if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error('Invalid form data.');
  return parsed;
}
function validEmail(v) {return typeof v === 'string' && v.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
function text(v, max=160) {return typeof v === 'string' ? v.trim().slice(0,max) : ''}
function validPhone(v) {return typeof v === 'string' && /^\+?[0-9][0-9\s()-]{6,24}$/.test(v.trim()) && (v.match(/\d/g)||[]).length >= 7}
const maxCalls = new Map();
function limited(ip) {
  // Basic anti-spam limiting for the public classroom demo; use an edge WAF in production.
  const now = Date.now();
  for (const [key, entry] of maxCalls) if (entry.until < now) maxCalls.delete(key);
  const entry = maxCalls.get(ip) || {count:0, until: now + 60000};
  entry.count += 1; maxCalls.set(ip,entry);
  return entry.count > 30;
}
const server = http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === '/health' && req.method === 'GET') return json(res,200,{status:'ok',project:'ceeries'});
    if (pathname === '/api/products' && req.method === 'GET') return json(res,200,read('products'));
    if (pathname === '/api/customers' && req.method === 'GET') {
      return json(res,200,read('customers').map(({id,name,type})=>({id,name,type})));
    }
    if (pathname === '/api/orders' && req.method === 'GET') {
      return json(res,403,{error:'Demo order history is available only in the browser that placed it.'});
    }
    if (pathname.startsWith('/api/') && req.method === 'POST') {
      if (limited(req.socket.remoteAddress || 'unknown')) return json(res,429,{error:'Too many requests; please try again later.'});
      const b = await collect(req);
      if (pathname === '/api/orders') {
        const customer=b.customer, items=b.items;
        if (!customer || typeof customer !== 'object' || !text(customer.name,120) || !validEmail(customer.email) || !validPhone(customer.phone) || text(customer.address,240).length < 10 || !Array.isArray(items) || !items.length || items.length>7) {
          return json(res,400,{error:'Provide your name, valid email, phone, delivery address and at least one product.'});
        }
        const products = read('products');
        const safeItems = [];
        for (const item of items) {
          const p = products.find(p=>p.id===item?.id);
          if (!p || !Number.isInteger(item.qty) || item.qty<1 || item.qty>20 || safeItems.some(i=>i.id===p.id)) return json(res,400,{error:'Invalid product or quantity.'});
          safeItems.push({id:p.id,name:p.name,qty:item.qty,price:p.price,image:p.image});
        }
        const total = safeItems.reduce((n,i)=>n+i.price*i.qty,0);
        // No checkout PII or order records are retained by the server. The browser stores the demo history.
        return json(res,201,{id:crypto.randomInt(100000,999999),customer:{name:text(customer.name,120),email:text(customer.email),phone:text(customer.phone,40),address:text(customer.address,240)},items:safeItems,total,status:'Demo order received',date:new Date().toISOString()});
      }
      if (pathname === '/api/contact') {
        if (!text(b.name,120) || !validEmail(b.email) || !text(b.subject,120) || !text(b.message,2000)) return json(res,400,{error:'Please complete the name, email, subject, and message fields.'});
        // Demo form: acknowledge validation without collecting/storing visitor information.
        return json(res,200,{success:true,demonstration:true,message:'Form checked successfully. No message was sent.'});
      }
      if (pathname === '/api/subscribe') {
        if (!validEmail(b.email) || b.consent !== true) return json(res,400,{error:'Please enter a valid email and confirm consent.'});
        return json(res,200,{success:true,demonstration:true,message:'Newsletter preview validated. No email was sent.'});
      }
      return json(res,404,{error:'Unknown endpoint.'});
    }
    if(req.method!=='GET' && req.method!=='HEAD') return json(res,405,{error:'Method not allowed.'});
    const filename = pathname==='/'?'/index.html':pathname;
    if(!(/^\/(index\.html|style\.css|app\.js|enhancements\.js|qa\.js|robots\.txt)$/.test(filename) || /^\/assets\/[a-zA-Z0-9_.-]+$/.test(filename))) return json(res,404,{error:'Not found.'});
    const file = path.resolve(root, '.' + filename);
    if (!file.startsWith(root+path.sep)) return json(res,403,{error:'Forbidden.'});
    fs.readFile(file,(err,bytes)=>{
      if(err) return json(res,404,{error:'Not found.'});
      const ext=path.extname(file);
      res.writeHead(200,{...headers,'Content-Type':mime[ext]||'application/octet-stream','Cache-Control': ext==='.html' ? 'no-cache':'public, max-age=3600'});
      if(req.method==='HEAD')res.end();else res.end(bytes);
    });
  } catch (err) {json(res,400,{error:err.message||'Request failed.'});}
});
server.listen(port,'0.0.0.0',()=>console.log(`CEERIES running at http://localhost:${port}`));
