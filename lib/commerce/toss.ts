import { CommerceError } from "./validation";
import type { TossPayment } from "./store";
export class TossError extends CommerceError {
  constructor(
    public code: string,
    status: number,
  ) {
    super(
      "결제사에서 요청을 처리하지 못했습니다. 예약 내역을 확인한 후 다시 시도해 주세요.",
      status,
    );
  }
}
export async function tossRequest(
  path: string,
  body?: unknown,
  idempotencyKey?: string,
): Promise<TossPayment> {
  const secret = process.env.TOSS_SECRET_KEY;
  if (!secret) throw new CommerceError("온라인 결제를 준비하고 있습니다.", 503);
  const response = await fetch(
    `https://api.tosspayments.com/v1/payments${path}`,
    {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${secret}:`).toString("base64")}`,
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new TossError(
      String(data.code || "PAYMENT_ERROR"),
      response.status >= 500 ? 502 : 409,
    );
  return data as TossPayment;
}
