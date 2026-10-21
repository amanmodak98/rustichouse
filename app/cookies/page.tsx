import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'The cookies this site uses, what each is for, and how to change your mind.',
  alternates: { canonical: '/cookies' },
};

const COOKIES: { name: string; provider: string; purpose: string; expiry: string }[] = [
  {
    name: '__vercel_live_token',
    provider: 'Vercel',
    purpose: 'Edge caching for page speed. Not a tracking cookie.',
    expiry: 'Session',
  },
  {
    name: 'form_submitted',
    provider: 'This site',
    purpose: 'Remembers that you have already sent a booking or contact form in this browser, so you are not asked twice.',
    expiry: '24 hours',
  },
  {
    name: '_ga / _gid',
    provider: 'Google Analytics',
    purpose: 'Optional. Aggregate, anonymised page-view analytics. Loaded only if analytics is enabled.',
    expiry: '2 years',
  },
];

export default function Cookies() {
  const issued = new Date().toISOString().slice(0, 10);
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Cookie Policy', path: '/cookies' },
          ]),
        ]}
      />
      <article className="bg-linen">
        <header className="mx-auto max-w-[52rem] px-[var(--spacing-gutter)] pt-[calc(theme(spacing.12)+theme(spacing.6)+1rem)] md:pt-[calc(theme(spacing.12)+theme(spacing.8)+2rem)] pb-12">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 font-display text-5xl leading-[0.96] tracking-[-0.02em]">
            Cookie Policy
          </h1>
          <p className="mt-6 font-body text-base text-ink/55">
            Effective {issued}. What this site stores in your browser, and why.
          </p>
        </header>

        <section className="mx-auto max-w-[52rem] px-[var(--spacing-gutter)] pb-[var(--spacing-section-tight)]">
          <p className="font-body text-lg leading-relaxed text-ink-soft">
            We keep the cookie list deliberately short. Nothing here follows you around the internet.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse text-left font-body text-sm">
              <thead>
                <tr className="border-b border-ink/25">
                  <th className="py-4 pr-6 font-display text-lg text-ink">Name</th>
                  <th className="py-4 pr-6 font-display text-lg text-ink">Provider</th>
                  <th className="py-4 pr-6 font-display text-lg text-ink">Purpose</th>
                  <th className="py-4 font-display text-lg text-ink">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((c) => (
                  <tr key={c.name} className="border-b border-ink/15 align-top">
                    <td className="py-5 pr-6 font-mono text-ink">{c.name}</td>
                    <td className="py-5 pr-6 text-ink/70">{c.provider}</td>
                    <td className="py-5 pr-6 text-ink/70">{c.purpose}</td>
                    <td className="py-5 text-ink/70">{c.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="mt-16 border-t border-ink/15 py-10">
            <h2 className="font-display text-2xl text-ink">Changing your mind</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              You can clear or block cookies in your browser settings at any time. Blocking the first cookie may slow the site slightly; blocking the form cookie just means we might ask you twice. Analytics cookies are optional and can be disabled in your browser without affecting the site.
            </p>
          </section>

          <section className="border-t border-ink/15 py-10">
            <h2 className="font-display text-2xl text-ink">AI crawlers</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              This site allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and others) so that Rustic House can appear in AI-assisted search results. These are not cookies — they are governed by robots.txt. If you would prefer the site to be excluded from AI training, see our Privacy Policy.
            </p>
          </section>
        </section>
      </article>
    </>
  );
}