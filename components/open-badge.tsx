'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Time-dependent office status badge.
 * Static/no-JS output stays neutral ("See opening hours");
 * in the browser it evaluates Australia/Melbourne time and refreshes every minute.
 */
export function OpenBadge({ hours, className = '' }: { hours: readonly OpeningHours[]; className?: string }) {
  const [label, setLabel] = useState('See opening hours');

  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const isOpen = label.startsWith('Open now');

  return (
    <span
      className={`inline-flex items-center gap-2 border border-line bg-raised px-3 py-1 font-mono text-xs tracking-wider uppercase text-ink ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${isOpen ? 'bg-gold-leaf' : 'bg-muted'}`}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
