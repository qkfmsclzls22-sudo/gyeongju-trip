'use client';

import { useMemo, useState } from 'react';

type Customer = {
  id: string;
  name: string;
  phone: string;
  segment: 'VIP' | '재구매' | '신규' | '휴면위험';
  orders: number;
  revenue: number;
  lastVisit: string;
  products: string[];
  source: '스마트스토어' | '홈페이지' | '단체문의';
};

const customers: Customer[] = [
  { id: 'C-1042', name: '김○○', phone: '010-****-4281', segment: 'VIP', orders: 5, revenue: 243000, lastVisit: '2026-08-28', products: ['박물관', '불국사', '야경'], source: '스마트스토어' },
  { id: 'C-1039', name: '박○○', phone: '010-****-7712', segment: '재구매', orders: 3, revenue: 128700, lastVisit: '2026-08-21', products: ['박물관', '야경'], source: '스마트스토어' },
  { id: 'C-1033', name: '이○○', phone: '010-****-1538', segment: '신규', orders: 1, revenue: 39600, lastVisit: '2026-09-02', products: ['불국사'], source: '홈페이지' },
  { id: 'C-1018', name: '최○○', phone: '010-****-9824', segment: '휴면위험', orders: 2, revenue: 79200, lastVisit: '2026-03-14', products: ['박물관'], source: '스마트스토어' },
  { id: 'C-1007', name: '정○○', phone: '010-****-6104', segment: '재구매', orders: 2, revenue: 101400, lastVisit: '2026-07-31', products: ['불국사', '야경'], source: '단체문의' },
];

const money = new Intl.NumberFormat('ko-KR');

const segmentStyle: Record<Customer['segment'], string> = {
  VIP: 'bg-amber-50 text-amber-700 ring-amber-200',
  재구매: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  신규: 'bg-blue-50 text-blue-700 ring-blue-200',
  휴면위험: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export default function CrmPage() {
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState<'전체' | Customer['segment']>('전체');
  const [selected, setSelected] = useState<Customer>(customers[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((customer) => {
      const matchesSegment = segment === '전체' || customer.segment === segment;
      const matchesQuery = !q || [customer.id, customer.name, customer.phone, customer.source, ...customer.products]
        .some((value) => value.toLowerCase().includes(q));
      return matchesSegment && matchesQuery;
    });
  }, [query, segment]);

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.revenue, 0);
  const repeatCustomers = customers.filter((customer) => customer.orders >= 2).length;

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#243b64]">GYEONGJU TRIP · ADMIN</p>
            <h1 className="text-3xl font-bold tracking-tight">고객 CRM</h1>
            <p className="mt-2 text-sm text-slate-500">예약 이력과 고객 행동을 한 화면에서 보고, 재구매·교차판매 기회를 찾습니다.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm">CSV 가져오기</button>
            <button className="rounded-xl bg-[#243b64] px-4 py-2.5 text-sm font-semibold text-white shadow-sm">네이버 연동 준비</button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Metric label="전체 고객" value={`${customers.length.toLocaleString()}명`} sub="통합 고객 기준" />
          <Metric label="누적 매출" value={`${money.format(totalRevenue)}원`} sub="샘플 데이터 기준" />
          <Metric label="재구매 고객" value={`${repeatCustomers}명`} sub={`${Math.round((repeatCustomers / customers.length) * 100)}%`} />
          <Metric label="휴면 위험" value={`${customers.filter((c) => c.segment === '휴면위험').length}명`} sub="180일 이상 미방문" emphasis />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_0.8fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-4 lg:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {(['전체', 'VIP', '재구매', '신규', '휴면위험'] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => setSegment(item)}
                      className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${segment === item ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="고객, 상품, 유입경로 검색"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-[#243b64] focus:bg-white lg:w-72"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3">고객</th>
                    <th className="px-5 py-3">등급</th>
                    <th className="px-5 py-3">이용횟수</th>
                    <th className="px-5 py-3">누적결제</th>
                    <th className="px-5 py-3">최근이용</th>
                    <th className="px-5 py-3">유입</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((customer) => (
                    <tr
                      key={customer.id}
                      onClick={() => setSelected(customer)}
                      className={`cursor-pointer transition hover:bg-slate-50 ${selected.id === customer.id ? 'bg-[#f2f5fa]' : ''}`}
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900">{customer.name}</div>
                        <div className="mt-1 text-xs text-slate-400">{customer.phone} · {customer.id}</div>
                      </td>
                      <td className="px-5 py-4"><SegmentBadge segment={customer.segment} /></td>
                      <td className="px-5 py-4 font-medium">{customer.orders}회</td>
                      <td className="px-5 py-4 font-semibold">{money.format(customer.revenue)}원</td>
                      <td className="px-5 py-4 text-slate-600">{customer.lastVisit}</td>
                      <td className="px-5 py-4 text-slate-600">{customer.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <div className="p-10 text-center text-sm text-slate-400">조건에 맞는 고객이 없습니다.</div>}
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-5 xl:self-start">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{selected.name}</h2>
                  <SegmentBadge segment={selected.segment} />
                </div>
                <p className="mt-1 text-sm text-slate-400">{selected.phone} · {selected.id}</p>
              </div>
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold">메모</button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <MiniMetric label="이용횟수" value={`${selected.orders}회`} />
              <MiniMetric label="누적결제" value={`${money.format(selected.revenue)}원`} />
            </div>

            <div className="mt-5 border-t border-slate-100 pt-5">
              <h3 className="text-sm font-bold">이용 상품</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.products.map((product) => <span key={product} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">{product}</span>)}
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-5">
              <h3 className="text-sm font-bold">AI 추천 액션</h3>
              <div className="mt-3 rounded-xl bg-[#f2f5fa] p-4">
                <p className="text-sm font-semibold text-[#243b64]">{getRecommendation(selected)}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">실제 운영 시 최근 이용일, 구매 상품, 동반 유형, 문의 이력과 마케팅 동의를 함께 반영합니다.</p>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-5">
              <h3 className="text-sm font-bold">데이터 출처</h3>
              <p className="mt-2 text-sm text-slate-600">{selected.source}</p>
              <p className="mt-1 text-xs text-slate-400">네이버 주문번호 → 내부 고객ID로 매핑 예정</p>
            </div>
          </aside>
        </section>

        <section className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-5">
          <h2 className="text-base font-bold">네이버 스마트스토어 연동 구조</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {['커머스 API 주문 수집', '고객 식별·중복 통합', 'CRM DB 저장', '세그먼트·마케팅 액션'].map((label, index) => (
              <div key={label} className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs font-bold text-[#243b64]">STEP {index + 1}</div>
                <div className="mt-1 text-sm font-semibold">{label}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">※ 현재 화면은 개인정보를 포함하지 않는 CRM UI 시제품입니다. 실데이터 연동 전 관리자 인증, DB, 개인정보 보관·마케팅 동의 정책을 먼저 적용해야 합니다.</p>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value, sub, emphasis = false }: { label: string; value: string; sub: string; emphasis?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-medium text-slate-500">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${emphasis ? 'text-rose-600' : 'text-slate-900'}`}>{value}</div>
      <div className="mt-1 text-xs text-slate-400">{sub}</div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs text-slate-400">{label}</div><div className="mt-1 text-base font-bold">{value}</div></div>;
}

function SegmentBadge({ segment }: { segment: Customer['segment'] }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${segmentStyle[segment]}`}>{segment}</span>;
}

function getRecommendation(customer: Customer) {
  if (customer.segment === '휴면위험') return '재방문 쿠폰보다는 계절별 신규 콘텐츠 안내가 우선입니다.';
  if (!customer.products.includes('야경')) return '박물관·불국사 이용 고객 → 야경투어 교차판매 후보';
  if (!customer.products.includes('불국사')) return '박물관·야경 이용 고객 → 불국사 도슨트 추천 후보';
  if (customer.orders >= 4) return '충성고객 → 신상품 선오픈·우선예약 그룹으로 관리';
  return '최근 이용 후 60~120일 사이 재방문 콘텐츠를 테스트해볼 수 있습니다.';
}
