import type { Metadata } from "next";
import TourDetail from "@/app/components/TourDetail";
import { TOURS } from "@/lib/tours";
export const metadata: Metadata = {
  title: TOURS.night.name + " | 경주트립",
  description: TOURS.night.description,
};
export default function Page() {
  return <TourDetail tour={TOURS.night} />;
}
