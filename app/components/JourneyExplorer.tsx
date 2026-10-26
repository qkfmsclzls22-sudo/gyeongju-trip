"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { calcAmount, TOURS, type TourId } from "@/lib/tours";
import { COMPANIONS, TOUR_STORIES } from "@/lib/tour-editorial";
import { EMPTY_NOTE, formatTravelNote, LEGACY_NOTE_KEY, NOTE_KEY, parseTravelNote, type TravelNote } from "@/lib/travel-note";
import { IconArrow, IconCheck, IconClose } from "./icons";
import s from "../explorer.module.css";

const money = (value: number) => value.toLocaleString("ko-KR");

function Stepper({ label, value, canRemove, canAdd, onChange, disabled }: { label: string; value: number; canRemove: boolean; canAdd: boolean; onChange: (change: number) => void; disabled: boolean }) {
  return <div className={s.stepper}><span>{label}</span><div>
    <button type="button" aria-label={`${label} 인원 줄이기`} disabled={disabled || !canRemove} onClick={() => onChange(-1)}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 10h12" /></svg></button>
    <output aria-label={`${label} 인원`}>{value}</output>
    <button type="button" aria-label={`${label} 인원 늘리기`} disabled={disabled || !canAdd} onClick={() => onChange(1)}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 10h12M10 4v12" /></svg></button>
  </div></div>;
}

export default function JourneyExplorer() {
  const [selectedId, setSelectedId] = useState<TourId>("museum");
  const [note, setNote] = useState<TravelNote>(EMPTY_NOTE);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [copyFallback, setCopyFallback] = useState("");
  const [minDate, setMinDate] = useState("");
  const story = TOUR_STORIES.find(item => item.id === selectedId)!;
  const tour = TOURS[selectedId];
  const totalPeople = note.adults + note.children;
  const saved = note.saved.includes(selectedId);

  useEffect(() => {
    // Browser-local notes hydrate after the deterministic server render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()));
    try {
      const raw = localStorage.getItem(NOTE_KEY) ?? localStorage.getItem(LEGACY_NOTE_KEY);
      if (raw) { try { setNote(parseTravelNote(JSON.parse(raw))); } catch { setNote(EMPTY_NOTE); } }
    } catch { setStorageError(true); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(NOTE_KEY, JSON.stringify(note));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStorageError(false);
    } catch { setStorageError(true); }
  }, [note, ready]);

  function updateNote(change: Partial<TravelNote>) {
    setNote(previous => ({ ...previous, ...change }));
    setCopyMessage(""); setCopyFallback("");
  }
  function toggleSaved(id: TourId) {
    updateNote({ saved: note.saved.includes(id) ? note.saved.filter(item => item !== id) : [...note.saved, id] });
  }
  async function copyNote() {
    const text = formatTravelNote(note);
    try { await navigator.clipboard.writeText(text); setCopyMessage("복사했어요. 동행에게 붙여넣어 보내세요."); setCopyFallback(""); }
    catch { setCopyFallback(text); setCopyMessage("아래 여행노트를 선택해 복사해주세요."); }
  }

  return <>
    <nav className={s.chapters} aria-label="여행 빠른 탐색"><a href="#tours">투어 고르기</a><a href="#travel-note">여행노트 <span>{note.saved.length}</span></a><a href="#guide">여행 준비</a></nav>
    <section id="tours" className={s.explorer} aria-labelledby="tours-title">
      <div className={s.heading}><h2 id="tours-title">당신의 경주는<br />어떤 장면인가요?</h2><p>유물 앞에서, 숲길에서, 밤의 풍경 속에서.<br />해설사와 함께할 약 두 시간을 골라보세요.</p></div>
      <div id="discover" className={s.tourChoices} role="group" aria-label="탐색할 투어 선택">{TOUR_STORIES.map(item => <button key={item.id} type="button" aria-pressed={selectedId === item.id} aria-controls="tour-scene" onClick={() => setSelectedId(item.id)}>
        <span className={s.choiceName}>{item.shortName}<IconArrow /></span><span className={s.choiceMeta}>{item.mood}</span><span className={s.choicePrice}>성인 {money(TOURS[item.id].adultPrice)}원</span>
      </button>)}</div>

      <article id="tour-scene" className={s.scene} aria-label={story.name}>
        <div className={s.sceneVisual}><figure className={s.scenePhoto}><Image key={story.photo} src={`/images/${story.photo}`} alt={story.alt} fill sizes="(max-width: 760px) 90vw, 53vw" className={selectedId === "bulguksa" ? s.templePhoto : undefined} /><figcaption>{story.caption}</figcaption></figure>
          <div className={s.route}><h3>함께 걷는 코스</h3><ol>{story.route.map(place => <li key={place}>{place}</li>)}</ol><p>{story.routeNote} 현장 상황에 따라 동선은 달라질 수 있어요.</p></div>
        </div>
        <div className={s.sceneInfo}>
          <h3>{story.title}</h3><p className={s.description}>{story.description}</p>
          <dl className={s.facts}><div><dt>운영 시간</dt><dd>{tour.operatingHours}</dd></div><div><dt>만나는 곳</dt><dd>{tour.meetingPoint}</dd></div><div><dt>출발 안내</dt><dd>최소 {tour.minPeople}명 모집 시 출발</dd></div></dl>
          <fieldset className={s.party}><legend>우리 일행의 예상 투어 요금</legend><div className={s.steppers}>
            <Stepper label="성인" value={note.adults} disabled={!ready} canRemove={note.adults > 0 && totalPeople > 1} canAdd={totalPeople < 20} onChange={change => updateNote({ adults: note.adults + change })} />
            <Stepper label="어린이" value={note.children} disabled={!ready} canRemove={note.children > 0 && totalPeople > 1} canAdd={totalPeople < 20} onChange={change => updateNote({ children: note.children + change })} />
          </div><div className={s.estimate} aria-live="polite" aria-atomic="true"><span>총 {totalPeople}명</span><strong>{money(calcAmount(tour, note.adults, note.children))}<small>원</small></strong></div>
          <p className={s.unitPrices}>{tour.childPrice === null ? `연령 구분 없이 1인 ${money(tour.adultPrice)}원` : `성인 ${money(tour.adultPrice)}원 · 어린이 ${money(tour.childPrice)}원`}</p>
          <p className={s.hint}>어린이 기준·포함 사항은 상품에서 확인해주세요. 인원은 계산용이며 예약 화면에서 다시 선택합니다.</p></fieldset>
          <div className={s.actions}><a href={`/tours/${selectedId}`} className={s.primary}>일정·예약 확인 <IconArrow /></a><button type="button" disabled={!ready} aria-pressed={saved} aria-label={`${story.name} ${saved ? "여행노트에서 빼기" : "여행노트에 담기"}`} onClick={() => toggleSaved(selectedId)}>{saved ? <IconCheck /> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z" /></svg>}{saved ? "담김" : "담기"}</button></div>
          <div className={s.feedback} role="status">{saved && <a href="#travel-note">여행노트에 담았어요 · 노트 보기 <IconArrow /></a>}</div>
        </div>
      </article>

      <div className={s.explorerTools}><fieldset className={s.companion}><legend>동행에 맞는 안내 <span>선택</span></legend><div>{COMPANIONS.map(item => <button key={item.value} type="button" disabled={!ready} aria-pressed={note.companion === item.value} onClick={() => updateNote({ companion: note.companion === item.value ? "" : item.value })}>{item.label}</button>)}</div><p aria-live="polite">{note.companion === "family" ? story.family : note.companion === "couple" ? story.companion : note.companion === "solo" ? story.solo : note.companion === "group" ? <>학교·기업은 목적과 인원에 맞춘 별도 일정을 문의할 수 있어요. <a href="/quote">맞춤 여행 문의</a></> : "동행을 선택하면 이 투어에 필요한 안내를 보여드려요."}</p></fieldset>
        <button type="button" className={s.compareToggle} aria-expanded={showCompare} aria-controls="tour-comparison" onClick={() => setShowCompare(!showCompare)}>{showCompare ? "비교 접기" : "세 투어 요금 비교"}<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={showCompare ? "M4 10h12" : "M4 10h12M10 4v12"} /></svg></button></div>
      {showCompare && <div id="tour-comparison" className={s.comparison}><p>성인 {note.adults}명 · 어린이 {note.children}명 기준</p><ul>{TOUR_STORIES.map(item => <li key={item.id}><a href={`/tours/${item.id}`}>{item.name}<IconArrow /></a><span>{TOURS[item.id].operatingHours}</span><strong>{money(calcAmount(TOURS[item.id], note.adults, note.children))}원</strong></li>)}</ul><p>각 투어를 개별 이용할 때의 예상 요금입니다. 모두 최소 7명 모집 시 출발하며, 운영 일정과 포함 사항은 상품에서 확인해주세요.</p></div>}
    </section>

    <section id="travel-note" className={s.notebook} aria-labelledby="notebook-title"><div className={s.noteIntro}><h2 id="notebook-title">좋은 여행은,<br />함께 고르는 순간부터.</h2><p>마음에 든 투어와 날짜를 모아<br />함께 갈 사람에게 보내보세요.</p><label className={s.dateField}>여행 예정일 <span>선택</span><input type="date" min={minDate} aria-label="여행 예정일" value={note.date} disabled={!ready} onChange={event => updateNote({ date: event.target.value })} onBlur={event => updateNote({ date: event.currentTarget.value })} /></label><p className={s.hint}>{note.date ? `${note.date.replaceAll("-", ". ")} 예정으로 기록했어요. ` : "날짜는 노트에만 기록돼요. "}잔여석 조회나 예약 신청이 아닙니다.</p></div>
      <div className={s.noteSheet}><div className={s.noteTitle}><h3>나의 경주 여행노트</h3><span>{note.saved.length}개</span></div>
        {note.saved.length ? <><ul className={s.savedList}>{note.saved.map(id => { const item = TOUR_STORIES.find(entry => entry.id === id)!; const savedTour = TOURS[id]; return <li key={id}><div><a href={`/tours/${id}`}>{item.name}<IconArrow /></a><p>{item.route.join(" → ")}</p><p>{savedTour.operatingHours} · {savedTour.meetingPoint}</p><strong>예상 {money(calcAmount(savedTour, note.adults, note.children))}원</strong></div><button type="button" aria-label={`${item.name} 노트에서 삭제`} onClick={() => toggleSaved(id)}><IconClose /></button></li>; })}</ul><button type="button" className={s.copyButton} onClick={copyNote}>여행노트 복사하기 <IconArrow /></button></> : <div className={s.emptyNote}><Image src="/images/illustration-blossom.webp" alt="" width={1254} height={1254} sizes="100px" /><p>아직 정하지 않아도 괜찮아요.<br />마음에 드는 투어부터 하나씩.</p><a href="#tours">투어 담으러 가기 <IconArrow /></a></div>}
        <p className={s.hint}>{storageError ? "브라우저 저장이 제한되어 새로고침하면 노트가 사라질 수 있어요." : "담은 투어·날짜·동행·인원은 이 브라우저에 저장돼요."} 예약 확정 내역이나 하루 일정표가 아닙니다.</p><p role="status" className={s.copyStatus}>{copyMessage}</p>{copyFallback && <textarea className={s.copyFallback} aria-label="복사할 여행노트" readOnly value={copyFallback} onFocus={event => event.target.select()} />}
      </div>
    </section>
  </>;
}
