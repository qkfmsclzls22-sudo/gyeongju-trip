import { query, transaction } from "@/lib/commerce/db";
import { applyPayment } from "@/lib/commerce/store";
import { tossRequest } from "@/lib/commerce/toss";
import { errorResponse, privateJson, readJson } from "@/lib/commerce/http";
import { record, textField } from "@/lib/commerce/validation";
export async function POST(request: Request) {
  try {
    const body = record(await readJson(request));
    if (body.eventType !== "PAYMENT_STATUS_CHANGED")
      return privateJson({ ok: true });
    const data = record(body.data);
    const paymentKey = textField(data.paymentKey, "결제 정보", 200);
    const [booking] = await query(
      "SELECT id FROM gj_bookings WHERE payment_key=$1",
      [paymentKey],
    );
    if (!booking) return privateJson({ ok: true });
    const payment = await tossRequest(`/${encodeURIComponent(paymentKey)}`);
    await transaction((client) => applyPayment(client, payment));
    return privateJson({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
