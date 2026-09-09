"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { IconArrow } from "./icons";
import styles from "../homepage.module.css";

const photos = [
  { src: "tour-night-field", alt: "청사초롱을 들고 첨성대 앞에서 함께한 여행자들", label: "청사초롱과 함께하는 밤" },
  { src: "gallery-museum-story", alt: "국립경주박물관 유물 앞에서 해설을 듣는 여행자들", label: "유물 속 이야기를 만나는 시간" },
  { src: "gallery-bridge-walk", alt: "청사초롱을 들고 월정교의 회랑을 걷는 여행자들", label: "월정교를 걷다" },
  { src: "gallery-bulguksa-autumn", alt: "가을 단풍에 둘러싸인 불국사의 돌계단", label: "불국사의 계절" },
  { src: "tour-bulguksa-field", alt: "불국사 청운교와 백운교 앞에서 문화유산 해설을 듣는 모습", label: "천년의 공간, 새로운 발견" },
  { src: "gallery-lantern-guide", alt: "소나무 아래 청사초롱을 들고 경주의 이야기를 듣는 밤", label: "이야기로 밝히는 경주의 밤" },
  { src: "tour-museum-field", alt: "해설사와 함께 박물관 전시 모형을 살펴보는 여행자들", label: "함께 들여다보는 신라" },
  { src: "gallery-bridge-night", alt: "푸른 밤하늘 아래 불을 밝힌 월정교", label: "월정교의 밤" },
  { src: "gallery-museum-space", alt: "따뜻한 조명 아래 신라 유물이 전시된 박물관 내부", label: "박물관에서 머무는 시간" },
  { src: "gallery-night-story", alt: "경주의 밤길에서 함께 해설을 듣는 여행자들", label: "함께여서 더 즐거운 여행" },
];

export function HomeGallery() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement;
    const second = el.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    const left = direction > 0 && atEnd ? 0 : direction < 0 && el.scrollLeft < 4 ? el.scrollWidth : el.scrollLeft + direction * step;
    el.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function updateActive() {
    const el = track.current;
    if (!el) return;
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
      setActive(photos.length - 1);
      return;
    }
    const cards = Array.from(el.children) as HTMLElement[];
    const firstLeft = cards[0].offsetLeft;
    const next = cards.reduce((best, card, i) => Math.abs(card.offsetLeft - firstLeft - el.scrollLeft) < Math.abs(cards[best].offsetLeft - firstLeft - el.scrollLeft) ? i : best, 0);
    setActive(next);
  }
  return <div className={styles.gallery}>
    <div id="gallery-track" ref={track} className={styles.galleryTrack} role="region" aria-roledescription="carousel" aria-label="경주트립 여행 사진" tabIndex={0} onScroll={updateActive} onKeyDown={(event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      {photos.map((photo, i) => <figure className={styles.galleryCard} key={photo.src} role="group" aria-label={`${i + 1} / ${photos.length}`}>
        <div className={styles.galleryPhoto}><Image src={`/images/${photo.src}.webp`} alt={photo.alt} fill sizes="(max-width: 640px) 80vw, (max-width: 1400px) 40vw, 550px" /></div>
        <figcaption><span>{String(i + 1).padStart(2, "0")}</span>{photo.label}</figcaption>
      </figure>)}
    </div>
    <div className={`${styles.container} ${styles.galleryControls}`}>
      <span className={styles.galleryHint}>경주트립과 함께한 순간들</span>
      <div><span className={styles.galleryCount} aria-live="polite">{String(active + 1).padStart(2, "0")} / {photos.length}</span><button type="button" aria-label="이전 사진" aria-controls="gallery-track" onClick={() => move(-1)}><IconArrow className={styles.previousArrow} /></button><button type="button" aria-label="다음 사진" aria-controls="gallery-track" onClick={() => move(1)}><IconArrow /></button></div>
    </div>
  </div>;
}
