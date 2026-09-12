import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const data = JSON.parse(readFileSync(new URL('../data/now.json', import.meta.url), 'utf8'));
const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const timestamp = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value) && /(?:Z|[+-]\d{2}:\d{2})$/.test(value) && !Number.isNaN(Date.parse(value));
const url = value => { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; } };
assert.equal(data.version, 1);
assert(timestamp(data.updatedAt), 'updatedAt must be an ISO timestamp with timezone');
assert(Array.isArray(data.sources) && data.sources.length > 0);
assert(Array.isArray(data.items) && data.items.length <= 150, 'Keep the public feed bounded; archive old records');
const sources = new Map();
for (const s of data.sources) {
  assert(s.id && !sources.has(s.id), `Duplicate source: ${s.id}`);
  assert(typeof s.name === 'string' && s.name.length > 0);
  assert(['official', 'social'].includes(s.kind));
  assert(['checked', 'partial', 'blocked', 'pending_identity'].includes(s.status));
  assert(s.status === 'pending_identity' ? s.url === null : url(s.url), `Invalid source URL: ${s.id}`);
  assert(s.lastAttemptAt === null || timestamp(s.lastAttemptAt));
  assert(s.lastSuccessAt === null || timestamp(s.lastSuccessAt));
  assert(s.status !== 'checked' || timestamp(s.lastSuccessAt));
  assert(typeof s.note === 'string');
  sources.set(s.id, s);
}
const ids = new Set();
const duplicates = new Set();
for (const item of data.items) {
  assert(item.id && !ids.has(item.id), `Duplicate ID: ${item.id}`); ids.add(item.id);
  assert(['축제·행사', '공연·전시', '체험·프로그램', '여행정보', '운영·교통'].includes(item.category));
  assert(['continuous', 'occurrences', 'season', 'undated'].includes(item.dateKind));
  assert(['published', 'cancelled', 'draft'].includes(item.status));
  for (const key of ['title', 'summary', 'location', 'schedule']) assert(typeof item[key] === 'string' && item[key].trim(), `${item.id}: missing ${key}`);
  assert(typeof item.price === 'string');
  assert(item.summary.length <= 300, `${item.id}: summary too long`);
  assert(sources.has(item.sourceId) && url(item.sourceUrl), `${item.id}: invalid source`);
  assert(timestamp(item.checkedAt) && date(item.reviewBy));
  const checkedDay = new Date(new Date(item.checkedAt).getTime() + 9 * 3600000).toISOString().slice(0, 10);
  assert(item.reviewBy >= checkedDay && Date.parse(item.reviewBy) - Date.parse(checkedDay) <= 14 * 86400000, `${item.id}: review required within 14 days`);
  assert(new Date(item.checkedAt) <= new Date(data.updatedAt), `${item.id}: checkedAt later than update`);
  assert(Array.isArray(item.occurrenceDates) && item.occurrenceDates.every(date));
  if (item.dateKind === 'undated') assert(item.startDate === null && item.endDate === null && item.occurrenceDates.length === 0);
  else {
    assert(date(item.startDate) && date(item.endDate) && item.startDate <= item.endDate, `${item.id}: invalid date range`);
    if (item.dateKind === 'occurrences') {
      assert(item.occurrenceDates.length > 0 && new Set(item.occurrenceDates).size === item.occurrenceDates.length);
      assert(item.occurrenceDates.every(d => d >= item.startDate && d <= item.endDate));
    } else assert.equal(item.occurrenceDates.length, 0);
  }
  const key = `${item.title.trim()}|${item.startDate}|${item.location.trim()}`;
  assert(!duplicates.has(key), `${item.id}: duplicate event`); duplicates.add(key);
}
console.log(`지금 경주: validated ${data.items.length} items and ${data.sources.length} sources.`);
