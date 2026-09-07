import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentResult from "./PaymentResult";
import { SiteHeader, SiteFooter } from "@/app/components/site";
export const metadata: Metadata = {
  title: "결제 상태 확인 | 경주트립",
  robots: { index: false, follow: false },
};
export default function Success() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section" id="main-content">
        <Suspense fallback={<p>결제 상태를 확인하고 있습니다.</p>}>
          <PaymentResult />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
