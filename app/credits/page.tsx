import { SiteHeader, SiteFooter } from "../components/site";
export const metadata = { title: "사진 출처 | 경주트립" };
export default function Credits() {
  return (
    <>
      <SiteHeader />
      <main className="wrap" id="main-content">
        <div className="page-heading">
          <h1>사진 출처</h1>
          <p>경주의 장면을 함께 나눠주신 분들께 감사드립니다.</p>
        </div>
        <div className="legal-content">
          <h2>국립경주박물관 신라역사관</h2>
          <p>
            사진 Abasaa · 2016년 · Public domain
            <br />
            <a
              href="https://commons.wikimedia.org/wiki/File:Gyeongju_National_Museum_Silla_History_Gallery.JPG"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikimedia Commons 원본·이용 조건
            </a>
          </p>
          <h2>황리단길</h2>
          <p>
            사진 Seefooddiet · 2025년 ·{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY-SA 4.0
            </a>
            <br />
            <a
              href="https://commons.wikimedia.org/wiki/File:Hwangnidan-gil_02.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikimedia Commons 원본
            </a>
            <br />
            화면 표시를 위해 크기를 조정·압축하고 잘라 표시했습니다. 이 사진과 그 가공물에 동일한
            라이선스가 적용됩니다.
          </p>
          <h2>그 외 사진·로고</h2>
          <p>기존 경주트립 홈페이지의 제공 자료를 사용했습니다.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
