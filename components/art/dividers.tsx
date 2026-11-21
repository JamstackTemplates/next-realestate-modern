import { useId } from 'react';

/** Repeating Victorian cast-iron lace verandah frieze border. */
export function IronLaceFrieze({
  className = 'w-full h-5',
  tone = 'default',
}: {
  className?: string;
  tone?: 'default' | 'band';
}) {
  const patternId = useId();
  const stroke = tone === 'band' ? 'var(--gold-leaf)' : 'var(--art-stroke)';
  const accent = 'var(--gold-leaf)';

  return (
    <svg
      className={className}
      viewBox="0 0 960 22"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="48" height="22" patternUnits="userSpaceOnUse">
          <line x1="0" y1="2" x2="48" y2="2" stroke={stroke} strokeWidth="1.4" />
          <line x1="0" y1="20" x2="48" y2="20" stroke={accent} strokeWidth="1" opacity="0.85" />
          {/* Victorian cast-iron trefoil arch and drop pendant */}
          <path
            d="M0 19 C6 19, 8 6, 16 6 C21 6, 23 11, 24 14 C25 11, 27 6, 32 6 C40 6, 42 19, 48 19"
            fill="none"
            stroke={stroke}
            strokeWidth="1.25"
          />
          <circle cx="16" cy="11.5" r="2.1" fill="none" stroke={stroke} strokeWidth="1.1" />
          <circle cx="32" cy="11.5" r="2.1" fill="none" stroke={stroke} strokeWidth="1.1" />
          <polygon points="24,4 26.5,8 24,11 21.5,8" fill={accent} />
          <circle cx="0" cy="8" r="1.4" fill={accent} />
          <circle cx="48" cy="8" r="1.4" fill={accent} />
        </pattern>
      </defs>
      <rect x="0" y="0" width="960" height="22" fill={`url(#${patternId})`} />
    </svg>
  );
}

/** Staggered Melbourne bluestone kerb & cobble sett divider strip. */
export function BluestoneSettBand({ className = 'w-full h-4' }: { className?: string }) {
  const patternId = useId();
  return (
    <svg
      className={className}
      viewBox="0 0 960 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="64" height="16" patternUnits="userSpaceOnUse">
          <rect width="64" height="16" fill="var(--art-fill-bluestone)" />
          <rect x="1" y="1" width="29" height="6" fill="var(--art-fill-roof)" stroke="var(--gold-leaf)" strokeWidth="0.6" strokeOpacity="0.45" />
          <rect x="33" y="1" width="30" height="6" fill="var(--art-fill-roof)" stroke="var(--gold-leaf)" strokeWidth="0.6" strokeOpacity="0.45" />
          <rect x="16" y="9" width="30" height="6" fill="var(--art-fill-roof)" stroke="var(--gold-leaf)" strokeWidth="0.6" strokeOpacity="0.45" />
          <rect x="-15" y="9" width="28" height="6" fill="var(--art-fill-roof)" stroke="var(--gold-leaf)" strokeWidth="0.6" strokeOpacity="0.45" />
          <rect x="49" y="9" width="28" height="6" fill="var(--art-fill-roof)" stroke="var(--gold-leaf)" strokeWidth="0.6" strokeOpacity="0.45" />
        </pattern>
      </defs>
      <rect width="960" height="16" fill={`url(#${patternId})`} />
    </svg>
  );
}

/** Architectural terrace floor-plan line drawing for How we sell and Appraisal. */
export function FloorPlanDrawing({
  className = 'w-full h-auto',
  labeled = false,
}: {
  className?: string;
  labeled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 360 440"
      className={className}
      role="img"
      aria-label="Architectural floor plan drawing of a classic inner-north terrace showing verandah, rooms, staircase and north courtyard"
    >
      {/* Drafting border and dimension ticks */}
      <line x1="28" y1="22" x2="332" y2="22" stroke="var(--art-stroke-soft)" strokeWidth="0.9" strokeDasharray="3 3" />
      <line x1="28" y1="16" x2="28" y2="28" stroke="var(--art-brass)" strokeWidth="1.2" />
      <line x1="332" y1="16" x2="332" y2="28" stroke="var(--art-brass)" strokeWidth="1.2" />
      <text x="180" y="16" textAnchor="middle" fill="var(--art-stroke-soft)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em' }}>
        NORTH ASPECT · 6.4M FRONTAGE
      </text>

      {/* North courtyard */}
      <rect x="44" y="38" width="272" height="82" fill="var(--art-fill-alt)" stroke="var(--art-stroke)" strokeWidth="1.5" />
      {/* Bluestone pavers */}
      <path d="M44 65H316M44 92H316M112 38V120M180 38V120M248 38V120" stroke="var(--art-stroke-soft)" strokeWidth="0.7" opacity="0.55" />
      {/* Courtyard tree circle */}
      <circle cx="92" cy="78" r="21" fill="var(--art-foliage)" fillOpacity="0.28" stroke="var(--art-stroke)" strokeWidth="1.2" strokeDasharray="4 2" />
      <circle cx="92" cy="78" r="3" fill="var(--art-brass)" />
      {labeled && (
        <text x="232" y="82" textAnchor="middle" fill="var(--art-stroke)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em' }}>
          COURTYARD
        </text>
      )}

      {/* Main terrace footprint */}
      <rect x="44" y="120" width="272" height="252" fill="var(--art-fill-main)" stroke="var(--art-stroke)" strokeWidth="2" />

      {/* Rear kitchen & living pavilion */}
      <line x1="44" y1="224" x2="316" y2="224" stroke="var(--art-stroke)" strokeWidth="1.5" />
      {/* Steel bifold doors to courtyard */}
      <line x1="88" y1="120" x2="272" y2="120" stroke="var(--art-brass)" strokeWidth="3.5" />
      {/* Kitchen island */}
      <rect x="78" y="152" width="88" height="28" fill="var(--art-fill-alt)" stroke="var(--art-stroke)" strokeWidth="1.3" />
      <circle cx="102" cy="166" r="5" fill="none" stroke="var(--art-stroke)" strokeWidth="1.1" />
      {/* Dining table outline */}
      <rect x="206" y="146" width="76" height="44" fill="none" stroke="var(--art-stroke-soft)" strokeWidth="1.1" />

      {/* Central hallway & staircase */}
      <line x1="128" y1="224" x2="128" y2="372" stroke="var(--art-stroke)" strokeWidth="1.5" />
      {/* Stairs */}
      <rect x="44" y="224" width="46" height="72" fill="var(--art-fill-alt)" stroke="var(--art-stroke)" strokeWidth="1.2" />
      <path d="M44 236H90M44 248H90M44 260H90M44 272H90M44 284H90" stroke="var(--art-stroke-soft)" strokeWidth="1" />
      <path d="M67 290V232M63 238L67 232L71 238" fill="none" stroke="var(--art-brass)" strokeWidth="1.3" />

      {/* Front formal rooms */}
      <line x1="128" y1="298" x2="316" y2="298" stroke="var(--art-stroke)" strokeWidth="1.5" />
      {/* Door swing arcs */}
      <path d="M128 242 A24 24 0 0 1 152 266" fill="none" stroke="var(--art-brass)" strokeWidth="1.1" />
      <line x1="128" y1="266" x2="152" y2="266" stroke="var(--art-stroke)" strokeWidth="1.1" />
      <path d="M128 314 A24 24 0 0 1 152 338" fill="none" stroke="var(--art-brass)" strokeWidth="1.1" />
      <line x1="128" y1="338" x2="152" y2="338" stroke="var(--art-stroke)" strokeWidth="1.1" />

      {/* Front bay window projection */}
      <polygon points="178,372 192,390 274,390 288,372" fill="var(--art-fill-main)" stroke="var(--art-stroke)" strokeWidth="1.5" />
      <line x1="194" y1="386" x2="272" y2="386" stroke="var(--art-window)" strokeWidth="3" />

      {/* Front verandah */}
      <rect x="44" y="372" width="134" height="36" fill="var(--art-fill-alt)" stroke="var(--art-stroke)" strokeWidth="1.5" />
      {/* Tessellated entry diamond pattern */}
      <path d="M74 390L86 378L98 390L86 402Z" fill="var(--art-brass)" fillOpacity="0.4" stroke="var(--art-stroke)" strokeWidth="1" />

      {/* Room labels */}
      {labeled ? (
        <>
          <text x="180" y="210" textAnchor="middle" fill="var(--art-stroke)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em' }}>
            LIVING &amp; KITCHEN
          </text>
          <text x="224" y="268" textAnchor="middle" fill="var(--art-stroke)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em' }}>
            BEDROOM 2
          </text>
          <text x="224" y="342" textAnchor="middle" fill="var(--art-stroke)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em' }}>
            SITTING / BED 1
          </text>
          <text x="110" y="426" textAnchor="middle" fill="var(--art-stroke-soft)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', letterSpacing: '0.12em' }}>
            IRON-LACE VERANDAH
          </text>
        </>
      ) : (
        <text x="180" y="428" textAnchor="middle" fill="var(--art-stroke-soft)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em' }}>
          DRUMMOND ST · SCALE 1:100
        </text>
      )}

      {/* Compass rose */}
      <g transform="translate(316, 412)">
        <circle cx="0" cy="0" r="14" fill="none" stroke="var(--art-stroke-soft)" strokeWidth="1" />
        <polygon points="0,-11 3.5,2 0,-1 -3.5,2" fill="var(--art-brass)" />
        <text x="0" y="11" textAnchor="middle" fill="var(--art-stroke)" style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px' }}>N</text>
      </g>
    </svg>
  );
}
