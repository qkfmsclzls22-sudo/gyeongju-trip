import type { Metadata } from "next";
import { CtaBanner, SiteFooter, SiteHeader } from "@/app/components/site";
import { IconGuide, IconMedal, IconStar, IconTower, IconUsers } from "@/app/components/icons";

export const metadata: Metadata = {
  title: "기업소개 - 경주트립",
  description:
    "경주트립은 경주 여행의 즐거움과 알찬 정보를 함께 전하는 경주 전문 여행 플랫폼입니다. 기업·기관 단체와 학교 수학여행 진행 이력을 확인하세요.",
};

const doing = [
  {
    Icon: IconGuide,
    title: "해설사와 함께하는 투어",
    text: "국립경주박물관, 불국사·석굴암, 청사초롱 야경투어까지. 혼자 보면 지나칠 이야기를 해설사가 곁에서 풀어드립니다.",
  },
  {
    Icon: IconTower,
    title: "경주 유적지 정보",
    text: "첨성대부터 황리단길까지, 언제 가면 좋은지·무엇을 봐야 하는지·어디서 찍으면 예쁜지까지 정리해 안내합니다.",
  },
  {
    Icon: IconUsers,
    title: "기업·기관 단체 진행",
    text: "임직원 워크숍, 연수, 수학여행 등 단체 일정에 맞춰 코스와 시간을 조율합니다. 1,000명 규모까지 진행한 경험이 있습니다.",
  },
];

const stats = [
  { value: "4.92", label: "평균 별점" },
  { value: "1,300+", label: "누적 리뷰" },
  { value: "1,500+", label: "단체·MICE 진행 인원" },
];

const history = [
  { date: "2025.09", text: "경주트립 설립" },
  { date: "2025.11", text: "투어 프로그램 개발" },
  { date: "2026.02", text: "경북관광기업지원센터 입주기업 선정" },
  { date: "2026.02", text: "네이버 스마트스토어 프리미엄 우수셀러 달성" },
  { date: "2026.05", text: "경북관광스타트업 공모전 선정" },
  { date: "2026.06", text: "경주관광 MICE 얼라이언스 가입" },
  { date: "2026.09", text: "해오름동맹 혁신포럼 경주시 대표기업 선정" },
];

const corporateClients = [
  { name: "롯데GRS", count: "1,000여명", program: "국립경주박물관 도슨트투어" },
  {
    name: "한국수력원자력 월성원자력본부",
    count: "40여명",
    program: "원전사후관리처 · 국립경주박물관 도슨트투어",
  },
  { name: "부산교육연수원", count: "100여명", program: "원감교육 · 국립경주박물관 도슨트투어" },
  { name: "금산군가족센터", count: "70여명", program: "국립경주박물관 도슨트투어" },
  { name: "풍산금속", count: "VIP", program: "역사투어 (영어 진행)" },
  { name: "슈프리마", count: "70여명", program: "경주 야경투어 신라별빛야행" },
  { name: "군산시공무원노동조합", count: "40여명", program: "국립경주박물관 도슨트투어" },
  { name: "한국체육진흥공단", count: "30여명", program: "불국사투어" },
];

const schoolClients = [
  {
    name: "거제 중곡초등학교",
    count: "140여명",
    program: "불국사투어 · 국립경주박물관투어 · 야경투어",
  },
  { name: "허들링", count: "40여명", program: "야경투어 · 불국사투어" },
  { name: "서울경기초등학교", count: "40여명", program: "역사투어" },
];

const companyInfo = [
  { label: "상호", value: "경주트립" },
  { label: "대표자", value: "김봉열" },
  { label: "설립일", value: "2025년 9월" },
  { label: "사업자등록번호", value: "694-75-00685" },
  { label: "주소", value: "경상북도 경주시 계림로107 경북관광기업지원센터 6층" },
  { label: "일반 문의", value: "010-8402-8543 (문자 요망)" },
  { label: "단체 문의", value: "010-5552-7971" },
  { label: "이메일", value: "gjtrip11@naver.com" },
  { label: "운영시간", value: "매일 09:00 ~ 18:00 (연중무휴)" },
];

function ClientList({ items }: { items: { name: string; count: string; program: string }[] }) {
  return (
    <div className="bg-white rounded-3xl border border-brand-50 divide-y divide-brand-50 overflow-hidden">
      {items.map((c) => (
        <div key={c.name} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 p-5">
          <span className="font-bold text-ink text-sm sm:w-60 shrink-0">{c.name}</span>
          <span className="text-sm text-gray-500 flex-1 leading-relaxed">{c.program}</span>
          <span className="self-start sm:self-auto text-xs font-semibold text-brand-600 bg-blush px-2.5 py-1 rounded-full shrink-0">
            {c.count}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="relative overflow-hidden bg-cream pt-28 pb-16 md:pt-36 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-brand-100 blur-3xl opacity-60"
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-4">COMPANY</p>
          <h1 className="text-4xl md:text-5xl font-black text-ink leading-[1.2] tracking-tight mb-5">
            경주를 가장 재미있게,
            <br />
            가장 <span className="text-brand-500">의미있게</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            경주트립은 경주 여행의 즐거움과 알찬 정보를 함께 전하는 경주 전문 여행 플랫폼입니다.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-3">OUR STORY</p>
          <h2 className="text-3xl font-black text-ink tracking-tight mb-8">
            그냥 지나치면 돌덩이,
            <br />
            알고 보면 천년의 이야기
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              경주는 도시 전체가 박물관이라고 불립니다. 그런데 정작 다녀온 사람들에게 물어보면
              &ldquo;돌탑이랑 무덤 봤다&rdquo;는 말이 돌아오곤 합니다. 아는 만큼 보이는 곳인데,
              알려주는 사람이 없었기 때문입니다.
            </p>
            <p>
              경주트립은 여기서 시작했습니다. 유물 앞에 붙은 설명문을 읽어주는 것이 아니라, 그
              시대 사람들이 어떤 마음으로 이것을 만들었는지 이야기로 풀어드립니다. 재미없으면
              기억에 남지 않고, 기억에 남지 않으면 여행이 아니니까요.
            </p>
            <p>
              투어뿐 아니라 경주 유적지 정보, 방문하기 좋은 시간대, 사진 찍기 좋은 자리까지
              여행에 필요한 정보를 함께 정리해 전합니다. 경주에 오는 분들이 가장 재미있게, 가장
              의미있게 돌아가시는 것이 저희의 목표입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-3">WHAT WE DO</p>
          <h2 className="text-3xl font-black text-ink tracking-tight mb-10">경주트립이 하는 일</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {doing.map(({ Icon, title, text }) => (
              <div key={title} className="bg-white rounded-3xl border border-brand-50 p-7">
                <span className="inline-flex w-12 h-12 rounded-2xl bg-blush text-brand-500 items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="font-bold text-ink mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-blush">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-3xl px-6 py-8 text-center">
                <div className="text-3xl font-black text-brand-500 mb-1.5">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-3xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2 font-semibold text-ink">
              <IconMedal className="w-5 h-5 text-sun-500" />
              네이버 스마트스토어 프리미엄 우수셀러
            </span>
            <span className="inline-flex items-center gap-1.5 text-gray-500">
              <IconStar className="w-4 h-4 text-sun-400" />
              경북관광기업지원센터 입주기업
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-3">HISTORY</p>
          <h2 className="text-3xl font-black text-ink tracking-tight mb-10">연혁</h2>
          <ol>
            {history.map((h, i) => (
              <li key={`${h.date}-${i}`} className="grid grid-cols-[4.5rem_1.25rem_1fr] gap-x-4">
                <span className="text-sm font-black text-brand-500 pt-4">{h.date}</span>
                <span className="relative flex justify-center">
                  <span
                    className={`w-px bg-brand-100 ${i === history.length - 1 ? "h-5" : "h-full"}`}
                  />
                  <span className="absolute top-4 w-2.5 h-2.5 rounded-full bg-brand-500 ring-4 ring-white" />
                </span>
                <span className="text-ink font-medium py-4 leading-snug">{h.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-3">CLIENTS</p>
          <h2 className="text-3xl font-black text-ink tracking-tight mb-3">단체 진행 이력</h2>
          <p className="text-gray-500 mb-10">
            기업·기관 워크숍부터 학교 수학여행까지, 규모에 맞춰 진행해왔습니다.
          </p>

          <h3 className="font-bold text-ink mb-4">기업·기관 및 MICE</h3>
          <div className="mb-10">
            <ClientList items={corporateClients} />
          </div>

          <h3 className="font-bold text-ink mb-4">학교 수학여행 및 단체</h3>
          <ClientList items={schoolClients} />
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-brand-500 font-bold text-xs tracking-[0.2em] mb-3">COMPANY INFO</p>
          <h2 className="text-3xl font-black text-ink tracking-tight mb-8">회사 정보</h2>
          <dl className="bg-cream rounded-3xl p-7 space-y-4 text-sm">
            {companyInfo.map((row) => (
              <div key={row.label} className="flex flex-col sm:flex-row gap-1 sm:gap-6">
                <dt className="text-gray-400 sm:w-36 shrink-0">{row.label}</dt>
                <dd className="text-gray-700 leading-relaxed">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBanner
        title="단체 일정도 맞춰 진행해드립니다"
        desc="인원과 일정만 알려주시면 코스와 견적을 정리해 보내드릴게요"
      />

      <SiteFooter />
    </main>
  );
}
