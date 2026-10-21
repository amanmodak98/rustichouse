'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

/**
 * LenisProvider — smooth-scroll engine for the whole site.
 *
 * Tuned for "heavy" cinematic feel rather than the snappy default:
 *  - lerp 0.09 — momentum with weight; 0.075 is too eager for editorial
 *  - duration 1.25 — long glide, matches the candle easing
 *  - syncTouch false — native touch scroll feels better on phones
 *
 * GSAP ScrollTrigger reads Lenis's scroll position through the bridge in
 * components/motion/ScrollProvider.tsx, so pinned/scrubbed scenes stay in
 * lockstep with the emulated scrollbar.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.25,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: false,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
