import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planPreview } from '../lib/plan-preview.ts';
const stop={start:'14:00',end:'15:00',place:'플래시백 계림',area:'보문',kind:'관람',text:'전시 {사진}과 "빛" 관람'};
const json=JSON.stringify({answer:'',assumptions:'',days:[{day:1,stops:[stop]},{day:2,stops:[{...stop,place:'박물관'}]}],reasons:'',tips:[]});
test('only completed rows appear, including escaped quotes, braces and multiple days',()=>{
  const firstEnd=json.indexOf('" 관람');
  assert.equal(planPreview(json.slice(0,firstEnd)), '');
  const preview=planPreview(json);
  assert.match(preview,/1일차\n14:00–15:00 \| 플래시백 계림/);
  assert.match(preview,/2일차\n14:00–15:00 \| 박물관/);
  assert.match(preview,/전시 \{사진\}과 "빛" 관람/);
});
test('handles split input and simple answers',()=>{
  const firstStopEnd=json.indexOf('}]');
  assert.equal(planPreview(json.slice(0,firstStopEnd)), '');
  assert.match(planPreview(json.slice(0,firstStopEnd+1)),/플래시백/);
  assert.equal(planPreview('{"answer":"경주 도착 시각은요?","assumptions":'), '경주 도착 시각은요?');
});
