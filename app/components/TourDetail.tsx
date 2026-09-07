import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "./site";
import BookingPanel from "./BookingPanel";
import { FAQ } from "@/lib/faq";
import { STORE_URL, type Tour } from "@/lib/tours";
export default function TourDetail({ tour }: { tour: Tour }) {
  return (
    <div className="has-booking">
      <SiteHeader />
      <main className="wrap" id="main-content">
        <div className="page-heading" style={{ paddingBottom: 0 }}>
          <nav className="breadcrumbs" aria-label="현재 위치">
            <Link href="/">홈</Link>
            <span>›</span>
            <Link href="/tours">전체 투어</Link>
            <span>›</span>
            <span>{tour.category}</span>
          </nav>
        </div>
        <div className="detail-hero">
          <div className="detail-image">
            <Image
              src={tour.image}
              alt={tour.name}
              fill
              sizes="(max-width:767px) 100vw, 640px"
              preload
            />
          </div>
          <div className="detail-title">
            <div className="tag-list">
              {tour.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <h1>{tour.name}</h1>
            <p>{tour.description}</p>
            <div className="detail-facts">
              <div>
                <small>소요 시간</small>
                <strong>{tour.duration}</strong>
              </div>
              <div>
                <small>함께하는 인원</small>
                <strong>한 조 최대 {tour.maxPeople}명</strong>
              </div>
              <div>
                <small>투어 방식</small>
                <strong>{tour.walking}</strong>
              </div>
              <div>
                <small>운영 시간</small>
                <strong>{tour.operatingHours}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-layout">
          <div className="detail-content">
            <nav className="detail-tabs" aria-label="상품 상세 안내">
              <a href="#intro">투어 소개</a>
              <a href="#course">코스·집결</a>
              <a href="#notice">참여 안내</a>
              <a href="#reviews">후기</a>
              <a href="#refund">취소·환불</a>
            </nav>
            <section id="intro">
              <h2>{tour.tagline}</h2>
              {tour.highlights.map((h) => (
                <div className="point" key={h.title}>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              ))}
            </section>
            <section id="course">
              <h2>이렇게 함께 걸어요</h2>
              <ol className="course-list">
                {tour.course.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
              <div className="info-box">
                <strong>집결 장소 · {tour.meetingPoint}</strong>
                <br />
                시작 10분 전까지 도착해 주세요. 최종 동선과 장소는 예약 안내를
                확인해 주세요.
              </div>
            </section>
            <section id="notice">
              <h2>예약 전 확인해 주세요</h2>
              <h3>포함 사항</h3>
              <ul className="info-list">
                {tour.included.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <h3 style={{ marginTop: 26 }}>참여 안내</h3>
              <ul className="info-list">
                {tour.notice.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
            <section id="reviews">
              <h2>먼저 다녀온 여행자의 이야기</h2>
              <div className="review-link-box">
                <strong>실제 구매 후기를 직접 확인하세요</strong>
                <p>
                  네이버 상품 페이지에서 최근 후기와 사진을 살펴보세요. 후기는
                  예약 채널에서 작성·관리됩니다.
                </p>
                <a
                  className="btn btn-outline"
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  네이버에서 후기 보기 ↗
                </a>
              </div>
            </section>
            <section id="refund">
              <h2>취소·환불 및 자주 묻는 질문</h2>
              <div className="faq-list">
                {FAQ.filter((f) =>
                  ["booking", "children", "rain", "refund"].includes(f.id),
                ).map((f) => (
                  <details key={f.id}>
                    <summary>{f.question}</summary>
                    <div>{f.answer}</div>
                  </details>
                ))}
              </div>
              <p style={{ fontSize: 14, marginTop: 20 }}>
                예약하신 상품의 취소·환불 조건을 확인해 주세요.{" "}
                <Link href="/help" className="text-link">
                  전체 이용 안내 보기 →
                </Link>
              </p>
            </section>
          </div>
          <BookingPanel
            tour={tour}
            checkoutEnabled={process.env.COMMERCE_MODE === "test"}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
