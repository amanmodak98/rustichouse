import type { Metadata } from 'next';
import { Card, Eyebrow } from '@/components/surfaces/Card';
import { CdnImage } from '@/components/ui/CdnImage';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { getImage, imageUrl } from '@/lib/images';
import { storyFaq } from '@/lib/faq';
import {
  breadcrumbSchema,
  aboutPageSchema,
  organizationSchema,
  faqSchema,
} from '@/lib/structured-data';
import { VENUE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Story',
  description: `Rustic House opened in ${VENUE.founded} as a small cafe in Civil Lines, Roorkee. Today it is a cafe, lounge and bar under one roof.`,
  alternates: { canonical: '/our-story' },
};

const TIMELINE = [
  {
    year: VENUE.founded,
    title: 'A small cafe opens',
    body: 'Rustic House opened on a quiet street in Civil Lines with twenty seats, a six-item menu and a small wood fire. The kitchen cooked what was fresh that morning and the cafe filled by word of mouth.',
  },
  {
    year: '2019',
    title: 'The tandoor joins the kitchen',
    body: 'A tandoor and a charcoal grill are added so kebabs, naan and grilled fish could be cooked in-house over real fire. The evening shift opens and the menu grows with it.',
  },
  {
    year: '2021',
    title: 'The lounge, the bar, the brick-arch room',
    body: "The next-door unit opens and is rebuilt into the lounge and bar. The brick-arch alcove is opened so the lounge could feel like one room. A larger spirits licence is added and the cocktails start to arrive.",
  },
  {
    year: '2023',
    title: 'The al-fresco terrace',
    body: 'The terrace along the side of the building opens with a hundred tables, an awning and a view of Civil Lines. The kitchen stays open through the evening.',
  },
  {
    year: '2024',
    title: 'Live music on Thursday',
    body: 'A small electric guitar amp finds its way in. The lounge volume rises after nine and Thursday turns into a music night. Friday and Saturday follow.',
  },
];

export default function OurStory() {
  const heroImg = getImage('interior-dining-hall');
  return (
    <>
      <StructuredData
        data={[
          aboutPageSchema(),
          organizationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Story', path: '/our-story' },
          ]),
          faqSchema(storyFaq),
        ]}
      />

      <PageHero
        eyebrow={`Since ${VENUE.founded}`}
        title={
          <>
            A cafe, a lounge, a bar — <em className="text-terracotta">all in Civil Lines.</em>
          </>
        }
        lede={
          <>
            <p>
              Rustic House opened in {VENUE.founded} as a small cafe on a quiet street in Civil Lines, Roorkee. A few hundred plates a week, two cooks, a wood fire. The lounge, the brick-arch room, the al-fresco terrace and the bar came one at a time. Today we cook for the whole of the city, slowly and on purpose.
            </p>
            <p className="mt-6">
              The kitchen is small. Most of what we serve is cooked over a tandoor, a charcoal grill or a wood-fire oven, and most of it is sourced within a day of Civil Lines. The lounge pour follows the kitchen — we set the cocktail list once a season and leave it alone.
            </p>
          </>
        }
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Our Story', path: '/our-story' },
        ]}
      />

      {/* Quote pull */}
      <section className="relative bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)] text-center">
          <Eyebrow tone="terracotta" className="justify-center">From the kitchen</Eyebrow>
          <blockquote className="mt-8 font-display text-3xl italic leading-[1.15] tracking-[-0.015em] text-ink md:text-4xl">
            "There is no trick to a busy cafe in a small city. You cook well, you put the chair back where you found it, you close the kitchen before midnight."
          </blockquote>
          <p className="mt-6 font-body text-sm tracking-[0.15em] text-ink/55 uppercase">
            Aman — Founder
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[92rem] px-[var(--spacing-gutter)]">
          <Eyebrow>The years</Eyebrow>
          <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[0.95] tracking-[-0.025em] md:text-5xl">
            Five chapters, one kitchen.
          </h2>

          <ol className="mt-16 grid gap-12 md:grid-cols-[12rem_1fr]">
            {TIMELINE.map((t, i) => (
              <li key={t.year} className="contents">
                <p className="font-display text-2xl text-terracotta md:text-3xl">{t.year}</p>
                <div className="border-b border-ink/10 pb-12 last:border-none">
                  <h3 className="font-display text-2xl tracking-[-0.02em] text-ink md:text-3xl">
                    {t.title}
                  </h3>
                  <p className="measure-prose mt-4 font-body text-lg leading-relaxed text-ink-soft">
                    {t.body}
                  </p>
                  {i === TIMELINE.length - 1 ? (
                    <div className="mt-8">
                      {/* Sentinel — terminates grid flow */}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <a
              href="/menu"
              className="group/cta inline-flex items-center gap-3 border-b border-terracotta pb-1 font-body text-sm tracking-[0.15em] text-terracotta uppercase transition-all duration-[280ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-terracotta-deep hover:text-terracotta-deep"
            >
              See tonight's menu
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="h-3 w-3 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover/cta:translate-x-1"
              >
                <path
                  d="M2 8h12M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Hearth photo */}
      <section className="relative overflow-hidden bg-ink py-[var(--spacing-section-tight)] text-cream">
        <div className="mx-auto grid max-w-[92rem] gap-8 px-[var(--spacing-gutter)] lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="ember">The room tonight</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] tracking-[-0.02em] md:text-5xl">
              The tandoor is on.
            </h2>
            <p className="measure-prose mt-8 font-body text-lg leading-relaxed text-cream/70">
              The cafe, lounge and bar open together at 11:00. The al-fresco terrace is dressed around 6:30. The lounge serves until midnight on weekdays and a little later on weekends.
            </p>
            <div className="mt-10">
              <a
                href="/reserve"
                className="group/cta inline-flex items-center gap-3 border-b border-cream/30 pb-1 font-body text-sm tracking-[0.15em] text-cream uppercase transition-all duration-[280ms] hover:border-ember hover:text-ember"
              >
                Reserve a table
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="h-3 w-3 transition-transform duration-[280ms] group-hover/cta:translate-x-1"
                >
                  <path
                    d="M2 8h12M9 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          <Card>
            <CdnImage
              src={imageUrl(heroImg, 1920)}
              alt={heroImg.alt}
              width={heroImg.width}
              height={heroImg.height}
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[0.96] tracking-[-0.025em] md:text-5xl">
            The short answers.
          </h2>
          <dl className="mt-12 grid gap-8">
            {storyFaq.map((entry) => (
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