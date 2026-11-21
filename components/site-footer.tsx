import { business } from '../content/business';
import { IronLaceFrieze } from './art/dividers';
import { MailIcon, MapPinIcon, PhoneIcon } from './art/icons';
import { KeystoneMark } from './art/keystone-mark';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="bluestone-band mt-20">
      {/* Cast-iron lace verandah frieze along top edge */}
      <IronLaceFrieze tone="band" className="block h-5 w-full" />

      <div className="wrap py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Agency plaque */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <KeystoneMark className="h-11 w-11 shrink-0" />
              <div>
                <p className="font-display text-2xl text-band-ink">{business.name}</p>
                <p className="mono-label mt-0.5 text-gold-leaf">Carlton · Melbourne&apos;s inner north</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-band-muted">
              Selling terraces, townhouses, bungalows and apartments across {business.serviceArea.join(', ')}.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-band-ink">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-leaf" />
                <span>{business.address.formatted}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-leaf" />
                <a href={telHref} className="hover:text-gold-leaf">{business.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-gold-leaf" />
                <a href={`mailto:${business.email}`} className="wrap-anywhere hover:text-gold-leaf">{business.email}</a>
              </li>
            </ul>
          </div>

          {/* Office hours summary */}
          <div className="md:col-span-3">
            <h2 className="mono-label text-gold-leaf">Office hours</h2>
            <dl className="mt-4 space-y-2 text-sm text-band-muted">
              <div className="flex justify-between gap-3 border-b border-band-line pb-2">
                <dt className="text-band-ink">Mon – Fri</dt>
                <dd className="font-mono text-xs">09:00 – 17:30</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-band-line pb-2">
                <dt className="text-band-ink">Saturday</dt>
                <dd className="font-mono text-xs">09:00 – 16:00</dd>
              </div>
              <div className="flex justify-between gap-3 pb-1">
                <dt className="text-band-ink">Sunday</dt>
                <dd className="font-mono text-xs">Closed</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-band-muted">{business.landmark}</p>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-6 md:col-span-4">
            <nav aria-label="Footer primary">
              <h2 className="mono-label text-gold-leaf">Browse</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-band-ink">
                <li><SiteLink href="/" className="hover:text-gold-leaf">Home</SiteLink></li>
                <li><SiteLink href="/listings/" className="hover:text-gold-leaf">For sale</SiteLink></li>
                <li><SiteLink href="/sold/" className="hover:text-gold-leaf">Sold results</SiteLink></li>
                <li><SiteLink href="/agents/" className="hover:text-gold-leaf">Our agents</SiteLink></li>
              </ul>
            </nav>
            <nav aria-label="Footer seller actions">
              <h2 className="mono-label text-gold-leaf">Selling</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-band-ink">
                <li><SiteLink href="/appraisal/" className="hover:text-gold-leaf">Request an appraisal</SiteLink></li>
                <li><SiteLink href="/contact/" className="hover:text-gold-leaf">Talk to the office</SiteLink></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-band-line pt-6 text-xs text-band-muted">
          <p>
            {business.name} · Fictitious sample agency for the Jamstacks gallery.
          </p>
          <span>
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="text-band-ink no-underline hover:text-gold-leaf hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
