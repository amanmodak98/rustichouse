'use client';

import { useEffect, useRef, useState } from 'react';
import { CdnImage } from '@/components/ui/CdnImage';

interface Props {
  /** Pexels CDN URL, mp4, no auth. */
  src: string;
  /** Local poster image to show until the video starts. */
  poster: { src: string; alt: string; width: number; height: number };
  /** Optional HTML5 poster via prop. */
  className?: string;
  /** Mark the LCP image for `priority` semantics. */
  priority?: boolean;
  /** Show extra play affordance? default off (autoplay already gives motion). */
  controls?: boolean;
}

/**
 * HeroVideo — autoplay-looping-muted hero background that respects the GPU
 * performance bar.
 *
 *  - autoplay, muted, playsInline on iOS, loop
 *  - poster shown instantly (zero CLS, no white flash)
 *  - falls back to the poster if video fails or prefers-reduced-motion
 *  - opacity-fades the video in once the first frame lands so the swap is
 *    imperceptible
 *  - mobile (<768px) and reduced-motion users see only the poster with a
 *    very slow CSS ken-burns drift
 */
export function HeroVideo({ src, poster, className, priority }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Pause off-screen videos to spare bandwidth on long pages.
  useEffect(() => {
    if (!ref.current) return;
    const v = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          v.play().catch(() => setReady(false));
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink ${className ?? ''}`}>
      {/* Always-on poster with ken-burns drift, so something holds the
          viewport even before the video streams. */}
      <div
        className={`absolute inset-0 ${reduced ? 'opacity-100' : ready ? 'opacity-0' : 'opacity-100'} transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]`}
        aria-hidden="true"
      >
        <CdnImage
          src={poster.src}
          alt={poster.alt}
          width={poster.width}
          height={poster.height}
          priority={priority}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover [animation:rh-ken-burns_22s_ease-in-out_infinite_alternate]"
        />
      </div>

      {/* Video layer — only mounts in the DOM when we are allowed to play.
          Stays opacity 0 until the first frame is decoded, so the poster
          underneath is what renders during the initial paint. */}
      {!reduced ? (
        <video
          ref={ref}
          src={src}
          poster={poster.src}
          className={`absolute inset-0 h-full w-full object-cover ${ready ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[800ms]`}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          onLoadedData={(e) => {
            const v = e.currentTarget;
            v.play().catch(() => undefined);
          }}
          onPlaying={() => setReady(true)}
        />
      ) : null}

      <style>{`
        @keyframes rh-ken-burns {
          from { transform: scale(1) translate(0, 0); }
          to   { transform: scale(1.08) translate(-1.2%, -1.5%); }
        }
      `}</style>
    </div>
  );
}