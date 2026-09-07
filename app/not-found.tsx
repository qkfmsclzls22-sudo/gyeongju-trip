import Link from "next/link";
import { SiteHeader, SiteFooter } from "./components/site";
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section" id="main-content">
        <div className="empty-state">
          <div className="eyebrow">404</div>
          <h1 style={{ fontSize: 30, fontWeight: 800 }}>
            찾으시는 페이지가 없어요
          </h1>
          <p>주소를 확인하거나 전체 투어에서 다시 찾아보세요.</p>
          <Link href="/tours" className="btn btn-primary">
            전체 투어 보기
          </Link>{" "}
          <Link className="btn btn-outline" href="/">
            홈으로
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
