/** Large keystone arch framing a brass key hanging from a gold-leaf K&G tag. */
export function AppraisalKeyArch({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 310"
      className={className}
      role="img"
      aria-label="Illustration of a brass house key hanging on a gold Keystone & Gold tag inside a keystone arch"
    >
      {/* Outer keystone arch */}
      <path
        d="M26,294 L26,128 A104,104 0 0 1 234,128 L234,294 Z"
        fill="var(--art-fill-bluestone)"
        stroke="var(--art-brass)"
        strokeWidth="2"
      />
      <path
        d="M36,284 L36,128 A94,94 0 0 1 224,128 L224,284 Z"
        fill="none"
        stroke="var(--gold-highlight)"
        strokeWidth="0.9"
        opacity="0.55"
      />

      {/* Crown gold keystone wedge */}
      <polygon points="113,10 147,10 140,36 120,36" fill="var(--art-brass)" stroke="#15171A" strokeWidth="1.5" />
      <line x1="116" y1="13.5" x2="144" y2="13.5" stroke="var(--gold-highlight)" strokeWidth="1.6" />

      {/* Hanging ring */}
      <circle cx="130" cy="76" r="14" fill="none" stroke="var(--art-brass)" strokeWidth="2.5" />
      <line x1="130" y1="36" x2="130" y2="62" stroke="var(--art-brass)" strokeWidth="1.5" />

      {/* Gold-leaf embossed tag hanging left */}
      <g transform="translate(106, 146) rotate(12)">
        <path
          d="M-24,-42 L24,-42 L32,-26 L32,42 L-32,42 L-32,-26 Z"
          fill="var(--art-brass)"
          stroke="#15171A"
          strokeWidth="1.6"
        />
        <line x1="-22" y1="-39" x2="22" y2="-39" stroke="var(--gold-highlight)" strokeWidth="1.5" />
        <circle cx="0" cy="-28" r="4" fill="#15171A" />
        <rect x="-25" y="-14" width="50" height="48" fill="none" stroke="#15171A" strokeWidth="1" opacity="0.55" />
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fill="#15171A"
          style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700 }}
        >
          K&amp;G
        </text>
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fill="#15171A"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', letterSpacing: '0.14em' }}
        >
          CARLTON
        </text>
      </g>

      {/* Ornate vintage brass house key hanging right */}
      <g transform="translate(154, 152) rotate(-14)" stroke="#15171A" strokeWidth="1.5">
        {/* Key bow */}
        <circle cx="0" cy="-48" r="22" fill="var(--gold-highlight)" />
        <circle cx="0" cy="-48" r="11" fill="var(--art-fill-bluestone)" />
        {/* Collar & shaft */}
        <rect x="-7" y="-26" width="14" height="7" fill="var(--art-brass)" />
        <rect x="-4" y="-19" width="8" height="92" fill="var(--gold-highlight)" />
        {/* Key bit teeth */}
        <polygon points="4,42 26,42 26,52 16,52 16,58 26,58 26,68 4,68" fill="var(--art-brass)" />
      </g>

      {/* Plinth engraving */}
      <line x1="16" y1="294" x2="244" y2="294" stroke="var(--art-brass)" strokeWidth="2" />
      <text
        x="130"
        y="272"
        textAnchor="middle"
        fill="#F4F1EA"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em' }}
      >
        WRITTEN APPRAISAL · CARLTON
      </text>
    </svg>
  );
}
