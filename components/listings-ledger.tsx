'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Listing, PropertyType } from '../content/listings';
import {
  filterListings,
  formatPriceGuide,
  methodLabel,
  propertyTypeLabel,
  sortListings,
} from '../lib/real-estate';
import { Facade } from './art/facade';
import { ArrowRightIcon, CalendarIcon, GavelIcon } from './art/icons';
import { PropertySpecs } from './property-specs';
import { SiteLink } from './site-link';

const PROPERTY_TYPES: readonly PropertyType[] = ['terrace', 'house', 'townhouse', 'apartment', 'warehouse'];

export function ListingsLedger({
  items,
  suburbs,
}: {
  items: readonly Listing[];
  suburbs: readonly string[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [suburb, setSuburb] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minBedrooms, setMinBedrooms] = useState(0);

  useEffect(() => {
    setHydrated(true);
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const initialSuburb = params.get('suburb') ?? '';
    const initialType = params.get('type') ?? '';
    const initialBeds = Number(params.get('beds') ?? '0');
    if (initialSuburb && suburbs.includes(initialSuburb)) setSuburb(initialSuburb);
    if (initialType && PROPERTY_TYPES.includes(initialType as PropertyType)) setPropertyType(initialType);
    if (Number.isInteger(initialBeds) && initialBeds >= 1 && initialBeds <= 4) setMinBedrooms(initialBeds);
  }, [suburbs]);

  const updateFilters = (next: { suburb?: string; propertyType?: string; minBedrooms?: number }) => {
    const nextSuburb = next.suburb !== undefined ? next.suburb : suburb;
    const nextType = next.propertyType !== undefined ? next.propertyType : propertyType;
    const nextBeds = next.minBedrooms !== undefined ? next.minBedrooms : minBedrooms;

    setSuburb(nextSuburb);
    setPropertyType(nextType);
    setMinBedrooms(nextBeds);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (nextSuburb) url.searchParams.set('suburb', nextSuburb);
      else url.searchParams.delete('suburb');
      if (nextType) url.searchParams.set('type', nextType);
      else url.searchParams.delete('type');
      if (nextBeds > 0) url.searchParams.set('beds', String(nextBeds));
      else url.searchParams.delete('beds');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  };

  const sortedAll = useMemo(() => sortListings(items), [items]);
  const filtered = useMemo(
    () =>
      hydrated
        ? filterListings(sortedAll, {
            suburb: suburb || undefined,
            propertyType: propertyType || undefined,
            minBedrooms: minBedrooms || undefined,
          })
        : sortedAll,
    [hydrated, sortedAll, suburb, propertyType, minBedrooms],
  );

  const hasFilters = Boolean(suburb || propertyType || minBedrooms > 0);

  return (
    <div>
      {/* Progressive enhancement: brass-rail filter bar appears only when JS is available */}
      {hydrated ? (
        <div
          aria-label="Filter homes for sale"
          className="mb-8 border-y-2 border-gold-leaf bg-surface px-4 py-5 sm:px-6"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="filter-suburb" className="mono-label text-gold-text">
                Suburb
              </label>
              <select
                id="filter-suburb"
                value={suburb}
                onChange={e => updateFilters({ suburb: e.target.value })}
                className="min-h-11 border border-line bg-bg px-3 text-sm text-ink"
              >
                <option value="">All inner-north suburbs</option>
                {suburbs.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="filter-type" className="mono-label text-gold-text">
                Property type
              </label>
              <select
                id="filter-type"
                value={propertyType}
                onChange={e => updateFilters({ propertyType: e.target.value })}
                className="min-h-11 border border-line bg-bg px-3 text-sm text-ink"
              >
                <option value="">All property types</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>
                    {propertyTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="filter-beds" className="mono-label text-gold-text">
                Minimum bedrooms
              </label>
              <select
                id="filter-beds"
                value={minBedrooms}
                onChange={e => updateFilters({ minBedrooms: Number(e.target.value) })}
                className="min-h-11 border border-line bg-bg px-3 text-sm text-ink"
              >
                <option value={0}>Any bedrooms</option>
                <option value={2}>2+ bedrooms</option>
                <option value={3}>3+ bedrooms</option>
                <option value={4}>4+ bedrooms</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
              <p className="mono-label text-muted" role="status" aria-live="polite">
                Showing {filtered.length} of {sortedAll.length} {sortedAll.length === 1 ? 'home' : 'homes'}
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={() => updateFilters({ suburb: '', propertyType: '', minBedrooms: 0 })}
                  className="button button-quiet button-compact"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {/* Architectural ledger of wide rows */}
      {filtered.length === 0 ? (
        <div className="border border-line bg-surface p-10 text-center">
          <p className="font-display text-3xl text-ink">No homes match those filters.</p>
          <p className="mt-2 text-sm text-muted">
            Widen the suburb, property type or bedroom count to view all current campaigns.
          </p>
          <button
            type="button"
            onClick={() => updateFilters({ suburb: '', propertyType: '', minBedrooms: 0 })}
            className="button mt-6"
          >
            Show all homes for sale
          </button>
        </div>
      ) : (
        <ol className="divide-y divide-line border-y border-line">
          {filtered.map(listing => {
            const firstInspection = listing.inspections[0];
            return (
              <li key={listing.id} className="bg-surface/65 transition-colors hover:bg-surface">
                <article className="grid gap-6 px-4 py-7 sm:px-6 md:grid-cols-12 md:items-center lg:gap-8">
                  {/* Left: keystone-arched facade with UNDER OFFER sash if applicable */}
                  <div className="mx-auto w-44 sm:w-48 md:col-span-3 md:mx-0 md:w-full md:max-w-[185px]">
                    <SiteLink href={`/listings/${listing.id}/`} className="block" aria-label={`View ${listing.street}, ${listing.suburb}`}>
                      <Facade
                        art={listing.art}
                        title={`${listing.street}, ${listing.suburb}`}
                        sash={listing.status === 'under-offer' ? 'UNDER OFFER' : undefined}
                      />
                    </SiteLink>
                  </div>

                  {/* Middle: address, suburb, headline & next inspection */}
                  <div className="md:col-span-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="mono-label text-gold-text">
                        {listing.suburb} {listing.postcode}
                      </span>
                      <span className="text-line" aria-hidden="true">·</span>
                      <span className="mono-label text-muted">{propertyTypeLabel(listing.propertyType)}</span>
                      {listing.featured ? (
                        <span className="border border-gold-leaf px-2 py-0.5 font-mono text-[0.65rem] tracking-widest uppercase text-gold-text">
                          In the window
                        </span>
                      ) : null}
                      {listing.status === 'under-offer' ? (
                        <span className="bg-gold-leaf px-2 py-0.5 font-mono text-[0.65rem] font-medium tracking-widest uppercase text-[#1E1F22]">
                          Under offer
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
                      <SiteLink
                        href={`/listings/${listing.id}/`}
                        className="no-underline hover:text-gold-text hover:underline"
                      >
                        {listing.street}
                      </SiteLink>
                    </h2>

                    <p className="mt-2 text-base text-muted">{listing.headline}</p>

                    {firstInspection ? (
                      <p className="mt-3.5 inline-flex items-center gap-2 font-mono text-xs text-muted">
                        <CalendarIcon className="h-4 w-4 text-gold-text" />
                        <span>
                          Inspect {firstInspection.day} {firstInspection.start}–{firstInspection.end}
                        </span>
                      </p>
                    ) : null}
                  </div>

                  {/* Right: Bodoni price guide, specs & view action */}
                  <div className="flex flex-col justify-between gap-4 border-t border-line pt-4 md:col-span-4 md:items-end md:border-t-0 md:border-l md:pt-0 md:pl-6 md:text-right">
                    <div>
                      <p className="mono-label inline-flex items-center gap-1.5 text-muted">
                        {listing.method === 'auction' ? <GavelIcon className="h-3.5 w-3.5 text-gold-text" /> : null}
                        <span>{methodLabel(listing.method)}</span>
                      </p>
                      <p className="mt-1 font-display text-2xl font-medium text-ink sm:text-3xl">
                        {formatPriceGuide(listing.priceGuide)}
                      </p>
                    </div>

                    <div className="md:flex md:justify-end">
                      <PropertySpecs
                        bedrooms={listing.bedrooms}
                        bathrooms={listing.bathrooms}
                        carSpaces={listing.carSpaces}
                        landM2={listing.landM2}
                        internalM2={listing.internalM2}
                      />
                    </div>

                    <SiteLink href={`/listings/${listing.id}/`} className="button button-quiet button-compact self-start md:self-end">
                      <span>View home</span>
                      <ArrowRightIcon className="h-4 w-4" />
                    </SiteLink>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
