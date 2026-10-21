# Rustic House

A cinematic, animated marketing site for **Rustic House** — a neighbourhood
trattoria, café and lounge built around a wood-fired kitchen and one long table.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** + **pnpm**
- **Tailwind v4** (`@theme` tokens in `app/globals.css`)
- **GSAP** + **@gsap/react** + **ScrollTrigger** for cinematic scroll motion
- **Lenis** for smooth scroll, bridged to ScrollTrigger in `components/motion/ScrollProvider.tsx`
- **Framer Motion** for micro-interactions
- **Deployed** via `@opennextjs/cloudflare` → **Cloudflare Pages**

Single locale (English). i18n is intentionally omitted; reintroduce a
`[locale]` segment if multilingual is ever needed.

## Pages (18 total)

**Cinematic "Persuade" routes:**
`/`, `/our-story`, `/menu`, `/bar`, `/private-events`, `/gallery`,
`/journal`, `/journal/[slug]`, `/reserve`, `/visit`, `/contact`,
`/faq`, `/gift-cards`.

**Utility / Read routes:**
`/terms`, `/privacy`, `/cookies`, `/reserve/thank-you`,
`app/not-found.tsx` (the 404 page).

## Run it

```bash
pnpm install
cp .env.example .env.local      # then edit the URL to your origin
pnpm dev                        # http://localhost:3000

# Production build, including the GEO generator
pnpm build

# Build for Cloudflare Workers (OpenNext)
pnpm build:opennext && pnpm deploy:dry
```

## SEO, GEO, AEO

| Concern | Where |
| --- | --- |
| Sitemap | `app/sitemap.ts` (lists all 15 routes) |
| Robots | `app/robots.ts` (allow AI crawlers for GEO) |
| JSON-LD | `lib/structured-data.ts` + `<StructuredData>` per route |
| FAQPage | `lib/faq.ts` registries + visible Q&A on each page |
| `llms.txt` | `scripts/generate-llms.mjs` → `public/llms.txt` |
| `llms-full.txt` | `public/llms-full.txt` (long-form corpus for AI search) |
| Social cards | `app/opengraph-image.tsx`, `app/twitter-image.tsx` |
| Web manifest | `app/manifest.ts` |
| 404 | `app/not-found.tsx` (Next.js returns HTTP 404 by default) |

## Placeholder brand data

**All brand facts live in `lib/site.ts`.** Replace them and the entire site —
visible copy, JSON-LD graph, sitemap, robots and llms.txt — updates in one
edit. The full checklist is in [`PLACEHOLDERS.md`](./PLACEHOLDERS.md).

No fabricated values: there is no invented rating, review count or geo
coordinate. Empty fields are dropped from the JSON-LD graph rather than
emitting zeros.

## Imagery

Imagery is hotlinked from Unsplash / Pexels CDNs (`lib/images.ts`). To swap
in real photography, replace each entry's `id` and `alt`. Photography
credits are surfaced on `/gallery` and in the README.

`next.config.ts` sets `images.unoptized: true` so the Next optimizer stays
out of the way of the external CDN.

## Verify

```bash
# All green
pnpm typecheck && pnpm lint && pnpm build

# Real 404
curl -sI http://localhost:3000/no-such-page | head -1   # HTTP/1.1 404
curl -s  http://localhost:3000/no-such-page | grep -i season

# Crawl artefacts
curl -fs http://localhost:3000/sitemap.xml | grep -c "<url>"   # 15
curl -fs http://localhost:3000/llms.txt | wc -c                 # ≥ 1500

# JSON-LD graph health
node scripts/validate-jsonld.mjs http://localhost:3000/menu
```

## Architecture

```
app/                   routes (App Router)
  globals.css          @theme tokens, reduced-motion gates, grain
  opengraph-image.tsx  next/og brand card
  layout.tsx           fonts, LenisProvider, ScrollProvider, chrome
  page.tsx             home
  … per-route pages
components/
  motion/              ScrollProvider (Lenis×GSAP), Marquee, etc
  layout/              Header, Footer, PageHero, Breadcrumbs
  sections/            Hero, SpreadSection, etc
  forms/               ReservationForm, etc
  surfaces/            Card, Button, Eyebrow, Hairline, GrainOverlay, SkipLink
  seo/                 StructuredData (server-only JSON-LD injection)
  ui/                  CdnImage
lib/
  site.ts              VENUE single source of truth (placeholders)
  structured-data.ts   JSON-LD builders (Restaurant, Menu, FAQPage, …)
  faq.ts               AEO FAQ registries (answer-first, ≤25 words)
  images.ts            curated Unsplash / Pexels manifest
  content/journal.ts   3 seed journal posts (typed, no CMS)
  actions/reserve.ts   reservation / contact / enquiry server actions
  llm-facts.ts         (omitted; facts live in scripts/generate-llms.mjs)
  motion-presets.ts    scrubbed image washes, pinned spreads, candle reveal
  reduced-motion.ts    hooks + CSS gate
  lenis-provider.tsx   smooth-scroll engine
scripts/
  generate-llms.mjs    public/llms.txt + public/llms-full.txt
  validate-jsonld.mjs  JSON-LD sanity check (dev tool)
```

## License & assets

Photography is hotlinked from Unsplash/Pexels under their open licences
(Unsplash License, Pexels License). No proprietary photography ships with the
repository — replace with your own before going live.
