# PLACEHOLDERS — owner confirmation checklist

## Confirmed from public listings (cross-verified across 2+ platforms)

These are **not** invented. Each is listed consistently across Zomato,
Tripadvisor, Swiggy, District and local business directories, and each was
set into `lib/site.ts`:

- [x] **Address** — `77/2 Civil Lines, IIT Road, above Central Bank / near
      Karishma Boutique, Roorkee, Uttarakhand 247667`
- [x] **Phone** — `+91 97201 55555`
- [x] **Hours** — approx. `11:00 – 23:00` daily, `23:15` Thu/Fri/Sat
- [x] **Instagram** — `@_rustic_house` → `instagram.com/_rustic_house`
- [x] **Cuisine** — multi-cuisine: North Indian, Chinese, Italian,
      Continental, Pizza, Café
- [x] **Price band** — ~₹700 for two (Zomato); ~₹500 for two (Swiggy)
- [x] **Menu items and prices** — reconstructed from the public Zomato
      listing. Every dish and every rupee figure on `/menu` needs an
      owner sign-off.

## Still needs owner confirmation before launch

- [ ] **Legal entity name** — `VENUE.legalName` is currently a placeholder.
- [ ] **Founding year** — `VENUE.founded` is set to 2018. Public listings do
      not establish this. Confirm or correct.
- [ ] **Hours precision** — listings say 11am–11pm / 11:15pm. Confirm exact
      per-day hours, and any holiday/special-day closures.
- [ ] **Reservations policy** — the site offers a booking form and a
      "held for 20 minutes" rule. Confirm this is how the restaurant
      actually operates, or remove `/reserve`.
- [ ] **Catering for large parties** — `/private-events` claims a
      buyout + a 24-seat brick-arch room + lounge hire. Confirm.
- [ ] **Live music** — the copy claims live music Thu/Fri/Sat after 9pm.
      Confirm, or remove.
- [ ] **Al-fresco terrace seating (80)** — visible in the photo set,
      but confirm the actual number.
- [ ] **Indoor / lounge / private-room capacities** — estimated from the
      photographs. Confirm exact numbers.
- [ ] **Payment methods, parking, accessibility** — the `/visit` page makes
      claims. Confirm each.
- [ ] **Email address** — `hello@rustichouse.in` is a placeholder. The
      public listings give a phone only. Replace with a real inbox.
- [ ] **Facebook page** — `VENUE.socials.facebook` is empty. Add or remove.
- [ ] **Domain** — `https://rustichouse.in` is assumed. Confirm the real
      domain, or set `NEXT_PUBLIC_SITE_URL`.
- [ ] **Licensing** — the copy claims alcohol service. Confirm the licence
      covers the stated hours.
- [ ] **Photo rights** — the images in `public/images/` were supplied with
      the brief. Confirm the restaurant owns the rights to all of them.

## Launch checklist

- [ ] `pnpm typecheck && pnpm build` green.
- [ ] Every route above renders 200; `/anything-else` renders 404.
- [ ] `node scripts/validate-jsonld.mjs http://localhost:3000/menu` clean.
- [ ] Menu items and prices signed off by the owner.
- [ ] Address, phone and hours checked against the owner's own records.
- [ ] Logo files confirmed as the current brand artwork.
- [ ] Social links point at accounts the restaurant controls.