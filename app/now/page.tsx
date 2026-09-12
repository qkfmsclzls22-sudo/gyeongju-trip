import type { Metadata } from "next";
import { connection } from "next/server";
import { SiteHeader, SiteFooter } from "../components/site";
import data from "../../data/now.json";
import { koreaDate } from "../../lib/now";
import NowFeed from "./NowFeed";
import styles from "./now.module.css";

export const metadata: Metadata = {
  title: "지금 경주 | 축제·공연·여행 소식 — 경주트립",
  description: "경주의 축제, 행사, 공연, 체험과 여행정보를 한눈에. 날짜별로 찾아보고 공식 홈페이지에서 자세한 안내를 확인하세요.",
  alternates: { canonical: "https://www.gjtrip.co.kr/now" },
};
export default async function NowPage() {
  await connection();
  return <div className={styles.page}>
    <SiteHeader variant="home" />
    <main id="main-content"><NowFeed data={data} initialToday={koreaDate()} /></main>
    <SiteFooter />
  </div>;
}
