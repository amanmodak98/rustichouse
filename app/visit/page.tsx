import type { Metadata } from 'next';
import { Eyebrow } from '@/components/surfaces/Card';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { Button } from '@/components/surfaces/Button';
import { breadcrumbSchema, faqSchema, restaurantSchema } from '@/lib/structured-data';
import { visitFaq } from '@/lib/faq';
import { VENUE, formatHoursRange, ADDRESS_LINE, MAPS_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Visit Rustic House',
  description: `Hours, address, parking and access for Rustic House at ${ADDRESS_LINE}.`,
  alternates: { canonical: '/visit' },
};

export default function Visit() {
  return (
    <>
      <StructuredData
        data={[
          restaurantSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Visit', path: '/visit' },
          ]),
          faqSchema(visitFaq),
          {
            '@context': 'https://schema.org',
            '@type': 'Place',
            name: VENUE.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: VENUE.streetAddress,
              addressLocality: VENUE.addressLocality,
              addressRegion: VENUE.addressRegion,
              postalCode: VENUE.postalCode,
              addressCountry: VENUE.addressCountry,
            },
          },
        ]}
      />

      <PageHero
        eyebrow="Visit"
        title={
          <>
            Come and find us <em className="text-terracotta">at the corner.</em>
          </>
        }
        lede="Rustic House sits on a quiet lane in west Bandra. The door is unmarked; the lane is quiet; you will know it by the woodsmoke."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Visit', path: '/visit' },
        ]}
      >
        <Button href={MAPS_URL} size="lg">Open directions</Button>
      </PageHero>

      {/* Hours table */}
      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto grid max-w-[92rem] gap-16 px-[var(--spacing-gutter)] lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Hours</Eyebrow>
            <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
              When the door opens.
            </h2>
            <p className="measure-prose mt-6 font-body text-lg leading-relaxed text-ink-soft">
              The café opens first and keeps a short table all morning. Lunch begins at noon on the long table. Dinner runs from six. The lounge stays open after the kitchen closes.
            </p>
          </div>

          <dl className="divide-y divide-ink/15 border-y border-ink/15">
            {VENUE.hours.map((h) => (
              <div
                key={h.label}
                className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-5"
              >
                <dt className="font-display text-2xl text-ink">{h.label}</dt>
                <dd className="font-body text-base tabular-nums text-ink/80">
                  {formatHoursRange(h)}
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-5">
              <dt className="font-display text-2xl text-ink">Last orders</dt>
              <dd className="font-body text-base tabular-nums text-ink/80">
                Kitchen: {formatHoursRange(VENUE.hours[4])}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Practical */}
      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>Practical</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            Parking, transit and access.
          </h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl text-ink">By car</h3>
              <p className="mt-4 font-body text-base leading-relaxed text-ink/80">
                Paid parking is one street back. The lane itself is closed to traffic from 7 pm.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-ink">By train</h3>
              <p className="mt-4 font-body text-base leading-relaxed text-ink/80">
                Eight minutes from Bandra station. The door is on the south side of the lane.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-ink">Access</h3>
              <p className="mt-4 font-body text-base leading-relaxed text-ink/80">
                Step-free entrance, accessible washroom on the ground floor. Service animals welcome.
              </p>
            </div>
          </div>
          <p className="measure-prose mt-12 border-t border-ink/15 pt-8 font-body text-sm text-ink/55">
            We use SMS to confirm bookings a few hours before. If you would prefer email or a phone call, mention it when you write.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            Practical answers.
          </h2>
          <dl className="mt-12 grid gap-8">
            {visitFaq.map((entry) => (
              <div key={entry.question} className="border-b border-ink/10 pb-6">
                <dt className="font-display text-xl text-ink">{entry.question}</dt>
                <dd className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                  {entry.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}