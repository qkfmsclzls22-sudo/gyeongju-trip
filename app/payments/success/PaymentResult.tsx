"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export default function PaymentResult() {
  const params = useSearchParams();
  const key = params.get("paymentKey");
  const orderId = params.get("orderId");
  const amount = Number(params.get("amount"));
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const verify = useCallback(async () => {
    setStatus("loading");
    if (!key || !orderId || !Number.isSafeInteger(amount) || amount < 1) {
      setStatus("error");
      setMessage("결제 정보가 올바르지 않습니다.");
      return;
    }
    try {
      const r = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentKey: key, orderId, amount }),
      });
      const data = await r.json();
      if (!r.ok || data.result !== "success") throw new Error(data.message);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setMessage(
        e instanceof Error ? e.message : "확인 중 문제가 발생했습니다.",
      );
    }
  }, [key, orderId, amount]);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void verify();
  }, [verify]);
  return (
    <div className="empty-state" style={{ maxWidth: 650, margin: "auto" }}>
      <h1 style={{ fontSize: 30, fontWeight: 800 }}>
        {status === "loading"
          ? "결제 상태를 확인하고 있어요"
          : status === "success"
            ? "테스트 결제가 확인되었습니다"
            : "결제 상태를 확인해 주세요"}
      </h1>
      <p role="status">
        {status === "success"
          ? "실제 투어 예약은 생성되지 않았습니다. 실제 예약은 네이버 스마트스토어를 이용해 주세요."
          : status === "error"
            ? message
            : "새로 결제하지 말고 잠시 기다려 주세요."}
      </p>
      {status === "success" && <p>주문번호 {orderId}</p>}
      {status === "error" && (
        <button className="btn btn-primary" onClick={verify}>
          상태 다시 확인
        </button>
      )}{" "}
      <Link className="btn btn-outline" href="/account">
        마이페이지
      </Link>
    </div>
  );
}
