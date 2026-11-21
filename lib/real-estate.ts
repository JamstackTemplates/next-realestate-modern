import { business } from '../content/business.ts';
import { agents, type Agent } from '../content/agents.ts';
import { listings, type Listing, type PropertyType, type SaleMethod } from '../content/listings.ts';
import { soldResults, type SoldMethod, type SoldResult } from '../content/sold.ts';
import { DAYS } from './hours.ts';

const audFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CLOCK_24H = /^([01]\d|2[0-3]):[0-5]\d$/;
const YEAR_MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** Format whole AUD dollars, e.g. $2,150,000. */
export function formatAud(amount: number): string {
  return audFormatter.format(Math.round(amount));
}

/** Format a listing price guide range, e.g. $2,150,000–$2,350,000. */
export function formatPriceGuide(guide: { min: number; max: number }): string {
  if (guide.min === guide.max) return formatAud(guide.min);
  return `${formatAud(guide.min)}–${formatAud(guide.max)}`;
}

/** Format a sold result price or "Price withheld". */
export function formatSoldPrice(result: Pick<SoldResult, 'price' | 'priceWithheld'>): string {
  if (result.priceWithheld || result.price === null) return 'Price withheld';
  return formatAud(result.price);
}

/** Human-readable property type label. */
export function propertyTypeLabel(type: PropertyType): string {
  switch (type) {
    case 'terrace': return 'Terrace';
    case 'house': return 'House';
    case 'townhouse': return 'Townhouse';
    case 'apartment': return 'Apartment';
    case 'warehouse': return 'Warehouse';
  }
}

/** Human-readable campaign / sold method label. */
export function methodLabel(method: SaleMethod | SoldMethod): string {
  switch (method) {
    case 'auction': return 'Auction';
    case 'prior-to-auction': return 'Sold prior to auction';
    case 'private-sale': return 'Private sale';
  }
}

/** Format YYYY-MM to "November 2026". */
export function formatMonthHeading(soldMonth: string): { monthName: string; year: string; full: string } {
  const match = YEAR_MONTH.exec(soldMonth);
  if (!match) return { monthName: soldMonth, year: '', full: soldMonth };
  const year = match[1];
  const monthIndex = Number(match[2]) - 1;
  const monthName = MONTH_NAMES[monthIndex];
  return { monthName, year, full: `${monthName} ${year}` };
}

/** Sort active listings: featured first, then priceGuide.min ascending, then id. */
export function sortListings(items: readonly Listing[] = listings): Listing[] {
  return [...items].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.priceGuide.min !== b.priceGuide.min) return a.priceGuide.min - b.priceGuide.min;
    return a.id.localeCompare(b.id);
  });
}

/** Featured listings for the Home page shopfront window. */
export function featuredListings(items: readonly Listing[] = listings): Listing[] {
  return sortListings(items).filter(item => item.featured);
}

export interface ListingFilterCriteria {
  suburb?: string;
  propertyType?: string;
  minBedrooms?: number;
}

/** Filter sorted listings by suburb, property type and minimum bedrooms. */
export function filterListings(items: readonly Listing[], criteria: ListingFilterCriteria): Listing[] {
  return sortListings(items).filter(item => {
    if (criteria.suburb && item.suburb !== criteria.suburb) return false;
    if (criteria.propertyType && item.propertyType !== criteria.propertyType) return false;
    if (criteria.minBedrooms && item.bedrooms < criteria.minBedrooms) return false;
    return true;
  });
}

/** Sort sold results newest month first, preserving data order within a month. */
export function sortSoldResults(items: readonly SoldResult[] = soldResults): SoldResult[] {
  return [...items].sort((a, b) => b.soldMonth.localeCompare(a.soldMonth));
}

export interface SoldMonthGroup {
  soldMonth: string;
  monthName: string;
  year: string;
  items: SoldResult[];
}

/** Group sold results by YYYY-MM, newest first. */
export function groupSoldByMonth(items: readonly SoldResult[] = soldResults): SoldMonthGroup[] {
  const sorted = sortSoldResults(items);
  const groups = new Map<string, SoldResult[]>();
  for (const item of sorted) {
    const existing = groups.get(item.soldMonth);
    if (existing) existing.push(item);
    else groups.set(item.soldMonth, [item]);
  }
  return [...groups.entries()].map(([soldMonth, groupItems]) => {
    const { monthName, year } = formatMonthHeading(soldMonth);
    return { soldMonth, monthName, year, items: groupItems };
  });
}

export interface SoldMetrics {
  /** Total homes sold in the sold collection. */
  homesSold: number;
  /** Median campaign days on market, rounded to the nearest whole day. */
  medianDaysOnMarket: number;
  /** Percentage of homes sold at auction or prior to auction, rounded to whole percent. */
  auctionOrPriorPercent: number;
}

/** Compute derived agency metrics directly from sold results; never hand-typed. */
export function computeSoldMetrics(items: readonly SoldResult[] = soldResults): SoldMetrics {
  const homesSold = items.length;
  if (homesSold === 0) {
    return { homesSold: 0, medianDaysOnMarket: 0, auctionOrPriorPercent: 0 };
  }
  const days = items.map(item => item.daysOnMarket).sort((a, b) => a - b);
  const mid = Math.floor(days.length / 2);
  const median = days.length % 2 === 1 ? days[mid] : (days[mid - 1] + days[mid]) / 2;
  const auctionOrPriorCount = items.filter(
    item => item.method === 'auction' || item.method === 'prior-to-auction',
  ).length;
  return {
    homesSold,
    medianDaysOnMarket: Math.round(median),
    auctionOrPriorPercent: Math.round((auctionOrPriorCount / homesSold) * 100),
  };
}

/** Current listings and sold count derived per agent. */
export function agentPortfolio(
  agentId: string,
  allListings: readonly Listing[] = listings,
  allSold: readonly SoldResult[] = soldResults,
) {
  return {
    activeListings: sortListings(allListings).filter(item => item.agentId === agentId),
    soldCount: allSold.filter(item => item.agentId === agentId).length,
  };
}

function clockMinutes(value: string): number {
  return Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5));
}

/** Current YYYY-MM in Australia/Melbourne (or UTC fallback) for validating soldMonth. */
export function currentYearMonth(now = new Date(), timeZone = 'Australia/Melbourne'): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(now);
  const year = parts.find(p => p.type === 'year')?.value ?? String(now.getUTCFullYear());
  const month = parts.find(p => p.type === 'month')?.value ?? String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

/** Validate agents collection with item-specific errors. */
export function validateAgents(items: readonly Agent[] = agents): void {
  const seen = new Set<string>();
  const allowedSuburbs = new Set<string>([...business.serviceArea, 'All suburbs']);
  for (const agent of items) {
    if (!URL_SAFE_ID.test(agent.id)) {
      throw new Error(`agent "${agent.id}": id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(agent.id)) {
      throw new Error(`agent "${agent.id}": duplicate agent id`);
    }
    seen.add(agent.id);
    if (!agent.name.trim() || !agent.role.trim() || !agent.bio.trim() || !agent.phone.trim()) {
      throw new Error(`agent "${agent.id}": name, role, phone and bio are required`);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(agent.email)) {
      throw new Error(`agent "${agent.id}": valid public email required`);
    }
    if (!agent.suburbs.length) {
      throw new Error(`agent "${agent.id}": at least one suburb required`);
    }
    for (const suburb of agent.suburbs) {
      if (!allowedSuburbs.has(suburb)) {
        throw new Error(`agent "${agent.id}": suburb "${suburb}" is not in business.serviceArea`);
      }
    }
    if (!agent.languages.length) {
      throw new Error(`agent "${agent.id}": at least one language required`);
    }
    if (!Number.isInteger(agent.since) || agent.since < 1990 || agent.since > 2030) {
      throw new Error(`agent "${agent.id}": since must be a valid four-digit year`);
    }
  }
}

/** Validate listings collection with Victorian underquoting, reference, land and inspection checks. */
export function validateListings(
  items: readonly Listing[] = listings,
  allAgents: readonly Agent[] = agents,
): void {
  const seen = new Set<string>();
  const agentIds = new Set(allAgents.map(a => a.id));
  const serviceArea = new Set<string>(business.serviceArea);
  const validDays = new Set<string>(DAYS);
  const agentSlots = new Set<string>();

  for (const item of items) {
    if (!URL_SAFE_ID.test(item.id)) {
      throw new Error(`listing "${item.id}": id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(item.id)) {
      throw new Error(`listing "${item.id}": duplicate listing id`);
    }
    seen.add(item.id);
    if (!item.street.trim() || !item.headline.trim() || !item.description.length || !item.features.length) {
      throw new Error(`listing "${item.id}": street, headline, description and features are required`);
    }
    if (!serviceArea.has(item.suburb)) {
      throw new Error(`listing "${item.id}": suburb "${item.suburb}" is not in business.serviceArea`);
    }
    if (!/^\d{4}$/.test(item.postcode)) {
      throw new Error(`listing "${item.id}": postcode must be a 4-digit Victorian postcode`);
    }
    if (!agentIds.has(item.agentId)) {
      throw new Error(`listing "${item.id}": agentId "${item.agentId}" does not match any agent`);
    }
    const { min, max } = item.priceGuide;
    if (!Number.isInteger(min) || !Number.isInteger(max) || min <= 0) {
      throw new Error(`listing "${item.id}": priceGuide min and max must be positive whole AUD integers`);
    }
    if (max < min) {
      throw new Error(`listing "${item.id}": priceGuide.max (${max}) must be >= priceGuide.min (${min})`);
    }
    if (max > Math.round(min * 1.1)) {
      throw new Error(`listing "${item.id}": priceGuide range exceeds 10% Victorian underquoting limit (${min}–${max})`);
    }
    if ((item.propertyType === 'apartment' || item.propertyType === 'warehouse') && item.landM2 !== undefined) {
      throw new Error(`listing "${item.id}": apartments and warehouses with no land must omit landM2`);
    }
    if (item.landM2 !== undefined && (!Number.isInteger(item.landM2) || item.landM2 <= 0)) {
      throw new Error(`listing "${item.id}": landM2 must be a positive whole integer`);
    }
    if (item.internalM2 !== undefined && (!Number.isInteger(item.internalM2) || item.internalM2 <= 0)) {
      throw new Error(`listing "${item.id}": internalM2 must be a positive whole integer`);
    }
    for (const slot of item.inspections) {
      if (!validDays.has(slot.day)) {
        throw new Error(`listing "${item.id}": invalid inspection weekday "${slot.day}"`);
      }
      if (!CLOCK_24H.test(slot.start) || !CLOCK_24H.test(slot.end) || clockMinutes(slot.start) >= clockMinutes(slot.end)) {
        throw new Error(`listing "${item.id}": inspection slot ${slot.day} ${slot.start}–${slot.end} must be same-day with start < end`);
      }
      const key = `${item.agentId}|${slot.day}|${slot.start}-${slot.end}`;
      if (agentSlots.has(key)) {
        throw new Error(`listing "${item.id}": agent "${item.agentId}" has overlapping inspection at ${slot.day} ${slot.start}–${slot.end}`);
      }
      agentSlots.add(key);
    }
  }
}

/** Validate sold results collection with priceWithheld, agent reference and month checks. */
export function validateSoldResults(
  items: readonly SoldResult[] = soldResults,
  allAgents: readonly Agent[] = agents,
  maxYearMonth = currentYearMonth(),
): void {
  const seen = new Set<string>();
  const agentIds = new Set(allAgents.map(a => a.id));
  const serviceArea = new Set<string>(business.serviceArea);

  for (const item of items) {
    if (!URL_SAFE_ID.test(item.id)) {
      throw new Error(`sold "${item.id}": id must be lowercase URL-safe kebab-case`);
    }
    if (seen.has(item.id)) {
      throw new Error(`sold "${item.id}": duplicate sold id`);
    }
    seen.add(item.id);
    if (!item.street.trim()) {
      throw new Error(`sold "${item.id}": street is required`);
    }
    if (!serviceArea.has(item.suburb)) {
      throw new Error(`sold "${item.id}": suburb "${item.suburb}" is not in business.serviceArea`);
    }
    if (!agentIds.has(item.agentId)) {
      throw new Error(`sold "${item.id}": agentId "${item.agentId}" does not match any agent`);
    }
    if (item.priceWithheld) {
      if (item.price !== null) {
        throw new Error(`sold "${item.id}": price must be null when priceWithheld is true`);
      }
    } else if (item.price === null || !Number.isInteger(item.price) || item.price <= 0) {
      throw new Error(`sold "${item.id}": price must be a positive whole AUD integer when priceWithheld is false`);
    }
    if (!YEAR_MONTH.test(item.soldMonth)) {
      throw new Error(`sold "${item.id}": soldMonth "${item.soldMonth}" must match YYYY-MM`);
    }
    if (item.soldMonth > maxYearMonth) {
      throw new Error(`sold "${item.id}": soldMonth "${item.soldMonth}" cannot be later than current month "${maxYearMonth}"`);
    }
    if (!Number.isInteger(item.daysOnMarket) || item.daysOnMarket <= 0) {
      throw new Error(`sold "${item.id}": daysOnMarket must be a positive integer`);
    }
  }
}
