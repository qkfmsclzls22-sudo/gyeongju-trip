import { currentMember } from "@/lib/auth";
import { sql } from "@/lib/db";
import { isSameOrigin, readObject } from "@/lib/http";
import {
  testCheckoutEnabled,
  COMMERCE_DISABLED,
  tossHeaders,
} from "@/lib/commerce";
import { paymentMatches } from "@/lib/booking";
type Order = {
  id: string;
  amount: number;
  status: string;
  payment_key: string | null;
};
export async function POST(req: Request) {
  if (!testCheckoutEnabled())
    return Response.json(
      { result: "error", message: COMMERCE_DISABLED },
      { status: 503 },
    );
  if (!isSameOrigin(req))
    return Response.json(
      { result: "error", message: "요청을 확인해 주세요." },
      { status: 403 },
    );
  try {
    const member = await currentMember();
    if (!member)
      return Response.json(
        { result: "error", message: "로그인이 필요합니다." },
        { status: 401 },
      );
    let body;
    try {
      body = await readObject(req);
    } catch {
      return Response.json(
        { result: "error", message: "요청 내용이 올바르지 않습니다." },
        { status: 400 },
      );
    }
    const { paymentKey, orderId, amount } = body;
    if (
      typeof paymentKey !== "string" ||
      paymentKey.length < 1 ||
      paymentKey.length > 200 ||
      typeof orderId !== "string" ||
      !/^GJT_[a-f0-9]{32}$/.test(orderId) ||
      typeof amount !== "number" ||
      !Number.isSafeInteger(amount) ||
      amount <= 0
    )
      return Response.json(
        { result: "error", message: "결제 정보를 확인해 주세요." },
        { status: 400 },
      );
    const db = sql();
    const rows =
      await db`SELECT id,amount,status,payment_key FROM orders WHERE id=${orderId} AND member_id=${member.id} AND is_test=true`;
    const order = rows[0] as Order | undefined;
    if (
      !order ||
      order.amount !== amount ||
      (order.payment_key && order.payment_key !== paymentKey)
    )
      return Response.json(
        { result: "error", message: "주문 정보가 일치하지 않습니다." },
        { status: 400 },
      );
    if (order.status === "paid")
      return Response.json({
        result: "success",
        orderId,
        amount,
        isTest: true,
      });
    const claimed =
      await db`UPDATE orders SET status='confirming',payment_key=${paymentKey} WHERE id=${orderId} AND member_id=${member.id} AND ((status='pending' AND expires_at>now()) OR (status='confirming' AND payment_key=${paymentKey})) RETURNING id`;
    if (!claimed.length)
      return Response.json(
        {
          result: "error",
          message: "주문 유효 시간이 지났거나 처리할 수 없는 상태입니다.",
        },
        { status: 409 },
      );
    let response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: { ...tossHeaders(), "Idempotency-Key": orderId },
        body: JSON.stringify({ paymentKey, orderId, amount: order.amount }),
        signal: AbortSignal.timeout(15000),
        cache: "no-store",
      },
    );
    let payment = (await response.json()) as Record<string, unknown>;
    if (payment.code === "ALREADY_PROCESSED_PAYMENT") {
      response = await fetch(
        "https://api.tosspayments.com/v1/payments/" +
          encodeURIComponent(paymentKey),
        {
          headers: tossHeaders(),
          signal: AbortSignal.timeout(10000),
          cache: "no-store",
        },
      );
      payment = await response.json();
    }
    if (!response.ok || !paymentMatches(payment, order, paymentKey))
      return Response.json(
        {
          result: "error",
          message:
            "결제 상태를 확인하지 못했습니다. 다시 확인하거나 고객센터에 문의해 주세요.",
        },
        { status: 502 },
      );
    const saved =
      await db`UPDATE orders SET status='paid',paid_at=now() WHERE id=${orderId} AND member_id=${member.id} AND payment_key=${paymentKey} AND status IN ('confirming','paid') RETURNING id`;
    if (!saved.length) throw new Error();
    return Response.json({
      result: "success",
      orderId,
      amount: order.amount,
      isTest: true,
    });
  } catch {
    return Response.json(
      {
        result: "error",
        message:
          "결제 상태 확인이 지연되고 있습니다. 다시 결제하지 말고 상태를 다시 확인해 주세요.",
      },
      { status: 503 },
    );
  }
}
