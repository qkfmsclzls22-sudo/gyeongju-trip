import Image from "next/image";
import localFont from "next/font/local";
import { IconArrow } from "./components/icons";
import CampaignCover from "./components/CampaignCover";
import { SiteFooter, SiteHeader } from "./components/site";
import { HomeGallery } from "./components/HomeGallery";
import JourneyExplorer from "./components/JourneyExplorer";
import styles from "./homepage.module.css";
import s from "./journey.module.css";
import sections from "./home-sections.module.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
  fallback: ["sans-serif"],
});

const places = [
  { slug: "daereungwon", name: "대릉원", image: "illustration-autumn.webp", line: "능선 사이를 걷는 시간" },
  { slug: "seokguram", name: "석굴암", image: "illustration-buddha.webp", line: "돌로 완성한 고요" },
  { slug: "cheomseongdae", name: "첨성대", image: "illustration-cheomseongdae.webp", line: "오래된 별의 자리" },
  { slug: "woljeonggyo", name: "월정교", image: "illustration-woljeonggyo.webp", line: "물 위에 내려앉은 빛" },
];
export default function Home() {
  return <div className={`${styles.home} ${s.home} ${pretendard.variable}`}>
    <a href="#home-content" className={styles.skipLink}>본문 바로가기</a>
    <SiteHeader variant="home" navigation="journey" />
    <main id="home-content" tabIndex={-1}>
    <CampaignCover />
    <JourneyExplorer />
    <section id="gallery" className={`${styles.gallerySection} ${sections.gallery}`} aria-labelledby="gallery-title"><div className={sections.sectionHeading}><h2 id="gallery-title">풍경은 사진으로.<br />이야기는 우리 사이에.</h2><p>유물 앞에서 멈추고, 등불을 들고 걷고.<br />경주트립의 실제 투어 현장을 만나보세요.</p></div><HomeGallery /></section>
    <section id="group" className={sections.group} aria-labelledby="group-title"><div className={sections.groupPhoto}><Image src="/images/gallery-bridge-walk.webp" alt="청사초롱을 들고 월정교 회랑을 함께 걷는 여행자들" fill sizes="(max-width:760px) 100vw, 55vw" /></div><div className={sections.groupCopy}><h2 id="group-title">여럿이 떠나는 날엔,<br />여행도 우리답게.</h2><p>학교의 배움, 기업의 만남, 우리끼리의 하루.<br />목적과 인원에 맞춰 경주 여행을 기획합니다.</p><ul><li>학교·교육 여행</li><li>기업·MICE</li><li>프라이빗 투어</li></ul><a href="/quote">우리 팀의 여행 문의 <IconArrow /></a></div></section>
    <section id="guide" className={sections.guide} aria-labelledby="guide-title"><div><h2 id="guide-title">떠나기 전,<br />궁금한 것들.</h2><p>여행을 고르는 데 필요한 안내부터.<br />상품별 자세한 조건은 예약 전에 확인해주세요.</p><a href="/account">내 예약 확인 <IconArrow /></a><a href="sms:01084028543">개인 예약 문자문의 <IconArrow /></a></div><div className={sections.questions}>
      <details><summary>혼자 또는 둘이 신청해도 되나요?<span aria-hidden="true" /></summary><p>개인 단위로 신청할 수 있어요. 정규 투어는 최소 7명이 모집되어야 출발합니다. 내 일행의 인원과 전체 모집 인원은 다르며, 출발 확정 여부는 상품 안내에서 확인해주세요.</p></details>
      <details><summary>아이와 함께라면 어떤 투어가 좋을까요?<span aria-hidden="true" /></summary><p>유물에 관심 있는 초등 고학년이라면 박물관을 살펴보세요. 초4 미만은 보호자 동반이 필요합니다. 불국사·석굴암은 야외 이동과 계단이 있고, 별빛야행은 저녁 도보 코스예요. 위 투어 선택 화면에서 ‘아이와 함께’를 누르면 상품별 안내가 나옵니다.</p></details>
      <details><summary>여행노트에 담으면 예약되나요?<span aria-hidden="true" /></summary><p>여행노트는 관심 있는 투어를 모아두는 공간이에요. 날짜와 인원을 기록해도 예약되지는 않습니다. ‘일정·예약 확인’으로 상품 페이지에 이동해 예약을 진행해주세요.</p></details>
      <details><summary>어디서 만나고, 무엇을 준비하나요?<span aria-hidden="true" /></summary><p>박물관은 국립경주박물관 정문 앞, 불국사·석굴암은 불국사 매표소 앞, 별빛야행은 동궁과월지 입구 앞에서 만나요. 낮 투어는 시작 10분 전, 별빛야행은 18:20 집결입니다. 야외 투어에는 걷기 편한 신발을 권해요.</p></details>
      <details><summary>취소·환불과 요금 기준은 어디서 보나요?<span aria-hidden="true" /></summary><p>어린이 요금 기준, 포함·불포함 사항, 취소·환불 규정은 상품별로 확인해주세요. <a href="/tours/museum">박물관 안내</a> · <a href="/tours/bulguksa">불국사·석굴암 안내</a> · <a href="/tours/night">별빛야행 안내</a></p></details>
    </div></section>
    <section id="landmarks" className={sections.places} aria-labelledby="places-title"><div className={sections.sectionHeading}><h2 id="places-title">조금 더 머물고 싶은 경주.</h2><a href="/now">지금 경주의 소식 <IconArrow /></a></div><div className={sections.placeGrid}>{places.map(place => <a key={place.slug} href={`/landmarks/${place.slug}`}><div className={sections.placeImage}><Image src={`/images/${place.image}`} alt={`${place.name} 수채화`} fill sizes="(max-width:760px) 43vw, 22vw" /></div><h3>{place.name}<IconArrow /></h3><p>{place.line}</p></a>)}</div></section>
    <section className={sections.studio} aria-labelledby="studio-title"><h2 id="studio-title">경주를 오래 바라본 사람들과,<br />새로운 경주를 만나세요.</h2><a href="/company">경주트립 이야기 <IconArrow /></a></section>
    <div className={s.illustratedHorizon}><Image src="/images/gyeongju-footer-illustration.webp" alt="" width={2172} height={724} sizes="100vw" /></div>
    </main>
    <SiteFooter />
  </div>;
}
