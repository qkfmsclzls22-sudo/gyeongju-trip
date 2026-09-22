import { randomUUID } from "node:crypto";
import { query, transaction } from "@/lib/commerce/db";
import {
  assertSameOrigin,
  errorResponse,
  privateJson,
  readJson,
  requireMember,
} from "@/lib/commerce/http";
import {
  CommerceError,
  record,
  sessionInput,
  uuidField,
} from "@/lib/commerce/validation";
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await requireMember(true);
    const s = sessionInput(await readJson(request));
    await query(
      `INSERT INTO gj_sessions(id,tour_id,starts_at,capacity,min_people,adult_price,child_price) VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [
        randomUUID(),
        s.tourId,
        s.startsAt,
        s.capacity,
        s.minPeople,
        s.adultPrice,
        s.childPrice,
      ],
    );
    return privateJson({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
export async function PATCH(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await requireMember(true);
    const b = record(await readJson(request));
    const id = uuidField(b.id);
    if (
      typeof b.status !== "string" ||
      !["open", "closed", "confirmed", "cancelled"].includes(b.status)
    )
      throw new CommerceError("운영 상태를 확인해 주세요.");
    await transaction(async (client) => {
      const {
        rows: [slot],
      } = await client.query(
        "SELECT * FROM gj_sessions WHERE id=$1 FOR UPDATE",
        [id],
      );
      if (!slot) throw new CommerceError("회차를 찾을 수 없습니다.", 404);
      if (slot.status === "cancelled" && b.status !== "cancelled")
        throw new CommerceError(
          "취소한 회차는 다시 열 수 없습니다. 새 회차를 등록해 주세요.",
          409,
        );
      await client.query("UPDATE gj_sessions SET status=$2 WHERE id=$1", [
        id,
        b.status,
      ]);
      if (b.status === "cancelled") {
        await client.query(
          "UPDATE gj_bookings SET status='cancelled',cancel_reason='운영 취소',updated_at=now() WHERE session_id=$1 AND status='pending'",
          [id],
        );
        await client.query(
          "UPDATE gj_bookings SET status='cancel_requested',cancel_reason='운영 취소: 전액 환불',updated_at=now() WHERE session_id=$1 AND status IN ('paid','cancel_requested')",
          [id],
        );
      }
      await client.query(
        "INSERT INTO gj_booking_events(actor_id,event) VALUES($1,$2)",
        [user.id, `session:${id}:${b.status}`],
      );
    });
    return privateJson({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
