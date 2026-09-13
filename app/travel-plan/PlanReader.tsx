"use client";
import { useEffect, useState } from "react";
import type { Plan } from "@/lib/itinerary";
import Link from "next/link";
import { decodePlanSnapshot } from "@/lib/plan-snapshot";
import styles from "./plan.module.css";

function LinkedText({ text }: { text: string }) {
  return <>{text.split(/(https:\/\/[^\s<>]+)/g).map((part, i) => {
    if (!part.startsWith("https://")) return part;
    try { const url = new URL(part); if (!url.username && !url.password) return <a key={i} href={url.href} target="_blank" rel="noopener noreferrer">관련 안내 보기</a>; } catch {}
    return part;
  })}</>;
}
export default function PlanReader() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => { let active = true; decodePlanSnapshot(window.location.hash.slice(1)).then(p => { if (active) setPlan(p); }).catch(() => { if (active) setError(true); }); return () => { active = false; }; }, []);
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: "나의 경주 여행 일정", url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setNotice("링크를 복사했어요. 함께 여행할 분에게 보내주세요."); }
    } catch (e) { if (!(e instanceof Error && e.name === "AbortError")) setNotice("주소창의 링크를 복사해 공유해주세요."); }
  }
  return <main className={styles.reader}>
    <header className={styles.header}><Link href="/">GYEONGJU TRIP</Link><span>AI경트 여행 일정</span></header>
    {error ? <section><h1>일정 링크를 열지 못했어요</h1><p>링크가 잘렸거나 이 브라우저에서 열 수 없습니다. 전체 링크를 복사해 Safari 또는 Chrome에서 열어주세요.</p><Link href="/">AI경트로 돌아가기</Link></section> : !plan ? <p role="status">일정을 불러오고 있어요…</p> : <>
      <div className={styles.title}><div><p>나의 경주 여행</p><h1>{plan.days.length === 1 ? "당일 여행 일정" : `${plan.days.length}일 여행 일정`}</h1></div><div className={styles.actions}><button onClick={share}>링크 공유</button><button onClick={() => window.print()}>인쇄 · PDF 저장</button></div></div>
      <p role="status" className={styles.notice}>{notice}</p>
      <nav className={styles.tabs} aria-label="일차 이동">{plan.days.map(d => <button key={d.day} onClick={() => document.getElementById(`day-${d.day}`)?.scrollIntoView({ behavior: "smooth" })}>{d.day}일차</button>)}</nav>
      {plan.days.map(day => <section id={`day-${day.day}`} key={day.day} className={styles.day}><h2>{day.day}일차</h2><ol>{day.stops.map((stop, i) => <li key={i}>
        <div className={styles.time}><strong>{stop.start}</strong>{stop.end !== stop.start && <span>– {stop.end}</span>}</div>
        <div><h3>{stop.place}</h3>{stop.text !== stop.place && <p>{stop.text}</p>}</div>
      </li>)}</ol></section>)}
      <p className={styles.caption}>이동·주차 여유를 포함한 계획안입니다. 방문일의 운영시간과 교통 상황에 따라 달라질 수 있습니다.</p>
      {plan.assumptions && <section className={styles.details}><h2>일정을 잡은 기준</h2><p>{plan.assumptions}</p></section>}
      {plan.reasons && <section className={styles.details}><h2>이렇게 짠 이유</h2><p>{plan.reasons}</p></section>}
      {!!plan.tips.length && <section className={styles.details}><h2>출발 전에 기억할 팁</h2>{plan.tips.map((tip, i) => <p key={i}><LinkedText text={tip} /></p>)}</section>}
      <footer className={styles.footer}>이 링크는 생성 당시의 일정입니다. 수정된 일정은 새 링크로 공유해주세요. 링크를 받은 사람은 내용을 볼 수 있습니다.</footer>
    </>}
  </main>;
}
