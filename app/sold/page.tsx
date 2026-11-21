import type { Metadata } from 'next';
import { getAgentById } from '../../content/agents';
import { soldResults } from '../../content/sold';
import { Facade } from '../../components/art/facade';
import { SoldBoard } from '../../components/art/sold-board';
import { PageHead } from '../../components/page-head';
import { PropertySpecs } from '../../components/property-specs';
import { absoluteUrl } from '../../lib/paths';
import {
  computeSoldMetrics,
  formatSoldPrice,
  groupSoldByMonth,
  methodLabel,
  propertyTypeLabel,
} from '../../lib/real-estate';

export const metadata: Metadata = {
  title: 'Sold results',
  description:
    "Recent residential sales by Keystone & Gold Realty across Carlton, Carlton North, Parkville, Fitzroy North, Clifton Hill, Northcote and Abbotsford.",
  alternates: { canonical: absoluteUrl('/sold/') },
};

export default function SoldPage() {
  const metrics = computeSoldMetrics(soldResults);
  const groups = groupSoldByMonth(soldResults);

  return (
    <>
      <PageHead
        eyebrow="Sold ledger"
        title={<>Sold <em>results</em></>}
        motif={
          <div className="w-44">
            <SoldBoard
              variant="SOLD"
              headline={soldResults[0].street}
              subline={soldResults[0].suburb}
              footer={formatSoldPrice(soldResults[0])}
              animate={false}
              compact
            />
          </div>
        }
      >
        <p>
          Recent inner-north campaigns completed under the hammer, prior to auction and by private
          sale. All figures below are computed directly from this ledger.
        </p>
      </PageHead>

      {/* Derived metrics ribbon */}
      <section aria-label="Derived sales figures" className="bluestone-band border-b border-band-line py-8">
        <div className="wrap">
          <dl className="grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="mono-label text-band-muted">Homes sold in ledger</dt>
              <dd className="mt-1 font-display text-5xl text-gold-leaf">{metrics.homesSold}</dd>
            </div>
            <div className="sm:border-l sm:border-band-line sm:pl-6">
              <dt className="mono-label text-band-muted">Median days on market</dt>
              <dd className="mt-1 font-display text-5xl text-gold-leaf">
                {metrics.medianDaysOnMarket} <span className="font-mono text-base text-band-muted">days</span>
              </dd>
            </div>
            <div className="sm:border-l sm:border-band-line sm:pl-6">
              <dt className="mono-label text-band-muted">Sold at or before auction</dt>
              <dd className="mt-1 font-display text-5xl text-gold-leaf">{metrics.auctionOrPriorPercent}%</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Monthly timeline rail */}
      <div className="wrap py-14 md:py-20">
        <div className="space-y-16">
          {groups.map(group => (
            <section
              key={group.soldMonth}
              aria-labelledby={`month-${group.soldMonth}`}
              className="relative border-l-2 border-gold-leaf pl-5 sm:pl-8"
            >
              {/* Gold-leaf month/year rail marker */}
              <span
                className="pointer-events-none absolute top-2 -left-[7px] h-3 w-3 rotate-45 border border-ink bg-gold-leaf"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-3">
                <h2
                  id={`month-${group.soldMonth}`}
                  className="font-display text-3xl text-ink sm:text-4xl"
                >
                  {group.monthName} <span className="text-gold-text">{group.year}</span>
                </h2>
                <span className="mono-label text-muted">
                  {group.items.length} {group.items.length === 1 ? 'sale' : 'sales'}
                </span>
              </div>

              <div className="mt-7 grid gap-8 md:grid-cols-3">
                {group.items.map(sale => {
                  const agent = getAgentById(sale.agentId);
                  return (
                    <article
                      key={sale.id}
                      className="flex flex-col border border-line bg-surface p-5"
                    >
                      <SoldBoard
                        variant="SOLD"
                        headline={sale.street}
                        subline={sale.suburb}
                        footer={formatSoldPrice(sale)}
                        compact
                      />

                      <div className="mt-4 flex items-center gap-4 border-t border-line pt-4">
                        <div className="w-16 shrink-0">
                          <Facade art={sale.art} title={`${sale.street}, ${sale.suburb}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="mono-label text-gold-text">{propertyTypeLabel(sale.propertyType)}</p>
                          <h3 className="mt-0.5 font-display text-2xl text-ink">{sale.street}</h3>
                          <p className="font-display text-xl text-ink">{formatSoldPrice(sale)}</p>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-line/70 pt-3">
                        <PropertySpecs
                          bedrooms={sale.bedrooms}
                          bathrooms={sale.bathrooms}
                          carSpaces={sale.carSpaces}
                          compact
                        />
                        <p className="mt-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.72rem] uppercase text-muted">
                          <span>{methodLabel(sale.method)}</span>
                          <span>{sale.daysOnMarket} days on market</span>
                        </p>
                        {sale.note ? (
                          <p className="mt-2 text-xs italic text-gold-text">{sale.note}</p>
                        ) : null}
                        {agent ? (
                          <p className="mt-2 text-xs text-muted">Sold by {agent.name}</p>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-line pt-6 text-sm text-muted">
          Results shown are a selection of recent sales by our agents.
        </p>
      </div>
    </>
  );
}
