import Link from 'next/link';
import { Card, Eyebrow } from '@/components/surfaces/Card';
import { CdnImage } from '@/components/ui/CdnImage';
import { getImage, imageUrl, IMAGES } from '@/lib/images';

/**
 * SpreadSection — a wide reading spread that pairs an oversized title with
 * a hand-tinted still. The text column reads in a comfortable measure and
 * the photograph gets to overshoot the column into the next panel.
 */
export function SpreadSection({
  eyebrow,
  title,
  body,
  ctaHref,
  ctaLabel,
  imageSlug,
  reverse = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  ctaHref: string;
  ctaLabel: string;
  imageSlug: keyof typeof IMAGES;
  reverse?: boolean;
}) {
  const img = getImage(imageSlug as keyof typeof IMAGES);
  return (
    <section className="relative overflow-hidden bg-linen">
      <div
        className={`mx-auto grid max-w-[92rem] gap-12 px-[var(--spacing-gutter)] py-[var(--spacing-section)] md:gap-20 lg:grid-cols-[1.05fr_1fr] ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div className={reverse ? 'lg:order-1' : 'lg:order-1'}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[0.98] tracking-[-0.025em] md:text-5xl">
            {title}
          </h2>
          <p className="measure-prose mt-8 font-body text-lg leading-relaxed text-ink-soft">
            {body}
          </p>
          <Link
            href={ctaHref}
            className="group/cta mt-10 inline-flex items-center gap-3 border-b border-terracotta pb-1 font-body text-sm tracking-[0.15em] text-terracotta uppercase transition-all duration-[280ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-terracotta-deep hover:text-terracotta-deep"
          >
            {ctaLabel}
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
          </Link>
        </div>

        <Card className={reverse ? 'lg:order-2' : 'lg:order-2'} interactive>
          <CdnImage
            src={imageUrl(img, 1920)}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
          />
        </Card>
      </div>
    </section>
  );
}