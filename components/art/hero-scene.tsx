import { useId } from 'react';

/**
 * Hero scene "Nicholson Street at dusk":
 * Royal Exhibition Building dome faint behind Carlton Gardens canopy,
 * three Victorian terraces with iron-lace verandahs and keystone-arched doors,
 * one modern timber-batten townhouse, street tree, bluestone kerb and lane setts,
 * and the foreground two-post signboard with a diagonal gold-leaf SOLD sash.
 */
export function HeroScene({ className = 'w-full h-full' }: { className?: string }) {
  const uid = useId();
  const dotId = `hero-dot-${uid}`;
  const treeDotId = `hero-tree-${uid}`;

  return (
    <svg
      viewBox="0 0 860 540"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Illustration of Nicholson Street in Carlton showing three Victorian terraces with iron-lace verandahs, a modern timber-screened townhouse, the Royal Exhibition Building dome behind, and a Keystone & Gold SOLD signboard on the bluestone kerb"
    >
      <defs>
        <pattern id={dotId} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.95" fill="var(--art-stroke)" fillOpacity="0.16" />
        </pattern>
        <pattern id={treeDotId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.15" fill="var(--art-stroke)" fillOpacity="0.22" />
        </pattern>
      </defs>

      {/* Sky backdrop + subtle upper halftone */}
      <rect x="0" y="0" width="860" height="540" fill="var(--art-sky)" />
      <rect x="0" y="0" width="860" height="170" fill={`url(#${dotId})`} opacity="0.65" />

      {/* Royal Exhibition Building dome faint in the background */}
      <g opacity="0.34" stroke="var(--art-stroke)" strokeWidth="1.25" fill="none">
        {/* Main octagonal drum */}
        <rect x="526" y="130" width="136" height="58" fill="var(--art-fill-alt)" />
        {/* Clerestory arched windows */}
        {[542, 566, 590, 614, 638].map(x => (
          <path key={x} d={`M${x} 168 V146 A7,7 0 0 1 ${x + 14},146 V168 Z`} fill="var(--art-sky)" />
        ))}
        {/* Iconic ribbed dome */}
        <path d="M532 130 C536 66, 652 66, 656 130 Z" fill="var(--art-fill-alt)" />
        <path d="M562 130 C566 78, 622 78, 626 130" />
        <line x1="594" y1="68" x2="594" y2="130" />
        {/* Cupola lantern & flagpole */}
        <rect x="583" y="48" width="22" height="20" fill="var(--art-fill-alt)" />
        <path d="M581 48 L594 34 L607 48 Z" fill="var(--art-brass)" />
        <line x1="594" y1="16" x2="594" y2="34" stroke="var(--art-brass)" strokeWidth="1.5" />
        {/* Side exhibition wings */}
        <rect x="444" y="162" width="82" height="44" fill="var(--art-fill-alt)" />
        <rect x="662" y="162" width="96" height="44" fill="var(--art-fill-alt)" />
      </g>

      {/* Distant Carlton Gardens tree silhouette */}
      <g opacity="0.35">
        <circle cx="486" cy="212" r="34" fill="var(--art-foliage)" />
        <circle cx="526" cy="204" r="28" fill="var(--art-foliage)" />
        <circle cx="678" cy="208" r="36" fill="var(--art-foliage)" />
        <circle cx="722" cy="216" r="28" fill="var(--art-foliage)" />
      </g>

      {/* ROW OF THREE VICTORIAN TERRACES (left to centre-right) */}
      {[
        { x: 52, accentRoof: false, litTop: true },
        { x: 204, accentRoof: true, litTop: true },
        { x: 356, accentRoof: false, litTop: true },
      ].map((t, index) => (
        <g key={t.x} transform={`translate(${t.x}, 0)`} stroke="var(--art-stroke)" strokeWidth="1.5" strokeLinecap="square">
          {/* Chimneys */}
          <rect x="14" y="114" width="16" height="48" fill="var(--art-fill-alt)" />
          <rect x="118" y="118" width="16" height="44" fill="var(--art-fill-alt)" />
          <line x1="12" y1="114" x2="32" y2="114" strokeWidth="2" />
          <line x1="116" y1="118" x2="136" y2="118" strokeWidth="2" />

          {/* Victorian parapet & central pediment */}
          <polygon
            points="0,162 0,144 46,144 76,122 106,144 152,144 152,162"
            fill={index === 1 ? 'var(--art-fill-alt)' : 'var(--art-fill-main)'}
          />
          <line x1="0" y1="156" x2="152" y2="156" stroke="var(--art-brass)" strokeWidth="1.2" />
          {/* Parapet finials */}
          <circle cx="10" cy="139" r="3.6" fill="var(--art-brass)" />
          <circle cx="76" cy="117" r="4.4" fill="var(--art-brass)" />
          <circle cx="142" cy="139" r="3.6" fill="var(--art-brass)" />

          {/* Main terrace facade */}
          <rect x="0" y="162" width="152" height="292" fill="var(--art-fill-main)" />

          {/* Upper balcony recess & halftone shadow */}
          <rect x="10" y="176" width="132" height="106" fill="var(--art-fill-alt)" />
          <rect x="10" y="176" width="132" height="24" fill={`url(#${dotId})`} stroke="none" />

          {/* Upper French balcony windows (glow warm gold in dark mode) */}
          <rect x="24" y="192" width="38" height="72" fill="var(--art-window)" />
          <rect x="90" y="192" width="38" height="72" fill="var(--art-window)" />
          {/* Subtle interior glow halo in dark mode */}
          <rect x="20" y="188" width="46" height="80" fill="var(--art-window-glow)" stroke="none" />
          <rect x="86" y="188" width="46" height="80" fill="var(--art-window-glow)" stroke="none" />
          <line x1="43" y1="192" x2="43" y2="264" strokeWidth="1.1" />
          <line x1="24" y1="224" x2="62" y2="224" strokeWidth="1.1" />
          <line x1="109" y1="192" x2="109" y2="264" strokeWidth="1.1" />
          <line x1="90" y1="224" x2="128" y2="224" strokeWidth="1.1" />

          {/* Upper cast-iron lace frieze */}
          <path
            d="M10 190 Q21 200 32 190 T54 190 T76 190 T98 190 T120 190 T142 190"
            fill="none"
            stroke="var(--art-stroke)"
            strokeWidth="1.25"
          />
          {/* Iron-lace balcony balustrade */}
          <rect x="10" y="250" width="132" height="32" fill="var(--art-fill-main)" />
          {[22, 34, 46, 58, 70, 82, 94, 106, 118, 130].map(bx => (
            <line key={bx} x1={bx} y1="250" x2={bx} y2="282" strokeWidth="1" />
          ))}
          <line x1="10" y1="258" x2="142" y2="258" stroke="var(--art-brass)" strokeWidth="1.1" />

          {/* Verandah roof slab & lower iron lace */}
          <rect x="0" y="282" width="152" height="14" fill="var(--art-fill-roof)" />
          <path
            d="M10 306 Q21 315 32 306 T54 306 T76 306 T98 306 T120 306 T142 306"
            fill="none"
            stroke="var(--art-stroke)"
            strokeWidth="1.2"
          />
          {/* Slender verandah posts */}
          <line x1="12" y1="176" x2="12" y2="454" strokeWidth="1.6" />
          <line x1="140" y1="176" x2="140" y2="454" strokeWidth="1.6" />

          {/* Ground floor sash window */}
          <rect x="24" y="330" width="46" height="82" fill="var(--art-window)" />
          <rect x="20" y="326" width="54" height="90" fill="var(--art-window-glow)" stroke="none" />
          <line x1="24" y1="370" x2="70" y2="370" strokeWidth="1.2" />
          <line x1="47" y1="330" x2="47" y2="412" strokeWidth="1.1" />
          <rect x="20" y="412" width="54" height="6" fill="var(--art-fill-alt)" />

          {/* Keystone-arched front door */}
          <path d="M88 454 V358 A20,20 0 0 1 128,358 V454 Z" fill="var(--art-fill-bluestone)" />
          {/* Fanlight glass */}
          <path d="M93 358 A15,15 0 0 1 123,358 Z" fill="var(--art-window)" />
          {/* Gold keystone wedge above arch */}
          <polygon points="103,332 113,332 111,341 105,341" fill="var(--art-brass)" strokeWidth="1" />
          {/* Brass door knocker / handle */}
          <circle cx="118" cy="404" r="2.2" fill="var(--art-brass)" stroke="none" />
          <rect x="96" y="370" width="24" height="22" fill="none" stroke="var(--art-brass)" strokeWidth="0.9" opacity="0.6" />
          <rect x="96" y="400" width="24" height="36" fill="none" stroke="var(--art-brass)" strokeWidth="0.9" opacity="0.6" />
        </g>
      ))}

      {/* MODERN TOWNHOUSE WITH TIMBER BATTEN SCREEN (right) */}
      <g transform="translate(514, 0)" stroke="var(--art-stroke)" strokeWidth="1.5" strokeLinecap="square">
        {/* Upper crisp architectural box */}
        <rect x="0" y="176" width="218" height="122" fill="var(--art-fill-roof)" />
        {/* Horizontal brass shadow reveal */}
        <line x1="0" y1="184" x2="218" y2="184" stroke="var(--art-brass)" strokeWidth="1.2" />
        {/* Large modern north-facing glazing */}
        <rect x="18" y="200" width="84" height="82" fill="var(--art-window)" />
        <rect x="14" y="196" width="92" height="90" fill="var(--art-window-glow)" stroke="none" />
        <line x1="60" y1="200" x2="60" y2="282" strokeWidth="1.2" />
        {/* Vertical spotted-gum timber batten privacy screen */}
        <rect x="116" y="196" width="84" height="90" fill="var(--art-brass)" fillOpacity="0.82" />
        {[124, 132, 140, 148, 156, 164, 172, 180, 188, 196].map(bx => (
          <line key={bx} x1={bx} y1="196" x2={bx} y2="286" stroke="var(--art-stroke)" strokeWidth="1.15" />
        ))}
        {/* Cantilever soffit shadow */}
        <rect x="0" y="298" width="218" height="10" fill={`url(#${dotId})`} />
        {/* Ground floor limestone/brick volume */}
        <rect x="8" y="308" width="204" height="146" fill="var(--art-fill-main)" />
        {/* Ground floor glazing */}
        <rect x="24" y="328" width="96" height="98" fill="var(--art-window)" />
        <rect x="20" y="324" width="104" height="106" fill="var(--art-window-glow)" stroke="none" />
        <line x1="72" y1="328" x2="72" y2="426" strokeWidth="1.2" />
        {/* Recessed modern pivot door */}
        <rect x="142" y="338" width="48" height="116" fill="var(--art-fill-alt)" />
        <rect x="148" y="346" width="36" height="108" fill="var(--art-fill-bluestone)" />
        <line x1="176" y1="388" x2="176" y2="412" stroke="var(--art-brass)" strokeWidth="2.4" />
      </g>

      {/* STREET TREE (Nicholson Street plane tree on right edge) */}
      <g>
        <line x1="776" y1="320" x2="776" y2="458" stroke="var(--art-stroke)" strokeWidth="5" />
        <path d="M776 352 L756 322 M776 340 L798 312" stroke="var(--art-stroke)" strokeWidth="2.5" />
        <circle cx="776" cy="274" r="56" fill="var(--art-foliage)" stroke="var(--art-stroke)" strokeWidth="1.5" />
        <circle cx="736" cy="300" r="34" fill="var(--art-foliage)" stroke="var(--art-stroke)" strokeWidth="1.5" />
        <circle cx="812" cy="304" r="32" fill="var(--art-foliage)" stroke="var(--art-stroke)" strokeWidth="1.5" />
        <circle cx="776" cy="274" r="52" fill={`url(#${treeDotId})`} />
      </g>

      {/* Low Victorian cast-iron terrace fences along footpath */}
      <g stroke="var(--art-stroke)" strokeWidth="1.2">
        <line x1="44" y1="422" x2="514" y2="422" stroke="var(--art-brass)" strokeWidth="1.5" />
        <line x1="44" y1="454" x2="514" y2="454" strokeWidth="1.5" />
        {Array.from({ length: 28 }, (_, i) => 56 + i * 16).map(fx => (
          <line key={fx} x1={fx} y1="422" x2={fx} y2="454" opacity="0.65" />
        ))}
      </g>

      {/* MELBOURNE BLUESTONE FOOTPATH, KERB & LANE SETTS */}
      <rect x="0" y="454" width="860" height="86" fill="var(--art-fill-bluestone)" />
      <line x1="0" y1="454" x2="860" y2="454" stroke="var(--art-stroke)" strokeWidth="2" />
      <line x1="0" y1="484" x2="860" y2="484" stroke="var(--art-brass)" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="506" x2="860" y2="506" stroke="var(--art-stroke-soft)" strokeWidth="0.9" opacity="0.5" />
      {/* Bluestone kerb & cobble joints */}
      {Array.from({ length: 16 }, (_, i) => i * 56 + 18).map(kx => (
        <line key={kx} x1={kx} y1="454" x2={kx - 14} y2="484" stroke="var(--art-stroke-soft)" strokeWidth="0.9" opacity="0.45" />
      ))}
      {Array.from({ length: 20 }, (_, i) => i * 44 + 8).map(sx => (
        <line key={sx} x1={sx} y1="484" x2={sx - 8} y2="506" stroke="var(--art-stroke-soft)" strokeWidth="0.8" opacity="0.4" />
      ))}

      {/* SIGNATURE FOREGROUND TWO-POST SIGNBOARD WITH GOLD SOLD SASH */}
      <g transform="translate(506, 304)">
        {/* Two signboard posts rooted at the kerb */}
        <rect x="34" y="132" width="10" height="86" fill="var(--art-fill-roof)" stroke="var(--art-stroke)" strokeWidth="1.6" />
        <rect x="192" y="132" width="10" height="86" fill="var(--art-fill-roof)" stroke="var(--art-stroke)" strokeWidth="1.6" />
        {/* Brass post caps */}
        <rect x="31" y="0" width="16" height="7" fill="var(--art-brass)" stroke="var(--art-stroke)" strokeWidth="1.3" />
        <rect x="189" y="0" width="16" height="7" fill="var(--art-brass)" stroke="var(--art-stroke)" strokeWidth="1.3" />

        {/* Board panel */}
        <rect x="8" y="7" width="220" height="132" fill="var(--art-board)" stroke="var(--art-stroke)" strokeWidth="2" />
        <rect x="14" y="13" width="208" height="120" fill="none" stroke="var(--art-brass)" strokeWidth="1.1" />

        {/* Agency header bar */}
        <rect x="14" y="13" width="208" height="24" fill="var(--art-fill-bluestone)" />
        <polygon points="24,18 33,18 31.5,30 25.5,30" fill="var(--art-brass)" />
        <text
          x="40"
          y="29"
          fill="#F4F1EA"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em' }}
        >
          KEYSTONE &amp; GOLD
        </text>

        {/* Board text */}
        <text
          x="24"
          y="61"
          fill="var(--art-board-ink)"
          style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600 }}
        >
          52 Pigdon Street
        </text>
        <text
          x="24"
          y="77"
          fill="var(--art-stroke-soft)"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em' }}
        >
          CARLTON NORTH
        </text>
        <line x1="24" y1="91" x2="210" y2="91" stroke="var(--line)" strokeWidth="1" />
        <text
          x="24"
          y="119"
          fill="var(--art-board-ink)"
          style={{ fontFamily: 'var(--font-display)', fontSize: '17.5px', fontWeight: 500 }}
        >
          $1,710,000
        </text>

        {/* Diagonal gold-leaf SOLD sash positioned cleanly across lower-right corner */}
        <g transform="translate(174, 108) rotate(-20)">
          <rect x="-56" y="-14.5" width="112" height="29" fill="var(--art-sash)" stroke="var(--art-stroke)" strokeWidth="1.8" />
          <line x1="-54" y1="-11.8" x2="54" y2="-11.8" stroke="var(--art-sash-highlight)" strokeWidth="1.5" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="var(--art-sash-ink)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '14.5px', fontWeight: 500, letterSpacing: '0.2em' }}
          >
            SOLD
          </text>
        </g>
      </g>
    </svg>
  );
}
