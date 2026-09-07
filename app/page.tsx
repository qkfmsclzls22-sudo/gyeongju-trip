import Link from "next/link";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "./components/site";
import TourCard from "./components/TourCard";
import { TOUR_LIST } from "@/lib/tours";
import { IconArrow, IconMapPin } from "./components/icons";
const shortcuts = [
  {
    href: "/tours/museum",
    title: "박물관",
    sub: "유물로 읽는 신라",
  },
  {
    href: "/tours/night",
    title: "야경투어",
    sub: "달빛 아래 걷는 역사",
  },
  {
    href: "/tours/bulguksa",
    title: "불국사",
    sub: "천년 사찰 깊이 보기",
  },
  {
    href: "/groups",
    title: "단체여행",
    sub: "학교·기업·가족 여행",
  },
  {
    href: "/guide",
    title: "여행가이드",
    sub: "여행 전 읽을거리",
  },
];
const places = [
  {
    slug: "cheomseongdae",
    title: "첨성대",
    sub: "별을 바라보던 신라의 밤",
    image: "/images/landmark-cheomseongdae.jpg",
  },
  {
    slug: "daereungwon",
    title: "대릉원",
    sub: "고분 사이를 천천히 걷는 시간",
    image: "/images/landmark-daereungwon.png",
  },
  {
    slug: "bulguksa",
    title: "불국사",
    sub: "돌 위에 펼쳐진 신라의 예술",
    image: "/images/bulguksa-main.jpg",
  },
  {
    slug: "woljeonggyo",
    title: "월정교",
    sub: "강물 위로 번지는 경주의 불빛",
    image: "/images/landmark-woljeonggyo.jpg",
  },
];
export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="notice-strip">
        <Link href="/tours/night">
          <strong>야경투어 안내</strong> 9–2월 18:30 시작 · 18:20 집결{" "}
          <span aria-hidden>›</span>
        </Link>
      </div>
      <main id="main-content">
        <section className="hero">
          <div className="hero-photo">
            <Image
              src="/images/landmark-donggung-wolji.jpg"
              alt="불빛이 연못에 비치는 경주 동궁과월지의 밤"
              fill
              sizes="100vw"
              preload
            />
          </div>
          <div className="hero-shade" />
          <div className="wrap hero-inner">
            <div className="eyebrow">경주를 깊이 만나는 두 시간</div>
            <h1>
              보이는 것 너머의
              <br />
              <em>경주를 만납니다</em>
            </h1>
            <p>
              유물 하나, 돌계단 하나에도 이야기가 있습니다.
              <br />
              경주를 잘 아는 해설사와 천천히 걸어보세요.
            </p>
            <Link href="/tours" className="btn btn-gold">
              투어 둘러보기
              <IconArrow />
            </Link>
            <p className="hero-location">
              <IconMapPin /> 경주, 동궁과월지
            </p>
          </div>
        </section>
        <div className="wrap">
          <nav className="quick-links" aria-label="투어 바로가기">
            {shortcuts.map(({ href, title, sub }, index) => (
              <Link key={href} href={href}>
                <span className="quick-index">0{index + 1}</span>
                <span>
                  <strong>{title}</strong>
                  <small>{sub}</small>
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <section id="tours" className="section wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">경주트립 정규 투어</div>
              <h2>세 가지 방식으로 만나는 경주</h2>
              <p>낮과 밤, 실내와 야외. 여행 일정에 맞춰 골라보세요.</p>
            </div>
            <Link href="/tours" className="text-link">
              전체 투어
              <IconArrow />
            </Link>
          </div>
          <div className="tour-grid">
            {TOUR_LIST.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
          <div className="store-note">
            <span>
              <b className="naver-n">N</b> 예약 가능한 날짜와 최신 후기는 네이버
              스마트스토어에서 확인하세요.
            </span>
            <a
              className="text-link"
              href="https://smartstore.naver.com/gjtrip"
              target="_blank"
              rel="noopener noreferrer"
            >
              네이버 스토어 바로가기
              <IconArrow />
            </a>
          </div>
        </section>
        <section className="section soft">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">경주트립이 준비한 것</div>
                <h2>해설에 집중할 수 있는 여행</h2>
              </div>
            </div>
            <div className="why-grid">
              <div className="why-item">
                <span className="why-number">01</span>
                <h3>경주를 아는 사람의 이야기</h3>
                <p>
                  설명판을 읽는 것에서 한 걸음 더. 해설사와 대화하며 눈앞의
                  장소와 유물을 이해합니다.
                </p>
              </div>
              <div className="why-item">
                <span className="why-number">02</span>
                <h3>질문이 편안한 작은 그룹</h3>
                <p>
                  박물관은 한 조 최대 15명, 야경과 불국사는 최대 20명. 서로의
                  속도를 살피며 함께합니다.
                </p>
              </div>
              <div className="why-item">
                <span className="why-number">03</span>
                <h3>이야기에 집중할 수 있도록</h3>
                <p>
                  1인 1대 해설 수신기를 제공합니다. 주변 풍경을 둘러보면서도
                  해설사의 이야기를 들을 수 있어요.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section wrap">
          <div className="group-banner">
            <div className="group-copy">
              <div className="eyebrow">단체·맞춤 여행</div>
              <h2>
                함께하는 사람에 맞춰,
                <br />
                경주 여행도 다르게.
              </h2>
              <p>
                학교의 배움 여행, 기업 워크숍, 가족 모임까지.
                <br />
                인원과 목적, 일정에 맞는 코스를 함께 설계합니다.
              </p>
              <Link href="/groups" className="btn btn-gold">
                단체·맞춤여행 알아보기
                <IconArrow />
              </Link>
            </div>
            <div className="group-image">
              <Image
                src="/images/bulguksa-main.jpg"
                alt="단체 역사여행으로 만나는 불국사"
                fill
                sizes="(max-width:767px) 100vw, 600px"
              />
            </div>
          </div>
        </section>
        <section
          id="landmarks"
          className="wrap section"
          style={{ paddingTop: 0 }}
        >
          <div className="section-head">
            <div>
              <div className="eyebrow">여행 전 읽어두면 좋은 이야기</div>
              <h2>알고 가면 더 좋은 경주</h2>
              <p>투어 전후로, 여행의 장면을 더해보세요.</p>
            </div>
            <Link className="text-link" href="/guide">
              여행가이드
              <IconArrow />
            </Link>
          </div>
          <div className="guide-grid">
            {places.map((p) => (
              <Link href={"/landmarks/" + p.slug} key={p.slug}>
                <div className="place-image">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:767px) 45vw, 280px"
                  />
                </div>
                <h3>{p.title}</h3>
                <p>{p.sub}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="soft" id="contact">
          <div className="wrap help-band">
            <div>
              <h2>예약 전에 궁금한 점이 있나요?</h2>
              <p>참여 연령, 걷는 정도, 우천 시 운영까지 미리 확인하세요.</p>
            </div>
            <Link className="btn btn-outline" href="/help">
              자주 묻는 질문
              <IconArrow />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
