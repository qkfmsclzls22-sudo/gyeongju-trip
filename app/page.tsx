import Image from "next/image";
import { Outfit } from "next/font/google";
import { SiteHeader } from "./components/site";
import { IconArrow } from "./components/icons";
import { HomeGallery } from "./components/HomeGallery";
import styles from "./homepage.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "700", "800", "900"], variable: "--font-home-display", display: "swap" });
const storeUrl = "https://smartstore.naver.com/gjtrip";
const illustrations = [
  { name: "blossom", alt: "봄꽃이 핀 나무와 경주의 초록 고분을 그린 일러스트", href: "/landmarks/daereungwon" },
  { name: "autumn", alt: "초록 능선 위 가을 나무 두 그루를 그린 일러스트", href: "/landmarks/daereungwon" },
  { name: "buddha", alt: "따뜻한 주황색 배경의 석굴암 본존불 일러스트", href: "/landmarks/seokguram" },
  { name: "cheomseongdae", alt: "색동 조각으로 표현한 첨성대 일러스트", href: "/landmarks/cheomseongdae" },
  { name: "woljeonggyo", alt: "달빛 아래 월정교와 물에 비친 다리 일러스트", href: "/landmarks/woljeonggyo" },
];
const tours = [
  { id: "night", title: "신라별빛야행", label: "청사초롱 야경투어", description: "청사초롱과 함께 걷는 경주의 밤", image: "/images/product-smartstore-night.webp", alt: "경주트립 스마트스토어 신라별빛야행 대표이미지" },
  { id: "museum", title: "국립경주박물관", label: "박물관 도슨트", description: "유물에 담긴 신라의 이야기를 만나요", image: "/images/product-smartstore-museum.webp", alt: "경주트립 스마트스토어 국립경주박물관 프리미엄 도슨트 대표이미지" },
  { id: "bulguksa", title: "불국사·석굴암", label: "문화유산 해설투어", description: "천년의 공간을 더 깊이 들여다보는 시간", image: "/images/product-smartstore-bulguksa.webp", alt: "경주트립 스마트스토어 불국사 석굴암 역사투어 대표이미지" },
];

export default function Home() {
  return (
    <main className={`${styles.home} ${outfit.variable}`}>
      <a href="#home-content" className={styles.skipLink}>본문 바로가기</a>
      <div className={styles.yellow}>
        <SiteHeader variant="home" className={styles.header} />
        <section id="home-content" className={`${styles.container} ${styles.hero}`} aria-labelledby="home-title">
          <div id="landmarks" className={styles.heroHeading}>
            <h1 id="home-title">경주트립<span lang="en">Gyeongju Trip</span></h1>
            <p>경주를 더 깊게, 여행은 더 즐겁게.</p>
          </div>
          <div className={styles.illustrations}>
            {illustrations.map((art, i) => <a key={art.name} href={art.href} className={`${styles.artTile} ${styles[art.name]}`} aria-label={art.alt.replace(" 일러스트", "") + " · 자세히 보기"}>
              <Image src={`/images/illustration-${art.name}.webp`} alt={art.alt} fill sizes="(max-width: 640px) 43vw, (max-width: 1400px) 21vw, 291px" preload={i === 0} />
            </a>)}
          </div>
        </section>
      </div>
      <section id="about" className={styles.paper} aria-labelledby="about-title">
        <div className={`${styles.container} ${styles.about}`}>
          <div className={styles.aboutLeft}>
            <h2 id="about-title" className={styles.englishHeading}>About</h2>
            <div className={styles.aboutPhoto}><Image src="/images/about-cheongsachorong.webp" alt="어둠 속에서 따뜻하게 빛나는 경주트립의 청사초롱" fill sizes="(max-width: 640px) 88vw, 42vw" /></div>
          </div>
          <div className={styles.aboutCopy}>
            <p>경주트립은 경주의 이야기를 여행으로 만드는<br className={styles.desktopBreak} /> 로컬 여행 콘텐츠 기업입니다.</p>
            <p>문화유산 해설, 박물관 도슨트, 야경투어부터<br className={styles.desktopBreak} /> 프라이빗 여행과 기업·학교·MICE 프로그램까지.</p>
            <p>경주를 잘 아는 사람들과 함께<br className={styles.desktopBreak} /> 취향과 목적에 맞는 여행을 기획하고 운영합니다.</p>
            <a className={styles.textLink} href="/company">경주트립 알아보기 <IconArrow /></a>
          </div>
        </div>
      </section>
      <section id="gallery" className={`${styles.yellow} ${styles.gallerySection}`} aria-labelledby="gallery-title">
        <div className={`${styles.container} ${styles.sectionHeading}`}>
          <h2 id="gallery-title" className={styles.englishHeading}>Gallery</h2>
          <p>함께 걷는 경주의 낮과 밤</p>
        </div>
        <HomeGallery />
      </section>
      <section id="tours" className={styles.paper} aria-labelledby="tours-title">
        <div className={`${styles.container} ${styles.programs}`}>
          <div className={styles.programHeading}><h2 id="tours-title">나에게 맞는<br />경주여행</h2><a className={styles.textLink} href={storeUrl} target="_blank" rel="noopener noreferrer">전체 상품 보기 <IconArrow /></a></div>
          <div className={styles.productGrid}>
            {tours.map((tour) => <a key={tour.id} href={`/tours/${tour.id}`} className={styles.product}>
              <div className={styles.productPhoto}><Image src={tour.image} alt={tour.alt} fill sizes="(max-width: 640px) 88vw, 29vw" /></div>
              <span className={styles.productLabel}>{tour.label}</span>
              <div className={styles.productTitle}><h3>{tour.title}</h3><IconArrow /></div>
              <p>{tour.description}</p>
            </a>)}
          </div>
          <div className={styles.customTours}>
            <a href="/quote"><span>가족·친구와 함께</span><strong>우리만의 프라이빗 투어</strong><IconArrow /></a>
            <a href="/quote"><span>인원과 목적에 맞게</span><strong>기업·학교·MICE 단체투어</strong><IconArrow /></a>
          </div>
        </div>
      </section>
      <footer id="contact" className={styles.red}>
        <div className={styles.footerArt}><Image src="/images/gyeongju-footer-illustration.webp" alt="청사초롱, 초록 능선, 달빛 아래 월정교가 어우러진 경주 일러스트" fill sizes="100vw" /></div>
        <div className={`${styles.container} ${styles.contact}`}>
          <a href={storeUrl} target="_blank" rel="noopener noreferrer" className={styles.contactHeading}><h2 lang="en">Gyeongju Trip</h2><IconArrow /></a>
          <div className={styles.contactDetails}>
            <div><p>개인 예약 · 문자문의</p><a href="sms:01084028543">010-8402-8543</a></div>
            <div><a href="/quote">단체 · MICE 견적문의 ↗</a><p><a href="tel:01055527971">010-5552-7971</a><span> · </span><a href="mailto:gjtrip11@naver.com">gjtrip11@naver.com</a></p></div>
          </div>
          <div className={styles.legal}><p>경주트립 · 경상북도 경주시 계림로107 경북관광기업지원센터 6층</p><p>사업자등록번호 694-75-00685 <span>© 2026 Gyeongju Trip.</span></p></div>
        </div>
      </footer>
    </main>
  );
}
