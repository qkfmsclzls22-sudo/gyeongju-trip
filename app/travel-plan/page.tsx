import type { Metadata } from "next";
import PlanReader from "./PlanReader";
export const metadata: Metadata = {
  title: "나의 경주 여행 일정 | AI경트",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function TravelPlanPage() { return <PlanReader />; }
