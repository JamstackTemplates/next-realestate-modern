import type { ReactNode } from 'react';
import { AppraisalKeyArch } from './art/appraisal-key';
import { FloorPlanDrawing, IronLaceFrieze } from './art/dividers';
import { ArrowRightIcon } from './art/icons';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

export function AppraisalHero({
  eyebrow,
  title,
  disclaimer,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  disclaimer: ReactNode;
  children: ReactNode;
}) {
  return (
    <header className="bg-surface">
      <div className="wrap grid items-center gap-10 pt-[clamp(2.25rem,5vw,4rem)] pb-[clamp(2.25rem,5vw,3.5rem)] md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] text-ink">
            {title}
          </h1>
          <div className="mt-5 max-w-xl space-y-3 text-base leading-relaxed text-muted">
            {children}
          </div>
          <p className="mt-6 max-w-xl border-l-2 border-gold-leaf bg-raised/70 px-4 py-3 text-sm text-ink">
            {disclaimer}
          </p>
          <div className="mt-7">
            <SiteLink href="/contact/" className="button">
              <span>Request an appraisal</span>
              <ArrowRightIcon className="h-4 w-4" />
            </SiteLink>
          </div>
        </div>
        <div className="mx-auto w-56 sm:w-64 md:col-span-5">
          <AppraisalKeyArch />
        </div>
      </div>
      <IronLaceFrieze className="block h-5 w-full" />
    </header>
  );
}

function TimelineRoot({
  eyebrow,
  heading,
  note,
  children,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  note: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="wrap py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-5xl">{heading}</h2>
        </div>
        <p className="mono-label text-muted">{note}</p>
      </div>
      <ol className="relative mt-10 grid gap-6 md:grid-cols-4">
        {children}
      </ol>
    </section>
  );
}

function TimelineStep({
  number,
  title,
  timing,
  children,
}: {
  number: string;
  title: ReactNode;
  timing: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex flex-col border-t-2 border-gold-leaf bg-surface p-5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display text-4xl text-gold-text">{number}</span>
        <span className="mono-label text-[0.68rem] text-muted">{timing}</span>
      </div>
      <h3 className="mt-3 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </li>
  );
}

export const AppraisalTimeline = Object.assign(TimelineRoot, { Step: TimelineStep });

function FactorsRoot({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="floorplan-grid border-y border-line py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-5xl">{heading}</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="mx-auto w-full max-w-[340px] border border-line bg-surface p-5 lg:col-span-5">
            <FloorPlanDrawing labeled />
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {children}
          </ol>
        </div>
      </div>
    </section>
  );
}

function FactorItem({
  code,
  title,
  wide = false,
  children,
}: {
  code: string;
  title: ReactNode;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <li className={`border border-line bg-surface/95 p-5 ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="mono-label text-gold-text">{code}</span>
      <h3 className="mt-1.5 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
    </li>
  );
}

export const AppraisalFactors = Object.assign(FactorsRoot, { Factor: FactorItem });

export function AppraisalActionBand({
  eyebrow,
  heading,
  intro,
  checklistTitle,
  items,
  buttonLabel,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  checklistTitle: ReactNode;
  items: readonly string[];
  buttonLabel: ReactNode;
}) {
  return (
    <section className="bluestone-band mt-16 py-16">
      <div className="wrap grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <p className="mono-label text-gold-leaf">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-band-ink sm:text-5xl">{heading}</h2>
          <p className="mt-4 max-w-xl text-base text-band-muted">{intro}</p>
          <div className="mt-7">
            <SiteLink href="/contact/" className="button button-on-band">
              <span>{buttonLabel}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </SiteLink>
          </div>
        </div>
        <div className="border border-band-line bg-band/70 p-6 md:col-span-5">
          <h3 className="mono-label text-gold-leaf">{checklistTitle}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-band-ink">
            {items.map(tip => (
              <li key={tip} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold-leaf" aria-hidden="true" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
