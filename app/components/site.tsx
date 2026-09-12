"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrow, IconClose, IconMenu } from "./icons";
import styles from "../homepage.module.css";

const navItems = [
  { href: "/#tours", label: "투어" },
  { href: "/#gallery", label: "갤러리" },
  { href: "/company", label: "기업소개" },
  { href: "/now", label: "지금 경주" },
  { href: "/#contact", label: "문의" },
];

const openTravelChat = () => window.dispatchEvent(new Event("open-travel-chat"));

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
  const items = navItems;

  return (
    <header data-site-header data-variant={variant} className={`relative w-full z-50 ${styles.header} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0">
          <span data-home-wordmark>GYEONGJU TRIP</span>
        </Link>

        {back ? (
          <a
            href={back.href}
            className="hidden lg:block text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors"
          >
            ← {back.label}
          </a>
        ) : (
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-600 whitespace-nowrap">
            {items.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-brand-600 transition-colors">
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={openTravelChat}
              className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors"
            >
              경주여행정보
              <span className="bg-blush text-brand-600 text-[0.625rem] font-bold px-1.5 py-0.5 rounded">
                AI
              </span>
            </button>
          </nav>
        )}

        <div className="flex items-center gap-1 shrink-0">
          {showCta && (
            <a
              href="/quote"
              className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              견적문의
            </a>
          )}
          {(
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-brand-600 transition-colors"
            >
              {menuOpen ? <IconClose className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-brand-100 bg-white px-4 py-2 flex flex-col text-gray-700">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 rounded-xl font-medium hover:bg-cream transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openTravelChat();
            }}
            className="py-3 px-2 rounded-xl font-medium text-left hover:bg-cream transition-colors inline-flex items-center gap-1.5"
          >
            경주여행정보
            <span className="bg-blush text-brand-600 text-[0.625rem] font-bold px-1.5 py-0.5 rounded">
              AI
            </span>
          </button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className={styles.red}>
      <div className={`${styles.container} ${styles.contact}`}>
        <Link href="/" className={styles.contactHeading}><h2 lang="en">Gyeongju Trip</h2><IconArrow /></Link>
        <div className={styles.contactDetails}>
          <div><p>개인 예약 · 문자문의</p><a href="sms:01084028543">010-8402-8543</a></div>
          <div><a href="/quote">단체 · MICE 견적문의 ↗</a><p><a href="tel:01055527971">010-5552-7971</a><span> · </span><a href="mailto:gjtrip11@naver.com">gjtrip11@naver.com</a></p></div>
        </div>
        <div className={styles.legal}><p>경주트립 · 경상북도 경주시 계림로107 경북관광기업지원센터 6층</p><p>사업자등록번호 694-75-00685 <span>© 2026 Gyeongju Trip.</span></p></div>
      </div>
    </footer>
  );
}

export function CtaBanner({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="py-16 bg-blush">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-ink tracking-tight mb-3">{title}</h2>
        <p className="text-gray-500 text-sm mb-8">{desc}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/quote"
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            견적 및 문의
            <IconArrow className="w-4 h-4" />
          </a>
          <Link
            href="/#tours"
            className="inline-flex items-center justify-center bg-white hover:bg-cream border border-brand-100 text-ink font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            투어 프로그램 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
