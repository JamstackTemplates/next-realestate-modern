import type { ReactNode } from 'react';
import { IronLaceFrieze } from './art/dividers';
import { KeystoneMark } from './art/keystone-mark';

/**
 * Themed inner-page header: left-aligned Bodoni Moda headline with DM Mono eyebrow,
 * a keystone or facade motif at the right edge, and the cast-iron lace frieze as the bottom border.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  motif,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Optional custom architectural motif on the right edge; defaults to the keystone mark. */
  motif?: ReactNode;
}) {
  return (
    <header className="bg-surface">
      <div className="wrap flex flex-col justify-between gap-8 pt-[clamp(2.25rem,5vw,4rem)] pb-[clamp(2rem,4vw,3rem)] md:flex-row md:items-end">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1
            id={id}
            className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.03] text-ink"
          >
            {title}
          </h1>
          {children ? (
            <div className="mt-4 max-w-(--measure) text-[clamp(1.02rem,1.4vw,1.16rem)] text-muted">
              {children}
            </div>
          ) : null}
        </div>
        <div className="hidden shrink-0 md:block" aria-hidden="true">
          {motif ?? <KeystoneMark className="h-20 w-20 opacity-95" />}
        </div>
      </div>
      <IronLaceFrieze className="block h-5 w-full" />
    </header>
  );
}
