import { SiteFooter, SiteHeader } from "@/app/components/site";
import { IconMoon, IconRoute, IconSparkle, IconWallet } from "@/app/components/icons";
import {
  BookingCard,
  InfoTable,
  PointCard,
  RecommendList,
  RefundTable,
  SectionTitle,
  TourHero,
} from "@/app/components/tour";

export default function NightTour() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader back={{ href: "/#tours", label: "투어 목록" }} />

      <TourHero
        category="야경투어"
        title={
          <>
            경주 야경투어
            <br />
            청사초롱 신라별빛야행
          </>
        }
        subtitle="동궁과월지 · 첨성대 · 월정교"
        image="/images/tour-night.jpg"
        rating={4.92}
        reviews={445}
        discount={44}
      />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-12">
            <section>
              <SectionTitle Icon={IconRoute}>투어 개요</SectionTitle>
              <InfoTable
                rows={[
                  { label: "집결 장소", value: "동궁과월지 입구 앞 (해설사 대기)" },
                  { label: "집결 시간", value: "투어 시작 10분 전" },
                  { label: "운영 시간", value: "저녁 19:00 (약 2시간 소요)" },
                  { label: "투어 코스", value: "동궁과월지 → 첨성대 → 월정교" },
                  { label: "모집 인원", value: "최소 7명 이상 출발" },
                  { label: "대상", value: "연령 제한 없음 (전 연령 참여 가능)" },
                ]}
              />
            </section>

            <section>
              <SectionTitle Icon={IconMoon}>투어의 매력 포인트</SectionTitle>
              <div className="space-y-4">
                <PointCard title="청사초롱과 함께하는 신라의 밤" highlight>
                  오직 경주트립에서만 가능한 청사초롱 야경 투어.
                  <br />
                  달빛 아래 신라로 떠나는 감성 야간 투어.
                  <br />
                  조명으로 빛나는 동궁과월지의 환상적인 야경을 해설사의 이야기와 함께.
                </PointCard>

                <PointCard title="동궁과월지 (안압지)">
                  신라 왕궁의 별궁으로 사용되던 동궁과월지.
                  <br />
                  밤이 되면 화려한 조명이 물 위에 반영되어 만들어내는 환상적인 경관.
                  <br />
                  신라 귀족들이 연회를 즐겼던 천년의 이야기가 담긴 공간.
                </PointCard>

                <PointCard title="첨성대 & 월정교">
                  동양 최고(最古)의 천문대 첨성대와
                  <br />
                  신라 시대 다리를 복원한 월정교의 야경.
                  <br />
                  해설사와 함께 별을 보던 신라인의 이야기를 들어보세요.
                </PointCard>
              </div>
            </section>

            <section>
              <SectionTitle Icon={IconSparkle}>이런 분께 추천드립니다</SectionTitle>
              <RecommendList
                items={[
                  "경주의 낮과 다른 밤의 아름다움을 경험하고 싶은 분",
                  "커플·가족과 함께 특별한 추억을 만들고 싶은 분",
                  "사진 촬영을 즐기는 분 (야경 포토스팟 안내 포함)",
                  "역사적 배경과 함께 야경을 감상하고 싶은 분",
                ]}
              />
            </section>

            <section>
              <SectionTitle Icon={IconWallet}>환불 규정</SectionTitle>
              <RefundTable note="우천 시에도 진행 / 개인 사유 취소 불가" />
            </section>
          </div>

          <div className="md:col-span-1">
            <BookingCard
              originalPrice={30000}
              price={16900}
              priceNote="44% 할인 적용가 (전 연령 동일)"
              times="저녁 19:00"
              duration="약 2시간 소요"
              minPeople="최소 7명 이상 출발"
              meetingPoint="동궁과월지 입구 앞"
            />
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
