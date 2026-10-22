type Segment = 'VIP' | '재구매' | '신규' | '휴면위험';

type UpstreamCustomer = {
  id?: string;
  name?: string;
  phone?: string;
  segment?: Segment;
  orders?: number;
  revenue?: number;
  people?: number;
  firstVisit?: string;
  lastVisit?: string;
  lastOrder?: string;
  products?: string[] | string;
  source?: string;
};

function maskName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return '고객';
  if (trimmed.length === 1) return `${trimmed}○`;
  return `${trimmed[0]}${'○'.repeat(Math.max(1, trimmed.length - 1))}`;
}

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 11) return '010-****-****';
  return `${digits.slice(0, 3)}-****-${digits.slice(-4)}`;
}

function normalizeProducts(products: UpstreamCustomer['products']) {
  if (Array.isArray(products)) return products.filter(Boolean);
  return String(products || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function GET() {
  const dataUrl = process.env.CRM_DATA_URL;
  if (!dataUrl) {
    return Response.json(
      { configured: false, customers: [], message: 'CRM 데이터 연결 주소가 아직 설정되지 않았습니다.' },
      { status: 503 },
    );
  }

  try {
    const url = new URL(dataUrl);
    if (!url.searchParams.has('action')) url.searchParams.set('action', 'crm');

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`upstream ${response.status}`);

    const payload = await response.json();
    const rows: UpstreamCustomer[] = Array.isArray(payload) ? payload : payload.customers || [];
    const showPii = process.env.CRM_SHOW_PII === 'true';

    const customers = rows
      .filter((row) => row && row.id && row.segment && row.lastVisit)
      .map((row) => ({
        id: String(row.id),
        name: showPii ? String(row.name || '고객') : maskName(String(row.name || '고객')),
        phone: showPii ? String(row.phone || '') : maskPhone(String(row.phone || '')),
        segment: row.segment,
        orders: Number(row.orders || 0),
        revenue: Number(row.revenue || 0),
        people: Number(row.people || 0),
        firstVisit: String(row.firstVisit || ''),
        lastVisit: String(row.lastVisit || ''),
        lastOrder: String(row.lastOrder || ''),
        products: normalizeProducts(row.products),
        source: String(row.source || '일자별 자동주문현황'),
      }));

    return Response.json({ configured: true, customers });
  } catch (error) {
    console.error('crm data error:', error);
    return Response.json(
      { configured: true, customers: [], message: 'CRM 원본 데이터를 불러오지 못했습니다.' },
      { status: 502 },
    );
  }
}
