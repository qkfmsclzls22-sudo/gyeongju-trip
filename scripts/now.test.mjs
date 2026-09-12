import assert from 'node:assert/strict';
import { test } from 'node:test';
import { koreaDate, weekend, matchesDates, isVisible, safeUrl } from '../lib/now.ts';

test('Korea midnight and weekends use the visitor date, including Sunday', () => {
  assert.equal(koreaDate(new Date('2026-09-12T15:01:00Z')), '2026-09-13');
  assert.deepEqual(weekend('2026-09-12'), ['2026-09-12', '2026-09-13']);
  assert.deepEqual(weekend('2026-09-13'), ['2026-09-13', '2026-09-13']);
  assert.deepEqual(weekend('2026-09-14'), ['2026-09-19', '2026-09-20']);
});
test('Date filters never imply that seasonal or intermittent events run every day', () => {
  const item = { dateKind: 'occurrences', startDate: '2026-09-01', endDate: '2026-10-24', occurrenceDates: ['2026-09-19', '2026-10-24'] };
  assert.equal(matchesDates(item, '2026-09-20', '2026-09-20'), false);
  assert.equal(matchesDates(item, '2026-09-19', '2026-09-20'), true);
  assert.equal(matchesDates({ ...item, dateKind: 'season' }, '2026-09-19', '2026-09-20'), false);
  assert.equal(matchesDates({ ...item, dateKind: 'undated' }, '2026-09-19', '2026-09-20'), false);
  assert.equal(matchesDates({ ...item, dateKind: 'continuous' }, '2026-09-19', '2026-09-20'), true);
});
test('Ended, cancelled and overdue information disappears even if collection stops', () => {
  const item = { status: 'published', reviewBy: '2026-09-26', endDate: '2026-09-19' };
  assert.equal(isVisible(item, '2026-09-19'), true);
  assert.equal(isVisible(item, '2026-09-20'), false);
  assert.equal(isVisible({ ...item, endDate: null }, '2026-09-27'), false);
  assert.equal(isVisible({ ...item, status: 'cancelled' }, '2026-09-18'), false);
});
test('Only secure external source links are accepted', () => {
  assert.equal(safeUrl('https://garts.kr/index.do?menuId=1'), true);
  for (const value of ['javascript:alert(1)', 'http://example.com', 'https://user:pass@example.com', null, '/now']) assert.equal(safeUrl(value), false);
});
