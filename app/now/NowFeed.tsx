"use client";

import { useEffect, useState } from "react";
import { categories, isVisible, koreaDate, matchesDates, safeUrl, shortDate, weekend, type NewsData } from "../../lib/now";
import styles from "./now.module.css";

export default function NowFeed({ data, initialToday }: { data: NewsData; initialToday: string }) {
  const [today, setToday] = useState(initialToday);
  const [category, setCategory] = useState("전체");
  const [when, setWhen] = useState("all");
  const [date, setDate] = useState(initialToday);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const timer = window.setInterval(() => setToday(koreaDate()), 60000);
    return () => window.clearInterval(timer);
  }, []);
  const visible = data.items.filter(item => isVisible(item, today) && safeUrl(item.sourceUrl));
  const range = when === "weekend" ? weekend(today) : when === "date" ? [date, date] : [today, today];
  const searched = visible.filter(item => {
    const source = data.sources.find(source => source.id === item.sourceId);
    return (when === "all" || matchesDates(item, range[0], range[1])) &&
      `${item.title} ${item.summary} ${item.location} ${source?.name ?? ""}`.toLocaleLowerCase("ko").includes(query.trim().toLocaleLowerCase("ko"));
  });
  const items = searched.filter(item => category === "전체" || item.category === category).sort((a, b) => {
    const next = (item: typeof a) => item.dateKind === "occurrences" ? item.occurrenceDates.filter(d => d >= today).sort()[0] ?? "9999" : item.dateKind === "continuous" ? (item.startDate! < today ? today : item.startDate!) : "9999";
    return next(a).localeCompare(next(b)) || a.title.localeCompare(b.title, "ko");
  });
  const stale = new Date(`${today}T00:00:00+09:00`).getTime() - new Date(data.updatedAt).getTime() > 48 * 3600000;
  const reset = () => { setCategory("전체"); setWhen("all"); setQuery(""); setDate(today); };
  return <>
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>GYEONGJU, RIGHT NOW <span>{today.replaceAll("-", ".")}</span></div>
        <h1>지금 <em>경주</em><span className={styles.dot}>.</span></h1>
        <div className={styles.heroBottom}><p>오늘의 소식이, 다음 여행이 되도록.<br />경주의 축제부터 로컬 이야기까지 한눈에 만나보세요.</p><a href="#news-list">경주 소식 살펴보기 ↓</a></div>
      </div>
    </section>
    <div className={styles.wrap}>
      <div className={styles.update}><span><i aria-hidden="true" />최근 정보 확인 {data.updatedAt.slice(0, 10).replaceAll("-", ".")}</span><a href="#news-sources">출처·확인 현황 ↗</a></div>
      {stale && <p className={styles.notice}>새로운 정보 확인이 지연되고 있습니다. 방문 전 공식 안내에서 최신 일정과 운영 여부를 확인해 주세요.</p>}
      <section id="news-list" className={styles.feed} aria-label="경주 소식 검색">
        <div className={styles.heading}><h2>어떤 경주를 만나볼까요?</h2><p>일정은 한국 시간 기준입니다.</p></div>
        <div className={styles.categories} aria-label="소식 카테고리">
          {["전체", ...categories].map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}<span>{searched.filter(item => value === "전체" || item.category === value).length}</span></button>)}
        </div>
        <div className={styles.filters}>
          <div className={styles.dates} aria-label="여행 날짜 필터">{[["all", "전체 일정"], ["today", "오늘"], ["weekend", "이번 주말"], ["date", "날짜 선택"]].map(([value, label]) => <button type="button" key={value} aria-pressed={when === value} onClick={() => setWhen(value)}>{label}</button>)}
            {when === "date" && <input aria-label="여행 날짜" type="date" min={today} value={date} onChange={event => setDate(event.target.value || today)} />}
          </div>
          <label className={styles.search}><span>검색</span><input type="search" placeholder="행사명, 장소, 출처 검색" value={query} onChange={event => setQuery(event.target.value)} /></label>
        </div>
        <div className={styles.results} aria-live="polite"><p><strong>{items.length}</strong>개의 소식 {when !== "all" && <span>· {shortDate(range[0])}{range[0] !== range[1] ? `–${shortDate(range[1])}` : ""} 일정</span>}</p><button type="button" onClick={reset}>필터 초기화 ↻</button></div>
        <div className={styles.grid}>
          {items.map(item => {
            const source = data.sources.find(source => source.id === item.sourceId);
            const scheduled = item.dateKind === "continuous" || item.dateKind === "occurrences";
            return <article className={styles.card} key={item.id}>
              <div className={styles.cardTop}><span className={styles.tag} data-category={item.category}>{item.category}</span><span>{scheduled && matchesDates(item, today, today) ? "오늘 일정" : scheduled ? "예정" : "여행 참고"}</span></div>
              <p className={styles.eventDate}>{item.dateKind === "occurrences" ? item.occurrenceDates.filter(d => d >= today).map(shortDate).join(" · ") : scheduled && item.startDate ? `${shortDate(item.startDate)}${item.endDate !== item.startDate ? ` — ${shortDate(item.endDate!)}` : ""}` : item.dateKind === "season" ? "시즌 프로그램" : "여행 가이드"}</p>
              <h3>{item.title}</h3><p className={styles.summary}>{item.summary}</p>
              <dl><div><dt>장소</dt><dd>{item.location}</dd></div><div><dt>일정</dt><dd>{item.schedule}</dd></div>{item.price && <div><dt>요금</dt><dd>{item.price}</dd></div>}</dl>
              <div className={styles.cardFooter}><p>{source?.name ?? "출처"}<br /><span>{item.checkedAt.slice(0, 10).replaceAll("-", ".")} 확인</span></p><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{source?.kind === "social" ? "원문 보기" : "공식 안내"}<span aria-hidden="true"> ↗</span><span className={styles.srOnly}> — {item.title} (새 창)</span></a></div>
            </article>;
          })}
        </div>
        {items.length === 0 && <div className={styles.empty}><h3>조건에 맞는 소식이 아직 없어요.</h3><p>날짜나 카테고리를 바꾸면 다른 경주 소식을 볼 수 있습니다.</p><button type="button" onClick={reset}>전체 소식 보기 ↗</button></div>}
        <p className={styles.help}>시즌 프로그램과 상시 여행정보는 ‘전체 일정’에서 볼 수 있습니다. 날짜 필터에는 해당 날짜가 확인된 일정만 표시합니다.</p>
      </section>
      <aside className={styles.booking}><span aria-hidden="true">↗</span><div><h2>발견은 여기서, 예약은 공식 홈페이지에서.</h2><p>경주트립은 소식과 연결 링크를 제공합니다. 예약·결제·취소는 해당 운영기관에서 진행하며, 방문 전 일정과 잔여석을 확인해 주세요.</p></div></aside>
      <section id="news-sources" className={styles.sources}>
        <div className={styles.heading}><h2>경주의 이야기가 모이는 곳</h2><p>공식 기관 & 로컬 채널</p></div>
        <p>공식 공지와 공개 게시물을 확인해 필요한 내용을 정리합니다. 소셜 채널은 공개·검색 가능한 게시물에 한해 확인하며, 모든 게시물의 수집을 보장하지 않습니다.</p>
        <details><summary>출처와 확인 현황 보기 <span>{data.sources.length}개 채널</span></summary><div className={styles.sourceGrid}>{data.sources.map(source => <div key={source.id}>
          <h3>{source.url && safeUrl(source.url) ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name} ↗<span className={styles.srOnly}> (새 창)</span></a> : source.name}</h3>
          <p>{source.status === "checked" ? "공지 확인" : source.status === "partial" ? "일부 공개정보 확인" : source.status === "pending_identity" ? "계정 주소 확인 필요" : "원문 확인 제한"}{source.lastAttemptAt ? ` · ${source.lastAttemptAt.slice(0, 10).replaceAll("-", ".")}` : ""}</p><small>{source.note}</small>
        </div>)}</div></details>
      </section>
    </div>
  </>;
}
