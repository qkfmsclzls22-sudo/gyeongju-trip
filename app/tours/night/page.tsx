"use client";

export default function NightTour() {
  return (
    <main className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="경주트립" className="h-14 w-auto" />
          </a>
          <a href="/#tours" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← 투어 목록
          </a>
        </div>
      </header>

      <div className="pt-20">
        <div className="relative h-72 md:h-96 bg-gradient-to-br from-indigo-950 to-blue-900 overflow-hidden">
          <img
            src="/images/tour-night.jpg"
            alt="경주 야경투어"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-8 w-full">
              <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">야간</span>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                경주 야경투어<br />청사초롱 신라별빛야행
              </h1>
              <p className="text-blue-300 text-sm mt-2">동궁과월지 · 첨성대 · 월정교</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-2 space-y-10">

            <div className="flex flex-wrap gap-2">
              <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs px-3 py-1 rounded-full">🏅 네이버 우수셀러 프리미엄</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">★ 4.92 (445건 리뷰)</span>
              <span className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-bold">47% 할인</span>
            </div>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌙</span> 투어 개요
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-3 text-sm text-gray-700">
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">집결 장소</span><span>동궁과월지 입구 앞 (해설사 대기)</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">집결 시간</span><span>투어 시작 10분 전</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">운영 시간</span><span>저녁 19:00 (약 2시간 소요)</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">투어 코스</span><span>동궁과월지 → 첨성대 → 월정교</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">모집 인원</span><span>최소 7명 이상 출발</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">대상</span><span>연령 제한 없음 (전 연령 참여 가능)</span></div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🏮</span> 투어의 매력 포인트
              </h2>
              <div className="space-y-4">
                <div className="border border-indigo-200 bg-indigo-50 rounded-2xl p-5">
                  <p className="font-bold text-indigo-800 mb-2">청사초롱과 함께하는 신라의 밤</p>
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    오직 경주트립에서만 가능한 청사초롱 야경 투어.<br />
                    달빛 아래 신라로 떠나는 감성 야간 투어.<br />
                    조명으로 빛나는 동궁과월지의 환상적인 야경을 해설사의 이야기와 함께.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="font-bold text-gray-900 mb-2">🌊 동궁과월지 (안압지)</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    신라 왕궁의 별궁으로 사용되던 동궁과월지.<br />
                    밤이 되면 화려한 조명이 물 위에 반영되어 만들어내는 환상적인 경관.<br />
                    신라 귀족들이 연회를 즐겼던 천년의 이야기가 담긴 공간.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="font-bold text-gray-900 mb-2">⭐ 첨성대 & 월정교</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    동양 최고(最古)의 천문대 첨성대와<br />
                    신라 시대 다리를 복원한 월정교의 야경.<br />
                    해설사와 함께 별을 보던 신라인의 이야기를 들어보세요.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>✨</span> 이런 분께 추천드립니다
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                {[
                  "경주의 낮과 다른 밤의 아름다움을 경험하고 싶은 분",
                  "커플·가족과 함께 특별한 추억을 만들고 싶은 분",
                  "사진 촬영을 즐기는 분 (야경 포토스팟 안내 포함)",
                  "역사적 배경과 함께 야경을 감상하고 싶은 분",
                ].map((item) => (
                  <p key={item} className="flex gap-2"><span className="text-indigo-500">✔️</span>{item}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>💰</span> 환불 규정
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 text-sm space-y-2 text-gray-700">
                {[
                  { when: "투어 3일 전", rate: "100% 환불" },
                  { when: "투어 2일 전", rate: "70% 환불" },
                  { when: "투어 1일 전", rate: "50% 환불" },
                  { when: "당일 취소", rate: "환불 불가" },
                  { when: "모집인원 미달 시", rate: "일자 무관 전액 환불" },
                ].map((row) => (
                  <div key={row.when} className="flex justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-500">{row.when}</span>
                    <span className="font-medium">{row.rate}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-2">⚠️ 우천 시에도 진행 / 개인 사유 취소 불가</p>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="text-xs text-gray-400 line-through mb-1">30,000원</div>
              <div className="text-3xl font-bold text-red-500 mb-1">15,900원</div>
              <div className="text-xs text-amber-600 font-medium mb-5">47% 할인 적용가 (전 연령 동일)</div>

              <div className="space-y-2 text-xs text-gray-600 mb-5">
                <p>🕐 저녁 19:00</p>
                <p>⏱ 약 2시간 소요</p>
                <p>👥 최소 7명 이상 출발</p>
                <p>📍 동궁과월지 입구 앞</p>
              </div>

              <a
                href="https://smartstore.naver.com/gjtrip"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors mb-3"
              >
                네이버에서 예약하기
              </a>
              <a
                href="tel:010-8402-8543"
                className="block w-full text-center border border-gray-200 hover:border-amber-400 text-gray-700 font-medium py-3 rounded-xl transition-colors text-sm"
              >
                📞 010-8402-8543
              </a>
              <p className="text-xs text-gray-400 text-center mt-3">단체 문의: 010-5552-7971</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
