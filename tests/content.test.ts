import assert from 'node:assert/strict';
import { test } from 'node:test';
import { agents } from '../content/agents.ts';
import { business } from '../content/business.ts';
import { listings } from '../content/listings.ts';
import { soldResults } from '../content/sold.ts';
import { validateHours } from '../lib/hours.ts';
import {
  agentPortfolio,
  computeSoldMetrics,
  featuredListings,
  filterListings,
  formatPriceGuide,
  formatSoldPrice,
  groupSoldByMonth,
  sortListings,
  validateAgents,
  validateListings,
  validateSoldResults,
} from '../lib/real-estate.ts';
import { businessStructuredData, jsonLd, listingStructuredData } from '../lib/structured-data.ts';

test('business content has actionable required fields and statutory wording', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'landmark', 'directions'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.serviceArea.length >= 7, 'business.serviceArea: expected inner-north suburbs');
  assert.doesNotThrow(() => validateHours(business.hours));
  assert.match(business.appraisalDisclaimer, /not a formal valuation by a certified practising valuer/i);
  assert.match(business.underquotingNote, /Statement of Information/i);
  assert.match(business.enquiries.wordingRule, /doesn't book/i);
  assert.match(business.enquiries.wordingRule, /in writing/i);
  assert.ok(business.enquiries.usefulToInclude.length >= 3);
});

test('agents, listings and sold results pass full validation', () => {
  assert.doesNotThrow(() => validateAgents(agents));
  assert.doesNotThrow(() => validateListings(listings, agents));
  assert.doesNotThrow(() => validateSoldResults(soldResults, agents, '2026-11'));

  // Cross-collection ID uniqueness check
  const allIds = [...agents.map(a => a.id), ...listings.map(l => l.id), ...soldResults.map(s => s.id)];
  assert.equal(new Set(allIds).size, allIds.length, 'IDs must be unique across agents, listings and sold results');
});

test('validation failures name the exact failing item ID', () => {
  // Duplicate & bad listing ID
  assert.throws(
    () => validateListings([{ ...listings[0], id: 'Bad ID!' }], agents),
    /Bad ID!/,
  );
  // Unknown agentId
  assert.throws(
    () => validateListings([{ ...listings[0], agentId: 'nobody' }], agents),
    /carlton-drummond-terrace/,
  );
  // Victorian 10% underquoting range exceeded
  assert.throws(
    () => validateListings([{ ...listings[0], priceGuide: { min: 1_000_000, max: 1_150_000 } }], agents),
    /carlton-drummond-terrace/,
  );
  // Price guide min > max
  assert.throws(
    () => validateListings([{ ...listings[0], priceGuide: { min: 1_200_000, max: 1_100_000 } }], agents),
    /carlton-drummond-terrace/,
  );
  // Apartment with landM2 fails naming its ID
  assert.throws(
    () => validateListings([{ ...listings[3], landM2: 120 }], agents),
    /parkville-gardens-apartment/,
  );
  // Invalid inspection slot (start >= end)
  assert.throws(
    () => validateListings([{ ...listings[0], inspections: [{ day: 'Saturday', start: '11:00', end: '10:30' }] }], agents),
    /carlton-drummond-terrace/,
  );
  // Sold priceWithheld must have price === null
  assert.throws(
    () => validateSoldResults([{ ...soldResults[4], price: 900_000, priceWithheld: true }], agents, '2026-11'),
    /fitzroy-north-alfred-cottage/,
  );
  // Sold non-withheld must have positive integer price
  assert.throws(
    () => validateSoldResults([{ ...soldResults[0], price: null, priceWithheld: false }], agents, '2026-11'),
    /carlton-north-pigdon-terrace/,
  );
  // Future soldMonth rejected
  assert.throws(
    () => validateSoldResults([{ ...soldResults[0], soldMonth: '2026-12' }], agents, '2026-11'),
    /carlton-north-pigdon-terrace/,
  );
  // Agent with unknown suburb
  assert.throws(
    () => validateAgents([{ ...agents[0], suburbs: ['Brighton'] }]),
    /amara-okafor/,
  );
});

test('derived sold figures are computed accurately from soldResults', () => {
  const metrics = computeSoldMetrics(soldResults);
  assert.equal(metrics.homesSold, 8);
  assert.equal(metrics.medianDaysOnMarket, 28);
  assert.equal(metrics.auctionOrPriorPercent, 75);

  // Odd-length median & mixed methods
  const sample = computeSoldMetrics([
    { ...soldResults[0], daysOnMarket: 15, method: 'auction' },
    { ...soldResults[1], daysOnMarket: 31, method: 'private-sale' },
    { ...soldResults[2], daysOnMarket: 24, method: 'private-sale' },
  ]);
  assert.equal(sample.homesSold, 3);
  assert.equal(sample.medianDaysOnMarket, 24);
  assert.equal(sample.auctionOrPriorPercent, 33);

  assert.deepEqual(computeSoldMetrics([]), {
    homesSold: 0,
    medianDaysOnMarket: 0,
    auctionOrPriorPercent: 0,
  });
});

test('sorting, filtering, grouping and owner edits work as documented', () => {
  const sorted = sortListings(listings);
  assert.deepEqual(
    sorted.slice(0, 3).map(item => item.id),
    ['northcote-bungalow', 'fitzroy-north-park-townhouse', 'carlton-drummond-terrace'],
  );

  // Filter by suburb, type and min bedrooms
  assert.deepEqual(
    filterListings(listings, { suburb: 'Carlton', propertyType: 'terrace', minBedrooms: 4 }).map(x => x.id),
    ['carlton-drummond-terrace'],
  );
  assert.equal(filterListings(listings, { minBedrooms: 3 }).length, 4);

  // Month grouping newest first
  const grouped = groupSoldByMonth(soldResults);
  assert.equal(grouped[0].soldMonth, '2026-11');
  assert.equal(grouped[1].soldMonth, '2026-10');
  assert.equal(grouped[1].items.length, 2);
  assert.equal(grouped.at(-1)?.soldMonth, '2026-06');

  // Price withheld formatting
  assert.equal(formatSoldPrice(soldResults[4]), 'Price withheld');
  assert.equal(formatSoldPrice(soldResults[0]), '$1,710,000');
  assert.equal(formatPriceGuide(listings[0].priceGuide), '$2,150,000–$2,350,000');

  // Owner edit simulation: marking fitzroy-north-park-townhouse under-offer & unfeatured
  const edited = listings.map(item =>
    item.id === 'fitzroy-north-park-townhouse'
      ? { ...item, status: 'under-offer' as const, featured: false }
      : item,
  );
  assert.doesNotThrow(() => validateListings(edited, agents));
  assert.equal(
    featuredListings(edited).some(item => item.id === 'fitzroy-north-park-townhouse'),
    false,
  );
  assert.equal(
    edited.find(item => item.id === 'fitzroy-north-park-townhouse')?.status,
    'under-offer',
  );

  // Derived agent portfolio counts
  const amara = agentPortfolio('amara-okafor', listings, soldResults);
  assert.equal(amara.activeListings.length, 2);
  assert.equal(amara.soldCount, 3);
});

test('structured data emits RealEstateAgent, offer-free residence schemas and escapes JSON-LD', () => {
  const org = businessStructuredData();
  assert.equal(org['@type'], 'RealEstateAgent');
  assert.equal(org.email, business.email);
  assert.equal(org.telephone, business.phone);
  assert.equal(org.address.addressLocality, 'Carlton');
  assert.equal(org.areaServed.length, 7);
  assert.equal(org.openingHoursSpecification.length, 6);
  assert.equal(org.employee.length, 4);
  assert.equal(org.employee[0]['@type'], 'Person');
  assert.equal(org.employee[0].worksFor.name, business.name);

  const terraceSchema = listingStructuredData(listings[0]);
  assert.equal(terraceSchema['@type'], 'SingleFamilyResidence');
  assert.equal('offers' in terraceSchema, false);

  const aptSchema = listingStructuredData(listings[3]);
  assert.equal(aptSchema['@type'], 'Apartment');
  assert.equal('offers' in aptSchema, false);

  const dangerous = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(dangerous);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), dangerous);
});
