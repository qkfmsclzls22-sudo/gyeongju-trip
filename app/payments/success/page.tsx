"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import CommerceShell from "@/app/components/CommerceShell";
import { bookingLabels } from "@/lib/commerce/display";
function PaymentResult() {
  const params = useSearchParams();
  const started = useRef(false);
  const [state, setState] = useState<{
    error?: string;
    amount?: number;
    status?: string;
    id?: string;
  }>({});
  const paymentKey = params.get("paymentKey"),
    orderId = params.get("orderId"),
    amount = params.get("amount");
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) }),
    })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.message);
        setState({ amount: d.amount, status: d.status, id: d.orderId });
        window.history.replaceState(null, "", "/payments/success");
      })
      .catch((e) =>
        setState({ error: e.message || "결제 결과를 확인하지 못했습니다." }),
      );
  }, [paymentKey, orderId, amount]);
  return (
    <CommerceShell>
      <div className="panel stack max-w-2xl mx-auto" aria-live="polite">
        {state.error ? (
          <>
            <h1>결제 결과를 확인해 주세요</h1>
            <p className="error" role="alert">
              {state.error}
            </p>
            <p>
              이미 승인된 결제일 수 있습니다. 다시 결제하기 전에 내 예약을
              확인해 주세요.
            </p>
            <a className="button" href="/account">
              내 예약 확인
            </a>
            <a className="text-link" href="tel:01084028543">
              고객센터 010-8402-8543
            </a>
          </>
        ) : state.status ? (
          <>
            <p className="eyebrow">MY RESERVATION</p>
            <h1>{bookingLabels[state.status] || "예약 확인"}</h1>
            <p className="amount">{state.amount?.toLocaleString()}원</p>
            <p className="booking-id">예약번호 {state.id}</p>
            <p className="notice">
              출발 확정 여부는 내 예약에서 확인해 주세요. 모집 인원 미달로
              운영이 취소되면 전액 환불됩니다.
            </p>
            <a className="button" href="/account">
              내 예약 보기
            </a>
          </>
        ) : (
          <>
            <h1>결제를 확인하고 있어요</h1>
            <p>
              잠시만 기다려 주세요. 이 화면에서 다시 결제하지 않으셔도 됩니다.
            </p>
          </>
        )}
      </div>
    </CommerceShell>
  );
}
export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <CommerceShell>
          <p>결제 내역을 불러오고 있습니다.</p>
        </CommerceShell>
      }
    >
      <PaymentResult />
    </Suspense>
  );
}
