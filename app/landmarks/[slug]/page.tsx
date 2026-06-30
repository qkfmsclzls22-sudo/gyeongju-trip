"use client";

import { notFound } from "next/navigation";

const landmarkData: Record<string, {
  name: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  image: string;
  images: string[];
  period: string;
  address: string;
  hours: string;
  fee: string;
  tip: string;
  description: string[];
  highlights: { icon: string; title: string; text: string }[];
  nearBy: string[];
  relatedTour?: string;
}> = {
  cheomseongdae: {
    name: "첨성대",
    subtitle: "동양 최고(最古)의 천문대",
    emoji: "🗼",
    gradient: "from-indigo-950 via-blue-900 to-indigo-800",
    image: "/images/landmark-cheomseongdae.jpg",
    images: [
      "/images/landmark-cheomseongdae.jpg",
      "/images/landmark-cheomseongdae-2.jpg",
      "/images/landmark-cheomseongdae-3.jpg",
    ],
    period: "신라 선덕여왕 재위기 (632~647년)",
    address: "경상북도 경주시 인왕동 839-1",
    hours: "연중 24시간 개방",
    fee: "무료",
    tip: "해 질 무렵 방문하면 붉은 노을과 함께 최고의 사진을 찍을 수 있어요. 동궁과월지와 도보 10분 거리라 함께 돌아보기 좋습니다.",
    description: [
      "첨성대(瞻星臺)는 신라 선덕여왕 때 건립된 동양에서 가장 오래된 천문 관측대입니다. 높이 약 9.17m의 화강암 석탑으로, 362개의 돌이 쌓여 있으며 이는 음력 1년의 날수와 같습니다.",
      "27단의 석단으로 이루어진 몸통은 둥글고, 아래는 넓고 위로 갈수록 좁아지는 독특한 곡선 형태입니다. 가운데 창문처럼 뚫린 구멍(창구)을 통해 내부에 사다리를 놓고 올라가 하늘을 관측했을 것으로 추정됩니다.",
      "첨성대는 1962년 국보 제31호로 지정되었으며, 경주 역사 유적 지구의 일부로 유네스코 세계문화유산에 등재되어 있습니다. 천 수백 년의 세월을 견디고 원형에 가까운 모습을 유지하고 있다는 것 자체가 경이로운 일입니다.",
    ],
    highlights: [
      { icon: "🌟", title: "국보 제31호", text: "1962년 국보로 지정, 유네스코 세계문화유산" },
      { icon: "📐", title: "정교한 설계", text: "362개의 돌 = 음력 1년의 날수, 27단 = 선덕여왕의 즉위 순서" },
      { icon: "🌙", title: "야경 명소", text: "조명이 켜지는 해 질 무렵부터 밤이 가장 아름다워요" },
      { icon: "📸", title: "사진 포인트", text: "정면보다 살짝 비껴서 촬영하면 입체감 있는 사진이 나와요" },
    ],
    nearBy: ["동궁과월지", "황리단길", "대릉원"],
    relatedTour: "night",
  },
  "daereungwon": {
    name: "대릉원",
    subtitle: "신라 왕들이 잠든 고분군",
    emoji: "⛰️",
    gradient: "from-emerald-950 via-green-900 to-teal-900",
    image: "/images/landmark-daereungwon.jpg",
    images: ["/images/landmark-daereungwon.jpg"],
    period: "삼국시대 신라 (4~6세기)",
    address: "경상북도 경주시 황남동 황남로 312",
    hours: "3월~10월 09:00~22:00 / 11월~2월 09:00~21:00",
    fee: "성인 3,000원 / 어린이 1,000원",
    tip: "봄에 방문하면 고분 사이로 벚꽃이 피어 장관을 이룹니다. 내부를 관람할 수 있는 천마총을 꼭 들어가 보세요.",
    description: [
      "대릉원(大陵苑)은 경주 시내 한복판에 위치한 신라 시대의 대형 고분군입니다. 약 12만 5천 평의 넓은 면적에 23기의 고분이 모여 있으며, 그 웅장한 규모에 방문객들은 압도됩니다.",
      "고분들의 높이는 최대 23m에 달하며, 이 안에는 신라 왕족과 귀족들이 화려한 부장품과 함께 잠들어 있습니다. 1973년 발굴된 천마총에서는 천마도(天馬圖)가 그려진 말다래(말 옆구리 가리개)가 발견되어 세상을 놀라게 했습니다.",
      "황남대총은 대릉원에서 가장 큰 고분으로, 발굴 과정에서 5만 8천여 점의 유물이 출토되었습니다. 지금도 발굴되지 않은 고분들이 많아 신라 역사의 보물창고라 불립니다.",
    ],
    highlights: [
      { icon: "🏔️", title: "23기 대형 고분", text: "최대 높이 23m, 12만 5천 평 규모의 거대한 고분군" },
      { icon: "🐴", title: "천마총 관람 가능", text: "유일하게 내부를 볼 수 있는 고분, 천마도 출토지" },
      { icon: "🌸", title: "사계절 아름다운 경관", text: "봄 벚꽃, 여름 녹음, 가을 단풍, 겨울 설경 모두 특별해요" },
      { icon: "💎", title: "황금 유물의 보고", text: "금관, 귀걸이, 팔찌 등 화려한 신라 금 세공품이 쏟아진 곳" },
    ],
    nearBy: ["첨성대", "황리단길", "국립경주박물관"],
    relatedTour: "museum",
  },
  "donggung-wolji": {
    name: "동궁과월지",
    subtitle: "천년 신라의 별궁과 연못",
    emoji: "🌕",
    gradient: "from-slate-950 via-blue-950 to-indigo-950",
    image: "/images/landmark-donggung-wolji.jpg",
    images: ["/images/landmark-donggung-wolji.jpg"],
    period: "신라 문무왕 14년 (674년)",
    address: "경상북도 경주시 원화로 102",
    hours: "09:00~22:00 (매표 마감 21:30)",
    fee: "성인 3,000원 / 어린이 1,000원",
    tip: "해 진 후 야간 방문을 강력 추천! 조명이 켜진 야경이 낮보다 10배는 아름답습니다. 월정교와 함께 보면 더욱 좋아요.",
    description: [
      "동궁과월지는 신라 문무왕 때 만들어진 왕궁의 별궁(別宮)과 인공 연못입니다. 신라가 삼국을 통일한 기념으로 조성되었으며, 태자가 거처하는 동궁(東宮)이 있던 곳입니다.",
      "넓이 약 15,658㎡의 인공 연못에는 세 개의 섬이 있으며, 연못 가장자리를 따라 복원된 누각과 전각들이 야경 조명과 어우러져 환상적인 풍경을 만들어냅니다.",
      "1975년 발굴 조사에서 '月池(월지)'라고 쓰인 토기 파편이 발견되어 '월지'가 원래 이름임이 밝혀졌습니다. 과거엔 '안압지(雁鴨池)'라 불렸으나 지금은 공식적으로 동궁과월지로 부릅니다.",
    ],
    highlights: [
      { icon: "🌙", title: "경주 최고의 야경", text: "야간 조명이 연못에 반사되는 풍경은 경주에서 가장 아름다운 뷰" },
      { icon: "🏛️", title: "복원된 신라 건축", text: "임해전 등 신라 양식의 건물들이 연못 옆에 복원되어 있어요" },
      { icon: "🦆", title: "원래 이름은 월지", text: "오리와 기러기가 노닌다는 안압지로 불렸으나 월지가 원래 이름" },
      { icon: "🎏", title: "야경투어 주요 코스", text: "경주트립 야경투어의 핵심 방문지" },
    ],
    nearBy: ["첨성대", "월정교", "황리단길"],
    relatedTour: "night",
  },
  bulguksa: {
    name: "불국사",
    subtitle: "유네스코 세계문화유산",
    emoji: "⛩️",
    gradient: "from-stone-800 via-amber-900 to-stone-900",
    image: "/images/tour-bulguksa.jpg",
    images: ["/images/tour-bulguksa.jpg"],
    period: "신라 경덕왕 10년 (751년) 창건",
    address: "경상북도 경주시 불국로 385",
    hours: "하절기 07:00~18:00 / 동절기 07:30~17:30",
    fee: "성인 6,000원 / 어린이 4,000원",
    tip: "이른 아침에 방문하면 관광객이 적고 고요한 분위기를 느낄 수 있어요. 석굴암과 함께 하루 코스로 돌아보기 좋습니다.",
    description: [
      "불국사(佛國寺)는 신라 경덕왕 때 재상 김대성이 창건한 사찰로, '불국(佛國, 부처의 나라)'을 지상에 구현하고자 한 신라 불교 건축의 정수입니다.",
      "청운교와 백운교(국보), 연화교와 칠보교(국보), 자하문을 거쳐 들어가면 대웅전 앞뜰에 석가탑(국보)과 다보탑(국보)이 마주 서 있습니다. 이 두 탑은 한국 탑 예술의 최고 걸작으로 꼽힙니다.",
      "1995년 석굴암과 함께 유네스코 세계문화유산으로 등재되었습니다. 현재 사찰은 고려 말 왜구에 의해 불타고 조선 시대에 중수된 것이지만, 석조 구조물들은 신라 시대 원형을 그대로 유지하고 있습니다.",
    ],
    highlights: [
      { icon: "🏛️", title: "국보 7점 보유", text: "다보탑, 석가탑, 청운교·백운교, 금동아미타여래좌상 등" },
      { icon: "🌍", title: "유네스코 세계문화유산", text: "1995년 석굴암과 함께 세계문화유산 등재" },
      { icon: "🌸", title: "계절별 아름다운 경관", text: "봄 벚꽃과 가을 단풍철이 가장 아름다워요" },
      { icon: "🎙️", title: "전문 해설사 투어", text: "경주트립 문화해설사와 함께하면 깊이가 달라집니다" },
    ],
    nearBy: ["석굴암", "국립경주박물관"],
    relatedTour: "bulguksa",
  },
  seokguram: {
    name: "석굴암",
    subtitle: "돌로 빚은 신라의 불심",
    emoji: "🗿",
    gradient: "from-gray-900 via-stone-800 to-amber-950",
    image: "/images/landmark-seokguram.jpg",
    images: ["/images/landmark-seokguram.jpg"],
    period: "신라 경덕왕 10년 (751년) 창건",
    address: "경상북도 경주시 불국로 873-243",
    hours: "하절기 06:30~18:00 / 동절기 07:00~17:30",
    fee: "성인 6,000원 / 어린이 4,000원",
    tip: "새벽 해돋이 시간에 방문하면 동해를 향해 앉은 본존불과 일출이 만드는 장관을 볼 수 있어요. 불국사와 함께 방문하는 코스를 추천합니다.",
    description: [
      "석굴암(石窟庵)은 토함산 정상 부근의 화강암 석굴 안에 모셔진 본존불로 유명한 불교 사원입니다. 불국사를 창건한 김대성이 현세의 부모를 위해 불국사를, 전세의 부모를 위해 석굴암을 창건했다는 이야기가 전해집니다.",
      "본존불은 높이 3.26m의 거대한 화강암 불상으로, 세계에서 가장 아름다운 불상 중 하나로 평가받습니다. 동쪽 바다를 향해 앉아 있어 일출과 함께 바라보면 더욱 신성한 분위기를 자아냅니다.",
      "석굴 내부의 습도와 온도 조절, 음향 설계까지 완벽하게 계산된 당시의 과학적 수준에 현대 건축가들도 놀라움을 금치 못합니다. 1995년 불국사와 함께 유네스코 세계문화유산에 등재되었습니다.",
    ],
    highlights: [
      { icon: "🌅", title: "일출 명소", text: "동해를 향한 본존불과 해돋이가 만드는 환상적인 장면" },
      { icon: "🏗️", title: "신라의 건축 과학", text: "습도·온도·음향 조절까지 설계된 1,200년 전 건축 공학의 결정체" },
      { icon: "🌍", title: "유네스코 세계문화유산", text: "불국사와 함께 1995년 등재된 세계적 문화재" },
      { icon: "🙏", title: "조용한 영적 공간", text: "이른 아침 방문 시 고요하고 신성한 분위기 경험 가능" },
    ],
    nearBy: ["불국사"],
    relatedTour: "bulguksa",
  },
  woljeonggyo: {
    name: "월정교",
    subtitle: "신라 최대 교량의 복원",
    emoji: "🌉",
    gradient: "from-amber-950 via-orange-900 to-red-950",
    image: "/images/landmark-woljeonggyo.jpg",
    images: ["/images/landmark-woljeonggyo.jpg"],
    period: "신라 경덕왕 19년 (760년) 창건 / 2018년 복원",
    address: "경상북도 경주시 교동 274",
    hours: "연중 24시간 개방",
    fee: "무료",
    tip: "해 진 후 조명이 켜지면 진짜 아름다움을 볼 수 있어요. 동궁과월지까지 도보 15분이라 야경 투어 코스로 묶어보세요.",
    description: [
      "월정교(月精橋)는 신라 경덕왕 때 만들어진 남천 위의 다리입니다. 766년 '월정교와 춘양교를 건설하였다'는 기록이 삼국사기에 남아 있어, 신라 시대부터 존재했음을 알 수 있습니다.",
      "2018년 복원된 월정교는 길이 66.15m, 너비 13m의 규모로, 위에 누각이 올려진 독특한 형태입니다. 야간에는 화려한 조명이 들어와 남천의 수면에 반사되는 야경이 장관입니다.",
      "월정교 위 누각에 올라가면 남천과 경주 시내가 한눈에 내려다보입니다. 경주 야경투어의 주요 코스 중 하나로, 동궁과월지·첨성대와 함께 경주 야경 3대 명소로 꼽힙니다.",
    ],
    highlights: [
      { icon: "🌙", title: "경주 야경 3대 명소", text: "동궁과월지, 첨성대와 함께 경주 밤을 대표하는 명소" },
      { icon: "🏯", title: "누각이 있는 다리", text: "다리 위에 누각이 올려진 신라 양식의 특이한 구조" },
      { icon: "📸", title: "수면 반영 사진", text: "야간 조명이 남천에 반사되는 사진이 SNS 인기 포인트" },
      { icon: "🚶", title: "야경투어 필수 코스", text: "경주트립 청사초롱 야경투어의 핵심 방문 장소" },
    ],
    nearBy: ["동궁과월지", "첨성대", "황리단길"],
    relatedTour: "night",
  },
  hwangnidan: {
    name: "황리단길",
    subtitle: "한옥과 감성 카페의 골목",
    emoji: "🏯",
    gradient: "from-rose-950 via-pink-900 to-fuchsia-950",
    image: "/images/landmark-hwangnidan.jpg",
    images: ["/images/landmark-hwangnidan.jpg"],
    period: "근대~현대 (지속 발전 중)",
    address: "경상북도 경주시 황남동 포석로 일대",
    hours: "카페·식당마다 상이 (대부분 10:00~22:00)",
    fee: "무료 (각 가게 이용료 별도)",
    tip: "오전에는 한적한 골목 분위기를, 오후에는 북적이는 거리를 즐길 수 있어요. 한복 대여 후 산책하면 더욱 특별한 경험이 됩니다.",
    description: [
      "황리단길은 경주 황남동 일대의 골목길로, 100년 이상 된 한옥들 사이에 감성적인 카페, 식당, 숍들이 자리 잡아 젊은 여행자들의 핫플레이스로 떠올랐습니다.",
      "서울 이태원의 경리단길에서 이름을 딴 '황리단길'은 경주 최대 고분군인 대릉원 바로 옆에 위치해 있어, 신라 왕릉과 현대적 카페 문화가 공존하는 독특한 분위기를 자랑합니다.",
      "한복을 대여해 입고 황리단길을 산책하거나, 전통 찻집에서 쌍화차 한 잔을 마시며 천년 도시의 감성을 느낄 수 있습니다. 경주 빵, 찰보리빵, 황남빵 등 경주의 대표 먹거리도 이곳에서 맛볼 수 있습니다.",
    ],
    highlights: [
      { icon: "☕", title: "감성 한옥 카페", text: "100년 한옥을 개조한 독특하고 아름다운 카페들" },
      { icon: "👘", title: "한복 대여 & 체험", text: "한복 입고 고분 배경 사진 찍기 — 경주 여행 필수 체험" },
      { icon: "🍞", title: "경주 대표 먹거리", text: "황남빵, 찰보리빵 등 경주만의 전통 먹거리 골목" },
      { icon: "🛍️", title: "인생샷 명소", text: "한옥 골목과 고분이 어우러진 SNS 인기 포토 스팟" },
    ],
    nearBy: ["대릉원", "첨성대", "동궁과월지"],
  },
};

const tourLinks: Record<string, { slug: string; name: string }> = {
  museum: { slug: "museum", name: "국립경주박물관 역사 도슨트 투어" },
  night: { slug: "night", name: "청사초롱 신라별빛야행 야경투어" },
  bulguksa: { slug: "bulguksa", name: "불국사·석굴암 문화해설사 역사투어" },
};

export default function LandmarkPage({ params }: { params: { slug: string } }) {
  const data = landmarkData[params.slug];
  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="경주트립" className="h-14 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="/#landmarks" className="hover:text-gray-900 transition-colors">유적지</a>
            <a href="/#tours" className="hover:text-gray-900 transition-colors">투어 보기</a>
            <a href="/#contact" className="hover:text-gray-900 transition-colors">문의</a>
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

      {/* 히어로 */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden pt-16">
        <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient}`} />
        <img
          src={data.image}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="text-5xl mb-4">{data.emoji}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">{data.name}</h1>
          <p className="text-amber-300 text-lg md:text-xl font-medium">{data.subtitle}</p>
        </div>
      </section>

      {/* 기본 정보 */}
      <section className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { icon: "📅", label: "시대", value: data.period },
            { icon: "📍", label: "주소", value: data.address },
            { icon: "🕐", label: "운영시간", value: data.hours },
            { icon: "💰", label: "입장료", value: data.fee },
          ].map((info) => (
            <div key={info.label} className="flex flex-col gap-1">
              <span className="text-amber-600 font-medium text-xs">{info.icon} {info.label}</span>
              <span className="text-gray-700 leading-snug">{info.value}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 소개 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">소개</h2>
          <div className="space-y-4">
            {data.description.map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-base">{para}</p>
            ))}
          </div>
        </section>

        {/* 이런 점이 특별해요 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">이런 점이 특별해요</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.highlights.map((h) => (
              <div key={h.title} className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors">
                <span className="text-2xl flex-shrink-0">{h.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{h.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 여행 팁 */}
        <section className="mb-16">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-amber-800 mb-3">💡 여행 팁</h2>
            <p className="text-amber-700 leading-relaxed">{data.tip}</p>
          </div>
        </section>

        {/* 관련 투어 */}
        {data.relatedTour && tourLinks[data.relatedTour] && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">이곳을 방문하는 경주트립 투어</h2>
            <a
              href={`/tours/${tourLinks[data.relatedTour].slug}`}
              className="flex items-center justify-between p-5 rounded-2xl bg-gray-900 hover:bg-amber-600 text-white transition-colors group"
            >
              <div>
                <p className="text-xs text-white/60 mb-1">RECOMMENDED TOUR</p>
                <p className="font-bold text-lg">{tourLinks[data.relatedTour].name}</p>
                <p className="text-white/70 text-sm mt-1">전문 문화해설사와 함께하는 특별한 경주 여행</p>
              </div>
              <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </section>
        )}

        {/* 주변 유적지 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">함께 보면 좋은 유적지</h2>
          <div className="flex flex-wrap gap-3">
            {data.nearBy.map((name) => {
              const slug = Object.keys(landmarkData).find((k) => landmarkData[k].name === name);
              return (
                <a
                  key={name}
                  href={slug ? `/landmarks/${slug}` : "#"}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-amber-400 hover:bg-amber-50 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {slug && <span>{landmarkData[slug].emoji}</span>}
                  {name}
                </a>
              );
            })}
          </div>
        </section>

        {/* 돌아가기 */}
        <div className="text-center">
          <a
            href="/#landmarks"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors"
          >
            ← 유적지 목록으로 돌아가기
          </a>
        </div>
      </div>

      {/* 문의 CTA */}
      <section className="py-16 bg-gray-950 text-white text-center">
        <p className="text-amber-400 text-sm tracking-widest mb-3">GYEONGJU TRIP</p>
        <h2 className="text-2xl font-bold mb-4">{data.name}를 전문 해설사와 함께 여행해보세요</h2>
        <p className="text-gray-400 mb-8 text-sm">문화해설사의 이야기와 함께하면 같은 유적지도 완전히 달라집니다</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://open.kakao.com/gjtrip" target="_blank" rel="noopener noreferrer"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-colors">
            💬 카카오톡 문의
          </a>
          <a href="/#tours" className="border border-white/30 hover:border-white text-white/70 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors">
            투어 프로그램 보기
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-950 border-t border-gray-800 text-gray-500 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2026 경주트립. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
