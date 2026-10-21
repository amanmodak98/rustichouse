import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Eyebrow } from '@/components/surfaces/Card';
import { CdnImage } from '@/components/ui/CdnImage';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { POSTS, recentPosts } from '@/lib/content/journal';
import { getImage, imageUrl } from '@/lib/images';
import { breadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Field notes from the Rustic House kitchen — sourcing, season, the room.',
  alternates: { canonical: '/journal' },
};

export default function Journal() {
  const posts = recentPosts(POSTS.length);
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/journal' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Field notes"
        title={
          <>
            What we are <em className="text-terracotta">cooking with.</em>
          </>
        }
        lede="Short letters from the kitchen — who we are buying from, what is in season, and the small decisions that change the menu."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/journal' },
        ]}
      />

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[92rem] px-[var(--spacing-gutter)]">
          <Eyebrow>All notes</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            The current journal.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const img = getImage(post.imageSlug as keyof typeof import('@/lib/images').IMAGES);
              return (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="group/post block"
                >
                  <Card interactive>
                    <CdnImage
                      src={imageUrl(img, 1200)}
                      alt={img.alt}
                      width={1200}
                      height={900}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="px-6 py-6">
                      <p className="eyebrow text-olive">{post.category}</p>
                      <h3 className="mt-3 font-display text-2xl leading-[1.05] tracking-[-0.02em] transition-colors duration-[280ms] group-hover/post:text-terracotta">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 font-body text-base text-ink/65">
                        {post.description}
                      </p>
                      <p className="mt-4 font-body text-xs tracking-[0.15em] text-ink/45 uppercase">
                        {post.author} · {post.readingMinutes} min read
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}