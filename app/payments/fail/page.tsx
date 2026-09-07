import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/app/components/site";
export const metadata: Metadata = {
  title: "결제 안내 | 경주트립",
  robots: { index: false, follow: false },
};
export default function Fail() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section" id="main-content">
        <div className="empty-state">
          <h1 style={{ fontSize: 30, fontWeight: 800 }}>
            결제가 완료되지 않았습니다
          </h1>
          <p>
            결제창을 닫았거나 승인 과정에서 문제가 발생했습니다.
            <br />
            결제 내역이 보인다면 다시 결제하지 말고 고객센터에 문의해 주세요.
          </p>
          <Link className="btn btn-primary" href="/account">
            예약 내역 확인
          </Link>{" "}
          <Link className="btn btn-outline" href="/tours">
            투어 둘러보기
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
