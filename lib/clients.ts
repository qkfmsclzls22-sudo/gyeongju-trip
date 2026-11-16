/** 단체·MICE 진행 이력. 기업소개·홈·파트너 페이지가 함께 씁니다. */
export interface ClientRecord {
  name: string;
  count: string;
  program: string;
}

export const corporateClients: ClientRecord[] = [
  { name: "교보생명", count: "170명", program: "불국사 역사문화 해설투어" },
  { name: "롯데GRS", count: "1,000여명", program: "국립경주박물관 도슨트투어" },
  {
    name: "한국수력원자력 월성원자력본부",
    count: "40여명",
    program: "원전사후관리처 · 국립경주박물관 도슨트투어",
  },
  {
    name: "부산교육연수원",
    count: "100여명",
    program: "원감교육 · 국립경주박물관 도슨트투어",
  },
  {
    name: "금산군가족센터",
    count: "70여명",
    program: "국립경주박물관 도슨트투어",
  },
  { name: "풍산금속", count: "VIP", program: "역사투어 (영어 진행)" },
  { name: "슈프리마", count: "70여명", program: "경주 야경투어 신라별빛야행" },
  {
    name: "군산시공무원노동조합",
    count: "40여명",
    program: "국립경주박물관 도슨트투어",
  },
  { name: "한국체육진흥공단", count: "30여명", program: "불국사투어" },
];

export const schoolClients: ClientRecord[] = [
  {
    name: "거제 중곡초등학교",
    count: "140여명",
    program: "불국사투어 · 국립경주박물관투어 · 야경투어",
  },
  { name: "허들링", count: "40여명", program: "야경투어 · 불국사투어" },
  { name: "서울경기초등학교", count: "40여명", program: "역사투어" },
];
