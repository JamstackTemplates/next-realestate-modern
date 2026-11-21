import type { Metadata } from 'next';
import { business } from '../../content/business';
import { listings } from '../../content/listings';
import { Facade } from '../../components/art/facade';
import { ListingsLedger } from '../../components/listings-ledger';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Homes for sale',
  description:
    'Browse terraces, houses, townhouses, apartments and warehouse lofts for sale across Carlton, Fitzroy North, Clifton Hill, Northcote, Parkville and Abbotsford.',
  alternates: { canonical: absoluteUrl('/listings/') },
};

export default function ListingsPage() {
  return (
    <>
      <PageHead
        eyebrow="For sale"
        title={<>Homes <em>for sale</em></>}
        motif={
          <div className="w-24">
            <Facade art={listings[0].art} title="Carlton terrace motif" />
          </div>
        }
      >
        <p>
          Current auctions and private sales across Carlton and Melbourne&apos;s inner north,
          ordered with our window selections first and then by price guide.
        </p>
      </PageHead>

      <section className="wrap py-12 md:py-16">
        <ListingsLedger items={listings} suburbs={business.serviceArea} />

        <aside
          aria-label="Statement of Information and price guide note"
          className="mt-10 border-l-2 border-gold-leaf bg-surface p-5 text-sm text-muted"
        >
          <p className="mono-label text-gold-text">Victorian price guide note</p>
          <p className="mt-2 max-w-3xl leading-relaxed">{business.underquotingNote}</p>
        </aside>
      </section>
    </>
  );
}
