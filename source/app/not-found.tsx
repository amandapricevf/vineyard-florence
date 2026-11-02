import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "./components/InteriorChrome";
import { contactEmail } from "./site-data";

export const metadata: Metadata = {
  title: "Page Not Found | Vineyard Florence Church",
};

/**
 * Netlify serves this file for any unmatched path (see the 404 rule in
 * netlify.toml), so a mistyped or retired link lands on a branded page with a
 * way forward instead of the default host error screen.
 */
export default function NotFound() {
  return (
    <main className="interior-page" id="top">
      <InteriorHeader />

      <section className="interior-cta not-found">
        <p className="eyebrow light">404 — Page Not Found</p>
        <h1>
          We Could Not Find
          <br />
          That <em>Page.</em>
        </h1>
        <p>
          The link may have moved or retired. Here are a few places people usually mean to land.
        </p>
        <div>
          <Link className="button button-light" href="/">
            Back to home <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link light" href="/events">
            See what&rsquo;s coming up <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p>
          Still stuck? <a href={`mailto:${contactEmail}`}>Email us</a> and we will point you the right
          way.
        </p>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
