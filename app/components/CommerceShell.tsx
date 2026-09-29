import Link from "next/link";
import { SiteHeader, SiteFooter } from "./site";
import "../commerce.css";
export default function CommerceShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="commerce">
      <SiteHeader showCta={false} />
      <main className="commerce-main">
        <Link className="commerce-home" href="/">
          ← 경주트립 홈
        </Link>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
