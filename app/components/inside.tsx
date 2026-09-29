import Link from "next/link";
import type { ReactNode } from "react";

export function Breadcrumb({
  current,
  parent,
}: {
  current: string;
  parent?: { href: string; label: string };
}) {
  return (
    <nav className="page-breadcrumb" aria-label="현재 위치">
      <Link href="/">홈</Link>
      <span aria-hidden="true">/</span>
      {parent && (
        <>
          <Link href={parent.href}>{parent.label}</Link>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span aria-hidden="true">{number}</span>
      <h2>{children}</h2>
    </div>
  );
}
