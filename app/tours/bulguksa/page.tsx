import { SiteFooter, SiteHeader } from "@/app/components/site";
import { IconPagoda, IconRoute, IconSparkle } from "@/app/components/icons";
import {
  BookingCard,
  InfoTable,
  PointCard,
  RecommendList,
  RefundTable,
  SectionTitle,
  TourHero,
  RelatedTours,
} from "@/app/components/tour";

export const metadata = { title: "불국사·석굴암 문화해설 투어 | 경주트립" };

export default function BulguksaTour() {
  return (
    <main className="inner-page tour-page">
      <SiteHeader back={{ href: "/#tours", label: "투어 목록" }} />

      <TourHero
        category="불국사투어"
        tourId="bulguksa"
        intro="돌계단과 탑에 담긴 생각을 따라, 익숙했던 문화유산을 새롭게 읽어봅니다."
        title={
          <>
            불국사·석굴암<span>문화해설 투어</span>
          </>
        }
        subtitle="유네스코 세계문화유산 · 경주가볼만한곳"
        image="/images/product-smartstore-bulguksa.webp"
      />

      <div className="page-width tour-content">
        <div className="tour-layout">
          <div className="tour-story">
            <section id="overview">
              <SectionTitle Icon={IconRoute}>출발 전, 핵심 정보</SectionTitle>
              <InfoTable
                rows={[
                  {
                    label: "집결 장소",
                    value: "불국사 매표소 앞 (해설사 대기)",
                  },
                  { label: "집결 시간", value: "투어 시작 10분 전" },
                  {
                    label: "운영 시간",
                    value: "오전 10:00 / 오후 14:00 (약 2시간 소요)",
                  },
                  {
                    label: "투어 코스",
                    value:
                      "불국사 (청운교·백운교 → 대웅전 → 다보탑·석가탑) + 석굴암",
                  },
                  { label: "모집 인원", value: "최소 7명 이상 출발" },
                  {
                    label: "대상",
                    value: "전 연령 (초등 저학년 이하 신중한 구매 권장)",
                  },
                ]}
              />
            </section>

            <section id="experience">
              <SectionTitle Icon={IconPagoda}>
                이 여행에서 만나는 것
              </SectionTitle>
              <div className="tour-points">
                <PointCard title="돌에 담긴 신라의 생각">
                  탑과 계단, 건물의 배치에는 저마다의 뜻이 있습니다. 신라인이
                  돌에 새긴 불교 철학과 예술을 해설사의 이야기로 따라갑니다.
                </PointCard>
                <PointCard title="불국사를 새롭게 읽는 시선">
                  청운교·백운교와 다보탑·석가탑을 눈여겨보세요. 익숙한 풍경도
                  공간이 만들어진 배경과 상징을 알고 나면 다른 모습으로
                  다가옵니다.
                </PointCard>
                <PointCard title="석굴암에 남은 조각의 디테일">
                  화강암을 다듬어 만든 석굴, 그 안에 놓인 불상과 조각들. 신라의
                  조각 기술과 공간 구성을 들여다보며 문화유산을 이해하는 폭을
                  넓힙니다.
                </PointCard>
              </div>
            </section>

            <section id="recommend">
              <SectionTitle Icon={IconSparkle}>
                이런 분께 추천드립니다
              </SectionTitle>
              <RecommendList
                items={[
                  "불국사를 여러 번 가봤지만 더 깊이 알고 싶은 분",
                  "아이와 함께 유네스코 문화유산을 체험하고 싶은 부모님",
                  "신라 불교 예술과 건축에 관심 있는 역사 여행자",
                  "교육 목적의 가족·학교 단체 여행",
                ]}
              />
            </section>

            <details className="tour-policy">
              <summary>취소·환불 규정</summary>
              <RefundTable note="개인 일정 변경·단순 변심·교통 지연·개인 질병은 환불 불가" />
            </details>
          </div>

          <div className="tour-sidebar">
            <BookingCard
              tourId="bulguksa"
              originalPrice={60000}
              price={24800}
              childPrice={19800}
              priceNote="58% 할인 적용가"
              times="오전 10:00 / 오후 14:00"
              duration="약 2시간 소요"
              minPeople="최소 7명 이상 출발"
              meetingPoint="불국사 매표소 앞"
            />
          </div>
        </div>
      </div>

      <RelatedTours current="bulguksa" />
      <SiteFooter />
    </main>
  );
}
