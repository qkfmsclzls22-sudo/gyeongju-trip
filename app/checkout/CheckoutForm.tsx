"use client";
import Script from "next/script";
import { useState } from "react";
type PaymentRequest = {
  method: "CARD";
  amount: { currency: "KRW"; value: number };
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
};
declare global {
  interface Window {
    TossPayments?: (key: string) => {
      payment: (options: { customerKey: string }) => {
        requestPayment: (options: PaymentRequest) => Promise<void>;
      };
    };
  }
}
type Props = {
  tourId: string;
  tourName: string;
  date: string;
  time: string;
  adultCount: number;
  childCount: number;
  amount: number;
  clientKey: string;
};
export default function CheckoutForm(p: Props) {
  const [ready, setReady] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<{
    orderId: string;
    amount: number;
    orderName: string;
    customerKey: string;
  } | null>(null);
  async function checkout() {
    if (!agreed || !ready || busy) return;
    setBusy(true);
    setError("");
    try {
      let current = order;
      if (!current) {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tourId: p.tourId,
            date: p.date,
            time: p.time,
            adultCount: p.adultCount,
            childCount: p.childCount,
          }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        current = result;
        setOrder(current);
      }
      if (!current || !window.TossPayments)
        throw new Error("결제창을 불러오지 못했습니다.");
      await window
        .TossPayments(p.clientKey)
        .payment({ customerKey: current.customerKey })
        .requestPayment({
          method: "CARD",
          amount: { currency: "KRW", value: current.amount },
          orderId: current.orderId,
          orderName: current.orderName,
          successUrl: window.location.origin + "/payments/success",
          failUrl: window.location.origin + "/payments/fail",
        });
    } catch (e) {
      setError(e instanceof Error ? e.message : "결제창을 열지 못했습니다.");
      setBusy(false);
    }
  }
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        onReady={() => setReady(true)}
        onError={() =>
          setError(
            "결제창을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.",
          )
        }
      />
      <div className="eyebrow">TEST CHECKOUT</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20 }}>
        예약 내용 확인
      </h1>
      <div className="info-box" style={{ marginBottom: 24 }}>
        결제 연동 테스트입니다. 실제 투어 예약이 생성되지 않으며 금액이 청구되지
        않습니다.
      </div>
      <div className="form-card">
        <h2 style={{ fontSize: 23, fontWeight: 750 }}>{p.tourName}</h2>
        <p>
          {p.date} · {p.time}
        </p>
        <p>
          성인 {p.adultCount}명 · 어린이 {p.childCount}명
        </p>
        <div className="total-row">
          <span>테스트 결제금액</span>
          <strong>{p.amount.toLocaleString("ko-KR")}원</strong>
        </div>
        <label className="consent">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>테스트 주문임을 이해하고 진행합니다.</span>
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <button
          className="btn btn-primary btn-wide"
          disabled={!agreed || !ready || busy}
          onClick={checkout}
        >
          {busy ? "결제창 연결 중…" : "테스트 결제창 열기"}
        </button>
      </div>
    </div>
  );
}
