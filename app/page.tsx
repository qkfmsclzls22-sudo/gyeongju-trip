import Image from "next/image";
import MobileRail from "./components/MobileRail";
import { SiteFooter, SiteHeader } from "./components/site";
import { HomeGallery } from "./components/HomeGallery";
import JourneyExplorer from "./components/JourneyExplorer";
import styles from "./homepage.module.css";
import s from "./journey.module.css";

const places = [
  { slug: "daereungwon", name: "대릉원", image: "illustration-autumn.webp", line: "능선 사이를 걷는 시간" },
  { slug: "seokguram", name: "석굴암", image: "illustration-buddha.webp", line: "돌로 완성한 고요" },
  { slug: "cheomseongdae", name: "첨성대", image: "illustration-cheomseongdae.webp", line: "오래된 별의 자리" },
  { slug: "woljeonggyo", name: "월정교", image: "illustration-woljeonggyo.webp", line: "물 위에 내려앉은 빛" },
];
export default function Home() {
  return <main className={`${styles.home} ${s.home}`}>
    <a href="#home-content" className={styles.skipLink}>본문 바로가기</a>
    <SiteHeader variant="home" />
    <JourneyExplorer />
    <section className={s.groupSection} aria-labelledby="group-title"><div className={s.groupPhoto}><Image src="/images/tour-bulguksa-field.webp" alt="불국사에서 해설사와 함께하는 단체 여행객" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={s.groupCopy}><span className={s.overline}>FOR TEAMS, SCHOOLS & ORGANIZATIONS</span><h2 id="group-title">함께라서,<br /><em>다르게 기획합니다.</em></h2><p>학교의 배움, 기업의 만남, 우리만의 여행.<br />행사의 목적부터 현장의 동선까지 함께 만듭니다.</p><div className={s.groupServices}><span>학교·교육여행</span><span>기업·MICE</span><span>프라이빗 투어</span></div><a href="/quote" className={s.groupCta}>우리 팀의 여행 이야기하기 ↗</a></div></section>
    <section id="landmarks" className={s.placeSection} aria-labelledby="places-title"><div className={s.smallHeading}><div><span className={s.overline}>POSTCARDS FROM GYEONGJU</span><h2 id="places-title">그림으로 만나는 경주.</h2></div><a href="/now">지금 경주의 소식 ↗</a></div><MobileRail id="place-rail" label="명소" count={4} className={s.placeGrid}>{places.map((place, i) => <a key={place.slug} href={`/landmarks/${place.slug}`}><div className={s.placeImage}><Image src={`/images/${place.image}`} alt={`${place.name} 일러스트`} fill sizes="(max-width: 760px) 44vw, 22vw" /><span>GYEONGJU / 0{i + 1}</span></div><h3>{place.name}<span aria-hidden="true">↗</span></h3><p>{place.line}</p></a>)}</MobileRail></section>
    <section id="gallery" className={`${styles.gallerySection} ${s.gallerySection}`} aria-labelledby="gallery-title"><div className={`${styles.container} ${s.smallHeading}`}><div><span className={s.overline}>FIELD NOTES</span><h2 id="gallery-title">우리가 함께 걸은 날들.</h2></div><p>풍경보다 오래 남는 건, 함께한 순간.</p></div><HomeGallery /></section>
    <section className={s.studio} aria-labelledby="studio-title"><span className={s.overline}>BASED IN GYEONGJU. MADE FOR YOU.</span><h2 id="studio-title">경주에 살며,<br />경주의 다음 여행을 만듭니다.</h2><a href="/company">문화관광 콘텐츠 기업, 경주트립 ↗</a><div aria-hidden="true">GYEONGJU TRIP</div></section>
    <div className={s.illustratedHorizon}><Image src="/images/gyeongju-footer-illustration.webp" alt="" width={2172} height={724} sizes="100vw" /></div>
    <SiteFooter />
  </main>;
}
