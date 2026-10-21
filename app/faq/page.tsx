import type { Metadata } from 'next';
import { Eyebrow } from '@/components/surfaces/Card';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data';
import {
  homeFaq,
  storyFaq,
  menuFaq,
  barFaq,
  eventsFaq,
  reserveFaq,
  visitFaq,
  contactFaq,
} from '@/lib/faq';
import type { FaqEntry } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Questions',
  description:
    "Everything we get asked about Rustic House — hours, dietary needs, booking, the dog, the cake, the children.",
  alternates: { canonical: '/faq' },
};

const SECTIONS: { eyebrow: string; title: string; description: string; faq: FaqEntry[] }[] = [
  {
    eyebrow: 'The room',
    title: 'About the kitchen',
    description: 'Hours, the menu and what to expect on the evening.',
    faq: [...homeFaq, ...storyFaq],
  },
  {
    eyebrow: 'Eating with us',
    title: 'Menu, dietary needs and the bar',
    description: 'Vegetarian, vegan, allergens, wine, cocktails.',
    faq: [...menuFaq, ...barFaq],
  },
  {
    eyebrow: 'Bookings',
    title: 'Reservations and private events',
    description: 'How to book, cancel, host ten or forty.',
    faq: [...reserveFaq, ...eventsFaq],
  },
  {
    eyebrow: 'Find us',
    title: 'Visit, hours and contact',
    description: 'Address, accessibility, parking, channels.',
    faq: [...visitFaq, ...contactFaq],
  },
];

export default function FAQ() {
  // Build one consolidated FAQPage schema that indexes every Q&A in the file.
  const all = SECTIONS.flatMap((s) => s.faq);
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Questions', path: '/faq' },
          ]),
          faqSchema(all),
        ]}
      />

      <PageHero
        eyebrow="Questions"
        title={
          <>
            Everything we get asked, <em className="text-terracotta">all in one place.</em>
          </>
        }
        lede="If you have a question not answered here, write to the front of house or call the kitchen after half past ten any morning. We promise a real reply."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Questions', path: '/faq' },
        ]}
      />

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          {SECTIONS.map((s, i) => (
            <article key={s.title} className="border-t border-ink/15 py-16 first:border-none">
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.025em] md:text-4xl">
                {s.title}
              </h2>
              <p className="measure-prose mt-4 font-body text-base text-ink-soft">
                {s.description}
              </p>
              <dl className="mt-10 grid gap-8">
                {s.faq.map((entry) => (
                  <div key={entry.question} className="border-b border-ink/10 pb-6">
                    <dt className="font-display text-xl text-ink">{entry.question}</dt>
                    <dd className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                      {entry.answer}
                    </dd>
                  </div>
                ))}
              </dl>
              {i === 0 ? null : <span aria-hidden="true" />}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}