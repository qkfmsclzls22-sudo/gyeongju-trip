"use client";

export default function BulguksaTour() {
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
        <div className="relative h-72 md:h-96 bg-gradient-to-br from-stone-700 to-amber-800 overflow-hidden">
          <img
            src="/images/tour-bulguksa.jpg"
            alt="불국사 석굴암 투어"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-8 w-full">
              <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">추천</span>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                불국사·석굴암<br />문화해설사 역사투어
              </h1>
              <p className="text-amber-300 text-sm mt-2">유네스코 세계문화유산 · 경주가볼만한곳</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-2 space-y-10">

            <div className="flex flex-wrap gap-2">
              <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs px-3 py-1 rounded-full">🏅 네이버 우수셀러 프리미엄</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">★ 4.93 (329건 리뷰)</span>
              <span className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-bold">67% 할인</span>
            </div>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌞</span> 투어 개요
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-3 text-sm text-gray-700">
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">집결 장소</span><span>불국사 매표소 앞 (해설사 대기)</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">집결 시간</span><span>투어 시작 10분 전</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">운영 시간</span><span>오전 10:00 / 오후 14:00 (약 2시간 소요)</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">투어 코스</span><span>불국사 (청운교·백운교 → 대웅전 → 다보탑·석가탑) + 석굴암</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">모집 인원</span><span>최소 7명 이상 출발</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">대상</span><span>전 연령 (초등 저학년 이하 신중한 구매 권장)</span></div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🏛️</span> 투어의 매력 포인트
              </h2>
              <div className="space-y-4">
                <div className="border border-amber-200 bg-amber-50 rounded-2xl p-5">
                  <p className="font-bold text-amber-800 mb-2">천년 신라의 불교, 돌 위에 새긴 철학</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    단순한 건축물 관람이 아닌, 신라인이 돌에 새겨 넣은 불교 철학과 예술을 읽는 시간.<br />
                    다보탑과 석가탑에 담긴 의미, 청운교·백운교의 상징까지<br />
                    문화해설사와 함께라면 전혀 다른 불국사를 만납니다.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="font-bold text-gray-900 mb-2">⛩️ 유네스코 세계문화유산 불국사</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    751년 신라 경덕왕 때 창건된 천년 고찰.<br />
                    청운교·백운교, 다보탑, 석가탑 등 국보급 문화재가 집중된 공간.<br />
                    단순 관람이 아닌, 각 공간의 건축 의도와 역사적 의미를 함께 배웁니다.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="font-bold text-gray-900 mb-2">🗿 석굴암 - 신라 조각 예술의 극치</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    화강암을 정교하게 다듬어 만든 인공 석굴 사원.<br />
                    본존불의 완벽한 비례와 조각 기술, 내부 구조의 과학적 설계까지.<br />
                    해설사의 설명과 함께라면 그냥 지나쳤을 디테일이 살아납니다.
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
                  "불국사를 여러 번 가봤지만 더 깊이 알고 싶은 분",
                  "아이와 함께 유네스코 문화유산을 체험하고 싶은 부모님",
                  "신라 불교 예술과 건축에 관심 있는 역사 여행자",
                  "교육 목적의 가족·학교 단체 여행",
                ].map((item) => (
                  <p key={item} className="flex gap-2"><span className="text-amber-500">✔️</span>{item}</p>
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
                <p className="text-xs text-gray-400 pt-2">⚠️ 개인 일정 변경·단순 변심·교통 지연·개인 질병은 환불 불가</p>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="text-xs text-gray-400 line-through mb-1">60,000원</div>
              <div className="text-3xl font-bold text-red-500 mb-1">19,800원</div>
              <div className="text-xs text-gray-400 mb-1">어린이 15,900원</div>
              <div className="text-xs text-amber-600 font-medium mb-5">67% 할인 적용가</div>

              <div className="space-y-2 text-xs text-gray-600 mb-5">
                <p>🕐 오전 10:00 / 오후 14:00</p>
                <p>⏱ 약 2시간 소요</p>
                <p>👥 최소 7명 이상 출발</p>
                <p>📍 불국사 매표소 앞</p>
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
