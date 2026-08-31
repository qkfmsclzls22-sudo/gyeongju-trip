"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: "안녕하세요! 경주 여행 무엇이든 물어보세요 😊 추천 코스, 유적지 정보, 투어 안내를 도와드릴게요.",
};

export default function TravelChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // 상단 메뉴의 "경주여행정보"를 누르면 이 위젯을 열도록 함
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-travel-chat", handler);
    return () => window.removeEventListener("open-travel-chat", handler);
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/travel-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages
            .filter((m) => m !== GREETING)
            .map((m) => ({ role: m.role, content: m.content })),
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

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-[min(90vw,360px)] h-[min(70vh,520px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-amber-500 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">경주 여행 AI 도우미</p>
              <p className="text-amber-100 text-xs">궁금한 걸 편하게 물어보세요</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="text-white/80 hover:text-white text-xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-amber-500 text-white rounded-br-sm"
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

          <form onSubmit={handleSend} className="p-2 border-t border-gray-200 flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="예: 야경투어 추천 코스 알려줘"
              maxLength={400}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0"
              aria-label="전송"
            >
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-amber-500 hover:bg-amber-600 text-white rounded-full w-14 h-14 shadow-xl flex items-center justify-center text-2xl transition-transform hover:scale-105"
        aria-label="여행정보 AI 도우미 열기"
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
