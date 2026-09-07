import Link from "next/link";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "./components/site";
import TourCard from "./components/TourCard";
import { TOUR_LIST } from "@/lib/tours";
import {
  IconArrow,
  IconMuseum,
  IconMoon,
  IconPagoda,
  IconUsers,
  IconMapPin,
  IconGuide,
  IconHeadphones,
  IconRoute,
} from "./components/icons";
const shortcuts = [
  {
    href: "/tours/museum",
    title: "박물관",
    sub: "신라를 만나는 시간",
    Icon: IconMuseum,
  },
  {
    href: "/tours/night",
    title: "야경투어",
    sub: "경주의 밤을 걷다",
    Icon: IconMoon,
  },
  {
    href: "/tours/bulguksa",
    title: "불국사",
    sub: "세계유산의 이야기",
    Icon: IconPagoda,
  },
  {
    href: "/groups",
    title: "단체여행",
    sub: "우리만의 경주",
    Icon: IconUsers,
  },
  {
    href: "/guide",
    title: "여행가이드",
    sub: "알고 가면 더 좋은",
    Icon: IconRoute,
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
            <div className="eyebrow">LOCAL STORIES, LASTING MEMORIES</div>
            <h1>
              경주는, 이야기를 만나면
              <br />
              <em>더 오래 남습니다.</em>
            </h1>
            <p>
              천년의 유물부터 달빛 아래 골목까지.
              <br />
              경주를 잘 아는 해설사와 함께
              <br />
              풍경 너머의 이야기를 만나보세요.
            </p>
            <Link href="/tours" className="btn btn-gold">
              나에게 맞는 투어 찾기
              <IconArrow />
            </Link>
            <p className="hero-location">
              <IconMapPin /> 경주, 동궁과월지
            </p>
          </div>
        </section>
        <div className="wrap">
          <nav className="quick-links" aria-label="투어 바로가기">
            {shortcuts.map(({ href, title, sub, Icon }) => (
              <Link key={href} href={href}>
                <Icon />
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
              <div className="eyebrow">GYEONGJU, WITH A STORY</div>
              <h2>어떤 경주를 만나고 싶으세요?</h2>
              <p>여행의 취향에 맞춰 고르는 세 가지 이야기.</p>
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
                <div className="eyebrow">WHY GYEONGJU TRIP</div>
                <h2>함께 걸으면, 여행의 깊이가 달라져요</h2>
              </div>
            </div>
            <div className="why-grid">
              <div className="why-item">
                <IconGuide />
                <h3>경주를 아는 사람의 이야기</h3>
                <p>
                  설명판을 읽는 것에서 한 걸음 더. 해설사와 대화하며 눈앞의
                  장소와 유물을 이해합니다.
                </p>
              </div>
              <div className="why-item">
                <IconUsers />
                <h3>질문이 편안한 작은 그룹</h3>
                <p>
                  박물관은 한 조 최대 15명, 야경과 불국사는 최대 20명. 서로의
                  속도를 살피며 함께합니다.
                </p>
              </div>
              <div className="why-item">
                <IconHeadphones />
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
              <div className="eyebrow">A TRIP, TOGETHER</div>
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
              <div className="eyebrow">BEFORE YOU GO</div>
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
