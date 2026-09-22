import { notFound } from "next/navigation";
import CommerceShell from "@/app/components/CommerceShell";
import { currentUser } from "@/lib/auth";
import { paymentReady } from "@/lib/commerce/config";
import { getTour } from "@/lib/tours";
import CheckoutForm from "./CheckoutForm";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "투어 예약·결제 | 경주트립",
  robots: { index: false },
};
export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ tourId: string }>;
}) {
  const tour = getTour((await params).tourId);
  if (!tour) notFound();
  const user = await currentUser();
  return (
    <CommerceShell>
      <p className="eyebrow">BOOK YOUR TRIP</p>
      <h1>함께할 여행을 예약하세요</h1>
      <CheckoutForm
        tour={tour}
        user={user ? { id: user.id, name: user.name || "" } : null}
        enabled={paymentReady()}
        testMode={process.env.COMMERCE_MODE !== "live"}
      />
    </CommerceShell>
  );
}
