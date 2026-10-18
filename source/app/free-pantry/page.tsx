import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { address, contactTopicLink, directionsUrl } from "../site-data";

export const metadata: Metadata = {
  title: "VF’s Free Pantry | Vineyard Florence Church",
  description: "Free groceries for neighbors in need on the fourth Tuesday of each month, 6:00–7:30 PM at Vineyard Florence—and a way to serve.",
};

export default function FreePantryPage() {
  return (
    <main className="interior-page kids-form-page info-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero">
        <p className="eyebrow light">For Our Neighbors</p>
        <h1>VF’s Free<br /><em>Pantry.</em></h1>
        <p>On the fourth Tuesday of each month, our Free Food Pantry is an opportunity to bless those in need in our community with free groceries.</p>
        <Link className="text-link light" href="/events">← Back To Events</Link>
      </section>

      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">01 — Receive Groceries</span><h2>Free Groceries,<br /><em>No Cost.</em></h2></div>
        <div className="info-body">
          <img src="/images/events/free-pantry.webp" alt="Vineyard Florence free pantry announcement" width={1024} height={768} loading="lazy" decoding="async" />
          <p>If you or someone you know is in need of groceries, come to Vineyard Florence and get groceries.</p>
          <dl className="info-details">
            <div><dt>When</dt><dd>Fourth Tuesday of each month · 6:00–7:30 PM</dd></div>
            <div><dt>Where</dt><dd>{address.name} · {address.street}, {address.city}, {address.state} {address.zip}</dd></div>
          </dl>
          <div className="info-actions">
            <a className="button button-dark" href={directionsUrl} target="_blank" rel="noreferrer">Get Directions <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="kids-form-shell info-shell-alt">
        <div className="kids-form-heading"><span className="section-index">02 — Serve With Us</span><h2>Stock, Pray<br /><em>And Shop.</em></h2></div>
        <div className="info-body">
          <p>Our team serves at the church by helping people shop the pantry. We meet at 5:00 PM on the fourth Tuesday of the month to stock the pantry, prep and pray, then shop for groceries with those in need.</p>
          <p>If you would like to be a part, let us know.</p>
          <div className="info-actions">
            <a className="button button-dark" href={contactTopicLink("free-pantry-serve")}>I Want To Serve <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
