import type { Metadata } from 'next';
import { agents } from '../content/agents';
import { business } from '../content/business';
import { listings } from '../content/listings';
import { soldResults } from '../content/sold';
import {
  AppraisalBand,
  HomeHero,
  HowWeSell,
  RecentlySoldBand,
  TeamWall,
  VisitOffice,
  WindowShowcase,
} from '../components/home-sections';
import { absoluteUrl } from '../lib/paths';
import { computeSoldMetrics, featuredListings, sortSoldResults } from '../lib/real-estate';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const inTheWindow = featuredListings(listings);
  const recentFive = sortSoldResults(soldResults).slice(0, 5);
  const metrics = computeSoldMetrics(soldResults);

  return (
    <>
      <HomeHero>
        <HomeHero.Eyebrow>Carlton · Melbourne&apos;s inner north</HomeHero.Eyebrow>
        <HomeHero.Heading>
          Inner-north homes, <em>sold with care.</em>
        </HomeHero.Heading>
        <HomeHero.Lead>
          A Carlton agency of four, selling terraces, townhouses and apartments from the Exhibition
          Gardens to Merri Creek.
        </HomeHero.Lead>
        <HomeHero.Actions
          primaryLabel="Request an appraisal"
          secondaryLabel="See homes for sale"
        />
      </HomeHero>

      <WindowShowcase
        eyebrow="In the window"
        heading={<>Currently <em>for sale</em></>}
        linkLabel="View all homes for sale"
        items={inTheWindow}
      />

      <RecentlySoldBand
        eyebrow="Recently sold"
        heading={<>Real results across <em>seven suburbs</em></>}
        note="Every figure below is computed directly from our published recent sales ledger — never estimates or self-awarded rankings."
        linkLabel="See all sold results"
        metrics={metrics}
        recent={recentFive}
      />

      <HowWeSell
        eyebrow="How we sell"
        heading={<>Four calm steps from <em>walk-through to hammer</em></>}
      >
        <HowWeSell.Step number="01" title="Appraise">
          We walk through your home, measure natural light and floor plan, and compare recent sales
          on nearby streets. Within a week you receive a plain written range and honest notes on
          what buyers pay for in your pocket.
        </HowWeSell.Step>
        <HowWeSell.Step number="02" title="Prepare">
          Before a single sign goes up, we map out practical presentation — gardening, lighting,
          minor repairs and accurate floor plans. We never suggest expensive renovations that will
          not return their cost on auction day.
        </HowWeSell.Step>
        <HowWeSell.Step number="03" title="Campaign">
          Your home launches in our Nicholson Street window, online portals and directly to
          registered inner-north buyers. After every Saturday and midweek inspection you receive
          direct buyer feedback from the agent who ran the door.
        </HowWeSell.Step>
        <HowWeSell.Step number="04" title="Negotiate">
          Whether we sell under the hammer on the bluestone kerb or by private negotiation, one
          senior agent handles every offer in writing. You stay informed at every turn with clear
          options and zero pressure.
        </HowWeSell.Step>
      </HowWeSell>

      <TeamWall
        eyebrow="The team"
        heading={<>Four agents, <em>one Carlton office</em></>}
        linkLabel="Meet the four agents"
        team={agents}
      />

      <AppraisalBand>
        <AppraisalBand.Eyebrow>Free written appraisal</AppraisalBand.Eyebrow>
        <AppraisalBand.Heading>
          Thinking of selling? <em>Start with a straight answer.</em>
        </AppraisalBand.Heading>
        <AppraisalBand.Body>
          Invite Amara, Tom, Mei-Lin or Priya for a quiet 45-minute walk-through. You receive a
          written appraisal backed by comparable inner-north sales, with no obligation to list.
        </AppraisalBand.Body>
        <AppraisalBand.Action>Request an appraisal</AppraisalBand.Action>
      </AppraisalBand>

      <VisitOffice
        eyebrow="Visit the office"
        heading={<>Find us on <em>Nicholson Street</em></>}
        agency={business}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
