"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import styles from "../homepage.module.css";

export function GalleryVideo({ src, poster, label, active, playing, onSelect, onAdvance }: {
  src: string; poster: string; label: string; active: boolean; playing: boolean;
  onSelect: () => void; onAdvance: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const advance = useEffectEvent(onAdvance);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (!active) { el.pause(); el.currentTime = 0; }
  }, [active]);

  useEffect(() => {
    const el = video.current;
    if (!el || !active || !playing) { el?.pause(); return; }
    let cancelled = false;
    let fallback: number;
    const clearFallback = () => window.clearTimeout(fallback);
    // Skip gracefully when autoplay is blocked or a download stalls.
    const scheduleFallback = (delay: number) => {
      clearFallback();
      fallback = window.setTimeout(() => { if (!cancelled) advance(); }, delay);
    };
    const waiting = () => scheduleFallback(15000);
    const unavailable = () => scheduleFallback(4000);
    el.addEventListener("playing", clearFallback);
    el.addEventListener("pause", clearFallback);
    el.addEventListener("waiting", waiting);
    el.addEventListener("error", unavailable);
    el.muted = true;
    if (el.ended) el.currentTime = 0;
    scheduleFallback(15000);
    void el.play().catch(error => {
      if (!cancelled && error.name !== "AbortError") unavailable();
    });
    return () => {
      cancelled = true;
      clearFallback();
      el.removeEventListener("playing", clearFallback);
      el.removeEventListener("pause", clearFallback);
      el.removeEventListener("waiting", waiting);
      el.removeEventListener("error", unavailable);
      el.pause();
    };
  }, [active, playing]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) el.pause();
    });
    observer.observe(el);
    const pauseWhenHidden = () => { if (document.hidden) el.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseWhenHidden); };
  }, []);

  return <video ref={video} className={styles.galleryVideo} controls muted playsInline preload="none" poster={poster} aria-label={label} onEnded={() => { if (active && playing) onAdvance(); }} onPlay={(event) => {
    const current = event.currentTarget;
    current.closest("#gallery-track")?.querySelectorAll("video").forEach(other => { if (other !== current) other.pause(); });
    if (!active) onSelect();
  }}>
    <source src={src} type="video/mp4" />
    동영상 재생을 지원하는 브라우저에서 확인해 주세요.
  </video>;
}
