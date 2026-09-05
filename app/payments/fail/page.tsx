"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function FailContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "결제가 진행되지 않았습니다.";
  const tourId = searchParams.get("tourId");

  return (
    <main className="min-h-screen bg-brand-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="경주트립" className="h-12 w-auto" />
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-ink transition-colors">
            ← 홈으로
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <div className="text-5xl mb-4">😥</div>
          <h2 className="text-xl font-bold text-ink mb-2">결제가 완료되지 않았어요</h2>
          <p className="text-gray-500 text-sm mb-8">{message}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {tourId && (
              <a
                href={`/checkout/${tourId}`}
                className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                다시 시도하기
              </a>
            )}
            <a
              href="tel:010-8402-8543"
              className="border-2 border-gray-200 hover:border-brand-400 text-gray-700 font-semibold px-6 py-3 rounded-full transition-colors"
            >
              📞 010-8402-8543
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-brand-50 flex items-center justify-center">
          <p className="text-gray-400 text-sm">불러오는 중...</p>
        </main>
      }
    >
      <FailContent />
    </Suspense>
  );
}
