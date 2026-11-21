import { useId } from 'react';
import type { FacadeArt } from '../../content/listings';
import type { SashVariant } from './sold-board';

export interface FacadeProps {
  art: FacadeArt;
  title: string;
  sash?: SashVariant;
  className?: string;
}

/**
 * Architectural <Facade> generator framed in a Melbourne keystone arch.
 * Every listing and sold result receives an illustration matching its property type and architectural cues.
 * Windows switch from daytime glass blue-grey to warm lit gold in dark mode via CSS variables.
 */
export function Facade({ art, title, sash, className = 'w-full h-auto' }: FacadeProps) {
  const uid = useId();
  const clipId = `arch-clip-${uid}`;
  const dotId = `halftone-${uid}`;

  return (
    <svg
      viewBox="0 0 240 280"
      className={className}
      role="img"
      aria-label={`Architectural elevation drawing of ${title}`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M22,262 L22,118 A98,98 0 0 1 218,118 L218,262 Z" />
        </clipPath>
        <pattern id={dotId} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.9" fill="var(--art-stroke)" fillOpacity="0.22" />
        </pattern>
      </defs>

      {/* Arch interior background */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="20" y="18" width="200" height="248" fill="var(--art-sky)" />
        {/* Sparse halftone sky band */}
        <rect x="20" y="18" width="200" height="72" fill={`url(#${dotId})`} opacity="0.5" />

        {/* Architectural drawing by facade family */}
        {art.facade === 'victorian-terrace' && <VictorianTerrace dotId={dotId} />}
        {art.facade === 'modern-townhouse' && <ModernTownhouse dotId={dotId} />}
        {art.facade === 'cal-bungalow' && <CalifornianBungalow dotId={dotId} />}
        {art.facade === 'parkside-apartment' && <ParksideApartment dotId={dotId} />}
        {art.facade === 'sawtooth-warehouse' && <SawtoothWarehouse dotId={dotId} />}
        {art.facade === 'edwardian-villa' && <EdwardianVilla dotId={dotId} />}

        {/* Foreground bluestone footpath & kerb */}
        <rect x="20" y="246" width="200" height="18" fill="var(--art-fill-bluestone)" />
        <line x1="20" y1="246" x2="220" y2="246" stroke="var(--art-stroke)" strokeWidth="1.5" />
        <path d="M62 246V264M120 246V264M178 246V264" stroke="var(--art-brass)" strokeWidth="0.8" opacity="0.45" />
      </g>

      {/* Outer keystone arch frame */}
      <path
        d="M22,262 L22,118 A98,98 0 0 1 218,118 L218,262 Z"
        fill="none"
        stroke="var(--art-stroke)"
        strokeWidth="1.75"
      />
      <path
        d="M16,266 L16,118 A104,104 0 0 1 224,118 L224,266"
        fill="none"
        stroke="var(--art-brass)"
        strokeWidth="1.1"
        opacity="0.75"
      />
      {/* Base plinth */}
      <line x1="12" y1="266" x2="228" y2="266" stroke="var(--art-stroke)" strokeWidth="1.75" />

      {/* Crown gold keystone wedge */}
      <polygon
        points="106,8 134,8 128,31 112,31"
        fill="var(--art-brass)"
        stroke="var(--art-stroke)"
        strokeWidth="1.4"
      />
      <line x1="109" y1="11" x2="131" y2="11" stroke="var(--gold-highlight)" strokeWidth="1.4" />

      {/* Optional diagonal sash (e.g. UNDER OFFER on For sale & detail pages) */}
      {sash && (
        <g transform="translate(120, 178) rotate(-14)">
          <rect
            x="-86"
            y="-16"
            width="172"
            height="32"
            fill="var(--art-sash)"
            stroke="var(--art-stroke)"
            strokeWidth="1.6"
          />
          <line x1="-83" y1="-13" x2="83" y2="-13" stroke="var(--art-sash-highlight)" strokeWidth="1.5" />
          <text
            x="0"
            y="4.5"
            textAnchor="middle"
            fill="var(--art-sash-ink)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em' }}
          >
            {sash}
          </text>
        </g>
      )}
    </svg>
  );
}

function VictorianTerrace({ dotId }: { dotId: string }) {
  return (
    <g stroke="var(--art-stroke)" strokeWidth="1.4" strokeLinecap="square">
      {/* Chimneys */}
      <rect x="52" y="64" width="16" height="32" fill="var(--art-fill-alt)" />
      <rect x="172" y="64" width="16" height="32" fill="var(--art-fill-alt)" />
      {/* Parapet pediment & urn finials */}
      <polygon points="44,96 44,80 96,80 120,66 144,80 196,80 196,96" fill="var(--art-fill-main)" />
      <circle cx="54" cy="75" r="4" fill="var(--art-brass)" />
      <circle cx="120" cy="61" r="4.5" fill="var(--art-brass)" />
      <circle cx="186" cy="75" r="4" fill="var(--art-brass)" />
      {/* Main facade body */}
      <rect x="44" y="96" width="152" height="150" fill="var(--art-fill-main)" />
      {/* Upper balcony recess */}
      <rect x="54" y="108" width="132" height="58" fill="var(--art-fill-alt)" />
      {/* Upper French doors (lit in dark mode) */}
      <rect x="66" y="114" width="24" height="46" fill="var(--art-window)" />
      <rect x="108" y="114" width="24" height="46" fill="var(--art-window)" />
      <rect x="150" y="114" width="24" height="46" fill="var(--art-window)" />
      {/* Iron-lace frieze & balustrade */}
      <rect x="54" y="108" width="132" height="12" fill={`url(#${dotId})`} stroke="none" />
      <path d="M54 120 Q66 128 78 120 T102 120 T126 120 T150 120 T174 120 L186 120" fill="none" strokeWidth="1.2" />
      <rect x="54" y="150" width="132" height="18" fill="var(--art-fill-main)" />
      <path d="M62 150V168M74 150V168M86 150V168M98 150V168M110 150V168M122 150V168M134 150V168M146 150V168M158 150V168M170 150V168M182 150V168" strokeWidth="1" />
      {/* Verandah columns */}
      <line x1="58" y1="108" x2="58" y2="246" strokeWidth="1.6" />
      <line x1="182" y1="108" x2="182" y2="246" strokeWidth="1.6" />
      {/* Ground floor windows & keystone arched doorway */}
      <rect x="68" y="186" width="28" height="42" fill="var(--art-window)" />
      <line x1="68" y1="207" x2="96" y2="207" strokeWidth="1.1" />
      <rect x="144" y="186" width="28" height="42" fill="var(--art-window)" />
      <line x1="144" y1="207" x2="172" y2="207" strokeWidth="1.1" />
      {/* Keystone front door */}
      <path d="M107 246 V202 A13,13 0 0 1 133,202 V246 Z" fill="var(--art-fill-bluestone)" />
      <path d="M111 202 A9,9 0 0 1 129,202 Z" fill="var(--art-window)" />
      <polygon points="117,184 123,184 122,191 118,191" fill="var(--art-brass)" strokeWidth="0.9" />
      {/* Low cast-iron fence */}
      <line x1="36" y1="236" x2="204" y2="236" stroke="var(--art-brass)" strokeWidth="1.2" />
    </g>
  );
}

function ModernTownhouse({ dotId }: { dotId: string }) {
  return (
    <g stroke="var(--art-stroke)" strokeWidth="1.4" strokeLinecap="square">
      {/* Upper cantilevered dark volume */}
      <rect x="44" y="84" width="152" height="72" fill="var(--art-fill-roof)" />
      {/* Clerestory & cantilevered corner window */}
      <rect x="54" y="96" width="64" height="48" fill="var(--art-window)" />
      <line x1="86" y1="96" x2="86" y2="144" strokeWidth="1.2" />
      {/* Vertical spotted-gum timber batten privacy screen */}
      <rect x="128" y="94" width="58" height="54" fill="var(--art-brass)" fillOpacity="0.82" />
      <path d="M135 94V148M142 94V148M149 94V148M156 94V148M163 94V148M170 94V148M177 94V148" stroke="var(--art-stroke)" strokeWidth="1.1" />
      {/* Mid shadow reveal */}
      <rect x="44" y="156" width="152" height="8" fill={`url(#${dotId})`} />
      {/* Ground limestone base */}
      <rect x="50" y="164" width="140" height="82" fill="var(--art-fill-main)" />
      {/* Tall glazed living window */}
      <rect x="62" y="176" width="56" height="56" fill="var(--art-window)" />
      <line x1="90" y1="176" x2="90" y2="232" strokeWidth="1.2" />
      {/* Timber pivot door & house number */}
      <rect x="134" y="182" width="38" height="64" fill="var(--art-fill-alt)" />
      <rect x="140" y="188" width="26" height="58" fill="var(--art-fill-bluestone)" />
      <line x1="160" y1="212" x2="160" y2="226" stroke="var(--art-brass)" strokeWidth="2.2" />
      {/* Linear park tree accent */}
      <circle cx="40" cy="212" r="16" fill="var(--art-foliage)" stroke="var(--art-stroke)" strokeWidth="1.2" />
      <line x1="40" y1="228" x2="40" y2="246" strokeWidth="1.6" />
    </g>
  );
}

function CalifornianBungalow({ dotId }: { dotId: string }) {
  return (
    <g stroke="var(--art-stroke)" strokeWidth="1.4" strokeLinecap="square">
      {/* Brick chimney */}
      <rect x="156" y="76" width="18" height="44" fill="var(--art-fill-alt)" />
      {/* Main broad gable roof */}
      <polygon points="32,148 120,88 208,148" fill="var(--art-fill-roof)" />
      <polygon points="32,148 120,88 208,148" fill={`url(#${dotId})`} stroke="none" />
      {/* Gable timber vent detail */}
      <polygon points="88,144 120,104 152,144" fill="var(--art-fill-main)" />
      <path d="M110 132H130M114 124H126" stroke="var(--art-brass)" strokeWidth="1.4" />
      {/* Front porch sub-gable */}
      <polygon points="48,184 96,152 144,184" fill="var(--art-fill-alt)" />
      {/* Main bungalow facade */}
      <rect x="42" y="148" width="156" height="98" fill="var(--art-fill-main)" />
      {/* Deep porch & tapered masonry piers */}
      <rect x="52" y="184" width="84" height="62" fill="var(--art-fill-alt)" />
      <polygon points="52,246 56,214 66,214 70,246" fill="var(--art-fill-bluestone)" />
      <polygon points="118,246 122,214 132,214 136,246" fill="var(--art-fill-bluestone)" />
      <rect x="58" y="184" width="6" height="30" fill="var(--art-fill-main)" />
      <rect x="124" y="184" width="6" height="30" fill="var(--art-fill-main)" />
      {/* Leadlight door */}
      <rect x="82" y="196" width="24" height="50" fill="var(--art-fill-bluestone)" />
      <rect x="86" y="201" width="16" height="16" fill="var(--art-window)" />
      <path d="M86 209H102M94 201V217" strokeWidth="1" />
      {/* Wide leadlight bay window */}
      <rect x="144" y="186" width="44" height="36" fill="var(--art-window)" />
      <path d="M158 186V222M174 186V222M144 198H188" strokeWidth="1.1" />
      <rect x="142" y="222" width="48" height="6" fill="var(--art-brass)" />
    </g>
  );
}

function ParksideApartment({ dotId }: { dotId: string }) {
  return (
    <g stroke="var(--art-stroke)" strokeWidth="1.4" strokeLinecap="square">
      {/* Stepped Art Deco / modernist roofline */}
      <polygon points="48,96 48,80 78,80 78,68 162,68 162,80 192,80 192,96" fill="var(--art-fill-alt)" />
      <rect x="104" y="74" width="32" height="12" fill="var(--art-brass)" />
      {/* Main 3-storey block */}
      <rect x="48" y="96" width="144" height="150" fill="var(--art-fill-main)" />
      <rect x="48" y="96" width="144" height="14" fill={`url(#${dotId})`} stroke="none" />
      {/* Horizontal cream/brick banding */}
      <line x1="48" y1="146" x2="192" y2="146" strokeWidth="1.5" />
      <line x1="48" y1="196" x2="192" y2="196" strokeWidth="1.5" />
      {/* Recessed corner balconies and steel-mullion windows */}
      {[106, 156].map(y => (
        <g key={y}>
          <rect x="58" y={y} width="46" height="30" fill="var(--art-window)" />
          <line x1="74" y1={y} x2="74" y2={y + 30} strokeWidth="1" />
          <line x1="90" y1={y} x2="90" y2={y + 30} strokeWidth="1" />
          <rect x="114" y={y} width="68" height="32" fill="var(--art-fill-alt)" />
          <rect x="120" y={y + 4} width="26" height="26" fill="var(--art-window)" />
          <rect x="114" y={y + 20} width="68" height="12" fill="var(--art-fill-bluestone)" />
          <line x1="114" y1={y + 24} x2="182" y2={y + 24} stroke="var(--art-brass)" strokeWidth="1.1" />
        </g>
      ))}
      {/* Ground lobby & glazed entry */}
      <rect x="58" y="206" width="42" height="28" fill="var(--art-window)" />
      <rect x="112" y="204" width="46" height="42" fill="var(--art-fill-bluestone)" />
      <rect x="120" y="210" width="30" height="36" fill="var(--art-window)" />
      <line x1="135" y1="210" x2="135" y2="246" strokeWidth="1.3" />
      {/* Royal Park elm canopy */}
      <circle cx="186" cy="216" r="18" fill="var(--art-foliage)" />
    </g>
  );
}

function SawtoothWarehouse({ dotId }: { dotId: string }) {
  return (
    <g stroke="var(--art-stroke)" strokeWidth="1.4" strokeLinecap="square">
      {/* Three iconic industrial sawtooth roof bays */}
      <polygon points="40,124 40,86 94,124" fill="var(--art-fill-roof)" />
      <polygon points="94,124 94,86 148,124" fill="var(--art-fill-roof)" />
      <polygon points="148,124 148,86 200,124" fill="var(--art-fill-roof)" />
      {/* North clerestory glazing along vertical sawtooth faces */}
      <line x1="42" y1="90" x2="42" y2="122" stroke="var(--art-window)" strokeWidth="4" />
      <line x1="96" y1="90" x2="96" y2="122" stroke="var(--art-window)" strokeWidth="4" />
      <line x1="150" y1="90" x2="150" y2="122" stroke="var(--art-window)" strokeWidth="4" />
      {/* Brick mill facade */}
      <rect x="40" y="124" width="160" height="122" fill="var(--art-fill-main)" />
      <rect x="40" y="124" width="160" height="122" fill={`url(#${dotId})`} opacity="0.3" stroke="none" />
      {/* Steel tie-rod star plates */}
      <circle cx="52" cy="136" r="2.8" fill="var(--art-brass)" />
      <circle cx="120" cy="136" r="2.8" fill="var(--art-brass)" />
      <circle cx="188" cy="136" r="2.8" fill="var(--art-brass)" />
      {/* Large multi-pane industrial factory windows */}
      <rect x="52" y="148" width="58" height="44" fill="var(--art-window)" />
      <path d="M71 148V192M91 148V192M52 163H110M52 178H110" strokeWidth="1" />
      <rect x="130" y="148" width="58" height="44" fill="var(--art-window)" />
      <path d="M149 148V192M169 148V192M130 163H188M130 178H188" strokeWidth="1" />
      {/* Arched brick loading dock entry */}
      <path d="M96 246 V218 A24,20 0 0 1 144,218 V246 Z" fill="var(--art-fill-bluestone)" />
      <path d="M104 246 V220 A16,13 0 0 1 136,220 V246 Z" fill="var(--art-window)" />
      <line x1="120" y1="207" x2="120" y2="246" strokeWidth="1.4" />
      <line x1="104" y1="226" x2="136" y2="226" strokeWidth="1.2" />
    </g>
  );
}

function EdwardianVilla({ dotId }: { dotId: string }) {
  return (
    <g stroke="var(--art-stroke)" strokeWidth="1.4" strokeLinecap="square">
      {/* Tall chimneys with corbelled tops */}
      <rect x="54" y="70" width="16" height="46" fill="var(--art-fill-alt)" />
      <rect x="170" y="74" width="16" height="42" fill="var(--art-fill-alt)" />
      {/* Steep hipped roof with ridge cresting and finial */}
      <polygon points="34,142 74,90 166,90 206,142" fill="var(--art-fill-roof)" />
      <polygon points="34,142 74,90 166,90 206,142" fill={`url(#${dotId})`} stroke="none" />
      <line x1="74" y1="88" x2="166" y2="88" stroke="var(--art-brass)" strokeWidth="1.8" />
      <line x1="120" y1="74" x2="120" y2="90" stroke="var(--art-brass)" strokeWidth="1.8" />
      {/* Projecting half-timbered Edwardian gable wing */}
      <polygon points="124,142 162,102 200,142" fill="var(--art-fill-main)" />
      <path d="M162 104V142M144 122H180" strokeWidth="1.3" />
      {/* Main tuck-pointed brick body */}
      <rect x="40" y="142" width="160" height="104" fill="var(--art-fill-main)" />
      {/* Sweeping return verandah */}
      <polygon points="36,180 46,162 128,162 128,180" fill="var(--art-fill-alt)" />
      <rect x="44" y="180" width="84" height="66" fill="var(--art-fill-alt)" />
      {/* Verandah timber posts & fretwork brackets */}
      <line x1="52" y1="180" x2="52" y2="246" strokeWidth="1.6" />
      <line x1="120" y1="180" x2="120" y2="246" strokeWidth="1.6" />
      <path d="M52 188 Q62 188 64 180 M120 188 Q110 188 108 180" fill="none" stroke="var(--art-brass)" strokeWidth="1.3" />
      {/* Stained-glass entry door & sidelights */}
      <rect x="70" y="192" width="32" height="54" fill="var(--art-fill-bluestone)" />
      <rect x="78" y="198" width="16" height="22" fill="var(--art-window)" />
      <circle cx="86" cy="209" r="4" fill="var(--art-brass)" stroke="none" />
      {/* Projecting bay sash window on right wing */}
      <rect x="136" y="168" width="52" height="48" fill="var(--art-window)" />
      <path d="M153 168V216M171 168V216M136 184H188" strokeWidth="1.2" />
      <rect x="134" y="216" width="56" height="6" fill="var(--art-brass)" />
    </g>
  );
}
