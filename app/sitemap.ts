import type { MetadataRoute } from 'next';
import { listings } from '../content/listings';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/listings/', '/sold/', '/agents/', '/appraisal/', '/contact/'];
  const listingPaths = listings.map(item => `/listings/${item.id}/`);
  return [...staticPaths, ...listingPaths].flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
