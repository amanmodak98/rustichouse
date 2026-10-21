'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { VENUE } from '@/lib/site';

const NAV = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/menu', label: 'Menu' },
  { href: '/bar', label: 'Bar' },
  { href: '/private-events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/journal', label: 'Journal' },
  { href: '/visit', label: 'Visit' },
];

function Wordmark() {
  return (
    <Link
      href="/"
      aria-label={`${VENUE.name} home`}
      className="group flex items-center gap-2 self-stretch text-ink"
    >
      <BrandLogo variant="wordmark-sm" size="xs" className="!h-[58px] !w-[58px] flex-shrink-0" />
    </Link>
  );
}

/**
 * Compact floating-header pill.
 *
 * Layout discipline:
 *  - Outer <header> = single-positioned fixed element.
 *  - The pill itself is a flex row that never wraps (`flex-nowrap`), each
 *    child is its own flex item with `items-center`, and the three sections
 *    (logo / nav / actions) are explicitly distributed with `gap` so they
 *    cannot visually collide.
 *  - Reserved horizontal space per cluster: logo min-w-[120px], nav min-w-0
 *    flex-1 with ellipsis-safe overflow, actions min-w-fit. Tablet hides
 *    nav and shows the hamburger to guarantee no contact at any width.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[50] transition-[padding] duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          scrolled ? 'pt-4' : 'pt-7'
        }`}
      >
        <div
          className={`mx-auto flex h-[78px] max-w-[92rem] flex-nowrap items-center justify-between gap-4 rounded-full border px-4 transition-[background-color,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:gap-5 md:px-6 ${
            scrolled
              ? 'border-ink/10 bg-linen/85 shadow-[0_1px_2px_rgb(27_26_23/0.06)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Cluster 1 — wordmark, fixed minimum so it never compresses */}
          <div className="flex shrink-0 items-center">
            <Wordmark />
          </div>

          {/* Cluster 2 — primary nav, hidden below lg to dodge collisions */}
          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
          >
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative inline-flex shrink-0 items-center rounded-full px-3 py-1.5 text-[0.8125rem] whitespace-nowrap transition-colors duration-[280ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                    active ? 'text-terracotta' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left bg-terracotta transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Cluster 3 — actions, fixed minimum, never overlaps */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={`tel:${VENUE.phoneE164}`}
              className="hidden items-center gap-2 rounded-full border border-ink/15 bg-cream/40 px-3.5 py-1.5 text-[0.75rem] tracking-[0.14em] text-ink/75 uppercase backdrop-blur-md transition-colors hover:border-ink/35 hover:text-ink md:inline-flex"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="h-3 w-3"
              >
                <path
                  d="M3 4.5C3 3.67 3.67 3 4.5 3H6l1.5 3.5-2 1.2a11 11 0 0 0 4.8 4.8l1.2-2L14 12v1.5c0 .83-.67 1.5-1.5 1.5C6.81 14.27 3 10.46 3 5.7V4.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden xl:inline">Call</span>
              <span className="hidden md:inline xl:hidden">Phone</span>
            </a>

            <Link
              href="/reserve"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-wine px-4 py-2 text-[0.8125rem] font-medium text-cream transition-[transform,background-color] duration-[280ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] hover:bg-wine-deep active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Reserve</span>
              <span aria-hidden="true" className="-mr-1 inline-block h-5 w-5 rounded-full bg-cream/15 text-center leading-5">
                →
              </span>
            </Link>

            {/* Hamburger — appears at lg and below so we never crowd the row */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-ink transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] ${
                    open ? 'translate-y-[5px] rotate-45' : 'translate-y-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[5px] block h-px w-4 bg-ink transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] ${
                    open ? '-translate-y-[5px] -rotate-45' : 'opacity-100'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[40] flex flex-col bg-ink/95 px-6 pb-10 pt-24 backdrop-blur-3xl transition-[opacity,visibility] duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-cream/20 text-cream"
          aria-label="Close menu"
        >
          ✕
        </button>
        <nav aria-label="Mobile" className="flex flex-col">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className={`flex items-center justify-between border-b border-cream/10 py-4 font-display text-3xl text-cream transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
            >
              {item.label}
              <span aria-hidden="true" className="text-cream/40">→</span>
            </Link>
          ))}
          <Link
            href="/contact"
            tabIndex={open ? 0 : -1}
            className={`flex items-center justify-between py-4 font-display text-3xl text-cream/60 transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: open ? `${60 + NAV.length * 40}ms` : '0ms' }}
          >
            Contact
            <span aria-hidden="true" className="text-cream/40">→</span>
          </Link>
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/reserve"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-base font-medium text-ink"
          >
            Reserve a table →
          </Link>
          <a
            href={`tel:${VENUE.phoneE164}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-base text-cream"
          >
            Call {VENUE.phone}
          </a>
          <p className="mt-2 text-center font-body text-xs tracking-[0.18em] text-cream/40 uppercase">
            {VENUE.addressLocality}
          </p>
        </div>
      </div>
    </>
  );
}