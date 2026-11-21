import type { Metadata } from 'next';
import { agents, licenceLabel } from '../../content/agents';
import { listings } from '../../content/listings';
import { soldResults } from '../../content/sold';
import { BrassPlate } from '../../components/art/brass-plate';
import { Facade } from '../../components/art/facade';
import { MailIcon, PhoneIcon } from '../../components/art/icons';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { absoluteUrl } from '../../lib/paths';
import { agentPortfolio, formatPriceGuide } from '../../lib/real-estate';

export const metadata: Metadata = {
  title: 'Our agents',
  description:
    'Meet the four Carlton real estate agents at Keystone & Gold Realty — Amara Okafor, Tom Vella, Mei-Lin Cho and Priya Raman.',
  alternates: { canonical: absoluteUrl('/agents/') },
};

export default function AgentsPage() {
  return (
    <>
      <PageHead
        eyebrow="The team"
        title={<>Four agents, <em>one office</em></>}
      >
        <p>
          Every seller works directly with the agent who appraises their home, runs the inspections
          and negotiates the sale — backed by one tight-knit team on Nicholson Street.
        </p>
      </PageHead>

      <div className="wrap divide-y divide-line py-8 md:py-14">
        {agents.map((agent, index) => {
          const { activeListings, soldCount } = agentPortfolio(agent.id, listings, soldResults);
          const telHref = `tel:${agent.phone.replace(/[^\d+]/g, '')}`;
          const flip = index % 2 === 1;

          return (
            <section
              key={agent.id}
              id={agent.id}
              aria-labelledby={`agent-${agent.id}`}
              className="grid gap-8 py-12 md:grid-cols-12 md:items-start lg:gap-12"
            >
              {/* Oversized engraved brass name plate */}
              <div className={`md:col-span-5 ${flip ? 'md:order-2' : 'md:order-1'}`}>
                <BrassPlate
                  initials={agent.initials}
                  name={agent.name}
                  role={agent.role}
                  detail={`${licenceLabel(agent.licence)} · Joined ${agent.since}`}
                  size="lg"
                />

                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="border border-line bg-surface p-4 text-center">
                    <dt className="mono-label text-[0.68rem] text-muted">Current listings</dt>
                    <dd className="mt-1 font-display text-4xl text-ink">{activeListings.length}</dd>
                  </div>
                  <div className="border border-line bg-surface p-4 text-center">
                    <dt className="mono-label text-[0.68rem] text-muted">Recent sales</dt>
                    <dd className="mt-1 font-display text-4xl text-gold-text">{soldCount}</dd>
                  </div>
                </dl>
              </div>

              {/* Bio, suburbs, languages, direct contacts & current listings */}
              <div className={`md:col-span-7 ${flip ? 'md:order-1' : 'md:order-2'}`}>
                <p className="eyebrow">{licenceLabel(agent.licence)}</p>
                <h2 id={`agent-${agent.id}`} className="mt-2 font-display text-4xl text-ink sm:text-5xl">
                  {agent.name}
                </h2>
                <p className="mt-1 text-base font-medium text-gold-text">{agent.role}</p>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{agent.bio}</p>

                <dl className="mt-6 grid gap-4 border-y border-line py-5 sm:grid-cols-2">
                  <div>
                    <dt className="mono-label text-gold-text">Suburbs</dt>
                    <dd className="mt-1 text-sm text-ink">{agent.suburbs.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="mono-label text-gold-text">Languages</dt>
                    <dd className="mt-1 text-sm text-ink">{agent.languages.join(', ')}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap items-center gap-6 text-sm">
                  <a href={telHref} className="text-link inline-flex items-center gap-2 font-medium">
                    <PhoneIcon className="h-4 w-4 text-gold-text" />
                    <span>{agent.phone}</span>
                  </a>
                  <a href={`mailto:${agent.email}`} className="text-link inline-flex items-center gap-2 font-medium wrap-anywhere">
                    <MailIcon className="h-4 w-4 text-gold-text" />
                    <span>{agent.email}</span>
                  </a>
                </div>

                {/* Derived active listings as small facade thumbnails */}
                {activeListings.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="mono-label text-muted">
                      Current listings with {agent.name.split(' ')[0]}
                    </h3>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {activeListings.map(item => (
                        <SiteLink
                          key={item.id}
                          href={`/listings/${item.id}/`}
                          className="group flex items-center gap-4 border border-line bg-surface p-3.5 no-underline transition-colors hover:border-gold-leaf hover:no-underline"
                        >
                          <div className="w-16 shrink-0">
                            <Facade
                              art={item.art}
                              title={`${item.street}, ${item.suburb}`}
                              sash={item.status === 'under-offer' ? 'UNDER OFFER' : undefined}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="mono-label text-[0.68rem] text-gold-text">{item.suburb}</p>
                            <p className="font-display text-lg text-ink group-hover:text-gold-text">
                              {item.street}
                            </p>
                            <p className="text-xs text-muted">{formatPriceGuide(item.priceGuide)}</p>
                          </div>
                        </SiteLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-7 border border-line bg-surface p-4 text-sm text-muted">
                    {agent.name.split(' ')[0]} focuses on written appraisals and campaign preparation
                    across every inner-north suburb.{' '}
                    <SiteLink href="/appraisal/" className="text-link">
                      Request an appraisal
                    </SiteLink>
                    .
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
