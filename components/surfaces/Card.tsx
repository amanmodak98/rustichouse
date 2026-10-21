import { cn } from '@/lib/utils';

/**
 * Card — Double-Bezel nested architecture (high-end-visual-design §4A).
 * Outer shell (ring + padding + radius) wraps an inner core that carries its
 * own surface colour and inset highlight, so cards read as physical objects
 * set into the page rather than flat rectangles.
 */
export function Card({
  children,
  className,
  coreClassName,
  as: Tag = 'div',
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  coreClassName?: string;
  as?: 'div' | 'article' | 'li' | 'section';
  interactive?: boolean;
}) {
  return (
    <Tag
      className={cn(
        'bezel group/card h-full',
        interactive &&
          'transition-transform duration-[520ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] hover:-translate-y-1',
        className,
      )}
    >
      <div className={cn('bezel-core h-full', coreClassName)}>{children}</div>
    </Tag>
  );
}

/**
 * ArrowLink — the quieter inline CTA. Underlined label with a travelling
 * arrow. Used where a full pill button would be too heavy (inside prose,
 * card footers, nav-adjacent links).
 */
export function ArrowLink({
  href,
  children,
  className,
  tone = 'ink',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'ink' | 'cream';
}) {
  return (
    <a
      href={href}
      className={cn(
        'group/link inline-flex items-center gap-2 font-body text-sm font-medium',
        'border-b pb-1 transition-colors duration-[280ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]',
        tone === 'ink'
          ? 'border-ink/25 text-ink hover:border-terracotta hover:text-terracotta'
          : 'border-cream/30 text-cream hover:border-ember hover:text-ember',
        className,
      )}
    >
      <span>{children}</span>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="h-3 w-3 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover/link:translate-x-1"
      >
        <path
          d="M2 8h12M9 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

/**
 * Hairline — the terracotta rule that stands in for cheap "SECTION 01"
 * meta-labels. Editorial eyebrows use a word + this rule instead.
 */
export function Hairline({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('rule', className)} />;
}

/**
 * Editorial eyebrow — a real word ("The Kitchen", "Since 1987"), never a
 * numbered label. Paired with the hairline above it.
 */
export function Eyebrow({
  children,
  tone = 'olive',
  className,
}: {
  children: React.ReactNode;
  tone?: 'olive' | 'terracotta' | 'cream' | 'ember';
  className?: string;
}) {
  const tones = {
    olive: 'text-olive',
    terracotta: 'text-terracotta',
    cream: 'text-cream/70',
    ember: 'text-ember',
  } as const;
  return (
    <p className={cn('eyebrow flex items-center gap-3', tones[tone], className)}>
      <Hairline className="shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** Film grain. Fixed, click-through, never attached to scrolling content. */
export function GrainOverlay() {
  return <div aria-hidden="true" className="grain" />;
}

/** Skip link — first tab stop, the a11y entry point past the header. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[110] focus:rounded-full focus:bg-wine focus:px-6 focus:py-3 focus:text-sm focus:text-cream"
    >
      Skip to content
    </a>
  );
}