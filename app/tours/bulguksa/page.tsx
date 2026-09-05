import { SiteFooter, SiteHeader } from "@/app/components/site";
import { IconPagoda, IconRoute, IconSparkle, IconWallet } from "@/app/components/icons";
import {
  BookingCard,
  InfoTable,
  PointCard,
  RecommendList,
  RefundTable,
  SectionTitle,
  TourHero,
} from "@/app/components/tour";

export default function BulguksaTour() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader back={{ href: "/#tours", label: "투어 목록" }} />

      <TourHero
        category="불국사투어"
        title={
          <>
            불국사·석굴암
            <br />
            문화해설사 역사투어
          </>
        }
        subtitle="유네스코 세계문화유산 · 경주가볼만한곳"
        image="/images/tour-bulguksa.jpg"
        rating={4.93}
        reviews={329}
        discount={58}
      />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-12">
            <section>
              <SectionTitle Icon={IconRoute}>투어 개요</SectionTitle>
              <InfoTable
                rows={[
                  { label: "집결 장소", value: "불국사 매표소 앞 (해설사 대기)" },
                  { label: "집결 시간", value: "투어 시작 10분 전" },
                  { label: "운영 시간", value: "오전 10:00 / 오후 14:00 (약 2시간 소요)" },
                  {
                    label: "투어 코스",
                    value: "불국사 (청운교·백운교 → 대웅전 → 다보탑·석가탑) + 석굴암",
                  },
                  { label: "모집 인원", value: "최소 7명 이상 출발" },
                  { label: "대상", value: "전 연령 (초등 저학년 이하 신중한 구매 권장)" },
                ]}
              />
            </section>

            <section>
              <SectionTitle Icon={IconPagoda}>투어의 매력 포인트</SectionTitle>
              <div className="space-y-4">
                <PointCard title="천년 신라의 불교, 돌 위에 새긴 철학" highlight>
                  단순한 건축물 관람이 아닌, 신라인이 돌에 새겨 넣은 불교 철학과 예술을 읽는 시간.
                  <br />
                  다보탑과 석가탑에 담긴 의미, 청운교·백운교의 상징까지
                  <br />
                  문화해설사와 함께라면 전혀 다른 불국사를 만납니다.
                </PointCard>

                <PointCard title="유네스코 세계문화유산 불국사">
                  751년 신라 경덕왕 때 창건된 천년 고찰.
                  <br />
                  청운교·백운교, 다보탑, 석가탑 등 국보급 문화재가 집중된 공간.
                  <br />
                  단순 관람이 아닌, 각 공간의 건축 의도와 역사적 의미를 함께 배웁니다.
                </PointCard>

                <PointCard title="석굴암 — 신라 조각 예술의 극치">
                  화강암을 정교하게 다듬어 만든 인공 석굴 사원.
                  <br />
                  본존불의 완벽한 비례와 조각 기술, 내부 구조의 과학적 설계까지.
                  <br />
                  해설사의 설명과 함께라면 그냥 지나쳤을 디테일이 살아납니다.
                </PointCard>
              </div>
            </section>

            <section>
              <SectionTitle Icon={IconSparkle}>이런 분께 추천드립니다</SectionTitle>
              <RecommendList
                items={[
                  "불국사를 여러 번 가봤지만 더 깊이 알고 싶은 분",
                  "아이와 함께 유네스코 문화유산을 체험하고 싶은 부모님",
                  "신라 불교 예술과 건축에 관심 있는 역사 여행자",
                  "교육 목적의 가족·학교 단체 여행",
                ]}
              />
            </section>

            <section>
              <SectionTitle Icon={IconWallet}>환불 규정</SectionTitle>
              <RefundTable note="개인 일정 변경·단순 변심·교통 지연·개인 질병은 환불 불가" />
            </section>
          </div>

          <div className="md:col-span-1">
            <BookingCard
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

      <SiteFooter />
    </main>
  );
}
