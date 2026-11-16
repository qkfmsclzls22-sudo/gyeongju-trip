"use client";

import { useRef, useState } from "react";

/** 포스터 위 재생 버튼을 누르면 소리와 함께 재생되는 홍보영상 */
export function ReelPlayer({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <div className="gt-reel" data-reveal="zoom">
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        aria-label={label}
      />
      {!started && (
        <button
          type="button"
          className="gt-reel-play"
          aria-label={`${label} 재생`}
          onClick={() => {
            setStarted(true);
            ref.current?.play().catch(() => {});
          }}
        >
          <span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

/** 화면 오른쪽 아래 AI경트 채팅을 여는 링크형 버튼 */
export function OpenChatLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="/travel-plan"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event("open-travel-chat"));
      }}
    >
      {children}
    </a>
  );
}
