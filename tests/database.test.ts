import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
test("orders reserve capacity atomically; expiry returns it only once; paid and uncertain orders retain it", async () => {
  const db = new PGlite();
  try {
    await db.exec(
      await readFile(
        new URL("../db/001_members_and_orders.sql", import.meta.url),
        "utf8",
      ),
    );
    const member = await db.query<{ id: string }>(
      "INSERT INTO members(provider,subject_hash,display_name,consent_version,consented_at) VALUES('naver','test-subject','Test','2026-09-07',now()) RETURNING id",
    );
    const id = member.rows[0].id;
    await db.exec(
      "INSERT INTO tour_sessions(tour_id,travel_date,travel_time,capacity,active) VALUES('night','2099-09-01','18:30',3,true)",
    );
    const reserve = (order: string, n: number) =>
      db.query(
        "SELECT * FROM create_test_order($1,$2,'night','Test tour','2099-09-01','18:30',$3,0,$4)",
        [order, id, n, n * 16900],
      );
    const seats = async () =>
      (
        await db.query<{ reserved: number }>(
          "SELECT reserved FROM tour_sessions",
        )
      ).rows[0].reserved;
    await reserve("one", 2);
    assert.equal(await seats(), 2);
    await assert.rejects(reserve("oversold", 2));
    assert.equal(await seats(), 2);
    assert.equal(
      (await db.query("SELECT * FROM orders WHERE id='oversold'")).rows.length,
      0,
    );
    await db.exec("UPDATE orders SET status='expired' WHERE id='one'");
    assert.equal(await seats(), 0);
    await db.exec("UPDATE orders SET status='expired' WHERE id='one'");
    assert.equal(await seats(), 0);
    await reserve("two", 1);
    await db.exec(
      "UPDATE orders SET status='confirming',payment_key='key2',expires_at=now()-interval '1 hour' WHERE id='two'",
    );
    await reserve("three", 1);
    assert.equal(await seats(), 2);
    assert.equal(
      (
        await db.query<{ status: string }>(
          "SELECT status FROM orders WHERE id='two'",
        )
      ).rows[0].status,
      "confirming",
    );
    await db.exec(
      "UPDATE orders SET status='paid',paid_at=now() WHERE id='two'",
    );
    assert.equal(await seats(), 2);
    await db.exec(
      "UPDATE orders SET expires_at=now()-interval '1 hour' WHERE id='three'",
    );
    await reserve("four", 1);
    assert.equal(await seats(), 2);
    await db.exec("UPDATE members SET revoked_at=now() WHERE id='" + id + "'");
    await assert.rejects(reserve("revoked", 1));
  } finally {
    await db.close();
  }
});
