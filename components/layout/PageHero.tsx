import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail. Mirrors the BreadcrumbList JSON-LD on each page. */
export function Breadcrumbs({ items, tone = 'ink' }: { items: Crumb[]; tone?: 'ink' | 'cream' }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          'flex flex-wrap items-center gap-2 font-body text-xs tracking-[0.14em] uppercase',
          tone === 'ink' ? 'text-ink/40' : 'text-cream/50',
        )}
      >
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">·</span>}
            {i === items.length - 1 ? (
              <span className={tone === 'ink' ? 'text-ink/70' : 'text-cream/80'}>{c.name}</span>
            ) : (
              <a href={c.path} className="transition-colors duration-200 hover:text-terracotta">
                {c.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * PageHero — the shared masthead for every interior route.
 *
 * `tone="ink"` gives the calm linen masthead used by utility and legal pages.
 * `tone="wine"` gives the dark, cinematic masthead used by Persuade pages.
 * Interior routes get the wide measure so the H1 never wraps past 3 lines.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
  tone = 'ink',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  tone?: 'ink' | 'wine';
  className?: string;
}) {
  const dark = tone === 'wine';
  return (
    <header
      className={cn(
        'relative overflow-hidden pt-[calc(theme(spacing.12)+theme(spacing.6)+1rem)] md:pt-[calc(theme(spacing.12)+theme(spacing.8)+2rem)] pb-[var(--spacing-section-tight)]',
        dark ? 'bg-ink text-cream' : 'bg-linen text-ink',
        className,
      )}
    >
      {/* Warm radial wash so the masthead never reads as a flat block. */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0',
          dark
            ? 'bg-[radial-gradient(120%_80%_at_20%_0%,rgba(199,106,62,0.16),transparent_60%)]'
            : 'bg-[radial-gradient(120%_80%_at_20%_0%,rgba(180,82,59,0.07),transparent_60%)]',
        )}
      />

      <div className="relative mx-auto max-w-[92rem] px-[var(--spacing-gutter)]">
        {crumbs ? (
          <div className={cn('mb-10', dark && '[&_*]:text-cream/40 [&_span]:text-cream/70')}>
            <Breadcrumbs items={crumbs} tone={dark ? 'cream' : 'ink'} />
          </div>
        ) : null}

        {eyebrow ? (
          <p
            className={cn(
              'eyebrow flex items-center gap-3',
              dark ? 'text-ember' : 'text-olive',
            )}
          >
            <span aria-hidden="true" className="rule" />
            {eyebrow}
          </p>
        ) : null}

        <h1
          className={cn(
            'measure-display mt-6 font-display text-4xl leading-[0.95] tracking-[-0.025em] md:text-5xl',
            dark ? 'text-cream' : 'text-ink',
          )}
        >
          {title}
        </h1>

        {lede ? (
          <div
            className={cn(
              'measure-prose mt-8 font-body text-lg leading-relaxed',
              dark ? 'text-cream/70' : 'text-ink-soft',
            )}
          >
            {lede}
          </div>
        ) : null}

        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </header>
  );
}