"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ReelPlayer } from "@/app/components/home-client";
import { Giwa, Mounds } from "@/app/components/motifs";
import { corporateClients, schoolClients } from "@/lib/clients";

type Lang = "ko" | "en";

const copy = {
  ko: {
    eyebrow: "Korea MICE Expo 2026 · 파트너 소개",
    title: ["경주 MICE의 시간을", "문화유산 경험으로 완성합니다."],
    sub: "기업·기관·인센티브·교육단체를 위한 경주 현지 문화관광 파트너",
    cta: "제안 받기",
    ctaSub: "45초 소개 영상",
    companyEyebrow: "01 Company",
    companyTitle: "경주를 기획하는 MICE 파트너의 현지 콘텐츠 팀",
    companyBody: [
      "경주트립은 경주의 역사와 문화유산을 기반으로 전문 해설, 스토리텔링, 야간관광을 기획·운영하는 문화관광 전문기업입니다.",
      "기업행사·워크숍·연수·포럼·인센티브 투어의 일정과 규모에 맞춰 코스, 해설 콘텐츠, 팀 분할, 수신기, 집결·종료 동선까지 현장에서 운영합니다.",
    ],
    companyQuote: "기획사는 행사에 집중하고, 경주의 현장은 경주트립이 맡습니다.",
    whyEyebrow: "02 Why Gyeongju Trip",
    whyTitle: "현장에서 검증된 운영력이 차이를 만듭니다.",
    why: [
      ["문화유산 전문성", "불국사·국립경주박물관·신라왕경을 이야기와 맥락이 있는 경험으로 구성합니다."],
      ["단체 운영 역량", "규모에 따라 팀을 분할하고 수신기를 활용해 이동과 해설의 집중도를 관리합니다."],
      ["맞춤형 B2B 협업", "행사 전체 일정에 맞춰 시작·종료 시간, 장소, 소요시간과 프로그램을 조정합니다."],
      ["실제 운영 경험", "기업·공공기관·학교·일반 관광객까지 다양한 현장을 지속적으로 운영하고 있습니다."],
    ],
    progEyebrow: "03 MICE Programs",
    progTitle: "행사 전후에 바로 결합할 수 있는 경주 로컬 프로그램",
    programs: [
      ["국립경주박물관 도슨트", "천년 신라를 대표 유물로 이해하는 실내 중심 프로그램", "실내 중심"],
      ["불국사 문화유산 투어", "건축·불교문화·석가탑과 다보탑의 이야기를 현장에서 연결", "야외 도보"],
      ["신라 야경 도보투어", "신라왕경의 야경과 역사 스토리텔링을 결합한 야간 프로그램", "야간 도보"],
    ],
    spec: { duration: "소요 시간", durationV: "약 2시간", type: "진행 형태", time: "시작 시간", timeV: "행사 일정에 맞춰 조정", ops: "단체 운영", opsV: "팀 분할 · 수신기" },
    stepsEyebrow: "04 Partnership",
    stepsTitle: "경주 일정에 ‘2시간의 경험’을 더하는 가장 간단한 방법",
    stepsLead: "숙박·식사·행사장에 더해 참가자가 기억할 ‘경주다운 경험’을 제안하세요.",
    steps: [
      ["네 가지만 알려주세요", "행사명 · 날짜 · 예상 인원 · 가능한 시간대"],
      ["프로그램 제안", "현지 동선과 참가자 특성에 맞는 코스와 소요시간을 제안합니다."],
      ["일정 조율", "시작·종료 시간, 집결·종료 동선, 팀 구성을 행사 일정에 맞춥니다."],
      ["현장 운영", "해설사 배정, 팀 분할, 수신기 운영까지 현장에서 맡습니다."],
    ],
    partnersLabel: "Ideal Partners",
    partners: ["PCO", "여행사", "행사기획사", "기업", "공공기관", "학교·교육기관"],
    refEyebrow: "References",
    refTitle: "함께한 기업 · 기관 · 학교",
    stats: [["평균 별점", "4.92"], ["누적 리뷰", "1,300+"], ["단체·MICE 진행 인원", "1,500+"]],
    historyTitle: "연혁",
    history: [
      ["2025.09", "경주트립 설립"],
      ["2025.11", "투어 프로그램 개발"],
      ["2026.02", "경북관광기업지원센터 입주기업 선정"],
      ["2026.02", "네이버 스마트스토어 프리미엄 우수셀러 달성"],
      ["2026.05", "경북관광스타트업 공모전 선정"],
      ["2026.06", "경주관광 MICE 얼라이언스 가입"],
      ["2026.09", "해오름동맹 혁신포럼 경주시 대표기업 선정"],
    ],
    contactTitle: "경주에서 만날 당신의 로컬 파트너.",
    contactLead: "인바운드 · 단체 · MICE 투어 연계 문의",
    contactCta: "단체·MICE 제안 받기",
    phone: "단체 문의",
    email: "이메일",
    photoAlt: "불국사에서 단체 해설을 듣는 참가자들",
    reelLabel: "경주트립 3대 투어 소개 영상",
  },
  en: {
    eyebrow: "Korea MICE Expo 2026 · Partner Profile",
    title: ["Complete Your Gyeongju MICE", "with Local Heritage Experiences."],
    sub: "A local cultural experience partner for corporate events, institutions, incentive groups and education programs.",
    cta: "Request a proposal",
    ctaSub: "45-second intro film",
    companyEyebrow: "01 Company",
    companyTitle: "Your Local Content Team for MICE in Gyeongju",
    companyBody: [
      "Gyeongju Trip specializes in heritage interpretation, storytelling and night experiences built around the history and cultural assets of Gyeongju.",
      "For corporate events, workshops, forums and incentive travel, we coordinate routes, storytelling, group division, audio receivers, meeting points and on-site flow.",
    ],
    companyQuote: "You focus on the event. We take care of the Gyeongju experience.",
    whyEyebrow: "02 Why Gyeongju Trip",
    whyTitle: "Proven Local Operations Make the Difference",
    why: [
      ["Heritage Expertise", "We turn major heritage sites into meaningful experiences through context and storytelling."],
      ["Group-Ready Operations", "Teams and audio receivers help manage movement and engagement for larger groups."],
      ["Flexible B2B Collaboration", "Times, meeting points, duration and program composition can fit your event schedule."],
      ["Proven Field Experience", "We continuously operate programs for corporate, public-sector, school and traveler groups."],
    ],
    progEyebrow: "03 MICE Programs",
    progTitle: "Local Experiences That Fit Before or After Your Event",
    programs: [
      ["Gyeongju National Museum", "An indoor-focused docent tour through iconic Silla artifacts.", "Indoor"],
      ["Bulguksa Heritage Tour", "Architecture, Buddhist culture and the stories of Seokgatap and Dabotap.", "Outdoor walking"],
      ["Silla Night Walking Tour", "Illuminated heritage combined with historical storytelling.", "Evening walking"],
    ],
    spec: { duration: "Duration", durationV: "Approx. 2 hours", type: "Format", time: "Start time", timeV: "Adjusted to your schedule", ops: "Group operations", opsV: "Team division · audio receivers" },
    stepsEyebrow: "04 Partnership",
    stepsTitle: "Add Two Hours of Gyeongju to Your MICE Itinerary",
    stepsLead: "Add a memorable local experience to your venue, accommodation and dining plan.",
    steps: [
      ["Share four details", "Event · Date · Group size · Available time"],
      ["Program proposal", "We recommend a suitable route and duration for your itinerary and participants."],
      ["Schedule alignment", "Start and end times, meeting points and team composition are fitted to your event."],
      ["On-site operation", "Guides, group division and audio receivers are handled by our team on the day."],
    ],
    partnersLabel: "Ideal Partners",
    partners: ["PCOs", "Travel Agencies", "Event Planners", "Corporations", "Institutions", "Schools"],
    refEyebrow: "References",
    refTitle: "Companies, institutions and schools we have hosted",
    stats: [["Average rating", "4.92"], ["Reviews", "1,300+"], ["Group & MICE guests", "1,500+"]],
    historyTitle: "Milestones",
    history: [
      ["2025.09", "Gyeongju Trip founded"],
      ["2025.11", "Tour programs developed"],
      ["2026.02", "Selected as a resident company of the Gyeongbuk Tourism Enterprise Support Center"],
      ["2026.02", "Reached Premium seller grade on Naver Smart Store"],
      ["2026.05", "Selected in the Gyeongbuk Tourism Startup Competition"],
      ["2026.06", "Joined the Gyeongju Tourism MICE Alliance"],
      ["2026.09", "Chosen to represent Gyeongju at the Haeoreum Alliance Innovation Forum"],
    ],
    contactTitle: "Your local partner in Gyeongju.",
    contactLead: "Inbound · Group · MICE tour partnership inquiries. English-guided tours are available on request.",
    contactCta: "Request a proposal",
    phone: "Group inquiries",
    email: "Email",
    photoAlt: "Group participants listening to a guide at Bulguksa Temple",
    reelLabel: "Gyeongju Trip three signature tours film",
  },
} as const;

const clientEn: Record<string, [string, string]> = {
  교보생명: ["Kyobo Life Insurance", "Bulguksa heritage tour"],
  롯데GRS: ["Lotte GRS", "Gyeongju National Museum docent tour"],
  "한국수력원자력 월성원자력본부": ["Korea Hydro & Nuclear Power, Wolsong", "Gyeongju National Museum docent tour"],
  부산교육연수원: ["Busan Education Training Institute", "Gyeongju National Museum docent tour"],
  금산군가족센터: ["Geumsan Family Center", "Gyeongju National Museum docent tour"],
  풍산금속: ["Poongsan", "Heritage tour, guided in English"],
  슈프리마: ["Suprema", "Silla night walking tour"],
  군산시공무원노동조합: ["Gunsan Public Officials’ Union", "Gyeongju National Museum docent tour"],
  한국체육진흥공단: ["Korea Sports Promotion Foundation", "Bulguksa tour"],
  "거제 중곡초등학교": ["Geoje Junggok Elementary School", "Bulguksa · Museum · Night tours"],
  허들링: ["Huddling", "Night tour · Bulguksa tour"],
  서울경기초등학교: ["Seoul Gyeonggi Elementary School", "Heritage tour"],
};
const countEn = (count: string) =>
  count.replace("여명", "+").replace("명", "");

const programMedia = ["museum", "bulguksa", "night"] as const;

export default function PartnersView({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = copy[lang];
  const clients = [...corporateClients, ...schoolClients];

  const change = (next: Lang) => {
    setLang(next);
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
  };

  return (
    <div lang={lang} className={lang === "en" ? "gt-en-copy" : undefined}>
      <section className="gt-wrap gt-phero" lang={lang}>
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <p className="gt-eyebrow">{t.eyebrow}</p>
            <div className="gt-lang" role="group" aria-label="Language">
              <button type="button" aria-pressed={lang === "ko"} onClick={() => change("ko")}>
                KR
              </button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => change("en")}>
                EN
              </button>
            </div>
          </div>
          <h1>
            {t.title[0]}
            <br />
            <span className="gt-gold">{t.title[1]}</span>
          </h1>
          <p className="gt-lead">{t.sub}</p>
          <div className="gt-actions">
            <Link href="/quote" className="gt-btn gold">
              {t.cta} <span className="arr" aria-hidden="true">→</span>
            </Link>
            <a href="#film" className="gt-btn line">
              {t.ctaSub}
            </a>
          </div>
        </div>
        <div className="gt-phero-media">
          <video
            src="/media/video/hero.mp4"
            poster="/media/video/hero.jpg"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            data-autoplay
            aria-hidden="true"
          />
        </div>
      </section>

      <Giwa />

      <section className="gt-sec paper">
        <div className="gt-wrap gt-two">
          <div>
            <p className="gt-eyebrow ink">{t.companyEyebrow}</p>
            <h2 className="gt-h2" style={{ marginTop: 14, fontSize: "clamp(28px, 4.4vw, 56px)" }} data-reveal>
              {t.companyTitle}
            </h2>
          </div>
          <div style={{ display: "grid", gap: 16, marginTop: 22 }}>
            {t.companyBody.map((p) => (
              <p key={p} className="gt-lead" data-reveal>
                {p}
              </p>
            ))}
            <p data-reveal style={{ fontWeight: 900, fontSize: "clamp(20px, 2.4vw, 30px)", lineHeight: 1.35, letterSpacing: "-0.045em" }}>
              <span className="gt-mark">{t.companyQuote}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="gt-sec paper" style={{ paddingTop: 0 }}>
        <div className="gt-wrap">
          <p className="gt-eyebrow ink">{t.whyEyebrow}</p>
          <h2 className="gt-h2" style={{ marginTop: 14, fontSize: "clamp(28px, 4.4vw, 56px)" }} data-reveal>
            {t.whyTitle}
          </h2>
          <div className="gt-why">
            <figure className="gt-why-photo" data-reveal="zoom">
              <Image src="/media/photo/bulguksa-group.webp" alt={t.photoAlt} fill sizes="(max-width: 900px) 100vw, 45vw" />
            </figure>
            <ol className="gt-why-list">
              {t.why.map(([title, text], i) => (
                <li key={title} data-reveal>
                  <b aria-hidden="true">0{i + 1}</b>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Mounds />

      <section className="gt-sec">
        <div className="gt-wrap">
          <div className="gt-head">
            <p className="gt-eyebrow">{t.progEyebrow}</p>
            <h2 className="gt-h2" style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }} data-reveal>
              {t.progTitle}
            </h2>
          </div>
          <div className="gt-prog">
            {t.programs.map(([name, desc, type], i) => (
              <article key={name} data-reveal style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <div className="m">
                  <video
                    src={`/media/video/tour-${programMedia[i]}.mp4`}
                    poster={`/media/video/tour-${programMedia[i]}.jpg`}
                    muted
                    loop
                    playsInline
                    preload="none"
                    data-autoplay
                    aria-hidden="true"
                  />
                  <b aria-hidden="true">0{i + 1}</b>
                </div>
                <div className="b">
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <dl>
                    <div>
                      <dt>{t.spec.duration}</dt>
                      <dd>{t.spec.durationV}</dd>
                    </div>
                    <div>
                      <dt>{t.spec.type}</dt>
                      <dd>{type}</dd>
                    </div>
                    <div>
                      <dt>{t.spec.time}</dt>
                      <dd>{t.spec.timeV}</dd>
                    </div>
                    <div>
                      <dt>{t.spec.ops}</dt>
                      <dd>{t.spec.opsV}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="film" className="gt-sec" style={{ paddingTop: 0 }}>
        <div className="gt-wrap">
          <ReelPlayer src="/media/video/kme-reel.mp4" poster="/media/video/kme-reel.jpg" label={t.reelLabel} />
        </div>
      </section>

      <section className="gt-sec" style={{ paddingTop: 0 }}>
        <div className="gt-wrap">
          <div className="gt-head">
            <p className="gt-eyebrow">{t.stepsEyebrow}</p>
            <h2 className="gt-h2" style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }} data-reveal>
              {t.stepsTitle}
            </h2>
            <p className="gt-lead" data-reveal>
              {t.stepsLead}
            </p>
          </div>
          <ol className="gt-steps">
            {t.steps.map(([title, text]) => (
              <li key={title} data-reveal>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p className="gt-eyebrow dim" style={{ marginTop: 40 }}>
            {t.partnersLabel}
          </p>
          <ul className="gt-partner-tags" style={{ marginTop: 12 }}>
            {t.partners.map((p) => (
              <li key={p} style={{ borderColor: "#fff" }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Giwa />

      <section className="gt-sec paper">
        <div className="gt-wrap gt-two">
          <div>
            <p className="gt-eyebrow ink">{t.refEyebrow}</p>
            <h2 className="gt-h2" style={{ marginTop: 14, fontSize: "clamp(28px, 4.4vw, 56px)" }} data-reveal>
              {t.refTitle}
            </h2>
            <dl className="gt-stats compact" style={{ borderTopColor: "rgba(26,28,32,.2)", marginTop: 28 }}>
              {t.stats.map(([label, value]) => (
                <div key={label}>
                  <dt style={{ color: "#45413a" }}>{label}</dt>
                  <dd style={{ color: "#1a1c20" }}>{value}</dd>
                </div>
              ))}
            </dl>
            <h3 style={{ fontWeight: 900, fontSize: 22, letterSpacing: "-0.045em", margin: "26px 0 8px" }}>{t.historyTitle}</h3>
            <ul className="gt-history">
              {t.history.map(([date, text]) => (
                <li key={text}>
                  <b>{date}</b>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="gt-clients" style={{ marginTop: 36 }}>
            <ul>
              {clients.map((c) => {
                const en = clientEn[c.name];
                return (
                  <li key={c.name} style={{ borderTopColor: "rgba(26,28,32,.18)" }}>
                    <strong>{lang === "en" && en ? en[0] : c.name}</strong>
                    <span style={{ color: "#1a1c20" }}>{lang === "en" ? countEn(c.count) : c.count}</span>
                    <p style={{ color: "#5a554c" }}>{lang === "en" && en ? en[1] : c.program}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <div className="gt-dan" aria-hidden="true" />

      <section className="gt-sec green">
        <div className="gt-wrap gt-partner">
          <div>
            <h2 className="gt-h2" data-reveal>
              {t.contactTitle}
            </h2>
            <p className="gt-lead" style={{ marginTop: 16 }} data-reveal>
              {t.contactLead}
            </p>
          </div>
          <div className="gt-contact" style={{ marginTop: 26 }}>
            <Link href="/quote" className="gt-btn ink">
              {t.contactCta} <span className="arr" aria-hidden="true">→</span>
            </Link>
            <div className="gt-contact-lines">
              <a href="tel:+821055527971">
                <small>{t.phone}</small>
                {lang === "en" ? "+82 10-5552-7971" : "010-5552-7971"}
              </a>
              <a href="mailto:gjtrip11@naver.com">
                <small>{t.email}</small>gjtrip11@naver.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
