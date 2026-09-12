import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspectPlan, renderPlan } from '../lib/itinerary.ts';

const stop = (start, end, place, area='보문', kind='관람') => ({ start, end, place, area, kind, text:place });
const plan = stops => ({ answer:'', assumptions:'', days:[{day:1,stops}], reasons:'권역을 묶었습니다.', tips:[] });
test('rejects overlapping and invalid clock times', () => {
  assert(inspectPlan(plan([stop('14:00','15:00','라원'),stop('14:30','16:00','플래시백 계림')]),'').some(x=>x.includes('겹침')));
  assert(inspectPlan(plan([stop('25:00','26:00','라원')]),'').length);
});
test('rejects early check-in and arrival before exact input', () => {
  assert(inspectPlan(plan([stop('14:30','15:30','숙소','보문','체크인')]),'1박 2일').some(x=>x.includes('15시')));
  assert(inspectPlan(plan([stop('14:00','15:00','라원')]),'정확한 경주 도착 시각: 14:30').some(x=>x.includes('도착')));
});
test('rejects lake repeat even with daytime/nighttime wording', () => {
  assert(inspectPlan(plan([stop('15:00','16:00','보문호 산책'),stop('19:00','20:00','보문호 야경')]),'').some(x=>x.includes('중복')));
});
test('rejects downtown-hotel-downtown rest detour', () => {
  assert(inspectPlan(plan([stop('12:00','14:00','대릉원','도심'),stop('15:00','17:00','숙소 휴식','보문','숙박'),stop('19:00','20:00','동궁과월지','도심')]),'2박3일').some(x=>x.includes('재진입')));
});
test('permits required overnight endpoints', () => {
  assert.deepEqual(inspectPlan(plan([stop('15:00','15:30','숙소','보문','체크인'),stop('16:00','17:00','대릉원','도심'),stop('20:00','20:30','숙소','보문','숙박')]),'1박2일'),[]);
});
test('rejects lodging on final day', () => {
  const p=plan([stop('20:00','20:30','숙소','보문','숙박')]);p.days[0].day=2;
  assert(inspectPlan(p,'1박2일').some(x=>x.includes('마지막')));
});
test('keeps simple answers and deterministic readable timeline', () => {
  const p=plan([stop('14:00','15:00','라원'),stop('15:30','16:00','숙소','보문','체크인')]);
  assert.deepEqual(inspectPlan(p,'1박2일'),[]);
  assert.match(renderPlan(p),/14:00–15:00 \| 라원\n15:30–16:00 \| 숙소/);
  assert.deepEqual(inspectPlan({...p,days:[],answer:'경주에는 언제 도착하시나요?'},''),[]);
});
test('always renders the destination even when descriptive text omits it', () => {
  const p=plan([{...stop('14:00','15:00','플래시백 계림'),text:'미디어아트 관람'}]);
  assert.match(renderPlan(p),/플래시백 계림 · 미디어아트 관람/);
});
test('rejects long blocks filled only with packing', () => {
  assert(inspectPlan(plan([stop('09:00','11:00','숙소 짐 정리','보문','이동')]),'1박2일').some(x=>x.includes('30분')));
});
test('rejects known Monday closures and museum visit before opening', () => {
  assert(inspectPlan(plan([stop('14:00','15:00','라원')]),'9월 14일 월요일 당일치기').some(x=>x.includes('휴관')));
  assert.deepEqual(inspectPlan(plan([stop('14:00','15:00','라원')]),'2026-09-15 당일치기'),[]);
  assert(inspectPlan(plan([stop('09:20','10:40','국립경주박물관','도심')]),'').some(x=>x.includes('10:00')));
});
