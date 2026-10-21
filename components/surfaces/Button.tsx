import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'wine' | 'ink' | 'ghost' | 'cream';
type Size = 'md' | 'lg';

const base =
  'group/btn relative inline-flex items-center gap-4 rounded-full font-body font-medium ' +
  'transition-[transform,background-color,color,border-color] duration-[280ms] ' +
  'ease-[cubic-bezier(0.34,1.3,0.64,1)] active:scale-[0.98] select-none';

const sizes: Record<Size, string> = {
  md: 'py-3 pl-6 pr-3 text-[0.9375rem]',
  lg: 'py-4 pl-8 pr-4 text-base',
};

const variants: Record<Variant, string> = {
  // On dark surfaces: cream pill with a wine inner icon circle.
  cream:
    'bg-cream text-ink hover:bg-linen border border-ink/10 ' +
    '[--rh-btn-icon:bg-wine] [--rh-btn-icon-fg:text-cream]',
  wine: 'bg-wine text-cream hover:bg-wine-deep border border-wine/30 [--rh-btn-icon:bg-cream] [--rh-btn-icon-fg:text-wine]',
  ink: 'bg-ink text-linen hover:bg-ink-soft border border-ink/20 [--rh-btn-icon:bg-terracotta] [--rh-btn-icon-fg:text-cream]',
  ghost:
    'border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/5 [--rh-btn-icon:bg-ink] [--rh-btn-icon-fg:text-cream]',
};

interface IconProps {
  className?: string;
}

/** The trailing arrow, always nested in its own circular wrapper. */
function Arrow({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn('h-3.5 w-3.5', className)}
    >
      <path
        d="M3 13L13 3M6 3h7v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Button — Button-in-Button architecture (high-end-visual-design §4B).
 * The arrow never sits naked beside the label; it lives in a circular
 * wrapper flush with the pill's inner padding, and it nudges diagonally
 * on hover to create kinetic tension.
 */
export function Button({
  href,
  children,
  variant = 'wine',
  size = 'md',
  arrow = true,
  className,
  type,
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className={cn(
            'relative z-10 grid place-items-center rounded-full',
            'bg-[var(--rh-btn-icon)] text-[var(--rh-btn-icon-fg)]',
            'transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.3,0.64,1)]',
            'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px',
            size === 'lg' ? 'h-9 w-9' : 'h-7 w-7',
          )}
        >
          <Arrow />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
}