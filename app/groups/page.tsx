import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter, CtaBanner } from "../components/site";
import { IconArrow } from "../components/icons";
export const metadata: Metadata = {
  title: "단체·맞춤여행 | 경주트립",
  description:
    "학교 체험학습, 기업 연수·워크숍, MICE, 가족 모임에 맞춘 경주 역사문화 여행을 상담하세요.",
};
export default function Groups() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <div className="wrap page-heading">
          <h1>단체·맞춤여행</h1>
          <p>
            학교 체험학습, 기업 연수, 가족 모임의 날짜와 인원에 맞춰 코스를
            구성합니다.
          </p>
        </div>
        <div className="wrap group-banner">
          <div className="group-copy">
            <h2>
              원하는 날짜에,
              <br />
              우리 일행만 함께.
            </h2>
            <p>
              학교 체험학습부터 기업 연수, 가족 모임까지.
              <br />
              원하는 인원·날짜·장소를 알려주세요.
            </p>
            <Link href="/quote" className="btn btn-gold">
              맞춤 견적 요청하기
              <IconArrow />
            </Link>
          </div>
          <div className="group-image">
            <Image
              src="/images/bulguksa-main.jpg"
              alt="경주 불국사의 전각"
              fill
              sizes="(max-width:767px) 100vw, 600px"
              preload
            />
          </div>
        </div>
        <section className="section wrap">
          <div className="steps-grid">
            {[
              {
                n: "01",
                title: "학교·교육기관",
                desc: "학년과 학습 주제에 맞춰 이야기의 깊이와 동선을 조율합니다.",
                tags: "체험학습 · 수학여행 · 교원 연수",
              },
              {
                n: "02",
                title: "기업·기관·MICE",
                desc: "행사 전후의 시간, 출발 장소와 참여자 특성에 맞춰 구성합니다.",
                tags: "워크숍 · 학회 · 임직원 연수",
              },
              {
                n: "03",
                title: "가족·프라이빗",
                desc: "어린이부터 어르신까지, 일행의 관심사와 보행 속도를 고려합니다.",
                tags: "가족 모임 · 소규모 단독투어",
              },
            ].map((x) => (
              <article className="step-card" key={x.n}>
                <span className="step-number">{x.n}</span>
                <h3>{x.title}</h3>
                <p>{x.desc}</p>
                <span className="tag">{x.tags}</span>
              </article>
            ))}
          </div>
        </section>
        <section className="section soft">
          <div className="wrap">
            <div className="section-head">
              <div>
                <h2>준비는 이렇게 진행돼요</h2>
              </div>
            </div>
            <div className="why-grid">
              {[
                {
                  title: "일정과 인원을 알려주세요",
                  text: "희망 날짜·인원·대상·관심 코스·예산을 적어주세요. 미정인 항목은 상담하며 정할 수 있습니다.",
                },
                {
                  title: "맞춤 구성과 견적을 받아보세요",
                  text: "해설, 차량, 식사, 체험 등 필요한 범위를 확인해 코스와 비용을 안내합니다.",
                },
                {
                  title: "확정 후 함께 준비합니다",
                  text: "세부 일정과 집결 장소를 조율하고, 준비사항과 당일 안내를 전달합니다.",
                },
              ].map((x) => (
                <div className="why-item" key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </div>
              ))}
            </div>
            <p
              className="info-box"
              style={{ background: "white", marginTop: 30 }}
            >
              차량·식사·체험은 기본 포함 사항이 아닙니다. 요청하신 구성의 가능
              여부와 비용을 견적에 구분해 안내합니다.
            </p>
          </div>
        </section>
      </main>
      <CtaBanner
        title="단체 여행 상담"
        desc="단체 문의 010-5552-7971 · 희망 날짜와 인원을 알려주시면 상담이 더 빨라집니다."
      />
      <SiteFooter />
    </>
  );
}
