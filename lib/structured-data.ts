import { agents } from '../content/agents.ts';
import { business } from '../content/business.ts';
import type { Listing } from '../content/listings.ts';
import { absoluteUrl } from './paths.ts';

/** RealEstateAgent schema derived from content/business.ts and content/agents.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = business.hours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phone,
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.suburb,
      addressRegion: business.address.state,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    areaServed: business.serviceArea.map(suburb => ({
      '@type': 'City',
      name: `${suburb}, VIC`,
    })),
    openingHoursSpecification,
    employee: agents.map(agent => ({
      '@type': 'Person',
      name: agent.name,
      jobTitle: agent.role,
      email: agent.email,
      telephone: agent.phone,
      knowsLanguage: [...agent.languages],
      worksFor: {
        '@type': 'RealEstateAgent',
        name: business.name,
      },
    })),
  };
}

/**
 * Offer-free residential schema for a listing detail page.
 * Deliberately omits Offer/price because Victorian price guides are an indicative range.
 */
export function listingStructuredData(listing: Listing) {
  const url = absoluteUrl(`/listings/${listing.id}/`);
  const schemaType = listing.propertyType === 'apartment' ? 'Apartment' : 'SingleFamilyResidence';
  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: `${listing.street}, ${listing.suburb}`,
    description: listing.headline,
    ...(url ? { url } : {}),
    numberOfRooms: listing.bedrooms,
    numberOfBedrooms: listing.bedrooms,
    numberOfBathroomsTotal: listing.bathrooms,
    ...(listing.internalM2
      ? {
          floorSize: {
            '@type': 'QuantitativeValue',
            value: listing.internalM2,
            unitCode: 'MTK',
          },
        }
      : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.street,
      addressLocality: listing.suburb,
      addressRegion: 'VIC',
      postalCode: listing.postcode,
      addressCountry: 'AU',
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
