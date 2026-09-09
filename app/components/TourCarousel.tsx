"use client";

import { useEffect, type ReactNode } from "react";
import { IconArrow } from "./icons";
import { useSnapCarousel } from "./useSnapCarousel";
import { useCarouselPlayback } from "./useCarouselPlayback";
import styles from "../homepage.module.css";

export function TourCarousel({ children, count }: { children: ReactNode; count: number }) {
  const { track, active, move, goTo, updateActive } = useSnapCarousel(count);
  const playback = useCarouselPlayback(track);
  useEffect(() => {
    if (!playback.running) return;
    const timer = window.setInterval(() => {
      if (window.matchMedia("(max-width: 640px)").matches) move(1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [active, playback.running, move]);
  return <div className={styles.productCarousel} onPointerDownCapture={playback.onPointerDown} onFocusCapture={playback.onFocus}>
    <div id="product-track" className={styles.productGrid} ref={track} onScroll={updateActive} role="region" aria-label="경주 여행 상품" onKeyDown={(event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    }}>{children}</div>
    <div className={styles.productControls}>
      <button type="button" className={styles.productAutoplay} aria-label={playback.playing ? "상품 자동 슬라이드 일시정지" : "상품 자동 슬라이드 재생"} aria-controls="product-track" onClick={playback.toggle}><span aria-hidden="true">{playback.playing ? "Ⅱ" : "▶"}</span> {playback.playing ? "일시정지" : "자동재생"}</button>
      <div className={styles.productDots}>{Array.from({ length: count }, (_, i) => <button key={i} type="button" aria-label={`${i + 1}번째 상품 보기`} aria-current={active === i ? "true" : undefined} aria-controls="product-track" onClick={() => goTo(i)} />)}</div>
      <div className={styles.productArrows}><button type="button" aria-label="이전 상품" aria-controls="product-track" onClick={() => move(-1)}><IconArrow className={styles.previousArrow} /></button><button type="button" aria-label="다음 상품" aria-controls="product-track" onClick={() => move(1)}><IconArrow /></button></div>
    </div>
  </div>;
}
