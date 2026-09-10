import {createHmac} from 'node:crypto';
import {isIP} from 'node:net';
// Vercel adapter: only the challenge's public pages, assets and scoped API can be proxied.
export default async function handler(req, res) {
  const target = req.query?.target;
  const path = typeof req.query?.path === 'string' ? req.query.path : '';
  const page = target === 'page' && (path === '' || /^[a-f0-9]{32}$/.test(path) || /^assets\/(app\.js|ticket\.js|style\.css|regular\.woff|display\.woff|share\.png)$/.test(path));
  const data = target === 'data' && (path === '' || /^(films|countries|search|recover|events|[a-f0-9]{32}|[a-f0-9]{32}\/answers)$/.test(path));
  if ((!page && !data) || !['GET', 'POST', 'HEAD'].includes(req.method) || (page && req.method === 'POST')) { res.statusCode = 404; return res.end('Not found'); }
  const configured = process.env.MOVIENIGHT_BACKEND_URL;
  if (!configured) { res.statusCode = 503; return res.end('The challenge is not configured yet.'); }
  let base;
  try { base = new URL(configured); if (base.protocol !== 'https:' && !['localhost','127.0.0.1'].includes(base.hostname)) throw new Error(); }
  catch { res.statusCode = 503; return res.end('The challenge is not configured yet.'); }
  const body = req.method === 'POST' ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {})) : undefined;
  if (body && Buffer.byteLength(body) > 32768) { res.statusCode = 413; return res.end('Request too large'); }
  const proxyHeaders = {};
  // Vercel overwrites X-Forwarded-For. Sign it so the public backend can distinguish our adapter from spoofed headers.
  const client = typeof req.headers['x-forwarded-for'] === 'string' ? req.headers['x-forwarded-for'].split(',')[0].trim() : '';
  if (process.env.VERCEL === '1' && process.env.CHALLENGE_PROXY_SECRET?.length >= 32 && isIP(client)) {
    const time = String(Math.floor(Date.now()/1000));
    proxyHeaders['X-Challenge-Client'] = client;
    proxyHeaders['X-Challenge-Time'] = time;
    proxyHeaders['X-Challenge-Signature'] = createHmac('sha256',process.env.CHALLENGE_PROXY_SECRET).update(time+'\n'+client).digest('hex');
  }
  try {
    const response = await fetch(`${base.origin}${page ? '/challenge' : '/api/challenges'}${path ? '/' + path : ''}${data && path === 'search' && typeof req.query.q === 'string' ? '?q=' + encodeURIComponent(req.query.q.slice(0,100)) : ''}`, {
      method: req.method, redirect: 'error', signal: AbortSignal.timeout(25000),
      headers: { ...proxyHeaders, ...(body ? {'Content-Type':'application/json'} : {}), ...(typeof req.headers['x-challenge-token'] === 'string' ? {'X-Challenge-Token':req.headers['x-challenge-token']} : {}) }, body,
    });
    res.statusCode = response.status;
    for (const header of ['content-type','cache-control','content-security-policy','referrer-policy','x-content-type-options']) { const value = response.headers.get(header); if(value) res.setHeader(header,value); }
    if(data) res.setHeader('Cache-Control','no-store');
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch { res.statusCode = 503; res.setHeader('Content-Type','application/json'); res.end(JSON.stringify({message:'MovieNight is taking a moment. Your choices are saved in this browser; try again.'})); }
}
