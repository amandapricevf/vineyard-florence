import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { TriadMark } from "../components/TriadMark";
import { churchCenterGivingUrl, everyOrgCryptoGivingUrl, stockGiftUrl } from "../site-data";

export const metadata: Metadata = {
  title: "Give | Vineyard Florence Church",
  description:
    "Give to Vineyard Florence Church online, with cryptocurrency or with stock. At least $1 out of every $5 leaves the building.",
};

/**
 * The Giving page. It repeats the home page's Generosity section (`#give` in
 * app/page.tsx), so copy changes there should be made here too. The `/giving-1`
 * address matches the old Squarespace page so existing links keep working.
 * No `data-reveal` here: interior pages have no reveal observer, so revealed
 * elements would stay invisible.
 */
export default function GivingPage() {
  return (
    <main className="interior-page giving-page" id="top">
      <InteriorHeader />

      <section className="give-section section-pad" id="give" aria-labelledby="giving-title" style={{ paddingTop: 160 }}>
        <h1 className="visually-hidden">Give To Vineyard Florence</h1>
        <div className="give-copy">
          <div className="section-index">Generosity</div>
          <div>
            <p className="eyebrow light">Generosity That Moves Outward</p>
            <h2 id="giving-title">At Least <em>$1</em> Out Of Every <em>$5</em> Leaves The Building.</h2>
            <p className="give-intro">We believe generosity should carry the hope of Jesus well beyond a Sunday service. Your giving helps fuel practical care, local outreach and ministry beyond our walls.</p>
            <div className="give-actions">
              <a className="button button-light" href={churchCenterGivingUrl} target="_blank" rel="noreferrer" aria-label="Give securely to Vineyard Florence through Church Center">
                Give now <span aria-hidden="true">↗</span>
              </a>
              <a
                className="button give-crypto-button"
                href={everyOrgCryptoGivingUrl}
                aria-label="Donate cryptocurrency to Vineyard Florence through Every.org"
              >
                Donate crypto <span aria-hidden="true">↗</span>
              </a>
              <Link className="button give-crypto-button give-stock-button" href={stockGiftUrl} aria-label="Donate stock to Vineyard Florence">
                Donate stock <span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link light" href="/#impact">See the impact <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="give-crypto-note">Cryptocurrency gifts are securely processed through Every.org.</p>
          </div>
        </div>

        <Script async defer src="https://embeds.every.org/0.4/button.js" strategy="lazyOnload" />

        <aside className="give-ratio" aria-label="At least one dollar out of every five leaves the building">
          <span className="give-ratio-kicker">At least</span>
          <strong><span>$1</span><i aria-hidden="true">/</i><span>$5</span></strong>
          <div className="give-ratio-bars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <p>Moving beyond the building to serve people and advance the mission.</p>
        </aside>

        <div className="give-path">
          <div><TriadMark index={1} /><strong>One Clear Step</strong><p>Continue directly to Vineyard Florence&apos;s Church Center giving page.</p></div>
          <div><TriadMark index={2} /><strong>Secure And Simple</strong><p>A familiar giving experience designed to make generosity easy.</p></div>
          <div><TriadMark index={3} /><strong>Purpose Beyond Walls</strong><p>Your gift helps make ministry possible inside the church and throughout the community.</p></div>
        </div>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
