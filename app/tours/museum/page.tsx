import { SiteFooter, SiteHeader } from "@/app/components/site";
import { IconHeadphones, IconRoute, IconSparkle } from "@/app/components/icons";
import {
  BookingCard,
  InfoTable,
  PointCard,
  RecommendList,
  RefundTable,
  SafetyNote,
  SectionTitle,
  TourHero,
  RelatedTours,
} from "@/app/components/tour";

export const metadata = { title: "국립경주박물관 도슨트 | 경주트립" };

export default function MuseumTour() {
  return (
    <main className="inner-page tour-page">
      <SiteHeader back={{ href: "/#tours", label: "투어 목록" }} />

      <TourHero
        category="박물관투어"
        tourId="museum"
        intro="유물 앞에 잠깐 멈춰, 그 안에 담긴 신라 사람들의 삶을 만나보세요."
        title={
          <>
            국립경주박물관<span>도슨트 투어</span>
          </>
        }
        subtitle="성덕대왕신종 · 신라역사관 · 신라미술관"
        image="/images/product-smartstore-museum.webp"
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
                    value: "국립경주박물관 정문 앞 안내데스크",
                  },
                  { label: "집결 시간", value: "투어 시작 10분 전" },
                  {
                    label: "운영 시간",
                    value: "오전 10:00 / 오후 14:00 (약 2시간 소요)",
                  },
                  {
                    label: "투어 코스",
                    value:
                      "성덕대왕신종 → 신라역사관 → 신라미술관 → 월지관(자유관람)",
                  },
                  { label: "모집 인원", value: "최소 7명 이상 출발" },
                  {
                    label: "대상",
                    value:
                      "초등 고학년 이상 권장 · 초등 4학년 미만은 보호자 1명 이상 동반 필수",
                  },
                  { label: "연령 원칙", value: "36개월 이상부터 1인 1매 원칙" },
                ]}
              />
            </section>

            <section id="experience">
              <SectionTitle Icon={IconHeadphones}>
                이 여행에서 만나는 것
              </SectionTitle>
              <div className="tour-points">
                <PointCard
                  title="해설이 또렷하게 들리는 시간"
                  note="수신기 분실·파손 시 100% 전액 배상 / 투어 종료 후 반드시 반납"
                >
                  귀에 거는 오픈형 블루투스 수신기를 무료로 빌려드립니다. 여러
                  사람이 함께 관람해도 해설에 집중할 수 있도록 준비했습니다.
                  별도 이어폰 없이 참여하세요.
                </PointCard>
                <PointCard title="유물에서 시작하는 신라의 이야기">
                  성덕대왕신종부터 신라의 불교미술까지. 유물이 만들어진 배경과
                  그 시대 사람들의 삶을 따라가며, 전시실 안의 작은 디테일을
                  발견합니다.
                </PointCard>
                <PointCard title="해설사와 함께 바라보는 박물관">
                  박물관·문화유산 전문해설사가 관람을 이끕니다. 아이와 어른이
                  함께 이야기를 듣고, 혼자 보았다면 지나쳤을 유물의 의미를
                  만나보세요.
                </PointCard>
              </div>
            </section>

            <section id="recommend">
              <SectionTitle Icon={IconSparkle}>
                이런 분께 추천드립니다
              </SectionTitle>
              <RecommendList
                items={[
                  "아이에게 역사보다 흥미로운 '이야기 여행'을 선물하고 싶은 부모님",
                  "조용하고 품격 있는 문화 체험을 찾는 가족",
                  "기존 투어의 형식적인 해설이 아쉬웠던 분",
                  "신라의 예술과 문화를 더 깊이 느끼고 싶은 여행자",
                  "학생·학부모 교육형 여행",
                ]}
              />
            </section>

            <details className="tour-policy">
              <summary>취소·환불 규정</summary>
              <RefundTable note="개인 일정 변경·단순 변심·교통 지연·개인 질병·동행인 취소는 환불 불가" />
            </details>

            <SafetyNote>
              본 상품은 여행자보험이 포함되어 있지 않으며, 개인정보보호법에 따라
              여행자보험은 참가자 본인이 개별 가입하셔야 합니다. 투어는 도보
              이동을 포함한 실내 프로그램으로, 참가자의 부주의·개인 질환으로
              발생한 사고에 대해서는 주최 측의 법적·재정적 책임이 제한됩니다.
              기상 및 현장 상황에 따라 코스가 일부 변경될 수 있습니다.
            </SafetyNote>
          </div>

          <div className="tour-sidebar">
            <BookingCard
              tourId="museum"
              originalPrice={40000}
              price={25000}
              childPrice={22000}
              priceNote="37% 할인 적용가"
              times="오전 10:00 / 오후 14:00"
              duration="약 2시간 소요"
              minPeople="최소 7명 이상 출발"
              meetingPoint="국립경주박물관 정문 앞"
            />
          </div>
        </div>
      </div>

      <RelatedTours current="museum" />
      <SiteFooter />
    </main>
  );
}
