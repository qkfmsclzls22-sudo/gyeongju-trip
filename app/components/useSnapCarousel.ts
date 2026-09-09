"use client";

import { useCallback, useRef, useState } from "react";

export function useSnapCarousel(count: number) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const move = useCallback((direction: number) => {
    const el = track.current;
    if (!el || el.children.length < 2) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const origin = cards[0].offsetLeft;
    const max = el.scrollWidth - el.clientWidth;
    const positions = [...new Set(cards.map(card => Math.min(card.offsetLeft - origin, max)))];
    const left = direction > 0
      ? positions.find(position => position > el.scrollLeft + 4) ?? 0
      : positions.findLast(position => position < el.scrollLeft - 4) ?? max;
    el.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, []);

  const goTo = useCallback((index: number) => {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement;
    const card = el.children[index] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, []);

  const updateActive = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 4) { setActive(0); return; }
    if (el.scrollLeft >= max - 4) { setActive(count - 1); return; }
    const cards = Array.from(el.children) as HTMLElement[];
    const origin = cards[0].offsetLeft;
    const next = cards.reduce((best, card, i) => Math.abs(card.offsetLeft - origin - el.scrollLeft) < Math.abs(cards[best].offsetLeft - origin - el.scrollLeft) ? i : best, 0);
    setActive(next);
  }, [count]);

  return { track, active, move, goTo, updateActive };
}
