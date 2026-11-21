import type { ReactNode } from 'react';
import type { Agent } from '../content/agents';
import type { Business } from '../content/business';
import type { Listing } from '../content/listings';
import type { SoldResult } from '../content/sold';
import {
  formatPriceGuide,
  formatSoldPrice,
  methodLabel,
  propertyTypeLabel,
  type SoldMetrics,
} from '../lib/real-estate';
import { AppraisalKeyArch } from './art/appraisal-key';
import { BrassPlate } from './art/brass-plate';
import { BluestoneSettBand, FloorPlanDrawing } from './art/dividers';
import { Facade } from './art/facade';
import { HeroScene } from './art/hero-scene';
import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from './art/icons';
import { OfficeElevation, ShopfrontWindow } from './art/shopfront-office';
import { SoldBoard } from './art/sold-board';
import { HoursTable } from './hours-table';
import { OpenBadge } from './open-badge';
import { PropertySpecs } from './property-specs';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type ChildrenProps = { children: ReactNode };

/* -------------------------------------------------------------------------- */
/* 1. HERO — Asymmetric split (overlaps at 1440px, 220px scene band at 390px) */
/* -------------------------------------------------------------------------- */

function HeroRoot({ children }: ChildrenProps) {
  return (
    <section className="relative overflow-x-clip bg-bg">
      {/* Mobile 390px: 220px cropped scene band of terraces + SOLD signboard on top */}
      <div className="h-[220px] w-full overflow-hidden border-b border-line md:hidden">
        <HeroScene className="h-full w-full object-cover object-bottom" />
      </div>

      <div className="relative mx-auto max-w-[1600px]">
        {/* Desktop right-60% bleeding streetscape with seamless left transition */}
        <div
          className="hidden md:block md:absolute md:inset-y-0 md:right-0 md:w-[60%] lg:w-[62%] overflow-hidden"
          aria-hidden="false"
        >
          <HeroScene className="h-full w-full" />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-36 lg:w-48"
            style={{
              background:
                'linear-gradient(to right, var(--bg) 0%, color-mix(in srgb, var(--bg) 82%, transparent) 44%, transparent 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Left overlapping editorial column */}
        <div className="wrap relative z-10 py-6 sm:py-10 md:py-16 lg:py-24">
          <div className="md:max-w-[52%] lg:max-w-[50%]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroEyebrow({ children }: ChildrenProps) {
  return <p className="eyebrow">{children}</p>;
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 className="mt-2.5 font-display text-[2.75rem] leading-[0.98] font-medium text-ink sm:text-6xl md:mt-4 md:text-7xl lg:text-[5.5rem] xl:text-[6rem]">
      {children}
    </h1>
  );
}

function HeroLead({ children }: ChildrenProps) {
  return (
    <p className="mt-3.5 max-w-lg text-[0.98rem] leading-relaxed text-muted sm:text-lg md:mt-5">
      {children}
    </p>
  );
}

function HeroActions({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: ReactNode;
  secondaryLabel: ReactNode;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 md:mt-8">
      <SiteLink href="/appraisal/" className="button">
        <span>{primaryLabel}</span>
        <ArrowRightIcon className="h-4 w-4" />
      </SiteLink>
      <SiteLink href="/listings/" className="button button-quiet">
        {secondaryLabel}
      </SiteLink>
    </div>
  );
}

export const HomeHero = Object.assign(HeroRoot, {
  Eyebrow: HeroEyebrow,
  Heading: HeroHeading,
  Lead: HeroLead,
  Actions: HeroActions,
});

/* -------------------------------------------------------------------------- */
/* 2. IN THE WINDOW — Glazed shopfront with steel cable rods & hanging cards  */
/* -------------------------------------------------------------------------- */

function WindowSection({
  eyebrow,
  heading,
  linkLabel,
  items,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  linkLabel: ReactNode;
  items: readonly Listing[];
}) {
  return (
    <section className="border-t border-line bg-raised/55 py-14 md:py-20">
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl text-ink sm:text-5xl">{heading}</h2>
          </div>
          <SiteLink href="/listings/" className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase text-gold-text hover:underline">
            <span>{linkLabel}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </SiteLink>
        </div>

        <ShopfrontWindow>
          <div className="window-track">
            {items.map(listing => (
              <article key={listing.id} className="relative flex flex-col pt-5">
                {/* Steel cable display rods suspending each card from the top rail */}
                <div className="pointer-events-none absolute top-0 right-10 left-10 flex justify-between" aria-hidden="true">
                  <span className="block h-5 w-px bg-muted/60" />
                  <span className="block h-5 w-px bg-muted/60" />
                </div>
                <div className="pointer-events-none absolute top-4 right-9 left-9 flex justify-between" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full border border-ink bg-gold-leaf" />
                  <span className="h-2 w-2 rounded-full border border-ink bg-gold-leaf" />
                </div>

                {/* Hanging architectural card stock tag */}
                <SiteLink
                  href={`/listings/${listing.id}/`}
                  className="group flex flex-1 flex-col border border-line bg-bg p-4 no-underline transition-colors hover:border-gold-leaf hover:no-underline sm:p-5"
                >
                  <div className="mx-auto w-full max-w-[205px]">
                    <Facade
                      art={listing.art}
                      title={`${listing.street}, ${listing.suburb}`}
                      sash={listing.status === 'under-offer' ? 'UNDER OFFER' : undefined}
                    />
                  </div>
                  <div className="mt-4 flex flex-1 flex-col border-t border-line pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="mono-label text-gold-text">{listing.suburb}</span>
                      <span className="mono-label text-muted">{methodLabel(listing.method)}</span>
                    </div>
                    <h3 className="mt-1.5 font-display text-2xl text-ink group-hover:text-gold-text">
                      {listing.street}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{listing.headline}</p>
                    <p className="mt-4 font-display text-xl font-medium text-ink">
                      {formatPriceGuide(listing.priceGuide)}
                    </p>
                    <div className="mt-3 border-t border-line/70 pt-3">
                      <PropertySpecs
                        bedrooms={listing.bedrooms}
                        bathrooms={listing.bathrooms}
                        carSpaces={listing.carSpaces}
                        landM2={listing.landM2}
                        internalM2={listing.internalM2}
                        compact
                      />
                    </div>
                  </div>
                </SiteLink>
              </article>
            ))}
          </div>
        </ShopfrontWindow>
      </div>
    </section>
  );
}

export const WindowShowcase = WindowSection;

/* -------------------------------------------------------------------------- */
/* 3. RECENTLY SOLD — Charcoal bluestone band, 3 gold numerals + 5 signboards */
/* -------------------------------------------------------------------------- */

export function RecentlySoldBand({
  eyebrow,
  heading,
  note,
  linkLabel,
  metrics,
  recent,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  note: ReactNode;
  linkLabel: ReactNode;
  metrics: SoldMetrics;
  recent: readonly SoldResult[];
}) {
  return (
    <section className="bluestone-band border-y border-band-line py-16 md:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left: heading & three oversized derived gold numerals */}
        <div className="lg:col-span-5">
          <p className="mono-label text-gold-leaf">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl text-band-ink sm:text-5xl">{heading}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-band-muted">{note}</p>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-band-line py-6">
            <div>
              <dt className="mono-label text-[0.68rem] text-band-muted">Homes sold</dt>
              <dd className="mt-1 font-display text-5xl leading-none text-gold-leaf sm:text-6xl">
                {metrics.homesSold}
              </dd>
            </div>
            <div className="border-l border-band-line pl-4">
              <dt className="mono-label text-[0.68rem] text-band-muted">Median days</dt>
              <dd className="mt-1 font-display text-5xl leading-none text-gold-leaf sm:text-6xl">
                {metrics.medianDaysOnMarket}
              </dd>
            </div>
            <div className="border-l border-band-line pl-4">
              <dt className="mono-label text-[0.68rem] text-band-muted">At / pre-auction</dt>
              <dd className="mt-1 font-display text-5xl leading-none text-gold-leaf sm:text-6xl">
                {metrics.auctionOrPriorPercent}%
              </dd>
            </div>
          </dl>

          <div className="mt-7">
            <SiteLink href="/sold/" className="button button-on-band">
              <span>{linkLabel}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </SiteLink>
          </div>
        </div>

        {/* Right: five small signboards with sashes, staggered on a kerb line */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {recent.map((sale, index) => (
              <div
                key={sale.id}
                className={index % 2 === 1 ? 'sm:translate-y-4' : ''}
              >
                <SoldBoard
                  variant="SOLD"
                  headline={sale.street}
                  subline={sale.suburb}
                  footer={formatSoldPrice(sale)}
                  compact
                />
                <p className="mt-1.5 flex items-center justify-between px-2 font-mono text-[0.7rem] tracking-wider uppercase text-band-muted">
                  <span>{propertyTypeLabel(sale.propertyType)}</span>
                  <span>{sale.daysOnMarket} days</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. HOW WE SELL — Limestone floor-plan grid, 01–04 down central rule        */
/* -------------------------------------------------------------------------- */

function HowWeSellRoot({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="floorplan-grid py-16 md:py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{heading}</h2>
        </div>

        <div className="relative mt-12">
          {/* Central vertical gold rule + architectural floor-plan drawing on desktop */}
          <div
            className="pointer-events-none hidden lg:flex lg:flex-col lg:items-center lg:absolute lg:inset-y-0 lg:left-1/2 lg:-translate-x-1/2 lg:w-[270px]"
            aria-hidden="true"
          >
            <div className="h-8 w-px bg-gold-leaf" />
            <div className="w-full border border-line bg-surface/95 p-3 shadow-sm">
              <FloorPlanDrawing />
            </div>
            <div className="flex-1 w-px bg-gold-leaf" />
          </div>

          <ol className="grid gap-7 lg:grid-cols-2 lg:gap-x-[310px] lg:gap-y-12">
            {children}
          </ol>

          {/* Mobile/tablet floor-plan drawing below steps */}
          <div className="mx-auto mt-10 max-w-[300px] border border-line bg-surface/95 p-4 lg:hidden">
            <FloorPlanDrawing />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowWeSellStep({
  number,
  title,
  children,
}: {
  number: string;
  title: ReactNode;
  children: ReactNode;
}) {
  const isEven = Number(number) % 2 === 0;
  return (
    <li className={`relative border-l-2 border-gold-leaf bg-surface/95 p-6 ${isEven ? 'lg:mt-10' : ''}`}>
      <span className="font-display text-5xl leading-none text-gold-text" aria-hidden="true">
        {number}
      </span>
      <h3 className="mt-3 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{children}</p>
    </li>
  );
}

export const HowWeSell = Object.assign(HowWeSellRoot, { Step: HowWeSellStep });

/* -------------------------------------------------------------------------- */
/* 5. THE TEAM — Four brass name plates mounted on a bluestone-sett wall      */
/* -------------------------------------------------------------------------- */

export function TeamWall({
  eyebrow,
  heading,
  linkLabel,
  team,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  linkLabel: ReactNode;
  team: readonly Agent[];
}) {
  return (
    <section className="bg-surface">
      <BluestoneSettBand />
      <div className="wrap py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{heading}</h2>
          </div>
          <SiteLink href="/agents/" className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase text-gold-text hover:underline">
            <span>{linkLabel}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </SiteLink>
        </div>

        {/* Mounted on a dark bluestone wall panel */}
        <div className="bluestone-band mt-8 border border-ink p-5 sm:p-8">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {team.map(agent => (
              <SiteLink
                key={agent.id}
                href={`/agents/#${agent.id}`}
                className="block no-underline transition-transform hover:-translate-y-0.5 hover:no-underline"
              >
                <BrassPlate
                  initials={agent.initials}
                  name={agent.name}
                  role={agent.role}
                  detail={agent.suburbs.join(', ')}
                />
              </SiteLink>
            ))}
          </div>
        </div>
      </div>
      <BluestoneSettBand />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. APPRAISAL CTA — Full-bleed diagonal split band (gold leaf + charcoal)   */
/* -------------------------------------------------------------------------- */

function AppraisalBandRoot({ children }: ChildrenProps) {
  return (
    <section className="appraisal-split border-y border-ink py-16 md:py-20">
      <div className="wrap relative z-10 grid items-center gap-10 md:grid-cols-12">
        <div className="mx-auto w-56 sm:w-64 md:col-span-5">
          <AppraisalKeyArch />
        </div>
        <div className="border border-gold-leaf/50 bg-band/95 p-7 sm:p-10 md:col-span-7">
          {children}
        </div>
      </div>
    </section>
  );
}

function AppraisalEyebrow({ children }: ChildrenProps) {
  return <p className="mono-label text-gold-leaf">{children}</p>;
}

function AppraisalHeading({ children }: ChildrenProps) {
  return <h2 className="mt-2.5 font-display text-3xl text-band-ink sm:text-5xl">{children}</h2>;
}

function AppraisalBody({ children }: ChildrenProps) {
  return <p className="mt-4 max-w-xl text-base leading-relaxed text-band-muted">{children}</p>;
}

function AppraisalAction({ children }: ChildrenProps) {
  return (
    <div className="mt-7">
      <SiteLink href="/appraisal/" className="button button-on-band">
        <span>{children}</span>
        <ArrowRightIcon className="h-4 w-4" />
      </SiteLink>
    </div>
  );
}

export const AppraisalBand = Object.assign(AppraisalBandRoot, {
  Eyebrow: AppraisalEyebrow,
  Heading: AppraisalHeading,
  Body: AppraisalBody,
  Action: AppraisalAction,
});

/* -------------------------------------------------------------------------- */
/* 7. VISIT THE OFFICE — Two columns: shopfront elevation + address & hours   */
/* -------------------------------------------------------------------------- */

export function VisitOffice({
  eyebrow,
  heading,
  agency,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  agency: Business;
}) {
  const telHref = `tel:${agency.phone.replace(/[^\d+]/g, '')}`;

  return (
    <section className="bg-bg pt-16 pb-4 md:pt-24">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <OfficeElevation />
        </div>

        <div className="lg:col-span-6">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{heading}</h2>
          <p className="mt-4 text-base text-muted">{agency.landmark}</p>
          <p className="mt-2 text-sm text-muted">{agency.directions}</p>

          <div className="mt-6 border border-line bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-start gap-2.5 text-sm font-medium text-ink">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-text" />
                <span>{agency.address.formatted}</span>
              </div>
              <OpenBadge hours={agency.hours} />
            </div>

            <div className="mt-4">
              <HoursTable hours={agency.hours} />
              <TimeZoneNote />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-line pt-4 text-sm">
              <a href={telHref} className="text-link inline-flex items-center gap-2 font-medium">
                <PhoneIcon className="h-4 w-4 text-gold-text" />
                <span>{agency.phone}</span>
              </a>
              <a href={`mailto:${agency.email}`} className="text-link inline-flex items-center gap-2 font-medium wrap-anywhere">
                <MailIcon className="h-4 w-4 text-gold-text" />
                <span>{agency.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
