"use client";

import { useState, useRef, useEffect } from "react";
import { IconChat } from "./icons";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "안녕하세요, 경주트립 AI 여행 도우미입니다. 경주 여행 무엇이든 물어보세요. 추천 코스, 유적지 정보, 투어 안내를 도와드릴게요.",
};

const COMPANION_OPTIONS = [
  "가족여행(자녀 동반)",
  "부모님과 함께",
  "커플·신혼여행",
  "친구와 함께",
  "나홀로 여행",
];
const TRANSPORT_OPTIONS = ["자차", "대중교통·투어버스"];
const STAY_OPTIONS = [
  "경주 시내(황리단길 인근)",
  "보문관광단지",
  "불국사·석굴암 인근",
  "경주역 인근",
  "아직 미정",
];
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

  async function sendMessage(text: string, historyBase: Message[]) {
    setLoading(true);
    try {
      const res = await fetch("/api/travel-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyBase.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      const reply = res.ok ? data.reply : data.error || "오류가 발생했어요.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "연결에 문제가 생겼어요. 잠시 후 다시 시도해주세요.",
        },
      ]);
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
    const summary = `[여행 정보]\n- 동행자: ${companion}\n- 이동수단: ${transport}\n- 숙소 위치: ${stay}\n- 여행 기간: ${duration}\n\n위 정보에 맞춰서 최적의 경주 여행 동선과 일정을 추천해줘.`;
    const displaySummary = `👥 동행자: ${companion}\n🚗 이동수단: ${transport}\n🏨 숙소 위치: ${stay}\n📅 여행 기간: ${duration}`;
    setStage("chat");
    setMessages([{ role: "user", content: displaySummary }]);
    sendMessage(summary, []);
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
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
  }

  return (
    <div className="travel-chat fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div
          role="dialog"
          aria-labelledby="travel-chat-title"
          className="travel-chat-panel mb-3 w-[min(90vw,380px)] h-[min(75vh,560px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
        >
          <div className="bg-brand-500 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div>
              <p id="travel-chat-title" className="font-semibold text-sm">
                AI 여행 도우미
              </p>
              <p className="text-brand-100 text-xs">경주 여행 AI 도우미</p>
            </div>
            <div className="flex items-center gap-3">
              {stage === "chat" && (
                <button
                  onClick={handleRestartForm}
                  className="text-white/80 hover:text-white text-xs underline underline-offset-2"
                >
                  맞춤설문 다시
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className="text-white/80 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>
          </div>

          {stage === "form" ? (
            <form
              onSubmit={handleSubmitForm}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50"
            >
              <p className="text-sm text-gray-600">
                여행 정보를 알려주시면 알맞은 동선을 제안해 드립니다. 연락처 등
                개인정보는 입력하지 마세요.
              </p>
              <ChipGroup
                label="누구와 함께 가세요?"
                options={COMPANION_OPTIONS}
                value={companion}
                onChange={setCompanion}
              />
              <ChipGroup
                label="이동수단은요?"
                options={TRANSPORT_OPTIONS}
                value={transport}
                onChange={setTransport}
              />
              <ChipGroup
                label="숙소는 어디쪽인가요?"
                options={STAY_OPTIONS}
                value={stay}
                onChange={setStay}
              />
              <ChipGroup
                label="여행 기간은요?"
                options={DURATION_OPTIONS}
                value={duration}
                onChange={setDuration}
              />

              <button
                type="submit"
                disabled={!formComplete}
                className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                맞춤 여행정보 받기
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
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-brand-500 text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-400 border border-gray-200 px-3 py-2 rounded-2xl rounded-bl-sm text-sm">
                      입력 중...
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <form
                onSubmit={handleSend}
                className="p-2 border-t border-gray-200 flex gap-2 bg-white flex-shrink-0"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  aria-label="경주 여행 질문"
                  placeholder="추가로 궁금한 점을 물어보세요"
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
          aria-label="AI 여행 도우미 열기"
          aria-expanded={open}
        >
          <IconChat className="w-5 h-5" />
          <span className="text-sm font-semibold whitespace-nowrap">
            AI 여행 도우미
          </span>
        </button>
      )}
    </div>
  );
}
