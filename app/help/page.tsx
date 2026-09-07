import type { Metadata } from "next";
import { SiteHeader, SiteFooter, CtaBanner } from "../components/site";
import { FAQ } from "@/lib/faq";
export const metadata: Metadata = { title: "예약·참여 안내 | 경주트립" };
export default function Help() {
  return (
    <>
      <SiteHeader />
      <main className="wrap" id="main-content">
        <div className="page-heading">
          <div className="eyebrow">WE ARE HERE TO HELP</div>
          <h1>궁금한 점을 먼저 확인해 보세요</h1>
          <p>예약부터 여행 당일까지, 자주 묻는 질문을 모았습니다.</p>
        </div>
        <div className="faq-list" style={{ maxWidth: 850, marginBottom: 65 }}>
          {FAQ.map((f) => (
            <details key={f.id} id={f.id}>
              <summary>{f.question}</summary>
              <div>{f.answer}</div>
            </details>
          ))}
        </div>
      </main>
      <CtaBanner
        title="찾으시는 답변이 없나요?"
        desc="참여 인원과 희망 일정을 알려주시면 함께 확인해 드립니다."
      />
      <SiteFooter />
    </>
  );
}
