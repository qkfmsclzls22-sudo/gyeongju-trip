"use client";

import type { ReactNode } from "react";
import { IconArrow } from "./icons";
import { useSnapCarousel } from "./useSnapCarousel";
import styles from "../homepage.module.css";

export function TourCarousel({ children, count }: { children: ReactNode; count: number }) {
  const { track, active, move, goTo, updateActive } = useSnapCarousel(count);
  return <div className={styles.productCarousel}>
    <div id="product-track" className={styles.productGrid} ref={track} onScroll={updateActive} role="region" aria-label="경주 여행 상품" onKeyDown={(event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    }}>{children}</div>
    <div className={styles.productControls}>
      <span>옆으로 넘겨보세요</span>
      <div className={styles.productDots}>{Array.from({ length: count }, (_, i) => <button key={i} type="button" aria-label={`${i + 1}번째 상품 보기`} aria-current={active === i ? "true" : undefined} aria-controls="product-track" onClick={() => goTo(i)} />)}</div>
      <div className={styles.productArrows}><button type="button" aria-label="이전 상품" aria-controls="product-track" onClick={() => move(-1)}><IconArrow className={styles.previousArrow} /></button><button type="button" aria-label="다음 상품" aria-controls="product-track" onClick={() => move(1)}><IconArrow /></button></div>
    </div>
  </div>;
}
