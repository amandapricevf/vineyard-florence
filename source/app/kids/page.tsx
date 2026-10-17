import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";

export const metadata: Metadata = {
  title: "Vineyard Kids | Vineyard Florence Church",
  description: "A safe, exciting and Spirit-led Sunday environment for infants through fifth grade at Vineyard Florence Church.",
};

const ageGroups = [
  ["Nursery", "Ages 0–18 Months"],
  ["Toddlers", "18 Months–3 Years"],
  ["Preschool", "Ages 4–5"],
  ["Elementary", "Kindergarten–2nd Grade · 3rd–5th Grade"],
] as const;

export default function VineyardKidsPage() {
  return (
    <main className="interior-page kids-page" id="top">
      <InteriorHeader />

      <section className="kids-hero">
        <img src="/images/vineyard-florence/kids-2026/kids-worship-wide.webp" alt="Children worshiping together in Vineyard Kids" width="1536" height="1152" />
        <div className="kids-hero-overlay" />
        <div className="kids-hero-copy">
          <p className="eyebrow light">Infant–5th Grade</p>
          <h1>Big Faith<br /><em>Starts Small.</em></h1>
          <p>Safe, exciting environments where children learn about Jesus in creative, Bible-based and Spirit-led ways.</p>
          <div className="kids-hero-actions">
            <Link className="button button-light" href="/kids/register">Pre-Register Your Child <span aria-hidden="true">→</span></Link>
            <Link className="text-link light" href="/kids/media-release">Media Release <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="kids-intro">
        <span className="section-index">01 — Vineyard Kids</span>
        <div>
          <p className="eyebrow">Kids Ministry At Vineyard Florence</p>
          <h2>Know God.<br /><em>Hear God. Share His Love.</em></h2>
        </div>
        <p>At Vineyard Florence, our kids experience safe, exciting environments where they learn about Jesus in creative, Bible-based and Spirit-led ways. The heartbeat of Vineyard Kids is to show children who God is, teach them how they can hear God for themselves and provide fun ways to share His amazing love. It is our greatest honor to partner with parents and guardians in discipling their children. We would love to see your family this Sunday!</p>
      </section>

      <section className="kids-age-grid" aria-label="Vineyard Kids age groups">
        {ageGroups.map(([title, ages], index) => (
          <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{ages}</p></article>
        ))}
      </section>

      <section className="kids-media-reel" aria-labelledby="kids-media-title">
        <div className="kids-media-heading">
          <span className="section-index">02 — Life In Vineyard Kids</span>
          <div>
            <p className="eyebrow light">A Sunday In Vineyard Kids</p>
            <h2 id="kids-media-title">Worship. Wonder.<br /><em>Life Together.</em></h2>
          </div>
          <p>Children have room to move, laugh, listen and respond to God in ways that make sense at every age.</p>
        </div>
        <div className="kids-media-grid">
          <figure className="kids-media-video">
            <video autoPlay muted loop playsInline preload="metadata" poster="/images/vineyard-florence/kids-2026/kids-worship-stage.webp">
              <source src="/video/vineyard-florence-hero.mp4" type="video/mp4" />
            </video>
            <figcaption>See Vineyard Florence In Motion</figcaption>
          </figure>
          <figure className="kids-media-photo kids-media-photo-one">
            <img src="/images/vineyard-florence/kids-2026/kids-worship-stage.webp" alt="Children worshiping together on the Vineyard Kids stage" width="1536" height="1152" loading="lazy" />
          </figure>
          <figure className="kids-media-photo kids-media-photo-two">
            <img src="/images/vineyard-florence/kids-2026/kids-listening.webp" alt="A child listening during Vineyard Kids" width="1536" height="1152" loading="lazy" />
          </figure>
          <figure className="kids-media-photo kids-media-photo-three">
            <img src="/images/vineyard-florence/kids-2026/kids-laughter.webp" alt="Children sharing a playful moment with a Vineyard Kids leader" width="1536" height="1152" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="kids-first-visit">
        <div className="kids-first-visit-copy">
          <p className="eyebrow light">Your First Visit</p>
          <h2>Start At The<br /><em>Kids Cave.</em></h2>
          <p>Find the Kids Cave in the lobby. We will meet your family, check your child into our system and direct you to the right classroom for drop-off.</p>
          <Link className="button button-light" href="/kids/register">Pre-Register Here <span aria-hidden="true">→</span></Link>
        </div>
        <div className="kids-first-visit-note">
          <strong>Arrive A Few Minutes Early</strong>
          <p>First-time check-in takes a little longer. Our Kids team will be ready to answer questions and help your family feel comfortable.</p>
        </div>
      </section>

      <section className="kids-checkin">
        <div className="kids-checkin-heading">
          <span className="section-index">03 — How Check-In Works</span>
          <h2>Simple. Secure.<br /><em>Ready For Sunday.</em></h2>
        </div>
        <div className="kids-checkin-steps">
          <article><span>01</span><h3>Before Service</h3><p>Check your child in at any kiosk in the Kids Cave in the lobby. You and your child will receive matching, visit-specific name tags. Your child wears one; you keep the matching tag.</p></article>
          <article><span>02</span><h3>During Service</h3><p>If we need to contact you, your child&apos;s identification code will appear on the screens and we may send you a text. Exit the auditorium and a team member will direct you to the classroom.</p></article>
          <article><span>03</span><h3>After Service</h3><p>Go to your child&apos;s classroom and show your matching tag before your child is released. If you would like prayer, please pick up your child first or send someone you trust with your tag.</p></article>
        </div>
      </section>

      <section className="kids-form-paths">
        <div><p className="eyebrow light">Ready For Sunday?</p><h2>One Less Thing<br /><em>To Do At The Door.</em></h2></div>
        <article><span>01</span><h3>Family Pre-Registration</h3><p>Share the information our Kids team needs before your first visit.</p><Link href="/kids/register">Open The Registration Form <span aria-hidden="true">→</span></Link></article>
        <article><span>02</span><h3>Website &amp; Social Media Release</h3><p>Choose whether Vineyard Florence may use images of your child.</p><Link href="/kids/media-release">Open The Media Release <span aria-hidden="true">→</span></Link></article>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
