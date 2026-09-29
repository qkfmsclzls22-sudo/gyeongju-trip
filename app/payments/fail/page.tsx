"use client";

import CommerceShell from "@/app/components/CommerceShell";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function FailContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "결제가 진행되지 않았습니다.";
  const tourIdParam = searchParams.get("tourId");
  const tourId = ["museum", "night", "bulguksa"].includes(tourIdParam || "")
    ? tourIdParam
    : null;

  return (
    <CommerceShell>
      <section className="panel payment-state stack">
        <span className="payment-mark" aria-hidden="true">
          ↗
        </span>
        <span className="eyebrow">PAYMENT STATUS</span>
        <h1>결제가 완료되지 않았어요.</h1>
        <p>{message}</p>
        <div className="actions">
          {tourId && (
            <a className="button" href={`/checkout/${tourId}`}>
              예약 화면으로 돌아가기
            </a>
          )}
          <a className="button secondary" href="tel:010-8402-8543">
            문의 010-8402-8543
          </a>
        </div>
        <a className="text-link" href="/account">
          내 예약 확인
        </a>
      </section>
    </CommerceShell>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <main className="inner-page min-h-screen bg-brand-50 flex items-center justify-center">
          <p className="text-gray-400 text-sm">불러오는 중...</p>
        </main>
      }
    >
      <FailContent />
    </Suspense>
  );
}
