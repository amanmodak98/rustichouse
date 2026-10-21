import type { Metadata } from 'next';
import { Card, Eyebrow } from '@/components/surfaces/Card';
import { CdnImage } from '@/components/ui/CdnImage';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { ALL_IMAGES, imageUrl } from '@/lib/images';
import { breadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'The cafe, the lounge, the brick-arch room, the al-fresco terrace and the bar — the four rooms at Rustic House, Roorkee.',
  alternates: { canonical: '/gallery' },
};

export default function Gallery() {
  const galleryImages = ALL_IMAGES.map((img) => ({
    '@type': 'ImageObject',
    contentUrl: imageUrl(img, 1920),
    caption: img.alt,
  }));

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Gallery', path: '/gallery' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Rustic House gallery',
            image: galleryImages,
          },
        ]}
      />

      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Four rooms, <em className="text-terracotta">one evening.</em>
          </>
        }
        lede="The cafe at noon, the lounge at dusk, the bar after ten. Photographs from a working day at Rustic House."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]}
      />

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[92rem] px-[var(--spacing-gutter)]">
          <Eyebrow>The collection</Eyebrow>
          <p className="measure-prose mt-6 max-w-2xl font-body text-base text-ink-soft">
            Twenty-six frames from the kitchen and the rooms. Click any photograph to view at full size.
          </p>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {ALL_IMAGES.filter((img) => img.role !== 'logo-mark').map((img) => (
              <Card key={img.slug} interactive>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <CdnImage
                    src={imageUrl(img, 1200)}
                    alt={img.alt}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.05]"
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="font-body text-[11px] tracking-[0.18em] text-ink/55 uppercase">
                    {img.role.replace(/-/g, ' ')}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}