import assert from "node:assert/strict";
import test from "node:test";
import { calcAmount, TOURS } from "../lib/tours";
import { EMPTY_NOTE, formatTravelNote, parseTravelNote } from "../lib/travel-note";

test("migrates an existing saved shortlist without inventing a companion", () => {
  const note = parseTravelNote(["night", "invalid", "night", "museum", "constructor", null]);
  assert.deepEqual(note, { ...EMPTY_NOTE, saved: ["night", "museum"] });
  assert.doesNotMatch(formatTravelNote(note), /동행:/);
});
test("restores the complete note and ignores corrupt metadata", () => {
  const valid = { saved: ["bulguksa"], date: "2026-11-03", companion: "couple", adults: 2, children: 1 };
  assert.deepEqual(parseTravelNote(valid), valid);
  assert.deepEqual(parseTravelNote({ saved: false, date: "2026-02-30", companion: "unknown", adults: 20, children: 20 }), EMPTY_NOTE);
  assert.deepEqual(parseTravelNote({ adults: 0, children: 0 }), EMPTY_NOTE);
  assert.deepEqual(parseTravelNote({ adults: 1.5, children: -1 }), EMPTY_NOTE);
});
test("estimates child pricing and all-age night pricing for the same party", () => {
  assert.equal(calcAmount(TOURS.museum, 2, 1), 72000);
  assert.equal(calcAmount(TOURS.bulguksa, 2, 1), 69400);
  assert.equal(calcAmount(TOURS.night, 2, 1), 50700);
});
test("shared note carries the corrected routes, meeting information and non-booking warning", () => {
  const text = formatTravelNote({ ...EMPTY_NOTE, saved: ["bulguksa", "night"], adults: 2, children: 1 });
  assert.match(text, /석굴암/);
  assert.match(text, /동궁과월지 → 첨성대 → 월정교/);
  assert.doesNotMatch(text, /월성해자/);
  assert.match(text, /50,700원/);
  assert.match(text, /최소 7명 모집 시 출발/);
  assert.match(text, /예약 확정이나 하루 일정표가 아닙니다/);
});
