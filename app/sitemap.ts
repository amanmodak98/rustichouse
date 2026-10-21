import type { MetadataRoute } from 'next';
import { VENUE } from '@/lib/site';

const ROUTES = [
  '/',
  '/our-story',
  '/menu',
  '/bar',
  '/private-events',
  '/gallery',
  '/journal',
  '/reserve',
  '/visit',
  '/contact',
  '/faq',
  '/gift-cards',
  '/terms',
  '/privacy',
  '/cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${VENUE.url}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1.0 : 0.7,
  }));
}