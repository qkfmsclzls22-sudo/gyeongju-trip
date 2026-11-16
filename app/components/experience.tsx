import Image from "next/image";

type Lang = "ko" | "en";

interface Program {
  id: string;
  photos: { src: string; alt: Record<Lang, string> }[];
  name: Record<Lang, string>;
  text: Record<Lang, string>;
  tags: Record<Lang, string[]>;
}

/**
 * 단체·MICE 맞춤 프로그램 (도슨트 투어 외에 기획할 수 있는 체험·공연·유니크베뉴).
 * 사진은 프로그램의 성격을 보여주는 예시 컷입니다.
 */
const programs: Program[] = [
  {
    id: "seonbi",
    photos: [
      {
        src: "/media/photo/exp-seonbi.webp",
        alt: { ko: "서원 앞에서 갓과 도포를 갖춰 입은 참가자들", en: "Participants in scholar robes and gat hats at a Confucian academy" },
      },
      {
        src: "/media/photo/exp-seonbi-2.webp",
        alt: { ko: "붓으로 글씨를 쓰는 서예 체험", en: "Brush calligraphy session" },
      },
      {
        src: "/media/photo/exp-seonbi-3.webp",
        alt: { ko: "도포 차림으로 오래된 은행나무를 올려다보는 참가자들", en: "Participants in robes looking up at an old ginkgo tree" },
      },
    ],
    name: { ko: "선비 체험", en: "Seonbi Scholar Experience" },
    text: {
      ko: "갓과 도포를 갖춰 입고 서원에서 보내는 선비의 하루.",
      en: "Put on a scholar’s robe and gat hat and spend time the Joseon scholar’s way at a Confucian academy.",
    },
    tags: { ko: ["선비 복식", "서예", "서원 탐방"], en: ["Scholar attire", "Calligraphy", "Seowon visit"] },
  },
  {
    id: "hwarang",
    photos: [
      {
        src: "/media/photo/exp-hwarang.webp",
        alt: { ko: "화랑복을 입고 활시위를 당기는 참가자", en: "A participant in Hwarang uniform drawing a traditional bow" },
      },
      {
        src: "/media/photo/exp-hwarang-2.webp",
        alt: { ko: "화랑복 차림으로 붓글씨를 쓰는 모습", en: "Calligraphy in Hwarang uniform" },
      },
    ],
    name: { ko: "화랑 체험", en: "Hwarang Experience" },
    text: {
      ko: "화랑복을 입고 활을 쏘고 차를 나누는, 신라 화랑의 수련.",
      en: "Wear the Hwarang uniform and try the training of Silla’s young warriors: archery, tea and calligraphy.",
    },
    tags: { ko: ["국궁", "다도", "서예"], en: ["Archery", "Tea ceremony", "Calligraphy"] },
  },
  {
    id: "stage",
    photos: [
      {
        src: "/media/photo/exp-stage.webp",
        alt: { ko: "조명을 밝힌 전통 건축 앞에서 열린 야간 국악 공연", en: "An evening gugak performance in front of an illuminated traditional hall" },
      },
    ],
    name: { ko: "전통문화 · 예술 공연", en: "Traditional & Performing Arts" },
    text: {
      ko: "국악과 판소리부터 예술 공연까지, 행사 분위기에 맞춰 무대를 구성합니다.",
      en: "From gugak and pansori to contemporary performances, staged to suit the mood of your event.",
    },
    tags: { ko: ["국악", "판소리", "예술 공연"], en: ["Gugak", "Pansori", "Art performance"] },
  },
  {
    id: "venue",
    photos: [
      {
        src: "/media/photo/exp-venue.webp",
        alt: { ko: "고택 마당에 둘러앉아 다도를 체험하는 단체 참가자들", en: "A group seated in a hanok courtyard for a tea ceremony" },
      },
    ],
    name: { ko: "문화유산 유니크베뉴", en: "Heritage Unique Venues" },
    text: {
      ko: "서원·고택 같은 문화유산 공간을 행사의 무대로 활용하는 프로그램을 기획합니다.",
      en: "Programs that turn heritage spaces such as seowon academies and hanok houses into the stage for your event.",
    },
    tags: { ko: ["서원", "고택", "야간 프로그램"], en: ["Seowon", "Hanok", "Evening program"] },
  },
];

export function ExperienceCards({ lang = "ko" }: { lang?: Lang }) {
  return (
    <div className="gt-exp">
      {programs.map((p, i) => (
        <article key={p.id} data-reveal style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}>
          <div className={`m n${p.photos.length}`}>
            {p.photos.map((photo, k) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={k === 0 ? photo.alt[lang] : ""}
                fill
                sizes="(max-width: 600px) 78vw, (max-width: 900px) 44vw, 300px"
              />
            ))}
            <b aria-hidden="true">0{i + 1}</b>
          </div>
          <div className="b">
            <h3>{p.name[lang]}</h3>
            <p>{p.text[lang]}</p>
            <ul>
              {p.tags[lang].map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
