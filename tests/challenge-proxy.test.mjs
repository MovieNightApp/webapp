import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/challenge.js';
function response() {return {statusCode:200,headers:{},setHeader(k,v){this.headers[k]=v;},end(body){this.body=body;}};}
test('proxy rejects arbitrary paths and oversized bodies before contacting the backend', async () => {
  for(const query of [{target:'data',path:'../user'},{target:'page',path:'assets/../../.env'},{target:'data',path:'billing'}]) {
    const res=response();await handler({query,method:'GET',headers:{}},res);assert.equal(res.statusCode,404);
  }
  process.env.MOVIENIGHT_BACKEND_URL='https://api.example.test';
  const res=response(); await handler({query:{target:'data',path:'recover'},method:'POST',headers:{},body:'x'.repeat(33000)},res);assert.equal(res.statusCode,413);
});
test('proxy forwards only scoped credentials and marks private responses no-store',async()=>{
  const original=globalThis.fetch;
  try {
    process.env.MOVIENIGHT_BACKEND_URL='https://api.example.test';
    let seen;
    globalThis.fetch=async(url,init)=>{seen={url,init};return new Response('{}',{status:200,headers:{'Content-Type':'application/json'}});};
    const res=response();
    await handler({query:{target:'data',path:'recover'},method:'POST',headers:{authorization:'do not forward',cookie:'do not forward','x-challenge-token':'scoped'},body:{code:'private'}},res);
    assert.equal(seen.url,'https://api.example.test/api/challenges/recover');assert.equal(seen.init.headers.Authorization,undefined);assert.equal(seen.init.headers.cookie,undefined);assert.equal(seen.init.headers['X-Challenge-Token'],'scoped');assert.equal(res.headers['Cache-Control'],'no-store');
  } finally {globalThis.fetch=original;delete process.env.MOVIENIGHT_BACKEND_URL;}
});
