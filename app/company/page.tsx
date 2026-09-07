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
          <h1>경주트립 소개</h1>
          <p>경주에 기반을 두고 역사해설 투어와 단체 여행을 기획·운영합니다.</p>
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
              경주에서 만나는
              <br />
              해설사와의 두 시간
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.9 }}>
              박물관의 유물과 불국사의 건축, 유적지에 얽힌 역사를 해설사와 함께
              살펴봅니다. 궁금한 점을 묻고, 현장에서 설명을 들으며 경주를
              알아가는 투어입니다.
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
                <h2>투어 운영 안내</h2>
              </div>
            </div>
            <div className="why-grid">
              <div className="why-item">
                <h3>한 조 15–20명</h3>
                <p>
                  박물관은 최대 15명, 불국사와 야경투어는 최대 20명씩
                  진행합니다.
                </p>
              </div>
              <div className="why-item">
                <h3>1인 1대 해설 수신기</h3>
                <p>
                  이동하거나 유물을 살펴보면서 해설을 들을 수 있도록 수신기를
                  대여합니다.
                </p>
              </div>
              <div className="why-item">
                <h3>단체별 일정 상담</h3>
                <p>
                  학교·기업·가족 모임은 인원, 출발 장소, 희망 코스를 확인한 뒤
                  별도 견적을 안내합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section wrap two-column">
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700 }}>주요 연혁</h2>
            <div className="course-list">
              {history.map((h) => (
                <div className="point" key={h.date} style={{ paddingTop: 20 }}>
                  <strong style={{ color: "var(--muted)" }}>{h.date}</strong>
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
        title="단체 여행·협업 문의"
        desc="단체여행·지역 콘텐츠·협업 제안을 기다립니다."
      />
      <SiteFooter />
    </>
  );
}
