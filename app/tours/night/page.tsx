import { SiteFooter, SiteHeader } from "@/app/components/site";
import { IconMoon, IconRoute, IconSparkle } from "@/app/components/icons";
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

export const metadata = { title: "청사초롱 신라별빛야행 | 경주트립" };

export default function NightTour() {
  return (
    <main className="inner-page tour-page">
      <SiteHeader back={{ href: "/#tours", label: "투어 목록" }} />

      <TourHero
        category="야경투어"
        tourId="night"
        intro="낮과 다른 경주를 만나는 시간. 청사초롱을 들고 신라의 밤길을 함께 걷습니다."
        title={
          <>
            청사초롱을 들고,<span>신라별빛야행</span>
          </>
        }
        subtitle="동궁과월지 · 첨성대 · 월정교"
        image="/images/product-smartstore-night.webp"
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
                    value: "동궁과월지 입구 앞 (해설사 대기)",
                  },
                  { label: "집결 시간", value: "18:20 (투어 시작 10분 전)" },
                  { label: "운영 시간", value: "18:30–20:30 (약 2시간 소요)" },
                  { label: "투어 코스", value: "동궁과월지 → 첨성대 → 월정교" },
                  { label: "모집 인원", value: "최소 7명 이상 출발" },
                  {
                    label: "대상",
                    value: "연령 제한 없음 (전 연령 참여 가능)",
                  },
                ]}
              />
            </section>

            <section id="experience">
              <SectionTitle Icon={IconMoon}>이 여행에서 만나는 것</SectionTitle>
              <div className="tour-points">
                <PointCard title="청사초롱과 함께 걷는 밤">
                  청사초롱을 들고 해설사와 함께 경주의 밤길을 걷습니다. 조명이
                  켜진 풍경과 이야기가 만나는, 낮과는 다른 여행입니다.
                </PointCard>
                <PointCard title="동궁과월지에 담긴 이야기">
                  신라 왕궁의 별궁과 연못에 어떤 이야기가 남아 있을까요. 신라
                  사람들이 연회를 즐기던 공간의 배경을 투어 중에 들려드립니다.
                </PointCard>
                <PointCard title="첨성대와 월정교의 밤 풍경">
                  별을 살피던 첨성대와 남천 위의 월정교. 빛이 더해진 문화유산을
                  바라보며, 함께 온 사람과 경주의 밤을 기억해 보세요.
                </PointCard>
              </div>
            </section>

            <section id="recommend">
              <SectionTitle Icon={IconSparkle}>
                이런 분께 추천드립니다
              </SectionTitle>
              <RecommendList
                items={[
                  "경주의 낮과 다른 밤의 아름다움을 경험하고 싶은 분",
                  "커플·가족과 함께 특별한 추억을 만들고 싶은 분",
                  "사진 촬영을 즐기는 분 (야경 포토스팟 안내 포함)",
                  "역사적 배경과 함께 야경을 감상하고 싶은 분",
                ]}
              />
            </section>

            <details className="tour-policy">
              <summary>취소·환불 규정</summary>
              <RefundTable note="우천 시에도 진행 / 개인 사유 취소 불가" />
            </details>
          </div>

          <div className="tour-sidebar">
            <BookingCard
              tourId="night"
              originalPrice={30000}
              price={16900}
              priceNote="44% 할인 적용가 (전 연령 동일)"
              times="18:30–20:30 (18:20 집결)"
              duration="약 2시간 소요"
              minPeople="최소 7명 이상 출발"
              meetingPoint="동궁과월지 입구 앞"
            />
          </div>
        </div>
      </div>

      <RelatedTours current="night" />
      <SiteFooter />
    </main>
  );
}
