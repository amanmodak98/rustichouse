'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { splitWords } from '@/lib/utils';
import { useReducedMotion } from '@/lib/reduced-motion';
import { BrandLogo } from '@/components/layout/BrandLogo';

interface Props {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: string;
  /** Optional CTAs rendered below the lede. */
  ctas?: ReactNode;
  /** Optional backplate element. Defaults to a static still. */
  backplate?: ReactNode;
  /** Public path to the backplate still (used when backplate is not set). */
  backplateSrc?: string;
  backplateAlt?: string;
  backplateWidth?: number;
  backplateHeight?: number;
}

/**
 * Hero — the cinematic opener.
 *
 *  1. Top: eyebrow + meta pills
 *  2. Center: brand wordmark + headline + lede
 *  3. Below: CTAs + scroll cue / address link
 *  4. Backplate: ken-burns still (or supplied backplate element)
 *
 * Animation: candle-reveal timeline; wordmark breathes.
 */
export function Hero({
  title,
  eyebrow,
  lede,
  meta,
  ctas,
  backplate,
  backplateSrc,
  backplateAlt = '',
  backplateWidth = 1920,
  backplateHeight = 1280,
}: Props) {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: scope.current, start: 'top top' },
      });

      tl.from('[data-hero="rule"]', { scaleX: 0, transformOrigin: '50% 50%', duration: 0.6 }, 0)
        .from('[data-hero="eyebrow"]', { yPercent: 110, opacity: 0, duration: 0.7 }, 0.1)
        .from('[data-hero="meta-pill"]', { yPercent: 110, opacity: 0, duration: 0.7 }, 0.2)
        .from('[data-hero="image"]', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.35, ease: 'expo.inOut' }, 0.3)
        .from('[data-hero="wordmark"]', { yPercent: 24, opacity: 0, duration: 1.2, ease: 'expo.out' }, 0.65)
        .from(
          '[data-hero="title"] .word-inner',
          { yPercent: 118, opacity: 0, stagger: 0.05, duration: 1.15, ease: 'candle' },
          0.45,
        )
        .from('[data-hero="lede"]', { y: 26, opacity: 0, duration: 0.7 }, 1.45)
        .from('[data-hero="rule-bottom"]', { scaleX: 0, transformOrigin: '50% 50%', duration: 0.6 }, 1.55)
        .from(
          '[data-hero="ctas"] > *',
          { y: 16, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'damped' },
          1.7,
        )
        .from('[data-hero="scroll"]', { opacity: 0, y: 8, duration: 0.5 }, 1.95);

      // Persistent slow ken-burns on the hero image.
      gsap.fromTo(
        '[data-hero="image"] img',
        { scale: 1 },
        { scale: 1.06, ease: 'none', duration: 22, repeat: -1, yoyo: true },
      );

      // Wordmark subtle breath.
      gsap.fromTo(
        '[data-hero="wordmark"]',
        { opacity: 0.78 },
        { opacity: 1, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      );
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-ink text-cream min-h-[clamp(440px,55vh,640px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_15%_0%,rgba(199,106,62,0.18),transparent_60%),radial-gradient(80%_60%_at_85%_100%,rgba(92,31,26,0.5),transparent_60%)]"
      />

      {/* Backdrop */}
      <div data-hero="image" className="absolute inset-0 gpu">
        {backplate ? (
          backplate
        ) : backplateSrc ? (
          <img
            src={backplateSrc}
            alt={backplateAlt}
            width={backplateWidth}
            height={backplateHeight}
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      {/* Wash so wordmark reads on photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/55 to-ink/85"
      />

      {/* Top utility row */}
      <div className="absolute inset-x-0 top-[clamp(8rem,12vw,10rem)] z-20 px-[var(--spacing-gutter)]">
        <div className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-3">
          <span
            data-hero="eyebrow"
            className="inline-flex items-center gap-3 rounded-full border border-cream/15 bg-ink/40 px-4 py-2 font-body text-[11px] tracking-[0.22em] text-cream/85 uppercase backdrop-blur-md"
          >
            <span aria-hidden="true" data-hero="rule" className="block h-px w-6 bg-ember" />
            {eyebrow}
          </span>
          {meta ? (
            <span
              data-hero="meta-pill"
              className="inline-flex items-center gap-3 rounded-full border border-cream/15 bg-ink/40 px-4 py-2 font-body text-[11px] tracking-[0.22em] text-cream/85 uppercase backdrop-blur-md"
            >
              {meta}
            </span>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[clamp(360px,48vh,520px)] max-w-[92rem] flex-col items-center justify-center px-[var(--spacing-gutter)] pb-4 pt-10 text-center md:pt-14">
        <div data-hero="wordmark" className="mb-5">
          <BrandLogo
            variant="wordmark"
            size="md"
            tone="cream"
            invert
            className="!w-[clamp(110px,14vw,170px)] !h-[clamp(110px,14vw,170px)]"
          />
        </div>

        <h1
          data-hero="title"
          className="measure-display mx-auto max-w-5xl font-display text-[clamp(1.625rem,0.875rem+2.8vw,3.25rem)] leading-[1] tracking-[-0.025em] text-cream"
        >
          {title.split(/\n/).map((line, i) => (
            <span key={i} className="block">
              {splitWords(line).map((t, j) =>
                t.space ? (
                  <span key={`s-${j}`}>{t.word}</span>
                ) : (
                  <span key={`w-${j}`} className="word">
                    <span className="word-inner">{t.word}</span>
                  </span>
                ),
              )}
            </span>
          ))}
        </h1>

        {lede ? (
          <p
            data-hero="lede"
            className="measure-prose mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-cream/80 md:text-base"
          >
            {lede}
          </p>
        ) : null}

        {ctas ? (
          <div
            data-hero="ctas"
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            {ctas}
          </div>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/5"
      />
    </section>
  );
}