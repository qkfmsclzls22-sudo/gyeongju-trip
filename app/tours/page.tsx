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
          <div className="eyebrow">경주트립 정규 투어</div>
          <h1>나에게 맞는 경주를 찾아보세요</h1>
          <p>
            처음 만나는 신라, 아이와의 배움 여행, 함께 걷는 밤.
            <br />
            여행의 목적에 맞는 투어를 골라보세요.
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
