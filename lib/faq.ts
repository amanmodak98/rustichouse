/**
 * Per-page FAQ arrays for FAQPage JSON-LD + visible on-page Q&A (AEO).
 *
 * AEO discipline applied here:
 *  - Questions are phrased the way a real person types or says them
 *    ("What time do you close?" not "Opening Hours").
 *  - Answers are answer-first: the first sentence IS the answer.
 *  - Answers stay under ~30 words so they read cleanly as a snippet.
 *  - Every factual claim is anchored to VENUE (lib/site.ts) so the JSON-LD,
 *    the visible copy and llms.txt can never drift apart.
 */

import type { FaqEntry } from './structured-data';
import { VENUE } from './site';

export const homeFaq: FaqEntry[] = [
  {
    question: 'What is Rustic House?',
    answer:
      "Rustic House is Roorkee's neighbourhood cafe, lounge and bar — North Indian, Continental and Chinese from one open kitchen, with a full bar and an open-air terrace.",
  },
  {
    question: 'Where are you in Roorkee?',
    answer: `We are at 77/2 Civil Lines (IIT Road), Roorkee, Uttarakhand 247667 — above Central Bank, near Karishma Boutique.`,
  },
  {
    question: 'Do I need to book a table?',
    answer:
      'Walk-ins are always welcome, especially in the cafe. The lounge and the brick-arch room fill up on weekend evenings, so a quick booking helps.',
  },
  {
    question: 'Are you open late?',
    answer:
      'Yes. The bar and lounge run past midnight on Friday and Saturday. Cafe hours run earlier; the kitchen closes a little after.',
  },
];

export const storyFaq: FaqEntry[] = [
  {
    question: 'When did Rustic House open?',
    answer: `We opened in ${VENUE.founded} as a small cafe. The lounge, the bar and the al-fresco terrace were added over time. The space has grown with the city.`,
  },
  {
    question: 'Are you family-friendly?',
    answer:
      'Yes during the day and for lunch. After nine the bar takes the lounge volume up; if you would like a quiet table, mention it and we will set you in the brick-arch room.',
  },
];

export const menuFaq: FaqEntry[] = [
  {
    question: 'What kind of food do you serve?',
    answer:
      'North Indian, Continental and Chinese — wood-fired kebabs, tandoor breads, wood-fired pizzas, small plates, and a short list of house cocktails and mocktails.',
  },
  {
    question: 'Is the menu vegetarian-friendly?',
    answer:
      'Yes — a large section is vegetarian as written, including most starters, all our dals, paneer mains and pizzas. We mark the vegan options on the printed menu.',
  },
  {
    question: 'Do you serve alcohol?',
    answer:
      'Yes. We hold a valid liquor licence, pour classic cocktails and a short list of pint cocktails, and stock the brands you can see behind the bar.',
  },
];

export const barFaq: FaqEntry[] = [
  {
    question: 'Does Rustic House have a bar?',
    answer: `Yes — the lounge seats ${VENUE.capacities.loungeSeated} and the indoor bar carries draught and bottled beer, whiskies, brandy, rum, vodka and gin.`,
  },
  {
    question: 'Do you have happy hours?',
    answer:
      'Yes — running from opening until 7pm on weekdays. After that we move to live music nights on Thursday, Friday and Saturday.',
  },
];

export const eventsFaq: FaqEntry[] = [
  {
    question: 'Can I book the whole restaurant for a private event?',
    answer: `Yes — the indoor hall seats ${VENUE.capacities.indoorSeated}, the al-fresco terrace seats ${VENUE.capacities.outdoorSeated}, and the private room seats ${VENUE.capacities.privateRoom}. We will work with you on a fixed menu.`,
  },
  {
    question: 'Do you host birthday or engagement parties?',
    answer:
      'We do. Send us the date, headcount and the rough theme and we will send a proposal and a short list of set-menu options.',
  },
];

export const reserveFaq: FaqEntry[] = [
  {
    question: 'How far in advance should I book?',
    answer: `On weekday lunch, the day-of is fine. For weekends or party sizes over six, booking at least ${VENUE.booking.advanceNoticeDays} day ahead is safer.`,
  },
  {
    question: 'What is your cancellation policy?',
    answer: `Please release your table at least ${VENUE.booking.cancellationHours} hours ahead so we can re-seat it.`,
  },
  {
    question: 'How long is a table held?',
    answer: `We hold your table for ${VENUE.booking.seatingMinutes} minutes from your booking time. A quick call to the bar keeps the table kind if you are late.`,
  },
];

export const visitFaq: FaqEntry[] = [
  {
    question: 'What are your opening hours?',
    answer:
      'Cafe opens at 11am on weekdays and noon on Sundays; the kitchen and bar stay open through the evening on Fridays and Saturdays.',
  },
  {
    question: 'How do I get there?',
    answer: `We are on ${VENUE.streetAddress} in ${VENUE.addressLocality}, ${VENUE.addressRegion}. Ask any auto-rickshaw — most drivers know the cafe, lounge and bar by name.`,
  },
  {
    question: 'Is the restaurant step-free?',
    answer:
      'Yes — the cafe, the lounge and the al-fresco terrace are step-free. The bar and the brick-arch rooms are accessible from the ground floor.',
  },
];

export const contactFaq: FaqEntry[] = [
  {
    question: 'How do I reach Rustic House?',
    answer:
      'Call +91 97201 55555 between 11am and 11pm. The fastest route for a booking is the form.',
  },
  {
    question: 'Can I hire the restaurant for a photoshoot?',
    answer:
      'Yes, outside service hours. Send the date, shot list and your licence to our email and we will confirm.',
  },
];
