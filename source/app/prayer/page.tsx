import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { TriadMark } from "../components/TriadMark";
import {
  contactPhone,
  contactPhoneUrl,
  prayerRequestUrl,
  prayerZoomUrl,
} from "../site-data";
import { PrayerHexagon } from "./PrayerHexagon";

export const metadata: Metadata = {
  title: "Prayer Hub | Vineyard Florence Church",
  description: "Request prayer, join a prayer gathering and learn practical ways to pray with Vineyard Florence.",
};


const prayerGatherings = [
  ["Weekdays", "Morning Prayer", "6:30–7:00 AM", "Online Via Zoom", true],
  ["Mondays", "Monday Night Prayer", "6:30 PM", "In Person", false],
  ["Wednesdays", "Flow Prayer", "5:00–7:00 AM", "In Person + Online", true],
] as const;

const fiveSteps = [
  ["The Interview", "Introduce yourself, then ask, “How can I pray for you?” or “Where does it hurt?” Listen carefully as you learn what the person needs."],
  ["The Diagnosis", "Ask why this person may have this condition. Listen for the underlying physical, emotional, relational or spiritual issue God may be inviting you to pray for."],
  ["Prayer Selection", "Ask what kind of prayer may help. You can also ask, “Lord, what do You want to heal right now?” Consider intercession, command, pronouncement, agreement or an appropriate prayer against spiritual oppression."],
  ["Prayer Engagement", "With permission, begin to pray and lay hands on the person respectfully when appropriate. Check in, ask further questions and keep listening to the Holy Spirit."],
  ["Post-Prayer Direction", "Offer a simple next step whether healing occurred or not. Encourage continued prayer, Scripture, fellowship and a deep relationship with God. When healing occurs, encourage medical confirmation and document what God did."],
] as const;

export default function PrayerPage() {
  return (
    <main className="interior-page prayer-page" id="top">
      <InteriorHeader />

      <section className="prayer-hub-hero">
        <img src="/images/vineyard-florence/prayer-community.webp" alt="Vineyard Florence members praying together" width={1440} height={960} fetchPriority="high" />
        <div className="prayer-hub-hero-shade" />
        <div className="interior-hero-copy">
          <p className="eyebrow light">Our First Response, Not Our Last Resort</p>
          <h1>Everything Starts<br />With <em>Prayer.</em></h1>
          <p>Bring a need. Join a rhythm. Learn to pray for someone else. You do not need polished words—only an honest heart and room for God to move.</p>
          <a className="button button-light" href="#paths">Find Your Prayer Path <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="prayer-paths" id="paths">
        <div className="prayer-paths-heading">
          <span className="section-index">01 — Begin Here</span>
          <div><p className="eyebrow">Three Simple Ways In</p><h2>Request. Join.<br /><em>Learn.</em></h2></div>
          <p>Prayer belongs to the whole church. Start with what you need today, and take one clear step.</p>
        </div>
        <div className="prayer-path-grid">
          <article>
            <TriadMark index={1} label="Request Prayer" />
            <span>REQUEST</span><h3>Let Us Pray With You.</h3>
            <p>Share what is happening. Our prayer team will treat your request with compassion and care.</p>
            <Link href={prayerRequestUrl}>Request Prayer <b aria-hidden="true">→</b></Link>
          </article>
          <article>
            <TriadMark index={2} label="Join Prayer" />
            <span>JOIN</span><h3>Make Prayer A Rhythm.</h3>
            <p>Pray with others during the week—in person, online or at the close of either Sunday service.</p>
            <div className="prayer-path-actions"><a href="#join">See Prayer Gatherings <b aria-hidden="true">↓</b></a><a href={prayerZoomUrl} target="_blank" rel="noreferrer">Join On Zoom <b aria-hidden="true">↗</b></a></div>
          </article>
          <article>
            <TriadMark index={3} label="Learn To Pray" />
            <span>LEARN</span><h3>Learn To Pray For Someone.</h3>
            <p>Learn the steps, listen to the Holy Spirit and pray with care for the person in front of you.</p>
            <a href="#learn">Learn How To Pray <b aria-hidden="true">↓</b></a>
          </article>
        </div>
      </section>

      <section className="prayer-join" id="join">
        <div className="prayer-join-copy">
          <p className="eyebrow light">Pray With Us Through The Week</p>
          <h2>Make Room<br />For <em>God.</em></h2>
          <p>Schedules and online access can change. Contact the church before your first gathering and we will help you get connected.</p>
          <div><a className="button button-light" href={prayerZoomUrl} target="_blank" rel="noreferrer">Join Prayer On Zoom <span aria-hidden="true">↗</span></a><a className="text-link light" href={contactPhoneUrl}>Call {contactPhone} <span aria-hidden="true">→</span></a></div>
        </div>
        <div className="prayer-join-list">
          {prayerGatherings.map(([day, title, time, location, hasZoom], index) => (
            <article key={title}><span>0{index + 1}</span><div><small>{day}</small><h3>{title}</h3></div><div><strong>{time}</strong><p>{location}</p>{hasZoom ? <a href={prayerZoomUrl} target="_blank" rel="noreferrer">Open Zoom <b aria-hidden="true">↗</b></a> : null}</div></article>
          ))}
        </div>
      </section>

      <section className="prayer-learn" id="learn">
        <div className="prayer-learn-heading"><span className="section-index">02 — Learn</span><div><p className="eyebrow">Learn To Pray</p><h2>Begin With Jesus.<br /><em>Follow His Pattern.</em></h2></div></div>
        <p className="prayer-learn-intro">Use the Prayer Hexagon to move through the Lord’s Prayer. Select each part of the hexagon for a prompt that can guide your own words.</p>
        <PrayerHexagon />
        <div className="prayer-for-someone-heading"><p className="eyebrow">The Five-Step Prayer Model</p><h2>Learn To Pray<br /><em>For Someone.</em></h2><p>This guide comes from the model shared by Vineyard Florence. God is the One who heals and leads. We listen, ask permission and care for the person in front of us.</p></div>
        <ol className="prayer-step-list">
          {fiveSteps.map(([title, copy], index) => (
            <li key={title}><span>0{index + 1}</span><details><summary>{title}<b aria-hidden="true">+</b></summary><p>{copy}</p></details></li>
          ))}
        </ol>
        <p className="prayer-care-note">Prayer supports compassionate care and does not replace appropriate medical or mental-health treatment.</p>
      </section>

      <section className="prayer-sunday">
        <div><p className="eyebrow light">Prayer On Sunday</p><h2>No Pressure.<br />No Performance.<br /><em>Just People Praying.</em></h2></div>
        <p>Near the end of each service, there is space to share a request, receive personal prayer or simply remain where you are. Share as much or as little as you want; God already knows the unabridged edition.</p>
        <Link className="button button-light" href="/#what-to-expect">What To Expect Sunday <span aria-hidden="true">↗</span></Link>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
