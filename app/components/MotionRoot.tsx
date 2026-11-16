"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 페이지 전체의 스크롤 모션을 한곳에서 처리합니다.
 * - [data-reveal]   : 화면에 들어올 때 떠오르는 등장
 * - [data-count]    : 숫자 카운트업 (data-decimals, data-suffix)
 * - [data-words]    : 스크롤에 따라 단어가 차례로 밝아지는 문장
 * - [data-parallax] : 스크롤 패럴랙스 (값 = 강도)
 * - video[data-autoplay] : 화면에 보일 때만 재생
 * 서버 렌더 결과는 그대로 읽히고, JS가 붙은 뒤에만 숨김 처리를 합니다.
 */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const vh = () => window.innerHeight;

    // 등장
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!reduce && reveals.length) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.remove("gt-pre");
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      for (const el of reveals) {
        if (el.getBoundingClientRect().top > vh() * 0.92) {
          el.classList.add("gt-pre");
          io.observe(el);
        }
      }
      cleanups.push(() => {
        io.disconnect();
        reveals.forEach((el) => el.classList.remove("gt-pre"));
      });
    }

    // 카운트업
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    if (!reduce && counters.length) {
      const format = (el: HTMLElement, v: number) => {
        const decimals = Number(el.dataset.decimals ?? 0);
        const text = v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        el.textContent = text + (el.dataset.suffix ?? "");
      };
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            io.unobserve(el);
            const target = Number(el.dataset.count);
            const start = performance.now();
            const dur = 1400;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 4);
              format(el, target * eased);
              if (t < 1) requestAnimationFrame(tick);
              else format(el, target);
            };
            requestAnimationFrame(tick);
          }
        },
        { threshold: 0.4 },
      );
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // 화면에 보일 때만 영상 재생
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]"));
    if (videos.length) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const v = e.target as HTMLVideoElement;
            if (e.isIntersecting && !reduce) {
              v.muted = true;
              v.play().catch(() => {});
            } else {
              v.pause();
            }
          }
        },
        { threshold: 0.15 },
      );
      videos.forEach((v) => io.observe(v));
      cleanups.push(() => io.disconnect());
    }

    // 스크롤 연동: 단어 밝히기 + 패럴랙스
    const wordBlocks = Array.from(document.querySelectorAll<HTMLElement>("[data-words]"));
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!reduce && (wordBlocks.length || parallax.length)) {
      wordBlocks.forEach((b) => b.classList.add("js"));
      let raf = 0;
      const update = () => {
        raf = 0;
        const h = vh();
        for (const block of wordBlocks) {
          const r = block.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (h * 0.88 - r.top) / (h * 0.55 + r.height * 0.6)));
          const words = block.querySelectorAll<HTMLElement>(".w");
          const upto = Math.round(p * words.length);
          words.forEach((w, i) => w.classList.toggle("on", i < upto));
        }
        for (const el of parallax) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > h + 200) continue;
          const offset = (r.top + r.height / 2 - h / 2) * Number(el.dataset.parallax || 0.1);
          el.style.setProperty("--py", `${offset.toFixed(1)}px`);
        }
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (raf) cancelAnimationFrame(raf);
        wordBlocks.forEach((b) => b.classList.remove("js"));
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
