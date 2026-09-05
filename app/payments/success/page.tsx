"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Status = "confirming" | "success" | "error";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("confirming");
  const [message, setMessage] = useState("");
  const [orderName, setOrderName] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amountParam = searchParams.get("amount");
    const tourName = searchParams.get("tourName") || "";

    if (!paymentKey || !orderId || !amountParam) {
      setStatus("error");
      setMessage("결제 정보가 올바르지 않습니다. 처음부터 다시 시도해주세요.");
      return;
    }

    setOrderName(tourName);
    setAmount(Number(amountParam));

    fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: amountParam,
        tourId: searchParams.get("tourId"),
        adultCount: searchParams.get("adultCount"),
        childCount: searchParams.get("childCount"),
        date: searchParams.get("date"),
        time: searchParams.get("time"),
        name: searchParams.get("name"),
        phone: searchParams.get("phone"),
        email: searchParams.get("email"),
      }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (json.result !== "success") {
          throw new Error(json.message || "결제 확인에 실패했습니다.");
        }
        setStatus("success");
      })
      .catch((err: Error) => {
        setStatus("error");
        setMessage(err.message || "결제 확인 중 오류가 발생했습니다.");
      });
  }, [searchParams]);

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
          {status === "confirming" && (
            <>
              <div className="text-5xl mb-4">⏳</div>
              <h2 className="text-xl font-bold text-ink mb-2">결제를 확인하고 있어요</h2>
              <p className="text-gray-500 text-sm">잠시만 기다려주세요.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-ink mb-2">예약 결제가 완료되었습니다</h2>
              {orderName && (
                <p className="text-gray-700 text-sm mb-1">{orderName}</p>
              )}
              {amount > 0 && (
                <p className="text-2xl font-bold text-brand-600 mb-4">{amount.toLocaleString()}원</p>
              )}
              <p className="text-gray-500 text-sm mb-6">
                확인 후 담당자가 예약 내용을 안내드릴게요. 급하신 경우 아래로 바로 연락 주세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="tel:010-8402-8543" className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                  📞 010-8402-8543
                </a>
                <a href="/" className="border-2 border-gray-200 hover:border-brand-400 text-gray-700 font-semibold px-6 py-3 rounded-full transition-colors">
                  홈으로 가기
                </a>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-ink mb-2">결제 확인 중 문제가 발생했어요</h2>
              <p className="text-gray-500 text-sm mb-6">{message}</p>
              <p className="text-xs text-gray-400 mb-6">
                카드 결제가 이미 되었는데 이 화면이 보인다면, 아래 번호로 연락 주시면 바로 확인해드릴게요.
              </p>
              <a href="tel:010-8402-8543" className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                📞 010-8402-8543
              </a>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-brand-50 flex items-center justify-center">
          <p className="text-gray-400 text-sm">불러오는 중...</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
