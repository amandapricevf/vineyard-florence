# Vineyard Florence Church website — notes for Claude

This site is maintained by church staff who are not developers. They describe
changes in plain language (often with a screenshot) and expect Claude to make
the change, check it, and explain the result in plain words. Avoid jargon in
replies; when a technical term is unavoidable, explain it in one short phrase.

The staff manual that teaches this workflow is `docs/Vineyard-Florence-Website-Manual.pdf`.

## How publishing works

- `main` is the live site. Every push to `main` makes Netlify rebuild and
  publish https://vineyardflorence.netlify.app (and the church domain once it
  points at Netlify). Each build costs Netlify credits, so changes are batched.
- Work on a separate branch. **Only push or merge to `main` when the person
  says so** ("push", "push to main", "merge", "publish", "make it live").
- After pushing to `main`, wait for Netlify to finish (poll the live page for
  the new content), then check the live page and report what you verified.
- Deploy previews exist only while a pull request is open. A merged pull
  request's preview link stops updating; do not point people at it.

## Building and checking

- Build from the repository root: `chmod +x source/scripts/*.sh && npm run build`
  (afterwards `git checkout -- source/scripts/` and delete
  `source/tsconfig.tsbuildinfo`). The build writes the publishable site into
  `deploy/`, which **is committed**.
- Preview locally with `python3 -m http.server 8765 -d deploy` and check pages
  with Playwright at desktop (1440×900) and phone (390×844) sizes: no
  horizontal overflow, no console errors, images load.
- New images go in `deploy/images/...` and must also be listed in
  `source-assets.json` (they are copied into `source/public` at build time).
  Save web images as `.webp`. Facebook image links expire: always download and
  host a copy.

## Where content lives

| Change | File |
| --- | --- |
| Email, address, service times, links, menu, site search, announcement bar | `source/app/site-data.ts` |
| Dated events and ongoing "rhythms" | `source/app/events/event-data.ts` |
| Contact form topics (one Netlify form each) | `source/app/contact/contact-topics.json` |
| Ministries directory and its groups | `source/app/ministries/page.tsx` |
| Recovery group pages | `source/app/ministries/*/page.tsx`, `recovery-groups.tsx` |
| Up / In / Out panels (Discipleship page) | `source/app/components/MovementStack.tsx` |
| Staff | `source/app/staff/` |
| Home page | `source/app/page.tsx` |
| Styles | `source/app/globals.css`, `source/app/interior.css`, tokens in `source/app/tokens.css` |

Read `source/HANDOFF.md` and `source/DESIGN.md` before structural or visual
changes. Events and the announcement bar expire on their own in the browser;
do not move that filtering to build time.

## Known traps

- Same-page `#section` links: `scripts/netlify-adapter.js` stops vinext's
  popstate handler for hash-only changes. Without it, the page gets stuck on
  the section. Keep that guard.
- The home page uses Lenis smooth scrolling; its in-page links are handled in
  `page.tsx` (not by Lenis's `anchors` option).
- Text sizes: nothing below 12px; tap targets at least 44px.
- Check the day of the week for every date you add.
