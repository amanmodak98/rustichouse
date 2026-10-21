import type { MetadataRoute } from 'next';
import { VENUE } from '@/lib/site';

/**
 * robots.txt — allow the public site, allow AI crawlers, point at the sitemap.
 *
 * The AI-crawler list follows current (2026) vendor practice: every
 * publicly documented AI crawler is allowed so the GEO research-paper
 * quotation/statistics/citation methods have access to render the site
 * into generative search.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/reserve/thank-you'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
    ],
    sitemap: `${VENUE.url}/sitemap.xml`,
    host: VENUE.url,
  };
}