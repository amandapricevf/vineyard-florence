import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { contactTopicLink } from "../site-data";

export const metadata: Metadata = {
  title: "Baptisms | Vineyard Florence Church",
  description: "Go public with your decision to follow Jesus. Vineyard Florence baptizes on the first Sunday of each month during the 11:00 AM service.",
};

export default function BaptismsPage() {
  return (
    <main className="interior-page kids-form-page info-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero">
        <p className="eyebrow light">A Public Yes</p>
        <h1>Go Public With<br /><em>Your Faith.</em></h1>
        <p>Baptism is for anyone who wants to declare publicly that Jesus is the Lord of their life—and it is one of the greatest shared experiences we have at Vineyard Florence.</p>
        <Link className="text-link light" href="/events">← Back To Events</Link>
      </section>

      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">01 — When We Baptize</span><h2>First Sunday<br /><em>Of Each Month.</em></h2></div>
        <div className="info-body">
          <img src="/images/events/baptisms.webp" alt="Vineyard Florence baptism announcement" width={1500} height={844} loading="lazy" decoding="async" />
          <p>We have baptisms on the first Sunday of each month, during our second service at 11:00 AM. A baptism class begins at 10:30 AM, before that service.</p>
          <p className="info-callout">Approach any of our staff with your interest to be baptized, and we will let you know when the next baptism is scheduled.</p>
          <div className="info-actions">
            <a className="button button-dark" href={contactTopicLink("baptism")}>Ask About Baptism <span aria-hidden="true">→</span></a>
            <Link className="text-link" href="/staff">Meet Our Staff <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="kids-form-shell info-shell-alt">
        <div className="kids-form-heading"><span className="section-index">02 — What It Means</span><h2>A New Life,<br /><em>Celebrated.</em></h2></div>
        <div className="info-body">
          <p>At Vineyard Florence, baptism is going public about your faith in Jesus and communicating to the world your heartfelt commitment to following Him. Being baptized shows others that you have decided to follow Jesus and allows them to celebrate this decision with you.</p>
          <p>Baptism illustrates Christ’s burial and resurrection and your new life as a Christian. Baptism doesn’t make you a believer—it shows that you already believe. More importantly, baptism does not “save” you—only your faith in Christ does that.</p>
          <h3>Baptizing Kids</h3>
          <p>We love getting to baptize kids, but we want to make sure they have talked about it with their parents and understand what they are doing and what it means to say Jesus is the Lord of their lives.</p>
          <h3>Baptized When You Were Younger?</h3>
          <p>If you were baptized when you were younger but have personally decided to follow God yourself, you are welcome to be baptized again to display your new commitment.</p>
          <h3>Have Questions?</h3>
          <p>We would love to help answer them for you. <a href={contactTopicLink("baptism")}>Send us a message</a> and we’ll connect with you soon.</p>
        </div>
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
