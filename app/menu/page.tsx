import type { Metadata } from 'next';
import { Card, Eyebrow } from '@/components/surfaces/Card';
import { CdnImage } from '@/components/ui/CdnImage';
import { PageHero } from '@/components/layout/PageHero';
import { StructuredData } from '@/components/seo/StructuredData';
import { Button } from '@/components/surfaces/Button';
import { Marquee } from '@/components/motion/Marquee';
import { getImage, imageUrl } from '@/lib/images';
import { menuFaq } from '@/lib/faq';
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Tandoor kebabs, pasta, thin-crust pizzas, salads, baos and shakes — the Rustic House menu in Civil Lines, Roorkee. Prices from the public Zomato listing.',
  alternates: { canonical: '/menu' },
};

interface Dish {
  name: string;
  /** INR price in paisa — integer for safe formatting. */
  price: number;
  note?: string;
  diet?: 'v' | 'vg' | 'gf' | 'nv';
}

interface Course {
  name: string;
  sublabel: string;
  items: Dish[];
}

// Menu reconstructed from public Zomato / Swiggy listings. Owner confirmation
// is required before publishing every item and price; PLACEHOLDERS.md flags
// each value as `OwnerConfirmationPending`.
const COURSES: Course[] = [
  {
    name: 'Warm Ups',
    sublabel: 'Teasers',
    items: [
      { name: 'Peri Peri French Fries',  price: 199, diet: 'vg' },
      { name: 'Cheese French Fries',      price: 229, diet: 'v'  },
      { name: 'Assorted Fried Basket',    price: 299, diet: 'vg' },
      { name: 'Cheese Chilly Toast',      price: 279, diet: 'v'  },
      { name: 'Loaded Nachos',            price: 379, diet: 'v'  },
    ],
  },
  {
    name: 'Appetizers Around The World',
    sublabel: 'Starters',
    items: [
      { name: 'Figo Bruschetta',               price: 349, diet: 'v'  },
      { name: 'Pita Bread with Hummus',       price: 299, diet: 'v'  },
      { name: 'Chicken Burrito Bowl',         price: 449, diet: 'nv' },
      { name: 'Chicken Enchiladas',           price: 479, diet: 'nv' },
      { name: 'Chicken Fajitas',              price: 469, diet: 'nv' },
      { name: 'Paneer Burrito Bowl',          price: 389, diet: 'v'  },
      { name: 'Smoked Chicken Pasta',         price: 469, diet: 'nv' },
    ],
  },
  {
    name: 'Pasta & Grill Italiano',
    sublabel: 'Italian',
    items: [
      { name: 'Veg Lasagna',           price: 419, diet: 'v'  },
      { name: 'Chicken Lasagna',       price: 469, diet: 'nv' },
      { name: 'Penne Arrabbiata',      price: 399, diet: 'vg' },
      { name: 'Penne Alfredo Chicken', price: 459, diet: 'nv' },
      { name: 'Penne Alfredo Paneer',  price: 429, diet: 'v'  },
      { name: 'Mac & Cheese',          price: 369, diet: 'v'  },
    ],
  },
  {
    name: 'Sharing Platters & Thin Crust Pizza',
    sublabel: 'Pizza',
    items: [
      { name: 'Margherita',           price: 499, diet: 'v'  },
      { name: 'Paneer Tikka Pizza',   price: 529, diet: 'v'  },
      { name: 'Chicken Tikka Pizza',  price: 579, diet: 'nv' },
      { name: 'Farmhouse Veg',       price: 549, diet: 'v'  },
      { name: 'BBQ Chicken',         price: 599, diet: 'nv' },
      { name: 'Mezze Platter',       price: 749 },
      { name: 'Tandoori Platter',     price: 849 },
    ],
  },
  {
    name: 'Desi Affaris',
    sublabel: 'Mains',
    items: [
      { name: 'Paneer Tikka',         price: 399, diet: 'v'  },
      { name: 'Dahi Ke Kebab',        price: 379, diet: 'v'  },
      { name: 'Bhatti Ka Murgh',      price: 519, diet: 'nv' },
      { name: 'Chicken Seekh Kabab',  price: 469, diet: 'nv' },
      { name: 'Tandoori Pomfret',     price: 729, diet: 'nv' },
    ],
  },
  {
    name: 'The Wok · Oriental Wok',
    sublabel: 'Indo-Chinese',
    items: [
      { name: 'Hakka Noodles Veg',   price: 319, diet: 'v'  },
      { name: 'Hakka Noodles Chicken', price: 369, diet: 'nv' },
      { name: 'Chilli Paneer',       price: 369, diet: 'v'  },
      { name: 'Chilli Chicken',      price: 399, diet: 'nv' },
      { name: 'Pad Thai',            price: 389 },
      { name: 'Thai Red Curry Veg',  price: 429, diet: 'v'  },
    ],
  },
  {
    name: 'Healthy Salads & Bowls',
    sublabel: 'Salads',
    items: [
      { name: 'Caesar Salad',          price: 329 },
      { name: 'Greek Salad',           price: 349, diet: 'vg' },
      { name: 'Quinoa Salad',          price: 359, diet: 'vg' },
      { name: 'Watermelon Feta Salad', price: 319, diet: 'v'  },
      { name: 'Grilled Chicken Bowl',  price: 459, diet: 'nv' },
      { name: 'Falafel Bowl',          price: 379, diet: 'vg' },
    ],
  },
  {
    name: 'Desi Chulha',
    sublabel: 'Curries & Mains',
    items: [
      { name: 'Butter Chicken',  price: 539, diet: 'nv' },
      { name: 'Kadhai Paneer',   price: 429, diet: 'v'  },
      { name: 'Dal Makhani',     price: 379, diet: 'v'  },
      { name: 'Paneer Butter Masala', price: 429, diet: 'v' },
      { name: 'Mutton Rogan Josh', price: 629, diet: 'nv' },
      { name: 'Chicken Curry',   price: 489, diet: 'nv' },
    ],
  },
  {
    name: 'Biryani & Rice Delights',
    sublabel: 'Rice',
    items: [
      { name: 'Veg Biryani',     price: 349, diet: 'v'  },
      { name: 'Chicken Biryani', price: 449, diet: 'nv' },
      { name: 'Mutton Biryani',  price: 549, diet: 'nv' },
      { name: 'Paneer Biryani',  price: 399, diet: 'v'  },
      { name: 'Jeera Rice',      price: 199, diet: 'v'  },
      { name: 'Steamed Rice',    price: 149, diet: 'vg' },
    ],
  },
  {
    name: 'Breads',
    sublabel: 'Tandoor',
    items: [
      { name: 'Tandoori Roti',      price:  60, diet: 'v' },
      { name: 'Butter Naan',        price:  90, diet: 'v' },
      { name: 'Garlic Naan',        price: 110, diet: 'v' },
      { name: 'Cheese Stuffed Naan', price: 169, diet: 'v' },
      { name: 'Laccha Paratha',     price:  99, diet: 'v' },
    ],
  },
  {
    name: 'Hot Beverages',
    sublabel: 'Coffee & Tea',
    items: [
      { name: 'Espresso',            price: 129 },
      { name: 'Cappuccino',          price: 179 },
      { name: 'Café Latte',          price: 179 },
      { name: 'Masala Chai',         price: 129 },
      { name: 'English Breakfast',   price: 149 },
    ],
  },
  {
    name: 'Signature Cold Brews & Teas',
    sublabel: 'Cold',
    items: [
      { name: 'Signature Cold Brew',     price: 229 },
      { name: 'Iced Matcha Latte',       price: 249 },
      { name: 'Iced Hibiscus Tea',       price: 199, diet: 'vg' },
      { name: 'Mango Cold Foam Iced Tea', price: 249 },
    ],
  },
  {
    name: 'Sourdough, Toasts & Burger Station',
    sublabel: 'Café',
    items: [
      { name: 'Sourdough Toast · Avocado', price: 279, diet: 'vg' },
      { name: 'Sourdough Toast · Cheese', price: 259, diet: 'v' },
      { name: 'Classic Burger',            price: 369 },
      { name: 'Aloo Tikki Burger',        price: 289, diet: 'v' },
      { name: 'Chicken Burger',           price: 419, diet: 'nv' },
    ],
  },
  {
    name: 'Drinks & Delights',
    sublabel: 'Bar',
    items: [
      { name: 'House Lemonade',       price: 179, diet: 'vg' },
      { name: 'Aam Panna',            price: 149, diet: 'vg' },
      { name: 'Masala Shikanji',      price: 159, diet: 'vg' },
      { name: 'Masala Lemonade',      price: 199, diet: 'vg' },
      { name: 'Classic Mojito',       price: 349 },
      { name: 'Smoked Old Fashioned', price: 449 },
    ],
  },
];

const INR = (paisarRupees: number) =>
  '₹' + Math.round(paisarRupees).toLocaleString('en-IN');

export default function MenuPage() {
  const hero = getImage('interior-dining-hall');

  const menuSchema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Rustic House Menu',
    hasMenuSection: COURSES.map((course) => ({
      '@type': 'MenuSection',
      name: course.name,
      hasMenuItem: course.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.note,
        offers: {
          '@type': 'Offer',
          price: (item.price).toFixed(2),
          priceCurrency: 'INR',
        },
        ...(item.diet
          ? {
              suitableForDiet: `https://schema.org/${
                item.diet === 'vg'
                  ? 'VeganDiet'
                  : item.diet === 'v'
                    ? 'VegetarianDiet'
                    : item.diet === 'gf'
                      ? 'GlutenFreeDiet'
                      : 'NonVegetarianDiet'
              }Diet`,
            }
          : {}),
      })),
    })),
  } as const;

  return (
    <>
      <StructuredData
        data={[
          menuSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
          ]),
          faqSchema(menuFaq),
        ]}
      />

      <PageHero
        eyebrow="The menu"
        title={
          <>
            One kitchen, <em className="text-terracotta">four rooms,</em> every cuisine.
          </>
        }
        lede="Tandoor kebabs at lunch, pasta and pizza in the evening, cold brews and shakes in between. The kitchen prints a single menu each morning; the card on your table is the live one."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Menu', path: '/menu' },
        ]}
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/reserve" size="lg">Reserve a table</Button>
          <Button href="/bar" variant="ghost" size="lg">Bar & lounge</Button>
        </div>
      </PageHero>

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-[var(--spacing-gutter)] lg:grid-cols-[1fr_1.1fr]">
          <Card className="lg:sticky lg:top-32 lg:self-start" interactive>
            <CdnImage
              src={imageUrl(hero, 1600)}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Card>

          <div className="font-body text-lg leading-relaxed text-ink-soft">
            <Eyebrow>Reading the menu</Eyebrow>
            <h2 className="mt-6 font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
              How it works.
            </h2>
            <p className="mt-6">
              The kitchen sends out fourteen sections a day, each with a short list. Most allergies are accommodated on a few minutes&apos; notice — the kitchen runs a separate pan for gluten-free, dairy-free and severe-allergen plates. Flag them on the booking form or tell the server on arrival.
            </p>
            <p className="mt-6">
              Prices shown here are from the public Zomato listing; the printed card carries the day&apos;s live prices including all taxes. Zomato and Swiggy list the same items at similar prices for delivery.
            </p>
            <p className="mt-6">
              The drinks list is short. The cocktail and mocktail list sits behind the bar.
            </p>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          'Butter Chicken · Kadhai Paneer · Bhatti Ka Murgh · Cold Brew',
          'Hakka Noodles · Margherita · Pad Thai · Smoked Old Fashioned',
        ]}
        speedPxPerSec={26}
      />

      <section className="bg-cream py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[72rem] px-[var(--spacing-gutter)]">
          {COURSES.map((course) => (
            <article
              key={course.name}
              id={course.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}
              className="border-b border-ink/15 py-10 last:border-none"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
                  {course.name}
                </h2>
                <p className="font-body text-xs tracking-[0.18em] text-olive uppercase">
                  {course.sublabel}
                </p>
              </div>
              <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
                {course.items.map((item) => (
                  <li key={item.name} className="grid gap-1 border-b border-ink/10 py-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg text-ink md:text-xl">
                        {item.name}
                        {item.diet === 'v' || item.diet === 'vg' || item.diet === 'gf' ? (
                          <span className="ml-3 inline-block rounded-full border border-olive/40 px-2 py-0.5 align-middle font-body text-[10px] tracking-[0.15em] text-olive uppercase">
                            {item.diet === 'vg' ? 'Vegan' : item.diet === 'v' ? 'Veg' : 'GF'}
                          </span>
                        ) : null}
                        {item.diet === 'nv' ? (
                          <span className="ml-3 inline-block rounded-full border border-terracotta/30 bg-terracotta/5 px-2 py-0.5 align-middle font-body text-[10px] tracking-[0.15em] text-terracotta uppercase">
                            Non-veg
                          </span>
                        ) : null}
                      </h3>
                      <span className="tabular-nums font-display text-lg text-ink md:text-xl">
                        {INR(item.price)}
                      </span>
                    </div>
                    {item.note ? (
                      <p className="font-body text-sm leading-relaxed text-ink/60">{item.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-linen py-[var(--spacing-section-tight)]">
        <div className="mx-auto max-w-[64rem] px-[var(--spacing-gutter)]">
          <Eyebrow>Menu questions</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-[-0.025em] md:text-5xl">
            Before you book.
          </h2>
          <dl className="mt-12 grid gap-8">
            {menuFaq.map((entry) => (
              <div key={entry.question} className="border-b border-ink/10 pb-6">
                <dt className="font-display text-xl text-ink">{entry.question}</dt>
                <dd className="mt-3 font-body text-base leading-relaxed text-ink-soft">
                  {entry.answer}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 border-t border-ink/15 pt-8 font-body text-sm text-ink/55">
            Prices and items reflect the publicly listed Zomato / Swiggy menus at the time of writing. The dine-in card on your table is the live one — talk to your server about the today&apos;s specials.
          </p>
        </div>
      </section>
    </>
  );
}