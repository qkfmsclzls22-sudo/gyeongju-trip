"use client";

import Image from "next/image";
import MobileRail from "./MobileRail";
import { IconArrow, IconCheck, IconClose } from "./icons";
import { useEffect, useState } from "react";
import { TOURS, type TourId } from "@/lib/tours";
import s from "../journey.module.css";

const editions = {
  day: { title: "낯익은 경주에서,\n처음 만나는 이야기.", caption: "대릉원, 경주의 낮", image: "gyeongju-green-tombs.webp", alt: "초록 고분과 푸른 하늘이 이어지는 대릉원", copy: "능선을 따라 걷고, 유물 앞에 잠깐 멈추고.\n당신의 속도로 경주를 만나세요." },
  night: { title: "해가 지면,\n다른 경주가 열린다.", caption: "동궁과월지, 경주의 밤", image: "landmark-donggung-wolji.jpg", alt: "연못 위로 황금빛 반영이 펼쳐지는 동궁과월지의 밤", copy: "손에는 청사초롱, 발걸음에는 이야기.\n경주의 밤을 함께 걸어보세요." },
};
const tours: { id: TourId; title: string; subtitle: string; image: string; setting: string; note: string; route: string[] }[] = [
  { id: "museum", title: "유물 앞의 두 시간", subtitle: "국립경주박물관 도슨트", image: "product-smartstore-museum.webp", setting: "실내 중심 · 오전 / 오후", note: "유물을 자세히 들여다보고 싶은 날. 해설과 함께 신라의 사람과 생활을 만나봅니다.", route: ["성덕대왕신종", "신라역사관", "신라미술관"] },
  { id: "bulguksa", title: "돌에 새긴 이야기", subtitle: "불국사 도슨트", image: "product-smartstore-bulguksa.webp", setting: "야외 · 계단 · 오전 / 오후", note: "산책에 이야기를 더하고 싶은 날. 불국사의 건축과 돌에 담긴 뜻을 읽어봅니다.", route: ["일주문", "청운교·백운교", "대웅전", "극락전"] },
  { id: "night", title: "청사초롱을 드는 밤", subtitle: "신라별빛야행", image: "product-smartstore-night.webp", setting: "야외 도보 · 저녁", note: "경주의 밤을 천천히 누리고 싶은 날. 청사초롱을 들고 해설사와 함께 걷습니다.", route: ["동궁과월지 집결", "월성해자", "월정교", "첨성대"] },
];
const companions = [{ value: "family", label: "아이와 함께" }, { value: "couple", label: "연인·친구와" }, { value: "solo", label: "나 혼자" }, { value: "group", label: "학교·기업 단체" }];
const interests = [{ value: "museum", label: "유물과 이야기" }, { value: "bulguksa", label: "건축과 산책" }, { value: "night", label: "야경과 사진" }];
const storageKey = "gjtrip-travel-note-v1";

export default function JourneyExplorer() {
  const [edition, setEdition] = useState<keyof typeof editions>("day");
  const [companion, setCompanion] = useState("family");
  const [interest, setInterest] = useState<TourId>("museum");
  const [date, setDate] = useState("");
  const [saved, setSaved] = useState<TourId[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [copyFallback, setCopyFallback] = useState("");
  const [minDate, setMinDate] = useState("");
  const current = editions[edition];
  const selected = tours.find(tour => tour.id === interest)!;
  const group = companion === "group";

  useEffect(() => {
    // Hydrate browser-only values after the deterministic server render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()));
    try {
      const value: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(value)) setSaved([...new Set(value.filter((id): id is TourId => ["museum", "bulguksa", "night"].includes(id)))]);
    } catch { /* A malformed or unavailable store starts with an empty notebook. */ }
    setStorageReady(true);
  }, []);

  function toggleSaved(id: TourId) {
    const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    setSaved(next);
    if (next.includes(id)) setNoteOpen(true);
    setCopyMessage("");
    setCopyFallback("");
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setStorageError(false); }
    catch { setStorageError(true); }
  }

  async function copyNote() {
    const text = ["나의 경주 여행노트", date ? `여행 예정일: ${date}` : "여행 날짜 미정", `동행: ${companions.find(item => item.value === companion)?.label}`, ...saved.map(id => `${tours.find(tour => tour.id === id)!.subtitle}\nhttps://www.gjtrip.co.kr/tours/${id}`), "※ 관심 투어 목록이며 예약 확정 내역이 아닙니다."].join("\n\n");
    try { await navigator.clipboard.writeText(text); setCopyMessage("여행노트를 복사했어요. 동행에게 붙여넣어 보내세요."); setCopyFallback(""); }
    catch { setCopyFallback(text); setCopyMessage("아래 여행노트를 선택해 복사해주세요."); }
  }

  return <>
    <section className={s.cover} id="home-content" aria-labelledby="home-title" data-edition={edition}>
      <div className={s.coverGrid}>
        <figure className={s.coverFigure}>
          <div className={s.coverPhoto}>
            <Image key={edition} src={`/images/${current.image}`} alt={current.alt} fill sizes="(max-width: 760px) 92vw, (max-width: 1440px) 56vw, 800px" preload={edition === "day"} />
          </div>
          <figcaption className={s.photoCaption} aria-live="polite">{current.caption}</figcaption>
        </figure>
        <div className={s.coverAside}>
          <h1 id="home-title">경주,<br />그 너머.</h1>
          <div className={s.coverStory} aria-live="polite">
            <p className={s.coverLead}>{current.title}</p>
            <p className={s.coverDescription}>{current.copy}</p>
          </div>
          <a className={s.coverLink} href="#tours">도슨트 투어 둘러보기 <IconArrow /></a>
          <div className={s.editionSwitch} role="group" aria-label="경주의 낮과 밤 선택"><button type="button" aria-pressed={edition === "day"} onClick={() => setEdition("day")}>낮의 경주</button><button type="button" aria-pressed={edition === "night"} onClick={() => setEdition("night")}>밤의 경주</button></div>
        </div>
      </div>
      <p className={s.coverSignature}>해설사와 걷는 여행. 직접 기획하고, 현장에서 함께합니다.</p>
      </section>
    <nav className={s.chapterBar} aria-label="여행 빠른 탐색"><a href="#tours">투어 고르기</a><a href="#discover">취향 찾기</a><a href="#travel-note">여행노트 <span>{saved.length}</span></a></nav>

    <section id="tours" className={s.collection} aria-labelledby="tours-title">
      <div className={s.collectionHeading}><div><h2 id="tours-title">경주를 만나는 세 가지 투어.</h2></div><button type="button" className={s.lineButton} aria-expanded={showCompare} aria-controls="tour-comparison" onClick={() => setShowCompare(!showCompare)}>{showCompare ? "비교 접기" : "투어 한눈에 비교"}<span className={s.disclosurePlus} data-open={showCompare} aria-hidden="true" /></button></div>
      {showCompare && <div id="tour-comparison" className={s.comparison} role="region" aria-label="투어 비교표" tabIndex={0}><table><caption>정규 투어 비교 · 성인 1인 기준</caption><thead><tr><th scope="col">투어</th><th scope="col">공간 / 시간</th><th scope="col">성인 요금</th><th scope="col">자세히</th></tr></thead><tbody>{tours.map(tour => <tr key={tour.id}><th scope="row">{tour.subtitle}</th><td>{tour.setting}<br />{TOURS[tour.id].operatingHours}</td><td>{TOURS[tour.id].adultPrice.toLocaleString("ko-KR")}원</td><td><a href={`/tours/${tour.id}`} aria-label={`${tour.subtitle} 상세 보기`}>보기</a></td></tr>)}</tbody></table><p>최소 7명 모집 시 출발합니다. 실제 운영·요금·포함 사항은 각 상품에서 확인해주세요.</p></div>}
      <MobileRail id="tour-rail" label="투어" count={3} className={s.tourGrid}>{tours.map(tour => <article key={tour.id} className={s.tourCard}>
        <a href={`/tours/${tour.id}`} className={s.tourImage}><Image src={`/images/${tour.image}`} alt={tour.subtitle} fill sizes="(max-width: 760px) 90vw, 30vw" /></a>
        <div className={s.tourMeta}><span>{tour.setting}</span><button type="button" aria-label={`${tour.subtitle} ${saved.includes(tour.id) ? "여행노트에서 빼기" : "여행노트에 담기"}`} aria-pressed={saved.includes(tour.id)} disabled={!storageReady} onClick={() => toggleSaved(tour.id)}>{saved.includes(tour.id) && <IconCheck />}{saved.includes(tour.id) ? "담김" : "담기"}</button></div><h3><a href={`/tours/${tour.id}`}>{tour.subtitle}</a></h3><p>{tour.title}</p><div className={s.tourPrice}><span>성인 1인 · 약 2시간</span><strong>{TOURS[tour.id].adultPrice.toLocaleString("ko-KR")}<small>원</small></strong></div><a className={s.tourBooking} href={`/tours/${tour.id}`}>상세·예약 확인 <IconArrow /></a>
      </article>)}</MobileRail>
    </section>

    <section id="discover" className={s.discovery} aria-labelledby="discover-title">
      <details className={s.finderDisclosure}><summary><div><h2 id="discover-title">어떤 투어가 맞을지 고민이라면?</h2><p>동행과 관심사를 골라, 어울리는 투어를 찾아보세요.</p></div><span className={s.disclosurePlus} aria-hidden="true" /></summary>
      <div className={s.finder}>
        <div className={s.finderForm}>
          <fieldset><legend>누구와 떠나나요?</legend><div className={s.choices}>{companions.map(item => <button key={item.value} type="button" aria-pressed={companion === item.value} onClick={() => { setCompanion(item.value); setCopyMessage(""); setCopyFallback(""); }}>{item.label}</button>)}</div></fieldset>
          <fieldset><legend>마음이 가는 쪽은?</legend><div className={s.choices}>{interests.map(item => <button key={item.value} type="button" aria-pressed={interest === item.value} onClick={() => setInterest(item.value as TourId)}>{item.label}</button>)}</div></fieldset>
          <label className={s.dateField}><span>언제 떠나나요? <b>선택</b></span><input type="date" aria-label="여행 예정일" min={minDate} value={date} onChange={event => { setDate(event.target.value); setCopyMessage(""); setCopyFallback(""); }} /><span className={s.fieldHint}>여행노트에 기록할 날짜예요. 날짜별 잔여석 조회는 아닙니다.</span></label>
        </div>
        <div className={s.result} aria-live="polite" aria-atomic="true">
          <div className={s.resultBody}><h3>{group ? `${selected.subtitle} 단체 기획` : selected.subtitle}</h3><p>{group ? "인원·목적·이동 일정에 맞춰 별도 코스를 기획합니다. 관심 투어를 정했다면 단체 문의로 이어가세요." : selected.note}</p>
          {companion === "family" && <p className={s.familyNote}>초4 미만은 보호자 동반이 필요해요. 아이의 관심과 집중 시간을 함께 고려해주세요.</p>}
          <div className={s.resultActions}><a href={group ? "/quote" : `/tours/${interest}`}>{group ? "맞춤 일정 문의" : "상세·예약 확인"} <IconArrow /></a><button type="button" disabled={!storageReady} onClick={() => toggleSaved(interest)} aria-pressed={saved.includes(interest)}>{saved.includes(interest) && <IconCheck />}{saved.includes(interest) ? "노트에 담김" : "노트에 담기"}</button></div></div>
        </div>
      </div>
      </details>
    </section>

    <section className={s.notebook} id="travel-note" aria-labelledby="notebook-title">
      <details className={s.noteDisclosure} open={noteOpen} onToggle={event => setNoteOpen(event.currentTarget.open)}><summary><div><h2 id="notebook-title">담아둔 여행 <span>{saved.length}</span></h2><p>{saved.length ? "관심 투어를 확인하고 동행에게 보내세요." : "투어의 ‘담기’를 누르면 여기에 모아드려요."}</p></div><span className={s.disclosurePlus} aria-hidden="true" /></summary>
      <div className={s.noteGrid}><div><div className={s.noteIllustration} aria-hidden="true"><Image src="/images/illustration-blossom.webp" alt="" width={1254} height={1254} sizes="120px" /></div><h3 className={s.noteInnerTitle}>나의 경주 여행노트</h3><p>마음이 가는 투어를 담고,<br />함께 갈 사람에게 보내보세요.</p><div className={s.noteDate}>{date ? `${date.replaceAll("-", ". ")} 예정` : "여행 날짜는 천천히 정해도 좋아요."}</div></div>
      <div className={s.noteContent}>{saved.length === 0 ? <div className={s.emptyNote}><p>아직 비어 있는 여행노트.<br />위에서 마음에 드는 투어를 담아보세요.</p><a href="#tours">투어 둘러보기</a></div> : <><ol className={s.noteList}>{saved.map((id, i) => { const tour = tours.find(item => item.id === id)!; return <li key={id}><span>{String(i + 1).padStart(2, "0")}</span><div><a href={`/tours/${id}`}>{tour.subtitle}</a><p>{tour.route.join(" → ")}</p></div><button type="button" onClick={() => toggleSaved(id)} aria-label={`${tour.subtitle} 노트에서 삭제`}><IconClose /></button></li>; })}</ol><button className={s.copyButton} type="button" onClick={copyNote}>여행노트 복사하기 <IconArrow /></button><p className={s.noteHint}>관심 투어 목록입니다. 예약 확정이나 하루 일정표가 아니며, 코스는 운영 상황에 따라 달라질 수 있어요.</p></>}
      <p className={s.noteHint}>{storageError ? "이 브라우저에서 저장이 제한되어 새로고침하면 노트가 사라질 수 있어요." : "담은 투어는 이 브라우저에 저장됩니다."}</p><p role="status" className={s.copyStatus}>{copyMessage}</p>{copyFallback && <textarea aria-label="복사할 여행노트" className={s.copyFallback} readOnly value={copyFallback} onFocus={event => event.target.select()} />}</div></div>
    </details>
    </section>
  </>;
}
