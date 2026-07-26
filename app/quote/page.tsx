"use client";

import { useState } from "react";

// Apps Script 웹앱 배포 후 발급되는 URL로 교체 필요 (경주트립 주문관리 스프레드시트에 연결됨)
const QUOTE_WEBAPP_URL = "https://script.google.com/macros/s/REPLACE_WITH_DEPLOYMENT_ID/exec";

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
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const isValid = date && time && people && phone;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await fetch(QUOTE_WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          참가일시: `${date} ${time}`,
          인원: people,
          투어종류: tourType,
          기업단체명: orgName,
          담당자연락처: phone,
          기타문의사항: message,
        }),
      });
      setStatus("done");
      setDate("");
      setTime("");
      setPeople("");
      setTourType(TOUR_OPTIONS[0]);
      setOrgName("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-amber-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="경주트립" className="h-12 w-auto" />
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← 홈으로
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="text-amber-600 text-sm tracking-widest mb-3 text-center">QUOTE & INQUIRY</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">견적 및 문의</h1>
        <p className="text-gray-500 mb-10 text-center">
          아래 내용을 남겨주시면 확인 후 빠르게 연락드리겠습니다.
        </p>

        {status === "done" ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">문의가 접수되었습니다</h2>
            <p className="text-gray-500 text-sm mb-6">
              확인 후 담당자 연락처로 빠르게 연락드릴게요. 급하신 경우 아래로 바로 연락 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:010-8402-8543" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                📞 010-8402-8543
              </a>
              <button
                onClick={() => setStatus("idle")}
                className="border-2 border-gray-200 hover:border-amber-400 text-gray-700 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                문의 하나 더 남기기
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                참가일시 (날짜 및 시간) <span className="text-amber-500">*</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
                />
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                인원 <span className="text-amber-500">*</span>
              </label>
              <input
                type="number"
                required
                min={1}
                placeholder="예: 15"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                참가하고자 하는 투어종류 <span className="text-amber-500">*</span>
              </label>
              <select
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 bg-white"
              >
                {TOUR_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                참가 기업 또는 단체명
              </label>
              <input
                type="text"
                placeholder="개인이신 경우 비워두셔도 됩니다"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                담당자 연락처 <span className="text-amber-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">기타문의사항</label>
              <textarea
                rows={4}
                placeholder="궁금하신 점을 자유롭게 남겨주세요"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm">
                {"*"} 표시된 항목을 모두 입력해주세요. 계속 오류가 나면 전화(010-8402-8543)로 문의해주세요.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              {status === "submitting" ? "제출 중..." : "문의 제출하기"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
