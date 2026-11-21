/** 404 illustration: empty keystone-arched doorway with door ajar and OFF MARKET signboard leaning against the kerb. */
export function OffMarketDoor({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 300"
      className={className}
      role="img"
      aria-label="Illustration of an empty keystone-arched Carlton doorway with the door ajar and an OFF MARKET signboard leaning against the bluestone kerb"
    >
      {/* Background limestone wall */}
      <rect x="20" y="16" width="236" height="248" fill="var(--art-fill-main)" stroke="var(--art-stroke)" strokeWidth="1.6" />
      {/* Subtle wall masonry courses */}
      <line x1="20" y1="74" x2="256" y2="74" stroke="var(--line)" strokeWidth="1" />
      <line x1="20" y1="142" x2="256" y2="142" stroke="var(--line)" strokeWidth="1" />
      <line x1="20" y1="210" x2="256" y2="210" stroke="var(--line)" strokeWidth="1" />

      {/* Empty keystone-arched doorway */}
      <path d="M74 264 V116 A64,64 0 0 1 202,116 V264 Z" fill="var(--art-fill-bluestone)" stroke="var(--art-stroke)" strokeWidth="1.8" />
      {/* Fanlight transom glass */}
      <path d="M84 116 A54,54 0 0 1 192,116 Z" fill="var(--art-window)" stroke="var(--art-stroke)" strokeWidth="1.4" />
      <line x1="138" y1="62" x2="138" y2="116" stroke="var(--art-stroke)" strokeWidth="1.2" />
      <line x1="84" y1="116" x2="192" y2="116" stroke="var(--art-stroke)" strokeWidth="1.6" />

      {/* Door ajar swinging inward */}
      <polygon points="84,116 144,126 144,256 84,264" fill="var(--art-fill-alt)" stroke="var(--art-stroke)" strokeWidth="1.6" />
      <polygon points="94,132 134,138 134,182 94,184" fill="none" stroke="var(--art-stroke-soft)" strokeWidth="1.1" />
      <polygon points="94,196 134,196 134,242 94,248" fill="none" stroke="var(--art-stroke-soft)" strokeWidth="1.1" />
      {/* Brass doorknob */}
      <circle cx="134" cy="190" r="3.5" fill="var(--art-brass)" stroke="var(--art-stroke)" strokeWidth="1" />

      {/* Warm interior light shaft on floor */}
      <polygon points="144,256 192,264 166,264 144,256" fill="var(--art-window)" opacity="0.45" />

      {/* Crown gold keystone wedge */}
      <polygon points="124,36 152,36 146,60 130,60" fill="var(--art-brass)" stroke="var(--art-stroke)" strokeWidth="1.5" />
      <line x1="127" y1="39.5" x2="149" y2="39.5" stroke="var(--gold-highlight)" strokeWidth="1.5" />

      {/* Bluestone doorstep & kerb */}
      <rect x="64" y="256" width="148" height="12" fill="var(--art-fill-alt)" stroke="var(--art-stroke)" strokeWidth="1.5" />
      <rect x="6" y="268" width="408" height="24" fill="var(--art-fill-bluestone)" stroke="var(--art-stroke)" strokeWidth="1.5" />

      {/* Leaning two-post OFF MARKET signboard */}
      <g transform="translate(292, 178) rotate(8)">
        <rect x="-56" y="42" width="8" height="58" fill="var(--art-fill-roof)" stroke="var(--art-stroke)" strokeWidth="1.5" />
        <rect x="48" y="42" width="8" height="58" fill="var(--art-fill-roof)" stroke="var(--art-stroke)" strokeWidth="1.5" />
        <rect x="-78" y="-56" width="156" height="102" fill="var(--art-board)" stroke="var(--art-stroke)" strokeWidth="1.8" />
        <rect x="-72" y="-50" width="144" height="90" fill="none" stroke="var(--art-brass)" strokeWidth="1" />
        <rect x="-72" y="-50" width="144" height="18" fill="var(--art-fill-bluestone)" />
        <text x="0" y="-38" textAnchor="middle" fill="#F4F1EA" style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', letterSpacing: '0.16em' }}>
          KEYSTONE &amp; GOLD
        </text>
        <text x="0" y="-18" textAnchor="middle" fill="var(--art-board-ink)" style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600 }}>
          404 Carlton
        </text>
        <text x="0" y="32" textAnchor="middle" fill="var(--art-stroke-soft)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.12em' }}>
          LISTING NOT FOUND
        </text>

        {/* Diagonal OFF MARKET gold-leaf sash */}
        <g transform="translate(0, 6) rotate(-12)">
          <rect x="-64" y="-13" width="128" height="26" fill="var(--art-sash)" stroke="var(--art-stroke)" strokeWidth="1.6" />
          <line x1="-62" y1="-10.5" x2="62" y2="-10.5" stroke="var(--art-sash-highlight)" strokeWidth="1.5" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="var(--art-sash-ink)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.16em' }}
          >
            OFF MARKET
          </text>
        </g>
      </g>
    </svg>
  );
}
