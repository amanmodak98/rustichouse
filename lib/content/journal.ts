/**
 * Journal — typed, in-repo content registry for editorial posts.
 * Each post is a small object rather than MDX so the build runs without a
 * markdown plugin and the data shape is obvious to non-engineers later.
 *
 * Post images reference slugs in `lib/images.ts`.
 */

export interface JournalPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  author: string;
  authorRole: string;
  category: 'kitchen' | 'bar' | 'house' | 'events' | 'farms';
  readingMinutes: number;
  imageSlug: string; // key into lib/images.ts
  body: string[]; // each entry is a paragraph; the renderer wraps them
  pullquote?: { text: string; attribute?: string };
}

export const POSTS: JournalPost[] = [
  {
    slug: 'first-fire',
    title: 'On the first fire of the evening',
    description:
      'How the kitchen runs a wood-fire tandoor and a charcoal grill from the same back wall — and why the smoke tells us when the room is ready.',
    date: '2026-10-12',
    author: 'Aman',
    authorRole: 'Founder',
    category: 'kitchen',
    readingMinutes: 4,
    imageSlug: 'tandoor',
    body: [
      "There is a moment before service when the room changes shape. The kindling catches, the embers settle into a bed of small coals, and the tandoor is talking the way an old instrument does — settling into its working voice. We wait for that voice before the first dough touches the stone.",
      "Our fire is not a stunt and not a tradition preserved in glass. It is the only way we know how to cook this menu. The embers give the kebabs their crust, the naan its leopard-spotted char, and the vegetables the kind of sweetness that only comes from long, gentle heat.",
      "We light the first tandoor at 11:00. By noon the dough for the lunch round is alive on the bench. None of it would work without that single act at the start of the day.",
    ],
    pullquote: {
      text: 'You taste a tandoor by the patience of its morning, not the cleverness of its chef.',
    },
  },
  {
    slug: 'what-grows-nearby',
    title: 'What we source nearby',
    description:
      'A short note on the farms and cooks we buy from — most of whom are within an hour of the kitchen.',
    date: '2026-10-04',
    author: 'Aman',
    authorRole: 'Founder',
    category: 'farms',
    readingMinutes: 5,
    imageSlug: 'interior-bar-bottles',
    body: [
      "Most of what arrives on the plate every morning was picked within the last twenty-four hours. The paneer is from a dairy cooperative half an hour out of Roorkee; the cream comes with it. The greens come from two farms our cook visits once a week; the tomatoes travel further but only when they are in season.",
      "We make exceptions for a few things. The cardamom still travels from Kerala because the right one comes from there. The olive oil still travels because we have not yet found the substitute. Everything else, we are trying to find within a day of the kitchen.",
      "A kitchen that tells you where each plate began is a kitchen that does not waste your time with stories. The food speaks.",
    ],
  },
  {
    slug: 'eight-things-about-the-room',
    title: 'Eight quiet things about the room',
    description:
      'A few notes on the chandeliers, the brick arch, the al-fresco terrace and the way the lounge sounds at nine in the evening.',
    date: '2026-09-22',
    author: 'Aman',
    authorRole: 'Founder',
    category: 'house',
    readingMinutes: 3,
    imageSlug: 'interior-chandelier',
    body: [
      "The building was a single-storey set of shops before it was a cafe, lounge and bar. The wooden ceiling was added when we renovated; the brick arch was opened so the lounge could be one room instead of three. We kept the chandeliers because the room asked for them.",
      "Rustic House seats two hundred and fifty across four rooms — the cafe, the lounge, the brick-arch alcove, the al-fresco terrace. There is no big table to seat everyone at once; we built it so friends arrive in groups and end up sharing tables with strangers.",
      "The lights at eight in the evening are what make it. We do not turn on the overhead lamps until well after the candles are lit.",
    ],
    pullquote: {
      text: 'The lights at eight in the evening are what make it. Everything else is restraint.',
    },
  },
];

export const FEATURED_POST = POSTS[0];

export function findPost(slug: string): JournalPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function recentPosts(limit = 6): JournalPost[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}