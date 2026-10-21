import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Eyebrow, Card } from '@/components/surfaces/Card';
import { CdnImage } from '@/components/ui/CdnImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/layout/PageHero';
import { POSTS, findPost, recentPosts } from '@/lib/content/journal';
import { getImage, imageUrl } from '@/lib/images';
import { breadcrumbSchema, blogPostingSchema } from '@/lib/structured-data';

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return { title: 'Not found' };
  const img = getImage(post.imageSlug as keyof typeof import('@/lib/images').IMAGES);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      images: [{ url: imageUrl(img, 1200, 80), width: 1200, height: 900 }],
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function JournalPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const img = getImage(post.imageSlug as keyof typeof import('@/lib/images').IMAGES);
  const related = recentPosts(3).filter((p) => p.slug !== post.slug).slice(0, 2);

  const ld = blogPostingSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    datePublished: post.date,
    author: post.author,
    imageUrl: imageUrl(img, 1920),
  });

  return (
    <>
      <StructuredData
        data={[
          ld,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/journal' },
            { name: post.title, path: `/journal/${post.slug}` },
          ]),
        ]}
      />

      <article>
        {/* Hero */}
        <header className="relative overflow-hidden bg-ink text-cream">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_15%_0%,rgba(199,106,62,0.18),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-[92rem] px-[var(--spacing-gutter)] pt-[calc(theme(spacing.12)+theme(spacing.6)+1rem)] md:pt-[calc(theme(spacing.12)+theme(spacing.8)+2rem)] pb-[var(--spacing-section-tight)]">
            <Breadcrumbs
              tone="cream"
              items={[
                { name: 'Home', path: '/' },
                { name: 'Journal', path: '/journal' },
                { name: post.title, path: `/journal/${post.slug}` },
              ]}
            />
            <Eyebrow tone="ember" className="mt-10">{post.category}</Eyebrow>
            <h1 className="measure-display mt-6 font-display text-5xl leading-[0.95] tracking-[-0.025em] md:text-6xl">
              {post.title}
            </h1>
            <p className="measure-prose mt-8 max-w-2xl font-display text-xl italic text-cream/85">
              {post.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 font-body text-sm text-cream/70">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-linen-soft">
          <CdnImage
            src={imageUrl(img, 2400)}
            alt={img.alt}
            width={2400}
            height={1024}
            sizes="100vw"
            priority
          />
        </div>

        {/* Body */}
        <section className="bg-linen py-[var(--spacing-section-tight)]">
          <div className="mx-auto max-w-[42rem] px-[var(--spacing-gutter)] font-body text-lg leading-relaxed text-ink-soft">
            {post.body.map((para, i) => (
              <p key={i} className={i === 0 ? 'text-ink' : 'mt-8'}>
                {para}
              </p>
            ))}

            {post.pullquote ? (
              <blockquote className="my-16 border-l-2 border-terracotta pl-8 font-display text-3xl italic leading-snug text-ink">
                "{post.pullquote.text}"
                {post.pullquote.attribute ? (
                  <p className="mt-3 font-body text-sm not-italic tracking-[0.15em] text-ink/55 uppercase">
                    — {post.pullquote.attribute}
                  </p>
                ) : null}
              </blockquote>
            ) : null}

            <p className="mt-12 border-t border-ink/15 pt-6 font-body text-sm text-ink/55">
              {post.authorRole}. Filed under{' '}
              <Link href="/journal" className="text-terracotta hover:text-terracotta-deep">
                journal
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="bg-cream py-[var(--spacing-section-tight)]">
          <div className="mx-auto max-w-[92rem] px-[var(--spacing-gutter)]">
            <Eyebrow>Read next</Eyebrow>
            <h2 className="mt-6 font-display text-3xl tracking-[-0.02em] md:text-4xl">
              More from the journal.
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((p) => {
                const rImg = getImage(p.imageSlug as keyof typeof import('@/lib/images').IMAGES);
                return (
                  <Link key={p.slug} href={`/journal/${p.slug}`} className="group/post">
                    <Card interactive>
                      <CdnImage
                        src={imageUrl(rImg, 1200)}
                        alt={rImg.alt}
                        width={1200}
                        height={800}
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                      <div className="px-6 py-6">
                        <p className="eyebrow text-olive">{p.category}</p>
                        <h3 className="mt-3 font-display text-2xl leading-[1.05] tracking-[-0.02em] transition-colors duration-[280ms] group-hover/post:text-terracotta">
                          {p.title}
                        </h3>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}