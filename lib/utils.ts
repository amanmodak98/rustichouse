import { clsx, type ClassValue } from 'clsx';

/** Conditional className joiner. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Stagger helper: returns [0, 0.08, 0.16, ...] */
export function stagger(n: number, step = 0.08): number[] {
  return Array.from({ length: n }, (_, i) => i * step);
}

/**
 * Split a string into word spans for masked reveal animations.
 * Rendered on the SERVER so the words exist in the initial HTML —
 * critical for AEO/SEO (the copy is crawlable) and for no-JS fallbacks.
 * Returns an array of React nodes, preserving spaces between words.
 */
export function splitWords(text: string): { word: string; space: boolean }[] {
  return text.split(/(\s+)/).map((token) => ({ word: token, space: /^\s+$/.test(token) }));
}
