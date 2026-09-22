import Link from "next/link";
import { redirect } from "next/navigation";
import CommerceShell from "@/app/components/CommerceShell";
import { currentUser } from "@/lib/auth";
import { isAdmin } from "@/lib/commerce/config";
import { query } from "@/lib/commerce/db";
import { safeReturnPath } from "@/lib/commerce/validation";
import {
  bookingLabels,
  departureLabels,
  formatTourDate,
} from "@/lib/commerce/display";
import { getTour } from "@/lib/tours";
import { CancelBooking, LogoutButton, SignupConsent } from "./AccountActions";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "내 예약 | 경주트립",
  robots: { index: false },
};
export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const next = safeReturnPath((await searchParams).next);
  const user = await currentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  let member;
  let bookings;
  try {
    [member] = await query(
      "SELECT name,consent_at FROM gj_members WHERE id=$1",
      [user.id],
    );
    bookings = await query(
      `SELECT b.id,b.adult_count,b.child_count,b.amount,b.status,b.expires_at,(b.expires_at<now()) AS expired,b.refund_amount,s.tour_id,s.starts_at,s.status AS departure_status FROM gj_bookings b JOIN gj_sessions s ON s.id=b.session_id WHERE b.member_id=$1 ORDER BY b.created_at DESC LIMIT 100`,
      [user.id],
    );
  } catch {
    return (
      <CommerceShell>
        <h1>예약 내역을 불러오지 못했습니다</h1>
        <p>
          잠시 후 다시 확인하거나{" "}
          <a href="tel:01084028543" className="text-link">
            010-8402-8543
          </a>
          으로 문의해 주세요.
        </p>
      </CommerceShell>
    );
  }
  if (member?.consent_at && next !== "/account") redirect(next);
  return (
    <CommerceShell>
      <div className="row">
        <div>
          <p className="eyebrow">MY TRIP</p>
          <h1>{member?.name || "여행자"}님의 예약</h1>
        </div>
        <LogoutButton />
      </div>
      {!member?.consent_at ? (
        <SignupConsent next={next} />
      ) : (
        <div className="stack">
          {isAdmin(user.id) && (
            <a className="button secondary" href="/admin/bookings">
              예약·회차 관리
            </a>
          )}
          <p className="notice">
            결제 완료 후에도 모집 중인 투어는 출발이 확정되지 않을 수 있습니다.
            출발 상태를 함께 확인해 주세요.
          </p>
          {bookings.length === 0 ? (
            <div className="panel stack">
              <h2>아직 예약한 투어가 없어요</h2>
              <p>경주의 낮과 밤을 함께 걸어볼까요?</p>
              <Link href="/#tours" className="button">
                투어 둘러보기
              </Link>
            </div>
          ) : (
            bookings.map((b) => (
              <article className="panel order-card stack" key={b.id}>
                <div className="row">
                  <span className="pill">
                    {b.status === "pending" && b.expired
                      ? "결제 시간 만료"
                      : bookingLabels[b.status]}
                  </span>
                  <span>{departureLabels[b.departure_status]}</span>
                </div>
                <div>
                  <h2>{getTour(b.tour_id)?.name}</h2>
                  <p>{formatTourDate(b.starts_at)}</p>
                  <p>
                    성인 {b.adult_count}명 · 어린이·청소년 {b.child_count}명
                  </p>
                </div>
                <div className="row">
                  <strong>{b.amount.toLocaleString()}원</strong>
                  {b.refund_amount !== null && (
                    <span>환불 {b.refund_amount.toLocaleString()}원</span>
                  )}
                </div>
                <p className="booking-id">예약번호 {b.id}</p>
                {["paid", "pending"].includes(b.status) && (
                  <CancelBooking id={b.id} pending={b.status === "pending"} />
                )}
                {b.status === "confirming" && (
                  <p className="notice">
                    결제 결과를 확인하고 있습니다. 같은 예약을 다시 결제하지
                    말고 고객센터로 문의해 주세요.
                  </p>
                )}
              </article>
            ))
          )}
          <p className="muted">
            네이버스토어에서 예약한 내역은 네이버에서 확인해 주세요.
          </p>
          <details className="muted">
            <summary>회원 정보</summary>
            <p className="booking-id">회원번호 {user.id}</p>
            <p>회원탈퇴 및 개인정보 문의: gjtrip11@naver.com</p>
          </details>
        </div>
      )}
    </CommerceShell>
  );
}
