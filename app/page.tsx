"use client";

const tours = [
  {
    id: 1,
    slug: "museum",
    title: "국립경주박물관 역사 도슨트 프리미엄 투어",
    category: "박물관",
    duration: "약 2시간",
    originalPrice: 40000,
    price: 22000,
    childPrice: 15900,
    discount: 45,
    times: ["오전 10:00", "오후 14:00"],
    description: "성덕대왕신종 → 신라역사관 → 신라미술관. 프리미엄 블루투스 송수신기 무료대여! 스토리로 듣는 신라의 예술과 역사.",
    tags: ["#경주역사체험", "#경주역사투어", "#경주박물관투어"],
    rating: 4.92,
    reviews: 536,
    image: "/images/tour-museum.jpg",
    bgFrom: "from-yellow-800",
    bgTo: "to-yellow-600",
    badge: "인기",
  },
  {
    id: 2,
    slug: "night",
    title: "경주 야경투어 청사초롱 신라별빛야행",
    category: "야경",
    duration: "약 2시간",
    originalPrice: 30000,
    price: 15900,
    childPrice: 15900,
    discount: 47,
    times: ["저녁 19:00"],
    description: "청사초롱 들고 걷는 신라의 달밤. 동궁과월지, 첨성대, 월정교… 천년의 이야기 속으로 지금 바로 떠나보세요.",
    tags: ["#경주야행", "#경주야경투어", "#동궁과월지"],
    rating: 4.92,
    reviews: 445,
    image: "/images/tour-night.jpg",
    bgFrom: "from-indigo-950",
    bgTo: "to-blue-900",
    badge: "야간",
  },
  {
    id: 3,
    slug: "bulguksa",
    title: "불국사·석굴암 문화해설사 역사투어",
    category: "불국사",
    duration: "약 2시간",
    originalPrice: 60000,
    price: 19800,
    childPrice: 15900,
    discount: 67,
    times: ["오전 10:00", "오후 14:00"],
    description: "천년 신라의 불고, 돌 위에 새긴 철학. 유네스코 세계문화유산 불국사와 석굴암을 문화해설사와 함께 탐방하세요.",
    tags: ["#역사투어", "#경주역사투어", "#불국사", "#석굴암"],
    rating: 4.93,
    reviews: 329,
    image: "/images/tour-bulguksa.jpg",
    bgFrom: "from-stone-700",
    bgTo: "to-amber-800",
    badge: "추천",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="경주트립" className="h-14 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#tours" className="hover:text-gray-900 transition-colors">투어 보기</a>
            <a href="#about" className="hover:text-gray-900 transition-colors">소개</a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">문의</a>
          </nav>
          <a
            href="https://open.kakao.com/gjtrip"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            카카오 문의
          </a>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative pt-20 min-h-screen flex items-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(ellipse at 20% 50%, #f59e0b44 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #3b82f644 0%, transparent 50%)"
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center w-full">
          <p className="text-amber-400 font-medium mb-6 tracking-[0.3em] text-sm">GYEONGJU TRIP</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            천년의 도시 경주<br />
            <span className="text-amber-400">달빛과 함께 걷는</span><br />
            <span className="text-2xl md:text-4xl font-medium text-gray-300">감성문화여행</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            전문 문화해설사와 함께하는 프리미엄 역사투어.<br />
            오직 경주트립에서만 가능한 특별한 경험.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tours" className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-full transition-colors text-lg">
              투어 보기 →
            </a>
            <a href="#contact" className="border border-gray-600 hover:border-amber-400 text-gray-300 hover:text-amber-400 font-semibold px-8 py-3 rounded-full transition-colors text-lg">
              단체 문의
            </a>
          </div>
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-gray-800 pt-10">
            {[
              { num: "1,310+", label: "누적 리뷰" },
              { num: "4.92★", label: "평균 평점" },
              { num: "3종", label: "프리미엄 투어" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.num}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 투어 목록 */}
      <section id="tours" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-amber-600 font-medium mb-3 text-sm tracking-widest">PROGRAMS</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">투어 프로그램</h2>
            <p className="text-gray-500">모든 투어는 전문 문화해설사가 직접 진행합니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <a
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 group block"
              >
                {/* 배너 이미지 */}
                <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${tour.bgFrom} ${tour.bgTo}`}>
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* 이미지 없을 때 텍스트 오버레이 */}
                  <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-black/40 to-transparent">
                    <p className="text-white text-sm font-bold leading-snug drop-shadow">
                      {tour.category === "박물관" && "역사 도슨트 프리미엄 투어"}
                      {tour.category === "야경" && "청사초롱 신라별빛야행"}
                      {tour.category === "불국사" && "불국사 X 석굴암 역사투어"}
                    </p>
                  </div>
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {tour.discount}% OFF
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">
                      {tour.badge}
                    </span>
                    <span className="text-xs text-gray-400">★ {tour.rating} ({tour.reviews.toLocaleString()}건)</span>
                    <span className="text-xs text-gray-400 ml-auto">{tour.duration}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">{tour.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tour.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tour.times.map((t) => (
                      <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        🕐 {t}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-gray-400 line-through mb-0.5">
                        {tour.originalPrice.toLocaleString()}원
                      </div>
                      <div className="text-xl font-bold text-red-500">
                        {tour.price.toLocaleString()}원
                      </div>
                      {tour.childPrice !== tour.price && (
                        <div className="text-xs text-gray-400 mt-1">
                          어린이 {tour.childPrice.toLocaleString()}원
                        </div>
                      )}
                    </div>
                    <span className="bg-gray-900 group-hover:bg-amber-500 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">
                      자세히 보기
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://smartstore.naver.com/gjtrip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-green-500 text-gray-600 hover:text-green-600 font-medium px-6 py-3 rounded-full transition-colors text-sm"
            >
              <span>🛒</span>
              네이버 스마트스토어에서 바로 구매하기
            </a>
          </div>
        </div>
      </section>

      {/* 소개 섹션 */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-600 font-medium mb-3 text-sm tracking-wider">ABOUT US</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                경주를 가장 잘 아는<br />사람들이 안내합니다
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                경주트립은 경주 전문 문화해설사들이 운영하는 프리미엄 역사문화 투어 서비스입니다.
                출시 3개월 만에 네이버 우수셀러 프리미엄 등급을 달성한, 검증된 투어 브랜드입니다.
              </p>
              <div className="space-y-3">
                {[
                  "✅ 문화재청 공인 문화해설사 직접 진행",
                  "✅ 소규모 그룹 맞춤 진행",
                  "✅ 어린이부터 어르신까지 눈높이 맞춤 설명",
                  "✅ 사진 촬영 포인트 안내 포함",
                  "✅ 네이버 우수셀러 프리미엄 등급",
                ].map((item) => (
                  <p key={item} className="text-gray-700">{item}</p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: "👨‍👩‍👧‍👦", title: "가족 여행객", text: "아이와 함께 의미 있는 역사 체험을 원하는 가족" },
                { icon: "👫", title: "커플·친구", text: "색다른 감성 여행을 원하는 커플과 친구" },
                { icon: "🎒", title: "솔로 여행자", text: "혼자서도 편하게 즐기는 개인 역사 여행" },
                { icon: "🏢", title: "단체·기업", text: "특별한 문화 체험을 원하는 기업·학교 단체" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 리뷰 섹션 */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-amber-400 text-sm tracking-widest mb-4">REVIEWS</p>
          <h2 className="text-3xl font-bold mb-12">경주트립과 함께한 분들의 이야기</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { text: "해설사님 덕분에 그냥 지나쳤을 유물들을 완전히 다르게 볼 수 있었어요. 아이도 너무 좋아했습니다!", name: "박물관 투어 참가자", stars: 5 },
              { text: "청사초롱 들고 걷는 야경이 정말 환상적이었어요. 월정교 야경은 평생 잊지 못할 것 같아요.", name: "야경투어 참가자", stars: 5 },
              { text: "불국사를 여러 번 갔는데 이렇게 깊이 있게 본 건 처음이에요. 해설사님의 설명이 너무 좋았어요.", name: "불국사투어 참가자", stars: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-5">
                <div className="text-amber-400 text-sm mb-3">{"★".repeat(review.stars)}</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <p className="text-gray-500 text-xs">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 문의 섹션 */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-amber-600 text-sm tracking-widest mb-3">CONTACT</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">예약 & 문의</h2>
          <p className="text-gray-500 mb-10">카카오톡 또는 전화로 편하게 문의해주세요. 빠르게 답변드립니다.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="https://open.kakao.com/gjtrip" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 rounded-2xl transition-colors">
              <span className="text-2xl">💬</span>
              카카오톡 문의하기
            </a>
            <a href="tel:010-8402-8543" className="flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-amber-400 text-gray-700 font-semibold py-4 rounded-2xl transition-colors">
              <span className="text-2xl">📞</span>
              010-8402-8543
            </a>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
            <p>📱 일반 문의: 010-8402-8543 (문자 요망)</p>
            <p className="mt-1">🏢 단체 문의: 010-5552-7971</p>
          </div>
          <p className="text-gray-400 text-sm mt-4">운영시간: 매일 09:00 ~ 18:00 (연중무휴)</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-950 text-gray-500 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="경주트립" className="h-12 w-auto brightness-0 invert opacity-80" />
          </div>
          <p className="text-sm mb-1">경상북도 경주시 | 사업자등록번호: 000-00-00000</p>
          <p className="text-sm mb-1">문의: 010-8402-8543 (문자) | 단체: 010-5552-7971</p>
          <p className="text-sm mb-4">이메일: qkfmsclzls22@gmail.com</p>
          <p className="text-xs">© 2026 경주트립. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
