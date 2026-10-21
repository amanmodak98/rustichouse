'use client';

import { gsap } from 'gsap';

/**
 * The standing motion vocabulary. Every scroll-driven scene on the site is
 * one of these four shapes, composed in a route's useGSAP block.
 *
 * All motion is GPU-only (transform + opacity). No top/left/width/height
 * animation anywhere, per the performance guardrails.
 *
 * The desktop/reduced-motion gate lives in the route's gsap.matchMedia call,
 * not here — these functions assume they are only called when allowed.
 */

/** Fade + rise on enter. The default entrance for anything not scrubbed. */
export function revealUp(
  targets: gsap.TweenTarget,
  opts: { delay?: number; stagger?: number; start?: string; duration?: number } = {},
) {
  const { delay = 0, stagger = 0.09, start = 'top 82%', duration = 0.9 } = opts;
  return gsap.from(targets, {
    y: 28,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: 'expo.out',
    scrollTrigger: { trigger: targets as Element, start, once: true },
  });
}

/**
 * Image wash — the signature full-bleed scrub. Starts small and dim,
 * grows to full scale, then darkens toward the edges as it leaves.
 */
export function imageWash(el: Element, trigger?: Element) {
  return gsap.fromTo(
    el,
    { scale: 0.92, opacity: 0.65 },
    {
      scale: 1,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  );
}

/**
 * Scrubbed word-by-word reveal. Targets server-split `.word-inner` spans so
 * the text is crawlable and animates without a JS split pass.
 */
export function scrubWords(paragraphs: Element[]) {
  paragraphs.forEach((p) => {
    const words = p.querySelectorAll('.word-inner');
    if (!words.length) return;
    gsap.fromTo(
      words,
      { yPercent: 110 },
      {
        yPercent: 0,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: p,
          start: 'top 85%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    );
  });
}

/**
 * Card stack — each card pins briefly then the next rises over it.
 * Used on /private-events. Cards enter from the bottom.
 */
export function cardStack(cards: Element[]) {
  cards.forEach((card, i) => {
    gsap.fromTo(
      card,
      { yPercent: 40, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
      },
    );
    // Settle the card as the next arrives.
    if (i < cards.length - 1) {
      gsap.to(card, {
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: cards[i + 1] ?? card,
          start: 'top bottom',
          end: 'top 40%',
          scrub: true,
        },
      });
    }
  });
}

/**
 * Pinned horizontal spread. ONE per page maximum (home only) — pinning is
 * expensive and stacking two on one page feels like a tech demo.
 * `rail` is the track that translates; `panelCount` sets the travel distance.
 */
export function pinnedSpread(section: Element, rail: Element, panelCount: number) {
  const distance = () => rail.scrollWidth - window.innerWidth;
  const tween = gsap.to(rail, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      pinSpacing: true,
      pinType: 'transform',
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
  return tween;
}

/**
 * Infinite marquee. Duplicates the content enough times to fill 2x the
 * viewport, then loops xPercent -50 so the seam is never visible.
 */
export function marquee(track: Element, speedPxPerSec = 34) {
  const width = () => track.scrollWidth / 2;
  const tween = gsap.to(track, {
    x: () => -width(),
    duration: () => width() / speedPxPerSec,
    ease: 'none',
    repeat: -1,
  });
  return tween;
}

/** Slow ken-burns drift that runs for the life of the hero. */
export function kenBurns(el: Element, intensity = 1.12) {
  return gsap.fromTo(
    el,
    { scale: 1 },
    {
      scale: intensity,
      duration: 18,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    },
  );
}

/**
 * The candle reveal — the hero load timeline. Plays once behind the curtain.
 * Ordering is deliberate: rule draws, eyebrow rises, headline blooms,
 * the room opens, then the invitation arrives last.
 */
export function candleReveal(scope: Element) {
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    scrollTrigger: { trigger: scope, start: 'top top' },
  });

  tl.from('[data-hero="rule"]', { scaleX: 0, transformOrigin: '50% 50%', duration: 0.6 }, 0)
    .from('[data-hero="eyebrow"] .word-inner', { yPercent: 110, stagger: 0.035, duration: 0.7 }, 0.15)
    .from(
      '[data-hero="title"] .word-inner',
      { yPercent: 118, opacity: 0, stagger: 0.055, duration: 1.15, ease: 'candle' },
      0.45,
    )
    .from('[data-hero="image"]', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.35 }, 0.35)
    .from('[data-hero="lede"]', { y: 26, opacity: 0, duration: 0.7 }, 1.5)
    .from(
      '[data-hero="cta"] > *',
      { y: 16, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'damped' },
      1.75,
    )
    .from('[data-hero="meta"] > *', { y: 12, opacity: 0, stagger: 0.08, duration: 0.5 }, 2.05)
    .from('[data-hero="curtain"]', { yPercent: 0, duration: 0.9 }, 2.1);

  return tl;
}