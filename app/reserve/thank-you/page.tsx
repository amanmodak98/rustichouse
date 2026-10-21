import type { Metadata } from 'next';
import { Eyebrow } from '@/components/surfaces/Card';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/surfaces/Button';

export const metadata: Metadata = {
  title: 'Grazie',
  description: 'Your reservation request is in. The kitchen will be in touch shortly.',
  alternates: { canonical: '/reserve/thank-you' },
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <PageHero
      eyebrow="Grazie"
      title={
        <>
          Your table is <em className="text-terracotta">requested.</em>
        </>
      }
      lede="We have your details and the kitchen is in front of the screen. Expect a confirmation, a note on the menu, and directions to the door within a few hours."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Reserve', path: '/reserve' },
        { name: 'Grazie', path: '/reserve/thank-you' },
      ]}
    >
      <div className="flex flex-wrap gap-3">
        <Button href="/" variant="ghost" size="lg">Back to the front</Button>
        <Button href="/menu" size="lg">See what's cooking</Button>
      </div>

      <div className="mt-16 border-t border-ink/10 pt-12">
        <Eyebrow>What happens next</Eyebrow>
        <ol className="mt-6 grid gap-3 font-body text-base text-ink-soft">
          <li>01. We read the request and check the room.</li>
          <li>02. We send a confirmation with the day's menu and the dress.</li>
          <li>03. We remind you the day before — and again, three hours ahead.</li>
        </ol>
      </div>
    </PageHero>
  );
}
