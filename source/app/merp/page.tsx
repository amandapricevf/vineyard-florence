import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { churchCenterGivingUrl, contactFormLink } from "../site-data";
import "./merp.css";

export const metadata: Metadata = {
  title: "MERP | Middle Eastern Refugee Partnership | Vineyard Florence",
  description: "Making disciples who make disciples among people on the move. Explore MERP’s vision for local leadership, church planting and humanitarian relief, and find ways to partner, pray or give.",
};

const contactMerp = contactFormLink;
const locations = ["Turkey", "Greece", "North Macedonia", "Central Europe", "Cyprus", "And Beyond"];
const steps = [
  {
    number: "01",
    title: "We Start Together.",
    copy: "New church plants are launched with the support of partner churches in the United States, who provide initial oversight, training when needed, prayer and funding.",
  },
  {
    number: "02",
    title: "We Build Local Leaders.",
    copy: "From the beginning, we invest in raising up leaders from within refugee communities themselves, equipping them to disciple and train others and shepherd new believers.",
  },
  {
    number: "03",
    title: "We Hand It Off.",
    copy: "Over time, leadership and ownership of each church plant transition to local churches in Turkey, Greece, North Macedonia, Central Europe, Cyprus and beyond, so the work can continue and multiply long after we step back.",
  },
];

export default function MerpPage() {
  return (
    <main className="interior-page merp-page" id="top">
      <InteriorHeader />

      <section className="merp-hero" aria-labelledby="merp-title">
        <div className="merp-hero-copy">
          <Link className="merp-back" href="/ministries">← All Ministries</Link>
          <p className="eyebrow light">Middle Eastern Refugee Partnership</p>
          <h1 id="merp-title">Hope For People<br /><em>On The Move.</em></h1>
          <p className="merp-tagline">Making disciples who make disciples, among people on the move.</p>
          <div className="merp-actions">
            <a className="button button-light" href="#get-involved">Get Involved <span aria-hidden="true">↓</span></a>
            <a className="text-link light" href="#how-it-works">See How It Works <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <aside className="merp-hero-mark" aria-label="MERP, founded and led by Vineyard Florence">
          <span>Vineyard Florence + Partner Churches</span>
          <strong>MERP</strong>
          <p>Disciple-Making.<br />Church Planting.<br />Humanitarian Relief.</p>
        </aside>
      </section>

      <section className="merp-story" aria-labelledby="merp-story-title">
        <div>
          <span className="section-index">01 — The Partnership</span>
          <p className="eyebrow">A New Beginning Can Carry Hope</p>
          <h2 id="merp-story-title">So Much Left Behind.<br /><em>So Much Still Ahead.</em></h2>
        </div>
        <div className="merp-story-copy">
          <p>Across the Mediterranean, millions of men, women and families have fled the Middle East in search of safety and religious freedom. Many have left behind homes, careers, loved ones and everything else familiar. In the middle of that painful upheaval, many are also searching for hope, freedom and a true connection to God.</p>
          <p>Founded and led by Vineyard Florence Church, in partnership with several other Vineyard churches, the Middle Eastern Refugee Partnership exists to see everyday disciple-making, church-planting movements and humanitarian relief take root among Middle Eastern refugees and asylum seekers from nations where religious freedom is restricted.</p>
        </div>
      </section>

      <section className="merp-vision" aria-labelledby="merp-vision-title">
        <p className="eyebrow light">Our Vision</p>
        <h2 id="merp-vision-title">Know Jesus.<br />Be Transformed.<br /><em>Be Released To Lead.</em></h2>
        <p>We long to see people come to know Jesus, be transformed by His love and be released as leaders who make disciples who make disciples. We believe people who have been displaced are not only those we serve, but those God is raising up to lead healthy next-generation churches, families and communities.</p>
      </section>

      <section className="merp-process" id="how-it-works" aria-labelledby="merp-process-title">
        <header className="merp-section-heading">
          <div><span className="section-index">02 — How It Works</span><h2 id="merp-process-title">Start Together.<br /><em>Multiply Locally.</em></h2></div>
          <p>Support from partner churches helps the work begin. Investment in local leaders helps it grow and continue.</p>
        </header>
        <div className="merp-process-grid">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p>
            </article>
          ))}
        </div>
        <div className="merp-locations" aria-label="Local church transition locations">
          <span>Local Leadership Across</span>
          <ul>{locations.map((location) => <li key={location}>{location}</li>)}</ul>
        </div>
      </section>

      <section className="merp-livelihood" aria-labelledby="merp-livelihood-title">
        <div><p className="eyebrow">Practical Care. A Viable Future.</p><h2 id="merp-livelihood-title">A Place To Live.<br /><em>A Way To Thrive.</em></h2></div>
        <div><h3>We Create Self-Sustaining Businesses And Residences For Women.</h3><p>The best track for residency and a viable contribution to a new country is to have legal addresses and fair-wage jobs. MERP works to create self-sustaining businesses and residences that help women build that future.</p></div>
      </section>

      <section className="merp-involved" id="get-involved" aria-labelledby="merp-involved-title">
        <header className="merp-section-heading">
          <div><span className="section-index">03 — Get Involved</span><h2 id="merp-involved-title">There Is A Place<br /><em>For You In This Work.</em></h2></div>
          <p>Whether you are interested, your church wants to partner in planting, you feel called to pray or you would like to give, take a next step with us.</p>
        </header>
        <div className="merp-involved-grid">
          <article><p className="eyebrow">Partner</p><h3>Start A Conversation.</h3><p>Explore how you or your church can partner in disciple-making, church planting and humanitarian relief.</p><a href={contactMerp("MERP Partnership Inquiry")}>Ask About Partnering <span aria-hidden="true">↗</span></a></article>
          <article><p className="eyebrow">Pray</p><h3>Make Room For Prayer.</h3><p>Pray for safety and hope for displaced families, wisdom for local leaders, and homes and fair-wage work for women.</p><Link href="/prayer#join">Join A Prayer Gathering <span aria-hidden="true">↗</span></Link></article>
          <article><p className="eyebrow">Give</p><h3>Help The Work Grow.</h3><p>Ask the VF team how to support MERP specifically, or visit Vineyard Florence’s giving page.</p><a href={contactMerp("Giving To MERP")}>Ask About Giving To MERP <span aria-hidden="true">↗</span></a><a href={churchCenterGivingUrl} target="_blank" rel="noreferrer">Open VF Giving <span aria-hidden="true">↗</span></a></article>
        </div>
        <div className="merp-contact"><p>Have a question about MERP?</p><a href={contactMerp("Question About MERP")}>Send Us A Message <span aria-hidden="true">↗</span></a></div>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
