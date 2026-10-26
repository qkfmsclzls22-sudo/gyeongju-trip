"use client";

import Image from "next/image";
import { useState } from "react";
import { IconArrow } from "./icons";
import s from "../campaign.module.css";

const editions = {
  day: {
    label: "낮의 경주", ending: "그 너머.",
    title: "낯익은 경주에서,\n처음 만나는 이야기.",
    caption: "대릉원, 경주의 낮", image: "gyeongju-green-tombs.webp",
    alt: "초록 고분과 푸른 하늘이 이어지는 대릉원",
  },
  night: {
    label: "밤의 경주", ending: "깊은 밤.",
    title: "해가 지면,\n다른 경주가 열린다.",
    caption: "동궁과월지, 경주의 밤", image: "landmark-donggung-wolji.jpg",
    alt: "연못 위로 황금빛 반영이 펼쳐지는 동궁과월지의 밤",
  },
} as const;

export default function CampaignCover() {
  const [edition, setEdition] = useState<keyof typeof editions>("day");
  const [motion, setMotion] = useState(true);
  const current = editions[edition];

  return (
    <section id="home-content" className={s.cover} aria-labelledby="home-title" data-edition={edition} data-motion={motion}>
      <div className={s.poster}>
        <div className={s.typePanel}>
          <div className={s.titleDrift}>
            <h1 id="home-title" className={s.title} key={edition}>
              <span className={s.typeLine}><span>경주,</span></span>
              <span className={s.typeLine}><span>{current.ending}</span></span>
            </h1>
            <div className={s.rule} key={`${edition}-rule`} aria-hidden="true" />
          </div>
          <div className={s.story}>
            <p className={s.lead} aria-live="polite" aria-atomic="true">{current.title}</p>
            <a href="#tours" className={s.tourLink}>도슨트 투어 둘러보기 <IconArrow /></a>
          </div>
          <p className={s.signature}>해설사와 걷는 여행, 경주트립.</p>
        </div>
        <figure className={s.photograph}>
          {(Object.keys(editions) as (keyof typeof editions)[]).map(key => (
            <div key={key} className={s.photoLayer} data-active={edition === key} aria-hidden={edition !== key}>
              <Image src={`/images/${editions[key].image}`} alt={edition === key ? editions[key].alt : ""} fill
                sizes="(max-width: 760px) 92vw, (max-width: 1600px) 56vw, 864px"
                preload={key === "day"} loading={key === "night" ? "eager" : undefined} />
            </div>
          ))}
        </figure>
      </div>
      <div className={s.captionBar}>
        <div className={s.editionSwitch} role="group" aria-label="경주의 낮과 밤 선택">
          {(Object.keys(editions) as (keyof typeof editions)[]).map(key => (
            <button key={key} type="button" aria-pressed={edition === key} onClick={() => setEdition(key)}>
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
