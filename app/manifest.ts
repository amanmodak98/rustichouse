import type { MetadataRoute } from 'next';
import { VENUE } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: VENUE.name,
    short_name: VENUE.name,
    description: VENUE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f2e8d5',
    theme_color: '#1b1a17',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}