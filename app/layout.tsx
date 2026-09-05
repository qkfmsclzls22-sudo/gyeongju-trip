import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import TravelChatWidget from "./components/TravelChatWidget";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "경주트립 - 천년 고도 경주 프리미엄 역사문화 투어",
  description: "전문 문화해설사와 함께하는 경주 프리미엄 역사투어. 국립경주박물관, 불국사·석굴암, 야경투어. 네이버 우수셀러 프리미엄 등급.",
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
      className={`${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <TravelChatWidget />
      </body>
    </html>
  );
}
