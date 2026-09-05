"use client";

import { useState, useEffect } from "react";
import { SiteFooter, SiteHeader } from "./components/site";
import {
  IconArrow,
  IconCamera,
  IconChat,
  IconClock,
  IconGuide,
  IconMedal,
  IconMoon,
  IconMuseum,
  IconPagoda,
  IconPhone,
  IconStar,
  IconTower,
  IconUsers,
} from "./components/icons";

const landmarks = [
  {
    slug: "cheomseongdae",
    name: "첨성대",
    subtitle: "동양 최고(最古)의 천문대",
    image: "/images/landmark-cheomseongdae.jpg",
    summary: "신라 선덕여왕 때 건립, 1,400년을 버텨온 동양 최고의 천문 관측대",
  },
  {
    slug: "daereungwon",
    name: "대릉원",
    subtitle: "신라 왕들이 잠든 고분군",
    image: "/images/landmark-daereungwon.png",
    summary: "경주 시내 한복판에 솟아오른 신라 왕족의 거대한 무덤들",
  },
  {
    slug: "donggung-wolji",
    name: "동궁과월지",
    subtitle: "천년 신라의 별궁과 연못",
    image: "/images/landmark-donggung-wolji.jpg",
    summary: "야경이 가장 아름다운 경주의 보석, 신라 왕족의 연회 장소",
  },
  {
    slug: "bulguksa",
    name: "불국사",
    subtitle: "유네스코 세계문화유산",
    image: "/images/bulguksa-main.jpg",
    summary: "신라 불교 건축의 정수, 석가탑과 다보탑이 마주 선 천년 고찰",
  },
  {
    slug: "seokguram",
    name: "석굴암",
    subtitle: "돌로 빚은 신라의 불심",
    image: "/images/landmark-seokguram.png",
    summary: "토함산 정상 석굴 속에 앉아 동해를 바라보는 본존불",
  },
  {
    slug: "woljeonggyo",
    name: "월정교",
    subtitle: "신라 최대의 교량 복원",
    image: "/images/landmark-woljeonggyo.jpg",
    summary: "남천 위에 복원된 신라 시대 다리, 야경이 황홀한 경주의 랜드마크",
  },
  {
    slug: "hwangnidan",
    name: "황리단길",
    subtitle: "한옥과 감성 카페의 골목",
    image: "/images/landmark-hwangnidan.png",
    summary: "100년 한옥과 힙한 카페가 공존하는 경주 젊음의 거리",
  },
];

const tours = [
  {
    slug: "museum",
    title: "국립경주박물관 역사 도슨트 프리미엄 투어",
    category: "박물관",
    duration: "약 2시간",
    originalPrice: 40000,
    price: 25000,
    childPrice: 22000,
    discount: 37,
    times: "오전 10:00 / 오후 14:00",
    description: "성덕대왕신종부터 신라미술관까지, 스토리로 듣는 신라의 예술과 역사.",
    rating: 4.92,
    reviews: 536,
    image: "/images/tour-museum.jpg",
  },
  {
    slug: "night",
    title: "경주 야경투어 청사초롱 신라별빛야행",
    category: "야경",
    duration: "약 2시간",
    originalPrice: 30000,
    price: 16900,
    childPrice: 16900,
    discount: 44,
    times: "저녁 19:00",
    description: "청사초롱 들고 걷는 신라의 달밤. 동궁과월지, 첨성대, 월정교를 잇는 코스.",
    rating: 4.92,
    reviews: 445,
    image: "/images/tour-night.jpg",
  },
  {
    slug: "bulguksa",
    title: "불국사·석굴암 문화해설사 역사투어",
    category: "불국사",
    duration: "약 2시간",
    originalPrice: 60000,
    price: 24800,
    childPrice: 19800,
    discount: 58,
    times: "오전 10:00 / 오후 14:00",
    description: "유네스코 세계문화유산 불국사와 석굴암을 문화해설사와 함께 탐방합니다.",
    rating: 4.93,
    reviews: 329,
    image: "/images/bulguksa-main.jpg",
  },
];

const quickNav = [
  { label: "박물관투어", href: "/tours/museum", Icon: IconMuseum },
  { label: "야경투어", href: "/tours/night", Icon: IconMoon },
  { label: "불국사투어", href: "/tours/bulguksa", Icon: IconPagoda },
  { label: "유적지", href: "#landmarks", Icon: IconTower },
  { label: "견적문의", href: "/quote", Icon: IconChat },
];

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = "hidden";
};

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % landmarks.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const lm = landmarks[current];

  return (
    <section className="relative overflow-hidden bg-cream pt-28 pb-16 md:pt-36 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-brand-100 blur-3xl opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-sun-100 blur-3xl opacity-70"
      />

      <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-10 items-center">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white rounded-full pl-3 pr-4 py-1.5 shadow-sm mb-6">
            <IconStar className="w-4 h-4 text-sun-400" />
            <span className="text-sm font-semibold text-ink">4.92</span>
            <span className="text-sm text-gray-400">· 누적 리뷰 1,300+</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-ink leading-[1.15] tracking-tight mb-5">
            경주를 가장 재미있게,
            <br />
            가장 <span className="text-brand-500">의미있게</span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            그냥 지나치면 돌덩이, 알고 보면 천년의 이야기.
            경주 여행의 즐거움과 알찬 정보를 해설사가 함께 전해드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
            <a
              href="#tours"
              className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              투어 둘러보기
              <IconArrow className="w-4 h-4" />
            </a>
            <a
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-blush border border-brand-100 text-ink font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              단체 견적 문의
            </a>
          </div>

          <div className="flex items-center gap-2 justify-center md:justify-start text-sm text-gray-400">
            <IconMedal className="w-4 h-4 text-sun-500" />
            네이버 우수셀러 프리미엄 등급
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] max-w-sm mx-auto md:max-w-none rounded-[2rem] overflow-hidden bg-blush shadow-xl shadow-brand-100">
            {landmarks.map((l, i) => (
              <img
                key={l.slug}
                src={l.image}
                alt={l.name}
                onError={hideOnError}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <a
            href={`/landmarks/${lm.slug}`}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 w-[15rem] bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 hover:shadow-xl transition-shadow"
          >
            <span className="shrink-0 w-10 h-10 rounded-xl bg-blush text-brand-500 flex items-center justify-center">
              <IconTower className="w-5 h-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-bold text-ink text-sm truncate">{lm.name}</span>
              <span className="block text-xs text-gray-400 truncate">{lm.subtitle}</span>
            </span>
            <IconArrow className="w-4 h-4 text-gray-300 shrink-0" />
          </a>

          <div className="absolute top-4 right-4 flex gap-1.5">
            {landmarks.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`${i + 1}번째 유적지 보기`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-white w-5" : "bg-white/50 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickNav() {
  return (
    <section className="bg-white border-b border-brand-50">
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {quickNav.map(({ label, href, Icon }) => (
            <a key={label} href={href} className="group flex flex-col items-center gap-2.5">
              <span className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blush group-hover:bg-brand-100 text-brand-500 flex items-center justify-center transition-colors">
                <Icon className="w-7 h-7 md:w-8 md:h-8" />
              </span>
              <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-ink transition-colors">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TourCard({ tour }: { tour: (typeof tours)[number] }) {
  return (
    <a
      href={`/tours/${tour.slug}`}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-brand-50 hover:border-brand-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] bg-blush overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          onError={hideOnError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {tour.discount}% OFF
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blush text-brand-600 text-xs font-semibold px-2.5 py-1 rounded-full">
            {tour.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <IconClock className="w-3.5 h-3.5" />
            {tour.duration}
          </span>
        </div>

        <h3 className="font-bold text-ink text-lg leading-snug mb-2">{tour.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{tour.description}</p>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <IconStar className="w-3.5 h-3.5 text-sun-400" />
          <span className="font-semibold text-ink">{tour.rating}</span>
          <span>리뷰 {tour.reviews.toLocaleString()}</span>
          <span className="text-gray-200">|</span>
          <span>{tour.times}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-brand-50 flex items-end justify-between">
          <div>
            <div className="text-xs text-gray-300 line-through">
              {tour.originalPrice.toLocaleString()}원
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-ink">{tour.price.toLocaleString()}</span>
              <span className="text-sm font-medium text-gray-500">원</span>
            </div>
            {tour.childPrice !== tour.price && (
              <div className="text-xs text-gray-400 mt-0.5">
                어린이 {tour.childPrice.toLocaleString()}원
              </div>
            )}
          </div>
          <span className="w-10 h-10 rounded-full bg-blush group-hover:bg-brand-500 text-brand-500 group-hover:text-white flex items-center justify-center transition-colors">
            <IconArrow className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
}

function TourSlider() {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % tours.length), 4000);
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
          <div key={tour.slug} className="w-full shrink-0 px-1">
            <TourCard tour={tour} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {tours.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`${i + 1}번째 투어 보기`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-brand-500 w-6" : "bg-brand-100 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="mb-12">
      <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-black text-ink tracking-tight mb-3">{title}</h2>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
}

function ToursSection() {
  return (
    <section id="tours" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading
          eyebrow="PROGRAMS"
          title="투어 프로그램"
          desc="모든 투어는 전문 문화해설사가 직접 진행합니다"
        />
        <div className="md:hidden">
          <TourSlider />
        </div>
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://smartstore.naver.com/gjtrip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 font-medium transition-colors"
          >
            네이버 스마트스토어에서 바로 구매하기
            <IconArrow className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function LandmarksSection() {
  return (
    <section id="landmarks" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading
          eyebrow="LANDMARKS"
          title="경주 주요 유적지"
          desc="천년 신라의 숨결이 살아있는 경주의 대표 유산들"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {landmarks.map((lm) => (
            <a
              key={lm.slug}
              href={`/landmarks/${lm.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-blush block"
            >
              <img
                src={lm.image}
                alt={lm.name}
                onError={hideOnError}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white font-bold text-lg leading-tight">{lm.name}</h3>
                <p className="text-white/70 text-xs mt-1 leading-snug">{lm.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { Icon: IconGuide, title: "전문 해설사 동행", text: "경주를 잘 아는 해설사가 처음부터 끝까지 함께 걸으며 안내합니다" },
  { Icon: IconUsers, title: "소규모 그룹 진행", text: "인원을 제한해 질문하고 대화할 수 있는 여유를 둡니다" },
  { Icon: IconChat, title: "눈높이 맞춤 설명", text: "어린이부터 어르신까지 대상에 맞춰 설명을 조절합니다" },
  { Icon: IconCamera, title: "사진 포인트 안내", text: "가장 예쁘게 나오는 자리와 시간대를 알려드립니다" },
];

function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-blush">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHeading
            eyebrow="ABOUT US"
            title="경주를 제대로 즐기는 법"
            desc="경주 여행의 즐거움과 알찬 정보를 함께 전하는 경주 전문 여행 플랫폼입니다. 출시 3개월 만에 네이버 우수셀러 프리미엄 등급을 달성했습니다."
          />
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { value: "4.92", label: "평균 별점" },
              { value: "1,300+", label: "누적 리뷰" },
              { value: "1,500+", label: "단체 진행 인원" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl px-4 py-5 text-center">
                <div className="text-2xl font-black text-brand-500">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <a
            href="/company"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            기업소개 자세히 보기
            <IconArrow className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-3">
          {features.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4 bg-white rounded-2xl p-5">
              <span className="shrink-0 w-11 h-11 rounded-xl bg-blush text-brand-500 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bold text-ink text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { text: "해설사님 덕분에 그냥 지나쳤을 유물들을 완전히 다르게 볼 수 있었어요. 아이도 너무 좋아했습니다.", name: "박물관 투어 참가자" },
  { text: "청사초롱 들고 걷는 야경이 정말 환상적이었어요. 월정교 야경은 평생 잊지 못할 것 같아요.", name: "야경투어 참가자" },
  { text: "불국사를 여러 번 갔는데 이렇게 깊이 있게 본 건 처음이에요. 해설사님의 설명이 너무 좋았어요.", name: "불국사투어 참가자" },
];

function ReviewsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading
          eyebrow="REVIEWS"
          title="함께한 분들의 이야기"
          desc="실제 투어에 참가하신 분들이 남겨주신 후기입니다"
        />
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div key={review.name} className="bg-cream rounded-2xl p-6">
              <div className="flex gap-0.5 text-sun-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="w-4 h-4" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{review.text}</p>
              <p className="text-gray-400 text-xs">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-cream">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-3">CONTACT</p>
        <h2 className="text-3xl md:text-4xl font-black text-ink tracking-tight mb-3">예약 & 문의</h2>
        <p className="text-gray-500 mb-10">문자 또는 견적 폼으로 편하게 문의해주세요. 빠르게 답변드립니다.</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <a
            href="/quote"
            className="inline-flex items-center justify-center gap-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-4 rounded-2xl transition-colors"
          >
            <IconChat className="w-5 h-5" />
            견적 및 문의
          </a>
          <a
            href="tel:010-8402-8543"
            className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-blush border border-brand-100 text-ink font-semibold py-4 rounded-2xl transition-colors"
          >
            <IconPhone className="w-5 h-5 text-brand-500" />
            010-8402-8543
          </a>
        </div>

        <div className="bg-white rounded-2xl p-5 text-sm text-gray-500 space-y-1">
          <p>일반 문의 010-8402-8543 (문자 요망)</p>
          <p>단체 문의 010-5552-7971</p>
          <p className="text-gray-400 pt-1">운영시간 매일 09:00 ~ 18:00 (연중무휴)</p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <Hero />
      <QuickNav />
      <ToursSection />
      <LandmarksSection />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
