import test, { before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import {
  reserve,
  beginConfirmation,
  applyPayment,
  type SqlClient,
  type TossPayment,
} from "../lib/commerce/store";
import {
  bookingInput,
  safeReturnPath,
  sessionInput,
} from "../lib/commerce/validation";
import { getTour } from "../lib/tours";
import { paymentReady } from "../lib/commerce/config";

const db = new PGlite();
let user: string, other: string, slot: string;
before(async () => {
  await db.exec(
    await readFile(
      new URL("../migrations/001-commerce.sql", import.meta.url),
      "utf8",
    ),
  );
});
after(async () => {
  await db.close();
});
beforeEach(async () => {
  await db.exec(
    "TRUNCATE gj_booking_events,gj_bookings,gj_sessions,gj_members CASCADE",
  );
  user = randomUUID();
  other = randomUUID();
  slot = randomUUID();
  for (const id of [user, other])
    await db.query(
      "INSERT INTO gj_members(id,provider,provider_account_id,name,consent_at) VALUES($1,'google',$2,'테스트',now())",
      [id, id],
    );
  await db.query(
    "INSERT INTO gj_sessions(id,tour_id,starts_at,capacity,min_people,adult_price,child_price) VALUES($1,'museum',now()+interval '3 days',3,7,25000,22000)",
    [slot],
  );
});
const input = (overrides: Record<string, unknown> = {}) =>
  bookingInput({
    sessionId: slot,
    requestId: randomUUID(),
    adultCount: 1,
    childCount: 1,
    name: "테스트",
    phone: "010-1234-5678",
    agreed: true,
    ...overrides,
  });
const tx = <T>(fn: (c: SqlClient) => Promise<T>) =>
  db.transaction((tx) => fn({ query: (sql, values) => tx.query(sql, values) }));
const paid = (
  b: { id: string; amount: number },
  overrides: Partial<TossPayment> = {},
): TossPayment => ({
  paymentKey: "test-payment",
  orderId: b.id,
  totalAmount: b.amount,
  balanceAmount: b.amount,
  currency: "KRW",
  status: "DONE",
  type: "NORMAL",
  ...overrides,
});

test("repeated schema setup preserves existing members and tour sessions", async () => {
  await db.exec(
    await readFile(
      new URL("../migrations/001-commerce.sql", import.meta.url),
      "utf8",
    ),
  );
  const members = await db.query<{ id: string }>(
    "SELECT id FROM gj_members ORDER BY id",
  );
  assert.deepEqual(members.rows.map((row) => row.id), [user, other].sort());
  const sessions = await db.query<{ id: string; adult_price: number }>(
    "SELECT id,adult_price FROM gj_sessions",
  );
  assert.deepEqual(sessions.rows, [{ id: slot, adult_price: 25000 }]);
});

test("server derives amount from stored prices; client price fields have no effect", async () => {
  const b = await tx((c) =>
    reserve(c, user, input({ amount: 1, adultPrice: 1 })),
  );
  assert.equal(b.amount, 47000);
  assert.equal(b.phone, "01012345678");
  assert.equal(b.status, "pending");
});
test("negative, fractional, zero-party, excessive and missing-consent bookings rejected", () => {
  for (const data of [
    { adultCount: -1 },
    { adultCount: 1.5 },
    { adultCount: "1" },
    { adultCount: 0, childCount: 0 },
    { adultCount: 20, childCount: 1 },
    { agreed: false },
  ])
    assert.throws(() => input(data));
});
test("idempotent retry returns one order; changed data with same key rejected", async () => {
  const b = input();
  const first = await tx((c) => reserve(c, user, b));
  const second = await tx((c) => reserve(c, user, b));
  assert.equal(first.id, second.id);
  await assert.rejects(
    tx((c) => reserve(c, user, { ...b, childCount: 0 })),
    /변경/,
  );
  const { rows } = await db.query<{ count: number }>(
    "SELECT count(*)::int AS count FROM gj_bookings",
  );
  assert.equal(rows[0].count, 1);
});
test("capacity reserved before payment and enforced for the next customer", async () => {
  await tx((c) => reserve(c, user, input()));
  await assert.rejects(
    tx((c) => reserve(c, other, input())),
    /잔여 인원/,
  );
});
test("expired pending reservations release seats, confirming reservations do not", async () => {
  const b = await tx((c) => reserve(c, user, input()));
  await db.query(
    "UPDATE gj_bookings SET expires_at=now()-interval '1 minute' WHERE id=$1",
    [b.id],
  );
  await tx((c) => reserve(c, other, input()));
  await db.query("UPDATE gj_bookings SET status='confirming' WHERE id=$1", [
    b.id,
  ]);
  await assert.rejects(
    tx((c) => reserve(c, user, input({ adultCount: 1, childCount: 0 }))),
    /잔여 인원/,
  );
});
test("unconsented member and closed session cannot reserve", async () => {
  await db.query("UPDATE gj_members SET consent_at=null WHERE id=$1", [user]);
  await assert.rejects(
    tx((c) => reserve(c, user, input())),
    /동의/,
  );
  await db.query("UPDATE gj_sessions SET status='closed' WHERE id=$1", [slot]);
  await assert.rejects(
    tx((c) => reserve(c, other, input())),
    /회차/,
  );
});
test("cross-account approval, price tampering and expired approval rejected", async () => {
  const b = await tx((c) => reserve(c, user, input()));
  await assert.rejects(
    tx((c) => beginConfirmation(c, b.id, other, "test-payment", b.amount)),
    /찾을 수/,
  );
  await assert.rejects(
    tx((c) => beginConfirmation(c, b.id, user, "test-payment", 1)),
    /금액/,
  );
  await db.query(
    "UPDATE gj_bookings SET expires_at=now()-interval '1 minute' WHERE id=$1",
    [b.id],
  );
  await assert.rejects(
    tx((c) => beginConfirmation(c, b.id, user, "test-payment", b.amount)),
    /종료/,
  );
});
test("provider verification rejects mismatched key, amount, currency, order type", async () => {
  const b = await tx((c) => reserve(c, user, input()));
  await tx((c) => beginConfirmation(c, b.id, user, "test-payment", b.amount));
  for (const value of [
    { paymentKey: "other-key" },
    { totalAmount: 1 },
    { currency: "USD" },
    { type: "BILLING" },
  ])
    await assert.rejects(
      tx((c) => applyPayment(c, paid(b, value))),
      /일치하지/,
    );
  const { rows } = await db.query<{status:string}>(
    "SELECT status FROM gj_bookings WHERE id=$1",
    [b.id],
  );
  assert.equal(rows[0].status, "confirming");
});
test("duplicate confirmations and webhook replays produce one paid event", async () => {
  const b = await tx((c) => reserve(c, user, input()));
  await tx((c) => beginConfirmation(c, b.id, user, "test-payment", b.amount));
  await tx((c) => applyPayment(c, paid(b)));
  await tx((c) => applyPayment(c, paid(b)));
  const again = await tx((c) =>
    beginConfirmation(c, b.id, user, "test-payment", b.amount),
  );
  assert.equal(again.status, "paid");
  const { rows } = await db.query<{ count: number }>(
    "SELECT count(*)::int AS count FROM gj_booking_events WHERE event='payment_confirmed'",
  );
  assert.equal(rows[0].count, 1);
});
test("late payment after operator cancels session becomes a cancellation request", async () => {
  const b = await tx((c) => reserve(c, user, input()));
  await tx((c) => beginConfirmation(c, b.id, user, "test-payment", b.amount));
  await db.query("UPDATE gj_sessions SET status='cancelled' WHERE id=$1", [
    slot,
  ]);
  const result = await tx((c) => applyPayment(c, paid(b)));
  assert.equal(result.status, "cancel_requested");
});
test("provider failed payment releases reservation; stale success cannot resurrect it", async () => {
  const b = await tx((c) => reserve(c, user, input()));
  await tx((c) => beginConfirmation(c, b.id, user, "test-payment", b.amount));
  await tx((c) => applyPayment(c, paid(b, { status: "ABORTED" })));
  const b2 = await tx((c) => applyPayment(c, paid(b)));
  assert.equal(b2.status, "cancelled");
});
test("partial refund settles only the expected refund and cannot be reverted by DONE replay", async () => {
  const b = await tx((c) => reserve(c, user, input()));
  await tx((c) => beginConfirmation(c, b.id, user, "test-payment", b.amount));
  await tx((c) => applyPayment(c, paid(b)));
  await db.query(
    "UPDATE gj_bookings SET status='refund_pending',refund_amount=22000 WHERE id=$1",
    [b.id],
  );
  let result = await tx((c) =>
    applyPayment(
      c,
      paid(b, { status: "PARTIAL_CANCELED", balanceAmount: 40000 }),
    ),
  );
  assert.equal(result.status, "refund_pending");
  result = await tx((c) =>
    applyPayment(
      c,
      paid(b, { status: "PARTIAL_CANCELED", balanceAmount: 25000 }),
    ),
  );
  assert.equal(result.status, "refunded");
  result = await tx((c) => applyPayment(c, paid(b)));
  assert.equal(result.status, "refunded");
});
test("redirect paths, prototype names and impossible dates rejected", () => {
  for (const value of [
    "https://example.com",
    "//example.com",
    "/\\example.com",
    "/\nexample.com",
  ])
    assert.equal(safeReturnPath(value), "/account");
  assert.equal(safeReturnPath("/checkout/museum"), "/checkout/museum");
  assert.equal(getTour("constructor"), undefined);
  assert.equal(getTour("__proto__"), undefined);
  assert.throws(
    () =>
      sessionInput({
        tourId: "museum",
        date: "2030-02-31",
        time: "10:00",
        capacity: 15,
        minPeople: 7,
        adultPrice: 25000,
        childPrice: 22000,
      }),
    /실제 날짜/,
  );
});
test("live payment cannot enable without deliberate launch flag or with mixed keys", () => {
  const saved = { ...process.env };
  Object.assign(process.env, {
    DATABASE_URL: "postgres://test",
    NEXTAUTH_SECRET: "test",
    GOOGLE_CLIENT_ID: "test-client",
    GOOGLE_CLIENT_SECRET: "test-secret",
    NEXTAUTH_URL: "https://www.gjtrip.co.kr",
    COMMERCE_ENABLED: "true",
    COMMERCE_MODE: "live",
    NEXT_PUBLIC_TOSS_CLIENT_KEY: "live_ck_test",
    TOSS_SECRET_KEY: "live_sk_test",
    COMMERCE_LIVE_APPROVED: "false",
  });
  assert.equal(paymentReady(), false);
  process.env.COMMERCE_LIVE_APPROVED = "true";
  assert.equal(paymentReady(), true);
  process.env.TOSS_SECRET_KEY = "test_sk_test";
  assert.equal(paymentReady(), false);
  for (const k of Object.keys(process.env))
    if (!(k in saved)) delete process.env[k];
  Object.assign(process.env, saved);
});
