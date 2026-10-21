import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbSchema } from '@/lib/structured-data';
import { VENUE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms that govern the use of this website and bookings at Rustic House.',
  alternates: { canonical: '/terms' },
};

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: '1. Acceptance',
    body: 'By visiting this site or booking with Rustic House you agree to the terms written here. If anything is unclear, write to us before you book and we will answer.',
  },
  {
    heading: '2. Reservations',
    body: `We hold a confirmed reservation for ${VENUE.booking.seatingMinutes} minutes from the booked time. Cancellations made at least ${VENUE.booking.cancellationHours} hours in advance are free. Larger parties may be asked for a refundable deposit, released two weeks before the booking date.`,
  },
  {
    heading: '3. Pricing',
    body: 'Prices on this site are illustrative until the kitchen sends a confirmation. The price on your booking confirmation is the price you pay, including all applicable taxes.',
  },
  {
    heading: '4. Refunds & vouchers',
    body: 'Gift cards and reservations are non-refundable. If we have to cancel your booking we will reschedule at no charge or refund any deposit taken.',
  },
  {
    heading: '5. Conduct in the room',
    body: 'We expect our guests to treat the room, the kitchen and the staff with care. We reserve the right to refuse service with cause; in that case any deposit is refunded in full.',
  },
  {
    heading: '6. Intellectual property',
    body: 'The text and photography on this site are owned by Rustic House unless noted otherwise. You may quote and link to the site. You may not republish either in commercial form without written permission.',
  },
  {
    heading: '7. Liability',
    body: 'We do our best to keep the site accurate and the room safe. We accept liability only to the extent required by law.',
  },
  {
    heading: '8. Governing law',
    body: 'These terms are governed by the laws of the jurisdiction in which Rustic House operates. Disputes are first referred to mediation.',
  },
  {
    heading: '9. Contact',
    body: `Any questions about these terms should be sent to ${VENUE.email} with "Terms" in the subject.`,
  },
];

export default function Terms() {
  const issued = new Date().toISOString().slice(0, 10);
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Terms & Conditions', path: '/terms' },
          ]),
        ]}
      />

      <article className="bg-linen">
        <header className="mx-auto max-w-[42rem] px-[var(--spacing-gutter)] pt-[calc(theme(spacing.12)+theme(spacing.6)+1rem)] md:pt-[calc(theme(spacing.12)+theme(spacing.8)+2rem)] pb-12">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 font-display text-5xl leading-[0.96] tracking-[-0.02em]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-6 font-body text-base text-ink/55">
            Effective {issued}. These terms govern your use of this site and bookings at Rustic House.
          </p>
        </header>

        <section className="mx-auto max-w-[42rem] px-[var(--spacing-gutter)] pb-[var(--spacing-section-tight)]">
          {SECTIONS.map((s) => (
            <section key={s.heading} className="border-t border-ink/15 py-10">
              <h2 className="font-display text-2xl text-ink">{s.heading}</h2>
              <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">{s.body}</p>
            </section>
          ))}
        </section>
      </article>
    </>
  );
}