import { transaction } from "@/lib/commerce/db";
import { lockBooking } from "@/lib/commerce/store";
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
  textField,
  uuidField,
} from "@/lib/commerce/validation";
export async function POST(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    assertSameOrigin(request);
    const user = await requireMember();
    const id = uuidField((await ctx.params).id);
    const body = record(await readJson(request));
    const reason = textField(body.reason, "취소 사유", 200);
    await transaction(async (client) => {
      const { booking } = await lockBooking(client, id);
      if (booking.member_id !== user.id)
        throw new CommerceError("예약을 찾을 수 없습니다.", 404);
      if (
        [
          "cancel_requested",
          "refunded",
          "cancelled",
          "refund_pending",
        ].includes(booking.status)
      )
        return;
      if (booking.status === "confirming")
        throw new CommerceError(
          "결제 결과를 확인 중입니다. 잠시 후 다시 시도해 주세요.",
          409,
        );
      await client.query(
        "UPDATE gj_bookings SET status=$2,cancel_reason=$3,updated_at=now() WHERE id=$1",
        [
          id,
          booking.status === "pending" ? "cancelled" : "cancel_requested",
          reason,
        ],
      );
      await client.query(
        "INSERT INTO gj_booking_events(booking_id,actor_id,event) VALUES($1,$2,'cancel_requested')",
        [id, user.id],
      );
    });
    return privateJson({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
