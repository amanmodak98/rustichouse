import type { Metadata } from 'next';
import { Eyebrow } from '@/components/surfaces/Card';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { Button } from '@/components/surfaces/Button';
import { ReservationForm } from '@/components/forms/ReservationForm';
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data';
import { reserveFaq } from '@/lib/faq';
import { VENUE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Reserve a table',
  description:
    'Book a table at Rustic House. We hold the table for 90 minutes; cancellation is free up to 24 hours before.',
  alternates: { canonical: '/reserve' },
};

export default function Reserve() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Reserve', path: '/reserve' },
          ]),
          faqSchema(reserveFaq),
        ]}
      />

      <PageHero
        eyebrow="Reservations"
        title={
          <>
            Book a table for the <em className="text-terracotta">long table.</em>
          </>
        }
        lede="Tell us the date, the time, how many you are bringing and anything else the kitchen should know. We will reply with a confirmation and a menu link within a few hours."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Reserve', path: '/reserve' },
        ]}
      />

      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto grid max-w-[92rem] gap-16 px-[var(--spacing-gutter)] lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>The form</Eyebrow>
            <p className="measure-prose mt-4 font-body text-base text-ink-soft">
              All fields except the note are required. We will hold the table for {VENUE.booking.seatingMinutes} minutes from your booking time. Larger parties should call the kitchen on {VENUE.phone}.
            </p>
            <div className="mt-10">
              <ReservationForm />
            </div>
          </div>

          <aside className="border-l border-ink/10 pl-8 lg:pt-2">
            <Eyebrow tone="terracotta">Practical points</Eyebrow>
            <ul className="mt-6 grid gap-6 font-body text-base leading-relaxed text-ink/85">
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 block h-px w-6 shrink-0 bg-terracotta" />
                <span>
                  We hold the table for {VENUE.booking.seatingMinutes} minutes from your booking time. Call the kitchen if you are running late.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 block h-px w-6 shrink-0 bg-terracotta" />
                <span>
                  The online form accepts parties of {VENUE.booking.maxPartyOnline} or fewer. {VENUE.booking.largerPartyNote}
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 block h-px w-6 shrink-0 bg-terracotta" />
                <span>
                  Cancel up to {VENUE.booking.cancellationHours} hours ahead, free.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 block h-px w-6 shrink-0 bg-terracotta" />
                <span>
                  Serious allergies: tell us when you sit down. The kitchen uses separate pans and utensils for these plates.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 block h-px w-6 shrink-0 bg-terracotta" />
                <span>
                  Children are welcome at lunch and at the long table on Sunday.
                </span>
              </li>
            </ul>

            <div className="mt-12 border-t border-ink/10 pt-8">
              <p className="font-body text-xs tracking-[0.18em] text-ink/45 uppercase">
                Or call
              </p>
              <p className="mt-2 font-display text-2xl text-ink">{VENUE.phone}</p>
              <p className="mt-1 font-body text-sm text-ink/60">{VENUE.addressLocality}, after 10:30 daily</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>Reservation questions</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            What people ask before they book.
          </h2>
          <dl className="mt-12 grid gap-8">
            {reserveFaq.map((entry) => (
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
