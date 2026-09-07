"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="wrap section" id="main-content">
      <div className="empty-state">
        <h1 style={{ fontSize: 30, fontWeight: 800 }}>
          페이지를 불러오지 못했어요
        </h1>
        <p>
          잠시 후 다시 시도해 주세요. 예약이 급하시면 고객센터로 연락해 주세요.
        </p>
        <button className="btn btn-primary" onClick={reset}>
          다시 시도
        </button>{" "}
        <Link className="btn btn-outline" href="/">
          홈으로
        </Link>
      </div>
    </main>
  );
}
