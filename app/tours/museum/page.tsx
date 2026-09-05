import { SiteFooter, SiteHeader } from "@/app/components/site";
import { IconHeadphones, IconRoute, IconSparkle, IconWallet } from "@/app/components/icons";
import {
  BookingCard,
  InfoTable,
  PointCard,
  RecommendList,
  RefundTable,
  SafetyNote,
  SectionTitle,
  TourHero,
} from "@/app/components/tour";

export default function MuseumTour() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader back={{ href: "/#tours", label: "투어 목록" }} />

      <TourHero
        category="박물관투어"
        title={
          <>
            국립경주박물관
            <br />
            역사 도슨트 프리미엄 투어
          </>
        }
        subtitle="성덕대왕신종 · 신라역사관 · 신라미술관"
        image="/images/tour-museum.jpg"
        rating={4.92}
        reviews={536}
        discount={37}
      />

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-12">
            <section>
              <SectionTitle Icon={IconRoute}>투어 개요</SectionTitle>
              <InfoTable
                rows={[
                  { label: "집결 장소", value: "국립경주박물관 정문 앞 안내데스크" },
                  { label: "집결 시간", value: "투어 시작 10분 전" },
                  { label: "운영 시간", value: "오전 10:00 / 오후 14:00 (약 2시간 소요)" },
                  {
                    label: "투어 코스",
                    value: "성덕대왕신종 → 신라역사관 → 신라미술관 → 월지관(자유관람)",
                  },
                  { label: "모집 인원", value: "최소 7명 이상 출발" },
                  {
                    label: "대상",
                    value:
                      "초등 고학년 이상 권장 (초등 4학년 미만 참여 불가, 부모 1명 이상 동참 필수)",
                  },
                  { label: "연령 원칙", value: "36개월 이상부터 1인 1매 원칙" },
                ]}
              />
            </section>

            <section>
              <SectionTitle Icon={IconHeadphones}>투어의 매력 포인트</SectionTitle>
              <div className="space-y-4">
                <PointCard
                  title="프리미엄 블루투스 송수신기 무료 대여 (오픈이벤트)"
                  highlight
                  note="수신기 분실·파손 시 100% 전액 배상 / 투어 종료 후 반드시 반납"
                >
                  귀에 꽂는 이어폰이 아닌 <strong>귀에 거는 오픈형 수신기</strong> 사용.
                  <br />
                  통증 없이 위생적이고 편안하며, 음질이 선명한 고급 장비.
                  <br />
                  단체 관람에서도 또렷하게 들리는 고품격 해설 환경.
                  <br />
                  이어폰 별도 지참 없이 참여 가능!
                </PointCard>

                <PointCard
                  title="스토리로 듣는 신라의 예술"
                  note="&ldquo;역사는 외우는 게 아니라, 이야기를 통해 기억하는 것이다.&rdquo;"
                >
                  유물 설명 중심이 아닌, 그 시대 사람들의 삶과 감정을 담은 이야기 해설.
                  <br />
                  성덕대왕신종의 전설, 신라 왕들의 예술적 감각, 신라 불교미술의 정수까지
                  <br />
                  아이와 부모가 함께 몰입할 수 있는 <strong>감성형 도슨트 투어</strong>.
                </PointCard>

                <PointCard title="전문 해설사의 감성 도슨트">
                  박물관·문화유산 전문해설사들이 직접 진행.
                  <br />
                  지루한 나열식 설명이 아닌, 공감과 감동이 있는 해설로 구성.
                  <br />
                  해설사마다 다른 시선으로 만나는 &lsquo;살아있는 유물의 이야기&rsquo;.
                </PointCard>
              </div>
            </section>

            <section>
              <SectionTitle Icon={IconSparkle}>이런 분께 추천드립니다</SectionTitle>
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

            <section>
              <SectionTitle Icon={IconWallet}>환불 규정</SectionTitle>
              <RefundTable note="개인 일정 변경·단순 변심·교통 지연·개인 질병·동행인 취소는 환불 불가" />
            </section>

            <SafetyNote>
              본 상품은 여행자보험이 포함되어 있지 않으며, 개인정보보호법에 따라 여행자보험은
              참가자 본인이 개별 가입하셔야 합니다. 투어는 도보 이동을 포함한 실내 프로그램으로,
              참가자의 부주의·개인 질환으로 발생한 사고에 대해서는 주최 측의 법적·재정적 책임이
              제한됩니다. 기상 및 현장 상황에 따라 코스가 일부 변경될 수 있습니다.
            </SafetyNote>
          </div>

          <div className="md:col-span-1">
            <BookingCard
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

      <SiteFooter />
    </main>
  );
}
