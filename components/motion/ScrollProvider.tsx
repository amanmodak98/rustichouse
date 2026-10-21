'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';
import { useLenis } from 'lenis/react';
import { useReducedMotion } from '@/lib/reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * ScrollProvider — the single owner of GSAP ScrollTrigger for the site.
 *
 * Responsibilities:
 *  1. Drive GSAP's ticker from Lenis so scroll-linked animations never lag
 *     one frame behind the smooth-scrolled viewport (the classic Lenis+GSAP
 *     desync bug: pass `lenis.on('scroll', ScrollTrigger.update)` to gsap.ticker).
 *  2. Hard-disable ScrollTrigger when the user prefers reduced motion, so
 *     every scrubbed scene renders in its final state rather than sticking
 *     part-way through a timeline.
 *  3. Refresh ScrollTrigger after fonts settle, so pinned sections measure
 *     against final glyph metrics rather than fallback metrics (prevents the
 *     classic "pinned section jumps on font swap" CLS bug).
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const disabled = useRef(false);

  // 1. Lenis <-> ScrollTrigger bridge.
  useGSAP(
    () => {
      if (!lenis) return;

      lenis.on('scroll', ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tick);
        lenis.off('scroll', ScrollTrigger.update);
      };
    },
    { dependencies: [lenis], scope: undefined },
  );

  // 2. Reduced-motion kill switch.
  useGSAP(
    () => {
      disabled.current = reduced;
      if (reduced) {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        ScrollTrigger.refresh();
      }
    },
    { dependencies: [reduced] },
  );

  // 3. Re-measure once webfonts land (prevents pin-jump on font swap).
  useGSAP(
    () => {
      let cancelled = false;
      const refresh = () => {
        if (!cancelled) ScrollTrigger.refresh();
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh).catch(() => {});
      } else {
        window.addEventListener('load', refresh, { once: true });
        return () => window.removeEventListener('load', refresh);
      }

      return () => {
        cancelled = true;
      };
    },
    { dependencies: [] },
  );

  return <>{children}</>;
}