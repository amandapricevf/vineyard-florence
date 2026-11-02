# Vineyard Florence Church — website

> **Editing this project?** Read `HANDOFF.md` first. It records what was changed
> during the refactor and why, including a few things that look simplifiable but
> are not. For anything visual, also read `DESIGN.md`: the locked brand and
> "Version A" elements, and the design tokens everything else is built from.

Next.js 16 (App Router) + React 19 + Tailwind 4, built as a **static export** and
deployed to Netlify. No database, no server runtime, no environment variables.

## Running it locally

From the repository root (one level above this folder):

```bash
node scripts/restore-public.mjs   # copy shared images and video into source/public
cd source && npm ci && npm run dev  # local dev server (Vite / vinext)
```

To produce what Netlify publishes, run `npm run build` from the repository root.
It builds this app and exports every page, plus the Netlify form definitions and
the branded `404.html`, into `../deploy`. Lint with `npm run lint` in this folder.

## Deploying

`netlify.toml` (repository root) already contains everything Netlify needs:

- Build command: `npm run build` (repository root)
- Publish directory: `deploy`
- Node.js 22

Pull requests get a Netlify deploy preview; `main` deploys to the live site.

It also sets long cache lifetimes for hashed build assets and images, a 404
fallback, and baseline security headers.

## Routes

Home · Events · Sermons · Staff · Beliefs · Connect · Ministries · Discipleship ·
Kids · Students · Prayer · MERP · Baptisms · Free Pantry · Contact and the sign-up
forms, plus a branded 404 page.

## Design system

`DESIGN.md` documents the brand and the Version A elements as **locked**, and the
rules around them. All visual values (colours, type roles, radii, shadows,
motion) are tokens in `app/tokens.css`, defined with Tailwind 4's `@theme`, so they
are available both as CSS variables and as Tailwind utilities. In short:

- nothing renders below 12px (`--text-label`); body copy is 16–17px
- muted text uses `--text-muted` / `--text-muted-inverse`, which pass 4.5:1
- every interactive element shows the shared focus ring
- tap targets are at least 44px

---

## Where content lives

Almost all editable content sits in a handful of data files, separate from the
markup that renders it.

| What you want to change | File |
| --- | --- |
| Email, address, service times, social links, logos | `app/site-data.ts` |
| Navigation menu | `app/site-data.ts` → `primaryNavigation` |
| Site search results | `app/site-data.ts` → `searchIndex` |
| The sticky announcement bar | `app/site-data.ts` → `tickerMessage` |
| Dated events + ongoing rhythms | `app/events/event-data.ts` |
| Sermon library | `app/sermons/sermon-data.ts` |
| Staff list | `app/staff/page.tsx` |

There is exactly one copy of each of these. The header, footer, search overlay
and ticker all read from the same source, so changing an email address or a menu
item updates every page at once.

### Adding an event

Append an entry to `churchEvents` in `app/events/event-data.ts`. That is the
whole job — you do not also need to edit the "Next up" panel.

```ts
{
  isoDate: "2026-12-24",        // start day, church local time
  endDate: "2026-12-25",        // only for multi-day events
  month: "DEC",
  day: "24",
  dateMeta: "Christmas Eve",
  category: "Christmas",        // kicker used in the featured slot
  title: "Christmas Eve services",
  schedule: "4:00 & 6:00 PM",
  location: "Vineyard Florence",
  description: "…",
  image: "/images/events/christmas-eve.webp",
  imageSize: { width: 1500, height: 844 },   // real pixel size of the file
  alt: "Christmas Eve service announcement",
  primaryHref: "https://…",
  primaryLabel: "Details",
  featuredDate: "Thursday · December 24",
  featuredHeadline: "Come and see the",
  featuredHeadlineEmphasis: "light.",
},
```

Events sort themselves by date, the soonest one is promoted into the featured
"Next up" panel automatically, and anything whose last day has passed drops off
the page on its own. Order in the file does not matter.

### Dates and the static build

Because the site is a static export, anything computed during the build is
frozen into the HTML until the next deploy. Content that has to stay correct on
its own — the event list, the announcement expiry — is therefore filtered in the
browser, using `app/lib/church-date.ts` to compare whole days in
`America/New_York`. That way an event disappears the day after it happens even
if nobody has redeployed.

The pattern is: render the full list on the server, then narrow it in a
`useEffect` after mount. Server output and the first client render match, so
hydration stays clean, and a visitor with JavaScript disabled still sees
everything rather than an empty page.

## Motion and accessibility

The stylesheet honours `prefers-reduced-motion` for CSS animations, but the home
page also drives motion from JavaScript, which no media query can reach. Those
effects opt out through `app/lib/use-prefers-reduced-motion.ts`:

- the ~5 second intro curtain is skipped entirely
- Lenis smooth scrolling is not initialised, so native scrolling is used, and
  in-page anchor links jump with the fixed-header offset applied
- parallax tracking is skipped, while scroll progress and the sticky header
  keep working
- the hero carousel stops auto-advancing and stays on manual control
- the autoplaying hero video is not embedded at all; the local poster frame the
  stylesheet already holds in place is shown instead

## Project layout

```
app/
  site-data.ts            shared content: nav, search, contact, ticker
  tokens.css              design tokens (see DESIGN.md)
  lib/church-date.ts      timezone-aware "today" helpers
  lib/use-prefers-reduced-motion.ts
  layout.tsx              root layout
  page.tsx                home page (client component: Lenis + scroll effects)
  not-found.tsx           404
  components/
    InteriorChrome.tsx    interior header (menu and search dropdowns)
    HeaderSearch.tsx      the search dropdown
    MenuVisit.tsx         visit details at the foot of the menu (shared)
    SiteFooter.tsx        footer, shared by every page
    SiteTicker.tsx        sticky announcement bar (self-expiring)
  events/
    page.tsx              static sections
    event-data.ts         event + rhythm content
    EventsCalendar.tsx    date-filtered featured panel and list
  sermons/  staff/  beliefs/
public/
  brand/                  logos
  images/                 photography
  images/events/          event artwork
```

## Known follow-ups

- **SEO and metadata** — no Open Graph tags, sitemap, robots.txt or structured
  data yet. Tracked as separate work.
- **Staff photos are hot-linked** from a Squarespace CDN. If that account
  lapses, all 17 headshots break. They should be downloaded into
  `public/images/staff/` and referenced locally.
- **Contact email** — only `info@vineyardflorence.church` is used on the site;
  confirm it, then delete the reminder comment in `site-data.ts`.
- **Content Security Policy** — deliberately not set in `netlify.toml`, since it
  needs to be written and tested against the YouTube embed and Church Center
  links rather than guessed at.
