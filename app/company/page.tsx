import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb, SectionLabel } from "@/app/components/inside";
import { CtaBanner, SiteFooter, SiteHeader } from "@/app/components/site";
import { IconGuide, IconTower, IconUsers } from "@/app/components/icons";

export const metadata: Metadata = {
  title: "기업소개 - 경주트립",
  description:
    "경주트립은 경주의 역사·문화에 콘텐츠 기획력과 디지털 기술을 더해 새로운 여행 경험을 만드는 문화관광콘텐츠기업입니다. 기업·기관 단체와 학교 수학여행 진행 이력을 확인하세요.",
};

const doing = [
  {
    Icon: IconGuide,
    title: "해설사와 함께하는 투어",
    text: "국립경주박물관, 불국사·석굴암, 청사초롱 야경투어까지. 혼자 보면 지나칠 이야기를 해설사가 곁에서 풀어드립니다.",
  },
  {
    Icon: IconTower,
    title: "경주 유적지 정보",
    text: "첨성대부터 황리단길까지, 언제 가면 좋은지·무엇을 봐야 하는지·어디서 찍으면 예쁜지까지 정리해 안내합니다.",
  },
  {
    Icon: IconUsers,
    title: "기업·기관 단체 진행",
    text: "임직원 워크숍, 연수, 수학여행 등 단체 일정에 맞춰 코스와 시간을 조율합니다. 1,000명 규모까지 진행한 경험이 있습니다.",
  },
];

const stats = [
  { value: "4.92", label: "평균 별점" },
  { value: "1,300+", label: "누적 리뷰" },
  { value: "1,500+", label: "단체·MICE 진행 인원" },
];

const history = [
  { date: "2025.09", text: "경주트립 설립" },
  { date: "2025.11", text: "투어 프로그램 개발" },
  { date: "2026.02", text: "경북관광기업지원센터 입주기업 선정" },
  { date: "2026.02", text: "네이버 스마트스토어 프리미엄 우수셀러 달성" },
  { date: "2026.05", text: "경북관광스타트업 공모전 선정" },
  { date: "2026.06", text: "경주관광 MICE 얼라이언스 가입" },
  { date: "2026.09", text: "해오름동맹 혁신포럼 경주시 대표기업 선정" },
];

const corporateClients = [
  { name: "교보생명", count: "170명", program: "불국사 역사문화 해설투어" },
  { name: "롯데GRS", count: "1,000여명", program: "국립경주박물관 도슨트투어" },
  {
    name: "한국수력원자력 월성원자력본부",
    count: "40여명",
    program: "원전사후관리처 · 국립경주박물관 도슨트투어",
  },
  {
    name: "부산교육연수원",
    count: "100여명",
    program: "원감교육 · 국립경주박물관 도슨트투어",
  },
  {
    name: "금산군가족센터",
    count: "70여명",
    program: "국립경주박물관 도슨트투어",
  },
  { name: "풍산금속", count: "VIP", program: "역사투어 (영어 진행)" },
  { name: "슈프리마", count: "70여명", program: "경주 야경투어 신라별빛야행" },
  {
    name: "군산시공무원노동조합",
    count: "40여명",
    program: "국립경주박물관 도슨트투어",
  },
  { name: "한국체육진흥공단", count: "30여명", program: "불국사투어" },
];

const schoolClients = [
  {
    name: "거제 중곡초등학교",
    count: "140여명",
    program: "불국사투어 · 국립경주박물관투어 · 야경투어",
  },
  { name: "허들링", count: "40여명", program: "야경투어 · 불국사투어" },
  { name: "서울경기초등학교", count: "40여명", program: "역사투어" },
];

const companyInfo = [
  { label: "상호", value: "경주트립" },
  { label: "대표자", value: "김봉열" },
  { label: "설립일", value: "2025년 9월" },
  { label: "사업자등록번호", value: "694-75-00685" },
  {
    label: "주소",
    value: "경상북도 경주시 계림로107 경북관광기업지원센터 6층",
  },
  { label: "일반 문의", value: "010-8402-8543 (문자 요망)" },
  { label: "단체 문의", value: "010-5552-7971" },
  { label: "이메일", value: "gjtrip11@naver.com" },
  { label: "운영시간", value: "매일 09:00 ~ 18:00 (연중무휴)" },
];

function ClientList({
  items,
}: {
  items: { name: string; count: string; program: string }[];
}) {
  return (
    <ul className="company-client-list">
      {items.map((client) => (
        <li key={client.name}>
          <strong>{client.name}</strong>
          <p>{client.program}</p>
          <span>{client.count}</span>
        </li>
      ))}
    </ul>
  );
}
export default function CompanyPage() {
  return (
    <main className="inner-page company-page">
      <SiteHeader />
      <div className="page-width">
        <Breadcrumb current="기업소개" />
        <section className="company-hero">
          <div>
            <span className="page-kicker">
              A LOCAL TRAVEL STUDIO / GYEONGJU
            </span>
            <h1>
              경주를 더 깊게,
              <br />
              여행은 더 <em>즐겁게.</em>
            </h1>
          </div>
          <p className="page-lead">
            경주에 살며, 경주의 다음 여행을 만듭니다.
            <br />
            지역의 이야기와 콘텐츠 기획, 디지털 경험을 잇는 문화관광콘텐츠기업
            경주트립입니다.
          </p>
        </section>
        <figure className="company-panorama">
          <Image
            src="/images/tour-bulguksa-field.webp"
            alt="해설사와 여행객이 함께한 불국사 현장"
            fill
            priority
            sizes="90vw"
          />
          <figcaption>이야기가 있는 현장, 경주트립과 함께.</figcaption>
        </figure>
        <nav className="page-jump" aria-label="기업소개 목차">
          <a href="#our-story">우리의 이야기</a>
          <a href="#our-work">하는 일</a>
          <a href="#our-clients">함께한 곳</a>
          <a href="#our-company">회사 정보</a>
        </nav>
        <section id="our-story" className="page-section company-intro">
          <div>
            <span className="page-kicker">01 / OUR STORY</span>
            <h2>
              같은 풍경에도,
              <br />
              다른 이야기가 있습니다.
            </h2>
          </div>
          <div className="company-intro-copy">
            <p>
              돌탑 앞에서 조금 더 머물고, 유물 속 사람들의 삶을 상상하는 일.
              경주트립은 익숙한 풍경을 새롭게 바라보는 여행을 기획합니다.
            </p>
            <p>
              설명문을 읽는 데서 그치지 않고, 문화유산이 만들어진 배경과 그 안에
              담긴 이야기를 함께 나눕니다. 아이와 어른이 각자의 시선으로 경주를
              발견할 수 있도록요.
            </p>
            <p>
              현장에서 쌓은 지역 전문성을 바탕으로 맞춤 여행, AI 일정 설계,
              디지털 문화유산 체험으로 경험을 넓혀갑니다. 여행의 발견부터
              계획·예약·체험까지 연결하는 경주 여행 플랫폼을 지향합니다.
            </p>
          </div>
        </section>
        <section id="our-work" className="page-section">
          <SectionLabel number="02">여행을 만드는 세 가지 일</SectionLabel>
          <div className="company-services">
            {doing.map(({ title, text }, i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="company-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="company-credentials">
            네이버 스마트스토어 프리미엄 우수셀러 · 경북관광기업지원센터
            입주기업
          </p>
        </section>
        <section id="our-clients" className="page-section company-clients">
          <SectionLabel number="03">함께 걸어온 곳들</SectionLabel>
          <p className="page-lead">
            기업 연수부터 학교 수학여행까지.
            <br />
            인원과 목적에 맞는 경주의 하루를 설계합니다.
          </p>
          <h3>기업·기관 및 MICE</h3>
          <ClientList items={corporateClients.slice(0, 3)} />
          <details className="company-client-more">
            <summary>
              기업·기관 진행 이력 더 보기 <span aria-hidden="true">+</span>
            </summary>
            <ClientList items={corporateClients.slice(3)} />
          </details>
          <h3>학교 수학여행 및 단체</h3>
          <ClientList items={schoolClients} />
        </section>
        <section id="our-company" className="page-section company-archive">
          <details>
            <summary>경주트립이 걸어온 길</summary>
            <ol className="company-history">
              {history.map((item, i) => (
                <li key={`${item.date}-${i}`}>
                  <span>{item.date}</span>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </details>
          <details>
            <summary>회사 정보와 연락처</summary>
            <dl className="company-info">
              {companyInfo.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </details>
        </section>
      </div>
      <CtaBanner
        title="우리 팀의 경주를 함께 만들어볼까요?"
        desc="인원과 일정, 여행의 목적을 알려주세요. 알맞은 코스와 견적을 제안합니다."
      />
      <SiteFooter />
    </main>
  );
}
