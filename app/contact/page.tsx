import type { Metadata } from 'next';
import { agents } from '../../content/agents';
import { business } from '../../content/business';
import { MailIcon, MapPinIcon, PhoneIcon } from '../../components/art/icons';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { HoursTable } from '../../components/hours-table';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <>
      <PageHead eyebrow="Contact" title={business.enquiries.title}>
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap grid gap-10 py-12 lg:grid-cols-12 lg:py-16">
        {/* Left column: Framed enquiry panel with explicit wording rule */}
        <section aria-label="Enquiry form" className="space-y-6 lg:col-span-7">
          <div className="border-2 border-ink bg-surface p-6 sm:p-8">
            <p className="eyebrow">Send an enquiry</p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Appraisals, inspections &amp; general questions
            </h2>
            <p className="mt-3 border-l-2 border-gold-leaf bg-raised/70 px-4 py-3 text-sm leading-relaxed text-ink">
              {business.enquiries.wordingRule}
            </p>

            <div className="mt-6">
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div className="border border-line bg-bg p-6">
                  <h3 className="font-display text-2xl text-ink">Write to us directly</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    The online enquiry form is not connected on this site. Please email{' '}
                    <a href={`mailto:${business.email}`} className="text-link font-medium">
                      {business.email}
                    </a>{' '}
                    or call the Carlton office on{' '}
                    <a href={telHref} className="text-link font-medium">
                      {business.phone}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* What to include in the message */}
          <div className="border border-line bg-surface p-6">
            <h2 className="mono-label text-gold-text">What to include in your message</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold-leaf" aria-hidden="true" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right column: Office card with email, phone, map, hours, OpenBadge & agents' direct lines */}
        <aside aria-label="Office and agent contact details" className="space-y-8 lg:col-span-5">
          {/* Office card */}
          <div className="border border-line bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-ink">Carlton office</h2>
              <OpenBadge hours={business.hours} />
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-text" />
                <div>
                  <a className="text-link font-medium wrap-anywhere" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <CopyEmail email={business.email} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-text" />
                <a className="text-link font-medium" href={telHref}>
                  {business.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-text" />
                <div>
                  <p className="font-medium text-ink">{business.address.formatted}</p>
                  <p className="mt-1 text-xs text-muted">{business.landmark}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <HoursTable hours={business.hours} />
              <TimeZoneNote />
            </div>

            <div className="mt-5 border border-line">
              <GoogleMap
                address={business.address.formatted}
                title="Map showing Keystone & Gold Realty at 218 Nicholson Street, Carlton, opposite the Royal Exhibition Building"
              />
            </div>
          </div>

          {/* Agents' direct phones — short brass-plate list */}
          <div className="bluestone-band border border-band-line p-6">
            <h2 className="mono-label text-gold-leaf">Agents&apos; direct lines</h2>
            <ul className="mt-4 space-y-3">
              {agents.map(agent => (
                <li key={agent.id} className="brass-plate px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-lg leading-tight font-medium">{agent.name}</p>
                      <p className="font-mono text-[0.68rem] uppercase opacity-80">{agent.role}</p>
                    </div>
                    <a
                      href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}
                      className="shrink-0 font-mono text-xs font-medium underline underline-offset-4"
                    >
                      {agent.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
