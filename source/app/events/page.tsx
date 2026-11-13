import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { TriadMark } from "../components/TriadMark";
import { EventsCalendar, EventRhythms } from "./EventsCalendar";
import { contactEmail } from "../site-data";

export const metadata: Metadata = {
  title: "Events | Vineyard Florence Church",
  description:
    "See what is coming up at Vineyard Florence Church, including gatherings, courses, baptisms, camps and ways to serve.",
};

/**
 * Stamped when the site is built rather than typed by hand, so the "Updated"
 * line can never claim a date older than the content it sits above.
 */
const lastBuilt = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

export default function EventsPage() {
  return (
    <main className="interior-page events-page" id="top">
      <InteriorHeader />

      <section className="events-hero">
        <div className="events-hero-copy">
          <p className="eyebrow">What&rsquo;s Happening At VF</p>
          <h1>There Is More<br />Life To Live<br /><em>Together.</em></h1>
          <p>Courses that help faith grow. Gatherings that make room for friendship. Practical ways to pray, serve and take your next step.</p>
          <div className="events-hero-actions">
            <a className="button button-dark" href="#upcoming">See what&rsquo;s next <span aria-hidden="true">↓</span></a>
            <span>Updated {lastBuilt}</span>
          </div>
        </div>
        <div className="events-hero-collage" aria-hidden="true">
          <figure className="events-collage-card events-collage-one">
            <img src="/images/events/turkey-dinner-giveaway.webp" alt="" width={1500} height={844} decoding="async" />
          </figure>
          <figure className="events-collage-card events-collage-two">
            <img src="/images/events/womens-christmas-pj-party.webp" alt="" width={1024} height={768} decoding="async" />
          </figure>
          <figure className="events-collage-card events-collage-three">
            <img src="/images/events/men-of-courage-breakfast-dec.webp" alt="" width={1024} height={768} decoding="async" />
          </figure>
          <span className="events-collage-orbit" />
        </div>
        <div className="events-hero-outline" aria-hidden="true">COME ALIVE</div>
      </section>

      <section className="events-intro" id="upcoming">
        <TriadMark index={1} label="Calendar" />
        <div>
          <p className="eyebrow">Open Invitations</p>
          <h2>Find The Next<br /><em>Yes For You.</em></h2>
        </div>
        <p>Whether you are brand new, ready to grow deeper or looking for a way to serve, there is a place to step in. Start with the date that catches your eye.</p>
      </section>

      <EventsCalendar />

      <EventRhythms />

      <section className="events-horizon" id="reset-house">
        <div className="events-horizon-media">
          <img src="/images/events/reset-house.webp" alt="Vineyard Florence Reset House announcement" width={454} height={454} loading="lazy" decoding="async" />
        </div>
        <div className="events-horizon-copy">
          <TriadMark index={3} label="On The Horizon" />
          <h2>The First VF Reset<br />House Is <em>Open.</em></h2>
          <p>Reset is a Christ-centered recovery program that empowers individuals to overcome addiction and rebuild their lives through structured community, spiritual growth, and dignified housing. From the very start, residents are supported holistically&mdash;addressing not just sobriety, but also discipleship, relational healing, financial stewardship, and physical and mental wellness. Through daily rhythms, mentoring relationships, and a strong church connection, residents are equipped to live transformed, purpose-filled lives. Ultimately, Reset exists not just to help people recover, but to raise up disciples who live missionally and help others find the same hope and freedom.</p>
          <p>Vineyard Florence has opened its first Reset home, Leah&rsquo;s House. You can support us by praying for the women being served in and through this home, and by purchasing items needed for the house. To learn more about Leah&rsquo;s House and how to get involved, email Amber.</p>
          <div className="events-horizon-details"><span>Status</span><strong>Now Open</strong><span>Ways To Help</span><strong>Furnish · give · pray</strong></div>
          <div className="events-horizon-actions">
            <a className="button button-dark" href="https://a.co/04FZOIZG" target="_blank" rel="noreferrer">View Amazon Wish List <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="mailto:amber.brown@vineyardflorence.church?subject=VF%20Reset%20House">Email Amber To Learn More <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="interior-cta events-cta">
        <p className="eyebrow light">Still Finding Your Next Step?</p>
        <h2>We Would Love To<br />Help You Find <em>Your Place.</em></h2>
        <div>
          <a className="button button-light" href={`mailto:${contactEmail}`}>Start a conversation <span aria-hidden="true">↗</span></a>
          <Link className="text-link light" href="/#visit">Plan a visit <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
