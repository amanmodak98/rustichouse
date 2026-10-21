import type { Metadata } from 'next';
import { Eyebrow } from '@/components/surfaces/Card';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/surfaces/Button';
import { StructuredData } from '@/components/seo/StructuredData';
import { ContactForm } from '@/components/forms/Forms';
import { breadcrumbSchema, contactPageSchema, faqSchema } from '@/lib/structured-data';
import { contactFaq } from '@/lib/faq';
import { VENUE, ADDRESS_LINE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach Rustic House by phone, email, or the form below.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <>
      <StructuredData
        data={[
          contactPageSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          faqSchema(contactFaq),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Reach the <em className="text-terracotta">front of house.</em>
          </>
        }
        lede="The fastest way is the phone, after half past ten any morning. For everything else, write to us and we will reply within a working day."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-[var(--spacing-gutter)] lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>The form</Eyebrow>
            <p className="measure-prose mt-4 font-body text-base text-ink-soft">
              Tell us what you need. We promise to write back.
            </p>
            <ContactForm />
          </div>

          <aside className="lg:border-l lg:border-ink/10 lg:pl-10">
            <Eyebrow tone="terracotta">Other channels</Eyebrow>
            <dl className="mt-6 grid gap-6">
              <div>
                <dt className="font-body text-xs tracking-[0.18em] text-ink/45 uppercase">Phone</dt>
                <dd className="mt-2 font-display text-2xl text-ink">
                  <a href={`tel:${VENUE.phoneE164}`} className="hover:text-terracotta">
                    {VENUE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs tracking-[0.18em] text-ink/45 uppercase">Email</dt>
                <dd className="mt-2 font-display text-2xl text-ink">
                  <a href={`mailto:${VENUE.email}`} className="hover:text-terracotta">
                    {VENUE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs tracking-[0.18em] text-ink/45 uppercase">Address</dt>
                <dd className="mt-2 font-display text-xl text-ink">{ADDRESS_LINE}</dd>
              </div>
              <div>
                <dt className="font-body text-xs tracking-[0.18em] text-ink/45 uppercase">Hours</dt>
                <dd className="mt-2 font-body text-base text-ink">
                  Café from 8 am · Dinner from 6 pm · Lounge until midnight
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = 'text',
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-body text-xs tracking-[0.18em] text-ink/55 uppercase">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={5}
          className="border-0 border-b border-ink/25 bg-transparent py-3 font-body text-base text-ink outline-none transition-colors focus:border-terracotta"
        />
      ) : (
        <input
          type={type}
          name={name}
          required
          className="border-0 border-b border-ink/25 bg-transparent py-3 font-body text-base text-ink outline-none transition-colors focus:border-terracotta"
        />
      )}
    </label>
  );
}
