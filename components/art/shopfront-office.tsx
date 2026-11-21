import type { ReactNode } from 'react';
import { useId } from 'react';

/**
 * Victorian glazed shopfront window frame with gold-leaf transom signwriting
 * ("KEYSTONE & GOLD") and steel cable display rods for hanging featured listings.
 */
export function ShopfrontWindow({
  label = 'KEYSTONE & GOLD',
  sublabel = '218 NICHOLSON STREET · CARLTON',
  children,
}: {
  label?: string;
  sublabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative border-2 border-ink bg-surface shadow-[0_14px_36px_-24px_rgba(30,31,34,0.4)]">
      {/* Upper glazed transom with gold-leaf signwriting */}
      <div className="bluestone-band relative border-b-2 border-ink px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-gold-leaf" aria-hidden="true" />
            <p className="font-display text-lg tracking-[0.22em] text-gold-leaf sm:text-2xl">
              {label}
            </p>
          </div>
          <p className="mono-label text-band-muted">{sublabel}</p>
        </div>
        {/* Single crisp gold-leaf highlight rule */}
        <div className="gold-leaf-rule mt-3.5" aria-hidden="true" />
      </div>

      {/* Glazed window pane with vertical steel display rods */}
      <div className="relative px-4 pt-8 pb-7 sm:px-8 sm:pt-10 sm:pb-10">
        {/* Corner brass glass mullions */}
        <span className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-gold-leaf" aria-hidden="true" />
        <span className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-gold-leaf" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-gold-leaf" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-gold-leaf" aria-hidden="true" />

        {/* Subtle diagonal glass reflection lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 1200 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="120" y1="0" x2="0" y2="180" stroke="var(--art-stroke)" strokeWidth="2" />
          <line x1="145" y1="0" x2="0" y2="215" stroke="var(--art-stroke)" strokeWidth="1" />
          <line x1="1180" y1="300" x2="1040" y2="500" stroke="var(--art-stroke)" strokeWidth="1.5" />
        </svg>

        {children}
      </div>

      {/* Shopfront timber sill & bluestone stallriser */}
      <div className="flex items-center justify-between border-t-2 border-ink bg-raised px-5 py-2.5 sm:px-8">
        <span className="mono-label text-muted">Display window · Inner-north sales</span>
        <span className="mono-label text-gold-text">Carlton VIC 3053</span>
      </div>
    </div>
  );
}

/** Architectural elevation of the Carlton shopfront at 218 Nicholson Street with the Exhibition Building dome behind. */
export function OfficeElevation({ className = 'w-full h-auto' }: { className?: string }) {
  const uid = useId();
  const dotId = `office-dot-${uid}`;

  return (
    <svg
      viewBox="0 0 460 320"
      className={className}
      role="img"
      aria-label="Architectural elevation of Keystone & Gold Realty at 218 Nicholson Street, Carlton, with the Royal Exhibition Building dome behind"
    >
      <defs>
        <pattern id={dotId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.9" fill="var(--art-stroke)" fillOpacity="0.16" />
        </pattern>
      </defs>

      {/* Sky frame */}
      <rect x="6" y="6" width="448" height="308" fill="var(--art-sky)" stroke="var(--art-stroke)" strokeWidth="1.5" />
      <rect x="6" y="6" width="448" height="84" fill={`url(#${dotId})`} opacity="0.55" />

      {/* Royal Exhibition Building dome faint behind left */}
      <g opacity="0.38" stroke="var(--art-stroke)" strokeWidth="1.15" fill="none">
        <rect x="36" y="88" width="96" height="42" fill="var(--art-fill-alt)" />
        <path d="M40 88 C44 42, 124 42, 128 88 Z" fill="var(--art-fill-alt)" />
        <line x1="84" y1="43" x2="84" y2="88" />
        <rect x="76" y="28" width="16" height="15" fill="var(--art-fill-alt)" />
        <path d="M75 28 L84 18 L93 28 Z" fill="var(--art-brass)" />
        <line x1="84" y1="10" x2="84" y2="18" stroke="var(--art-brass)" strokeWidth="1.4" />
      </g>

      {/* Main Victorian 2-storey corner shopfront at 218 Nicholson St */}
      <g stroke="var(--art-stroke)" strokeWidth="1.5" strokeLinecap="square">
        {/* Parapet */}
        <polygon points="108,82 108,66 206,66 236,48 266,66 368,66 368,82" fill="var(--art-fill-main)" />
        <circle cx="236" cy="44" r="4" fill="var(--art-brass)" />
        <line x1="108" y1="77" x2="368" y2="77" stroke="var(--art-brass)" strokeWidth="1.2" />

        {/* Upper level office (Level 1) */}
        <rect x="108" y="82" width="260" height="86" fill="var(--art-fill-main)" />
        {/* Three tall arched Level 1 windows */}
        {[132, 214, 296].map(wx => (
          <g key={wx}>
            <path d={`M${wx} 154 V112 A20,20 0 0 1 ${wx + 40},112 V154 Z`} fill="var(--art-window)" />
            <line x1={wx + 20} y1="92" x2={wx + 20} y2="154" strokeWidth="1.1" />
            <line x1={wx} y1="126" x2={wx + 40} y2="126" strokeWidth="1.1" />
            <polygon points={`${wx + 16},87 ${wx + 24},87 ${wx + 22.5},94 ${wx + 17.5},94`} fill="var(--art-brass)" strokeWidth="0.9" />
          </g>
        ))}

        {/* Verandah fascia with gold-leaf signwriting */}
        <rect x="96" y="166" width="284" height="26" fill="var(--art-fill-bluestone)" />
        <line x1="96" y1="170" x2="380" y2="170" stroke="var(--art-brass)" strokeWidth="1.2" />
        <text
          x="238"
          y="183.5"
          textAnchor="middle"
          fill="var(--art-brass)"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.22em' }}
        >
          KEYSTONE &amp; GOLD · NO. 218
        </text>

        {/* Ground shopfront glazing & bluestone stair entry */}
        <rect x="108" y="192" width="260" height="92" fill="var(--art-fill-alt)" />
        {/* Glazed listing display window */}
        <rect x="122" y="204" width="160" height="66" fill="var(--art-window)" />
        {/* Hanging cards in shopfront window */}
        {[140, 186, 232].map(cx => (
          <g key={cx}>
            <line x1={cx + 16} y1="204" x2={cx + 16} y2="270" stroke="var(--art-stroke-soft)" strokeWidth="0.8" />
            <rect x={cx} y="218" width="32" height="38" fill="var(--art-fill-main)" strokeWidth="1.1" />
            <line x1={cx + 5} y1="246" x2={cx + 27} y2="246" stroke="var(--art-brass)" strokeWidth="1.5" />
          </g>
        ))}

        {/* Arched entry doorway + brass name plate beside it */}
        <path d="M300 284 V224 A22,22 0 0 1 344,224 V284 Z" fill="var(--art-fill-bluestone)" />
        <path d="M306 224 A16,16 0 0 1 338,224 Z" fill="var(--art-window)" />
        <rect x="287" y="240" width="9" height="16" fill="var(--art-brass)" strokeWidth="1" />

        {/* Verandah cast-iron columns */}
        <line x1="104" y1="192" x2="104" y2="284" strokeWidth="2" />
        <line x1="372" y1="192" x2="372" y2="284" strokeWidth="2" />

        {/* Route 96 tram overhead wire & street tree */}
        <circle cx="56" cy="236" r="24" fill="var(--art-foliage)" />
        <line x1="56" y1="260" x2="56" y2="284" strokeWidth="2.5" />
        <circle cx="414" cy="240" r="22" fill="var(--art-foliage)" />
        <line x1="414" y1="262" x2="414" y2="284" strokeWidth="2.5" />
      </g>

      {/* Bluestone kerb & Nicholson St footpath */}
      <rect x="6" y="284" width="448" height="30" fill="var(--art-fill-bluestone)" />
      <line x1="6" y1="284" x2="454" y2="284" stroke="var(--art-stroke)" strokeWidth="1.6" />
      <text
        x="230"
        y="303"
        textAnchor="middle"
        fill="#F4F1EA"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em' }}
      >
        NICHOLSON STREET · STOP 12 TRAM 96
      </text>
    </svg>
  );
}
