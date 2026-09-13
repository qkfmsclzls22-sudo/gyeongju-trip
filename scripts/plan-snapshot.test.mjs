import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { decodePlanSnapshot } from '../lib/plan-snapshot.ts';
const plan = { answer:'', assumptions:'오후 14시 시작 가정', days:[{day:1,stops:[{start:'14:00',end:'15:00',place:'플래시백 계림',kind:'관람',area:'보문',text:'주차 후 전시 관람'}]}],reasons:'가까운 장소부터',tips:['휴관 안내 https://www.gjtrip.co.kr/now'] };
const encode = data => 'v1.'+gzipSync(JSON.stringify(data)).toString('base64url');
test('share URL survives encoding and reopening, preserving Korean itinerary', async () => {
  const url = new URL('/travel-plan#'+encode({version:1,plan}), 'https://www.gjtrip.co.kr');
  assert.deepEqual(await decodePlanSnapshot(url.hash.slice(1)), plan);
});
test('rejects missing, broken, oversized and incompatible snapshots', async () => {
  for (const value of ['', 'v1.bad', 'v2.abc', 'v1.'+'a'.repeat(50001), encode({version:2,plan}),encode({version:1,plan:{...plan,days:[null]}}), encode({version:1,plan:{...plan,tips:[42]}}),encode({version:1,plan:{...plan,reasons:'a'.repeat(160000)}})]) await assert.rejects(decodePlanSnapshot(value));
});
