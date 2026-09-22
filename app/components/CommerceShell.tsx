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
      <main className="commerce-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
