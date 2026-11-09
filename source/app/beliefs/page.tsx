import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";

export const metadata: Metadata = {
  title: "Beliefs | Vineyard Florence Church",
  description: "Explore the mission, values and beliefs that shape Vineyard Florence Church.",
};

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

      <section className="beliefs-links" id="our-way">
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

      <section className="beliefs-mission" id="mission">
        <span className="section-index">01 — Mission</span>
        <div className="beliefs-mission-statement">
          <p className="eyebrow">Why We Are Here</p>
          <h2>Spirit-Empowered<br />Disciple-Making <em>Movements.</em></h2>
        </div>
        <p>Be a hub of Spirit-empowered disciple-making movements where people everywhere are saved, transformed, and released to <em>“do the stuff”</em> Jesus did.</p>
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
