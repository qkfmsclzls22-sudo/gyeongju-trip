import Image from "next/image";
import { SiteFooter, SiteHeader } from "./components/site";
import { IconArrow } from "./components/icons";
import { HomeGallery } from "./components/HomeGallery";
import { TourCarousel } from "./components/TourCarousel";
import styles from "./homepage.module.css";

const storeUrl = "https://smartstore.naver.com/gjtrip";
const tours = [
  { id: "night", title: "신라별빛야행", label: "청사초롱 야경투어", description: "청사초롱 하나 들고, 해설사와 경주의 밤길을 걸어요.", image: "/images/tour-night-field.webp", alt: "청사초롱을 들고 첨성대 앞에 모인 경주트립 여행자들", detail: "청사초롱 대여 · 야간 도보" },
  { id: "museum", title: "국립경주박물관", label: "박물관 도슨트", description: "작은 유물에 담긴 큰 이야기. 신라가 한결 가까워집니다.", image: "/images/tour-museum-field.webp", alt: "국립경주박물관 전시 모형 앞에서 해설을 듣는 여행자들", detail: "유물 해설 · 실내 관람" },
  { id: "bulguksa", title: "불국사·석굴암", label: "문화유산 해설투어", description: "돌계단과 탑, 전각 사이에 남아 있는 이야기를 만나요.", image: "/images/tour-bulguksa-field.webp", alt: "불국사에서 문화유산 해설을 듣는 경주트립 참가자들", detail: "문화유산 해설 · 야외 관람" },
];
const landmarks = [
  { slug: "daereungwon", name: "대릉원", description: "초록 능선 사이를 걷는 시간", image: "landmark-daereungwon.png", alt: "연못과 나무 너머로 보이는 대릉원의 초록 고분" },
  { slug: "seokguram", name: "석굴암", description: "천년의 시간이 머문 자리", image: "landmark-seokguram.png", alt: "석굴암 본존불" },
  { slug: "cheomseongdae", name: "첨성대", description: "별을 바라보던 신라의 밤", image: "landmark-cheomseongdae.jpg", alt: "밤하늘 아래 조명을 밝힌 첨성대" },
  { slug: "woljeonggyo", name: "월정교", description: "물 위에 내려앉은 빛", image: "gallery-bridge-night.webp", alt: "남천에 불빛이 비치는 월정교의 밤 풍경" },
];

export default function Home() {
  return (
    <main className={styles.home}>
      <a href="#home-content" className={styles.skipLink}>본문 바로가기</a>
      <SiteHeader variant="home" />
      <section id="home-content" className={`${styles.container} ${styles.hero}`} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>경주에서 만나는 이야기 있는 여행</p>
          <h1 id="home-title">경주를 더 깊게,<br />여행은 더 즐겁게.</h1>
          <p className={styles.heroDescription}>박물관의 유물 앞에서, 천년의 돌계단 위에서,<br className={styles.desktopBreak} /> 청사초롱을 든 밤길에서.<br />경주트립과 함께 경주의 이야기를 만나보세요.</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#tours">투어 둘러보기 <IconArrow /></a>
            <a className={styles.textLink} href="/quote">단체여행 문의 <IconArrow /></a>
          </div>
          <div className={styles.heroNote}><span lang="en">GYEONGJU, WITH A LOCAL.</span><p>경주에서 기획하고, 현장에서 함께합니다.</p></div>
        </div>
        <figure className={styles.heroVisual}>
          <div className={styles.heroPhoto}><Image src="/images/gallery-bridge-walk.webp" alt="청사초롱을 들고 월정교의 회랑을 함께 걷는 경주트립 여행자들" fill sizes="(max-width: 760px) 92vw, (max-width: 1400px) 50vw, 690px" preload /></div>
          <figcaption><span>월정교, 청사초롱과 함께 걷는 밤</span><span lang="en">Gyeongju Trip</span></figcaption>
        </figure>
      </section>

      <section id="tours" className={`${styles.container} ${styles.programs}`} aria-labelledby="tours-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>해설사와 함께하는 경주</p><h2 id="tours-title">어떤 경주를 만나고 싶나요?</h2></div>
          <a className={styles.textLink} href={storeUrl} target="_blank" rel="noopener noreferrer">네이버에서 전체 상품 보기 <IconArrow /></a>
        </div>
        <TourCarousel count={tours.length}>
          {tours.map((tour, index) => <a key={tour.id} href={`/tours/${tour.id}`} className={styles.product}>
            <div className={styles.productPhoto}><Image src={tour.image} alt={tour.alt} fill sizes="(max-width: 640px) 82vw, 30vw" /><span className={styles.photoIndex}>{String(index + 1).padStart(2, "0")}</span></div>
            <span className={styles.productLabel}>{tour.label}</span>
            <div className={styles.productTitle}><h3>{tour.title}</h3><IconArrow /></div>
            <p>{tour.description}</p>
            <div className={styles.productMeta}>{tour.detail}<span>자세히 보기</span></div>
          </a>)}
        </TourCarousel>
        <div className={styles.customTours}>
          <a href="/quote"><span>가족 · 친구</span><strong>우리끼리, 우리 속도로.</strong><p>일행만을 위한 프라이빗 투어를 상담해 보세요.</p><span className={styles.customLink}>프라이빗 투어 문의 <IconArrow /></span></a>
          <a href="/quote"><span>기업 · 학교 · MICE</span><strong>여행의 목적에 맞게.</strong><p>인원과 일정에 맞춰 단체여행을 기획합니다.</p><span className={styles.customLink}>단체 · MICE 견적문의 <IconArrow /></span></a>
        </div>
      </section>

      <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
        <div className={`${styles.container} ${styles.about}`}>
          <figure className={styles.aboutPhoto}><Image src="/images/about-cheongsachorong.webp" alt="경주트립 야경투어의 밤길을 밝히는 청사초롱" fill sizes="(max-width: 760px) 92vw, 35vw" /><figcaption>여행의 한 장면이, 오래 남는 기억으로.</figcaption></figure>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>경주를 여행하는 또 하나의 방법</p>
            <h2 id="about-title">장소를 넘어,<br />그 안의 이야기까지.</h2>
            <p>경주트립은 경주의 역사·문화에 기획력과 디지털 기술을 더하는 문화관광 콘텐츠 기업입니다.</p>
            <p>가족과 함께하는 도슨트 투어부터 기업·학교·MICE 맞춤 여행까지. 현장에서 쌓은 지역의 이야기를 여행자의 눈높이로 전합니다.</p>
            <p>AI 여행 안내와 디지털 문화유산 체험으로, 경주를 발견하고 즐기는 방법도 넓혀갑니다.</p>
            <a className={styles.textLink} href="/company">경주트립 이야기 <IconArrow /></a>
          </div>
        </div>
      </section>

      <section id="landmarks" className={`${styles.container} ${styles.landmarks}`} aria-labelledby="landmarks-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>여행 전에, 경주 한 장</p><h2 id="landmarks-title">알고 가면 더 좋은 곳.</h2></div><p className={styles.sectionDescription}>걷고 싶은 장소를 먼저 만나보세요.</p></div>
        <div className={styles.landmarkGrid}>{landmarks.map(place => <a href={`/landmarks/${place.slug}`} key={place.slug} className={styles.landmark}>
          <div className={styles.landmarkPhoto}><Image src={`/images/${place.image}`} alt={place.alt} fill sizes="(max-width: 640px) 44vw, 23vw" /></div>
          <div><h3>{place.name}</h3><IconArrow /></div><p>{place.description}</p>
        </a>)}</div>
      </section>

      <section id="gallery" className={styles.gallerySection} aria-labelledby="gallery-title">
        <div className={`${styles.container} ${styles.sectionHeading}`}><div><p className={styles.eyebrow}>경주트립의 여행 기록</p><h2 id="gallery-title">함께 걸었던 낮과 밤.</h2></div><p className={styles.sectionDescription}>사진 속 순간처럼, 다음 여행도 함께.</p></div>
        <HomeGallery />
      </section>
      <SiteFooter />
    </main>
  );
}
