import Image from 'next/image';
import Link from 'next/link';
import { IMAGES, LOGO_MARK_URL, LOGO_WORDMARK_PNG_URL } from '@/lib/images';

/**
 * Renders the actual brand mark across the site.
 *
 * Variants:
 *   - "mark"         → the 3-bottle icon alone (header collapsed state).
 *   - "wordmark"     → the full logo PNG (transparent ground).
 *   - "wordmark-sm"  → smaller wordmark for the navbar pill.
 *   - "watermark"    → giant faint brandword image for the footer bleed.
 *
 * The logo image is the actual Rustic House wordmark PNG with transparent
 * background (700×700, dark grey ink). On light surfaces the glyphs are
 * readable as-is; on dark surfaces invert via the `invert` prop.
 */

const logoRecord = IMAGES['logo-wordmark-png']!;

export function BrandLogo({
  variant = 'wordmark',
  size = 'sm',
  tone = 'ink',
  invert = false,
  className,
  href,
}: {
  variant?: 'mark' | 'wordmark' | 'wordmark-sm' | 'watermark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'ink' | 'cream';
  /**
   * When true, apply CSS `filter: invert(1)` so the dark-glyph PNG reads
   * cream on a dark surface.
   */
  invert?: boolean;
  className?: string;
  href?: string;
}) {
  const dims =
    variant === 'mark'
      ? { w: size === 'xs' ? 28 : size === 'sm' ? 36 : size === 'md' ? 44 : 56, h: size === 'xs' ? 28 : size === 'sm' ? 36 : size === 'md' ? 44 : 56 }
      : variant === 'watermark'
        ? { w: 1600, h: 1600 }
        : variant === 'wordmark'
          ? size === 'md'
            ? { w: 220, h: 220 }
            : { w: 160, h: 160 }
          : // wordmark-sm
            size === 'xs'
              ? { w: 96, h: 96 }
              : size === 'md'
                ? { w: 132, h: 132 }
                : size === 'sm'
                  ? { w: 112, h: 112 }
                  : { w: 96, h: 96 };

  const style: React.CSSProperties = {
    width: dims.w,
    height: dims.h,
    filter: invert ? 'invert(1) hue-rotate(180deg)' : undefined,
  };

  const inner =
    variant === 'mark' ? (
      <span
        className={`relative inline-block overflow-hidden ${className ?? ''}`}
        style={{ width: dims.w, height: dims.h }}
      >
        <Image
          src={LOGO_MARK_URL}
          alt={IMAGES['logo-mark']!.alt}
          fill
          className="object-contain"
          sizes={`${dims.w}px`}
          priority
        />
      </span>
    ) : (
      <span
        className={`relative inline-block overflow-hidden ${className ?? ''}`}
        style={style}
      >
        <Image
          src={LOGO_WORDMARK_PNG_URL}
          alt={logoRecord.alt}
          fill
          className="object-contain"
          sizes={`${dims.w}px`}
          priority
        />
      </span>
    );

  if (href || variant === 'watermark') {
    if (href) {
      return (
        <Link
          href={href}
          aria-label="Rustic House home"
          className="group inline-flex items-center transition-opacity duration-[280ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:opacity-90"
        >
          {inner}
        </Link>
      );
    }
    return inner;
  }
  return inner;
}