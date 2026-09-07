import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../components/site";
import TourCatalog from "../components/TourCatalog";
export const metadata: Metadata = {
  title: "전체 투어 | 경주트립",
  description:
    "국립경주박물관 도슨트, 청사초롱 야경, 불국사 역사투어의 가격과 코스를 비교해 보세요.",
};
export default function Tours() {
  return (
    <>
      <SiteHeader />
      <main className="wrap" id="main-content">
        <div className="page-heading">
          <h1>전체 투어</h1>
          <p>
            국립경주박물관, 불국사, 청사초롱 야경투어의 코스와 시간을
            확인하세요.
          </p>
        </div>
        <div style={{ paddingBottom: 70 }}>
          <TourCatalog />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
