import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../components/site";
import { LANDMARK_DATA } from "@/lib/landmarks";
export const metadata: Metadata = {
  title: "경주 여행가이드 | 경주트립",
  description:
    "투어 순서와 함께 방문하기 좋은 경주 유적지를 소개합니다. 박물관, 불국사, 야경을 여행 일정에 맞춰 선택해 보세요.",
};
export default function Guide() {
  return (
    <>
      <SiteHeader />
      <main className="wrap" id="main-content">
        <div className="page-heading">
          <div className="eyebrow">여행 전 읽어보세요</div>
          <h1>알고 떠나면, 더 좋은 여행</h1>
          <p>
            먼저 볼 곳부터 잠깐 쉬어갈 골목까지.
            <br />
            일행의 체력과 여행 시간에 맞춰 경주를 즐겨보세요.
          </p>
        </div>
        <section style={{ marginBottom: 58 }}>
          <div className="section-head">
            <div>
              <h2>처음이라면, 이 순서로 만나보세요</h2>
              <p>세 투어를 모두 계획한다면 참고할 수 있는 순서입니다.</p>
            </div>
          </div>
          <div className="steps-grid">
            {[
              {
                id: "museum",
                n: "01",
                title: "박물관에서 신라를 이해하고",
                desc: "역사의 흐름과 주요 유물을 먼저 만나면 야외에서 볼 유적들이 한결 친숙해집니다.",
              },
              {
                id: "bulguksa",
                n: "02",
                title: "불국사에서 이야기를 연결하고",
                desc: "박물관에서 만난 신라의 예술을 건축과 공간 속에서 다시 찾아보세요.",
              },
              {
                id: "night",
                n: "03",
                title: "야경과 함께 하루를 마무리해요",
                desc: "낮 일정 뒤 충분히 쉬고, 경주의 밤 풍경을 걸으며 여행을 마무리해 보세요.",
              },
            ].map((x) => (
              <Link className="step-card" href={"/tours/" + x.id} key={x.id}>
                <span className="step-number">{x.n}</span>
                <h3>{x.title}</h3>
                <p>{x.desc}</p>
                <span className="text-link">투어 알아보기 →</span>
              </Link>
            ))}
          </div>
          <p className="info-box" style={{ marginTop: 22 }}>
            한 날에 모두 들을 필요는 없어요. 어린이·어르신과 함께라면 하루 한
            가지를 중심으로 여유롭게 나누는 편을 권합니다. 도착·출발 시간과 실제
            예약 가능 일정에 맞춰 순서를 조정하세요.
          </p>
        </section>
        <section style={{ paddingBottom: 65 }}>
          <div className="section-head">
            <div>
              <h2>경주의 장면들</h2>
              <p>투어 전후로 함께 둘러보기 좋은 곳.</p>
            </div>
          </div>
          <div className="guide-grid">
            {Object.entries(LANDMARK_DATA).map(([slug, l]) => (
              <Link href={"/landmarks/" + slug} key={slug}>
                <div className="place-image">
                  <Image
                    src={l.image}
                    alt={l.name}
                    fill
                    sizes="(max-width:767px) 45vw, 280px"
                  />
                </div>
                <h3>{l.name}</h3>
                <p>{l.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
