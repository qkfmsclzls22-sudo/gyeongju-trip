import Link from "next/link";
import Image from "next/image";
import { type Tour } from "@/lib/tours";
import { IconArrow } from "./icons";
export default function TourCard({ tour }: { tour: Tour }) {
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
          sizes="(max-width:767px) 100vw, 380px"
        />
        <span className="photo-label">{tour.duration}</span>
      </Link>
      <div className="tour-card-body">
        <div className="tour-card-meta">{tour.category}</div>
        <h3>
          <Link href={"/tours/" + tour.id}>{tour.shortName}</Link>
        </h3>
        <p className="tour-card-desc">{tour.tagline}</p>
        <div className="price-row">
          <div>
            <small>{tour.childPrice ? "성인 1인" : "1인 · 연령 공통"}</small>
            <div className="price">
              {tour.adultPrice.toLocaleString("ko-KR")}
              <span>원</span>
            </div>
            {tour.childPrice && (
              <small>어린이 {tour.childPrice.toLocaleString("ko-KR")}원</small>
            )}
          </div>
          <Link className="text-link" href={"/tours/" + tour.id}>
            투어 보기
            <IconArrow />
          </Link>
        </div>
      </div>
    </article>
  );
}
