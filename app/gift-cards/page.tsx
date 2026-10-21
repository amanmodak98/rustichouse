import type { Metadata } from 'next';
import { Eyebrow } from '@/components/surfaces/Card';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/surfaces/Button';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Gift Cards',
  description:
    'A rustichouse gift card is a long table seat for someone you want to bring along. Pick a value, write a note, send.',
  alternates: { canonical: '/gift-cards' },
};

const TIERS = [
  { value: '₹2,500', audience: 'Two for lunch', note: 'Covers a long-table lunch and a glass of wine.' },
  { value: '₹5,000', audience: 'A dinner, no ceremony', note: 'Most guests settle into this — three courses and a bottle.' },
  { value: '₹10,000', audience: 'The full evening', note: 'Six courses, the chef’s wine pairings, and tax.' },
];

export default function GiftCards() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Gift Cards', path: '/gift-cards' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Gift cards"
        title={
          <>
            A seat at the <em className="text-terracotta">long table.</em>
          </>
        }
        lede="A rustichouse gift card is a long table seat for someone you want to bring along. Pick a value, write a note, send it by email."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Gift Cards', path: '/gift-cards' },
        ]}
      >
        <Button href="/contact" size="lg">Ask for a card</Button>
      </PageHero>

      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto grid max-w-[92rem] gap-6 px-[var(--spacing-gutter)] md:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.value}
              className="bezel h-full"
            >
              <div className="bezel-core grid h-full grid-rows-[auto_1fr_auto] gap-6 px-8 py-10">
                <p className="eyebrow text-terracotta">{tier.audience}</p>
                <p className="font-display text-5xl tracking-[-0.02em] text-ink">{tier.value}</p>
                <p className="font-body text-base leading-relaxed text-ink/70">{tier.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>How the card works</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            Honest rules, written down.
          </h2>
          <ul className="mt-12 grid gap-8">
            {[
              'The card arrives by email within an hour.',
              'Use it for any service — café, dining, lounge, or any menu item we sell.',
              'No expiry. The card is non-refundable, transferable to anyone.',
              'Two cards may be combined in one evening.',
              'Refusal to honour the card for any reason other than insolvency is rare; we honour every card we have issued.',
            ].map((rule) => (
              <li key={rule} className="flex gap-4 border-b border-ink/15 pb-5 font-body text-lg text-ink-soft">
                <span className="font-display text-3xl text-terracotta">·</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}