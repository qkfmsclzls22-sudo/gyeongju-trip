"use client";

import { useEffect, useState, useSyncExternalStore, type FocusEvent, type PointerEvent, type RefObject } from "react";

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function subscribeToVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const pageIsVisible = () => !document.hidden;

export function useCarouselPlayback(track: RefObject<HTMLDivElement | null>) {
  const [visible, setVisible] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, prefersReducedMotion, () => true);
  const pageVisible = useSyncExternalStore(subscribeToVisibility, pageIsVisible, () => false);
  const playing = userPlaying ?? !reducedMotion;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= 0.25), { threshold: 0.25 });
    observer.observe(el);
    const release = () => setInteracting(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, [track]);

  return {
    playing,
    running: playing && visible && pageVisible && !interacting,
    toggle: () => setUserPlaying(!playing),
    play: () => setUserPlaying(true),
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (!(event.target as HTMLElement).closest("video")) setInteracting(true);
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      if (event.target.matches(":focus-visible")) setUserPlaying(false);
    },
  };
}
