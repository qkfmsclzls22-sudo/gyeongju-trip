import {
  IconArrow,
  IconClock,
  IconInfo,
  IconMapPin,
  IconMedal,
  IconPhone,
  IconStar,
  IconUsers,
  type IconProps,
} from "./icons";

export function TourHero({
  category,
  title,
  subtitle,
  image,
  rating,
  reviews,
  discount,
}: {
  category: string;
  title: React.ReactNode;
  subtitle: string;
  image: string;
  rating: number;
  reviews: number;
  discount: number;
}) {
  return (
    <section className="bg-cream pt-24 pb-10 md:pt-32">
      <div className="max-w-4xl mx-auto px-4">
        <span className="inline-block bg-blush text-brand-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {category}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-ink leading-[1.2] tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-gray-500 mb-6">{subtitle}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 bg-white text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
            <IconMedal className="w-3.5 h-3.5 text-sun-500" />
            네이버 우수셀러 프리미엄
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
            <IconStar className="w-3.5 h-3.5 text-sun-400" />
            <span className="font-semibold text-ink">{rating}</span>
            리뷰 {reviews.toLocaleString()}
          </span>
          <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {discount}% 할인
          </span>
        </div>

        <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-blush">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({
  Icon,
  children,
}: {
  Icon: (p: IconProps) => React.ReactElement;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-xl font-black text-ink tracking-tight mb-5">
      <span className="w-9 h-9 rounded-xl bg-blush text-brand-500 flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5" />
      </span>
      {children}
    </h2>
  );
}

export function InfoTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="bg-cream rounded-2xl p-6 space-y-3.5 text-sm">
      {rows.map((row) => (
        <div key={row.label} className="flex gap-4">
          <dt className="text-gray-400 w-20 shrink-0">{row.label}</dt>
          <dd className="text-gray-700 leading-relaxed">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PointCard({
  title,
  highlight,
  note,
  children,
}: {
  title: string;
  highlight?: boolean;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border ${
        highlight ? "border-brand-200 bg-brand-50" : "border-brand-50 bg-white"
      }`}
    >
      <p className={`font-bold mb-2.5 ${highlight ? "text-brand-700" : "text-ink"}`}>{title}</p>
      <div
        className={`text-sm leading-relaxed ${highlight ? "text-brand-700/90" : "text-gray-600"}`}
      >
        {children}
      </div>
      {note && (
        <p className="flex gap-1.5 text-xs text-gray-400 mt-4">
          <IconInfo className="w-3.5 h-3.5 shrink-0 mt-px" />
          {note}
        </p>
      )}
    </div>
  );
}

export function RecommendList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-sm text-gray-700">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="shrink-0 w-5 h-5 rounded-full bg-blush text-brand-500 flex items-center justify-center mt-px">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5" aria-hidden="true">
              <path d="m4.8 12.6 4.8 4.8L19.2 6.6" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

const refundRows = [
  { when: "투어 3일 전", rate: "100% 환불" },
  { when: "투어 2일 전", rate: "70% 환불" },
  { when: "투어 1일 전", rate: "50% 환불" },
  { when: "당일 취소", rate: "환불 불가" },
  { when: "모집인원 미달 시", rate: "일자 무관 전액 환불" },
];

export function RefundTable({ note }: { note: string }) {
  return (
    <div className="bg-cream rounded-2xl p-6 text-sm">
      <div className="space-y-2.5">
        {refundRows.map((row) => (
          <div
            key={row.when}
            className="flex justify-between border-b border-brand-100 pb-2.5 last:border-0 last:pb-0"
          >
            <span className="text-gray-500">{row.when}</span>
            <span className="font-semibold text-ink">{row.rate}</span>
          </div>
        ))}
      </div>
      <p className="flex gap-1.5 text-xs text-gray-400 mt-4 pt-4 border-t border-brand-100">
        <IconInfo className="w-3.5 h-3.5 shrink-0 mt-px" />
        {note}
      </p>
    </div>
  );
}

export function SafetyNote({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-cream rounded-2xl p-6">
      <p className="font-semibold text-gray-500 text-sm mb-2">안전 및 보험 안내</p>
      <p className="text-xs text-gray-400 leading-relaxed">{children}</p>
    </section>
  );
}

export function BookingCard({
  originalPrice,
  price,
  childPrice,
  priceNote,
  times,
  duration,
  minPeople,
  meetingPoint,
}: {
  originalPrice: number;
  price: number;
  childPrice?: number;
  priceNote: string;
  times: string;
  duration: string;
  minPeople: string;
  meetingPoint: string;
}) {
  const info = [
    { Icon: IconClock, text: times },
    { Icon: IconInfo, text: duration },
    { Icon: IconUsers, text: minPeople },
    { Icon: IconMapPin, text: meetingPoint },
  ];

  return (
    <div className="sticky top-24 bg-white border border-brand-100 rounded-3xl p-6 shadow-sm">
      <div className="text-xs text-gray-300 line-through">{originalPrice.toLocaleString()}원</div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-black text-ink">{price.toLocaleString()}</span>
        <span className="text-base font-medium text-gray-500">원</span>
      </div>
      {childPrice && (
        <div className="text-xs text-gray-400 mb-1">어린이 {childPrice.toLocaleString()}원</div>
      )}
      <div className="text-xs font-semibold text-brand-600 mb-6">{priceNote}</div>

      <ul className="space-y-2.5 text-xs text-gray-600 mb-6">
        {info.map(({ Icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-brand-400 shrink-0" />
            {text}
          </li>
        ))}
      </ul>

      <a
        href="https://smartstore.naver.com/gjtrip"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-2xl transition-colors mb-2.5"
      >
        네이버스토어에서 예약
        <IconArrow className="w-4 h-4" />
      </a>
      <a
        href="tel:010-8402-8543"
        className="flex items-center justify-center gap-2 w-full bg-white hover:bg-cream border border-brand-100 text-ink font-semibold py-3.5 rounded-2xl transition-colors text-sm"
      >
        <IconPhone className="w-4 h-4 text-brand-500" />
        010-8402-8543
      </a>
      <p className="text-xs text-gray-400 text-center mt-4">단체 문의 010-5552-7971</p>
    </div>
  );
}
