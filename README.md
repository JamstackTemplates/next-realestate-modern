# Keystone & Gold Realty (`next-realestate-modern`)

A modern boutique residential real estate agency website built with Next.js static export and Tailwind CSS v4. Designed around **"Bluestone, brass and gold leaf"** for a fictitious Carlton, Melbourne sales agency serving inner-north sellers and buyers.

This is a self-contained static website: it does not require a runtime Next.js server, database, or external portal checkout to build or serve.

## Local development

Requires Node 24+ and npm.

```sh
npm ci
npm run dev
```

To run tests, typechecks and a full static export:

```sh
npm run check
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: Nicholson Street hero scene, featured homes in the shopfront window, derived recently sold figures & signboards, four-step selling process, brass team wall, appraisal CTA, Carlton office details and `RealEstateAgent` JSON-LD |
| `/listings/` | For sale ledger with progressive-enhancement brass-rail filters (suburb, property type, minimum bedrooms) synced to URL query params and Victorian price-guide note |
| `/listings/[id]/` | Static listing detail page with keystone-arched facade, specs, inspection timetable, listing agent brass plate, listing ID callout and offer-free residential JSON-LD |
| `/sold/` | Recent sold results grouped by month newest first with derived metrics, signboards, facade thumbnails and price-withheld support |
| `/agents/` | Four-agent directory with engraved brass name plates, licence tier, suburbs, languages, bios and derived active/sold counts |
| `/appraisal/` | Free written appraisal explainer with statutory Victorian disclaimer, four-step timeline, architectural floor-plan factors and recent nearby sales |
| `/contact/` | Hosted Jamstacks support form when configured (or email fallback), always-visible email & phone, Google Map, live Melbourne office hours badge and agents' direct lines |
| `/404.html` | Themed "This one's off the market" static error page |

## Make it yours — file ownership

| File | Owns |
| --- | --- |
| `content/business.ts` | Agency name, tagline, contact details, Carlton address, directions, service area, office hours, statutory disclaimers and Contact wording |
| `content/listings.ts` | Active homes for sale (`id`, address, specs, `priceGuide`, `method`, `status`, `featured`, `agentId`, inspections, `art` facade variants) |
| `content/sold.ts` | Recent sold results (`id`, price or `priceWithheld: true`, `method`, `soldMonth`, `daysOnMarket`, `agentId`) — drives all derived stats automatically |
| `content/agents.ts` | Team roster (`id`, `name`, `role`, `licence`, `phone`, `email`, `suburbs`, `languages`, `bio`, `initials`, `since`) |
| `app/page.tsx`, `app/**/page.tsx` | Page composition and editable page-specific headings, prose and calls to action |
| `site.config.json` | Public name, description, hostname, `timeZone` (`Australia/Melbourne`) and Jamstacks `siteId`/`cdnUrl` (no business content) |
| `app/tailwind.input.css` | Light ("limestone day") and dark ("Nicholson Street at night") palette tokens, artwork variables, bluestone speckle and floor-plan grid |
| `components/art/*` | Bespoke inline SVG illustrations (`HeroScene`, `Facade`, `SoldBoard`, `ShopfrontWindow`, `OfficeElevation`, `BrassPlate`, `AppraisalKeyArch`, `OffMarketDoor`, `KeystoneMark`, dividers & icons) |
| `lib/real-estate.ts` | Formatting, sorting, filtering, derived sold metrics and collection validators |
| `lib/structured-data.ts` | `RealEstateAgent`, `Person`, and offer-free `SingleFamilyResidence`/`Apartment` JSON-LD |
| `app/sitemap.ts` | All static routes plus every `/listings/[id]/` detail route |

### Frequent owner edits

- **Mark a home under offer:** in `content/listings.ts`, set `status: 'under-offer'` on that listing (for example `fitzroy-north-park-townhouse`). Both `/listings/` and `/listings/[id]/` display the diagonal **UNDER OFFER** sash automatically.
- **Change what appears in the Home shopfront window:** toggle `featured: true` or `false` in `content/listings.ts`.
- **Update a price guide or inspection time:** edit `priceGuide` (staying within the 10% Victorian range) or `inspections` in `content/listings.ts` and run `npm test` to verify no range or agent-slot errors.
- **Move a sold home to the Sold ledger:** remove it from `content/listings.ts` and append a record in `content/sold.ts` (use `price: null, priceWithheld: true` if the vendor requested confidentiality). Derived stats on Home and Sold update automatically.

## Typography and licences

All fonts are self-hosted via Fontsource npm packages (no external font CDN requests):

- **Display:** `@fontsource-variable/bodoni-moda` (SIL Open Font License 1.1)
- **Body & UI:** `@fontsource-variable/manrope` (SIL Open Font License 1.1)
- **Labels & specs:** `@fontsource/dm-mono` (SIL Open Font License 1.1)

## Public configuration and Contact contract

`site.config.json` follows the Jamstacks provisioner contract (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Never store private credentials there.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` (`Australia/Melbourne`) |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Only `/contact/` renders `<jamstacks-support-form>` and loads `{cdn}/sites/{siteId}/embed.js` when configured. Without a site ID, Contact shows a visible email fallback with no script request. Internal links use `SiteLink` so Contact always uses full-document navigation in both directions.

## Checks, project-path preview and gallery assets

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

`jamstacks/` holds removable gallery-only manifest and light/dark captures; ordinary builds, tests and GitHub Pages deployments never import it. Validate gallery assets separately with `node --test jamstacks/config.test.mjs`.
