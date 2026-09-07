import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../components/site";
import { currentMember } from "@/lib/auth";
import { sql } from "@/lib/db";
import AccountActions from "./AccountActions";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "마이페이지 | 경주트립",
  robots: { index: false, follow: false },
};
export default async function Account() {
  const member = await currentMember();
  if (!member) redirect("/login?callbackUrl=%2Faccount");
  const orders =
    await sql()`SELECT id,tour_name,travel_date,travel_time,amount,status FROM orders WHERE member_id=${member.id} ORDER BY created_at DESC LIMIT 20`;
  return (
    <>
      <SiteHeader />
      <main className="wrap" id="main-content">
        <div className="page-heading">
          <div className="eyebrow">나의 경주트립</div>
          <h1>{member.display_name}님, 반갑습니다</h1>
          <p>
            {member.provider === "naver" ? "네이버" : "Google"} 계정으로
            로그인했어요. {member.email}
          </p>
        </div>
        <div className="two-column" style={{ paddingBottom: 65 }}>
          <section>
            <h2 style={{ fontSize: 24, fontWeight: 750, marginBottom: 20 }}>
              나의 예약
            </h2>
            <div className="info-box" style={{ marginBottom: 24 }}>
              네이버 스마트스토어에서 예약한 내역은 네이버에서 확인해 주세요. 이
              페이지에 자동으로 연동되지 않습니다.
              <br />
              <a
                className="text-link"
                style={{ marginTop: 12 }}
                href="https://smartstore.naver.com/gjtrip"
                target="_blank"
                rel="noopener noreferrer"
              >
                네이버 예약 확인 ↗
              </a>
            </div>
            {orders.length ? (
              <div>
                {orders.map((o) => (
                  <article
                    key={String(o.id)}
                    className="step-card"
                    style={{ marginBottom: 14 }}
                  >
                    <span className="tag">
                      테스트 주문 ·{" "}
                      {o.status === "paid"
                        ? "승인 확인"
                        : o.status === "pending"
                          ? "결제 대기"
                          : "확인 필요"}
                    </span>
                    <h3 style={{ marginTop: 12 }}>{String(o.tour_name)}</h3>
                    <p>
                      {String(o.travel_date).slice(0, 10)} ·{" "}
                      {String(o.travel_time)} ·{" "}
                      {Number(o.amount).toLocaleString("ko-KR")}원
                    </p>
                    <small>주문번호 {String(o.id)}</small>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h2>여행을 준비해 볼까요?</h2>
                <p>홈페이지에서 직접 접수한 예약 내역이 아직 없습니다.</p>
                <Link href="/tours" className="btn btn-primary">
                  투어 둘러보기
                </Link>
              </div>
            )}
          </section>
          <section>
            <h2 style={{ fontSize: 24, fontWeight: 750, marginBottom: 20 }}>
              계정 관리
            </h2>
            <div className="info-box">
              회원정보 열람·정정에 관한 문의는 gjtrip11@naver.com으로
              남겨주세요.
            </div>
            <AccountActions />
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
