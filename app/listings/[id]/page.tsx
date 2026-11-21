import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAgentById, licenceLabel } from '../../../content/agents';
import { business } from '../../../content/business';
import { getListingById, listings } from '../../../content/listings';
import { BrassPlate } from '../../../components/art/brass-plate';
import { IronLaceFrieze } from '../../../components/art/dividers';
import { Facade } from '../../../components/art/facade';
import {
  ArrowRightIcon,
  CalendarIcon,
  GavelIcon,
  MailIcon,
  PhoneIcon,
} from '../../../components/art/icons';
import { PropertySpecs } from '../../../components/property-specs';
import { SiteLink } from '../../../components/site-link';
import { TimeZoneNote } from '../../../components/time-zone-note';
import { absoluteUrl } from '../../../lib/paths';
import { formatPriceGuide, methodLabel, propertyTypeLabel } from '../../../lib/real-estate';
import { jsonLd, listingStructuredData } from '../../../lib/structured-data';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listings.map(item => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return { title: 'Listing not found' };

  const title = `${listing.street}, ${listing.suburb}`;
  const description = `${listing.bedrooms}-bedroom ${propertyTypeLabel(listing.propertyType).toLowerCase()} in ${listing.suburb} (${formatPriceGuide(listing.priceGuide)}). ${listing.headline}`;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/listings/${listing.id}/`) },
    openGraph: {
      title: `${title} — ${business.name}`,
      description,
    },
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const agent = getAgentById(listing.agentId);
  const agentTel = agent ? `tel:${agent.phone.replace(/[^\d+]/g, '')}` : '';

  return (
    <>
      {/* Breadcrumb bar */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-surface">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-3.5 text-sm">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs tracking-wider uppercase text-muted">
            <li>
              <SiteLink href="/listings/" className="text-gold-text hover:underline">
                ← For sale
              </SiteLink>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">{listing.suburb}</li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{listing.street}</li>
          </ol>
          <span className="mono-label text-muted">ID: {listing.id}</span>
        </div>
      </nav>

      {/* Property plaque hero */}
      <header className="bg-surface">
        <div className="wrap grid gap-10 py-10 md:grid-cols-12 md:items-center md:py-14">
          <div className="mx-auto w-64 sm:w-72 md:col-span-5 md:w-full md:max-w-[330px]">
            <Facade
              art={listing.art}
              title={`${listing.street}, ${listing.suburb}`}
              sash={listing.status === 'under-offer' ? 'UNDER OFFER' : undefined}
            />
          </div>

          <div className="md:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">
                {listing.suburb} VIC {listing.postcode}
              </span>
              <span className="text-line" aria-hidden="true">·</span>
              <span className="mono-label text-muted">{propertyTypeLabel(listing.propertyType)}</span>
              {listing.status === 'under-offer' ? (
                <span className="bg-gold-leaf px-2.5 py-0.5 font-mono text-xs font-medium tracking-widest uppercase text-[#1E1F22]">
                  Under offer
                </span>
              ) : null}
            </div>

            <h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4.3rem)] leading-[1.03] text-ink">
              {listing.street}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted">{listing.headline}</p>

            {/* Price guide & method plaque */}
            <div className="mt-7 border-y border-line py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="mono-label text-muted">Indicative price guide</p>
                  <p className="mt-1 font-display text-3xl font-medium text-ink sm:text-4xl">
                    {formatPriceGuide(listing.priceGuide)}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="mono-label text-muted">Method of sale</p>
                  <p className="mt-1 inline-flex items-center gap-2 font-mono text-sm uppercase text-gold-text">
                    {listing.method === 'auction' ? <GavelIcon className="h-4 w-4" /> : null}
                    <span>{methodLabel(listing.method)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* DM Mono spec strip */}
            <div className="mt-5">
              <PropertySpecs
                bedrooms={listing.bedrooms}
                bathrooms={listing.bathrooms}
                carSpaces={listing.carSpaces}
                landM2={listing.landM2}
                internalM2={listing.internalM2}
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <SiteLink href="/contact/" className="button">
                <span>Enquire about this home</span>
                <ArrowRightIcon className="h-4 w-4" />
              </SiteLink>
              <span className="mono-label text-muted">
                Quote listing ID <strong className="text-ink">{listing.id}</strong>
              </span>
            </div>
          </div>
        </div>
        <IronLaceFrieze className="block h-5 w-full" />
      </header>

      {/* Main content & sidebar */}
      <div className="wrap grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <div className="space-y-10 lg:col-span-7">
          <section aria-labelledby="about-home-heading">
            <h2 id="about-home-heading" className="font-display text-3xl text-ink">
              About this home
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              {listing.description.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="features-heading" className="border-t border-line pt-8">
            <h2 id="features-heading" className="font-display text-3xl text-ink">
              Key features
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {listing.features.map(feature => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 border border-line bg-surface p-4 text-sm text-ink"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold-leaf" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside
            aria-label="Statement of Information note"
            className="border-l-2 border-gold-leaf bg-surface p-5 text-sm text-muted"
          >
            <p className="mono-label text-gold-text">Statement of Information &amp; price guide</p>
            <p className="mt-2 leading-relaxed">{business.underquotingNote}</p>
          </aside>
        </div>

        {/* Right column: Inspections timetable, listing agent brass plate & enquiry prompt */}
        <aside className="space-y-8 lg:col-span-5">
          {/* Weekly inspections timetable */}
          <section aria-labelledby="inspections-heading" className="border border-line bg-surface p-6">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gold-text" />
              <h2 id="inspections-heading" className="mono-label text-gold-text">
                Regular open inspections
              </h2>
            </div>
            <table className="mt-4 w-full border-collapse text-sm">
              <caption className="sr-only">Weekly open-for-inspection times</caption>
              <tbody>
                {listing.inspections.map(slot => (
                  <tr key={`${slot.day}-${slot.start}`} className="border-b border-line last:border-b-0">
                    <th scope="row" className="py-2.5 text-left font-medium text-ink">
                      Every {slot.day}
                    </th>
                    <td className="py-2.5 text-right font-mono text-xs text-muted">
                      {slot.start} – {slot.end}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TimeZoneNote />
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Private inspections can be requested through our office — include listing ID{' '}
              <code className="font-mono text-ink">{listing.id}</code> in your message.
            </p>
          </section>

          {/* Listing agent brass plate */}
          {agent ? (
            <section aria-labelledby="agent-heading" className="space-y-4">
              <h2 id="agent-heading" className="eyebrow">Listing agent</h2>
              <BrassPlate
                initials={agent.initials}
                name={agent.name}
                role={agent.role}
                detail={licenceLabel(agent.licence)}
              />
              <div className="border border-line bg-surface p-5 text-sm">
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5">
                    <PhoneIcon className="h-4 w-4 text-gold-text" />
                    <a href={agentTel} className="text-link font-medium">
                      {agent.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MailIcon className="h-4 w-4 text-gold-text" />
                    <a href={`mailto:${agent.email}`} className="text-link font-medium wrap-anywhere">
                      {agent.email}
                    </a>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-muted">
                  Ask {agent.name.split(' ')[0]} for the Section 32 Vendor Statement and Statement of
                  Information.
                </p>
              </div>
            </section>
          ) : null}

          {/* Direct enquiry callout */}
          <div className="bluestone-band border border-band-line p-6">
            <p className="mono-label text-gold-leaf">Listing reference</p>
            <p className="mt-1 font-mono text-sm text-band-ink">{listing.id}</p>
            <p className="mt-3 text-sm text-band-muted">
              Include this listing ID when asking for documents, a private viewing or to register
              interest ahead of auction.
            </p>
            <div className="mt-5">
              <SiteLink href="/contact/" className="button button-on-band w-full">
                <span>Enquire about this home</span>
                <ArrowRightIcon className="h-4 w-4" />
              </SiteLink>
            </div>
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(listingStructuredData(listing)) }}
      />
    </>
  );
}
