import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter, CtaBanner } from "@/app/components/site";
import { LANDMARK_DATA, type LandmarkSlug } from "@/lib/landmarks";
function landmark(slug: string) {
  return Object.hasOwn(LANDMARK_DATA, slug)
    ? LANDMARK_DATA[slug as LandmarkSlug]
    : undefined;
}
export function generateStaticParams() {
  return Object.keys(LANDMARK_DATA).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const item = landmark((await params).slug);
  return {
    title: item
      ? item.name + " 여행가이드 | 경주트립"
      : "여행가이드 | 경주트립",
    description: item?.intro,
  };
}
export default async function Landmark({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = landmark((await params).slug);
  if (!item) notFound();
  return (
    <>
      <SiteHeader />
      <main className="wrap" id="main-content">
        <div className="page-heading">
          <nav className="breadcrumbs" aria-label="현재 위치">
            <Link href="/">홈</Link>
            <span>›</span>
            <Link href="/guide">여행가이드</Link>
          </nav>
          <div className="eyebrow">{item.area}</div>
          <h1>{item.name}</h1>
          <p>{item.subtitle}</p>
        </div>
        <div className="detail-hero">
          <div className="detail-image">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width:767px) 100vw, 640px"
              preload
            />
          </div>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 750, marginBottom: 20 }}>
              {item.subtitle}
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.9 }}>
              {item.intro}
            </p>
            <div className="info-box">
              <strong>여행 전에 알아두면 좋아요</strong>
              <p style={{ margin: "8px 0 0" }}>{item.tip}</p>
            </div>
          </div>
        </div>
        <div className="legal-content">
          <h2>방문 정보</h2>
          <p>
            위치 · {item.address}
            <br />
            관람료 · {item.fee}
          </p>
          <p>
            운영시간·입장료·휴관은 변경될 수 있습니다. 출발 전{" "}
            <a href={item.source} target="_blank" rel="noopener noreferrer">
              공식 안내
            </a>
            를 확인해 주세요.
          </p>
          <Link className="btn btn-primary" href={"/tours/" + item.tour}>
            함께 보면 좋은 투어 →
          </Link>
        </div>
      </main>
      <CtaBanner
        title="풍경 너머의 이야기가 궁금하다면"
        desc="해설사와 함께 경주를 더 깊이 만나보세요."
      />
      <SiteFooter />
    </>
  );
}
