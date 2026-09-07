"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IconArrow, IconClose, IconMenu } from "./icons";
const navItems = [
  { href: "/tours", label: "전체 투어" },
  { href: "/groups", label: "단체·맞춤여행" },
  { href: "/guide", label: "경주 여행가이드" },
  { href: "/company", label: "경주트립 소개" },
];
export function SiteHeader({
  back,
  showCta = true,
}: {
  back?: { href: string; label: string };
  showCta?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="wrap header-main">
        <Link href="/" className="brand" aria-label="경주트립 홈">
          <Image
            className="brand-logo"
            src="/logo.png"
            alt="경주트립"
            width={900}
            height={550}
            preload
          />
        </Link>
        <nav className="desktop-nav" aria-label="주 메뉴">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="header-account" href="/account">
            마이페이지
          </Link>
          {showCta && (
            <Link href="/quote" className="btn btn-primary">
              단체 문의
            </Link>
          )}
          <button
            className="menu-toggle"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen(!open)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="모바일 메뉴"
        >
          {[
            ...navItems,
            { href: "/help", label: "자주 묻는 질문" },
            { href: "/quote", label: "단체 문의" },
            { href: "/login", label: "로그인 · 회원가입" },
            ...(back ? [back] : []),
          ].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <h3>예약·참여 문의</h3>
            <a className="footer-phone" href="sms:01084028543">
              010-8402-8543
            </a>
            <p>
              일반 문의는 문자로 남겨주세요.
              <br />
              상담 매일 09:00–18:00
            </p>
          </div>
          <div>
            <h3>여행 준비</h3>
            <Link href="/tours">전체 투어</Link>
            <Link href="/guide">경주 여행가이드</Link>
            <Link href="/help">예약·참여 안내</Link>
            <a
              href="https://smartstore.naver.com/gjtrip"
              target="_blank"
              rel="noopener noreferrer"
            >
              네이버 예약 확인 ↗
            </a>
          </div>
          <div>
            <h3>단체 여행</h3>
            <Link href="/groups">기업·학교·단체 여행</Link>
            <Link href="/quote">맞춤 견적 문의</Link>
            <Link href="/company">경주트립 소개</Link>
            <a href="tel:01055527971">단체 문의 010-5552-7971</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">
            <Link href="/terms">이용약관</Link>
            <Link href="/privacy">
              <strong>개인정보처리방침</strong>
            </Link>
            <Link href="/help#refund">취소·환불 안내</Link>
            <Link href="/credits">사진 출처</Link>
          </div>
          <p>
            상호 경주트립 · 사업자등록번호 694-75-00685
            <br />
            경상북도 경주시 계림로107 경북관광기업지원센터 6층 · 이메일{" "}
            <a href="mailto:gjtrip11@naver.com">gjtrip11@naver.com</a>
          </p>
          <p>© 2026 GYEONGJU TRIP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export function CtaBanner({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="soft">
      <div className="wrap help-band">
        <div>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
        <Link href="/quote" className="btn btn-primary">
          여행 문의하기
          <IconArrow />
        </Link>
      </div>
    </section>
  );
}
