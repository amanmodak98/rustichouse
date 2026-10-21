import type { Metadata } from 'next';
import { Card, Eyebrow } from '@/components/surfaces/Card';
import { CdnImage } from '@/components/ui/CdnImage';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { Button } from '@/components/surfaces/Button';
import { EnquiryForm } from '@/components/forms/Forms';
import { getImage, imageUrl } from '@/lib/images';
import { eventsFaq } from '@/lib/faq';
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data';
import { VENUE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Private Events',
  description:
    'Birthdays, engagement parties, corporate dinners — book the lounge, the brick-arch room or the whole restaurant for the evening.',
  alternates: { canonical: '/private-events' },
};

const EVENTS = [
  {
    name: 'A buyout of the house',
    note: 'All four rooms close for the evening, one menu, one bar, one service team.',
    capacity: VENUE.capacities.indoorSeated + VENUE.capacities.outdoorSeated,
  },
  {
    name: 'The brick-arch room',
    note: 'Twenty-four around a long table, with a menu chosen from the kitchen’s cabinet and a full-bar tab.',
    capacity: VENUE.capacities.privateRoom,
  },
  {
    name: 'The lounge, the music',
    note: 'Forty to sixty in the lounge with the cocktail list on the table and the music turned on after nine.',
    capacity: VENUE.capacities.loungeSeated,
  },
];

export default function PrivateEvents() {
  const hero = getImage('brick-arch-lounge');
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Private Events', path: '/private-events' },
          ]),
          faqSchema(eventsFaq),
        ]}
      />

      <PageHero
        eyebrow="Private events"
        title={
          <>
            The house, the menu, <em className="text-terracotta">your evening.</em>
          </>
        }
        lede="Birthdays, engagements, corporate dinners and small weddings. Three formats: the whole house for the evening, the brick-arch room for twenty-four, or the lounge with the music on."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Private Events', path: '/private-events' },
        ]}
      >
        <Button href="#enquire" size="lg">Send a proposal request</Button>
      </PageHero>

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto grid max-w-[92rem] gap-6 px-[var(--spacing-gutter)] md:grid-cols-3">
          {EVENTS.map((event) => (
            <Card key={event.name} interactive className="bg-cream">
              <div className="px-7 py-8">
                <p className="font-display text-xs tracking-[0.22em] text-terracotta uppercase">
                  Up to {event.capacity} guests
                </p>
                <h2 className="mt-4 font-display text-3xl tracking-[-0.02em] text-ink">
                  {event.name}
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-ink/70">
                  {event.note}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-[var(--spacing-gutter)] lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
              One menu, set together.
            </h2>
            <p className="mt-8 font-body text-lg leading-relaxed text-ink-soft">
              Send us the date, the rough headcount and what you would like the evening to feel like. The kitchen replies within two days with a menu outline and a quote. We work with whatever the head cook is cooking that month, and we tune the menu to your crowd — vegetarian-first, halal, jain, gluten-free or a mixed demand.
            </p>
            <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
              We bring the front-of-house team, the bartenders, the cooks and the linens. You bring the people. We send a single invoice once the evening closes.
            </p>
          </div>
          <Card interactive>
            <CdnImage
              src={imageUrl(hero, 1600)}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </Card>
        </div>
      </section>

      <section
        id="enquire"
        className="relative overflow-hidden bg-ink py-[var(--spacing-section-tight)] text-cream"
      >
        <div className="mx-auto grid max-w-[92rem] gap-12 px-[var(--spacing-gutter)] lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow tone="ember">Enquire</Eyebrow>
            <h2 className="mt-6 font-display text-4xl tracking-[-0.02em] md:text-5xl">
              Send us the date, the headcount and a sentence.
            </h2>
            <p className="measure-prose mt-8 font-body text-lg leading-relaxed text-cream/70">
              We reply within two days with a menu outline and a quote. For urgent requests under a week out, also call the kitchen on {VENUE.phone}.
            </p>
          </div>

          <EnquiryForm />
        </div>
      </section>

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            Before you write.
          </h2>
          <dl className="mt-12 grid gap-8">
            {eventsFaq.map((entry) => (
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