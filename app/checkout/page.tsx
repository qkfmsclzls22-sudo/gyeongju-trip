import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader, SiteFooter } from "../components/site";
import { testCheckoutEnabled } from "@/lib/commerce";
import { currentMember } from "@/lib/auth";
import { validateBooking } from "@/lib/booking";
import CheckoutForm from "./CheckoutForm";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "예약 내용 확인 | 경주트립",
  robots: { index: false, follow: false },
};
export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const q = await searchParams;
  if (!testCheckoutEnabled())
    return (
      <>
        <SiteHeader />
        <main className="wrap section" id="main-content">
          <div className="empty-state">
            <h1 style={{ fontSize: 30 }}>네이버에서 예약을 이어가세요</h1>
            <p>현재 투어 예약과 결제는 네이버 스마트스토어에서 진행합니다.</p>
            <a
              className="btn btn-naver"
              href="https://smartstore.naver.com/gjtrip"
            >
              네이버에서 예약하기
            </a>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  const member = await currentMember();
  if (!member)
    redirect(
      "/login?callbackUrl=" +
        encodeURIComponent("/checkout?" + new URLSearchParams(q)),
    );
  let booking;
  try {
    booking = validateBooking({
      tourId: q.tour,
      date: q.date,
      time: q.time,
      adultCount: Number(q.adults),
      childCount: Number(q.children),
    });
  } catch {
    return (
      <>
        <SiteHeader />
        <main className="wrap section">
          <div className="empty-state">
            <h1>예약 정보를 다시 선택해 주세요</h1>
            <Link className="btn btn-primary" href="/tours">
              투어로 돌아가기
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }
  return (
    <>
      <SiteHeader />
      <main className="wrap section" id="main-content">
        <CheckoutForm
          tourId={booking.tour.id}
          tourName={booking.tour.name}
          date={booking.date}
          time={booking.time}
          adultCount={booking.adultCount}
          childCount={booking.childCount}
          amount={booking.amount}
          clientKey={process.env.TOSS_CLIENT_KEY!}
        />
      </main>
      <SiteFooter />
    </>
  );
}
