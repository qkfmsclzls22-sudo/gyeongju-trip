import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader, SiteFooter, CtaBanner } from "../components/site";
export const metadata: Metadata = {
  title: "경주트립 소개 | 경주트립",
  description:
    "경주트립은 경주의 역사와 문화를 해설사와 함께 만나는 여행을 만듭니다. 가족여행, 학교 체험학습, 기업·기관 단체여행을 운영합니다.",
};
const history = [
  { date: "2025.09", text: "경주트립 설립 · 네이버 스마트스토어 운영 시작" },
  { date: "2026.02", text: "네이버 스마트스토어 프리미엄 우수셀러 달성" },
  { date: "2026.06", text: "경북관광 스타트업 공모사업 지역혁신형 선정" },
];
export default function Company() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <div className="wrap page-heading">
          <div className="eyebrow">경주트립 이야기</div>
          <h1>
            경주를 보여주는 여행에서,
            <br />
            경주를 이해하는 여행으로.
          </h1>
          <p>
            같은 풍경도 어떤 이야기를 만나느냐에 따라 달라집니다.
            <br />
            경주트립은 사람과 문화유산 사이에 이야기를 더합니다.
          </p>
        </div>
        <section className="wrap detail-hero">
          <div className="detail-image">
            <Image
              src="/images/landmark-daereungwon.png"
              alt="고분과 푸른 나무가 어우러진 경주 대릉원"
              fill
              sizes="(max-width:767px) 100vw, 640px"
              preload
            />
          </div>
          <div>
            <h2
              style={{
                fontSize: 29,
                fontWeight: 750,
                lineHeight: 1.45,
                marginBottom: 20,
              }}
            >
              눈앞의 장소가
              <br />
              나의 기억이 되는 순간
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.9 }}>
              유물의 이름보다 그 안에 담긴 사람의 이야기를, 사진 한 장보다 그
              장소에서 느낀 마음을 오래 기억하는 여행. 경주트립이 만들어가는
              여행입니다.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.9 }}>
              국립경주박물관, 불국사와 석굴암 이야기, 청사초롱 야경투어를 통해
              어린이부터 어른까지 각자의 눈높이에서 경주를 만납니다.
            </p>
          </div>
        </section>
        <section className="section soft">
          <div className="wrap">
            <div className="section-head">
              <div>
                <h2>경주트립이 만드는 여행</h2>
              </div>
            </div>
            <div className="why-grid">
              <div className="why-item">
                <h3>역사를 일상의 언어로</h3>
                <p>
                  어려운 이름을 늘어놓기보다 쉽게 이해하고 질문할 수 있는
                  이야기로 전합니다.
                </p>
              </div>
              <div className="why-item">
                <h3>함께하는 사람을 살피며</h3>
                <p>
                  참여자의 나이와 관심사, 여행 목적에 맞춰 설명과 동선을
                  조율합니다.
                </p>
              </div>
              <div className="why-item">
                <h3>지역에서 시작하는 기획</h3>
                <p>
                  경주의 장소와 문화가 가진 매력을 여행자의 실제 경험으로
                  연결합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section wrap two-column">
          <div>
            <div className="eyebrow">걸어온 길</div>
            <h2 style={{ fontSize: 29, fontWeight: 750 }}>경주트립의 발자취</h2>
            <div className="course-list">
              {history.map((h) => (
                <div className="point" key={h.date} style={{ paddingTop: 20 }}>
                  <strong style={{ color: "#54718a" }}>{h.date}</strong>
                  <p style={{ marginTop: 8 }}>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 29, fontWeight: 750, marginBottom: 24 }}>
              함께하는 여행
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.9 }}>
              가족의 첫 역사여행부터 학교 체험학습, 기업 연수와 기관 방문까지.
              단체의 목적과 일정에 맞춘 역사문화 프로그램을 기획·운영합니다.
            </p>
            <div className="info-box">
              경주트립
              <br />
              사업자등록번호 694-75-00685
              <br />
              경상북도 경주시 계림로107
              <br />
              경북관광기업지원센터 6층
              <br />
              gjtrip11@naver.com
            </div>
          </div>
        </section>
      </main>
      <CtaBanner
        title="함께 만들고 싶은 여행이 있나요?"
        desc="단체여행·지역 콘텐츠·협업 제안을 기다립니다."
      />
      <SiteFooter />
    </>
  );
}
