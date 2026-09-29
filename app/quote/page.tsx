"use client";

import { useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/app/components/inside";
import { SiteFooter, SiteHeader } from "@/app/components/site";
import { IconCheck, IconPhone } from "@/app/components/icons";

// Apps Script 웹앱 배포 후 발급되는 URL로 교체 필요 (경주트립 주문관리 스프레드시트에 연결됨)
const QUOTE_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyvSj7nZ7XO9wmntGJaywgCTv_1n6BTs1H_cEd9WSyGkJOtY8b0a29xoZIe2AanQ2ZZ/exec";

const TOUR_OPTIONS = [
  "국립경주박물관 역사 도슨트 프리미엄 투어",
  "경주 야경투어 청사초롱 신라별빛야행",
  "불국사·석굴암 문화해설사 역사투어",
  "기타(직접 문의)",
];

export default function QuotePage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("");
  const [tourType, setTourType] = useState(TOUR_OPTIONS[0]);
  const [orgName, setOrgName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");

  const isValid = date && time && people && phone && email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(QUOTE_WEBAPP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          참가일시: `${date} ${time}`,
          인원: people,
          투어종류: tourType,
          기업단체명: orgName,
          담당자연락처: phone,
          이메일: email,
          기타문의사항: message,
        }),
      });
      const json = await res.json();
      if (json.result !== "success") throw new Error(json.message || "unknown");
      setStatus("done");
      setDate("");
      setTime("");
      setPeople("");
      setTourType(TOUR_OPTIONS[0]);
      setOrgName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="inner-page quote-page">
      <SiteHeader back={{ href: "/", label: "홈으로" }} showCta={false} />
      <div className="page-width">
        <Breadcrumb current="맞춤 여행 문의" />
        <div className="quote-layout">
          <section className="quote-intro">
            <span className="page-kicker">LET’S MAKE A DAY OF IT</span>
            <h1>
              어떤 경주를
              <br />
              <em>함께할까요?</em>
            </h1>
            <p className="page-lead">
              여행의 목적과 함께할 사람들을 알려주세요. 일정에 어울리는 코스와
              견적을 정리해드립니다.
            </p>
            <div className="quote-contact">
              <span>단체·기업·학교 여행 상담</span>
              <a href="tel:010-5552-7971">010-5552-7971 ↗</a>
              <a href="mailto:gjtrip11@naver.com">gjtrip11@naver.com ↗</a>
              <span>개인 예약·문자문의 010-8402-8543</span>
            </div>
            <div className="quote-art">
              <Image
                src="/images/illustration-blossom.webp"
                alt=""
                fill
                sizes="(max-width:760px) 85px, 150px"
              />
            </div>
          </section>
          {status === "done" ? (
            <section className="quote-done" aria-live="polite">
              <IconCheck aria-hidden="true" />
              <span className="page-kicker">THANK YOU</span>
              <h2>여행 이야기를 잘 받았습니다.</h2>
              <p>
                내용을 확인한 뒤 남겨주신 연락처로 안내드릴게요. 급한 문의는
                전화로 연락해 주세요.
              </p>
              <a className="page-button" href="tel:010-5552-7971">
                <IconPhone className="w-4 h-4" />
                010-5552-7971
              </a>
              <button className="page-link" onClick={() => setStatus("idle")}>
                문의 하나 더 남기기 ↗
              </button>
            </section>
          ) : (
            <form className="quote-form" onSubmit={handleSubmit}>
              <fieldset>
                <legend>
                  <span>01</span>계획 중인 여행
                </legend>
                <div className="quote-fields">
                  <div className="quote-pair">
                    <div>
                      <label htmlFor="quote-date">
                        희망 날짜 <span>*</span>
                      </label>
                      <input
                        id="quote-date"
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-time">
                        희망 시작 시간 <span>*</span>
                      </label>
                      <input
                        id="quote-time"
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="quote-people">
                      참가 인원 <span>*</span>
                    </label>
                    <input
                      id="quote-people"
                      type="number"
                      min={1}
                      required
                      placeholder="예: 30"
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-tour">
                      관심 있는 투어 <span>*</span>
                    </label>
                    <select
                      id="quote-tour"
                      value={tourType}
                      onChange={(e) => setTourType(e.target.value)}
                    >
                      {TOUR_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quote-org">기업·학교·단체명</label>
                    <input
                      id="quote-org"
                      autoComplete="organization"
                      placeholder="개인 여행이라면 비워두셔도 됩니다"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <span>02</span>연락받으실 정보
                </legend>
                <div className="quote-fields">
                  <div>
                    <label htmlFor="quote-phone">
                      연락처 <span>*</span>
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-email">
                      이메일 <span>*</span>
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="quote-email-hint"
                    />
                    <small id="quote-email-hint">
                      견적서를 받아보실 이메일을 적어주세요.
                    </small>
                  </div>
                  <div>
                    <label htmlFor="quote-message">함께 알려주실 이야기</label>
                    <textarea
                      id="quote-message"
                      rows={4}
                      placeholder="여행 목적, 연령대, 원하는 장소나 필요한 준비사항을 알려주세요."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>
              {status === "error" && (
                <p role="alert" className="quote-error">
                  문의를 보내지 못했습니다. 입력 내용을 확인해 다시 시도하거나
                  010-8402-8543으로 문의해 주세요.
                </p>
              )}
              <button
                className="page-button"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "문의 보내는 중…"
                  : "맞춤 여행 문의 보내기"}
                <span aria-hidden="true">↗</span>
              </button>
              <p className="quote-privacy">
                * 항목은 필수입니다. 연락처와 이메일은 문의 답변에 사용됩니다.{" "}
                <a href="/privacy">개인정보처리방침</a>
              </p>
            </form>
          )}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
