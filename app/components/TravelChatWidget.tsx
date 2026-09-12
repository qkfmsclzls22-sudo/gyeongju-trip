"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: "처음 가는 경주, 덜 헤매고 여유롭게 여행하도록 도와드릴게요. 동행자·이동수단·숙소 위치·여행 기간을 알려주시면 동선과 놓치기 쉬운 팁을 함께 정리해드려요.",
};

const COMPANION_OPTIONS = ["가족여행(자녀 동반)", "부모님과 함께", "커플·신혼여행", "친구와 함께", "나홀로 여행"];
const TRANSPORT_OPTIONS = ["자차·렌터카", "시내버스·도보", "대중교통·택시 병행", "관광버스 이용"];
const STAY_OPTIONS = ["경주 시내(황리단길 인근)", "보문관광단지", "불국사·석굴암 인근", "경주역(KTX) 인근", "숙박 없음", "아직 미정"];
const DURATION_OPTIONS = ["당일치기", "1박 2일", "2박 3일", "3박 이상"];

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              value === opt
                ? "bg-brand-500 border-brand-500 text-white"
                : "bg-white border-gray-200 text-gray-600 hover:border-brand-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TravelChatWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"form" | "chat">("form");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [companion, setCompanion] = useState("");
  const [transport, setTransport] = useState("");
  const [stay, setStay] = useState("");
  const [duration, setDuration] = useState("");
  const [details, setDetails] = useState("");
  const [pace, setPace] = useState("여유롭게");
  const [profile, setProfile] = useState("");
  const formComplete = companion && transport && stay && duration;

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  // 상단 메뉴의 "경주여행정보"를 누르면 이 위젯을 열도록 함
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-travel-chat", handler);
    return () => window.removeEventListener("open-travel-chat", handler);
  }, []);

  async function sendMessage(text: string, historyBase: Message[], travelProfile = profile) {
    setLoading(true);
    try {
      const res = await fetch("/api/travel-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          profile: travelProfile,
          history: historyBase.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = res.ok ? data.reply : data.error || "오류가 발생했어요.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "연결에 문제가 생겼어요. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSkipForm() {
    setStage("chat");
    setMessages([GREETING]);
  }

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!formComplete) return;
    const summary = `동행자: ${companion}\n이동수단: ${transport}\n숙소 위치: ${stay}\n여행 기간: ${duration}\n여행 속도: ${pace}${details.trim() ? `\n추가 조건: ${details.trim()}` : ""}`;
    setProfile(summary);
    setStage("chat");
    setMessages([{ role: "user", content: summary }]);
    sendMessage("선택한 조건에 맞춰 경주 여행 동선과 일정을 짜줘. 이동과 휴식 여유, 헤매지 않는 팁도 알려줘.", [], summary);
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    sendMessage(text, messages);
  }

  function handleRestartForm() {
    setStage("form");
    setMessages([]);
    setCompanion("");
    setTransport("");
    setStay("");
    setDuration("");
    setDetails("");
    setPace("여유롭게");
    setProfile("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-[min(90vw,380px)] h-[min(75vh,560px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-brand-500 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="font-semibold text-sm">AI경트</p>
              <p className="text-brand-100 text-xs">처음 가는 경주 · 맞춤 일정 도우미</p>
            </div>
            <div className="flex items-center gap-3">
              {stage === "chat" && (
                <button disabled={loading} onClick={handleRestartForm} className="text-white/80 hover:text-white text-xs underline underline-offset-2">
                  여행 조건 변경
                </button>
              )}
              <button onClick={() => setOpen(false)} aria-label="닫기" className="text-white/80 hover:text-white text-xl leading-none">
                ×
              </button>
            </div>
          </div>

          {stage === "form" ? (
            <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
              <p className="text-sm text-gray-600">
                여행 조건을 고르면 <b>동선·이동 여유·놓치기 쉬운 팁</b>을 함께 정리해드려요.
              </p>
              <ChipGroup label="누구와 함께 가세요?" options={COMPANION_OPTIONS} value={companion} onChange={setCompanion} />
              <ChipGroup label="이동수단은요?" options={TRANSPORT_OPTIONS} value={transport} onChange={setTransport} />
              <ChipGroup label="숙소는 어디쪽인가요?" options={STAY_OPTIONS} value={stay} onChange={setStay} />
              <ChipGroup label="여행 기간은요?" options={DURATION_OPTIONS} value={duration} onChange={setDuration} />
              <ChipGroup label="어떤 속도로 여행할까요?" options={["여유롭게", "적당히", "알차게"]} value={pace} onChange={setPace} />
              <label className="block text-xs font-semibold text-gray-500">
                추가로 알려주시면 더 정확해요 (선택)
                <textarea value={details} onChange={event => setDetails(event.target.value)} maxLength={500} rows={3} placeholder="예: 10월 10~11일, 경주역 11시 도착·다음 날 17시 출발, 아이 7세, 유모차, 야경·맛집 관심" className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-800" />
              </label>

              <button
                type="submit"
                disabled={!formComplete}
                className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                동선과 여행 팁 받기
              </button>
              <button
                type="button"
                onClick={handleSkipForm}
                className="w-full text-gray-400 hover:text-gray-600 text-xs py-1"
              >
                설문 건너뛰고 바로 물어보기
              </button>
            </form>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-brand-500 text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {m.role === "user" ? m.content : m.content.split("\n").map((line, lineIndex) => {
                        const timed = line.match(/^\s*(\d{1,2}:\d{2}(?:\s*[–—~-]\s*\d{1,2}:\d{2})?)\s*\|\s*(.+)$/);
                        if (timed) return <span key={lineIndex} className="grid grid-cols-[92px_1fr] gap-2 border-b border-gray-100 py-2.5 whitespace-normal">
                          <strong className="text-xs tabular-nums text-brand-700 pt-0.5">{timed[1]}</strong>
                          <span className="text-sm leading-relaxed">{timed[2]}</span>
                        </span>;
                        return <span key={lineIndex} className="block min-h-3 leading-relaxed">{line.split(/(https:\/\/[^\s<>]+)/g).map((part, partIndex) => {
                          if (!part.startsWith("https://")) return part;
                          try {
                            const url = new URL(part);
                            if (url.username || url.password) return part;
                            return <a key={partIndex} href={url.href} target="_blank" rel="noopener noreferrer" className="underline break-all">{part}</a>;
                          } catch { return part; }
                        })}</span>;
                      })}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-400 border border-gray-200 px-3 py-2 rounded-2xl rounded-bl-sm text-sm">
                      동선과 이동 여유를 살펴보고 있어요…
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSend} className="p-2 border-t border-gray-200 flex gap-2 bg-white flex-shrink-0">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  aria-label="여행 추가 질문"
                  placeholder="예: 둘째 날은 비가 오면 어떻게 바꿀까요?"
                  maxLength={400}
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-400"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0"
                  aria-label="전송"
                >
                  ➤
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {open ? (
        <button
          onClick={() => setOpen(false)}
          className="bg-brand-500 hover:bg-brand-600 text-white rounded-full w-14 h-14 shadow-xl flex items-center justify-center text-2xl transition-transform hover:scale-105"
          aria-label="채팅 닫기"
        >
          ×
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-xl flex items-center gap-2 pl-4 pr-5 py-3 transition-transform hover:scale-105"
          aria-label="AI경트 열기"
        >
          <span className="text-xl">💬</span>
          <span className="text-sm font-semibold whitespace-nowrap">AI경트</span>
        </button>
      )}
    </div>
  );
}
