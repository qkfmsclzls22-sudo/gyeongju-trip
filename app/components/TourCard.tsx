import Link from "next/link";
import Image from "next/image";
import { type Tour } from "@/lib/tours";

export default function TourCard({
  tour,
  prioritizeImage = false,
}: {
  tour: Tour;
  prioritizeImage?: boolean;
}) {
  return (
    <article className="tour-card">
      <Link
        href={"/tours/" + tour.id}
        className="tour-card-photo"
        aria-label={tour.name + " 자세히 보기"}
      >
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          sizes="(max-width:600px) 120px, (max-width:900px) 45vw, 380px"
          preload={prioritizeImage}
        />
      </Link>
      <div className="tour-card-body">
        <p className="tour-card-meta">
          {tour.duration} · 한 조 최대 {tour.maxPeople}명
        </p>
        <h3>
          <Link href={"/tours/" + tour.id}>{tour.shortName}</Link>
        </h3>
        <p className="tour-card-desc">{tour.walking}</p>
        <p className="tour-card-time">{tour.operatingHours}</p>
        <div className="price-row">
          <div>
            <span className="price-label">
              {tour.childPrice ? "성인" : "1인"}
            </span>
            <strong className="price">
              {tour.adultPrice.toLocaleString("ko-KR")}
              <span>원</span>
            </strong>
            {tour.childPrice && (
              <span className="child-price">
                어린이 {tour.childPrice.toLocaleString("ko-KR")}원
              </span>
            )}
          </div>
          <Link
            className="tour-card-action"
            href={"/tours/" + tour.id}
            aria-label={tour.shortName + " 일정과 코스 보기"}
          >
            <span className="visually-hidden">일정·코스 보기</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
