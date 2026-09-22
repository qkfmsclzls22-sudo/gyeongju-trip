import { transaction } from "@/lib/commerce/db";
import { applyPayment, lockBooking, verifyPayment } from "@/lib/commerce/store";
import { tossRequest } from "@/lib/commerce/toss";
import {
  assertSameOrigin,
  errorResponse,
  privateJson,
  readJson,
  requireMember,
} from "@/lib/commerce/http";
import {
  CommerceError,
  integer,
  record,
  textField,
  uuidField,
} from "@/lib/commerce/validation";
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await requireMember(true);
    const body = record(await readJson(request));
    const id = uuidField(body.id);
    if (body.action === "reconcile") {
      const { booking } = await transaction((client) =>
        lockBooking(client, id),
      );
      if (!booking.payment_key)
        throw new CommerceError("승인 요청이 시작되지 않은 주문입니다.");
      const payment = await tossRequest(
        `/${encodeURIComponent(booking.payment_key)}`,
      );
      await transaction((client) => applyPayment(client, payment));
      return privateJson({ ok: true });
    }
    if (body.action !== "refund")
      throw new CommerceError("올바른 요청이 아닙니다.");
    const amount = integer(body.amount, 0, 20000000, "환불 금액");
    const reason = textField(body.reason, "환불 사유", 200);
    const booking = await transaction(async (client) => {
      const { booking: b, slot } = await lockBooking(client, id);
      if (
        !["paid", "cancel_requested", "refund_pending", "refunded"].includes(
          b.status,
        )
      )
        throw new CommerceError("환불 가능한 결제 내역이 아닙니다.", 409);
      if (amount > b.amount)
        throw new CommerceError("환불 금액은 결제 금액을 초과할 수 없습니다.");
      if (slot.status === "cancelled" && amount !== b.amount)
        throw new CommerceError("운영 취소된 투어는 전액 환불해야 합니다.");
      if (["refund_pending", "refunded"].includes(b.status)) {
        if (b.refund_amount !== amount || b.cancel_reason !== reason)
          throw new CommerceError("기존 환불 요청과 일치하지 않습니다.", 409);
        return b;
      }
      if (!b.payment_key)
        throw new CommerceError("결제 정보를 확인할 수 없습니다.");
      const status = amount === 0 ? "cancelled" : "refund_pending";
      await client.query(
        "UPDATE gj_bookings SET status=$2,refund_amount=$3,cancel_reason=$4,updated_at=now() WHERE id=$1",
        [id, status, amount, reason],
      );
      await client.query(
        "INSERT INTO gj_booking_events(booking_id,actor_id,event) VALUES($1,$2,$3)",
        [id, user.id, `refund_requested:${amount}`],
      );
      return { ...b, status, refund_amount: amount, cancel_reason: reason };
    });
    if (booking.status === "refunded" || amount === 0)
      return privateJson({ ok: true });
    // Check provider state before refunding; preserve the same idempotency key across retries.
    let payment = await tossRequest(
      `/${encodeURIComponent(booking.payment_key!)}`,
    );
    verifyPayment(payment, booking);
    if (payment.status === "DONE") {
      payment = await tossRequest(
        `/${encodeURIComponent(booking.payment_key!)}/cancel`,
        {
          cancelReason: booking.cancel_reason,
          cancelAmount: booking.refund_amount,
        },
        `refund-${id}`,
      );
    }
    const settled = await transaction((client) =>
      applyPayment(client, payment),
    );
    if (settled.status !== "refunded")
      throw new CommerceError(
        "결제사 취소 내역을 확인해야 합니다. 결과 재확인을 눌러 주세요.",
        409,
      );
    return privateJson({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
