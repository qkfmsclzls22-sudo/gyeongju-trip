import Image from "next/image";
import { SiteFooter, SiteHeader } from "./components/site";
import { IconArrow } from "./components/icons";
import { HomeGallery } from "./components/HomeGallery";
import styles from "./homepage.module.css";

const places = [
  { slug: "daereungwon", name: "대릉원", image: "gyeongju-green-tombs.webp", alt: "푸른 하늘 아래 대릉원의 초록 고분" },
  { slug: "seokguram", name: "석굴암", image: "landmark-seokguram.png", alt: "석굴암 본존불" },
  { slug: "cheomseongdae", name: "첨성대", image: "landmark-cheomseongdae.jpg", alt: "밤하늘 아래 첨성대" },
  { slug: "woljeonggyo", name: "월정교", image: "gallery-bridge-night.webp", alt: "남천에 빛이 비치는 월정교" },
];

export default function Home() {
  return <main className={styles.home}>
    <a href="#home-content" className={styles.skipLink}>본문 바로가기</a>
    <SiteHeader variant="home" />
    <div className={styles.serviceStrip}>도슨트 투어부터 기업·학교·MICE 맞춤 여행까지.<a href="/company">경주트립 알아보기 <span aria-hidden="true">›</span></a></div>

    <section id="home-content" className={`${styles.feature} ${styles.hero}`} aria-labelledby="home-title">
      <Image className={styles.heroImage} src="/images/landmark-donggung-wolji.jpg" alt="푸른 저녁 하늘과 연못에 비친 동궁과월지" fill sizes="100vw" preload />
      <div className={styles.heroShade} />
      <div className={styles.featureCopy}>
        <h1 id="home-title">경주를 새롭게.</h1>
        <p>경주를 더 깊게, 여행은 더 즐겁게.</p>
        <div className={styles.actions}><a href="#tours" className={styles.primaryButton}>투어 알아보기</a><a href="/quote" className={styles.outlineButton}>단체 문의하기</a></div>
      </div>
      <span className={styles.photoCaption}>동궁과월지 · 경주</span>
    </section>

    <section id="tours" className={`${styles.feature} ${styles.museum}`} aria-labelledby="museum-title">
      <div className={styles.featureCopy}>
        <span className={styles.kicker}>국립경주박물관 도슨트</span>
        <h2 id="museum-title">천년의 신라.<br className={styles.mobileBreak} /> 눈앞에 생생하게.</h2>
        <p>유물을 보는 시간에서, 이야기를 만나는 시간으로.</p>
        <a href="/tours/museum" className={styles.primaryButton}>더 알아보기</a>
      </div>
      <div className={styles.museumImage}><Image src="/images/gallery-museum-space.webp" alt="신라 유물을 전시한 국립경주박물관 내부" fill sizes="(max-width: 760px) 100vw, 1200px" /></div>
    </section>

    <div className={styles.featureGrid}>
      <section className={`${styles.tile} ${styles.night}`} aria-labelledby="night-title">
        <Image src="/images/gyeongju-donggung-night.webp" alt="밤에 조명을 밝힌 동궁과월지와 연못의 반영" fill sizes="(max-width: 760px) 100vw, 50vw" />
        <div className={styles.tileShade} />
        <div className={styles.tileCopy}><span className={styles.kicker}>청사초롱 야경투어</span><h2 id="night-title">신라별빛야행.</h2><p>경주의 밤이, 오래 기억되도록.</p><a href="/tours/night" className={styles.primaryButton}>더 알아보기</a></div>
      </section>
      <section className={`${styles.tile} ${styles.bulguksa}`} aria-labelledby="bulguksa-title">
        <div className={styles.tileCopy}><span className={styles.kicker}>불국사·석굴암 문화유산 해설</span><h2 id="bulguksa-title">알면, 달리 보이는 경주.</h2><p>돌 하나에도 이야기가 있으니까.</p><a href="/tours/bulguksa" className={styles.primaryButton}>더 알아보기</a></div>
        <div className={styles.tileBottomImage}><Image src="/images/gyeongju-bulguksa-sky.webp" alt="불국사 처마 사이로 보이는 석가탑과 푸른 하늘" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      </section>
      <section className={`${styles.tile} ${styles.private}`} aria-labelledby="private-title">
        <div className={styles.tileCopy}><span className={styles.kicker}>프라이빗 투어</span><h2 id="private-title">우리만의 경주.</h2><p>좋아하는 사람들과. 우리에게 맞는 속도로.</p><a href="/quote" className={styles.primaryButton}>프라이빗 투어 문의</a></div>
        <div className={styles.tileBottomImage}><Image src="/images/gyeongju-green-tombs.webp" alt="경주 대릉원의 초록 능선과 산책길" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      </section>
      <section className={`${styles.tile} ${styles.group}`} aria-labelledby="group-title">
        <div className={styles.tileCopy}><span className={styles.kicker}>기업 · 학교 · MICE</span><h2 id="group-title">함께하는 여행.<br />기획부터 다르게.</h2><p>인원과 목적에 맞춰 준비하는 맞춤 투어.</p><a href="/quote" className={styles.primaryButton}>단체 견적 문의</a></div>
        <div className={styles.tileBottomImage}><Image src="/images/tour-bulguksa-field.webp" alt="해설사와 함께 불국사를 둘러보는 단체 여행객" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      </section>
    </div>

    <section id="landmarks" className={styles.places} aria-labelledby="places-title">
      <div className={`${styles.container} ${styles.sectionHeading}`}><h2 id="places-title">다음에 만날 경주.</h2><a href="/now" className={styles.textLink}>지금 경주 소식 <span aria-hidden="true">›</span></a></div>
      <div className={`${styles.container} ${styles.placeGrid}`}>{places.map(place => <a key={place.slug} href={`/landmarks/${place.slug}`} className={styles.place}>
        <div className={styles.placePhoto}><Image src={`/images/${place.image}`} alt={place.alt} fill sizes="(max-width: 640px) 44vw, 23vw" /></div><div><h3>{place.name}</h3><IconArrow /></div>
      </a>)}</div>
    </section>

    <section id="about" className={styles.about} aria-labelledby="about-title"><div className={styles.aboutCopy}><span className={styles.kicker}>문화관광 콘텐츠 기업, 경주트립</span><h2 id="about-title">경주를 가장 가까이서.<br />여행을 더 새롭게.</h2><p>현장에서 쌓은 이야기와 콘텐츠 기획력,<br className={styles.desktopBreak} /> 그리고 디지털 기술로 경주 여행의 경험을 넓혀갑니다.</p><a href="/company" className={styles.textLink}>경주트립 이야기 <span aria-hidden="true">›</span></a></div></section>

    <section id="gallery" className={styles.gallerySection} aria-labelledby="gallery-title"><div className={`${styles.container} ${styles.sectionHeading}`}><h2 id="gallery-title">함께한 순간들.</h2><p>다음 여행의 주인공은, 당신.</p></div><HomeGallery /></section>
    <SiteFooter />
  </main>;
}
