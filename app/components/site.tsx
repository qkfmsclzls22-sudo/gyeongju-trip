"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "/#tours", label: "도슨트 투어" },
  { href: "/partners", label: "단체·MICE" },
  { href: "/#heritage", label: "3D 문화유산" },
  { href: "/company", label: "기업소개" },
  { href: "/now", label: "지금 경주" },
  { href: "/account", label: "로그인·예약내역" },
];

const landmarks = [
  ["cheomseongdae", "첨성대"],
  ["daereungwon", "대릉원"],
  ["donggung-wolji", "동궁과 월지"],
  ["bulguksa", "불국사"],
  ["seokguram", "석굴암"],
  ["woljeonggyo", "월정교"],
  ["hwangnidan", "황리단길"],
];

const openTravelChat = () =>
  window.dispatchEvent(new Event("open-travel-chat"));

// 이미 홈에 있을 때는 주소가 바뀌지 않으므로, 직접 맨 위로 올려 준다
const goHomeTop = () => {
  if (window.location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
};

/** 굵은 한글 + 넓은 영문 워드마크. 어느 화면에서든 누르면 홈 첫 화면으로 돌아갑니다. */
export function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      className="gt-logo"
      aria-label="경주트립 GYEONGJU TRIP 홈으로"
      onClick={() => {
        onNavigate?.();
        goHomeTop();
      }}
    >
      <span className="gt-logo-text">
        <span className="kr">경주트립</span>
        <span className="en" lang="en">
          GYEONGJU TRIP
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader({
  back,
  showCta = true,
  className = "",
  variant = "default",
}: {
  back?: { href: string; label: string };
  showCta?: boolean;
  className?: string;
  variant?: "default" | "home";
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      data-site-header
      data-variant={variant}
      className={`gt-header ${className}`}
    >
      <div className="gt-wrap gt-header-bar">
        <Wordmark onNavigate={() => setMenuOpen(false)} />

        {back ? (
          <a href={back.href} className="gt-back">
            ← {back.label}
          </a>
        ) : (
          <nav className="gt-nav" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <button type="button" onClick={openTravelChat}>
              경주여행정보<span className="ai">AI</span>
            </button>
          </nav>
        )}

        <div className="gt-header-actions">
          {showCta && (
            <a href="/quote" className="gt-header-cta">
              견적문의
            </a>
          )}
          <button
            type="button"
            className="gt-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" />
              ) : (
                <path d="M3 8h18M3 16h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="gt-menu" aria-label="전체 메뉴">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ "--i": i } as React.CSSProperties}
            >
              {item.label}
              <span aria-hidden="true">→</span>
            </a>
          ))}
          <button
            type="button"
            style={{ "--i": navItems.length } as React.CSSProperties}
            onClick={() => {
              setMenuOpen(false);
              openTravelChat();
            }}
          >
            경주여행정보 AI
            <span aria-hidden="true">→</span>
          </button>
          <div className="gt-menu-contact">
            개인 예약·문자 <a href="sms:01084028543">010-8402-8543</a>
            <br />
            단체·MICE <a href="tel:01055527971">010-5552-7971</a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="gt-footer">
      <div className="gt-wrap gt-footer-in">
        <Link href="/" className="gt-footer-mark" aria-label="경주트립 홈으로" onClick={goHomeTop}>
          <span className="kr">경주트립</span>
          <span className="en" lang="en">
            GYEONGJU TRIP
          </span>
        </Link>
        <div className="gt-footer-grid">
          <div>
            <h3>개인 예약 · 문자문의</h3>
            <a href="sms:01084028543">010-8402-8543</a>
          </div>
          <div>
            <h3>단체 · MICE · 인바운드</h3>
            <a href="tel:01055527971">010-5552-7971</a>
            <br />
            <a href="/quote">견적문의 →</a>
          </div>
          <div>
            <h3>이메일</h3>
            <a href="mailto:gjtrip11@naver.com">gjtrip11@naver.com</a>
          </div>
        </div>
        <nav id="landmarks" className="gt-footer-places" aria-label="경주 명소 가이드">
          <h3>경주 명소 가이드</h3>
          <ul>
            {landmarks.map(([slug, name]) => (
              <li key={slug}>
                <Link href={`/landmarks/${slug}`}>{name}</Link>
              </li>
            ))}
            <li>
              <Link href="/now">지금 경주 소식</Link>
            </li>
          </ul>
        </nav>
        <div className="gt-footer-legal">
          <p>상호: 경주트립 · 대표자: 김봉열 · 김진주</p>
          <p>주소: 경상북도 경주시 계림로107 경북관광기업지원센터 6층</p>
          <p>
            사업자등록번호 694-75-00685 <span>© 2026 Gyeongju Trip.</span>
          </p>
          <p>
            <Link href="/terms">이용약관</Link> ·{" "}
            <Link href="/privacy">개인정보처리방침</Link> ·{" "}
            <Link href="/account">내 예약</Link> ·{" "}
            <Link href="/company">기업소개</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function CtaBanner({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="page-cta">
      <div>
        <span className="page-kicker">LET’S PLAN YOUR GYEONGJU</span>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div className="page-cta-actions">
        <Link href="/quote" className="page-button">
          맞춤 여행 문의 <span aria-hidden="true">↗</span>
        </Link>
        <Link href="/#tours" className="page-link">
          도슨트 투어 둘러보기
        </Link>
      </div>
    </section>
  );
}
