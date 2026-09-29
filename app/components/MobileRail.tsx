"use client";

import type { ReactNode } from "react";
import { useSnapCarousel } from "./useSnapCarousel";
import s from "../journey.module.css";

export default function MobileRail({ id, label, count, className, children }: { id: string; label: string; count: number; className: string; children: ReactNode }) {
  const { track, active, move, goTo, updateActive } = useSnapCarousel(count);
  return <div className={s.railWrap}>
    <div id={id} ref={track} className={`${className} ${s.mobileRail}`} role="region" aria-label={`${label} 목록, 모바일에서 옆으로 넘겨보세요`} tabIndex={0} onScroll={updateActive} onKeyDown={event => {
      if (event.target !== event.currentTarget || !window.matchMedia("(max-width: 760px)").matches) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>{children}</div>
    <div className={s.railControls}>
      <span>옆으로 넘겨보세요</span>
      <div className={s.railDots}>{Array.from({ length: count }, (_, i) => <button key={i} type="button" aria-label={`${label} ${i + 1}번째 보기`} aria-current={active === i ? "true" : undefined} aria-controls={id} onClick={() => goTo(i)}><span /></button>)}</div>
      <div className={s.railArrows}><button type="button" aria-label={`이전 ${label}`} aria-controls={id} onClick={() => move(-1)}>←</button><span aria-live="polite">{active + 1}/{count}</span><button type="button" aria-label={`다음 ${label}`} aria-controls={id} onClick={() => move(1)}>→</button></div>
    </div>
  </div>;
}
