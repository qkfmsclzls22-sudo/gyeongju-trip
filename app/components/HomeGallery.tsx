"use client";

import Image from "next/image";
import { useEffect } from "react";
import { IconArrow } from "./icons";
import { useSnapCarousel } from "./useSnapCarousel";
import { GalleryVideo } from "./GalleryVideo";
import { useCarouselPlayback } from "./useCarouselPlayback";
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

type GalleryItem = { kind: "photo"; src: string; alt: string; label: string } | { kind: "video"; src: string; poster: string; alt: string; label: string; portrait: boolean };
const videos = [
  { after: 0, slug: "reel", label: "영상 · 경주트립의 밤", alt: "경주 야경투어의 여러 순간을 담은 영상" },
  { after: 1, slug: "museum-docent", label: "영상 · 박물관 도슨트", alt: "박물관에서 유물 이야기를 들려주는 경주트립 해설사" },
  { after: 4, slug: "bulguksa-day", label: "영상 · 불국사를 함께 걷다", alt: "불국사 돌계단 앞에서 함께하는 문화유산 해설투어" },
  { after: 7, slug: "lantern-night", label: "영상 · 청사초롱의 밤", alt: "청사초롱과 경주의 밤 풍경을 담은 영상" },
];
const galleryItems: GalleryItem[] = photos.flatMap((photo, i) => [
  { kind: "photo" as const, ...photo },
  ...videos.filter(video => video.after === i).map(video => ({ kind: "video" as const, src: `/videos/gallery-${video.slug}.mp4`, poster: `/images/gallery-video-${video.slug}.webp`, alt: video.alt, label: video.label, portrait: video.slug !== "museum-docent" })),
]);

export function HomeGallery() {
  const { track, active, move, goTo, updateActive } = useSnapCarousel(galleryItems.length);
  const playback = useCarouselPlayback(track);

  useEffect(() => {
    if (!playback.running || galleryItems[active].kind === "video") return;
    const timer = window.setTimeout(() => move(1), 4000);
    return () => window.clearTimeout(timer);
  }, [active, playback.running, move]);

  return <div className={styles.gallery} onPointerDownCapture={playback.onPointerDown} onFocusCapture={playback.onFocus}>
    <div id="gallery-track" ref={track} className={styles.galleryTrack} role="region" aria-roledescription="carousel" aria-label="경주트립 여행 사진과 영상" tabIndex={0} onScroll={updateActive} onKeyDown={(event) => {
      if ((event.target as HTMLElement).closest("video")) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      {galleryItems.map((item, i) => <figure className={`${styles.galleryCard} ${item.kind === "video" && item.portrait ? styles.videoCard : ""}`} key={item.src} role="group" aria-label={`${i + 1} / ${galleryItems.length}`}>
        <div className={styles.galleryPhoto}>{item.kind === "video"
          ? <GalleryVideo src={item.src} poster={item.poster} label={item.alt} active={active === i} playing={playback.running} onSelect={() => { goTo(i); playback.play(); }} onAdvance={() => move(1)} />
          : <Image src={`/images/${item.src}.webp`} alt={item.alt} fill sizes="(max-width: 640px) 80vw, (max-width: 1400px) 40vw, 550px" />}</div>
        <figcaption><span>{String(i + 1).padStart(2, "0")}</span>{item.label}</figcaption>
      </figure>)}
    </div>
    <div className={`${styles.container} ${styles.galleryControls}`}>
      <span className={styles.galleryHint}>경주트립과 함께한 순간들</span>
      <div>
        <button type="button" className={styles.autoplayButton} aria-label={playback.playing ? "자동 슬라이드 일시정지" : "자동 슬라이드 재생"} aria-controls="gallery-track" onClick={playback.toggle}><span aria-hidden="true">{playback.playing ? "Ⅱ" : "▶"}</span>{playback.playing ? "일시정지" : "자동재생"}</button>
        <span className={styles.galleryCount} aria-live={playback.playing ? "off" : "polite"}>{String(active + 1).padStart(2, "0")} / {galleryItems.length}</span>
        <button type="button" aria-label="이전 사진" aria-controls="gallery-track" onClick={() => move(-1)}><IconArrow className={styles.previousArrow} /></button>
        <button type="button" aria-label="다음 사진" aria-controls="gallery-track" onClick={() => move(1)}><IconArrow /></button>
      </div>
    </div>
  </div>;
}
