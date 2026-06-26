"use client";

export default function MuseumTour() {
  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
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

      {/* 배너 */}
      <div className="pt-20">
        <div className="relative h-72 md:h-96 bg-gradient-to-br from-yellow-800 to-yellow-600 overflow-hidden">
          <img
            src="/images/tour-museum.jpg"
            alt="국립경주박물관"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-8 w-full">
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">인기</span>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                국립경주박물관<br />역사 도슨트 프리미엄 투어
              </h1>
              <p className="text-amber-300 text-sm mt-2">경주가볼만한곳</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* 본문 */}
          <div className="md:col-span-2 space-y-10">

            {/* 뱃지 */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs px-3 py-1 rounded-full">🏅 네이버 우수셀러 프리미엄</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">★ 4.92 (536건 리뷰)</span>
              <span className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-bold">45% 할인</span>
            </div>

            {/* 투어 개요 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌞</span> 투어 개요
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-3 text-sm text-gray-700">
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">집결 장소</span><span>국립경주박물관 정문 앞 안내데스크</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">집결 시간</span><span>투어 시작 10분 전</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">운영 시간</span><span>오전 10:00 / 오후 14:00 (약 2시간 소요)</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">투어 코스</span><span>성덕대왕신종 → 신라역사관 → 신라미술관 → 월지관(자유관람)</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">모집 인원</span><span>최소 7명 이상 출발</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">대상</span><span>초등 고학년 이상 권장 (초등 4학년 미만 참여 불가, 부모 1명 이상 동참 필수)</span></div>
                <div className="flex gap-3"><span className="text-gray-400 w-20 shrink-0">연령 원칙</span><span>36개월 이상부터 1인 1매 원칙</span></div>
              </div>
            </section>

            {/* 매력 포인트 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🎧</span> 투어의 매력 포인트
              </h2>
              <div className="space-y-4">
                <div className="border border-amber-200 bg-amber-50 rounded-2xl p-5">
                  <p className="font-bold text-amber-800 mb-2">프리미엄 블루투스 송수신기 무료 대여 (오픈이벤트)</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    귀에 꽂는 이어폰이 아닌 <strong>귀에 거는 오픈형 수신기</strong> 사용.<br />
                    통증 없이 위생적이고 편안하며, 음질이 선명한 고급 장비.<br />
                    단체 관람에서도 또렷하게 들리는 고품격 해설 환경.<br />
                    이어폰 별도 지참 없이 참여 가능!
                  </p>
                  <p className="text-xs text-amber-600 mt-3">⚠️ 수신기 분실·파손 시 100% 전액 배상 / 투어 종료 후 반드시 반납</p>
                </div>

                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="font-bold text-gray-900 mb-2">🏺 스토리로 듣는 신라의 예술</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    유물 설명 중심이 아닌, 그 시대 사람들의 삶과 감정을 담은 이야기 해설.<br />
                    성덕대왕신종의 전설, 신라 왕들의 예술적 감각, 신라 불교미술의 정수까지<br />
                    아이와 부모가 함께 몰입할 수 있는 <strong>감성형 도슨트 투어</strong>.
                  </p>
                  <p className="text-xs text-gray-400 mt-3 italic">"역사는 외우는 게 아니라, 이야기를 통해 기억하는 것이다."</p>
                </div>

                <div className="border border-gray-200 rounded-2xl p-5">
                  <p className="font-bold text-gray-900 mb-2">👨‍🏫 전문 해설사의 감성 도슨트</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    박물관·문화유산 전문해설사들이 직접 진행.<br />
                    지루한 나열식 설명이 아닌, 공감과 감동이 있는 해설로 구성.<br />
                    해설사마다 다른 시선으로 만나는 '살아있는 유물의 이야기'.
                  </p>
                </div>
              </div>
            </section>

            {/* 이런 분께 추천 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>✨</span> 이런 분께 추천드립니다
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                {[
                  "아이에게 역사보다 흥미로운 '이야기 여행'을 선물하고 싶은 부모님",
                  "조용하고 품격 있는 문화 체험을 찾는 가족",
                  "기존 투어의 형식적인 해설이 아쉬웠던 분",
                  "신라의 예술과 문화를 더 깊이 느끼고 싶은 여행자",
                  "학생·학부모 교육형 여행",
                ].map((item) => (
                  <p key={item} className="flex gap-2"><span className="text-amber-500">✔️</span>{item}</p>
                ))}
              </div>
            </section>

            {/* 환불 규정 */}
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
                <p className="text-xs text-gray-400 pt-2">⚠️ 개인 일정 변경·단순 변심·교통 지연·개인 질병·동행인 취소는 환불 불가</p>
              </div>
            </section>

            {/* 안전 안내 */}
            <section className="text-xs text-gray-400 leading-relaxed bg-gray-50 rounded-2xl p-5">
              <p className="font-medium text-gray-500 mb-2">📌 안전 및 보험 안내</p>
              <p>본 상품은 여행자보험이 포함되어 있지 않으며, 개인정보보호법에 따라 여행자보험은 참가자 본인이 개별 가입하셔야 합니다. 투어는 도보 이동을 포함한 실내 프로그램으로, 참가자의 부주의·개인 질환으로 발생한 사고에 대해서는 주최 측의 법적·재정적 책임이 제한됩니다. 기상 및 현장 상황에 따라 코스가 일부 변경될 수 있습니다.</p>
            </section>
          </div>

          {/* 사이드 예약 카드 */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="text-xs text-gray-400 line-through mb-1">40,000원</div>
              <div className="text-3xl font-bold text-red-500 mb-1">22,000원</div>
              <div className="text-xs text-gray-400 mb-1">어린이 15,900원</div>
              <div className="text-xs text-amber-600 font-medium mb-5">45% 할인 적용가</div>

              <div className="space-y-2 text-xs text-gray-600 mb-5">
                <p>🕐 오전 10:00 / 오후 14:00</p>
                <p>⏱ 약 2시간 소요</p>
                <p>👥 최소 7명 이상 출발</p>
                <p>📍 국립경주박물관 정문 앞</p>
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
