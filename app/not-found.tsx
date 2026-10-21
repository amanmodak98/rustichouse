import Link from 'next/link';
import { Button } from '@/components/surfaces/Button';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { CdnImage } from '@/components/ui/CdnImage';
import { getImage, imageUrl } from '@/lib/images';

/**
 * not-found.tsx — the 404 page.
 *
 * Next.js renders this whenever a route is not matched and serves HTTP 404.
 * The page keeps navigation from a dead-end back to live routes.
 */
export default function NotFound() {
  // Use the night storefront as the backdrop so the page is on-brand even
  // when search engines or visitors land from a stale link.
  const bg = getImage('hero-night');

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-ink text-cream">
      {/* Background image as a soft-tinted backdrop, not a harsh full-cover */}
      <div aria-hidden="true" className="absolute inset-0 opacity-50">
        <CdnImage
          src={imageUrl(bg, 2400)}
          alt=""
          width={2400}
          height={1600}
          sizes="100vw"
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/75 to-ink/95"
      />

      {/* Brand mark + wordmark up top — the Rustic House wordmark is the
          watermark of the brand; on the 404 we make it readable, not faded. */}
      <div className="absolute left-6 top-6 z-10">
        <Link href="/" aria-label="Rustic House home">
          <BrandLogo variant="mark" size="sm" tone="cream" />
        </Link>
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[80rem] flex-col justify-between px-[var(--spacing-gutter)] py-[clamp(9rem,18vw,12rem)]">
        <div>
          <p className="eyebrow flex items-center gap-3 text-ember">
            <span aria-hidden="true" className="rule bg-ember" />
            Page out of season
          </p>
          <p className="mt-6 font-display text-[clamp(8rem,18vw,16rem)] leading-none tracking-[-0.04em] text-cream/85">
            4<em className="italic text-ember">o</em>4
          </p>
          <h1 className="measure-display mt-8 font-display text-4xl leading-[0.96] tracking-[-0.02em] text-cream md:text-5xl">
            We could not find that page.
          </h1>
          <p className="measure-prose mt-6 max-w-xl font-display text-xl italic text-cream/80">
            Perhaps the dish left the menu, or the link pointed past the long table. The kitchen is busy, but the front door is still open.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/" variant="cream" size="lg">Return to the front door</Button>
            <Button
              href="/menu"
              variant="ghost"
              size="lg"
              className="border-cream/30 bg-ink/40 text-cream hover:bg-ink/60"
            >
              See tonight&apos;s menu
            </Button>
            <Link
              href="/journal"
              className="inline-flex items-center self-center font-body text-sm tracking-[0.18em] text-cream/55 uppercase underline-offset-8 hover:text-cream"
            >
              Read the journal
            </Link>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-cream/15 pt-8">
          <Link
            href="/our-story"
            className="font-body text-sm text-cream/55 uppercase tracking-[0.18em] hover:text-cream"
          >
            Our Story
          </Link>
          <Link
            href="/reserve"
            className="font-body text-sm text-cream/55 uppercase tracking-[0.18em] hover:text-cream"
          >
            Reserve
          </Link>
          <Link
            href="/visit"
            className="font-body text-sm text-cream/55 uppercase tracking-[0.18em] hover:text-cream"
          >
            Visit
          </Link>
          <Link
            href="/contact"
            className="font-body text-sm text-cream/55 uppercase tracking-[0.18em] hover:text-cream"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}