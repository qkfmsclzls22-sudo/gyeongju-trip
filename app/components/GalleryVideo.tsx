"use client";

import { useEffect, useRef } from "react";
import styles from "../homepage.module.css";

export function GalleryVideo({ src, poster, label, onPlay }: { src: string; poster: string; label: string; onPlay: () => void }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.5) el.pause();
    }, { threshold: 0.5 });
    observer.observe(el);
    const pauseWhenHidden = () => { if (document.hidden) el.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseWhenHidden); };
  }, []);

  return <video ref={video} className={styles.galleryVideo} controls playsInline preload="none" poster={poster} aria-label={label} onPlay={(event) => {
    const current = event.currentTarget;
    current.closest("#gallery-track")?.querySelectorAll("video").forEach(other => { if (other !== current) other.pause(); });
    onPlay();
  }}>
    <source src={src} type="video/mp4" />
    동영상 재생을 지원하는 브라우저에서 확인해 주세요.
  </video>;
}
