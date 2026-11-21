import type { Day } from '../lib/hours.ts';

export type PropertyType = 'terrace' | 'house' | 'townhouse' | 'apartment' | 'warehouse';
export type SaleMethod = 'auction' | 'private-sale';
export type ListingStatus = 'for-sale' | 'under-offer';

export interface InspectionSlot {
  /** Recurring weekly inspection weekday. */
  day: Day;
  /** Local Melbourne start time (HH:MM, 24-hour). */
  start: string;
  /** Local Melbourne end time (HH:MM, 24-hour, must be after start). */
  end: string;
}

export interface FacadeArt {
  /** Primary architectural drawing family. */
  facade: 'victorian-terrace' | 'modern-townhouse' | 'cal-bungalow' | 'parkside-apartment' | 'sawtooth-warehouse' | 'edwardian-villa';
  /** Roofline ornament variant. */
  roof: 'parapet-urns' | 'flat-batten' | 'gable-terracotta' | 'art-deco-step' | 'sawtooth' | 'hip-finial';
  /** Entry doorway style. */
  door: 'keystone-arch' | 'timber-pivot' | 'porch-leadlight' | 'glazed-lobby' | 'loading-arch' | 'return-verandah';
}

export interface Listing {
  /** URL-safe unique identifier used in /listings/[id]/ and enquiries. */
  id: string;
  /** Street number and name. */
  street: string;
  /** Inner-north suburb name (must exist in business.serviceArea). */
  suburb: string;
  /** Four-digit Victorian postcode. */
  postcode: string;
  /** Property category used for filtering and facade selection. */
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  /** Land area in square metres. Omit for apartments and warehouses with no land title. */
  landM2?: number;
  /** Optional internal floor area in square metres. */
  internalM2?: number;
  /** Statement of Information price guide in whole AUD; max must be within 10% of min. */
  priceGuide: {
    min: number;
    max: number;
  };
  /** Campaign method: auction or private-sale. */
  method: SaleMethod;
  /** Current market status; changing to 'under-offer' displays the UNDER OFFER sash. */
  status: ListingStatus;
  /** True places this home in the Home page shopfront window (three featured slots). */
  featured: boolean;
  /** References an Agent id in content/agents.ts. */
  agentId: string;
  /** Short architectural headline. */
  headline: string;
  /** Editorial paragraphs shown on the listing detail page. */
  description: readonly string[];
  /** Key property features. */
  features: readonly string[];
  /** Recurring weekly open-for-inspection times in Australia/Melbourne time. */
  inspections: readonly InspectionSlot[];
  /** Artwork variant parameters for <Facade>. */
  art: FacadeArt;
}

export const listings: readonly Listing[] = [
  {
    id: 'carlton-drummond-terrace',
    street: '141 Drummond Street',
    suburb: 'Carlton',
    postcode: '3053',
    propertyType: 'terrace',
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 1,
    landM2: 312,
    internalM2: 248,
    priceGuide: { min: 2_150_000, max: 2_350_000 },
    method: 'auction',
    status: 'for-sale',
    featured: true,
    agentId: 'amara-okafor',
    headline: 'Double-fronted Victorian terrace with north courtyard and bluestone lane access',
    description: [
      'Behind an intact cast-iron lace verandah and keystone-arched entry sits a quietly restored four-bedroom Carlton terrace with 3.6-metre ceilings and original marble fireplaces. Formal front rooms retain Baltic pine boards and deep skirtings before opening into an architect-led brick and steel rear living pavilion.',
      'Full-height steel-framed doors fold back to a sheltered north-facing courtyard paved in Melbourne bluestone, with roller-door off-street parking from the wide rear laneway. Lygon Street dining, Carlton Gardens and University High School zoning are all a short walk from the front gate.',
    ],
    features: [
      'Intact double-storey iron-lace verandah with tiled tessellated entry',
      'North-facing bluestone courtyard with automated rear laneway parking',
      'Hydronic heating throughout plus zoned ducted cooling upstairs',
      'Kitchen with honed limestone benchtops and walk-in butler pantry',
      'Main bedroom opening onto the upper balcony overlooking Drummond Street',
      'Within University High School and Carlton Primary zones',
    ],
    inspections: [
      { day: 'Saturday', start: '10:00', end: '10:30' },
      { day: 'Wednesday', start: '17:30', end: '18:00' },
    ],
    art: {
      facade: 'victorian-terrace',
      roof: 'parapet-urns',
      door: 'keystone-arch',
    },
  },
  {
    id: 'fitzroy-north-park-townhouse',
    street: '7/60 Park Street',
    suburb: 'Fitzroy North',
    postcode: '3068',
    propertyType: 'townhouse',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    landM2: 180,
    internalM2: 192,
    priceGuide: { min: 1_480_000, max: 1_620_000 },
    method: 'private-sale',
    status: 'for-sale',
    featured: true,
    agentId: 'tom-vella',
    headline: 'Cedar-screened townhouse directly along the Park Street linear reserve',
    description: [
      'Designed around a central lightwell and wrapped in vertical spotted-gum battens, this three-bedroom townhouse pairs crisp modern joinery with immediate access to the Capital City Trail. The ground level houses a generous study, double internal garage and private courtyard, leaving the first floor open for kitchen, dining and north-facing terrace living.',
      'Upstairs, all three bedrooms enjoy treetop outlook across the linear park, with double-glazed commercial windows keeping the interiors calm in every season. Edinburgh Gardens, Fitzroy North Village and the Route 96 tram sit five minutes away on foot.',
    ],
    features: [
      'Direct frontage to Park Street linear reserve and bike trail',
      'Vertical spotted-gum timber batten privacy screen and clerestory glazing',
      'Side-by-side double lock-up garage with EV charger circuit',
      'First-floor living opening to a deep covered entertaining terrace',
      'Double-glazed aluminium windows and 6-star solar-assisted hot water',
      'Separate ground-floor study ideal for working from home',
    ],
    inspections: [
      { day: 'Saturday', start: '10:00', end: '10:30' },
      { day: 'Wednesday', start: '17:30', end: '18:00' },
    ],
    art: {
      facade: 'modern-townhouse',
      roof: 'flat-batten',
      door: 'timber-pivot',
    },
  },
  {
    id: 'northcote-bungalow',
    street: '23 Helen Street',
    suburb: 'Northcote',
    postcode: '3070',
    propertyType: 'house',
    bedrooms: 3,
    bathrooms: 1,
    carSpaces: 1,
    landM2: 545,
    internalM2: 158,
    priceGuide: { min: 1_350_000, max: 1_450_000 },
    method: 'auction',
    status: 'for-sale',
    featured: true,
    agentId: 'mei-lin-cho',
    headline: 'Californian bungalow with leadlight bay windows on a deep Merri Creek block',
    description: [
      'Set on a level 545-square-metre allotment with a wide side drive, this brick Californian bungalow carries all the warmth of the 1920s: tapered verandah piers, leadlight bay windows, strapped ceilings and dark timber fretwork down the hall. Three generous bedrooms lead to an updated eat-in kitchen and sunlit sunroom overlooking mature citrus trees.',
      'The deep backyard leaves clear room to extend later (STCA) without sacrificing lawn or garden light, and a solid brick garage already serves as a studio or workshop. High Street cafes, Westgarth cinema and Merri Creek trails are all within easy walking distance.',
    ],
    features: [
      'Original leadlight bay windows, strapped ceilings and timber dado panelling',
      'Level 545 m² block with long side driveway and brick studio garage',
      'Established deep rear garden with lemon, fig and olive trees',
      'Updated timber kitchen with 900mm gas range and dish drawer',
      'Ducted gas heating and split-system air conditioning in living room',
      'Zoned for Northcote High School and Merri Creek Primary',
    ],
    inspections: [
      { day: 'Saturday', start: '11:00', end: '11:30' },
      { day: 'Wednesday', start: '17:30', end: '18:00' },
    ],
    art: {
      facade: 'cal-bungalow',
      roof: 'gable-terracotta',
      door: 'porch-leadlight',
    },
  },
  {
    id: 'parkville-gardens-apartment',
    street: '12/9 The Avenue',
    suburb: 'Parkville',
    postcode: '3052',
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    internalM2: 96,
    priceGuide: { min: 865_000, max: 935_000 },
    method: 'private-sale',
    status: 'under-offer',
    featured: false,
    agentId: 'amara-okafor',
    headline: 'Corner two-bedroom residence overlooking Royal Park elm canopy',
    description: [
      'Occupying the sunlit north-east corner of a well-held boutique block of eighteen, this 96-square-metre apartment frames uninterrupted green views over Royal Park. Wide oak floorboards run from the entry gallery into an open living room flanked by steel-framed windows and a sheltered corner balcony.',
      'Both bedrooms sit quietly at the rear with built-in wardrobes, the main complemented by a terrazzo-tiled ensuite. Tram 19 runs past the end of the avenue to the hospital precinct, University of Melbourne and the CBD in twelve minutes.',
    ],
    features: [
      '96 m² internal floor plan with dual north and east aspect',
      'Direct outlook across Royal Park trees from living room and balcony',
      'Two full bathrooms with terrazzo tiles and brushed brass tapware',
      'Basement car space on title plus full-height storage cage',
      'Boutique low-rise building of 18 residences with lift access',
      'Walk to Melbourne University, Royal Melbourne Hospital and Sydney Road',
    ],
    inspections: [
      { day: 'Saturday', start: '11:00', end: '11:30' },
      { day: 'Thursday', start: '17:30', end: '18:00' },
    ],
    art: {
      facade: 'parkside-apartment',
      roof: 'art-deco-step',
      door: 'glazed-lobby',
    },
  },
  {
    id: 'abbotsford-warehouse-loft',
    street: '3/18 Victoria Crescent',
    suburb: 'Abbotsford',
    postcode: '3067',
    propertyType: 'warehouse',
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 0,
    internalM2: 140,
    priceGuide: { min: 1_100_000, max: 1_200_000 },
    method: 'private-sale',
    status: 'for-sale',
    featured: false,
    agentId: 'mei-lin-cho',
    headline: 'Sawtooth-roof textile mill loft with exposed hardwood trusses and steel glazing',
    description: [
      'Carved from a 1930s Abbotsford knitting mill just above the Yarra River bend, this 140-square-metre warehouse residence celebrates honest industrial volume. North-facing sawtooth clerestory windows wash the limewashed brick walls and original Oregon roof trusses in even studio light from morning until late afternoon.',
      'A suspended steel-and-timber mezzanine houses the second bedroom and study overlooking the double-height living hall and stainless-steel island kitchen. Step outside to the Yarra Trail, Abbotsford Convent and Victoria Park station.',
    ],
    features: [
      '140 m² internal volume under authentic north-facing sawtooth roof',
      'Exposed Oregon timber trusses, limewashed brick and polished concrete',
      'Multi-pane factory steel windows with acoustic secondary glazing',
      'Suspended mezzanine bedroom and reading gallery',
      'Secure resident bike room and direct access to the Yarra River trail',
      'Short walk to Abbotsford Convent, Johnston Street and train',
    ],
    inspections: [
      { day: 'Saturday', start: '12:00', end: '12:30' },
      { day: 'Thursday', start: '17:30', end: '18:00' },
    ],
    art: {
      facade: 'sawtooth-warehouse',
      roof: 'sawtooth',
      door: 'loading-arch',
    },
  },
  {
    id: 'clifton-hill-edwardian',
    street: '88 Fenwick Street',
    suburb: 'Clifton Hill',
    postcode: '3068',
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    landM2: 620,
    internalM2: 295,
    priceGuide: { min: 2_600_000, max: 2_850_000 },
    method: 'auction',
    status: 'for-sale',
    featured: false,
    agentId: 'tom-vella',
    headline: 'Grand tuck-pointed Edwardian family residence on 620 m² beside Darling Gardens',
    description: [
      'One of Fenwick Street’s finest tuck-pointed brick Edwardians, this four-bedroom, three-bathroom family home balances period grandeur with effortless everyday scale. A sweeping return verandah and stained-glass entry open onto wide hallways, ornate plaster ceilings and a formal sitting room warmed by an open fireplace.',
      'At the rear, a considered architectural extension steps down to a landscaped garden, outdoor dining loggia and double garage off the rear lane. Darling Gardens, Clifton Hill Primary and Queens Parade village shops sit at either end of the block.',
    ],
    features: [
      'Substantial 620 m² parcel with tuck-pointed red brick facade and return verandah',
      'Four double bedrooms and three bathrooms including ground-floor guest suite',
      'Expansive open living pavilion with bluestone hearth and garden views',
      'Cellar, butler pantry, mudroom and full laundry with courtyard drying rail',
      'Double remote garage via wide bluestone right-of-way',
      'Steps from Darling Gardens, Clifton Hill station and Queens Parade',
    ],
    inspections: [
      { day: 'Saturday', start: '12:00', end: '12:30' },
      { day: 'Thursday', start: '17:30', end: '18:00' },
    ],
    art: {
      facade: 'edwardian-villa',
      roof: 'hip-finial',
      door: 'return-verandah',
    },
  },
];

export function getListingById(id: string): Listing | undefined {
  return listings.find(item => item.id === id);
}
