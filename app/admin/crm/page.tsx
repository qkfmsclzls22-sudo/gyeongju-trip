'use client';

import { useEffect, useMemo, useState } from 'react';

type Segment = 'VIP' | '재구매' | '신규' | '휴면위험';
type Customer = {
  id: string;
  name: string;
  phone: string;
  segment: Segment;
  orders: number;
  revenue: number;
  people: number;
  firstVisit: string;
  lastVisit: string;
  lastOrder: string;
  products: string[];
  source: string;
};

type CrmResponse = {
  configured: boolean;
  customers: Customer[];
  message?: string;
};

const money = new Intl.NumberFormat('ko-KR');
const segmentStyle: Record<Segment, string> = {
  VIP: 'bg-amber-50 text-amber-700 ring-amber-200',
  재구매: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  신규: 'bg-blue-50 text-blue-700 ring-blue-200',
  휴면위험: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export default function CrmPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState<'전체' | Segment>('전체');
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('일자별 자동주문현황 연결 확인 중');

  async function loadCustomers() {
    setLoading(true);
    try {
      const response = await fetch('/api/crm', { cache: 'no-store' });
      const data: CrmResponse = await response.json();
      setCustomers(data.customers || []);
      setSelectedId((current) => current || data.customers?.[0]?.id || '');
      setStatus(response.ok ? '일자별 자동주문현황 · 실데이터 연결됨' : (data.message || '연결 설정 필요'));
    } catch {
      setCustomers([]);
      setStatus('CRM 데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadCustomers(); }, []);

  const selected = customers.find((customer) => customer.id === selectedId) || customers[0];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((customer) => {
      const matchesSegment = segment === '전체' || customer.segment === segment;
      const matchesQuery = !q || [customer.id, customer.name, customer.phone, customer.source, ...customer.products]
        .some((value) => value.toLowerCase().includes(q));
      return matchesSegment && matchesQuery;
    });
  }, [customers, query, segment]);

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.revenue, 0);
  const repeatCustomers = customers.filter((customer) => customer.orders >= 2).length;
  const repeatRate = customers.length ? Math.round((repeatCustomers / customers.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-5 py-7 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#243b64]">GYEONGJU TRIP · ADMIN</p>
            <h1 className="text-3xl font-bold tracking-tight">고객 CRM</h1>
            <p className="mt-2 text-sm text-slate-500">기존 자동주문현황을 고객 단위로 통합해 재구매와 교차판매 기회를 확인합니다.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-2 text-xs font-bold ${customers.length ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{status}</span>
            <button onClick={() => void loadCustomers()} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm">새로고침</button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Metric label="전체 고객" value={loading ? '—' : `${customers.length.toLocaleString()}명`} sub="전화번호 기준 통합" />
          <Metric label="누적 결제" value={loading ? '—' : `${money.format(totalRevenue)}원`} sub="원본 주문금액 합계" />
          <Metric label="재구매 고객" value={loading ? '—' : `${repeatCustomers}명`} sub={`${repeatRate}% · 2회 이상 이용`} />
          <Metric label="휴면 위험" value={loading ? '—' : `${customers.filter((c) => c.segment === '휴면위험').length}명`} sub="최근 이용 180일 초과" emphasis />
        </section>

        {!loading && customers.length === 0 && (
          <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="font-bold text-amber-900">시트 집계는 완료됐고, 웹 연결 주소 설정만 남았습니다.</h2>
            <p className="mt-2 text-sm leading-6 text-amber-800">원본 `일자별 자동주문현황`의 숨김 `_CRM` 탭은 자동 집계 중입니다. 웹에서는 개인정보를 직접 공개하지 않고 Apps Script JSON 주소를 서버 환경변수 `CRM_DATA_URL`로 읽도록 구성했습니다.</p>
          </section>
        )}

        {customers.length > 0 && (
          <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_0.8fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-4 lg:p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {(['전체', 'VIP', '재구매', '신규', '휴면위험'] as const).map((item) => (
                      <button key={item} onClick={() => setSegment(item)} className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${segment === item ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{item}</button>
                    ))}
                  </div>
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="고객, 상품 검색" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#243b64] focus:bg-white lg:w-72" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold text-slate-500"><tr><th className="px-5 py-3">고객</th><th className="px-5 py-3">등급</th><th className="px-5 py-3">이용횟수</th><th className="px-5 py-3">누적결제</th><th className="px-5 py-3">누적인원</th><th className="px-5 py-3">최근이용</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((customer) => (
                      <tr key={customer.id} onClick={() => setSelectedId(customer.id)} className={`cursor-pointer transition hover:bg-slate-50 ${selected?.id === customer.id ? 'bg-[#f2f5fa]' : ''}`}>
                        <td className="px-5 py-4"><div className="font-semibold">{customer.name}</div><div className="mt-1 text-xs text-slate-400">{customer.phone}</div></td>
                        <td className="px-5 py-4"><SegmentBadge segment={customer.segment} /></td>
                        <td className="px-5 py-4 font-medium">{customer.orders}회</td>
                        <td className="px-5 py-4 font-semibold">{money.format(customer.revenue)}원</td>
                        <td className="px-5 py-4">{customer.people}명</td>
                        <td className="px-5 py-4 text-slate-600">{customer.lastVisit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && <div className="p-10 text-center text-sm text-slate-400">조건에 맞는 고객이 없습니다.</div>}
              </div>
            </div>

            {selected && (
              <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-5 xl:self-start">
                <div className="flex items-center gap-2"><h2 className="text-xl font-bold">{selected.name}</h2><SegmentBadge segment={selected.segment} /></div>
                <p className="mt-1 text-sm text-slate-400">{selected.phone}</p>
                <div className="mt-5 grid grid-cols-2 gap-3"><MiniMetric label="이용횟수" value={`${selected.orders}회`} /><MiniMetric label="누적결제" value={`${money.format(selected.revenue)}원`} /></div>
                <div className="mt-5 border-t border-slate-100 pt-5"><h3 className="text-sm font-bold">이용 상품</h3><div className="mt-3 flex flex-wrap gap-2">{selected.products.map((product) => <span key={product} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">{product}</span>)}</div></div>
                <div className="mt-5 border-t border-slate-100 pt-5"><h3 className="text-sm font-bold">추천 액션</h3><div className="mt-3 rounded-xl bg-[#f2f5fa] p-4 text-sm font-semibold text-[#243b64]">{getRecommendation(selected)}</div></div>
                <div className="mt-5 border-t border-slate-100 pt-5 text-sm"><div className="flex justify-between"><span className="text-slate-400">첫 이용</span><span>{selected.firstVisit || '-'}</span></div><div className="mt-2 flex justify-between"><span className="text-slate-400">최근 주문</span><span>{selected.lastOrder || '-'}</span></div><div className="mt-2 flex justify-between"><span className="text-slate-400">원본</span><span>일자별 자동주문현황</span></div></div>
              </aside>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function Metric({ label, value, sub, emphasis = false }: { label: string; value: string; sub: string; emphasis?: boolean }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-sm font-medium text-slate-500">{label}</div><div className={`mt-2 text-2xl font-bold ${emphasis ? 'text-rose-600' : ''}`}>{value}</div><div className="mt-1 text-xs text-slate-400">{sub}</div></div>;
}
function MiniMetric({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs text-slate-400">{label}</div><div className="mt-1 font-bold">{value}</div></div>; }
function SegmentBadge({ segment }: { segment: Segment }) { return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${segmentStyle[segment]}`}>{segment}</span>; }
function getRecommendation(customer: Customer) {
  if (customer.segment === '휴면위험') return '계절별 신규 콘텐츠로 재방문 반응을 테스트할 고객입니다.';
  if (!customer.products.includes('야경')) return '야경투어 미이용 고객 → 교차판매 후보';
  if (!customer.products.includes('불국사')) return '불국사 도슨트 미이용 고객 → 교차판매 후보';
  if (!customer.products.includes('박물관')) return '박물관 도슨트 미이용 고객 → 교차판매 후보';
  if (customer.orders >= 4) return '충성고객 → 신상품 선오픈·우선예약 후보';
  return '이용상품과 최근 방문일을 기준으로 재방문 캠페인을 테스트할 수 있습니다.';
}
