import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { SpreadSection } from '@/components/sections/SpreadSection';
import { Marquee } from '@/components/motion/Marquee';
import { Button } from '@/components/surfaces/Button';
import { CdnImage } from '@/components/ui/CdnImage';
import { Card, Eyebrow } from '@/components/surfaces/Card';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  restaurantSchema,
  organizationSchema,
  webSiteSchema,
  faqSchema,
  breadcrumbSchema,
} from '@/lib/structured-data';
import { homeFaq } from '@/lib/faq';
import { VENUE, formatTime } from '@/lib/site';
import { getImage, imageUrl, IMAGES } from '@/lib/images';
import { POSTS, recentPosts } from '@/lib/content/journal';

import './home.css';

export const metadata: Metadata = {
  title: `${VENUE.name} — ${VENUE.tagline}`,
  description: VENUE.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${VENUE.name} — ${VENUE.tagline}`,
    description: VENUE.description,
    url: '/',
    images: [{ url: imageUrl(IMAGES['og-card']!, 1200, 80), width: 1200, height: 630 }],
  },
};

const SIGNATURE_DISHES = [
  'Butter Chicken',
  'Dal Makhani',
  'Paneer Tikka Pizza',
  'Margherita Pizza',
  'Bhatti Ka Murgh',
  'Hakka Noodles',
  'Pad Thai',
  'Peri Peri Fries',
  'Loaded Nachos',
  'Cold Brew · House Tonic',
];

export default function Home() {
  const heroImg = getImage('hero-night');
  const tonightHours = VENUE.hours[4] ?? VENUE.hours[0]!;
  const faqLd = faqSchema(homeFaq);
  const crumbs = breadcrumbSchema([{ name: 'Home', path: '/' }]);

  // Project hero video is shipped under /videos/rh-hero.mp4. The
  // HeroVideo component auto-falls back to the still backplate if the
  // file can't be reached, so this is safe to keep hard-coded.
  const HERO_VIDEO_URL = '/videos/rh-hero.mp4';

  // The pin of the night storefront, with the yellow "Rustic House" sign
  // visible, makes the most cinematic hero.
  const backplate = HERO_VIDEO_URL ? (
    <HeroVideo
      src={HERO_VIDEO_URL}
      poster={{
        src: imageUrl(heroImg, 2400),
        alt: heroImg.alt,
        width: heroImg.width,
        height: heroImg.height,
      }}
      priority
    />
  ) : (
    <CdnImage
      src={imageUrl(heroImg, 2400)}
      alt={heroImg.alt}
      width={heroImg.width}
      height={heroImg.height}
      priority
      sizes="100vw"
      imgClassName="h-full w-full object-cover"
    />
  );

  return (
    <>
      {/* JSON-LD graph on the home page. */}
      <StructuredData
        data={[
          webSiteSchema(),
          organizationSchema(),
          restaurantSchema(),
          crumbs,
          faqLd,
          {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            contentUrl: imageUrl(heroImg, 1920),
            description: heroImg.alt,
          },
        ]}
      />

      <Hero
        eyebrow={`Est. ${VENUE.founded} · ${VENUE.addressLocality}`}
        title={'A cafe, a lounge\nand a bar — Roorkee.'}
        lede={VENUE.description}
        meta={`Open today · ${formatTime(tonightHours.opens)} – ${formatTime(tonightHours.closes)}`}
        backplate={backplate}
        ctas={
          <>
            <Button href="/reserve" variant="cream" size="lg">
              Reserve a table
            </Button>
            <Button
              href="/menu"
              variant="ghost"
              size="lg"
              className="border-cream/30 bg-ink/40 text-cream hover:bg-ink/60"
            >
              See the menu
            </Button>
            <Link
              href={`tel:${VENUE.phoneE164}`}
              className="inline-flex items-center gap-3 rounded-full border border-cream/20 bg-ink/40 px-6 py-3 font-body text-sm tracking-[0.18em] text-cream/80 uppercase backdrop-blur-md transition-colors hover:border-cream/40 hover:text-cream"
            >
              <span aria-hidden="true">📞</span>
              Call · {VENUE.phone}
            </Link>
          </>
        }
      />

      <Marquee items={SIGNATURE_DISHES} speedPxPerSec={28} className="mt-2" />

      <SpreadSection
        eyebrow="Three rooms"
        title={
          <>
            Cafe, lounge, bar — <em className="text-terracotta">all in Civil Lines.</em>
          </>
        }
        body="Begin at the cafe on a slow morning, drift to the lounge for drinks, end the evening in the brick-arch room — Rustic House is built so you can do all three without leaving the building."
        ctaHref="/our-story"
        ctaLabel="Read our story"
        imageSlug="interior-dining-hall"
      />

      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[92rem] px-[var(--spacing-gutter)]">
          <div className="mb-12 grid items-end gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>The kitchen</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-[0.98] tracking-[-0.025em] md:text-5xl">
                North Indian, Chinese, Italian — under one roof.
              </h2>
            </div>
            <p className="measure-prose font-body text-lg leading-relaxed text-ink-soft">
              Tandoor kebabs at lunch, pasta and pizza in the evening, cold brews in between. The kitchen prints a single menu each morning and serves it across all three rooms.
            </p>
          </div>

          <div className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-6 lg:grid-cols-12 lg:gap-5">
            <Card className="sm:col-span-3 lg:col-span-5" interactive>
              <div className="relative aspect-[5/4] overflow-hidden">
                <CdnImage
                  src={imageUrl(getImage('hero-night'), 1200)}
                  alt={getImage('hero-night').alt}
                  width={1200}
                  height={960}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
                />
              </div>
              <div className="px-7 py-6">
                <p className="font-display text-2xl text-ink">The Cafe</p>
                <p className="mt-1 font-body text-sm text-ink/60">All morning · coffee, breakfast, snacks</p>
              </div>
            </Card>

            <Card className="sm:col-span-3 lg:col-span-4" interactive>
              <div className="relative aspect-[4/3] overflow-hidden">
                <CdnImage
                  src={imageUrl(getImage('brick-arch-lounge'), 1200)}
                  alt={getImage('brick-arch-lounge').alt}
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="px-7 py-6">
                <p className="font-display text-2xl text-ink">The Lounge</p>
                <p className="mt-1 font-body text-sm text-ink/60">Evenings · craft pours, mocktails, music</p>
              </div>
            </Card>

            <Card className="sm:col-span-3 lg:col-span-3" interactive>
              <div className="relative aspect-square overflow-hidden">
                <CdnImage
                  src={imageUrl(getImage('outdoor-bw-tiles'), 900)}
                  alt={getImage('outdoor-bw-tiles').alt}
                  width={900}
                  height={900}
                  sizes="(min-width: 1024px) 25vw, 100vw"
                />
              </div>
              <div className="px-6 py-6">
                <p className="font-display text-xl text-ink">The Terrace</p>
                <p className="mt-1 font-body text-sm text-ink/60">Al-fresco · eighty seats under the sky</p>
              </div>
            </Card>

            <Card className="sm:col-span-3 lg:col-span-7" interactive>
              <CdnImage
                src={imageUrl(getImage('bar-wall-beer-brands'), 1600)}
                alt={getImage('bar-wall-beer-brands').alt}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
              <div className="px-7 py-6">
                <p className="font-display text-2xl text-ink">The Bar</p>
                <p className="mt-1 font-body text-sm text-ink/60">Whiskies, pints, pint cocktails, classics</p>
              </div>
            </Card>

            <Card className="sm:col-span-3 lg:col-span-5" interactive>
              <div className="px-7 py-7">
                <Eyebrow tone="terracotta">Tonight at Rustic House</Eyebrow>
                <p className="mt-5 font-display text-2xl italic text-ink">
                  "A single open kitchen feeding three rooms. Bring friends, stay late."
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button href="/reserve" size="md">Reserve</Button>
                  <Button href="/menu" variant="ghost" size="md">See the menu</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <SpreadSection
        eyebrow="The al-fresco"
        title={
          <>Eighty seats under <em className="text-terracotta">the Roorkee sky.</em></>
        }
        body="The terrace runs along the side of the building on IIT Road, shaded by a wooden awning. White linens at seven, an open kitchen at the back, the lounge pour through to keep the night moving."
        ctaHref="/gallery"
        ctaLabel="See the room"
        imageSlug="outdoor-terrace"
        reverse
      />

      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="mx-auto grid max-w-[92rem] gap-16 px-[var(--spacing-gutter)] py-[var(--spacing-section-tight)] lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow tone="ember">Tonight</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[0.96] tracking-[-0.02em] md:text-5xl">
              The kitchen is open at eleven.
            </h2>
            <p className="measure-prose mt-8 font-body text-lg leading-relaxed text-cream/70">
              We hold the table for twenty minutes from your booking time. If you are running late, a quick call to the front desk keeps the table kind.
            </p>
            <div className="mt-10">
              <Button href="/visit" variant="cream" size="lg">Hours and directions</Button>
            </div>
          </div>

          <div>
            <dl className="grid gap-2 divide-y divide-cream/10">
              {VENUE.hours.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center justify-between gap-6 py-3 font-body text-base"
                >
                  <dt className="text-cream/50">{h.label}</dt>
                  <dd className="tabular-nums text-cream/85">{`${formatTime(h.opens)} – ${formatTime(h.closes)}`}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 border-t border-cream/15 pt-6">
              <p className="font-body text-sm tracking-[0.15em] text-cream/50 uppercase">The address</p>
              <p className="mt-3 font-display text-xl text-cream">
                77/2 Civil Lines, IIT Road
              </p>
              <p className="font-body text-base text-cream/70">
                above Central Bank / near Karishma Boutique
              </p>
              <p className="mt-1 font-body text-base text-cream/70">
                Roorkee, Uttarakhand 247667
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[92rem] px-[var(--spacing-gutter)]">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <Eyebrow>From the kitchen</Eyebrow>
              <h2 className="mt-6 font-display text-4xl leading-[0.98] tracking-[-0.025em] md:text-5xl">
                Field notes from the tandoor.
              </h2>
            </div>
            <Link
              href="/journal"
              className="hidden font-body text-sm text-terracotta underline-offset-8 hover:text-terracotta-deep md:inline-flex"
            >
              Read all →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[POSTS[0]!, ...recentPosts(3).filter((p) => p.slug !== POSTS[0]!.slug).slice(0, 2)].map((post) => {
              const img = getImage(post.imageSlug as keyof typeof IMAGES);
              return (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group/post block"
                >
                  <Card interactive>
                    <CdnImage
                      src={imageUrl(img, 1200)}
                      alt={img.alt}
                      width={1200}
                      height={900}
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <div className="px-7 py-6">
                      <p className="eyebrow text-olive">{post.category}</p>
                      <h3 className="mt-3 font-display text-2xl leading-[1.05] tracking-[-0.02em] transition-colors duration-[280ms] group-hover/post:text-terracotta">
                        {post.title}
                      </h3>
                      <p className="mt-2 font-body text-sm text-ink/60">
                        {post.author} · {post.readingMinutes} min read
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}