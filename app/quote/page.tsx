"use client";
import { useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../components/site";
import { koreaToday } from "@/lib/tours";
export default function Quote() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setMessage("");
    try {
      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          people: Number(data.people),
          consent: data.consent === "on",
        }),
      });
      const result = await r.json();
      if (!r.ok || result.result !== "success")
        throw new Error(result.message || "문의가 접수되지 않았습니다.");
      setStatus("done");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "문의 전송에 문제가 생겼습니다.",
      );
    }
  }
  return (
    <>
      <SiteHeader showCta={false} />
      <main className="wrap" id="main-content">
        <div className="page-heading">
          <div className="eyebrow">LET’S PLAN YOUR TRIP</div>
          <h1>어떤 경주 여행을 준비하시나요?</h1>
          <p>일정과 인원을 알려주시면 알맞은 구성으로 안내해 드립니다.</p>
        </div>
        <div className="two-column" style={{ paddingBottom: 70 }}>
          <section>
            <h2 style={{ fontSize: 26, fontWeight: 750, marginBottom: 20 }}>
              여행의 첫 단계,
              <br />
              가볍게 이야기해 주세요.
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: 25 }}>
              학교·기업·기관·가족 모임 모두 상담 가능합니다. 일정이 아직
              미정이라면 희망 시기를 기타 문의에 함께 적어주세요.
            </p>
            <div className="info-box">
              <strong>단체 문의</strong>
              <br />
              <a
                href="tel:01055527971"
                style={{ fontSize: 24, fontWeight: 750, color: "var(--navy)" }}
              >
                010-5552-7971
              </a>
              <br />
              일반 문의 010-8402-8543 · 문자 요망
              <br />
              상담 매일 09:00–18:00
            </div>
            <ul className="info-list" style={{ marginTop: 28 }}>
              <li>
                원하는 여행의 목적과 대략적인 예산을 적어주시면 제안에 도움이
                됩니다.
              </li>
              <li>차량·식사·체험이 필요하다면 함께 알려주세요.</li>
              <li>
                문의 접수 후 담당자가 가능 여부와 견적을 안내합니다. 문의만으로
                예약이 확정되지는 않습니다.
              </li>
            </ul>
          </section>
          {status === "done" ? (
            <div className="form-card" role="status">
              <div className="eyebrow">THANK YOU</div>
              <h2 style={{ fontSize: 28, fontWeight: 750 }}>
                문의가 접수되었습니다.
              </h2>
              <p>
                남겨주신 연락처와 이메일로 답변드리겠습니다.
                <br />
                내용을 수정하려면 단체 문의 번호로 연락해 주세요.
              </p>
              <Link href="/tours" className="btn btn-primary">
                투어 둘러보기
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="form-card">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="date">희망 날짜 *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={koreaToday()}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="time">희망 시간</label>
                  <input type="time" id="time" name="time" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="people">참여 인원 *</label>
                  <input
                    type="number"
                    id="people"
                    name="people"
                    min="1"
                    max="2000"
                    step="1"
                    placeholder="예: 20"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="purpose">참여 대상 *</label>
                  <select id="purpose" name="purpose" required>
                    <option>가족·개인 모임</option>
                    <option>학교·교육기관</option>
                    <option>기업·기관·MICE</option>
                    <option>기타 단체</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="tourType">관심 있는 프로그램 *</label>
                <select id="tourType" name="tourType" required>
                  <option>국립경주박물관 도슨트</option>
                  <option>청사초롱 야경투어</option>
                  <option>불국사·석굴암 역사투어</option>
                  <option>여러 코스 조합</option>
                  <option>맞춤 코스 상담</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="orgName">기업·단체명</label>
                <input
                  type="text"
                  id="orgName"
                  name="orgName"
                  maxLength={100}
                  placeholder="개인이면 비워두셔도 괜찮아요"
                />
              </div>
              <div className="field">
                <label htmlFor="phone">연락처 *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  maxLength={20}
                  required
                  placeholder="010-0000-0000"
                />
              </div>
              <div className="field">
                <label htmlFor="email">이메일 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  placeholder="견적 안내를 받을 이메일"
                />
              </div>
              <div className="field">
                <label htmlFor="message">추가 요청</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="출발 장소, 연령대, 예산, 차량 필요 여부 등을 알려주세요."
                />
              </div>
              <div className="visually-hidden" aria-hidden="true">
                <label htmlFor="website">웹사이트</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  [필수] 문의 응대를 위한 개인정보 수집·이용에 동의합니다.{" "}
                  <Link href="/privacy#inquiry" target="_blank">
                    자세히 보기
                  </Link>
                </span>
              </label>
              <p style={{ fontSize: 12, color: "var(--muted)" }}>
                수집 항목: 연락처·이메일·문의 내용. 목적: 상담·견적 안내. 보유:
                문의 처리 목적 달성 후 파기(법령상 보관 대상 제외). 동의를
                거부할 수 있으나 온라인 문의 접수가 제한됩니다.
              </p>
              {status === "error" && (
                <p role="alert" className="form-error">
                  {message} 연락이 급하시면 010-5552-7971로 문의해 주세요.
                </p>
              )}
              <button
                className="btn btn-primary btn-wide"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "문의 접수 중…" : "맞춤 여행 문의하기"}
              </button>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
