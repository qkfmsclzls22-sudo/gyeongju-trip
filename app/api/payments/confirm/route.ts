import { NextRequest, NextResponse } from "next/server";
import { getTour, calcAmount } from "@/lib/tours";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    paymentKey,
    orderId,
    amount,
    tourId,
    adultCount,
    childCount,
    date,
    time,
    name,
    phone,
    email,
  } = body;

  if (!paymentKey || !orderId || !amount || !tourId) {
    return NextResponse.json({ result: "error", message: "필수 값이 누락되었습니다." }, { status: 400 });
  }

  const tour = getTour(tourId);
  if (!tour) {
    return NextResponse.json({ result: "error", message: "존재하지 않는 투어입니다." }, { status: 400 });
  }

  const adults = Number(adultCount) || 0;
  const children = Number(childCount) || 0;
  const receivedAmount = Number(amount);
  const expectedAmount = calcAmount(tour, adults, children);

  // 클라이언트가 보낸 금액이 서버가 계산한 정가와 다르면 승인 자체를 시도하지 않는다 (가격 변조 방어)
  if (adults + children < 1 || expectedAmount !== receivedAmount) {
    return NextResponse.json(
      { result: "error", message: "결제 금액이 일치하지 않습니다. 다시 시도해주세요." },
      { status: 400 }
    );
  }

  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { result: "error", message: "서버에 TOSS_SECRET_KEY가 설정되어 있지 않습니다." },
      { status: 500 }
    );
  }

  const basicAuth = Buffer.from(`${secretKey}:`).toString("base64");

  let tossJson: Record<string, unknown>;
  try {
    const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount: receivedAmount }),
    });
    tossJson = await tossRes.json();
    if (!tossRes.ok) {
      // 새로고침 등으로 이미 승인된 결제를 다시 확인 요청한 경우 — 사용자에게는 성공으로 응답 (주문 알림은 최초 1회만 발송되었으므로 재발송하지 않음)
      if (tossJson.code === "ALREADY_PROCESSED_PAYMENT") {
        return NextResponse.json({ result: "success", payment: tossJson, alreadyProcessed: true });
      }
      return NextResponse.json(
        {
          result: "error",
          message: (tossJson.message as string) || "결제 승인에 실패했습니다.",
          code: tossJson.code,
        },
        { status: tossRes.status }
      );
    }
  } catch {
    return NextResponse.json(
      { result: "error", message: "결제 승인 서버 통신 중 오류가 발생했습니다." },
      { status: 502 }
    );
  }

  // 결제는 이미 승인 완료된 상태 — 주문 알림(시트 기록 + 이메일)이 실패해도 사용자에게는 결제 성공으로 응답한다.
  const orderWebappUrl = process.env.ORDER_WEBAPP_URL;
  if (orderWebappUrl) {
    try {
      await fetch(orderWebappUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          주문번호: orderId,
          투어명: tour.name,
          참가일시: `${date ?? ""} ${time ?? ""}`.trim(),
          성인: adults,
          어린이: children,
          결제금액: receivedAmount,
          예약자명: name ?? "",
          연락처: phone ?? "",
          이메일: email ?? "",
          결제수단: tossJson.method ?? "",
          승인시각: tossJson.approvedAt ?? "",
        }),
      });
    } catch (err) {
      console.error(`[payments/confirm] 주문 알림 전송 실패 (orderId=${orderId}):`, err);
    }
  } else {
    console.error(`[payments/confirm] ORDER_WEBAPP_URL 미설정 — 주문 알림을 보내지 못함 (orderId=${orderId})`);
  }

  return NextResponse.json({ result: "success", payment: tossJson });
}
