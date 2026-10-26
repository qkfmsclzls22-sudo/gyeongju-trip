"use client";

import Image from "next/image";
import { useState } from "react";
import { IconArrow } from "./icons";
import s from "../campaign.module.css";

const editions = {
  day: {
    label: "낮의 경주", ending: "그 너머.",
    title: "낯익은 경주에서,\n처음 만나는 이야기.",
    caption: "가을빛 대릉원 · 경주트립 수채화", image: "campaign-autumn-wide.webp",
    alt: "넓고 푸른 하늘 아래 세이지빛 능선과 황금빛 가을나무가 펼쳐진 대릉원 수채화",
  },
  night: {
    label: "밤의 경주", ending: "깊은 밤.",
    title: "해가 지면,\n다른 경주가 열린다.",
    caption: "달빛 아래 월정교 · 경주트립 수채화", image: "campaign-woljeonggyo-wide.webp",
    alt: "남색 밤하늘과 은은한 달빛 아래 월정교 전체와 물 위의 반영을 담은 수채화",
  },
} as const;

export default function CampaignCover() {
  const [edition, setEdition] = useState<keyof typeof editions>("day");
  const [motion, setMotion] = useState(true);
  const [nightVisited, setNightVisited] = useState(false);
  const current = editions[edition];

  return (
    <section className={s.cover} aria-labelledby="home-title" data-edition={edition} data-motion={motion}>
      <div className={s.introduction}>
            <h1 id="home-title" className={s.title} key={edition}>
              <span className={s.typeLine}><span>경주,</span></span>
              <span className={s.typeLine}><span>{current.ending}</span></span>
            </h1>
          <div className={s.story}>
            <p className={s.lead} aria-live="polite" aria-atomic="true">{current.title}</p>
            <a href="#tours" className={s.tourLink}>해설사와 떠나는 경주 <IconArrow /></a>
          </div>
      </div>
      <figure className={s.panorama}>
          {(Object.keys(editions) as (keyof typeof editions)[]).filter(key => key === "day" || nightVisited).map(key => (
            <div key={key} className={s.artLayer} data-active={edition === key} aria-hidden={edition !== key}>
              <Image src={`/images/${editions[key].image}`} alt={edition === key ? editions[key].alt : ""} fill
                sizes="100vw" loading="eager" fetchPriority={key === "day" ? "high" : "low"} />
            </div>
          ))}
      </figure>
      <div className={s.captionBar}>
        <div className={s.editionSwitch} role="group" aria-label="경주의 낮과 밤 선택">
          {(Object.keys(editions) as (keyof typeof editions)[]).map(key => (
            <button key={key} type="button" aria-pressed={edition === key} onClick={() => { if (key === "night") setNightVisited(true); setEdition(key); }}>
              <span className={s.editionDot} aria-hidden="true" />{editions[key].label}
            </button>
          ))}
        </div>
        <p className={s.caption} aria-live="polite">{current.caption}</p>
        <button type="button" className={s.motionButton} aria-pressed={!motion} onClick={() => setMotion(value => !value)}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {motion ? <path d="M7 5v10M13 5v10" /> : <path d="m7 4 8 6-8 6Z" />}
          </svg>
          {motion ? "모션 끄기" : "모션 켜기"}
        </button>
        <span className={s.reducedMotionNote}>기기 설정에 따라 모션 줄임</span>
      </div>
    </section>
  );
}
