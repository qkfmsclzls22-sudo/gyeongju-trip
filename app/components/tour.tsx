import Image from "next/image";
import Link from "next/link";
import { TOURS, type TourId } from "@/lib/tours";
import { Breadcrumb } from "./inside";
import {
  IconClock,
  IconInfo,
  IconMapPin,
  IconUsers,
  type IconProps,
} from "./icons";

export function TourHero({
  category,
  title,
  subtitle,
  image,
  tourId,
  intro,
}: {
  category: string;
  title: React.ReactNode;
  subtitle: string;
  image: string;
  tourId: TourId;
  intro: string;
}) {
  const edition = {
    museum: "01 / MUSEUM",
    bulguksa: "02 / HERITAGE",
    night: "03 / NIGHT WALK",
  }[tourId];
  return (
    <>
      <div className="page-width">
        <Breadcrumb
          current={category}
          parent={{ href: "/#tours", label: "도슨트 투어" }}
        />
        <section className="tour-cover">
          <div>
            <span className="page-kicker">
              THE DOCENT COLLECTION — {edition}
            </span>
            <h1>{title}</h1>
            <p className="page-lead">{intro}</p>
            <p className="tour-cover-subtitle">{subtitle}</p>
            <div className="tour-cover-actions">
              <a className="page-button" href="#booking">
                날짜·예약 확인 <span aria-hidden="true">↗</span>
              </a>
              <a className="page-link" href="#overview">
                투어 자세히 보기 <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <figure className="tour-cover-figure">
            <div className="tour-cover-image">
              <Image
                src={image}
                alt={`${category} 상품 안내 이미지`}
                fill
                priority
                sizes="(max-width:760px) 90vw, 42vw"
              />
            </div>
            <figcaption>
              <span>GYEONGJU TRIP / {edition.split(" / ")[0]}</span>
              <span>해설사와 함께하는 경주</span>
            </figcaption>
          </figure>
        </section>
      </div>
      <nav className="tour-nav" aria-label="투어 상세 이동">
        <div className="page-width page-jump">
          <a href="#overview">핵심 정보</a>
          <a href="#experience">투어 이야기</a>
          <a href="#recommend">추천 대상</a>
          <a href="#booking">예약 안내 ↗</a>
        </div>
      </nav>
    </>
  );
}
export function SectionTitle({
  Icon,
  children,
}: {
  Icon: (p: IconProps) => React.ReactElement;
  children: React.ReactNode;
}) {
  return (
    <h2 className="tour-section-title">
      <span aria-hidden="true">
        <Icon />
      </span>
      {children}
    </h2>
  );
}
export function InfoTable({
  rows,
}: {
  rows: { label: string; value: string }[];
}) {
  return (
    <dl className="tour-facts">
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function PointCard({
  title,
  note,
  children,
}: {
  title: string;
  highlight?: boolean;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="point-card">
      <h3>{title}</h3>
      <div>{children}</div>
      {note && (
        <p className="point-card-note">
          <IconInfo aria-hidden="true" />
          {note}
        </p>
      )}
    </article>
  );
}
export function RecommendList({ items }: { items: string[] }) {
  return (
    <ul className="recommend-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
const refundRows = [
  { when: "투어 3일 전", rate: "100% 환불" },
  { when: "투어 2일 전", rate: "70% 환불" },
  { when: "투어 1일 전", rate: "50% 환불" },
  { when: "당일 취소", rate: "환불 불가" },
  { when: "모집인원 미달 시", rate: "일자 무관 전액 환불" },
];
export function RefundTable({ note }: { note: string }) {
  return (
    <div className="refund-table">
      <div>
        {refundRows.map((row) => (
          <div key={row.when}>
            <span>{row.when}</span>
            <strong>{row.rate}</strong>
          </div>
        ))}
      </div>
      <p>{note}</p>
      <p>
        <Link href="/terms#refund" className="page-link">
          취소·환불 약관 확인 ↗
        </Link>
      </p>
    </div>
  );
}
export function SafetyNote({ children }: { children: React.ReactNode }) {
  return (
    <section className="safety-note">
      <strong>안전 및 보험 안내</strong>
      <p>{children}</p>
    </section>
  );
}
export function BookingCard({
  tourId,
  originalPrice,
  price,
  childPrice,
  priceNote,
  times,
  duration,
  minPeople,
  meetingPoint,
}: {
  tourId: TourId;
  originalPrice: number;
  price: number;
  childPrice?: number;
  priceNote: string;
  times: string;
  duration: string;
  minPeople: string;
  meetingPoint: string;
}) {
  const info = [
    { Icon: IconClock, text: times },
    { Icon: IconInfo, text: duration },
    { Icon: IconUsers, text: minPeople },
    { Icon: IconMapPin, text: meetingPoint },
  ];
  return (
    <aside id="booking" className="booking-card" aria-label="투어 예약 안내">
      <span className="page-kicker">YOUR NEXT GYEONGJU</span>
      <div className="booking-price">
        <del>{originalPrice.toLocaleString()}원</del>
        <strong>
          {price.toLocaleString()}
          <span>원 / 1인</span>
        </strong>
        {childPrice && <p>어린이 {childPrice.toLocaleString()}원</p>}
        <small>{priceNote}</small>
      </div>
      <ul>
        {info.map(({ Icon, text }) => (
          <li key={text}>
            <Icon aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
      <Link className="page-button" href={`/checkout/${tourId}`}>
        날짜 선택·예약하기 <span aria-hidden="true">↗</span>
      </Link>
      <a
        className="page-button secondary"
        href="https://smartstore.naver.com/gjtrip"
        target="_blank"
        rel="noopener noreferrer"
      >
        네이버스토어에서 예약 ↗
      </a>
      <div className="booking-contact">
        <a href="tel:010-8402-8543">
          <span>개인 문의</span>010-8402-8543
        </a>
        <a href="tel:010-5552-7971">
          <span>단체 문의</span>010-5552-7971
        </a>
      </div>
    </aside>
  );
}
export function RelatedTours({ current }: { current: TourId }) {
  const names = {
    museum: "국립경주박물관 도슨트",
    bulguksa: "불국사 도슨트",
    night: "신라별빛야행",
  };
  return (
    <section className="page-width page-section">
      <span className="page-kicker">MORE WAYS TO EXPLORE</span>
      <h2 style={{ marginTop: 14 }}>경주의 다른 장면도 만나보세요.</h2>
      <div className="related-tours">
        {Object.values(TOURS)
          .filter((tour) => tour.id !== current)
          .map((tour) => (
            <Link href={`/tours/${tour.id}`} key={tour.id}>
              <Image
                src={`/images/product-smartstore-${tour.id}.webp`}
                alt=""
                width={96}
                height={96}
              />
              <div>
                <strong>{names[tour.id]}</strong>
                <small>
                  {tour.adultPrice.toLocaleString()}원 / 성인 1인{" "}
                  <span aria-hidden="true">↗</span>
                </small>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
