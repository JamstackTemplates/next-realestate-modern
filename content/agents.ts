export type AgentLicence = 'licensed-agent' | 'agents-representative';

export interface Agent {
  /** URL-safe unique identifier referenced by listings and sold results. */
  id: string;
  /** Full name shown on brass plates, listings and structured data. */
  name: string;
  /** Job title at the agency. */
  role: string;
  /** Victorian estate agent licence tier. */
  licence: AgentLicence;
  /** Direct mobile number (ACMA fictitious range). */
  phone: string;
  /** Public direct email address. */
  email: string;
  /** Suburbs covered by this agent (all must come from business.serviceArea or 'All suburbs'). */
  suburbs: readonly string[];
  /** Spoken languages. */
  languages: readonly string[];
  /** Three-sentence biography shown on the Agents page. */
  bio: string;
  /** Two- or three-letter monogram engraved on the brass name plate. */
  initials: string;
  /** Year the agent joined the Carlton office. */
  since: number;
}

export const agents: readonly Agent[] = [
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    role: 'Director & auctioneer',
    licence: 'licensed-agent',
    phone: '0491 570 110',
    email: 'amara@keystonegold.example',
    suburbs: ['Carlton', 'Carlton North', 'Parkville'],
    languages: ['English', 'Igbo'],
    bio: 'Amara founded Keystone & Gold after a decade calling street auctions around Rathdowne Village and Parkville. She leads complex terrace campaigns and advises long-term owners on heritage presentation without unnecessary renovation spend. On Saturdays you will find her on the bluestone kerb calling the auction herself.',
    initials: 'AO',
    since: 2012,
  },
  {
    id: 'tom-vella',
    name: 'Tom Vella',
    role: 'Senior sales agent',
    licence: 'licensed-agent',
    phone: '0491 570 147',
    email: 'tom@keystonegold.example',
    suburbs: ['Fitzroy North', 'Clifton Hill'],
    languages: ['English', 'Maltese'],
    bio: 'Tom grew up two streets off Queens Parade and knows the subtle value shift between every pocket of Clifton Hill and Fitzroy North. He specialises in Edwardian family homes and architect-designed townhouses where floor plan and northern aspect drive buyer competition. Sellers value his plain-spoken weekly reports and steady hand during private negotiations.',
    initials: 'TV',
    since: 2015,
  },
  {
    id: 'mei-lin-cho',
    name: 'Mei-Lin Cho',
    role: 'Sales agent',
    licence: 'agents-representative',
    phone: '0491 570 156',
    email: 'meilin@keystonegold.example',
    suburbs: ['Northcote', 'Abbotsford'],
    languages: ['English', 'Mandarin'],
    bio: 'Mei-Lin brings an architectural background to selling California bungalows along Merri Creek and converted warehouse lofts in Abbotsford. She works closely with photographers and stylists to show how natural light moves through a home across the day. Bilingual in English and Mandarin, she keeps every buyer group well informed from first inspection to settlement.',
    initials: 'MC',
    since: 2019,
  },
  {
    id: 'priya-raman',
    name: 'Priya Raman',
    role: 'Appraisals & client care',
    licence: 'agents-representative',
    phone: '0491 570 158',
    email: 'priya@keystonegold.example',
    suburbs: ['All suburbs'],
    languages: ['English', 'Tamil'],
    bio: 'Priya coordinates our written appraisals, comparable-sales research and campaign preparation across all seven inner-north suburbs. She is often the first voice owners speak with when weighing whether to sell this season or next year. Her detailed pre-sale timelines keep conveyancers, inspectors and trades moving smoothly without last-minute pressure.',
    initials: 'PR',
    since: 2021,
  },
];

export function licenceLabel(licence: AgentLicence): string {
  return licence === 'licensed-agent' ? 'Licensed estate agent' : "Agent's representative";
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find(agent => agent.id === id);
}
