import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbSchema } from '@/lib/structured-data';
import { VENUE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Rustic House handles personal data collected through this website.',
  alternates: { canonical: '/privacy' },
};

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: '1. Data we collect',
    body: 'When you fill out a form on this site, we collect your name, email, phone number, and the message you write. When you book a table, we additionally collect the date, time, and party size.',
  },
  {
    heading: '2. Why',
    body: 'We use this data only to reply to your enquiry, hold your booking, and tell you if a booking changes. We do not sell, rent or share your data with third parties beyond the booking and email systems required to provide the service.',
  },
  {
    heading: '3. Retention',
    body: 'Booking data is retained for the period required to provide the service and for routine bookkeeping — typically three years. You can ask us to delete earlier by writing to the email below.',
  },
  {
    heading: '4. Your rights',
    body: 'You can ask us what we hold about you, ask us to correct it, or ask us to delete it. We will respond within fifteen working days. Where the data is processed by an external provider (booking, payment, email), the same rights are available from them directly.',
  },
  {
    heading: '5. Cookies on this site',
    body: 'See our Cookie Policy for the full list of cookies in use, including the optional analytics and the AI crawlers permitted by robots.txt.',
  },
  {
    heading: '6. Third parties',
    body: 'We use a small set of third-party providers to keep this site running: a managed database, an email-sending service, and AI crawler access for generative search. Each is bound by its own data-protection agreement.',
  },
  {
    heading: '7. Children',
    body: 'This site is not aimed at children under 13 and we do not knowingly collect data from them.',
  },
  {
    heading: '8. Contact',
    body: `Write to ${VENUE.email} with "Privacy" in the subject line. We will reply within fifteen working days.`,
  },
];

export default function Privacy() {
  const issued = new Date().toISOString().slice(0, 10);
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/privacy' },
          ]),
        ]}
      />
      <article className="bg-linen">
        <header className="mx-auto max-w-[42rem] px-[var(--spacing-gutter)] pt-[calc(theme(spacing.12)+theme(spacing.6)+1rem)] md:pt-[calc(theme(spacing.12)+theme(spacing.8)+2rem)] pb-12">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 font-display text-5xl leading-[0.96] tracking-[-0.02em]">
            Privacy Policy
          </h1>
          <p className="mt-6 font-body text-base text-ink/55">
            Effective {issued}. What we collect, why, and how to ask for it back.
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