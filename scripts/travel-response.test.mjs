import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requestTravelReply } from '../lib/travel-response.ts';
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
