import type { OpeningHours } from '../lib/hours.ts';

export interface OfficeAddress {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  formatted: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page and fallback copy. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public office phone number. */
  phone: string;
  /** Physical office address in Carlton, Melbourne. */
  address: OfficeAddress;
  /** Public landmark used for directions and wayfinding. */
  landmark: string;
  /** Concise directions from public transport and nearby streets. */
  directions: string;
  /** Inner-north suburbs serviced by the agency. */
  serviceArea: readonly string[];
  /** Seven weekday opening-hours records in Australia/Melbourne local time. */
  hours: readonly OpeningHours[];
  /** Statutory Victorian underquoting guidance shown on For sale and listing detail pages. */
  underquotingNote: string;
  /** Statutory disclaimer shown on the Appraisal page. */
  appraisalDisclaimer: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Plain-text lead copy for Contact metadata and page head. */
    introduction: string;
    /** Explicit non-booking and written-offer notice displayed above the form. */
    wordingRule: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Keystone & Gold Realty',
  tagline: 'Inner-north homes, sold with care.',
  introduction:
    "Keystone & Gold Realty sells homes across Carlton and Melbourne's inner north. See homes for sale, recent sold results and our agents, or request a free appraisal.",
  email: 'hello@keystonegold.example',
  phone: '(03) 5550 4820',
  address: {
    street: 'Level 1, 218 Nicholson Street',
    suburb: 'Carlton',
    state: 'VIC',
    postcode: '3053',
    country: 'AU',
    formatted: 'Level 1, 218 Nicholson Street, Carlton VIC 3053',
  },
  landmark: 'Across the road from the Royal Exhibition Building and Carlton Gardens.',
  directions:
    'Step off the Route 96 tram at Stop 12 (Exhibition Building) on Nicholson Street, or park along Gertrude or Elgin Streets. Our brass door plate sits beside the bluestone stair entry.',
  serviceArea: [
    'Carlton',
    'Carlton North',
    'Parkville',
    'Fitzroy North',
    'Clifton Hill',
    'Northcote',
    'Abbotsford',
  ],
  hours: [
    { day: 'Monday', opens: '09:00', closes: '17:30' },
    { day: 'Tuesday', opens: '09:00', closes: '17:30' },
    { day: 'Wednesday', opens: '09:00', closes: '17:30' },
    { day: 'Thursday', opens: '09:00', closes: '17:30' },
    { day: 'Friday', opens: '09:00', closes: '17:30' },
    { day: 'Saturday', opens: '09:00', closes: '16:00' },
    { day: 'Sunday' },
  ],
  underquotingNote:
    "Price guides are a range within 10% and are reviewed throughout each campaign. See each listing's Statement of Information, available from the listing agent.",
  appraisalDisclaimer:
    "An appraisal is an agent's opinion of likely selling price. It is not a formal valuation by a certified practising valuer.",
  enquiries: {
    title: 'Talk to the office',
    introduction:
      'Ask about a home for sale, request an appraisal or arrange a private inspection with our Carlton team.',
    wordingRule:
      "Sending this form doesn't book an appraisal or inspection. An agent will reply to arrange a time. Offers on a property can only be made with the listing agent, in writing.",
    usefulToInclude: [
      'Your phone number if you would like a call back from an agent',
      'For an appraisal: the property address, property type and rough timeframe for selling',
      'For a home currently for sale: its listing ID or street address',
      'Your preferred days and times to be contacted',
    ],
  },
};
