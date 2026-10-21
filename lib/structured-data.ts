/**
 * Structured-data builders for schema.org JSON-LD.
 *
 * Server-safe: never import into a client component.
 * Every builder returns a plain object that JSON.stringify serialises cleanly
 * into a <script type="application/ld+json"> tag.
 *
 * Integrity rules:
 *  - Every name/address/phone/hours/price comes from VENUE (lib/site.ts).
 *  - NO fabricated ratings, review counts, awards, or coordinates. Fields the
 *    owner has not supplied are dropped, never zero-filled.
 *  - null geo is omitted (a 0,0 coordinate would be worse than none).
 */

import { cache } from 'react';
import { VENUE, prune } from './site';

export type FaqEntry = { question: string; answer: string };

/** Escape a value for safe embedding inside a <script> JSON-LD block. */
export function safeJsonLd(data: object | object[]): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export const restaurantSchema = cache(function restaurantSchema() {
  const { hours, geo } = VENUE;
  return prune({
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'FoodEstablishment'],
    '@id': `${VENUE.url}/#restaurant`,
    name: VENUE.name,
    legalName: VENUE.legalName,
    description: VENUE.description,
    url: `${VENUE.url}/`,
    telephone: VENUE.phone,
    email: VENUE.email,
    servesCuisine: [...VENUE.cuisines],
    priceRange: VENUE.priceRange,
    acceptsReservations: VENUE.acceptsReservations,
    foundingDate: VENUE.founded,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: VENUE.streetAddress,
      addressLocality: VENUE.addressLocality,
      addressRegion: VENUE.addressRegion,
      postalCode: VENUE.postalCode,
      addressCountry: VENUE.addressCountry,
    },
    geo: geo
      ? { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude }
      : undefined,
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    hasMenu: `${VENUE.url}/menu`,
    sameAs: [VENUE.socials.instagram, VENUE.socials.facebook],
    // No aggregateRating: there is no review system to back it, and an
    // invented rating is a trust and policy violation.
  });
});

export const organizationSchema = cache(function organizationSchema() {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${VENUE.url}/#organization`,
    name: VENUE.name,
    legalName: VENUE.legalName,
    foundingDate: VENUE.founded,
    url: `${VENUE.url}/`,
    logo: `${VENUE.url}/favicon.svg`,
    email: VENUE.email,
    telephone: VENUE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: VENUE.streetAddress,
      addressLocality: VENUE.addressLocality,
      addressRegion: VENUE.addressRegion,
      postalCode: VENUE.postalCode,
      addressCountry: VENUE.addressCountry,
    },
    sameAs: [VENUE.socials.instagram, VENUE.socials.facebook],
  });
});

export const webSiteSchema = cache(function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${VENUE.url}/#website`,
    url: `${VENUE.url}/`,
    name: VENUE.name,
    inLanguage: 'en',
    publisher: { '@id': `${VENUE.url}/#organization` },
  };
});

/** Generic breadcrumb. `items` are ordered root-first. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${VENUE.url}${item.path}`,
    })),
  };
}

/** FAQPage — the AEO workhorse. Q&A must also be visible on-page. */
export function faqSchema(faq: FaqEntry[]) {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  });
}

export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${VENUE.name}`,
    url: `${VENUE.url}/our-story`,
    mainEntity: { '@id': `${VENUE.url}/#organization` },
  };
}

export function contactPageSchema() {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${VENUE.name}`,
    url: `${VENUE.url}/contact`,
    mainEntity: { '@id': `${VENUE.url}/#organization` },
  });
}

export function imageGallerySchema(images: { url: string; caption: string }[]) {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${VENUE.name} gallery`,
    url: `${VENUE.url}/gallery`,
    image: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: img.url,
      caption: img.caption,
    })),
  });
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  author: string;
  imageUrl?: string;
}) {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${VENUE.url}/journal/${post.slug}`,
    datePublished: post.datePublished,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': `${VENUE.url}/#organization` },
    mainEntityOfPage: `${VENUE.url}/journal/${post.slug}`,
    image: post.imageUrl,
  });
}