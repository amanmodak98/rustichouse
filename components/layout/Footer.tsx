import Link from 'next/link';
import { VENUE, ADDRESS_LINE, formatHoursRange, MAPS_URL } from '@/lib/site';
import { BrandLogo } from '@/components/layout/BrandLogo';

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Eat & Drink',
    links: [
      { href: '/menu', label: 'Menu' },
      { href: '/bar', label: 'Bar & Lounge' },
      { href: '/private-events', label: 'Events' },
      { href: '/gift-cards', label: 'Gift Cards' },
    ],
  },
  {
    title: 'The House',
    links: [
      { href: '/our-story', label: 'Our Story' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/journal', label: 'Journal' },
      { href: '/faq', label: 'Questions' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { href: '/reserve', label: 'Reserve' },
      { href: '/visit', label: 'Hours & Location' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

const LEGAL = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/cookies', label: 'Cookies' },
];

/**
 * Footer — single horizontal band at lg+, stacked at smaller widths.
 * Internal vertical padding is tight so the section reads as a closing
 * seal rather than another chapter.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      {/* The actual brand wordmark sits full-width, low-contrast, behind the
          columns — the watermark seal. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[8%] flex justify-center select-none"
      >
        <BrandLogo
          variant="watermark"
          tone="cream"
          invert
          className="!h-[36vw] !w-[36vw] max-h-[520px] max-w-[520px] opacity-[0.05]"
        />
      </div>

      <div className="relative mx-auto max-w-[92rem] px-[var(--spacing-gutter)] py-12 md:py-14">
        {/* Single horizontal band at lg+: brand · find us · 3 nav columns · contact. */}
        <div className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:gap-12 lg:grid-cols-[auto_1.1fr_auto_auto_auto_auto] lg:items-start lg:gap-10">
          {/* Brand + tag */}
          <Link
            href="/"
            aria-label="Rustic House home"
            className="group inline-flex items-center self-start"
          >
            <BrandLogo
              variant="wordmark-sm"
              size="sm"
              tone="cream"
              invert
            />
          </Link>

          {/* Address + hours */}
          <address className="not-italic text-sm leading-relaxed">
            <p className="eyebrow text-ember">Find us</p>
            <p className="mt-3 font-display text-lg text-cream">{VENUE.streetAddress}</p>
            <p className="font-body text-xs text-cream/55">
              {VENUE.addressLocality}, {VENUE.addressRegion} {VENUE.postalCode}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-0.5 font-body text-xs text-cream/65">
              {VENUE.hours.slice(0, 4).map((h) => (
                <div key={h.label} className="flex justify-between gap-3">
                  <dt className="text-cream/45">{h.label}</dt>
                  <dd className="tabular-nums text-cream/75">{formatHoursRange(h)}</dd>
                </div>
              ))}
            </dl>
          </address>

          {/* Nav columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow text-ember">{col.title}</h2>
              <ul className="mt-3 space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-xs text-cream/70 transition-colors duration-[280ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Quick-action chips — visible at all widths below the columns. */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-cream/10 pt-6">
          <a
            href={`tel:${VENUE.phoneE164}`}
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 font-body text-xs tracking-[0.14em] text-cream/75 uppercase transition-colors hover:border-ember hover:text-cream"
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3">
              <path
                d="M3 4.5C3 3.67 3.67 3 4.5 3H6l1.5 3.5-2 1.2a11 11 0 0 0 4.8 4.8l1.2-2L14 12v1.5c0 .83-.67 1.5-1.5 1.5C6.81 14.27 3 10.46 3 5.7V4.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            {VENUE.phone}
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 font-body text-xs tracking-[0.14em] text-cream/75 uppercase transition-colors hover:border-ember hover:text-cream"
          >
            Directions
          </a>
          <a
            href={VENUE.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 font-body text-xs tracking-[0.14em] text-cream/75 uppercase transition-colors hover:border-ember hover:text-cream"
          >
            Instagram
          </a>
          <Link
            href="/reserve"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-xs font-medium text-ink transition-transform duration-[280ms] hover:-translate-y-px"
          >
            Reserve a table →
          </Link>
        </div>

        {/* Baseline */}
        <div className="mt-6 flex flex-col gap-3 border-t border-cream/10 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-[11px] tracking-[0.16em] text-cream/40 uppercase">
            © {VENUE.founded}–{new Date().getFullYear()} {VENUE.name} · Civil Lines · Roorkee
          </p>
          <ul className="flex flex-wrap gap-x-5">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-body text-[11px] tracking-[0.16em] text-cream/40 uppercase transition-colors duration-[280ms] hover:text-cream/75"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}