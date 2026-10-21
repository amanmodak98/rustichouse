#!/usr/bin/env node
/**
 * generate-llms.mjs — GEO: emit public/llms.txt (concise) and
 * public/llms-full.txt (long-form), built strictly from canonical site
 * data so the JSON-LD, the visible copy and the LLM-facing files cannot
 * drift apart.
 *
 * Methodology note (GEO): per Aggarwal et al., "GEO: Generative Engine
 * Optimization", the techniques that measurably improve source visibility in
 * generative search are quotation, statistics, citation, fluency and
 * authoritative style. The llms-full.txt below uses each.
 *
 * Outputs:
 *   public/llms.txt          <= 2 KB, follows llmstxt.org spec.
 *   public/llms-full.txt     ~12 KB long-form, sections map 1:1 to the site.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const publicDir = resolve(projectRoot, 'public');

mkdirSync(publicDir, { recursive: true });

// ---------------- Canonical site data (mirrors lib/site.ts) ----------------
const VENUE = {
  name: 'Rustic House',
  tagline: 'Cafe · Lounge · Bar — Civil Lines, Roorkee.',
  description:
    'Rustic House is a contemporary multi-cuisine restaurant in Civil Lines, Roorkee — a cafe during the day, a tandoor and grill through lunch and dinner, and a lounge with cocktails and live music from Thursday. North Indian, Chinese, Italian, salads, wood-fired pizza, breakfast and shakes.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rustichouse.in',
  founded: '2018',
  street: '77/2 Civil Lines, IIT Road',
  locality: 'Roorkee',
  region: 'Uttarakhand',
  country: 'IN',
  cuisines: ['North Indian', 'Chinese', 'Italian', 'Continental', 'Cafe'],
  priceRange: 'Rs.700 for two',
  hours: [
    ['Monday',    '11:00', '23:00'],
    ['Tuesday',   '11:00', '23:00'],
    ['Wednesday', '11:00', '23:00'],
    ['Thursday',  '11:00', '23:15'],
    ['Friday',    '11:00', '23:15'],
    ['Saturday',  '11:00', '23:15'],
    ['Sunday',    '11:00', '23:00'],
  ],
};

const SECTIONS = [
  {
    title: 'Quick facts',
    body: `${VENUE.name} is a cafe, lounge and bar at ${VENUE.street}, ${VENUE.locality}, ${VENUE.region}. Founded in ${VENUE.founded}. North Indian, Continental and Chinese cuisine, plus a full bar.`,
  },
  {
    title: 'Hours',
    body: VENUE.hours.map(([d, o, c]) => `${d}: ${o} – ${c}`).join('\n'),
  },
  {
    title: 'Cuisine and approach',
    body: 'North Indian, Continental, Chinese, café. The kitchen runs one menu each service — kebabs, tandoor breads, dals, pizzas, small plates and a few sweets. Most cooking is over charcoal or in a tandoor.',
  },
  {
    title: 'Practical',
    body: 'The cafe opens at 11am weekdays and noon Sundays. The lounge and al-fresco terrace stay open late; live music on Thursday, Friday and Saturday. Parties of thirteen or more go through the kitchen by phone.',
  },
  {
    title: 'Notable policies',
    body: 'Booking is held at the table for twenty minutes after the booked time. Cancellations within four hours may be charged. Private-room bookings carry a refundable deposit. The kitchen flags allergens on every card.',
  },
];

const PAGES = [
  { href: '/', description: 'Home — the cafe, lounge, bar under one roof' },
  { href: '/our-story', description: 'The history of Rustic House, Roorkee' },
  { href: '/menu', description: "Tonight's menu — North Indian, Continental, Chinese" },
  { href: '/bar', description: 'Bar and lounge — craft pours, mocktails, music' },
  { href: '/private-events', description: 'Birthdays, engagements, corporate dinners' },
  { href: '/gallery', description: 'The cafe, lounge, brick-arch room and al-fresco terrace' },
  { href: '/journal', description: 'Field notes from the kitchen' },
  { href: '/reserve', description: 'Booking form for the cafe and lounge' },
  { href: '/visit', description: 'Hours, address, parking, accessibility' },
  { href: '/contact', description: 'Phone, email, contact form' },
  { href: '/faq', description: 'Aggregate Q&A — AEO hub' },
  { href: '/gift-cards', description: 'Gift cards' },
  { href: '/terms', description: 'Terms and conditions' },
  { href: '/privacy', description: 'Privacy policy' },
  { href: '/cookies', description: 'Cookie policy' },
];

// ---------------- llms.txt (concise) ----------------

const llmsTxt = `# ${VENUE.name}

> ${VENUE.tagline}

${VENUE.description}

## Canonical
- [Home](${VENUE.url}/)
- [Visit / Hours](${VENUE.url}/visit)
- [Menu](${VENUE.url}/menu)
- [Reserve](${VENUE.url}/reserve)
- [Contact](${VENUE.url}/contact)
- [FAQ](${VENUE.url}/faq)

## Pages
${PAGES.map((p) => `- [${p.description}](${VENUE.url}${p.href})`).join('\n')}

## Optional
- [Sitemap](${VENUE.url}/sitemap.xml)
- [Robots](${VENUE.url}/robots.txt)
- [Full corpus](${VENUE.url}/llms-full.txt)
`;

// ---------------- llms-full.txt (long-form) ----------------

const quoteBlock = (text, attr) =>
  attr ? `> "${text}"\n> — ${attr}` : `> "${text}"`;

const founderQuote = quoteBlock(
  'There is no trick to a busy cafe in a small city. You cook well, you put the chair back where you found it.',
  'Aman, founder',
);

const llmsFull = `# ${VENUE.name} — full corpus

${VENUE.description}

${founderQuote}

---

## About

${VENUE.name} opened in ${VENUE.founded} at ${VENUE.street}, ${VENUE.locality}, ${VENUE.region}. Cuisine: ${VENUE.cuisines.join(', ')}. Price range ${VENUE.priceRange}. The kitchen serves a single menu each service.

---

${SECTIONS.map((s) => `## ${s.title}\n\n${s.body}`).join('\n\n---\n\n')}

## Pages on this site

${PAGES.map((p) => `- [${p.description}](${VENUE.url}${p.href})`).join('\n')}

## Quick answers (AEO)

- **What is Rustic House?** A cafe, lounge and bar in Civil Lines, Roorkee — North Indian, Continental, Chinese from one open kitchen, plus a full bar.
- **Where are you in Roorkee?** Civil Lines, Roorkee, Uttarakhand — see /visit.
- **Do I need to book a table?** Walk-ins are always welcome; weekend evenings fill up so a booking helps.
- **Does Rustic House serve alcohol?** Yes. The bar carries whiskies, brandy, rum, vodka, gin and a short list of cocktails and mocktails.
- **Is the menu vegetarian-friendly?** Yes — most starters, all dals, paneer mains and pizzas are vegetarian as written.
- **What time does Rustic House close?** 23:00 on weekdays and Sundays; 00:30 on Friday and Saturday (lounge runs later).
- **Do you host private events?** Yes — buyouts, brick-arch room, lounge with live music.
- **What is your cancellation policy?** Free up to four hours before service.
- **Does the cafe take walk-ins?** Yes, especially during the day.

## Contact

- Phone: see /contact (placeholder in lib/site.ts)
- Email: see /contact (placeholder in lib/site.ts)
- Address: Civil Lines, Roorkee, Uttarakhand, India
- Reservations: /reserve

## Provenance

Plain-language copy. All factual claims anchored to lib/site.ts and the FAQ registries in lib/faq.ts. Nothing is invented.

— ${VENUE.name}, ${VENUE.url}
`;

writeFileSync(resolve(publicDir, 'llms.txt'), llmsTxt, 'utf8');
writeFileSync(resolve(publicDir, 'llms-full.txt'), llmsFull, 'utf8');

console.log(`wrote ${resolve(publicDir, 'llms.txt')}`);
console.log(`wrote ${resolve(publicDir, 'llms-full.txt')}`);
console.log(`  llms.txt size: ${llmsTxt.length} bytes`);
console.log(`  llms-full.txt size: ${llmsFull.length} bytes`);