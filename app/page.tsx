import Link from "next/link";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "./components/site";
import TourCatalog from "./components/TourCatalog";
import { STORE_URL } from "@/lib/tours";

const places = [
  {
    slug: "daereungwon",
    title: "대릉원",
    desc: "고분 사이 산책과 천마총 관람",
    image: "/images/landmark-daereungwon.png",
  },
  {
    slug: "hwangnidan",
    title: "황리단길",
    desc: "투어 전후 식사와 카페를 찾는다면",
    image: "/images/hwangnidan-clean.jpg",
  },
  {
    slug: "woljeonggyo",
    title: "월정교",
    desc: "교촌마을과 함께 둘러보기 좋은 곳",
    image: "/images/landmark-woljeonggyo.jpg",
  },
  {
    slug: "cheomseongdae",
    title: "첨성대",
    desc: "대릉원·동부사적지와 이어서 걷기",
    image: "/images/landmark-cheomseongdae.jpg",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="storefront wrap">
        <section className="home-tours" aria-labelledby="home-title">
          <div className="shop-heading">
            <div>
              <h1 id="home-title">경주 해설 투어</h1>
              <p>국립경주박물관, 불국사, 그리고 청사초롱을 들고 걷는 밤.</p>
            </div>
            <a
              className="store-bookings"
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              네이버 예약 확인 <span aria-hidden>↗</span>
            </a>
          </div>
          <TourCatalog />
          <div className="departure-note">
            <p>
              <strong>출발 안내</strong> 최소 7명부터 진행합니다. 예약 가능
              여부는 네이버에서 날짜별로 확인해 주세요.
            </p>
            <Link href="/help">예약 안내</Link>
          </div>
        </section>
        <aside className="operating-notice" aria-label="야경투어 운영 안내">
          <span className="notice-label">야경투어 시간 안내</span>
          <p>
            9–2월 <strong>18:30 시작</strong>
            <span>시작 10분 전, 18:20까지 동궁과월지 집결</span>
          </p>
          <Link href="/tours/night">
            코스 확인 <span aria-hidden>→</span>
          </Link>
        </aside>
        <section className="private-trip" aria-labelledby="private-title">
          <div className="private-trip-photo">
            <Image
              src="/images/bulguksa-main.jpg"
              alt="불국사의 전각과 석탑"
              fill
              sizes="(max-width:767px) 100vw, 500px"
            />
          </div>
          <div className="private-trip-copy">
            <p className="plain-label">학교 · 기업 · 가족 모임</p>
            <h2 id="private-title">
              우리 일행끼리
              <br />
              여행하고 싶다면
            </h2>
            <p>
              원하는 날짜와 인원을 알려주세요.
              <br />
              일정에 맞춰 코스와 해설사를 준비합니다.
            </p>
            <div className="private-trip-actions">
              <Link className="btn btn-primary" href="/quote">
                단체 견적 문의
              </Link>
              <Link className="text-link" href="/groups">
                진행 방식 보기
              </Link>
            </div>
          </div>
        </section>
        <section className="local-guide" aria-labelledby="local-guide-title">
          <div className="section-head">
            <h2 id="local-guide-title">투어 전후, 들를 만한 곳</h2>
            <Link className="text-link" href="/guide">
              경주 여행가이드 <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="local-guide-list">
            {places.map((place) => (
              <Link
                href={"/landmarks/" + place.slug}
                key={place.slug}
                className="local-guide-item"
              >
                <div className="local-guide-image">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    sizes="(max-width:767px) 88px, 148px"
                  />
                </div>
                <div>
                  <h3>{place.title}</h3>
                  <p>{place.desc}</p>
                </div>
                <span className="local-guide-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="home-help" aria-labelledby="home-help-title">
          <div>
            <h2 id="home-help-title">예약 전 궁금한 점</h2>
            <p>어린이 참여, 걷는 정도, 우천 시 운영을 확인하세요.</p>
          </div>
          <div className="home-help-links">
            <Link href="/help">자주 묻는 질문</Link>
            <Link href="/help#refund">취소·환불 안내</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
