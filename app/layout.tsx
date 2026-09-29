import type { Metadata } from "next";
import { Hahmlet, Barlow_Condensed, Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./inside.css";
import TravelChatWidget from "./components/TravelChatWidget";

const hahmlet = Hahmlet({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-editorial",
  display: "swap",
  preload: false,
});
const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

// Hanja and rare Korean glyphs fall back to a self-hosted serif, not the device font.
const glyphFallback = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-glyph-fallback",
  display: "swap",
  preload: false,
});

// Rounded Korean and Latin UI typography, served with the site.
const suite = localFont({
  src: "./fonts/SUITE-Variable.woff2",
  variable: "--font-suite",
  weight: "300 900",
  style: "normal",
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "경주트립 - 천년 고도 경주 프리미엄 역사문화 투어",
  description:
    "전문 문화해설사와 함께하는 경주 프리미엄 역사투어. 국립경주박물관, 불국사·석굴암, 야경투어. 네이버 우수셀러 프리미엄 등급.",
  verification: {
    other: {
      "naver-site-verification": "da385efb83674f88fe184ecd65a7fb93b2442e57",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${suite.variable} ${glyphFallback.variable} ${hahmlet.variable} ${condensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <TravelChatWidget />
      </body>
    </html>
  );
}
