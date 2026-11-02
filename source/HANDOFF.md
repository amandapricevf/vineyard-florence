# Handoff notes — read before editing

This codebase was originally generated in ChatGPT, then reviewed and refactored.
This file records **what changed and why**, so that later work does not
accidentally undo it.

**If you are an AI assistant picking this project up: read this file first.**
Several of the changes below look like they could be "simplified." They cannot.
The reasons are recorded next to each one.

The single organising principle:

> Content must stay separate from markup, because this site is maintained by
> non-technical church staff. If updating ordinary content would require editing
> JSX, that content belongs in a data file instead.

---

## 1. Removed leftovers from the original build

| Removed | Why |
| --- | --- |
| `app/chatgpt-auth.ts` | Dead code — nothing imported it. It also called `headers()`, which is incompatible with `output: "export"`. |
| `other: { "codex-preview": "development" }` in `app/layout.tsx` | A build-tool marker that was being emitted as a `<meta>` tag on every production page. |

**Do not restore either.** If authentication is ever genuinely needed, it cannot
be done this way — a static export has no server to read request headers.

---

## 2. Events now maintain themselves — the most important change

### The problem

Events were hardcoded in JSX with display-only dates (`month: "SEP"`,
`day: "17–19"`). Nothing filtered by date. The featured "Next up" panel was a
separate hardcoded block pointing at one specific event.

Consequences: every past event stayed on the page forever, and the "Next up"
panel advertised a stale event until a human noticed and hand-edited the markup.

### The fix

**`app/events/event-data.ts` (new)** — every dated event is now an entry in the
exported `churchEvents` array, including the one that used to be hardcoded as
the featured event. Each entry carries machine-readable dates:

- `isoDate` — start day, `YYYY-MM-DD`
- `endDate` — last day, multi-day events only

Display strings like `"SEP"` / `"17–19"` are still there for rendering, but they
are **not** what drives behaviour. Never remove `isoDate`.

**`app/events/EventsCalendar.tsx` (new)** — renders the featured panel and the
list. Sorts by date, drops anything finished, and promotes the soonest remaining
event into the featured slot.

**`app/lib/church-date.ts` (new)** — compares whole days in `America/New_York`,
so a visitor in another timezone sees the same "today" the church office would.

### Two things here that must not be "simplified"

**Filtering happens in the browser, not at build time.** This is a static export.
Anything computed during the build is frozen into the HTML until someone
redeploys. A build-time filter would leave expired events sitting on a live site
indefinitely. That is the exact bug being fixed — do not move the filter to build
time because it looks tidier.

**`EventsCalendar` renders the full list on the server and on the first client
render, then narrows it in a `useEffect` after mount.** This looks like an
unnecessary extra step. It is not:

- Filtering during render would make the server HTML and the first client render
  disagree, which is a React hydration mismatch.
- It would also mean visitors with JavaScript disabled get an *empty* events
  page rather than the complete list.

The current ordering degrades gracefully in both directions. Leave it alone.

### Adding an event

Append one entry to `churchEvents`. That is the entire job — there is no second
edit to the featured panel, and file order does not matter. See the template in
`README.md`.

---

## 3. Shared content consolidated into `app/site-data.ts` (new)

Previously duplicated across the home page and the interior pages:

| Was duplicated | Now |
| --- | --- |
| Two separate search indexes (14 items and 8 items) that had already drifted apart | One `searchIndex` |
| Two navigation arrays | One `primaryNavigation` |
| Address, service times, social links, Church Center URLs, logo paths | One definition each |
| The announcement ticker, implemented twice | `tickerMessage` + one component |

Also consolidated: the contact email. The original used
`office@vineyardflorence.com` on the home page and
`info@vineyardflorence.church` on interior pages — different mailbox *and*
different domain. Standardised on `info@vineyardflorence.church` with a `TODO`
at the top of the file. **This still needs confirming with the church.**

Do not re-introduce a local copy of any of these in a page file.

---

## 4. Footer, ticker and search unified into components

- `app/components/SiteFooter.tsx` (new) — one footer for every page
- `app/components/SiteTicker.tsx` (new) — one ticker, and it now self-expires
- `app/components/InteriorChrome.tsx` — rewritten to consume `site-data.ts`;
  still exports `InteriorHeader`, `InteriorFooter` and `SiteTicker`, so no page
  imports needed changing

**Two non-obvious details:**

`SiteFooter` takes a `reveal` prop. The home page runs an `IntersectionObserver`
that adds `.is-visible` to `[data-reveal]` elements; interior pages do not, and
`[data-reveal]` is `opacity: 0` until that class arrives. Setting `data-reveal`
unconditionally would make the footer permanently invisible on every interior
page. Pass `reveal` on the home page only.

The copyright year is wrapped in `suppressHydrationWarning`. The static HTML
freezes whatever year the site was last built; reading the year at render time
keeps it correct without a redeploy, and the suppression covers the one night
where the baked year and the live year disagree.

`tickerMessage.expires` is the last day the announcement should show. Once it
passes, the ticker removes itself in the browser. Update or clear that date when
the message changes.

---

## 5. Accessibility: JavaScript-driven motion now honours `prefers-reduced-motion`

The stylesheet already had a `prefers-reduced-motion` block, but the home page
drives most of its motion from JavaScript, which no media query can reach. Added
`app/lib/use-prefers-reduced-motion.ts` (new). When the preference is set:

- the ~5 second intro curtain is skipped entirely
- Lenis smooth scrolling is not initialised (native scrolling instead), and
  in-page anchor links get a handler applying the fixed-header offset that Lenis
  was previously providing
- parallax tracking is skipped, while scroll progress and the sticky header keep
  working
- the hero carousel stops auto-advancing
- the autoplaying hero video is not embedded at all — the stylesheet already
  holds the local poster frame (`hero-sunday.webp`) in place, so the hero still
  looks finished with no motion and no third-party request

If you add new JS-driven motion, gate it the same way.

---

## 6. Links, images and routing

- Internal links changed from `<a href="/sermons">` to `next/link` `<Link>`.
  Raw anchors caused a full page reload on every internal navigation.
- All 25 `<img>` tags now carry real intrinsic `width` / `height`, plus
  `loading="lazy"` or `fetchPriority="high"` as appropriate. Without dimensions
  the browser cannot reserve space, which caused layout shift. Where a container
  already sets `aspect-ratio` (staff photos, sermon thumbnails), dimensions are
  omitted deliberately.
- Event artwork moved from `public/events/` to `public/images/events/`, so it no
  longer shares a URL namespace with the `/events` page route. This matters for
  Netlify header and redirect globs. Keep them separate.

---

## 7. Added `app/not-found.tsx` and expanded `netlify.toml`

The 404 page is wired up via a redirect rule. `netlify.toml` also gained
immutable caching for hashed build assets, a shorter cache for images, and
baseline security headers.

**No Content-Security-Policy is set, deliberately.** The site embeds YouTube and
links to Church Center; a CSP needs writing and testing against those origins
rather than guessing. Do not add a speculative one.

---

## 8. Netlify form names must say what the form is

Netlify Forms lists each form by the name set in `scripts/export-netlify.mjs`
(and mirrored in `scripts/netlify-adapter.js`). Church staff read that list, so
every form name must make it obvious which form it is, e.g.
`contact-us-general-questions` or `kids-media-release`, never a generic name
like `contact` or `form`. Use the same name in both files.

The contact page is one page serving many Netlify forms: one per topic, listed
in `app/contact/contact-topics.json`, so each topic's notifications can go to
the person responsible for it. Link to a topic with `contactTopicLink("<topic>")`;
a link to a topic missing from the JSON fails the build. To add a topic, add
one entry to the JSON (with a plain-English `formName`) — the export script and
the Netlify adapter pick it up automatically.

---

## 9. Design polish (November 2026)

A UI/UX pass on the shared chrome and Home, Events, Sermons, Staff, Beliefs and
404. No content, data structures or SEO changed. `DESIGN.md` is the reference;
the decisions worth knowing:

- **Tokens:** `app/tokens.css` (Tailwind 4 `@theme`) defines the palette, type
  roles, radii, shadows and motion. The old variable names (`--ink`, `--vine`…)
  are aliases — keep using either, but add new values as tokens, not literals.
- **Type floor:** labels were 6–11px; nothing is below 12px now. Muted text was
  58–64% ink (4.3:1); it is `--text-muted` (72%, ≥5.5:1). This was applied only
  to the polished pages' selectors — the other pages' CSS was left as it was.
- **Visitor path:** the home hero leads with "Plan Your Visit" and a line with
  service times and address + directions; the menu ends with the same visit
  details and tap-to-call (`components/MenuVisit.tsx`); the footer reads its
  times from `site-data.ts` and has tap-to-call.
- **Hero vs ticker:** the home hero is sized to stop above the sticky ticker
  (`--ticker-clearance`), so the carousel card is never covered.
- **Keyboard:** Escape returns focus to the Menu/Search button; opening the menu
  from the keyboard moves focus to its first link. Panels never animate
  `visibility` on open — a hidden element cannot take focus, and the
  reduced-motion rule gives every element a tiny `all` transition.
- **Events empty state:** when no dated event remains, the page says so, shows
  the Sunday times and links to the general contact form. The expiry and
  "Next up" logic were not touched.
- **404:** the export writes the rendered `app/not-found.tsx` as Netlify's
  `404.html` (it used to write a plain Arial page).
- **Phone heroes on Staff and Beliefs** are flex columns; their copy used
  `min-height:100%`, which cannot resolve when the hero's height is `auto`, so
  the words floated over the photo / UP IN OUT line.

---

## New / moved / deleted files at a glance

**Added**
```
HANDOFF.md                              this file
app/site-data.ts                        shared content
app/lib/church-date.ts                  timezone-aware date helpers
app/lib/use-prefers-reduced-motion.ts   motion preference hook
app/components/SiteFooter.tsx           shared footer
app/components/SiteTicker.tsx           self-expiring ticker
app/events/event-data.ts                event + rhythm content
app/events/EventsCalendar.tsx           date-filtered calendar
app/not-found.tsx                       404 page
```

**Deleted**
```
app/chatgpt-auth.ts
```

**Moved**
```
public/events/*  ->  public/images/events/*
```

**Rewritten**
```
app/components/InteriorChrome.tsx
app/events/page.tsx
app/page.tsx          (imports, search, nav, footer, ticker, images, motion)
netlify.toml
README.md
```

---

## Still open

1. **Confirm the contact email** — only `info@vineyardflorence.church` is used;
   confirm it and remove the reminder comment in `site-data.ts`.
2. ~~Staff photos hot-linked from Squarespace~~ — done (November 2026). The 17
   headshots now live in `deploy/images/staff/` (listed in `source-assets.json`,
   restored into `public/images/staff/` at build time) as 900px WebP with camera
   metadata stripped. Add new headshots the same way, named after the person.
3. **SEO and metadata** — no Open Graph tags, sitemap, `robots.txt` or structured
   data yet. Being handled as separate work; link previews are currently blank.
4. **Mobile load time.** Lighthouse (simulated slow phone network) puts the
   largest paint at about 5–7s on most pages, before and after the design
   polish. Worth a performance pass: font loading and the home-page JavaScript.
5. **Consider sourcing events from Planning Center.** The church already
   maintains events in Church Center. Pulling them via API with a scheduled
   Netlify rebuild would remove most manual editing entirely.
