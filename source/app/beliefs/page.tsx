import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { TriadMark } from "../components/TriadMark";
import {
  bibleReadingPlanUrl,
  contactTopicLink,
  freePantryUrl,
  houseGroupInterestUrl,
  latviaFacebookUrl,
  prayerZoomUrl,
  resetHouseUrl,
  vinedresserUrl,
  volunteerUrl,
  wahaUrl,
  womenOfWarfareUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Beliefs | Vineyard Florence Church",
  description: "Explore the mission, values and beliefs that shape Vineyard Florence Church.",
};

/** How each movement is lived out at VF: concrete rhythms and next steps. */
const waysToLiveItOut: ReactNode[][] = [
  [
    <>We pray together daily on <a href={prayerZoomUrl} target="_blank" rel="noreferrer">Zoom from <span className="nowrap">6:30–7:00am ↗</span></a></>,
    <>We worship on Sunday mornings together at 9:00am &amp; 11:00am weekly (in person and online)</>,
    <><a href={bibleReadingPlanUrl} target="_blank" rel="noreferrer">Daily Bible Reading Plan ↗</a></>,
    <>We fast as a church weekly from Sunday evenings after dinner until dinner on Mondays. See our social media for prayer points.</>,
  ],
  [
    <><Link href={houseGroupInterestUrl}>Join a House Group →</Link></>,
    <>Lead or start a Discovery Bible Study: get the <a href={wahaUrl} target="_blank" rel="noreferrer">Waha app ↗</a></>,
    <>Connect to a recovery ministry at VF: <Link href="/ministries/celebrate-recovery">Celebrate Recovery</Link>, <Link href="/ministries/mens-healthy-sexuality">Men’s Healthy Sexuality</Link>, <Link href="/ministries/alcoholics-anonymous">AA</Link>, <Link href="/ministries/griefshare">GriefShare</Link>, <Link href={contactTopicLink("men-of-courage")}>Men of Courage</Link>, <a href={womenOfWarfareUrl} target="_blank" rel="noreferrer">Women of Warfare ↗</a></>,
    <>Serve on a Sunday, in Kids or Student Ministries, on our First Impressions Team or Media/Worship Team: <Link href={volunteerUrl}>Sign up to volunteer →</Link></>,
  ],
  [
    <>Serve at VF with one of our outreach ministries: <Link href={freePantryUrl}>Monthly Grocery Giveaways</Link>, <Link href={resetHouseUrl}>Local Reset Ministries sober-living house</Link>, <a href={vinedresserUrl} target="_blank" rel="noreferrer">The Vinedresser Foster and Kinship ↗</a>, <Link href="/events">other outreach events</Link> and more.</>,
    <>Go on a mission trip with us to Appalachia at <Link href="/events">Red Bird</Link>, or globally to <Link href="/merp">Greece</Link> or <a href={latviaFacebookUrl} target="_blank" rel="noreferrer">Latvia ↗</a>.</>,
  ],
];

const movements = [
  {
    mark: "UP",
    title: "Love God",
    intro: "We Turn Our Attention Toward God And Learn To Live Aware Of His Presence.",
    points: ["Passionate Worship", "Personal And Shared Prayer", "Scripture And Spiritual Practices", "An Expectant Life With God"],
  },
  {
    mark: "IN",
    title: "Make Disciples",
    intro: "We Follow Jesus Together, Becoming Disciples Who Can Help Others Follow Him, Too.",
    points: ["Authentic Community", "Growth Through Obedience", "Serving One Another", "Life Shared With Intention"],
  },
  {
    mark: "OUT",
    title: "Impact The World",
    intro: "We Carry The Good News And Practical Love Of Jesus Into The Places We Already Live.",
    points: ["Sharing The Gospel", "Serving Our Community", "Seeking People Far From God", "Local And Global Mission"],
  },
];

const values = [
  ["G", "Generosity", "God is a giver and forgiver, and we want to be like Him."],
  ["O", "Outreach", "We join God’s mission locally and globally to reach the lost."],
  ["S", "Serve", "We show the love of Jesus in practical, tangible ways."],
  ["P", "Presence", "We are Spirit-led people shaped by prayer."],
  ["E", "Equip", "We prepare disciples to make disciples."],
  ["L", "Love", "We love Jesus, His family, and those far from Him."],
];

export default function BeliefsPage() {
  return (
    <main className="interior-page beliefs-page" id="top">
      <InteriorHeader />

      <section className="beliefs-hero">
        <div className="beliefs-hero-line" aria-hidden="true"><span>UP</span><span>IN</span><span>OUT</span></div>
        <div className="interior-hero-copy">
          <p className="eyebrow light">What Shapes Us</p>
          <h1>A Faith That<br /><em>Moves.</em></h1>
          <p>Centered on Jesus. Empowered by the Spirit. Practiced together for the sake of the world.</p>
          <a className="button button-light" href="#our-way">Explore our way <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-outline-word interior-outline" aria-hidden="true">BELIEVE</div>
      </section>

      <section className="beliefs-mission" id="our-way">
        <span className="section-index">01 — Mission</span>
        <div className="beliefs-mission-statement">
          <p className="eyebrow">Why We Are Here</p>
          <h2>Spirit-Empowered<br />Disciple-Making <em>Movements.</em></h2>
        </div>
        <p>Be a hub of Spirit-empowered disciple-making movements where people everywhere are saved, transformed, and released to <em>“do the stuff”</em> Jesus did.</p>
      </section>

      <section className="movement-stack" aria-label="Up, in and out">
        {movements.map((movement, index) => (
          <article className="movement-panel" key={movement.mark}>
            <div className="movement-mark"><TriadMark index={(index + 1) as 1 | 2 | 3} label={movement.title} /><strong>{movement.mark}</strong></div>
            <div className="movement-copy">
              <p className="eyebrow">{movement.title}</p>
              <h2>{movement.intro}</h2>
              <ul>{movement.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <div className="movement-ways">
                <p className="eyebrow">How We Live It Out</p>
                <ul>{waysToLiveItOut[index].map((way, wayIndex) => <li key={wayIndex}>{way}</li>)}</ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="gospel-values">
        <div className="values-heading">
          <span className="section-index">02 — Values</span>
          <div><p className="eyebrow">The Culture We Are Building</p><h2>GOSPEL Is Not Only<br />Our Message. It Is <em>Our Way.</em></h2></div>
        </div>
        <div className="values-grid">
          {values.map(([letter, title, copy]) => (
            <article key={letter}><span>{letter}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
          ))}
        </div>
      </section>

      <section className="beliefs-links">
        <div>
          <p className="eyebrow light">Anchored In A Wider Story</p>
          <h2>Historic Faith.<br /><em>Vineyard Expression.</em></h2>
          <p>Vineyard Florence stands with the shared theology and values of Vineyard USA and affirms the Cape Town Commitment as a rich expression of Christian belief and mission.</p>
        </div>
        <div className="beliefs-link-list">
          <a href="https://vineyardusa.org/about/core-values-beliefs/" target="_blank" rel="noreferrer"><span>01</span><strong>Vineyard USA<br />Values &amp; Beliefs</strong><b aria-hidden="true">↗</b></a>
          <a href="https://lausanne.org/statement/ctcommitment" target="_blank" rel="noreferrer"><span>02</span><strong>The Cape Town<br />Commitment</strong><b aria-hidden="true">↗</b></a>
        </div>
      </section>

      <section className="interior-cta beliefs-cta">
        <p className="eyebrow light">Belief Becomes A Way Of Life</p>
        <h2>Come And See What<br />Following Jesus <em>Together</em> Can Be.</h2>
        <div><Link className="button button-light" href="/#visit">Plan your visit <span aria-hidden="true">↗</span></Link><Link className="text-link light" href="/staff">Meet our staff <span aria-hidden="true">→</span></Link></div>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
