import test from "node:test";
import assert from "node:assert/strict";
import {
  TOURS,
  calcAmount,
  getTour,
  koreaToday,
  tourTimes,
  isFutureDate,
} from "../lib/tours";
import { validateBooking, paymentMatches } from "../lib/booking";
import { isSameOrigin, safeReturnTo } from "../lib/http";
import { makeConsent, validConsent } from "../lib/auth-consent";
import { testCheckoutEnabled } from "../lib/commerce";
test("server prices calculate adult and child prices correctly", () => {
  assert.equal(calcAmount(TOURS.museum, 2, 1), 72000);
  assert.equal(calcAmount(TOURS.night, 1, 2), 50700);
  assert.equal(calcAmount(TOURS.bulguksa, 1, 1), 44600);
});
test("negative, fractional, non-numeric and oversized counts cannot be priced", () => {
  for (const counts of [
    [-1, 2],
    [1, -1],
    [1.5, 1],
    [1, 0.5],
    [0, 0],
    [1, Infinity],
    [1, NaN],
    [Number.MAX_SAFE_INTEGER, 1],
  ])
    assert.throws(() =>
      calcAmount(TOURS.night, ...(counts as [number, number])),
    );
  assert.throws(() => calcAmount(TOURS.museum, 15, 1));
  assert.equal(getTour("__proto__"), undefined);
  assert.equal(getTour("constructor"), undefined);
});
test("Korea calendar and winter/summer operating hours are consistent", () => {
  assert.equal(koreaToday(new Date("2026-09-07T16:00:00Z")), "2026-09-08");
  assert.deepEqual(tourTimes(TOURS.night, "2028-02-01"), ["18:30"]);
  assert.deepEqual(tourTimes(TOURS.night, "2028-03-01"), ["19:00"]);
  assert.deepEqual(tourTimes(TOURS.night, "2028-08-31"), ["19:00"]);
  assert.deepEqual(tourTimes(TOURS.night, "2028-09-01"), ["18:30"]);
  assert.deepEqual(tourTimes(TOURS.museum, "2028-09-01"), ["10:00", "14:00"]);
});
test("invalid dates and off-schedule reservations are rejected", () => {
  assert.equal(isFutureDate("2099-02-30"), false);
  assert.equal(isFutureDate("2000-01-01"), false);
  const input = {
    tourId: "night",
    date: "2099-09-01",
    time: "18:30",
    adultCount: 1,
    childCount: 0,
  };
  assert.equal(validateBooking(input).amount, 16900);
  for (const patch of [
    { time: "19:00" },
    { date: "2000-01-01" },
    { date: "2099-02-30" },
    { adultCount: 0 },
    { adultCount: "1" },
    { childCount: -1 },
    { tourId: "constructor" },
  ])
    assert.throws(() => validateBooking({ ...input, ...patch }));
});
test("already-processed payments require authoritative matching status, amount, key and order", () => {
  const order = { id: "GJT_test", amount: 16900, payment_key: "key" };
  const payment = {
    orderId: "GJT_test",
    totalAmount: 16900,
    paymentKey: "key",
    status: "DONE",
  };
  assert.equal(paymentMatches(payment, order, "key"), true);
  for (const patch of [
    { orderId: "someone-else" },
    { totalAmount: 1 },
    { paymentKey: "other" },
    { status: "READY" },
    { status: "CANCELED" },
  ])
    assert.equal(paymentMatches({ ...payment, ...patch }, order, "key"), false);
  assert.equal(
    paymentMatches({ code: "ALREADY_PROCESSED_PAYMENT" }, order, "key"),
    false,
  );
});
test("cross-origin writes and open return redirects are rejected", () => {
  assert.equal(
    isSameOrigin(
      new Request("https://www.gjtrip.co.kr/api/orders", {
        headers: { origin: "https://evil.example" },
      }),
    ),
    false,
  );
  assert.equal(
    isSameOrigin(new Request("https://www.gjtrip.co.kr/api/orders")),
    false,
  );
  assert.equal(
    isSameOrigin(
      new Request("https://www.gjtrip.co.kr/api/orders", {
        headers: { origin: "https://www.gjtrip.co.kr" },
      }),
    ),
    true,
  );
  for (const value of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "/login",
    "/api/auth/signout",
  ])
    assert.equal(safeReturnTo(value), "/account");
  assert.equal(safeReturnTo("/checkout?tour=night"), "/checkout?tour=night");
});
test("consent tokens expire and cannot be modified", () => {
  const previous = process.env.NEXTAUTH_SECRET;
  process.env.NEXTAUTH_SECRET = "test-only-random-secret-for-unit-validation";
  try {
    const token = makeConsent(1000000);
    assert.equal(validConsent(token, 1001000), true);
    assert.equal(validConsent(token, 1600001), false);
    assert.equal(validConsent(token, 999999), false);
    assert.equal(
      validConsent(token.replace("1000000", "1000001"), 1001000),
      false,
    );
    assert.equal(validConsent(token + "x", 1001000), false);
  } finally {
    if (previous) process.env.NEXTAUTH_SECRET = previous;
    else delete process.env.NEXTAUTH_SECRET;
  }
});
test("live payment keys cannot enable checkout", () => {
  const before = { ...process.env };
  try {
    Object.assign(process.env, {
      COMMERCE_MODE: "test",
      DATABASE_URL: "test",
      NEXTAUTH_SECRET: "test",
      TOSS_CLIENT_KEY: "live_ck_example",
      TOSS_SECRET_KEY: "live_sk_example",
    });
    assert.equal(testCheckoutEnabled(), false);
    process.env.TOSS_CLIENT_KEY = "test_ck_example";
    process.env.TOSS_SECRET_KEY = "test_sk_example";
    assert.equal(testCheckoutEnabled(), true);
    process.env.COMMERCE_MODE = "live";
    assert.equal(testCheckoutEnabled(), false);
  } finally {
    for (const k of [
      "COMMERCE_MODE",
      "DATABASE_URL",
      "NEXTAUTH_SECRET",
      "TOSS_CLIENT_KEY",
      "TOSS_SECRET_KEY",
    ]) {
      if (before[k] === undefined) delete process.env[k];
      else process.env[k] = before[k];
    }
  }
});
