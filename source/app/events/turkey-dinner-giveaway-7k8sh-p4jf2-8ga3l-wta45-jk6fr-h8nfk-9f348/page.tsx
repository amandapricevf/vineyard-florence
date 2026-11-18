import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../../components/InteriorChrome";
import { SeasonalContent } from "../../components/SeasonalContent";
import { TriadMark } from "../../components/TriadMark";
import { churchCenterGivingUrl, eventsUrl, turkeyDinnerApplicationUrl } from "../../site-data";

export const metadata: Metadata = {
  title: "Turkey Dinner Giveaway | Vineyard Florence Church",
  description:
    "Sunday, November 22 at Vineyard Florence: sponsor a $25 Thanksgiving meal, fill a bag, or apply for a meal for your family.",
};

/**
 * The Turkey Dinner Giveaway page. Its long address is the old Squarespace
 * event page that printed QR codes point to, so it must not be renamed.
 * The same event is listed in events/event-data.ts; keep the two in step.
 *
 * Archived automatically: after GIVEAWAY_LAST_DAY the page shows a short
 * "wrapped up" message instead. To bring it back next year, update the
 * details below and set GIVEAWAY_LAST_DAY to the new giveaway date.
 */
const GIVEAWAY_LAST_DAY = "2026-11-17";

/** Keeps each button on one line; the row wraps instead. */
const noWrap = { whiteSpace: "nowrap" } as const;

/**
 * The shared image style stretches the card to the column's height, which
 * left a wide banner floating in white. Auto height lets the card match the
 * banner's own shape.
 */
const bannerFit = { width: "100%", height: "auto" } as const;

export default function TurkeyDinnerGiveawayPage() {
  return (
    <main className="interior-page events-page" id="top">
      <InteriorHeader />

      <SeasonalContent
        lastDay={GIVEAWAY_LAST_DAY}
        afterwards={
          <section className="interior-cta not-found" id="turkey-dinner-giveaway">
            <p className="eyebrow light">Turkey Dinner Giveaway</p>
            <h1>
              Thank You For
              <br />
              Every <em>Table.</em>
            </h1>
            <p>
              The Turkey Dinner Giveaway has wrapped up for this year. Thank you to everyone who sponsored a meal,
              filled a bag and prayed with families. Check back next fall for this year&rsquo;s details.
            </p>
            <div>
              <Link className="button button-light" href={eventsUrl}>
                See What&rsquo;s Coming Up <span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link light" href="/">
                Back to home <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>
        }
      >
        <section className="events-horizon" id="turkey-dinner-giveaway" style={{ paddingTop: 160 }}>
          <div className="events-horizon-media">
            <img src="/images/events/turkey-dinner-giveaway.webp" alt="Turkey Dinner Giveaway announcement" width={1500} height={844} decoding="async" style={bannerFit} />
          </div>
          <div className="events-horizon-copy">
            <TriadMark index={3} label="Outreach" />
            <h1 className="visually-hidden">Turkey Dinner Giveaway</h1>
            <h2>Turkey Dinner<br /><em>Giveaway.</em></h2>
            <p>Help bless families in need with a complete Thanksgiving meal. There are three ways to be part of it.</p>
            <p><strong>Sponsor a meal.</strong> A $25 gift provides a meal bag for a family. Text &ldquo;$25 Thanksgiving&rdquo; to 1-833-263-0025, or give online to the Thanksgiving fund.</p>
            <p><strong>Fill a bag.</strong> Pick up a bag and shopping list at the church doors and return it filled by Sunday, November 15.</p>
            <p><strong>Need a meal?</strong> Apply below and someone will reach out within two business days.</p>
            <div className="events-horizon-details">
              <span>When</span><strong>Sunday, November 22</strong>
              <span>Schedule</span><strong>Prep 12:30 PM · Distribution &amp; prayer 1:30–2:30 PM</strong>
              <span>Where</span><strong>Vineyard Florence</strong>
            </div>
            <div className="events-horizon-actions" style={{ flexWrap: "wrap", rowGap: 20 }}>
              <a className="button button-dark" style={noWrap} href={turkeyDinnerApplicationUrl} target="_blank" rel="noreferrer">Apply For A Meal <span aria-hidden="true">↗</span></a>
              <a className="text-link" style={noWrap} href={churchCenterGivingUrl} target="_blank" rel="noreferrer">Give To The Thanksgiving Fund <span aria-hidden="true">↗</span></a>
              <Link className="text-link" style={noWrap} href={eventsUrl}>See All Events <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </SeasonalContent>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
