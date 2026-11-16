# 경주트립 GYEONGJU TRIP — Ink & Lime (2026-11 리뉴얼)

KOREA MICE EXPO 2026 참가에 맞춰 홈페이지를 전면 리뉴얼한 방향입니다. 이전 "Local Travel Studio"(웜 페이퍼·세리프) 방향을 대체합니다.
구조는 getdesign의 Nike DESIGN.md(`npx getdesign add nike`: 단색 UI, 큰 타이포, 풀블리드 영상)를 뼈대로 삼고, 색과 문장은 경주트립 KME 홍보영상의 아이덴티티에서 가져왔습니다. 시안은 Claude Design 캔버스 "경주트립 홈페이지 리뉴얼 (KME 2026)"에 있습니다.

## 한 줄 방향
블랙 바탕에 라임 한 가지 색, 굵은 고딕, 영상과 3D. "경주 일정에, 이야기를 더하다."

## 색
| 토큰 | 값 | 쓰임 |
| --- | --- | --- |
| `--gt-ink` | `#0b0b0c` | 기본 바탕, 본문 글자(밝은 면 위) |
| `--gt-lime` | `#c8f53a` | 유일한 강조색. 버튼, 숫자, 강조 문장, 섹션 면 |
| `--gt-paper` | `#f4f4ef` | 밝은 섹션, 내부 페이지 바탕 |
| `--gt-night` / `--gt-line` | `#151517` / `#2a2a2e` | 어두운 카드 면, 구분선 |
| `--gt-lantern` | `#ff5a1f` | 청사초롱 포인트. 꼭 필요할 때만 |

- 라임 위 글자는 항상 잉크. 흰 글자를 라임 위에 올리지 않습니다.
- 그라데이션 장식, 여러 강조색 혼용은 쓰지 않습니다.

## 서체
- 한글·본문: **Pretendard Variable** (npm `pretendard`, 사이트에서 직접 제공). 제목 800–900, 자간 -0.045 ~ -0.065em. 본문 500.
- 영문 디스플레이·숫자: **Archivo Variable**, 폭(wdth) 125%, 굵기 900. 워드마크, 통계 숫자, 번호(01·02·03), 아이브로 라벨.
- 내부 페이지의 예전 서체 변수(`--font-editorial`, `--font-condensed`, `--font-suite`)는 `globals.css`에서 위 두 서체로 연결됩니다.

## 워드마크
라임 원(달) + `경주트립`(Pretendard 900) + `GYEONGJU TRIP`(Archivo 넓은 폭). 헤더에서는 한 줄, 푸터에서는 화면 가득. 컴포넌트: `Wordmark` (`app/components/site.tsx`).

## 화면 구성
- **홈(`/`)**: 영상 히어로 → 마키 → 투어 3종(스티키 스택 카드, 가격은 `lib/tours.ts`) → 바이어용 WHY → 실적·진행 이력(`lib/clients.ts`) → 45초 홍보영상 → TOUR×AR×3D×AI → 3D 문화유산 뷰어 → 파트너십 문의 → 푸터.
- **파트너(`/partners`)**: PCO·여행사·기관용 상세 소개. 국문/영문 전환(`?lang=en`). 내용은 KME 2026 회사소개서 기준.
- 헤더·푸터·팔레트는 모든 내부 페이지에 공통 적용.

## 모션 (`app/components/MotionRoot.tsx`)
`data-reveal`(등장), `data-count`(숫자 카운트업), `data-words`(스크롤 문장), `data-parallax`, `video[data-autoplay]`(보일 때만 재생). 서버 렌더 결과는 JS 없이도 그대로 읽히고, `prefers-reduced-motion`이면 모두 끕니다.

## 3D (`app/components/HeritageViewer.tsx`)
three.js를 섹션이 화면 근처에 올 때만 불러옵니다. 모델은 `public/media/3d/*.glb`(meshopt + webp로 경량화, 0.4–1.2MB). 좌우 드래그로 회전, 세로 스크롤은 페이지에 양보.

## 미디어
`public/media/video`(새 홍보영상에서 편집한 히어로·투어 루프, KME 45초 영상, 모션그래픽), `public/media/photo`(2026년 현장·AR 포토카드 사진), `public/media/3d`.
예전 상품 썸네일은 결제·명소 페이지의 상품 식별용으로만 남깁니다.

## 품질 기준
- 모바일 360–430px 우선. 가로 스크롤 없음, 터치 영역 44px 이상.
- 가격·운영시간은 `lib/tours.ts`만 참조. 실적 숫자는 기업소개와 같은 값.
- 사업자 정보(상호·대표자·주소·사업자등록번호)는 푸터에 항상 표시.
