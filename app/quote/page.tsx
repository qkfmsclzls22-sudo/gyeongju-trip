"use client";

import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/app/components/site";
import { IconCheck, IconPhone } from "@/app/components/icons";

// Apps Script 웹앱 배포 후 발급되는 URL로 교체 필요 (경주트립 주문관리 스프레드시트에 연결됨)
const QUOTE_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyvSj7nZ7XO9wmntGJaywgCTv_1n6BTs1H_cEd9WSyGkJOtY8b0a29xoZIe2AanQ2ZZ/exec";

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
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

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
    <main className="min-h-screen bg-cream">
      <SiteHeader back={{ href: "/", label: "홈으로" }} showCta={false} />

      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-3 text-center">
          QUOTE &amp; INQUIRY
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-ink tracking-tight mb-3 text-center">
          견적 및 문의
        </h1>
        <p className="text-gray-500 mb-10 text-center">
          아래 내용을 남겨주시면 확인 후 빠르게 연락드리겠습니다.
        </p>

        {status === "done" ? (
          <div className="bg-white rounded-3xl border border-brand-100 p-10 text-center">
            <span className="inline-flex w-14 h-14 rounded-2xl bg-blush text-brand-500 items-center justify-center mb-5">
              <IconCheck className="w-7 h-7" />
            </span>
            <h2 className="text-xl font-black text-ink mb-2">문의가 접수되었습니다</h2>
            <p className="text-gray-500 text-sm mb-7">
              확인 후 담당자 연락처로 빠르게 연락드릴게요. 급하신 경우 아래로 바로 연락 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:010-8402-8543"
                className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <IconPhone className="w-4 h-4" />
                010-8402-8543
              </a>
              <button
                onClick={() => setStatus("idle")}
                className="bg-white hover:bg-cream border border-brand-100 text-ink font-semibold px-6 py-3 rounded-full transition-colors"
              >
                문의 하나 더 남기기
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-brand-100 p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                참가일시 (날짜 및 시간) <span className="text-brand-500">*</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 border border-brand-100 rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand-400"
                />
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 border border-brand-100 rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                인원 <span className="text-brand-500">*</span>
              </label>
              <input
                type="number"
                required
                min={1}
                placeholder="예: 15"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full border border-brand-100 rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                참가하고자 하는 투어종류 <span className="text-brand-500">*</span>
              </label>
              <select
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="w-full border border-brand-100 rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand-400 bg-white"
              >
                {TOUR_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                참가 기업 또는 단체명
              </label>
              <input
                type="text"
                placeholder="개인이신 경우 비워두셔도 됩니다"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full border border-brand-100 rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                담당자 연락처 <span className="text-brand-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-brand-100 rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                이메일 주소 <span className="text-brand-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-brand-100 rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand-400"
              />
              <p className="text-xs text-gray-400 mt-1">견적서를 이메일로 보내드리기 위해 필요해요</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">기타문의사항</label>
              <textarea
                rows={4}
                placeholder="궁금하신 점을 자유롭게 남겨주세요"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-brand-100 rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand-400 resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-brand-600 text-sm">
                {"*"} 표시된 항목을 모두 입력해주세요. 계속 오류가 나면 전화(010-8402-8543)로 문의해주세요.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-colors"
            >
              {status === "submitting" ? "제출 중..." : "문의 제출하기"}
            </button>
          </form>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
