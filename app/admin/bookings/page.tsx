import { redirect, notFound } from "next/navigation";
import CommerceShell from "@/app/components/CommerceShell";
import { currentUser } from "@/lib/auth";
import { isAdmin, paymentReady } from "@/lib/commerce/config";
import { query } from "@/lib/commerce/db";
import { getTour } from "@/lib/tours";
import {
  bookingLabels,
  departureLabels,
  formatTourDate,
} from "@/lib/commerce/display";
import { RefundControl, SessionForm, SessionStatus } from "./AdminControls";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "예약·회차 관리 | 경주트립",
  robots: { index: false },
};
export default async function AdminPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=/admin/bookings");
  if (!isAdmin(user.id)) notFound();
  const [sessions, bookings] = await Promise.all([
    query(
      `SELECT s.*,coalesce(sum(CASE WHEN b.status IN ('paid','cancel_requested','refund_pending') THEN b.adult_count+b.child_count ELSE 0 END),0)::int AS paid_people FROM gj_sessions s LEFT JOIN gj_bookings b ON b.session_id=s.id GROUP BY s.id ORDER BY s.starts_at DESC LIMIT 180`,
    ),
    query(
      `SELECT b.*,s.tour_id,s.starts_at,s.status AS departure_status FROM gj_bookings b JOIN gj_sessions s ON s.id=b.session_id ORDER BY b.created_at DESC LIMIT 200`,
    ),
  ]);
  return (
    <CommerceShell>
      <p className="eyebrow">TOUR MANAGEMENT</p>
      <h1>예약·회차 관리</h1>
      <div className="stack">
        <p className="notice">
          결제 상태:{" "}
          {paymentReady()
            ? process.env.COMMERCE_MODE === "live"
              ? "실결제 운영"
              : "테스트 결제"
            : "연동 준비 중"}{" "}
          · 최근 예약 200건 / 회차 180건
        </p>
        <SessionForm />
        <h2>판매 회차</h2>
        {sessions.length === 0 && <p>등록한 회차가 없습니다.</p>}
        {sessions.map((s) => (
          <article className="panel stack" key={s.id}>
            <div>
              <h3>{getTour(s.tour_id)?.name}</h3>
              <p>{formatTourDate(s.starts_at)}</p>
              <p>
                {departureLabels[s.status]} · 홈페이지 결제 인원 {s.paid_people}
                /{s.capacity}명 · 최소 출발 {s.min_people}명
              </p>
            </div>
            <SessionStatus id={s.id} status={s.status} />
          </article>
        ))}
        <h2>예약 목록</h2>
        {bookings.length === 0 && <p>예약 내역이 없습니다.</p>}
        {bookings.map((b) => (
          <article className="panel stack" key={b.id}>
            <div className="row">
              <h3>
                {b.name} · {b.phone}
              </h3>
              <span className="pill">{bookingLabels[b.status]}</span>
            </div>
            <p>
              {getTour(b.tour_id)?.name} · {formatTourDate(b.starts_at)}
            </p>
            <p>
              성인 {b.adult_count}명 / 어린이 {b.child_count}명 ·{" "}
              {b.amount.toLocaleString()}원
            </p>
            <p className="booking-id">{b.id}</p>
            {b.cancel_reason && <p>취소 사유: {b.cancel_reason}</p>}
            {b.payment_key && (
              <RefundControl
                id={b.id}
                amount={b.amount}
                status={b.status}
                refundAmount={b.refund_amount}
                reason={b.cancel_reason}
              />
            )}
          </article>
        ))}
      </div>
    </CommerceShell>
  );
}
