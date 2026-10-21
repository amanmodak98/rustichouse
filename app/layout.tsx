import type { Metadata } from 'next';
import { Fraunces, Geist } from 'next/font/google';
import './globals.css';

import { LenisProvider } from '@/lib/lenis-provider';
import { ScrollProvider } from '@/components/motion/ScrollProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GrainOverlay, SkipLink } from '@/components/surfaces/Card';
import { VENUE } from '@/lib/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--rh-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: 'variable',
  axes: ['SOFT', 'opsz'],
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--rh-geist',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(VENUE.url),
  title: {
    default: `${VENUE.name} — ${VENUE.cuisines.slice(0, 2).join(' · ')} in ${VENUE.addressLocality}`,
    template: `%s — ${VENUE.name}`,
  },
  description: VENUE.description,
  applicationName: VENUE.name,
  authors: [{ name: VENUE.name }],
  keywords: [
    'Italian restaurant',
    'trattoria',
    'wood fired',
    'natural wine',
    'café',
    'cocktail lounge',
    `${VENUE.addressLocality} dining`,
    'farm to table',
  ],
  openGraph: {
    type: 'website',
    siteName: VENUE.name,
    locale: 'en',
    url: VENUE.url,
    title: `${VENUE.name} — ${VENUE.tagline}`,
    description: VENUE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${VENUE.name} — ${VENUE.tagline}`,
    description: VENUE.description,
  },
  alternates: { canonical: '/' },
  formatDetection: { telephone: true, address: true },
};

export const viewport = {
  themeColor: '#1b1a17',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable}`}>
      <body>
        <LenisProvider>
          <ScrollProvider>
            <SkipLink />
            <Header />
            <main id="main" className="overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </ScrollProvider>
        </LenisProvider>
        <GrainOverlay />
      </body>
    </html>
  );
}