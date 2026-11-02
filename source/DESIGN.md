# Vineyard Florence — design system

Read this with `HANDOFF.md` before changing anything visual. It records what is
**locked** (brand and the "Version A" direction) and the tokens and rules that
keep every page consistent around it.

The aim of the site: a first-time visitor on a phone finds **service times,
the address and what to expect** within seconds and feels welcome; members find
events and sermons quickly; older visitors can read everything comfortably.
The feeling is warm, welcoming and alive, but calm and trustworthy.

---

## 1. Locked

Do not remove, replace or restyle these into something else. Refining them
(spacing, legibility, smoothness, focus states) is welcome.

### Brand

| Element | Value |
| --- | --- |
| Logo | `public/brand/vineyard-florence-church-logo.png` (colour) and `…-logo-white.png` |
| Signature green | `#34635b` — `--color-vine` |
| Supporting greens | `#274e47` (`--color-vine-deep`), `#14272d` (`--color-vine-night`), `#5f8c84` (`--color-vine-bright`), `#9db5ae` (`--color-leaf`) |
| Neutrals | ink `#151515`, paper `#f3f0e9`, white |
| Warm accents | sand `#d6c5a7`, gold `#d4b879` |
| Type | Geist (sans, everything) + Georgia italic for the emphasised word in headings |

Gradients are allowed only between these colours. No new hues.

### Version A elements

- **Opening sequence** — the green curtain that zooms through the logo and
  "UP. IN. OUT." on the first home-page visit of a session. Skippable, and
  skipped entirely under reduced motion.
- **Header** — centred circular logo, pill controls either side (Menu, Search,
  Watch / Give, Sign in).
- **Menu and search** — both open as dropdown panels under their pill
  (the full-screen versions were replaced at the church's request in
  October 2026). Menu = primary navigation + service time and address;
  search = one field that jumps straight to the best-matching page.
- **Hero text carousel** — the "Life Together" card in the home hero.
- **Sticky ticker** — the announcement bar pinned to the bottom of every page.
- **Gather / Grow / Go journey** — the tabbed discipleship journey on the home page.
- **Staff and Beliefs pages** and their structure.
- **Section labels and numbers** ("02 — What To Expect") and the triangle
  `TriadMark` — part of the Version A voice; keep them, keep them legible.

### Content and code

- **`app/site-data.ts` is the single source of truth** for navigation, search,
  contact details, service times, address, the ticker and logos. Pages import
  from it; never paste those values into a page.
- Events live in `app/events/event-data.ts`; expiry and the "Next up" panel are
  logic in `EventsCalendar.tsx` + `lib/church-date.ts`. Restyle, don't rewire.
- Shared chrome: `components/InteriorChrome.tsx` (header, menu, search),
  `HeaderSearch.tsx`, `SiteFooter.tsx`, `SiteTicker.tsx`.

---

## 2. Tokens

All visual values are defined once, in `app/tokens.css`, using Tailwind 4's
`@theme`. Each token is a CSS variable on `:root` **and** a Tailwind utility
(`text-vine`, `bg-paper`, `text-label`, `rounded-card`, `shadow-panel`…), so
hand-written CSS and Tailwind classes read from the same place. The older
variable names (`--ink`, `--paper`, `--vine`, `--sand`, `--leaf`, `--line`) are
kept as aliases of the tokens.

### Colour roles

| Role | Token | Notes |
| --- | --- | --- |
| Primary text | `--color-ink` | |
| Muted text on light surfaces | `--text-muted` (72% ink) | ≥5.5:1 on paper, white and sand |
| Muted text on green / dark | `--text-muted-inverse` (82% white) | ≥5:1 on the signature green |
| Accent text on light | `--color-vine` | 6:1 on paper |
| Emphasis word on dark | `--color-sand` | headings only (large text) — 4.0:1 on vine |
| Graphics only | `--color-leaf`, `--color-vine-bright` | fail 4.5:1 as small text; never use them for body copy or labels |

### Type roles

| Role | Size | Use |
| --- | --- | --- |
| Display / headings | existing `clamp()` sizes per section | tracking no tighter than -0.04em; Georgia italic for the emphasis word |
| Lead | `--text-lead` 19px | intro paragraphs |
| Body | `--text-body` 17px | running copy; keep lines 45–75 characters |
| Meta | `--text-meta` 14px | dates, captions, secondary lines |
| Label | `--text-label` 12px | uppercase, letter-spaced eyebrows, tags, small controls |

**Nothing renders smaller than 12px.** Labels were previously 6–11px.

### Spacing, corners, elevation, motion

| Token | Value | Use |
| --- | --- | --- |
| `--space-section` / `--space-section-mobile` | `clamp(72px, 9vw, 130px)` / 64px | vertical padding of a page section |
| `--gutter` / `--gutter-mobile` | 7vw / 20px | page side padding |
| `--radius-control` | 999px | pills and small controls only |
| `--radius-card` / `--radius-panel` | 14px / 22px | cards / large panels and dropdowns |
| `--shadow-control`, `--shadow-control-hover`, `--shadow-panel` | soft, offset | one elevation family; never a border *and* a shadow |
| `--ease-out-expo` | `cubic-bezier(.16,1,.3,1)` | entrances and state changes |
| `--ease-in-out-curtain` | `cubic-bezier(.76,0,.24,1)` | the opening curtain only |
| `--duration-fast/base/slow` | 160 / 260 / 600ms | hover / panels / reveals |

No bouncy or elastic easing.

---

## 3. Rules

- **Contrast:** body text ≥4.5:1, large text ≥3:1. If a brand colour fails,
  use a different brand colour for that role — do not invent a new shade.
- **Focus:** every interactive element shows `--focus-ring` (or
  `--focus-ring-inverse` on dark surfaces) on keyboard focus.
- **Tap targets:** at least 44×44px on touch screens.
- **Images:** explicit `width`/`height` on every `<img>`; a paper-coloured
  placeholder behind photos that load from elsewhere.
- **Motion:** every JavaScript-driven effect checks
  `usePrefersReducedMotion`; CSS motion sits inside the existing
  `prefers-reduced-motion` handling.
- **Avoid:** generic purple/blue gradients, glassmorphism, gradient text,
  emoji as icons, identical card grids, bouncy easing.
