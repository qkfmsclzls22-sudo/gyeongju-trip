"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface Album {
  id: "museum" | "bulguksa" | "night";
  name: string;
  slides: { src: string; alt: string }[];
}

/** 투어별 현장 사진 (투어마다 3장, 옆으로 넘겨 본다) */
const albums: Album[] = [
  {
    id: "museum",
    name: "국립경주박물관 도슨트투어",
    slides: [
      { src: "/media/photo/tour-museum-1.webp", alt: "전시실 진열장 앞에 모여 해설을 듣는 참가자들" },
      { src: "/media/photo/tour-museum-2.webp", alt: "박물관 전시실에서 해설사의 설명을 듣는 참가자들" },
      { src: "/media/photo/tour-museum-3.webp", alt: "반가사유상 앞에서 들어 보인 박물관 투어 포토카드" },
    ],
  },
  {
    id: "bulguksa",
    name: "불국사·석굴암 역사투어",
    slides: [
      { src: "/media/photo/tour-bulguksa-1.webp", alt: "불국사 담장 너머 석탑을 가리키며 해설을 듣는 가족" },
      { src: "/media/photo/tour-bulguksa-2.webp", alt: "다보탑 앞에 모여 해설을 듣는 참가자들" },
      { src: "/media/photo/tour-bulguksa-3.webp", alt: "불국사 일주문 앞에서 들어 보인 불국사 투어 포토카드" },
    ],
  },
  {
    id: "night",
    name: "청사초롱 야경투어",
    slides: [
      { src: "/media/photo/tour-night-1.webp", alt: "청사초롱을 들고 밤길을 걷는 참가자들" },
      { src: "/media/photo/tour-night-2.webp", alt: "해 질 녘 고분 앞에서 청사초롱을 켜고 모인 참가자들" },
      { src: "/media/photo/tour-night-3.webp", alt: "청사초롱과 함께 들어 보인 야경투어 포토카드" },
    ],
  },
];

function AlbumCard({ album, delay }: { album: Album; delay: number }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = album.slides.length;

  const go = (to: number) => {
    const el = track.current;
    if (!el) return;
    const next = (to + count) % count;
    el.scrollTo({ left: el.clientWidth * next, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth))));
  };

  return (
    <article className="gt-album" data-reveal style={{ "--d": `${delay}s` } as React.CSSProperties}>
      <div className="gt-album-view">
        <div
          className="gt-album-track"
          ref={track}
          onScroll={onScroll}
          tabIndex={0}
          role="group"
          aria-roledescription="사진 슬라이드"
          aria-label={`${album.name} 현장 사진 ${count}장`}
        >
          {album.slides.map((slide, i) => (
            <figure key={slide.src} aria-label={`${count}장 중 ${i + 1}번째`}>
              <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 100vw, 400px" />
            </figure>
          ))}
        </div>
        <button type="button" className="gt-album-nav prev" onClick={() => go(index - 1)} aria-label="이전 사진">
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" className="gt-album-nav next" onClick={() => go(index + 1)} aria-label="다음 사진">
          <span aria-hidden="true">→</span>
        </button>
        <span className="gt-album-count" aria-hidden="true">
          {index + 1} / {count}
        </span>
      </div>
      <div className="gt-album-body">
        <h3>{album.name}</h3>
        <div className="gt-album-foot">
          <div className="gt-album-dots">
            {album.slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`${i + 1}번째 사진 보기`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <Link href={`/tours/${album.id}`}>
            투어 자세히 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TourPhotos() {
  return (
    <div className="gt-albums">
      {albums.map((album, i) => (
        <AlbumCard key={album.id} album={album} delay={i * 0.08} />
      ))}
    </div>
  );
}
