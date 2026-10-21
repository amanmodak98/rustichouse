/**
 * CdnImage — renders Unsplash / Pexels placeholder photography.
 *
 * Both providers are hotlinked from their public CDNs (verified HTTP 200).
 * `next.config.ts` sets images.unoptimized so the Next optimizer stays out of
 * the way of external URLs.
 *
 * Every image carries explicit width/height (or aspect) so CLS is zero, and
 * descriptive alt text so it is readable by screen readers and indexers.
 */
export function CdnImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  priority = false,
  className,
  imgClassName,
  focal = '50% 50%',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  focal?: string;
}) {
  return (
    <span
      className={`relative block overflow-hidden bg-linen-soft ${className ?? ''}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ objectPosition: focal }}
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
      />
    </span>
  );
}

/** Unsplash CDN URL builder. */
export function unsplashUrl(id: string, width = 1920, quality = 72): string {
  return `https://images.unsplash.com/${id}?w=${width}&q=${quality}&fm=avif&fit=max&auto=format`;
}

/** Pexels CDN URL builder. Numeric photo id only. */
export function pexelsUrl(id: number, width = 1920, quality = 72): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&quality=${quality}`;
}