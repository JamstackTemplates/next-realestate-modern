type IconProps = { className?: string };

const base = {
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  'aria-hidden': true as const,
};

export function BedIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 15V7.5M17.5 15V10.5H2.5M2.5 13H17.5M5.5 10.5V8.5H9V10.5" />
    </svg>
  );
}

export function BathIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 10.5H17.5V12.5C17.5 14.2 16.2 15.5 14.5 15.5H5.5C3.8 15.5 2.5 14.2 2.5 12.5V10.5Z" />
      <path d="M4.5 10.5V5.5C4.5 4.4 5.4 3.5 6.5 3.5C7.6 3.5 8.5 4.4 8.5 5.5" />
      <path d="M5 15.5V17M15 15.5V17" />
    </svg>
  );
}

export function CarIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 13.5V10L5.2 6.5H14.8L17 10V13.5H3Z" />
      <path d="M3 13.5V15.5H5.5V13.5M14.5 13.5V15.5H17V13.5" />
      <path d="M5.5 10.5H7M13 10.5H14.5" />
    </svg>
  );
}

export function LandIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="13" height="13" />
      <path d="M3.5 7.5H6.5M3.5 12.5H6.5M7.5 16.5V13.5M12.5 16.5V13.5" />
      <path d="M10 7.5L13 10.5M13 7.5L10 10.5" stroke="var(--gold-leaf)" />
    </svg>
  );
}

export function InternalIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3.5" width="14" height="13" />
      <path d="M9.5 3.5V10.5H3M9.5 10.5H14M13 16.5V12.5" />
    </svg>
  );
}

export function CalendarIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4.5" width="14" height="12.5" />
      <path d="M3 8.5H17M6.5 2.5V5.5M13.5 2.5V5.5" />
      <path d="M6.5 11.5H8.5M11.5 11.5H13.5M6.5 14H8.5" stroke="var(--gold-leaf)" />
    </svg>
  );
}

export function KeyTagIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="6.5" cy="7" r="3" />
      <path d="M9.2 8.2L16.5 15.5M13.5 12.5L15.5 10.5M15 14L17 12" />
      <rect x="2.5" y="12" width="5" height="5" fill="var(--gold-leaf)" stroke="var(--art-stroke)" strokeWidth="1.2" />
    </svg>
  );
}

export function PhoneIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 3.5H7.5L8.8 7.2L6.8 8.6C7.8 10.6 9.4 12.2 11.4 13.2L12.8 11.2L16.5 12.5V15.5C16.5 16.1 16 16.5 15.4 16.5C9.4 16.2 3.8 10.6 3.5 4.6C3.5 4 3.9 3.5 4.5 3.5Z" />
    </svg>
  );
}

export function MailIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4.5" width="15" height="11" />
      <path d="M2.5 5.5L10 11L17.5 5.5" />
    </svg>
  );
}

export function MapPinIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 17.2C10 17.2 15.5 12.4 15.5 8.2C15.5 5.2 13 2.8 10 2.8C7 2.8 4.5 5.2 4.5 8.2C4.5 12.4 10 17.2 10 17.2Z" />
      <circle cx="10" cy="8.2" r="2" fill="var(--gold-leaf)" stroke="none" />
    </svg>
  );
}

export function GavelIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M11 3.5L16.5 9L14 11.5L8.5 6L11 3.5Z" />
      <path d="M11 8.5L4 15.5M9.5 16.5H17.5" />
    </svg>
  );
}

export function ArrowRightIcon({ className = 'h-4 w-4 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 10H16M11.5 5.5L16 10L11.5 14.5" />
    </svg>
  );
}

export function MenuIcon({ className = 'h-5 w-5 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 5.5H17M3 10H17M3 14.5H17" />
    </svg>
  );
}

export function CloseIcon({ className = 'h-5 w-5 shrink-0' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 4.5L15.5 15.5M15.5 4.5L4.5 15.5" />
    </svg>
  );
}
