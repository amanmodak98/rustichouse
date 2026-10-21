import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Eyebrow } from '@/components/surfaces/Card';
import { CdnImage } from '@/components/ui/CdnImage';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { Button } from '@/components/surfaces/Button';
import { Marquee } from '@/components/motion/Marquee';
import { getImage, imageUrl } from '@/lib/images';
import { barFaq } from '@/lib/faq';
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data';
import { VENUE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bar & Lounge',
  description:
    'The Rustic House bar and lounge in Civil Lines — craft pours, pint cocktails and mocktails, classic whiskies and a few house creations.',
  alternates: { canonical: '/bar' },
};

const COCKTAILS = [
  { name: 'Smoked Old Fashioned', spec: 'Malt whisky, maple, applewood smoke' },
  { name: 'Masala Margarita', spec: 'Tequila, lime, green chilli, chaat masala rim' },
  { name: 'Aam Panna Spritz', spec: 'Green-mango cordial, soda, chaat masala, mint', mocktail: true },
  { name: 'Espresso Martini', spec: 'Vodka, fresh espresso, coffee liqueur, vanilla' },
  { name: 'Mumbai Mule', spec: 'Vodka, ginger beer, lime, cucumber' },
  { name: 'House Masala Lemonade', spec: 'Black salt, lime, jaggery, mint', mocktail: true },
];

const SPIRITS = [
  { name: 'Whiskies', note: 'A short range of single malts, blends and one bourbon.' },
  { name: 'Pints', note: 'Kingfisher, Carlsberg, Tuborg on tap; bottled selection behind the bar.' },
  { name: 'Cocktails', note: 'Six classics, six house creations, two mocktails. Set list rotates quarterly.' },
  { name: 'Wine by the glass', note: 'One white, one red, one sparkling — Indian and Italian houses.' },
];

export default function Bar() {
  const hero = getImage('bar-wall-jack-daniels');
  const toast = getImage('bar-wall-beer-brands');

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Bar & Lounge', path: '/bar' },
          ]),
          faqSchema(barFaq),
        ]}
      />

      <PageHero
        eyebrow="Bar & Lounge"
        title={
          <>
            Cocktails, mocktails, <em className="text-terracotta">and live music.</em>
          </>
        }
        lede="The lounge seats sixty. The cocktail list is short, the classics are honest, and the mocktails are real fruit. Thursday, Friday and Saturday carry live music after nine."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Bar & Lounge', path: '/bar' },
        ]}
      >
        <Button href="/reserve" size="lg">Reserve a lounge table</Button>
      </PageHero>

      <section className="relative overflow-hidden bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-[var(--spacing-gutter)] lg:grid-cols-[1fr_1.1fr]">
          <Card interactive>
            <CdnImage
              src={imageUrl(hero, 1600)}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Card>
          <div className="flex flex-col justify-center">
            <Eyebrow>The bar</Eyebrow>
            <h2 className="mt-6 font-display text-4xl tracking-[-0.02em] md:text-5xl">
              A short list, set by hand.
            </h2>
            <p className="measure-prose mt-6 font-body text-lg leading-relaxed text-ink-soft">
              The cocktail list changes once a season. The whiskies rotate on a longer clock. We keep the mocktail list honest — no sugar syrups in the name of fruit. Ask your bartender what is on the jigger tonight and what music is on after ten.
            </p>
          </div>
        </div>
      </section>

      <Marquee
        items={['Smoked Old Fashioned · Masala Margarita · Aam Panna Spritz · Espresso Martini', 'Mumbai Mule · House Masala Lemonade · Live music Thu · Live music Fri']}
        speedPxPerSec={26}
      />

      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>The drinks</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            Tonight at the bar.
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {COCKTAILS.map((c) => (
              <li key={c.name} className="border-b border-ink/15 pb-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl text-ink">{c.name}</h3>
                  {c.mocktail ? (
                    <span className="rounded-full border border-olive/40 px-2 py-0.5 font-body text-[10px] tracking-[0.15em] text-olive uppercase">
                      No alcohol
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 font-body text-sm text-ink/65">{c.spec}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-[var(--spacing-section-tight)] text-cream">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-[var(--spacing-gutter)] lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow tone="ember">On the back bar</Eyebrow>
            <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
              The brands we keep.
            </h2>
            <p className="measure-prose mt-8 font-body text-lg leading-relaxed text-cream/70">
              A short back-bar by design. We hold what we love, what we drink ourselves, and what you ask for by name. Below is the shape of the list.
            </p>
            <Card className="mt-10">
              <CdnImage
                src={imageUrl(toast, 1200)}
                alt={toast.alt}
                width={toast.width}
                height={toast.height}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </Card>
          </div>

          <ul className="grid gap-6 self-center">
            {SPIRITS.map((s) => (
              <li key={s.name} className="border-b border-cream/15 pb-5">
                <p className="eyebrow text-ember">{s.name}</p>
                <p className="mt-2 font-display text-2xl text-cream">{s.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>Lounge questions</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            Practical answers.
          </h2>
          <dl className="mt-12 grid gap-8">
            {barFaq.map((entry) => (
              <div key={entry.question} className="border-b border-ink/10 pb-6">
                <dt className="font-display text-xl text-ink">{entry.question}</dt>
                <dd className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                  {entry.answer}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 border-t border-ink/15 pt-6 font-body text-sm text-ink/55">
            Tip your bartender in cash, or add a note on the bill with the QR. Cash tips go directly to the team. <Link href="/contact" className="text-terracotta hover:text-terracotta-deep">Get in touch</Link>.
          </p>
        </div>
      </section>
    </>
  );
}