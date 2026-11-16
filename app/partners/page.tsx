import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/app/components/site";
import PartnersView from "./PartnersView";

export const metadata: Metadata = {
  title: "단체·MICE·인바운드 파트너 소개 | 경주트립 GYEONGJU TRIP",
  description:
    "PCO·여행사·기업·기관을 위한 경주 현지 문화관광 파트너. 국립경주박물관·불국사·야경 해설투어를 행사 일정에 맞춰 운영합니다. Partner profile available in English.",
};

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const lang = (await searchParams).lang === "en" ? "en" : "ko";
  return (
    <main className="gt">
      <SiteHeader />
      <PartnersView initialLang={lang} />
      <SiteFooter />
    </main>
  );
}
