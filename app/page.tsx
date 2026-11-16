import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/site";
import HeritageViewer, { type HeritageModel } from "./components/HeritageViewer";
import { OpenChatLink, ReelPlayer } from "./components/home-client";
import { GatMark, Giwa, Mounds } from "./components/motifs";
import { ExperienceCards } from "./components/experience";
import { TOURS, type TourId } from "@/lib/tours";
import { corporateClients, schoolClients } from "@/lib/clients";

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

const tourCards: {
  id: TourId;
  no: string;
  tag: string;
  tone: "" | "green" | "night";
  title: [string, string];
  line: string;
}[] = [
  {
    id: "museum",
    no: "01",
    tag: "박물관",
    tone: "",
    title: ["국립경주박물관", "프리미엄 도슨트투어"],
    line: "유물 속 신라의 이야기, 해설로 깊어지는 관람.",
  },
  {
    id: "bulguksa",
    no: "02",
    tag: "세계유산",
    tone: "green",
    title: ["불국사·석굴암", "문화해설사 역사투어"],
    line: "돌 하나, 계단 하나에도 신라인의 이야기가 있는 곳.",
  },
  {
    id: "night",
    no: "03",
    tag: "야경",
    tone: "night",
    title: ["청사초롱 야경투어", "신라별빛야행"],
    line: "등불을 들고 함께 걷는, 이야기가 있는 경주의 밤.",
  },
];

const why = [
  {
    title: "문화유산 전문성",
    text: "불국사·국립경주박물관·신라왕경을 이야기와 맥락이 있는 경험으로 구성합니다.",
  },
  {
    title: "단체 운영 역량",
    text: "규모에 따라 팀을 분할하고 수신기를 활용해 이동과 해설의 집중도를 관리합니다.",
  },
  {
    title: "맞춤형 B2B 협업",
    text: "행사 전체 일정에 맞춰 시작·종료 시간, 장소, 소요시간과 프로그램을 조정합니다.",
  },
  {
    title: "실제 운영 경험",
    text: "기업·공공기관·학교·일반 관광객까지 다양한 현장을 지속적으로 운영하고 있습니다.",
  },
];

const heritageModels: HeritageModel[] = [
  { id: "crown", src: "/media/3d/crown.glb", name: "천마총 금관", note: "신라 황금 문화의 상징" },
  { id: "tou", src: "/media/3d/tou.glb", name: "신라 토우", note: "흙으로 빚은 신라 사람들" },
];

const marqueeWords = ["천년 고도 경주", "이야기가 있는 해설", "국립경주박물관", "불국사 · 석굴암", "청사초롱 야행", "선비 · 화랑 체험", "전통문화 공연", "신라 왕경"];

function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const run = (
    <span>
      {items.map((w) => (
        <span key={w}>
          {w}
          <i aria-hidden="true" />
        </span>
      ))}
    </span>
  );
  return (
    <div className={`gt-marquee${dark ? " dark" : ""}`} aria-hidden="true">
      <div className="gt-marquee-track">
        {run}
        {run}
        {run}
        {run}
      </div>
    </div>
  );
}

function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`gt-words ${className}`} data-words>
      {text.split(" ").map((w, i) => (
        <span key={i} className="w">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  const clients = [...corporateClients, ...schoolClients];

  return (
    <main className="gt">
      <SiteHeader variant="home" />

      {/* 히어로 */}
      <section className="gt-hero" aria-labelledby="hero-title">
        <video
          className="gt-hero-media"
          src="/media/video/hero.mp4"
          poster="/media/video/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          data-autoplay
          aria-hidden="true"
        />
        <div className="gt-wrap gt-hero-inner">
          <p className="gt-eyebrow gt-fade" style={{ "--d": "0.1s" } as React.CSSProperties}>
            Korea MICE Expo 2026 · Local Tour Partner
          </p>
          <h1 id="hero-title" className="gt-hero-title">
            <span className="line">
              <span>경주 일정에,</span>
            </span>
            <span className="line">
              <span>이야기를 더하다.</span>
            </span>
          </h1>
          <p className="gt-hero-sub gt-fade" style={{ "--d": "0.5s" } as React.CSSProperties}>
            전문 해설사와 함께하는 경주 현지 문화유산 투어. 개인 여행부터
            기업·기관·인센티브 단체까지, 경주의 현장은 경주트립이 맡습니다.
          </p>
          <div className="gt-actions gt-fade" style={{ "--d": "0.65s" } as React.CSSProperties}>
            <a href="#tours" className="gt-btn gold">
              투어 보기 <span className="arr" aria-hidden="true">→</span>
            </a>
            <Link href="/partners" className="gt-btn line">
              단체·MICE 제안 받기
            </Link>
          </div>
        </div>
        <div className="gt-wrap">
          <dl className="gt-stats gt-fade" style={{ "--d": "0.8s" } as React.CSSProperties}>
            <div>
              <dt>평균 별점</dt>
              <dd data-count="4.92" data-decimals="2">4.92</dd>
            </div>
            <div>
              <dt>누적 리뷰</dt>
              <dd data-count="1300" data-suffix="+">1,300+</dd>
            </div>
            <div>
              <dt>단체·MICE 진행 인원</dt>
              <dd data-count="1500" data-suffix="+">1,500+</dd>
            </div>
          </dl>
        </div>
      </section>

      <Marquee items={marqueeWords} />

      {/* 투어 3종 */}
      <section id="tours" className="gt-sec" aria-labelledby="tours-title">
        <div className="gt-wrap">
          <div className="gt-head split">
            <div>
              <p className="gt-eyebrow plain">
                <GatMark />
                해설사와 함께하는 대표 투어
              </p>
              <h2 id="tours-title" className="gt-h2" data-reveal>
                해설사와 걷는
                <br />
                <span className="gt-gold">세 가지 경주.</span>
              </h2>
            </div>
            <p className="gt-lead" data-reveal>
              모든 투어는 전문 문화해설사가 직접 진행합니다. 약 2시간, 그냥 보면
              풍경이지만 알고 보면 이야기입니다.
            </p>
          </div>

          <div className="gt-tours">
            {tourCards.map((card, i) => {
              const tour = TOURS[card.id];
              return (
                <article
                  key={card.id}
                  className={`gt-tour ${card.tone}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="gt-tour-media">
                    <video
                      src={`/media/video/tour-${card.id}.mp4`}
                      poster={`/media/video/tour-${card.id}.jpg`}
                      muted
                      loop
                      playsInline
                      preload="none"
                      data-autoplay
                      aria-hidden="true"
                    />
                    <span className="gt-tour-no" aria-hidden="true">{card.no}</span>
                    <span className="gt-tour-tag">{card.tag}</span>
                  </div>
                  <div className="gt-tour-body">
                    <h3>
                      {card.title[0]}
                      <br />
                      {card.title[1]}
                    </h3>
                    <p>{card.line}</p>
                    <dl className="gt-tour-spec">
                      <div>
                        <dt>운영 시간</dt>
                        <dd>{tour.operatingHours}</dd>
                      </div>
                      <div>
                        <dt>집결 장소</dt>
                        <dd>{tour.meetingPoint}</dd>
                      </div>
                    </dl>
                    <div className="gt-tour-foot">
                      <p className="gt-tour-price">
                        {won(tour.adultPrice)}
                        <small>
                          {tour.childPrice ? `어린이 ${won(tour.childPrice)} · ` : "연령 구분 없음 · "}약 2시간
                        </small>
                      </p>
                      <div className="gt-tour-cta">
                        <Link href={`/tours/${card.id}`} className="gt-btn line-ink">
                          자세히
                        </Link>
                        <Link href={`/tours/${card.id}#booking`} className="gt-btn ink">
                          예약하기 <span className="arr" aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 단체·MICE 맞춤: 체험 · 공연 · 유니크베뉴 */}
      <section id="programs" className="gt-sec" style={{ paddingTop: 0 }} aria-labelledby="programs-title">
        <div className="gt-wrap">
          <div className="gt-head split">
            <div>
              <p className="gt-eyebrow">단체 · MICE 맞춤 프로그램</p>
              <h2 id="programs-title" className="gt-h2" data-reveal>
                체험 · 공연 ·
                <br />
                <span className="gt-gold">유니크베뉴까지.</span>
              </h2>
            </div>
            <p className="gt-lead" data-reveal>
              도슨트 투어에 더해, 행사 성격과 인원에 맞춰 전통문화 체험과 공연,
              문화유산 공간을 활용한 프로그램까지 맞춤 기획합니다.
            </p>
          </div>
          <ExperienceCards />
          <p className="gt-exp-hint" aria-hidden="true">
            옆으로 밀어서 더 보기 →
          </p>
          <div className="gt-exp-foot">
            <Link href="/quote" className="gt-btn gold">
              맞춤 프로그램 문의 <span className="arr" aria-hidden="true">→</span>
            </Link>
            <p>인원 · 일정 · 장소에 맞춰 구성을 제안해 드립니다.</p>
          </div>
        </div>
      </section>

      <Giwa />

      {/* 바이어·단체 담당자를 위한 WHY */}
      <section id="why" className="gt-sec paper" aria-labelledby="why-title">
        <div className="gt-wrap">
          <p className="gt-eyebrow ink">기획사 · 여행사 · 기관 담당자께</p>
          <h2 id="why-title" className="sr-only">
            왜 경주트립인가
          </h2>
          <Words text="기획사는 행사에 집중하고, 경주의 현장은 경주트립이 맡습니다." />
          <div className="gt-why">
            <figure className="gt-why-photo" data-reveal="zoom">
              <Image
                src="/media/photo/bulguksa-group.webp"
                alt="불국사에서 단체 티셔츠를 입은 참가자들이 해설을 듣는 모습"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
              <figcaption>불국사 · 기업 단체 해설투어</figcaption>
            </figure>
            <ol className="gt-why-list">
              {why.map((item, i) => (
                <li key={item.title} data-reveal style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                  <b aria-hidden="true">0{i + 1}</b>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Mounds />

      {/* 실적 */}
      <section id="record" className="gt-sec" aria-labelledby="record-title">
        <div className="gt-wrap">
          <div className="gt-head">
            <p className="gt-eyebrow">현장에서 쌓은 신뢰</p>
            <h2 id="record-title" className="gt-h2" data-reveal>
              숫자로 보는
              <br />
              현장 운영력.
            </h2>
          </div>
          <div className="gt-record">
            <dl className="gt-big">
              <div data-reveal>
                <dt>평균 별점</dt>
                <dd data-count="4.92" data-decimals="2">4.92</dd>
              </div>
              <div data-reveal>
                <dt>누적 리뷰</dt>
                <dd data-count="1300" data-suffix="+">1,300+</dd>
              </div>
              <div data-reveal>
                <dt>
                  단체·MICE 진행 인원
                  <small>단일 행사 최대 1,000여 명</small>
                </dt>
                <dd data-count="1500" data-suffix="+">1,500+</dd>
              </div>
            </dl>
            <div className="gt-clients">
              <h3>함께한 기업 · 기관 · 학교</h3>
              <ul>
                {clients.map((c) => (
                  <li key={c.name} data-reveal>
                    <strong>{c.name}</strong>
                    <span>{c.count}</span>
                    <p>{c.program}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="gt-proof">
            <figure className="wide" data-reveal>
              <Image src="/media/photo/workshop.webp" alt="기관 워크숍 참가자 단체 기념사진" fill sizes="(max-width: 900px) 100vw, 50vw" />
              <figcaption>기관 워크숍 · 국립경주박물관</figcaption>
            </figure>
            <figure data-reveal style={{ "--d": "0.08s" } as React.CSSProperties}>
              <Image src="/media/photo/museum-backs.webp" alt="박물관 전시실에서 해설을 듣는 참가자들" fill sizes="(max-width: 900px) 50vw, 25vw" />
              <figcaption>도슨트 해설</figcaption>
            </figure>
            <figure data-reveal style={{ "--d": "0.16s" } as React.CSSProperties}>
              <Image src="/media/photo/tumuli-lantern.webp" alt="해질녘 고분 앞에서 청사초롱을 든 참가자들" fill sizes="(max-width: 900px) 50vw, 25vw" />
              <figcaption>청사초롱 야경투어</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <Marquee items={clients.map((c) => c.name)} dark />

      {/* 홍보영상 */}
      <section id="reel" className="gt-sec" aria-labelledby="reel-title">
        <div className="gt-wrap">
          <div className="gt-head split">
            <div>
              <p className="gt-eyebrow">영상으로 보기</p>
              <h2 id="reel-title" className="gt-h2" data-reveal>
                45초로 보는
                <br />
                경주트립.
              </h2>
            </div>
            <p className="gt-lead" data-reveal>
              여행사의 경주 코스에, 현지 해설투어를 연결하세요. 박물관·불국사·야경
              세 가지 프로그램을 한 번에 소개합니다.
            </p>
          </div>
          <ReelPlayer
            src="/media/video/kme-reel.mp4"
            poster="/media/video/kme-reel.jpg"
            label="경주트립 3대 투어 소개 영상"
          />
        </div>
      </section>

      <Giwa />

      {/* TOUR × TECH */}
      <section id="tech" className="gt-sec paper" aria-labelledby="tech-title">
        <div className="gt-wrap">
          <div className="gt-head">
            <p className="gt-eyebrow ink">투어 × AR × 3D × AI</p>
            <h2 id="tech-title" className="gt-h2" data-reveal>
              투어의 즐거움,
              <br />
              <span className="gt-mark">체험으로 한 번 더.</span>
            </h2>
          </div>
          <div className="gt-tech">
            <div className="gt-fan" aria-hidden="true">
              <figure data-parallax="0.06">
                <Image src="/media/photo/card-museum.webp" alt="" fill sizes="(max-width: 900px) 46vw, 300px" />
              </figure>
              <figure data-parallax="-0.05">
                <Image src="/media/photo/card-bulguksa.webp" alt="" fill sizes="(max-width: 900px) 46vw, 300px" />
              </figure>
              <figure data-parallax="0.02">
                <Image src="/media/photo/card-night.webp" alt="" fill sizes="(max-width: 900px) 46vw, 300px" />
              </figure>
            </div>
            <ul className="gt-tech-list">
              <li data-reveal>
                <b>AR</b>
                <h3>투어 포토카드 · AR 체험</h3>
                <p>
                  투어마다 받는 포토카드로 여행의 한 장면을 오래 간직하고, 신라
                  유물·복식 AR 포토체험으로 사진 한 장까지 추억이 됩니다.
                </p>
              </li>
              <li data-reveal>
                <b>3D</b>
                <h3>손안의 경주</h3>
                <p>경주를 담은 미니어처 지도와 3D 문화유산으로, 동선을 미리 걸어봅니다.</p>
                <a href="#heritage">3D 문화유산 돌려보기 →</a>
              </li>
              <li data-reveal>
                <b>AI</b>
                <h3>AI경트</h3>
                <p>동행자와 이동수단만 고르면, 나에게 맞는 경주 일정을 추천합니다.</p>
                <OpenChatLink>AI경트에게 물어보기 →</OpenChatLink>
              </li>
            </ul>
          </div>
          <div className="gt-tech-video" data-reveal="zoom">
            <video
              src="/media/video/tech-motion.mp4"
              poster="/media/video/tech-motion.jpg"
              muted
              loop
              playsInline
              preload="none"
              data-autoplay
              aria-label="경주트립 투어·AR·3D·AI 서비스 소개 모션그래픽"
            />
          </div>
        </div>
      </section>

      <Mounds />

      {/* 3D 문화유산 */}
      <section id="heritage" className="gt-sec" aria-labelledby="heritage-title">
        <div className="gt-wrap">
          <div className="gt-head split">
            <div>
              <p className="gt-eyebrow">손끝에서 만나는 신라</p>
              <h2 id="heritage-title" className="gt-h2" data-reveal>
                신라 유물을,
                <br />
                <span className="gt-gold">손끝에서 3D로.</span>
              </h2>
            </div>
            <p className="gt-lead" data-reveal>
              현장에서 들은 이야기를 3D 콘텐츠로 이어갑니다. 금관과 토우를 직접
              돌려보세요.
            </p>
          </div>
          <HeritageViewer models={heritageModels} poster="/media/photo/crown-preview.webp" />
          <p className="gt-heritage-note" style={{ marginTop: 18 }}>
            교육·홍보용으로 제작한 3D 재현 모델이며, 실제 유물과 세부가 다를 수 있습니다.
          </p>
        </div>
      </section>

      <Giwa on="green" />

      {/* 파트너십 */}
      <section id="partner" className="gt-sec green" aria-labelledby="partner-title">
        <div className="gt-wrap gt-partner">
          <div>
            <p className="gt-eyebrow">단체 · MICE · 인바운드 문의</p>
            <h2 id="partner-title" className="gt-h2" data-reveal style={{ marginTop: 14 }}>
              경주 일정에 ‘2시간의 경험’을 더하는 가장 간단한 방법.
            </h2>
            <p className="gt-lead" data-reveal style={{ marginTop: 18 }}>
              숙박·식사·행사장에 더해, 참가자가 기억할 ‘경주다운 경험’을
              제안하세요. 네 가지만 알려주시면 현지 동선과 참가자 특성에 맞는
              프로그램을 제안합니다.
            </p>
            <ol className="gt-four">
              {["행사명", "날짜", "예상 인원", "가능한 시간대"].map((t, i) => (
                <li key={t} data-reveal style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}>
                  <b aria-hidden="true">0{i + 1}</b>
                  <strong>{t}</strong>
                </li>
              ))}
            </ol>
            <ul className="gt-partner-tags" aria-label="이런 파트너와 함께합니다">
              {["PCO", "여행사", "행사기획사", "기업", "공공기관", "학교·교육기관"].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="gt-contact">
              <Link href="/quote" className="gt-btn ink" data-reveal>
                단체·MICE 제안 받기 <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link href="/partners" className="gt-btn line-ink" data-reveal>
                파트너 소개 자세히 보기
              </Link>
              <div className="gt-contact-lines">
                <a href="tel:01055527971">
                  <small>단체 문의</small>010-5552-7971
                </a>
                <a href="mailto:gjtrip11@naver.com">
                  <small>이메일</small>gjtrip11@naver.com
                </a>
              </div>
            </div>
            <div className="gt-inbound gt-en-copy" lang="en" data-reveal>
              <p className="gt-eyebrow ink">Inbound · Incentive</p>
              <p>
                Add two hours of Gyeongju to your itinerary. English-guided
                heritage tours are available on request.
              </p>
              <Link href="/partners?lang=en">Partner profile in English →</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
