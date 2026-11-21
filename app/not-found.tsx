import { OffMarketDoor } from '../components/art/off-market-door';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="wrap py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-12">
        <div className="mx-auto w-full max-w-md md:col-span-6">
          <OffMarketDoor />
        </div>
        <div className="md:col-span-6">
          <p className="eyebrow">404 · Off market</p>
          <h1 className="mt-3 font-display text-[clamp(2.6rem,5.5vw,4.4rem)] leading-[1.03] text-ink">
            This one&apos;s <em>off the market</em>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            The listing or page you followed may have sold, moved or never existed. Browse current
            inner-north homes for sale, check recent sold results or return to Nicholson Street.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SiteLink href="/listings/" className="button">
              Homes for sale
            </SiteLink>
            <SiteLink href="/sold/" className="button button-quiet">
              Sold results
            </SiteLink>
            <SiteLink href="/" className="button button-quiet">
              Back to home
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
