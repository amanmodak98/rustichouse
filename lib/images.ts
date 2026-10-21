/**
 * Curated image manifest — entirely local, downloaded from the brand's own
 * production photography. Every slug below corresponds to a file in
 * `public/images/`. Swap to new photography by replacing the JPEG and
 * keeping the same filename; alt text lives here so it's crawlable.
 *
 * Roles are the editorial use of each image. They are also useful as the
 * selector you grep for if you want to rebuild a section.
 */

export type ImageProvider = 'local';

export interface ImageRecord {
  /** Stable key used across the site (referenced from pages/sections). */
  slug: string;
  provider: 'local';
  /** Filename under /public/images/. */
  filename: string;
  alt: string;
  credit: string;
  /** Default natural dimensions, used for explicit width / height → zero CLS. */
  width: number;
  height: number;
  /** Editorial role — what this picture does on the page. */
  role:
    | 'hero-storefront'
    | 'hero-night'
    | 'interior-dining'
    | 'interior-bar'
    | 'interior-bar-bottles'
    | 'brick-arch-lounge'
    | 'brick-arch-tv'
    | 'outdoor-brick-wall'
    | 'outdoor-terrace'
    | 'outdoor-green-wall'
    | 'outdoor-bw-tiles'
    | 'outdoor-brick-benches'
    | 'outdoor-painted-wall'
    | 'outdoor-pattern-tile'
    | 'outdoor-plants'
    | 'outdoor-patio'
    | 'interior-chandelier'
    | 'interior-lounge-seating'
    | 'bar-wall-jack-daniels'
    | 'bar-wall-beer-brands'
    | 'wall-art-display'
    | 'storefront-tuscan-caps'
    | 'storefront-third'
    | 'storefront-second'
    | 'storefront-close-signage'
    | 'og-card'
    | 'logo-mark';
}

/** Local photo dimensions — common sizes for the restaurant's own JPGs. */
const D = { w: 1600, h: 900 } as const;
const D2 = { w: 660, h: 503 } as const;

export const IMAGES: Record<string, ImageRecord> = {
  // --- Hero / storefront ----------------------------------------------------
  'hero-storefront': {
    slug: 'hero-storefront',
    provider: 'local',
    filename: '01-hero-storefront.jpg',
    alt: 'The Rustic House storefront on a Roorkee evening, its wooden facade strung with warm fairy lights.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'hero-storefront',
  },
  'hero-night': {
    slug: 'hero-night',
    provider: 'local',
    filename: '03-storefront-night.jpg',
    alt: 'Rustic House at night — a yellow brand-lettered sign glowing over a wide, lit entryway.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'hero-night',
  },
  'storefront-second': {
    slug: 'storefront-second',
    provider: 'local',
    filename: '24-storefront-second.jpg',
    alt: 'A second angle of the Rustic House storefront, the brand sign black on dark at dusk.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'storefront-second',
  },
  'storefront-third': {
    slug: 'storefront-third',
    provider: 'local',
    filename: '12-storefront-third.jpg',
    alt: 'Rustic House from the corner — Tuscan and Kapisha signage lit on the lower facade.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'storefront-third',
  },
  'storefront-tuscan-caps': {
    slug: 'storefront-tuscan-caps',
    provider: 'local',
    filename: '11-storefront-tuscan-caps.jpg',
    alt: 'Two storefront angles showing “Tuscan” and “Kapisha” signs below the Rustic House sign.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'storefront-tuscan-caps',
  },
  'storefront-close-signage': {
    slug: 'storefront-close-signage',
    provider: 'local',
    filename: '25-storefront-close-signage.jpg',
    alt: 'A close-up of the building letter signs at street level, lit warmly.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'storefront-close-signage',
  },

  // --- Interiors ------------------------------------------------------------
  'interior-dining-hall': {
    slug: 'interior-dining-hall',
    provider: 'local',
    filename: '02-interior-dining-hall.jpg',
    alt: 'The dining room at Rustic House — wooden flooring, hanging chandeliers and mixed metal chairs.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'interior-dining',
  },
  'interior-bar': {
    slug: 'interior-bar',
    provider: 'local',
    filename: '04-interior-bar-counter.jpg',
    alt: 'The bar-side dining hall at Rustic House, with a TV screen above the bar and high chairs.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'interior-bar',
  },
  'interior-bar-bottles': {
    slug: 'interior-bar-bottles',
    provider: 'local',
    filename: '06-interior-bar-bottles.jpg',
    alt: 'A long view down the bar counter toward the back wall of bottles at Rustic House.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'interior-bar-bottles',
  },
  'interior-chandelier': {
    slug: 'interior-chandelier',
    provider: 'local',
    filename: '22-interior-chandelier.jpg',
    alt: 'A vintage crystal chandelier hanging in the lounge, lit by warm bulbs.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'interior-chandelier',
  },
  'interior-lounge-seating': {
    slug: 'interior-lounge-seating',
    provider: 'local',
    filename: '23-interior-lounge-seating.jpg',
    alt: 'Wide view of the long lounge seating at Rustic House, with tv screens and bar-end stools.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'interior-lounge-seating',
  },

  // --- Brick arch lounges --------------------------------------------------
  'brick-arch-lounge': {
    slug: 'brick-arch-lounge',
    provider: 'local',
    filename: '05-brick-arch-lounge.jpg',
    alt: 'The brick-arch lounge at Rustic House — yellow walls, a tufted red sofa, and framed art.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'brick-arch-lounge',
  },
  'brick-arch-tv': {
    slug: 'brick-arch-tv',
    provider: 'local',
    filename: '09-brick-arch-tv.jpg',
    alt: 'The brick-arch lounge set up for a long table, with a wall-mounted tv above green tufted seating.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'brick-arch-tv',
  },

  // --- Outdoor terraces ----------------------------------------------------
  'outdoor-brick-wall': {
    slug: 'outdoor-brick-wall',
    provider: 'local',
    filename: '07-outdoor-brick-wall.jpg',
    alt: 'An outdoor terrace at Rustic House with a brick wall backdrop and tropical plants.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-brick-wall',
  },
  'outdoor-terrace': {
    slug: 'outdoor-terrace',
    provider: 'local',
    filename: '08-outdoor-terrace.jpg',
    alt: 'An outdoor terrace at Rustic House — black and white patterned tile floor with plants along the wall.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-terrace',
  },
  'outdoor-green-wall': {
    slug: 'outdoor-green-wall',
    provider: 'local',
    filename: '14-outdoor-green-wall.jpg',
    alt: 'The outdoor terrace with a green painted wall, white furniture and potted palms.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-green-wall',
  },
  'outdoor-bw-tiles': {
    slug: 'outdoor-bw-tiles',
    provider: 'local',
    filename: '16-outdoor-bw-tiles.jpg',
    alt: 'Black and white patterned tiles underfoot on the open-air dining terrace at Rustic House.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-bw-tiles',
  },
  'outdoor-brick-benches': {
    slug: 'outdoor-brick-benches',
    provider: 'local',
    filename: '17-outdoor-brick-benches.jpg',
    alt: 'Outdoor seating with low colored benches against a white brick wall and an open roof.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-brick-benches',
  },
  'outdoor-painted-wall': {
    slug: 'outdoor-painted-wall',
    provider: 'local',
    filename: '18-outdoor-painted-wall.jpg',
    alt: 'An al-fresco table sitting under a painted mural on the outdoor terrace at Rustic House.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-painted-wall',
  },
  'outdoor-pattern-tile': {
    slug: 'outdoor-pattern-tile',
    provider: 'local',
    filename: '19-outdoor-pattern-tile.jpg',
    alt: 'Iron bistro tables set on a patterned tile floor under a stepped terrace at Rustic House.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-pattern-tile',
  },
  'outdoor-plants': {
    slug: 'outdoor-plants',
    provider: 'local',
    filename: '20-outdoor-plants.jpg',
    alt: 'Lush palms and potted plants lining the open-air terrace at Rustic House.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-plants',
  },
  'outdoor-patio': {
    slug: 'outdoor-patio',
    provider: 'local',
    filename: '21-outdoor-patio.jpg',
    alt: 'The road-side patio at Rustic House, shaded with cafe furniture under a canopy.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'outdoor-patio',
  },

  // --- Bar walls + decor ---------------------------------------------------
  'bar-wall-jack-daniels': {
    slug: 'bar-wall-jack-daniels',
    provider: 'local',
    filename: '10-bar-wall-jack-daniels.jpg',
    alt: 'Back wall signage for the Rustic House bar — Jack Daniel’s, Tennessee Honey and No. 7.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'bar-wall-jack-daniels',
  },
  'bar-wall-beer-brands': {
    slug: 'bar-wall-beer-brands',
    provider: 'local',
    filename: '13-bar-wall-beer-brands.jpg',
    alt: 'Back-wall signage for the Rustic House bar — Kingfisher, Carlsberg and Tuborg.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'bar-wall-beer-brands',
  },
  'wall-art-display': {
    slug: 'wall-art-display',
    provider: 'local',
    filename: '15-wall-art-display.jpg',
    alt: 'A wall display of framed photographs and memorabilia inside Rustic House.',
    credit: 'Rustic House',
    width: D.w,
    height: D.h,
    role: 'wall-art-display',
  },

  // --- OG / social card ----------------------------------------------------
  'og-card': {
    slug: 'og-card',
    provider: 'local',
    filename: '01-hero-storefront.jpg',
    alt: 'The Rustic House storefront lit by warm fairy lights on a Roorkee evening.',
    credit: 'Rustic House',
    width: 1200,
    height: 630,
    role: 'og-card',
  },
  'logo-mark': {
    slug: 'logo-mark',
    provider: 'local',
    filename: 'brand/logo-mark.jpg',
    alt: 'Rustic House logo — three hand-drawn wine bottles over the wordmark “Rustic House · Cafe Lounge Bar”.',
    credit: 'Rustic House',
    width: D2.w,
    height: D2.h,
    role: 'logo-mark',
  },
  'logo-wordmark-png': {
    slug: 'logo-wordmark-png',
    provider: 'local',
    filename: 'brand/logo.png',
    alt: 'Rustic House wordmark — three hand-drawn wine bottles above the wordmark “Rustic House” and the subline “Cafe · Lounge · Bar”, on a transparent ground.',
    credit: 'Rustic House',
    width: 700,
    height: 700,
    role: 'logo-mark',
  },
  'tandoor': {
    slug: 'tandoor',
    provider: 'local',
    filename: '06-interior-bar-bottles.jpg',
    alt: 'Looking down the bar counter toward the back wall — the kitchen grill frames the view.',
    credit: 'Rustic House',
    width: 1600,
    height: 900,
    role: 'interior-bar-bottles',
  },
} as const;

/** All images that exist in the manifest, in curation order. */
export const ALL_IMAGES = Object.values(IMAGES);

/** Resolve an image record to a renderable URL at a given width. */
export function imageUrl(
  record: ImageRecord | undefined | null,
  _width = 1920,
  _quality = 72,
): string {
  if (!record) return '';
  return `/images/${record.filename}`;
}

/** Public URL for the brand logo mark. */
export const LOGO_MARK_URL = '/images/brand/logo-mark.jpg';
export const LOGO_WORDMARK_URL = '/images/brand/logo-wordmark.svg';
/** Transparent-background wordmark PNG (preferred in UI). */
export const LOGO_WORDMARK_PNG_URL = '/images/brand/logo.png';

/** Helper for components that just want the URL string for a slug. */
export function imageFor(slug: string, _width = 1920): string | null {
  const rec = IMAGES[slug];
  return rec ? imageUrl(rec, _width) : null;
}

/** Strict-slug lookup with a thrown warning so missing slugs are loud. */
export function getImage(slug: string): ImageRecord {
  const rec = IMAGES[slug as keyof typeof IMAGES];
  if (!rec) throw new Error(`Unknown image slug: ${slug}. Add it to lib/images.ts.`);
  return rec;
}

/** Pick first images matching a given role. */
export function pickByRole(role: ImageRecord['role'], count = 1): ImageRecord[] {
  return ALL_IMAGES.filter((r) => r.role === role).slice(0, count);
}
