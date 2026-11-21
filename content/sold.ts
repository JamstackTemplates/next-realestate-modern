import type { FacadeArt, PropertyType } from './listings.ts';

export type SoldMethod = 'auction' | 'prior-to-auction' | 'private-sale';

export interface SoldResult {
  /** URL-safe unique identifier. */
  id: string;
  /** Street number and name. */
  street: string;
  /** Suburb (must exist in business.serviceArea). */
  suburb: string;
  /** Property type for facade illustration. */
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  /** Whole AUD selling price, or null when priceWithheld is true. */
  price: number | null;
  /** True when the vendor asked not to publish the final price. */
  priceWithheld: boolean;
  /** How the property sold. */
  method: SoldMethod;
  /** Month sold in YYYY-MM format (no later than the current month). */
  soldMonth: string;
  /** Campaign length in days on market. */
  daysOnMarket: number;
  /** References an Agent id in content/agents.ts. */
  agentId: string;
  /** Optional one-line auction or vendor note. */
  note?: string;
  /** Artwork variant parameters for <Facade>. */
  art: FacadeArt;
}

export const soldResults: readonly SoldResult[] = [
  {
    id: 'carlton-north-pigdon-terrace',
    street: '52 Pigdon Street',
    suburb: 'Carlton North',
    propertyType: 'terrace',
    bedrooms: 3,
    bathrooms: 1,
    carSpaces: 0,
    price: 1_710_000,
    priceWithheld: false,
    method: 'auction',
    soldMonth: '2026-11',
    daysOnMarket: 28,
    agentId: 'amara-okafor',
    note: '11 registered bidders',
    art: { facade: 'victorian-terrace', roof: 'parapet-urns', door: 'keystone-arch' },
  },
  {
    id: 'clifton-hill-hodgkinson-house',
    street: '19 Hodgkinson Street',
    suburb: 'Clifton Hill',
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 2,
    price: 2_480_000,
    priceWithheld: false,
    method: 'prior-to-auction',
    soldMonth: '2026-10',
    daysOnMarket: 21,
    agentId: 'tom-vella',
    art: { facade: 'edwardian-villa', roof: 'hip-finial', door: 'return-verandah' },
  },
  {
    id: 'northcote-mitchell-townhouse',
    street: '4/77 Mitchell Street',
    suburb: 'Northcote',
    propertyType: 'townhouse',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    price: 1_265_000,
    priceWithheld: false,
    method: 'private-sale',
    soldMonth: '2026-10',
    daysOnMarket: 34,
    agentId: 'mei-lin-cho',
    art: { facade: 'modern-townhouse', roof: 'flat-batten', door: 'timber-pivot' },
  },
  {
    id: 'parkville-flemington-apartment',
    street: '21/300 Flemington Road',
    suburb: 'Parkville',
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 1,
    price: 612_000,
    priceWithheld: false,
    method: 'private-sale',
    soldMonth: '2026-09',
    daysOnMarket: 41,
    agentId: 'amara-okafor',
    art: { facade: 'parkside-apartment', roof: 'art-deco-step', door: 'glazed-lobby' },
  },
  {
    id: 'fitzroy-north-alfred-cottage',
    street: '30 Alfred Crescent',
    suburb: 'Fitzroy North',
    propertyType: 'house',
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 0,
    price: null,
    priceWithheld: true,
    method: 'auction',
    soldMonth: '2026-09',
    daysOnMarket: 28,
    agentId: 'tom-vella',
    note: "Price withheld at vendor's request",
    art: { facade: 'cal-bungalow', roof: 'gable-terracotta', door: 'porch-leadlight' },
  },
  {
    id: 'abbotsford-nicholson-loft',
    street: '6/45 Nicholson Street',
    suburb: 'Abbotsford',
    propertyType: 'warehouse',
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    price: 1_040_000,
    priceWithheld: false,
    method: 'auction',
    soldMonth: '2026-08',
    daysOnMarket: 30,
    agentId: 'mei-lin-cho',
    note: 'Sold under the hammer',
    art: { facade: 'sawtooth-warehouse', roof: 'sawtooth', door: 'loading-arch' },
  },
  {
    id: 'carlton-canning-terrace',
    street: '210 Canning Street',
    suburb: 'Carlton',
    propertyType: 'terrace',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    price: 1_955_000,
    priceWithheld: false,
    method: 'auction',
    soldMonth: '2026-07',
    daysOnMarket: 28,
    agentId: 'amara-okafor',
    art: { facade: 'victorian-terrace', roof: 'parapet-urns', door: 'keystone-arch' },
  },
  {
    id: 'northcote-westgarth-house',
    street: '9 Westgarth Street',
    suburb: 'Northcote',
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 2,
    price: 1_890_000,
    priceWithheld: false,
    method: 'prior-to-auction',
    soldMonth: '2026-06',
    daysOnMarket: 19,
    agentId: 'mei-lin-cho',
    art: { facade: 'cal-bungalow', roof: 'gable-terracotta', door: 'porch-leadlight' },
  },
];
