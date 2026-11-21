import type { Metadata } from 'next';
import { business } from '../../content/business';
import { soldResults } from '../../content/sold';
import {
  AppraisalActionBand,
  AppraisalFactors,
  AppraisalHero,
  AppraisalTimeline,
} from '../../components/appraisal-sections';
import { SoldBoard } from '../../components/art/sold-board';
import { SiteLink } from '../../components/site-link';
import { absoluteUrl } from '../../lib/paths';
import { formatSoldPrice, propertyTypeLabel, sortSoldResults } from '../../lib/real-estate';

export const metadata: Metadata = {
  title: 'Request an appraisal',
  description:
    "Find out what your inner-north Melbourne home is worth with a free written appraisal from Keystone & Gold Realty in Carlton.",
  alternates: { canonical: absoluteUrl('/appraisal/') },
};

export default function AppraisalPage() {
  const recentThree = sortSoldResults(soldResults).slice(0, 3);

  return (
    <>
      <AppraisalHero
        eyebrow="Free property appraisal"
        title={<>What&apos;s your home <em>worth right now?</em></>}
        disclaimer={business.appraisalDisclaimer}
      >
        <p>
          A Keystone &amp; Gold appraisal is a written estimate of likely selling price built from an
          unhurried walk-through of your home and comparable recent sales on nearby streets.
        </p>
        <p>
          Whether you are thinking about selling this season or simply planning two years ahead, we
          give you a straight range and clear reasoning — with nothing obliging you to list.
        </p>
      </AppraisalHero>

      <AppraisalTimeline
        eyebrow="How an appraisal works"
        heading={<>Four steps, <em>no obligation</em></>}
        note="Nothing obliges you to list"
      >
        <AppraisalTimeline.Step number="01" title="Enquire" timing="Day 1">
          Send your address, property type and preferred days via our Contact page or call the
          Carlton office directly.
        </AppraisalTimeline.Step>
        <AppraisalTimeline.Step number="02" title="Walk-through" timing="Around 45 min">
          One of our agents walks through your home with you, taking note of light, layout, recent
          work and any heritage details.
        </AppraisalTimeline.Step>
        <AppraisalTimeline.Step number="03" title="Written appraisal" timing="Within a week">
          You receive a written price range paired with comparable inner-north sales and concise
          commentary on buyer demand.
        </AppraisalTimeline.Step>
        <AppraisalTimeline.Step number="04" title="Selling plan" timing="Only if you want one">
          If you decide to move forward — now or months later — we outline campaign timing, method
          and practical preparation.
        </AppraisalTimeline.Step>
      </AppraisalTimeline>

      <AppraisalFactors
        eyebrow="What we look at"
        heading={<>Five details that move <em>inner-north prices</em></>}
      >
        <AppraisalFactors.Factor code="01 · SITE" title="Land & aspect">
          Frontage width, rear laneway access, heritage overlays and whether living areas capture
          northern sun across the day.
        </AppraisalFactors.Factor>
        <AppraisalFactors.Factor code="02 · ARCHITECTURE" title="Floor plan & light">
          How rooms flow from entry to kitchen and courtyard, ceiling heights, acoustic glazing and
          natural cross-ventilation.
        </AppraisalFactors.Factor>
        <AppraisalFactors.Factor code="03 · FABRIC" title="Condition & renovation">
          Structural soundness, roofing, services and whether past renovations suit how inner-north
          buyers live today.
        </AppraisalFactors.Factor>
        <AppraisalFactors.Factor code="04 · EVIDENCE" title="Recent comparable sales">
          Verified sales from the last six months on matching streets, adjusted for block size,
          car parking and streetscape.
        </AppraisalFactors.Factor>
        <AppraisalFactors.Factor code="05 · MOMENTUM" title="Current buyer demand" wide>
          Active buyers we met at last weekend&apos;s open homes and how strongly similar properties
          are drawing bids right now.
        </AppraisalFactors.Factor>
      </AppraisalFactors>

      {/* Recent sales nearby */}
      <section className="wrap pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Recent sales nearby</p>
            <h2 className="mt-2 font-display text-3xl text-ink sm:text-5xl">
              Three recent <em>inner-north results</em>
            </h2>
          </div>
          <SiteLink href="/sold/" className="text-link font-mono text-xs tracking-widest uppercase">
            View all sold results →
          </SiteLink>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {recentThree.map(sale => (
            <article key={sale.id} className="border border-line bg-surface p-5">
              <SoldBoard
                variant="SOLD"
                headline={sale.street}
                subline={sale.suburb}
                footer={formatSoldPrice(sale)}
                compact
              />
              <p className="mt-3 flex items-center justify-between font-mono text-xs uppercase text-muted">
                <span>{propertyTypeLabel(sale.propertyType)}</span>
                <span>{sale.daysOnMarket} days on market</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <AppraisalActionBand
        eyebrow="Start the conversation"
        heading={<>Ready for a <em>written appraisal?</em></>}
        intro="Send us a brief note through Contact and Priya or your local suburb specialist will reply to arrange a walk-through time that suits you."
        checklistTitle="Helpful to include in your message"
        items={[
          'Property street address and suburb',
          'Property type (terrace, house, townhouse, apartment or warehouse)',
          'Rough timeframe — exploring, this season, or next year',
          'Your phone number and preferred days or times for a call',
        ]}
        buttonLabel="Request an appraisal"
      />
    </>
  );
}
