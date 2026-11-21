export function KeystoneMark({ className = 'h-9 w-9', decorative = true }: { className?: string; decorative?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden={decorative ? 'true' : undefined}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Keystone & Gold Realty mark'}
    >
      <rect x="2" y="2" width="44" height="44" fill="var(--art-fill-bluestone)" stroke="var(--art-brass)" strokeWidth="1.5" />
      <polygon points="15,7 33,7 29.5,22 18.5,22" fill="var(--art-brass)" stroke="var(--art-stroke)" strokeWidth="1.2" strokeLinejoin="miter" />
      <line x1="17" y1="9.25" x2="31" y2="9.25" stroke="var(--gold-highlight)" strokeWidth="1.25" strokeLinecap="square" />
      <line x1="10" y1="27" x2="38" y2="27" stroke="var(--art-brass)" strokeWidth="1" />
      <text
        x="24"
        y="40"
        textAnchor="middle"
        fill="#F4F1EA"
        style={{ fontFamily: 'var(--font-display)', fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.06em' }}
      >
        K&amp;G
      </text>
    </svg>
  );
}
