'use client';

import { useEffect, useRef, useState } from 'react';

export type SashVariant = 'SOLD' | 'UNDER OFFER' | 'OFF MARKET';

export interface SoldBoardProps {
  /** Diagonal gold-leaf sash label. */
  variant?: SashVariant;
  /** Primary line on the signboard panel (e.g. street address). */
  headline: string;
  /** Secondary line (e.g. suburb). */
  subline: string;
  /** Price or descriptor printed at the base of the board. */
  footer: string;
  /** Enable IntersectionObserver slap-on sash motion (static when no JS or reduced motion). */
  animate?: boolean;
  /** Render slightly taller posts for Hero or compact for Sold grids. */
  compact?: boolean;
  className?: string;
}

/**
 * Signature element: two-post Carlton agent signboard with a diagonal gold-leaf sash.
 * Defaults to visible/settled without JS or when prefers-reduced-motion is active.
 */
export function SoldBoard({
  variant = 'SOLD',
  headline,
  subline,
  footer,
  animate = true,
  compact = false,
  className = 'w-full h-auto',
}: SoldBoardProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [sashState, setSashState] = useState<'settled' | 'ready' | 'landed'>('settled');

  useEffect(() => {
    if (!animate) return;
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
    if (alreadyVisible) {
      setSashState('landed');
      return;
    }

    setSashState('ready');
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setSashState('landed');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animate]);

  const height = compact ? 204 : 230;
  const postBottom = compact ? 198 : 224;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 260 ${height}`}
      className={className}
      role="img"
      aria-label={`${variant} signboard for ${headline}, ${subline} — ${footer}`}
    >
      {/* Two timber/charcoal signboard posts */}
      <rect x="44" y="138" width="9" height={postBottom - 138} fill="var(--art-fill-bluestone)" stroke="var(--art-stroke)" strokeWidth="1.5" />
      <rect x="207" y="138" width="9" height={postBottom - 138} fill="var(--art-fill-bluestone)" stroke="var(--art-stroke)" strokeWidth="1.5" />
      {/* Post finial caps */}
      <rect x="42" y="12" width="13" height="6" fill="var(--art-brass)" stroke="var(--art-stroke)" strokeWidth="1.2" />
      <rect x="205" y="12" width="13" height="6" fill="var(--art-brass)" stroke="var(--art-stroke)" strokeWidth="1.2" />
      {/* Bluestone kerb ground line */}
      <line x1="16" y1={postBottom} x2="244" y2={postBottom} stroke="var(--art-stroke)" strokeWidth="1.5" />
      <line x1="34" y1={postBottom + 3} x2="226" y2={postBottom + 3} stroke="var(--art-brass)" strokeWidth="1" opacity="0.65" />

      {/* Main signboard frame */}
      <rect x="18" y="18" width="224" height="132" fill="var(--art-board)" stroke="var(--art-stroke)" strokeWidth="1.8" />
      <rect x="24" y="24" width="212" height="120" fill="none" stroke="var(--art-brass)" strokeWidth="1" />

      {/* Top agency header strip */}
      <rect x="24" y="24" width="212" height="22" fill="var(--art-fill-bluestone)" />
      <polygon points="33,28 41,28 39.5,38 34.5,38" fill="var(--art-brass)" />
      <text
        x="48"
        y="38.5"
        fill="#F4F1EA"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', letterSpacing: '0.16em' }}
      >
        KEYSTONE &amp; GOLD
      </text>

      {/* Address & suburb */}
      <text
        x="34"
        y="71"
        fill="var(--art-board-ink)"
        style={{ fontFamily: 'var(--font-display)', fontSize: '15.5px', fontWeight: 600 }}
      >
        {headline.length > 23 ? `${headline.slice(0, 22)}…` : headline}
      </text>
      <text
        x="34"
        y="87"
        fill="var(--art-stroke-soft)"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' }}
      >
        {subline}
      </text>

      {/* Divider line and bottom price / detail */}
      <line x1="34" y1="100" x2="226" y2="100" stroke="var(--line)" strokeWidth="1" />
      <text
        x="34"
        y="126"
        fill="var(--art-board-ink)"
        style={{ fontFamily: 'var(--font-display)', fontSize: '16.5px', fontWeight: 500 }}
      >
        {footer}
      </text>

      {/* Signature diagonal gold-leaf sash angled cleanly across lower-right corner */}
      <g
        className="sold-sash-group"
        data-sash={sashState}
      >
        <g transform="translate(182, 114) rotate(-20)">
          <rect
            x="-58"
            y="-14"
            width="116"
            height="28"
            fill="var(--art-sash)"
            stroke="var(--art-stroke)"
            strokeWidth="1.6"
          />
          <line
            x1="-56"
            y1="-11.4"
            x2="56"
            y2="-11.4"
            stroke="var(--art-sash-highlight)"
            strokeWidth="1.5"
          />
          <line
            x1="-52"
            y1="10.2"
            x2="52"
            y2="10.2"
            stroke="var(--art-sash-ink)"
            strokeWidth="0.7"
            opacity="0.4"
          />
          <text
            x="0"
            y={variant === 'SOLD' ? 5 : 3.8}
            textAnchor="middle"
            fill="var(--art-sash-ink)"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: `${variant === 'SOLD' ? 14 : 10}px`,
              fontWeight: 500,
              letterSpacing: '0.16em',
            }}
          >
            {variant}
          </text>
        </g>
      </g>
    </svg>
  );
}
