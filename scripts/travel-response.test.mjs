import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requestTravelReply, prefersCompleteReply } from '../lib/travel-response.ts';
import { basicTravelReply } from '../lib/travel-fallback.ts';
const input={message:'동선과 여행 팁 알려줘',profile:'동행자: 가족여행(자녀 동반)\n이동수단: 자차·렌터카\n숙소 위치: 경주 시내(황리단길 인근)\n여행 계절: 봄 3–5월\n여행 기간: 당일치기\n경주 도착 시간대: 오전 도착',history:[]};
const basic = data => { assert.equal(data.fallback,true); assert.match(data.reply,/기본 여행안내/); assert.match(data.reply,/당일 기본 동선/); assert.doesNotMatch(data.reply,/다시 시도|답변을 받지|연결에 문제/); };
for (const status of [429,500,502,503]) test(`HTTP ${status} returns usable basic reply`,async()=>basic(await requestTravelReply(input,{fetcher:async()=>new Response('failed',{status})})));
test('offline and malformed JSON use local guidance',async()=>{
 basic(await requestTravelReply(input,{fetcher:async()=>{throw new TypeError('offline')}}));
 basic(await requestTravelReply(input,{fetcher:async()=>new Response('<html>error</html>')}));
 basic(await requestTravelReply(input,{fetcher:async()=>Response.json({reply:''})}));
});
test('hung headers and hung body both respect the overall deadline',async()=>{
 for (const fetcher of [()=>new Promise(()=>{}),async()=>new Response(new ReadableStream({start(){}}),{headers:{'content-type':'application/x-ndjson'}})]) {
  const start=Date.now();basic(await requestTravelReply(input,{fetcher,timeoutMs:30}));assert(Date.now()-start<500);
 }
});
test('truncated and malformed streams return basic guidance',async()=>{
 for (const body of ['{"type":"preview","reply":"partial"}\n','{"type":']) {
 basic(await requestTravelReply(input,{fetcher:async()=>new Response(body,{headers:{'content-type':'application/x-ndjson'}})}));
 }
});
test('accepts complete final event without newline and cancels a still-open stream',async()=>{
 let canceled=false;
 const result={type:'result',ok:true,reply:'정상 일정',planUrl:'/travel-plan#v1.test'};
 const fetcher=async()=>new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode(JSON.stringify(result)+'\n'));},cancel(){canceled=true}}),{headers:{'content-type':'application/x-ndjson'}});
 assert.equal((await requestTravelReply(input,{fetcher})).reply,'정상 일정');assert(canceled);
 assert.equal((await requestTravelReply(input,{fetcher:async()=>new Response(JSON.stringify(result),{headers:{'content-type':'application/x-ndjson'}})})).reply,'정상 일정');
});
test('manual basic action aborts waiting and late output cannot update preview',async()=>{
 const abort=new AbortController();let previews=0;
 const result=requestTravelReply(input,{signal:abort.signal,fetcher:()=>new Promise(()=>{}),onPreview:()=>previews++});
 abort.abort();basic(await result);assert.equal(previews,0);
});
test('catalog prices, closure and night time are available without AI',()=>{
 const reply=basicTravelReply('', '박물관 불국사 야경 가격과 집결 시간');
 for(const value of ['25,000','22,000','24,800','19,800','16,900','18:30','18:20','9월 14일','운영 불가'])assert(reply.includes(value),value);
});
test('conservative templates distinguish lodging, exclusions, weather and latest duration',()=>{
 const day=basicTravelReply(input.profile,'대릉원은 제외. 비가 오면?');assert.doesNotMatch(day,/대릉원/);assert.match(day,/실내 전시/);assert.match(day,/당일치기는 숙소 체크인 없이/);
 const two=basicTravelReply('보문관광단지\n1박 2일\n오후 도착','일정 알려줘');assert.match(two,/1일차/);assert.match(two,/마지막 날/);
 const changed=basicTravelReply('1박 2일','당일치기로 바꿔줘');assert.doesNotMatch(changed,/1일차|마지막 날/);
});

test('recovers one transient network failure without replacing the AI answer',async()=>{
 let calls=0;
 const result=await requestTravelReply(input,{fetcher:async()=>{
  if(++calls===1)throw new TypeError('temporary disconnect');
  return Response.json({reply:'복구된 맞춤 일정'});
 }});
 assert.equal(calls,2);assert.equal(result.reply,'복구된 맞춤 일정');assert.notEqual(result.fallback,true);
});
test('an AI response taking longer than the old 15-second cutoff is preserved',async()=>{
 const result=await requestTravelReply(input,{fetcher:async()=>{
  await new Promise(resolve=>setTimeout(resolve,16000));
  return Response.json({reply:'충분히 검토한 맞춤 일정'});
 }});
 assert.equal(result.reply,'충분히 검토한 맞춤 일정');assert.notEqual(result.fallback,true);
});

test('phones, in-app browsers and desktop-mode iPads use complete replies',()=>{
 for (const ua of ['iPhone OS 18 Safari', 'Android SamsungBrowser', 'iPhone KAKAOTALK']) assert(prefersCompleteReply(ua));
 assert(prefersCompleteReply('Macintosh Safari',5));
 assert(!prefersCompleteReply('Macintosh Safari',0));
 assert(!prefersCompleteReply('Windows Chrome',0));
});
test('mobile JSON response works without a readable-stream API',async()=>{
 const result=await requestTravelReply(input,{transport:'json',fetcher:async(url,init)=>{
  assert.equal(init.headers.Accept,'application/json');
  assert.equal(init.cache,'no-store');
  return {ok:true,headers:new Headers({'content-type':'application/json'}),
   get body(){throw new Error('stream unavailable');},json:async()=>({reply:'모바일 맞춤 일정'})};
 }});
 assert.equal(result.reply,'모바일 맞춤 일정'); assert.notEqual(result.fallback,true);
});
test('a broken stream retries as JSON, rather than repeating the broken transport',async()=>{
 const accepts=[];
 const result=await requestTravelReply(input,{transport:'stream',fetcher:async(url,init)=>{
  accepts.push(init.headers.Accept);
  if(accepts.length===1)return new Response('{"type":"preview","reply":"중간"}\n',{headers:{'content-type':'application/x-ndjson'}});
  return Response.json({reply:'복구된 전체 일정'});
 }});
 assert.deepEqual(accepts,['application/x-ndjson','application/json']);
 assert.equal(result.reply,'복구된 전체 일정');
});
test('suspended mobile tab expires on return without waiting for its paused timer',async(t)=>{
 const page=new EventTarget(),doc=new EventTarget();
 globalThis.window=page; globalThis.document=doc;
 t.after(()=>{delete globalThis.window;delete globalThis.document;});
 let now=1000;
 t.mock.method(Date,'now',()=>now);
 let calls=0;
 const reply=requestTravelReply(input,{fetcher:()=>{calls++;return new Promise(()=>{});}});
 now+=31000;
 page.dispatchEvent(new Event('pageshow'));
 basic(await reply);assert.equal(calls,1);
});
test('a short app switch retains the pending AI answer',async(t)=>{
 const page=new EventTarget();globalThis.window=page;t.after(()=>{delete globalThis.window;});
 let finish;
 const reply=requestTravelReply(input,{fetcher:()=>new Promise(resolve=>{finish=resolve;})});
 page.dispatchEvent(new Event('focus'));
 finish(Response.json({reply:'화면 복귀 후 맞춤 일정'}));
 assert.equal((await reply).reply,'화면 복귀 후 맞춤 일정');
});
test('progress rendering failure does not discard a valid answer',async()=>{
 const result=await requestTravelReply(input,{onPreview:()=>{throw new Error('view unavailable');},fetcher:async()=>new Response(
  '{"type":"preview","reply":"진행"}\n{"type":"result","reply":"정상 답변"}\n',
  {headers:{'content-type':'application/x-ndjson'}})});
 assert.equal(result.reply,'정상 답변');
});
