'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

/**
 * Marquee — a horizontally drifting, infinitely looping row of editorial items.
 *
 * Respects `prefers-reduced-motion` by holding the track still when the user
 * disables animation. The track is duplicated in the DOM so the seam is never
 * visible as a reset point.
 */
export function Marquee({
  items,
  speedPxPerSec = 32,
  className,
  separator = '·',
}: {
  items: string[];
  speedPxPerSec?: number;
  className?: string;
  separator?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const totalWidth = track.scrollWidth / 2;
      if (totalWidth === 0) return;
      const tween = (track.animate(
        [{ transform: 'translateX(0)' }, { transform: `translateX(-${totalWidth}px)` }],
        { duration: (totalWidth / speedPxPerSec) * 1000, iterations: Infinity, easing: 'linear' },
      ) as unknown as Animation);
      return () => tween.cancel();
    },
    { scope: trackRef },
  );

  const all = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-ink/10 bg-ink/5 py-5 ${className ?? ''}`}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-10 whitespace-nowrap font-display text-2xl italic text-ink"
      >
        {all.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span>{item}</span>
            <span className="text-ink/40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}