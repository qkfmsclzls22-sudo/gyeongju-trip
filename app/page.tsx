import Image from "next/image";
import { SiteHeader } from "./components/site";
import { IconArrow } from "./components/icons";
import { TOURS } from "@/lib/tours";
import styles from "./homepage.module.css";

const storeUrl = "https://smartstore.naver.com/gjtrip";
const tours = [
  { ...TOURS.museum, title: "국립경주박물관", label: "박물관 도슨트", description: "유물 속 신라를 만나는 2시간", image: "/images/tour-museum-field.webp", alt: "국립경주박물관에서 해설사와 함께 전시를 관람하는 경주트립 참가자들", position: styles.bottomMiddle },
  { ...TOURS.night, title: "신라별빛야행", label: "청사초롱 야경투어", description: "청사초롱과 함께 걷는 경주의 밤", image: "/images/tour-night-field.webp", alt: "청사초롱을 들고 첨성대 앞에 모인 경주트립 야경투어 참가자들", position: styles.bottomRight },
  { ...TOURS.bulguksa, title: "세계유산 불국사", label: "문화유산 해설투어", description: "돌에 담긴 신라의 이야기를 듣다", image: "/images/tour-bulguksa-field.webp", alt: "불국사 청운교와 백운교 앞에서 해설을 듣는 경주트립 참가자들", position: styles.topRight },
];

function Scenery({ src, alt, href, className, preload = false }: { src: string; alt: string; href: string; className: string; preload?: boolean }) {
  return <a className={`${styles.photoTile} ${className}`} href={href} aria-label={`${alt} 자세히 보기`}>
    <Image src={src} alt={alt} fill sizes="(max-width: 640px) 45vw, (max-width: 1366px) 28vw, 382px" preload={preload} />
  </a>;
}

export default function Home() {
  return (
    <main className={styles.home}>
      <a href="#home-content" className={styles.skipLink}>본문 바로가기</a>
      <SiteHeader className={styles.header} />
      <section id="home-content" className={styles.yellow} aria-labelledby="home-title">
        <div id="landmarks" className={`${styles.stage} ${styles.mosaicStage}`}>
          <div className={styles.mosaicHeading}>
            <h1 id="home-title">경주트립<br />이야기 따라,<br />경주를 걷다.</h1>
            <a className={styles.textLink} href="#tours">투어 둘러보기 <IconArrow /></a>
          </div>
          <Scenery className={styles.topRight} src="/images/gyeongju-green-tombs.webp" alt="푸른 하늘 아래 초록빛 신라 고분군" href="/landmarks/daereungwon" preload />
          <Scenery className={styles.bottomMiddle} src="/images/gyeongju-donggung-night.webp" alt="연못 위로 빛이 비치는 동궁과월지의 밤" href="/landmarks/donggung-wolji" />
          <Scenery className={styles.bottomRight} src="/images/gyeongju-bulguksa-sky.webp" alt="불국사 처마 사이로 보이는 석가탑과 푸른 하늘" href="/landmarks/bulguksa" />
        </div>
      </section>
      <section id="about" className={styles.paper} aria-labelledby="about-title">
        <div className={`${styles.stage} ${styles.aboutStage}`}>
          <h2 id="about-title" className={styles.aboutHeading}>아는 만큼, 더 특별한 경주</h2>
          <a href="/company" className={styles.aboutPhoto} aria-label="경주트립 소개 보기">
            <Image src="/images/gyeongju-tree-shadow.webp" alt="신라 고분의 능선 위에 길게 드리운 나무 그림자" fill sizes="(max-width: 640px) 72vw, (max-width: 1366px) 35vw, 474px" />
          </a>
          <div className={styles.aboutCopy}>
            <p>불국사의 돌계단, 박물관의 작은 유물,<br />청사초롱이 밝히는 밤길.</p>
            <p>경주트립은 경주의 장소에 담긴 이야기를<br className={styles.desktopBreak} /> 쉽고 재미있는 해설로 전합니다.</p>
            <p>가족 여행부터 친구와의 나들이,<br />기업·학교·기관의 단체 여행까지.<br />함께하는 사람과 여행의 목적에 맞춰<br className={styles.desktopBreak} /> 경주에서의 시간을 기획합니다.</p>
            <a className={styles.textLink} href="/company">경주트립 알아보기 <IconArrow /></a>
          </div>
        </div>
      </section>
      <section className={styles.paper} aria-labelledby="night-title">
        <div className={`${styles.stage} ${styles.showcaseStage}`}>
          <div className={styles.showcasePhoto}>
            <Image src="/images/gyeongju-donggung-night.webp" alt="동궁과월지의 누각과 물 위에 반영된 야경" fill sizes="(max-width: 1366px) 95vw, 1297px" />
          </div>
          <a className={styles.showcaseLabel} href="/tours/night"><h2 id="night-title">신라별빛야행</h2></a>
        </div>
      </section>
      <section id="tours" className={styles.yellow} aria-labelledby="tours-title">
        <div className={`${styles.stage} ${styles.mosaicStage} ${styles.tourStage}`}>
          <div className={styles.mosaicHeading}>
            <h2 id="tours-title">함께 걷는<br />경주의 낮과 밤</h2>
            <p className={styles.tourIntro}>당신의 여행에 맞는<br />경주트립을 만나보세요.</p>
          </div>
          {tours.map((tour) => <a key={tour.id} href={`/tours/${tour.id}`} className={`${styles.tourTile} ${tour.position}`}>
            <div className={styles.tourPhoto}><Image src={tour.image} alt={tour.alt} fill sizes="(max-width: 640px) 45vw, (max-width: 1366px) 28vw, 382px" /></div>
            <div className={styles.tourCaption}><div><span>{tour.label}</span><h3>{tour.title}</h3></div><span className={styles.tourPrice}>{tour.adultPrice.toLocaleString("ko-KR")}원</span></div>
          </a>)}
        </div>
      </section>
      <section className={styles.paper} aria-labelledby="programs-title">
        <div className={`${styles.stage} ${styles.programStage}`}>
          <div className={styles.programHeading}><h2 id="programs-title">나에게 맞는<br />경주 여행</h2><a className={styles.textLink} href={storeUrl} target="_blank" rel="noopener noreferrer">네이버 예약 · 후기 보기 <IconArrow /></a></div>
          <ol className={styles.programList}>
            {tours.map((tour, i) => <li key={tour.id}><a href={`/tours/${tour.id}`}><span className={styles.programNumber}>0{i + 1}</span><div><h3>{tour.title}</h3><p>{tour.description}</p></div><IconArrow /></a></li>)}
            <li><a href="/quote"><span className={styles.programNumber}>04</span><div><h3>우리만의 프라이빗 투어</h3><p>가족·친구와 함께하는 단독 여행</p></div><IconArrow /></a></li>
            <li><a href="/quote"><span className={styles.programNumber}>05</span><div><h3>기업·학교·MICE 단체투어</h3><p>인원과 목적에 맞춘 경주 여행</p></div><IconArrow /></a></li>
          </ol>
        </div>
      </section>
      <footer id="contact" className={styles.red}>
        <div className={`${styles.stage} ${styles.contactStage}`}>
          <div className={styles.contactPhoto}><Image src="/images/gyeongju-golden-tombs.webp" alt="맑은 하늘 아래 황금빛으로 물든 경주의 고분군" fill sizes="(max-width: 1366px) 100vw, 1366px" /></div>
          <a className={styles.contactHeading} href={storeUrl} target="_blank" rel="noopener noreferrer"><h2>경주 여행, 함께해요</h2><IconArrow /></a>
          <div className={styles.personalContact}><p>개인 예약 · 문자문의</p><a href="sms:01084028543">010-8402-8543</a></div>
          <div className={styles.groupContact}><a href="/quote">단체 · MICE 견적문의 ↗</a><p><a href="tel:01055527971">010-5552-7971</a><span> · </span><a href="mailto:gjtrip11@naver.com">gjtrip11@naver.com</a></p></div>
        </div>
        <div className={styles.legal}><p>경주트립 · 경상북도 경주시 계림로107 경북관광기업지원센터 6층 · 사업자등록번호 694-75-00685</p><p>풍경사진 제공 · 황병길 <span>© 2026 경주트립. All rights reserved.</span></p></div>
      </footer>
    </main>
  );
}
