/** 전통 모티프: 기와 처마, 고분 능선, 갓. 모두 장식이라 보조기술에는 숨깁니다. */

/** 어두운 섹션이 밝은 섹션 위로 기와 처마처럼 내려앉는 경계 */
export function Giwa({ on = "paper" }: { on?: "paper" | "green" }) {
  return <div className={`gt-giwa${on === "green" ? " on-green" : ""}`} aria-hidden="true" />;
}

/** 밝은 섹션 아래에서 어두운 섹션이 대릉원 고분 능선처럼 솟는 경계 */
export function Mounds({ on = "paper" }: { on?: "paper" | "green" }) {
  return (
    <div className={`gt-mounds${on === "green" ? " on-green" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 84" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0 84V70C150 70 250 26 420 26C580 26 640 58 760 58C880 58 960 10 1110 10C1280 10 1340 70 1440 70V84Z"
        />
      </svg>
    </div>
  );
}

/** 갓 선화 (해설사·선비의 상징) */
export function GatMark() {
  return (
    <svg
      className="gt-gat"
      viewBox="0 0 92 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="46" cy="41" rx="43" ry="9" />
      <path d="M30 39L33 13Q46 8 59 13L62 39" />
      <ellipse cx="46" cy="13" rx="13" ry="3.4" />
      <path d="M31 33Q46 38 61 33" />
    </svg>
  );
}
