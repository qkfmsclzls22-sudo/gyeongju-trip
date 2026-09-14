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

test('keeps enough meal time and respects an explicit Gyeongju departure', () => {
  assert(inspectPlan(plan([stop('17:10','17:40','한식 저녁','보문','식사')]),'당일치기').some(x=>x.includes('45분')));
  assert(inspectPlan(plan([stop('17:00','18:00','전시 관람')]),'당일치기 17시 귀가').some(x=>x.includes('귀가')));
  assert(inspectPlan(plan([stop('17:00','18:00','전시 관람')]),'당일치기 오후 5시 경주에서 출발').some(x=>x.includes('귀가')));
  assert.deepEqual(inspectPlan(plan([stop('17:00','18:00','한식 저녁','보문','식사')]),'당일치기 18시 경주에서 귀가 출발'),[]);
});

test('blocks Sep 14 museum rooms and tours, including relative dates and day two', () => {
  for (const name of ['국립경주박물관', '경주 박물관', '신라역사관', '신라미술관', '박물관 도슨트']) {
    for (const context of ['2026-09-14 당일치기', '9월 14일 당일치기', '오늘 당일치기']) {
      assert(inspectPlan(plan([stop('10:00','12:00',name,'도심')]),context,'2026-09-14').some(x=>x.includes('운영 불가')), `${name}: ${context}`);
    }
  }
  const p=plan([stop('10:00','12:00','신라역사관','도심')]);
  p.days[0].day=2;
  assert(inspectPlan(p,'2026-09-13 1박2일').some(x=>x.includes('운영 불가')));
  assert(inspectPlan(plan([stop('10:00','12:00','국립경주박물관','도심')]),'내일 당일치기','2026-09-13').some(x=>x.includes('운영 불가')));
});

test('does not extend Sep 14 restrictions to other dates or explicitly open exhibits', () => {
  for (const date of ['2026-09-15', '2026-09-21', '2027-09-14']) {
    assert.deepEqual(inspectPlan(plan([stop('10:00','12:00','국립경주박물관','도심')]),`${date} 당일치기`),[]);
  }
  assert.deepEqual(inspectPlan(plan([stop('10:00','12:00','국립경주박물관 특별전시관','도심')]),'2026-09-14 당일치기'),[]);
  assert.deepEqual(inspectPlan(plan([stop('10:00','12:00','국립경주박물관','도심')]),'내일 당일치기','2026-09-14'),[]);
});
