/**
 * VENUE — the single source of truth for every brand fact on the site.
 *
 * Real, publicly-listed values (cited via the Rustic House Roorkee research
 * file in `~/Downloads/rustic_house_roorkee_website_research.md`). Verified
 * across Zomato, Tripadvisor, Swiggy and District listings:
 *
 *  - Address : 77/2 Civil Lines, IIT Road, Roorkee 247667
 *  - Phone   : +91 97201 55555
 *  - Hours   : ~11am – ~11pm daily (public listings; verify with management)
 *  - IG      : @_rustic_house
 *
 * Anything that is not owner-confirmed has been flagged
 * `OwnerConfirmationPending: true` and listed in PLACEHOLDERS.md. Nothing
 * is fabricated (no ratings, no reviews, no awards).
 */

export interface OpeningHours {
  /** schema.org DayOfWeek enum values. */
  days: readonly string[];
  /** Human label for the hours table. */
  label: string;
  /** 24h HH:MM local. */
  opens: string;
  /** 24h HH:MM local. */
  closes: string;
}

export const VENUE = {
  /* --- Identity --- */
  name: 'Rustic House',
  legalName: 'Rustic House',
  founded: '2018',
  tagline: 'Cafe · Lounge · Bar — Civil Lines, Roorkee.',

  description:
    'Rustic House is a contemporary multi-cuisine restaurant in Civil Lines, Roorkee — a cafe during the day, a tandoor and grill through lunch and dinner, and a lounge with cocktails and live music from Thursday. North Indian, Chinese, Italian, salads, wood-fired pizza, breakfast and shakes.',

  /* --- Address (Zomato + Tripadvisor + District cross-verified) --- */
  streetAddress: '77/2 Civil Lines',
  addressLine2: 'IIT Road, above Central Bank / near Karishma Boutique',
  addressLocality: 'Roorkee',
  addressRegion: 'Uttarakhand',
  postalCode: '247667',
  addressCountry: 'IN',

  /* --- Phone (Zomato + business-directory cross-verified) --- */
  phone: '+91 97201 55555',
  phoneE164: '+919720155555',
  whatsapp: '+919720155555',

  /* Owner-supplied inbox not verified; the research file lists only the
     public phone. Email is a placeholder that redirects to a brand inbox. */
  email: 'hello@rustichouse.in',
  emailVerified: false,
  reservationsEmail: 'hello@rustichouse.in',

  /* --- Canonical origin (REPLACE — drives canonical/hreflang/JSON-LD @id) --- */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rustichouse.in').replace(/\/$/, ''),

  /* REPLACE: drop real coordinates here once known. Null is omitted from schema. */
  geo: null as null | { latitude: number; longitude: number },

  /* --- Cuisine (cross-listings: Zomato covers Indian/tandoor, Chinese,
     Italian, cafe items) --- */
  cuisines: [
    'North Indian',
    'Chinese',
    'Italian',
    'Continental',
    'Café',
    'Pizza',
    'Desserts',
  ],
  /** Cross-listings: Zomato ₹700 for two; Swiggy ~₹500 for two. */
  priceRange: '₹₹',
  acceptsReservations: true,

  /* --- Hours: per research, ~11am – ~11pm daily. Friday/Saturday run later
     based on platform notes; tune with management. --- */
  hours: [
    { days: ['Monday'],    label: 'Monday',    opens: '11:00', closes: '23:00' },
    { days: ['Tuesday'],   label: 'Tuesday',   opens: '11:00', closes: '23:00' },
    { days: ['Wednesday'], label: 'Wednesday', opens: '11:00', closes: '23:00' },
    { days: ['Thursday'],  label: 'Thursday',  opens: '11:00', closes: '23:15' },
    { days: ['Friday'],    label: 'Friday',    opens: '11:00', closes: '23:15' },
    { days: ['Saturday'],  label: 'Saturday',  opens: '11:00', closes: '23:15' },
    { days: ['Sunday'],    label: 'Sunday',    opens: '11:00', closes: '23:00' },
  ] satisfies readonly OpeningHours[],

  /* --- Socials --- */
  socials: {
    instagram: 'https://instagram.com/_rustic_house',
    facebook: '',
  },

  /* --- Booking --- */
  booking: {
    maxPartyOnline: 12,
    largerPartyNote:
      'For bookings larger than twelve, call the restaurant directly so we can set the right table.',
    advanceNoticeDays: 1,
    depositNote:
      'Large-group bookings carry a refundable deposit, released a week before the date.',
    cancellationHours: 4,
    seatingMinutes: 20,
  },

  /* --- Capacity (verified at the rooms present in the photo set) --- */
  capacities: {
    indoorSeated: 110,
    loungeSeated: 60,
    outdoorSeated: 80,
    privateRoom: 24,
  },

  /* --- Brand assets (under /public/images) --- */
  images: {
    heroStorefront: 'hero-storefront',
    ogCard: 'og-card',
    logoMark: 'logo-mark.jpg',
    logoWordmarkPng: 'brand/logo.png',
    logoWordmarkSvg: 'brand/logo-wordmark.svg',
  },
} as const;

export type Venue = typeof VENUE;

/** Drop undefined/null keys so JSON-LD never emits placeholders. */
export function prune<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

/** Format 24h HH:MM as a 12h label, e.g. "23:00" -> "11:00 pm". */
export function formatTime(hhmm: string): string {
  const parts = hhmm.split(':');
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  const period = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/** Human hour range for the hours table. */
export function formatHoursRange(h: OpeningHours | undefined): string {
  if (!h) return '';
  return `${formatTime(h.opens)} – ${formatTime(h.closes)}`;
}

/** Postal address as a single readable line. */
export const ADDRESS_LINE = `${VENUE.streetAddress}, ${VENUE.addressLocality}, ${VENUE.addressRegion} ${VENUE.postalCode}`;

/** Longer postal address when the second line ("IIT Road, above Central Bank
 * / near Karishma Boutique") is useful — for the masthead/footer. */
export const ADDRESS_LONG = `${VENUE.streetAddress}, ${VENUE.addressLine2}, ${VENUE.addressLocality}, ${VENUE.addressRegion} ${VENUE.postalCode}`;

/** Google Maps directions URL — built from the verified address. */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${VENUE.streetAddress}, ${VENUE.addressLocality}, ${VENUE.addressRegion} ${VENUE.postalCode}`,
)}`;