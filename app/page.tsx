"use client";

import { useState, useEffect } from "react";

const landmarks = [
  {
    slug: "cheomseongdae",
    name: "첨성대",
    subtitle: "동양 최고(最古)의 천문대",
    image: "/images/landmark-cheomseongdae.jpg",
    gradient: "from-indigo-950 via-blue-900 to-indigo-800",
    emoji: "🗼",
    summary: "신라 선덕여왕 때 건립, 1,400년을 버텨온 동양 최고의 천문 관측대",
  },
  {
    slug: "daereungwon",
    name: "대릉원",
    subtitle: "신라 왕들이 잠든 고분군",
    image: "/images/landmark-daereungwon.jpg",
    gradient: "from-emerald-950 via-green-900 to-teal-900",
    emoji: "⛰️",
    summary: "경주 시내 한복판에 솟아오른 신라 왕족의 거대한 무덤들",
  },
  {
    slug: "donggung-wolji",
    name: "동궁과월지",
    subtitle: "천년 신라의 별궁과 연못",
    image: "/images/landmark-donggung-wolji.jpg",
    gradient: "from-slate-950 via-blue-950 to-indigo-950",
    emoji: "🌕",
    summary: "야경이 가장 아름다운 경주의 보석, 신라 왕족의 연회 장소",
  },
  {
    slug: "bulguksa",
    name: "불국사",
    subtitle: "유네스코 세계문화유산",
    image: "/images/tour-bulguksa.jpg",
    gradient: "from-stone-800 via-amber-900 to-stone-900",
    emoji: "⛩️",
    summary: "신라 불교 건축의 정수, 석가탑과 다보탑이 마주 선 천년 고찰",
  },
  {
    slug: "seokguram",
    name: "석굴암",
    subtitle: "돌로 빚은 신라의 불심",
    image: "/images/landmark-seokguram.jpg",
    gradient: "from-gray-900 via-stone-800 to-amber-950",
    emoji: "🗿",
    summary: "토함산 정상 석굴 속에 앉아 동해를 바라보는 본존불",
  },
  {
    slug: "woljeonggyo",
    name: "월정교",
    subtitle: "신라 최대의 교량 복원",
    image: "/images/landmark-woljeonggyo.jpg",
    gradient: "from-amber-950 via-orange-900 to-red-950",
    emoji: "🌉",
    summary: "남천 위에 복원된 신라 시대 다리, 야경이 황홀한 경주의 랜드마크",
  },
  {
    slug: "hwangnidan",
    name: "황리단길",
    subtitle: "한옥과 감성 카페의 골목",
    image: "/images/landmark-hwangnidan.jpg",
    gradient: "from-rose-950 via-pink-900 to-fuchsia-950",
    emoji: "🏯",
    summary: "100년 한옥과 힙한 카페가 공존하는 경주 젊음의 거리",
  },
];

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

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % landmarks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isDragging]);

  const prev = () => setCurrent((c) => (c - 1 + landmarks.length) % landmarks.length);
  const next = () => setCurrent((c) => (c + 1) % landmarks.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setDragX(e.touches[0].clientX - touchStart);
  };
  const handleTouchEnd = () => {
    if (Math.abs(dragX) > 50) dragX < 0 ? next() : prev();
    setDragX(0);
    setIsDragging(false);
    setTouchStart(null);
  };

  const lm = landmarks[current];

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 배경 슬라이드 */}
      {landmarks.map((l, i) => (
        <div
          key={l.slug}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${l.gradient}`} />
          <img
            src={l.image}
            alt={l.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* 콘텐츠 */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-16">
        <p className="text-amber-400 font-medium tracking-[0.3em] text-sm mb-4">GYEONGJU TRIP</p>
        <div className="text-6xl mb-6">{lm.emoji}</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 drop-shadow-lg">
          {lm.name}
        </h1>
        <p className="text-amber-300 text-lg md:text-xl font-medium mb-4">{lm.subtitle}</p>
        <p className="text-white/80 text-sm md:text-base max-w-md mb-10 leading-relaxed">
          {lm.summary}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <a
            href={`/landmarks/${lm.slug}`}
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-full transition-colors text-base"
          >
            유적지 자세히 보기 →
          </a>
          <a
            href="#tours"
            className="border border-white/50 hover:border-white text-white/80 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors text-base"
          >
            투어 예약하기
          </a>
        </div>
      </div>

      {/* 좌우 화살표 (PC) */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-xl transition-colors"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-xl transition-colors"
      >
        ›
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {landmarks.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-amber-400 w-8" : "bg-white/40 w-2"}`}
          />
        ))}
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-6 right-6 text-white/50 text-xs hidden md:block">
        {current + 1} / {landmarks.length}
      </div>
    </section>
  );
}

function TourSlider() {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % tours.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
    setDragX(0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const dx = e.touches[0].clientX - touchStart;
    if (Math.abs(dx) > 10) e.preventDefault();
    setDragX(dx);
  };
  const handleTouchEnd = () => {
    if (Math.abs(dragX) > 50) {
      if (dragX < 0) setCurrent((prev) => (prev + 1) % tours.length);
      else setCurrent((prev) => (prev - 1 + tours.length) % tours.length);
    }
    setDragX(0);
    setIsDragging(false);
    setTouchStart(null);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex"
        style={{
          transform: `translateX(calc(-${current * 100}% + ${dragX}px))`,
          transition: isDragging ? "none" : "transform 0.4s ease",
          touchAction: "pan-y",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {tours.map((tour) => (
          <div key={tour.id} className="w-full shrink-0">
            <a href={`/tours/${tour.slug}`} className="rounded-2xl overflow-hidden bg-white shadow-sm block mx-1">
              <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${tour.bgFrom} ${tour.bgTo}`}>
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-black/40 to-transparent">
                  <p className="text-white text-sm font-bold leading-snug drop-shadow">{tour.title}</p>
                </div>
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {tour.discount}% OFF
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">{tour.badge}</span>
                  <span className="text-xs text-gray-400">★ {tour.rating} ({tour.reviews.toLocaleString()}건)</span>
                  <span className="text-xs text-gray-400 ml-auto">{tour.duration}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">{tour.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tour.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {tour.times.map((t) => (
                    <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">🕐 {t}</span>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-gray-400 line-through mb-0.5">{tour.originalPrice.toLocaleString()}원</div>
                    <div className="text-xl font-bold text-red-500">{tour.price.toLocaleString()}원</div>
                    {tour.childPrice !== tour.price && (
                      <div className="text-xs text-gray-400 mt-1">어린이 {tour.childPrice.toLocaleString()}원</div>
                    )}
                  </div>
                  <span className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full">자세히 보기</span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {tours.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-amber-500 w-6" : "bg-gray-300 w-2"}`}
          />
        ))}
      </div>
    </div>
  );
}

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
            <a href="#landmarks" className="hover:text-gray-900 transition-colors">유적지</a>
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

      {/* 히어로: 유적지 슬라이드쇼 */}
      <HeroSlider />

      {/* 경주 주요 유적지 */}
      <section id="landmarks" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-amber-600 font-medium mb-3 text-sm tracking-widest">LANDMARKS</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">경주 주요 유적지</h2>
            <p className="text-gray-500">천년 신라의 숨결이 살아있는 경주의 대표 유산들</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {landmarks.map((lm) => (
              <a
                key={lm.slug}
                href={`/landmarks/${lm.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] block shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${lm.gradient}`} />
                <img
                  src={lm.image}
                  alt={lm.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-2xl mb-1">{lm.emoji}</div>
                  <h3 className="text-white font-bold text-lg leading-tight">{lm.name}</h3>
                  <p className="text-white/70 text-xs mt-1 leading-snug">{lm.subtitle}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">자세히 →</span>
                </div>
              </a>
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
          <div className="md:hidden">
            <TourSlider />
          </div>
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <a
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 group block"
              >
                <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${tour.bgFrom} ${tour.bgTo}`}>
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-black/40 to-transparent">
                    <p className="text-white text-sm font-bold leading-snug drop-shadow">{tour.title}</p>
                  </div>
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {tour.discount}% OFF
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">{tour.badge}</span>
                    <span className="text-xs text-gray-400">★ {tour.rating} ({tour.reviews.toLocaleString()}건)</span>
                    <span className="text-xs text-gray-400 ml-auto">{tour.duration}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">{tour.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tour.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tour.times.map((t) => (
                      <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">🕐 {t}</span>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-gray-400 line-through mb-0.5">{tour.originalPrice.toLocaleString()}원</div>
                      <div className="text-xl font-bold text-red-500">{tour.price.toLocaleString()}원</div>
                      {tour.childPrice !== tour.price && (
                        <div className="text-xs text-gray-400 mt-1">어린이 {tour.childPrice.toLocaleString()}원</div>
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
                경주의 모든 여행을<br />한 곳에서
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                경주트립은 단순한 투어 회사가 아닙니다.<br />
                대릉원 왕릉부터 황리단길 한옥카페까지, 경주의 모든 것을 연결하는 경주 전문 여행 플랫폼입니다.<br />
                출시 3개월 만에 네이버 우수셀러 프리미엄 등급을 달성한 검증된 브랜드가 안내합니다.
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
