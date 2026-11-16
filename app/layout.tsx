import type { Metadata, Viewport } from "next";
// 굵은 고딕 한글(Pretendard)과 넓은 영문 디스플레이(Archivo)를 사이트에서 직접 제공합니다.
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import "./inside.css";
import "./renewal.css";
import TravelChatWidget from "./components/TravelChatWidget";
import MotionRoot from "./components/MotionRoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gjtrip.co.kr"),
  title: "경주트립 GYEONGJU TRIP - 경주 일정에, 이야기를 더하다",
  description:
    "전문 문화해설사와 함께하는 경주 현지 문화유산 투어. 국립경주박물관 도슨트투어, 불국사·석굴암 역사투어, 청사초롱 야경투어. 기업·기관·MICE·인바운드 단체 맞춤 운영.",
  openGraph: {
    title: "경주트립 GYEONGJU TRIP",
    description: "경주 일정에, 이야기를 더하다. 개인 여행부터 기업·기관·MICE 단체까지.",
    images: ["/media/video/kme-reel.jpg"],
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    other: {
      "naver-site-verification": "da385efb83674f88fe184ecd65a7fb93b2442e57",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <TravelChatWidget />
        <MotionRoot />
      </body>
    </html>
  );
}
