import { transaction } from "@/lib/commerce/db";
import {
  applyPayment,
  beginConfirmation,
  lockBooking,
  type TossPayment,
} from "@/lib/commerce/store";
import { tossRequest, TossError } from "@/lib/commerce/toss";
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
    const user = await requireMember();
    const body = record(await readJson(request));
    const id = uuidField(body.orderId);
    const paymentKey = textField(body.paymentKey, "결제 정보", 200);
    const amount = integer(body.amount, 100, 20000000, "결제 금액");
    const booking = await transaction((client) =>
      beginConfirmation(client, id, user.id, paymentKey, amount),
    );
    if (
      ["paid", "cancel_requested", "refund_pending", "refunded"].includes(
        booking.status,
      )
    )
      return privateJson({
        result: "success",
        orderId: id,
        amount: booking.amount,
        status: booking.status,
      });
    let payment: TossPayment;
    try {
      payment = await tossRequest(
        "/confirm",
        { paymentKey, orderId: id, amount: booking.amount },
        `confirm-${id}`,
      );
    } catch (error) {
      if (error instanceof TossError && error.code === "NOT_FOUND_PAYMENT") {
        // The provider explicitly rejected a nonexistent key; no charge was made.
        await transaction(async (client) => {
          const { booking: current } = await lockBooking(client, id);
          if (current.status === "confirming" && current.payment_key === paymentKey) {
            await client.query("UPDATE gj_bookings SET status='cancelled',updated_at=now() WHERE id=$1", [id]);
          }
        });
        throw error;
      }
      // An ambiguous timeout or ALREADY_PROCESSED_PAYMENT never implies success.
      try {
        payment = await tossRequest(`/${encodeURIComponent(paymentKey)}`);
      } catch {
        throw error;
      }
      if (payment.status !== "DONE") {
        await transaction((client) => applyPayment(client, payment));
        if (error instanceof TossError) throw error;
        throw new CommerceError(
          "결제 결과를 확인하고 있습니다. 새 결제 대신 예약 내역에서 확인해 주세요.",
          503,
        );
      }
    }
    const settled = await transaction((client) =>
      applyPayment(client, payment),
    );
    if (!["paid", "cancel_requested"].includes(settled.status))
      throw new CommerceError(
        "결제가 완료되지 않았습니다. 예약 내역을 확인해 주세요.",
        409,
      );
    return privateJson({
      result: "success",
      orderId: id,
      amount: settled.amount,
      status: settled.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
