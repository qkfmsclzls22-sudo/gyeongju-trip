export type IconProps = { className?: string };

function Svg({ children, className = "w-6 h-6" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const IconMuseum = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 21h18" />
    <path d="M5.5 21V10M9.8 21V10M14.2 21V10M18.5 21V10" />
    <path d="M12 3 3.5 7.6v1.8h17V7.6L12 3Z" />
  </Svg>
);

export const IconMoon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 14.8A8.6 8.6 0 0 1 9.2 4a8.6 8.6 0 1 0 10.8 10.8Z" />
    <path d="M17.2 3v3M15.7 4.5h3" />
  </Svg>
);

export const IconPagoda = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 21h18" />
    <path d="M12 3 5.5 7.6h13L12 3Z" />
    <path d="M4 12.2h16l-2.2-3.4H6.2L4 12.2Z" />
    <path d="M7 12.2V21M17 12.2V21" />
    <path d="M10 21v-4.4h4V21" />
  </Svg>
);

export const IconTower = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 21h16" />
    <path d="M7.5 21V9.5C7.5 6 9.5 3 12 3s4.5 3 4.5 6.5V21" />
    <path d="M7.8 13.5h8.4" />
    <path d="M10.3 8.5h3.4" />
  </Svg>
);

export const IconChat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 15a3 3 0 0 1-3 3H8.5L4 21V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9Z" />
    <path d="M8 9h8M8 13h5" />
  </Svg>
);

export const IconGuide = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="7.5" r="3.2" />
    <path d="M3 21v-1.4A4.6 4.6 0 0 1 7.6 15h2.8a4.6 4.6 0 0 1 4.6 4.6V21" />
    <path d="M17.4 8a4 4 0 0 1 0 6" />
    <path d="M19.9 5.5a7.2 7.2 0 0 1 0 11" />
  </Svg>
);

export const IconUsers = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.6 20.5v-1.2A4.6 4.6 0 0 1 7.2 14.7h3.6a4.6 4.6 0 0 1 4.6 4.6v1.2" />
    <path d="M16.2 5.6a3.2 3.2 0 0 1 0 6" />
    <path d="M17.6 14.9h.6a3.6 3.6 0 0 1 3.6 3.6v2" />
  </Svg>
);

export const IconCamera = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 8.8A2.6 2.6 0 0 1 5.6 6.2h1.7L8.5 4h7l1.2 2.2h1.7A2.6 2.6 0 0 1 21 8.8v8.6A2.6 2.6 0 0 1 18.4 20H5.6A2.6 2.6 0 0 1 3 17.4V8.8Z" />
    <circle cx="12" cy="13" r="3.3" />
  </Svg>
);

export const IconMedal = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="15" r="5.2" />
    <path d="M8.4 10.4 6 3h12l-2.4 7.4" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 7v5.3l3.2 1.9" />
  </Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.4 3h3.1l1.5 4-2.1 1.5a12.4 12.4 0 0 0 5.6 5.6L16 12l4 1.5v3.1A2.4 2.4 0 0 1 17.4 20 15.4 15.4 0 0 1 4 6.6 2.4 2.4 0 0 1 6.4 3Z" />
  </Svg>
);

export const IconArrow = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h13M12.5 6l6 6-6 6" />
  </Svg>
);

export const IconMapPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
);

export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 16.5v-5M12 8.2h.01" />
  </Svg>
);

export const IconWallet = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 7.6A2.6 2.6 0 0 1 5.6 5h11.2a2 2 0 0 1 2 2v2" />
    <path d="M3 7.6v8.8A2.6 2.6 0 0 0 5.6 19h12.8a2.6 2.6 0 0 0 2.6-2.6v-4.8A2.6 2.6 0 0 0 18.4 9H5.6A2.6 2.6 0 0 1 3 7.6Z" />
    <path d="M17 14h.01" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.8 12.6 4.8 4.8L19.2 6.6" />
  </Svg>
);

export const IconHeadphones = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.2 14.5v-2.3a7.8 7.8 0 0 1 15.6 0v2.3" />
    <path d="M4.2 14.6A2.4 2.4 0 0 1 6.6 12.2h.8v7h-.8a2.4 2.4 0 0 1-2.4-2.4v-2.2Z" />
    <path d="M19.8 14.6a2.4 2.4 0 0 0-2.4-2.4h-.8v7h.8a2.4 2.4 0 0 0 2.4-2.4v-2.2Z" />
  </Svg>
);

export const IconSparkle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11.5 3.5 13.3 8.7 18.5 10.5 13.3 12.3 11.5 17.5 9.7 12.3 4.5 10.5 9.7 8.7 11.5 3.5Z" />
    <path d="M18 15.5 18.7 17.4 20.5 18 18.7 18.7 18 20.5 17.3 18.7 15.5 18 17.3 17.4 18 15.5Z" />
  </Svg>
);

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-3.2 7-9V6.2L12 3.5 5 6.2V12c0 5.8 7 9 7 9Z" />
  </Svg>
);

export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5.2" width="17" height="15.3" rx="2.6" />
    <path d="M3.5 10.2h17M8 3.2v3.4M16 3.2v3.4" />
  </Svg>
);

export const IconRoute = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="6" cy="6.5" r="2.5" />
    <circle cx="18" cy="17.5" r="2.5" />
    <path d="M8.5 6.5H14a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5.5" />
  </Svg>
);

export function IconStar({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="m12 3.4 2.7 5.4 6 .9-4.3 4.2 1 5.9-5.4-2.8-5.4 2.8 1-5.9L3.3 9.7l6-.9L12 3.4Z" />
    </svg>
  );
}
