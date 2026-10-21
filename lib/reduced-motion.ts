'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe `prefers-reduced-motion`.
 *
 * The CSS layer in app/globals.css also gates on the media query; this hook
 * is the companion for JS-driven animation that must collapse durations
 * programmatically rather than just visually.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return reduced;
}
