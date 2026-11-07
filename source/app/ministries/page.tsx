import type { Metadata } from "next";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import {
  celebrateRecoveryUrl,
  eventsUrl,
  churchCenterGroupsUrl,
  contactTopicLink,
  mensHealthySexualityUrl,
  latviaFacebookUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Ministries | Vineyard Florence Church",
  description: "Find community, care and discipleship through Vineyard Florence ministries for kids, students, adults, recovery and House Groups.",
};

const ministries = [
  { id: "house-groups", label: "The Primary Place We Grow", title: "House Groups", copy: "Our primary place for friendship, care, worship and growing to become more like Jesus in everyday life.", href: churchCenterGroupsUrl, cta: "Find A House Group", external: true },
  { id: "kids", label: "Children", title: "Vineyard Kids", copy: "A safe, fun and Spirit-led place where children can know God, learn the way of Jesus and build friendships on Sunday mornings.", href: "/kids", cta: "Explore Vineyard Kids", external: false },
  { id: "students", label: "Middle + High School", title: "Vineyard Students", copy: "A community where students can ask real questions, encounter Jesus and build a faith that becomes their own.", href: "/students", cta: "Explore Vineyard Students", external: false },
  { id: "celebrate-recovery", label: "Recovery", title: "Celebrate Recovery", copy: "A Christ-centered recovery community helping people find healing, freedom and hope through honest relationships and the power of Jesus.", href: celebrateRecoveryUrl, cta: "Visit Celebrate Recovery", external: true },
  { id: "mens-healthy-sexuality", label: "Wholeness", title: "Men’s Healthy Sexuality", copy: "Resources and supportive community helping men pursue honesty, healing and a healthy, Jesus-centered vision for sexuality.", href: mensHealthySexualityUrl, cta: "Visit MHS", external: true },
  { id: "men", label: "Men", title: "Men’s Ministry", copy: "Connection, discipleship and practical brotherhood.", href: contactTopicLink("mens-ministry"), cta: "Connect With Men’s Ministry", external: false },
  { id: "women", label: "Women", title: "Women’s Ministry", copy: "Gatherings and relationships that create room for women to be encouraged, grow in faith and follow Jesus together.", href: eventsUrl, cta: "See Women’s Events", external: false },
  { id: "merp", label: "Global Mission", title: "MERP", copy: "The Middle Eastern Refugee Partnership: making disciples who make disciples among people on the move through church planting, local leadership and humanitarian relief.", href: "/merp", cta: "Explore MERP", external: false },
  { id: "latvia", label: "Global Mission", title: "Latvia", copy: "Explore Latvia ministry updates and connect through Facebook.", href: latviaFacebookUrl, cta: "Visit Latvia On Facebook", external: true },
] as const;

export default function MinistriesPage() {
  return (
    <main className="interior-page ministries-page" id="top">
      <InteriorHeader />
      <section className="ministries-hero">
        <div className="ministries-hero-copy">
          <p className="eyebrow light">There Is A Place For You</p>
          <h1>Find Your People.<br /><em>Grow Together.</em></h1>
          <p>Explore the ministries and communities helping people of every age connect, heal, grow and live the way of Jesus.</p>
          <div className="ministries-hero-actions">
            <a className="button button-light" href={churchCenterGroupsUrl} target="_blank" rel="noreferrer">Find A House Group <span aria-hidden="true">↗</span></a>
            <a className="text-link light" href="#ministry-directory">Explore All Ministries <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <aside className="ministries-hero-aside">
          <p>Not sure where to begin? Tell us who you are hoping to connect with, and a real person will help you find the right place.</p>
          <a className="text-link light" href={contactTopicLink("find-a-ministry")}>Ask For Help <span aria-hidden="true">↗</span></a>
        </aside>
      </section>

      <section className="ministries-intro" id="ministry-directory">
        <span className="section-index">01 — Ministry Directory</span>
        <div><p className="eyebrow">Gather. Grow. Go.</p><h2>One Clear Door<br /><em>Into Every Ministry.</em></h2></div>
        <p>Choose the community that fits your season. Links take you directly to details, current events or the person who can help.</p>
      </section>

      <section className="ministries-grid" aria-label="Vineyard Florence ministries">
        {ministries.map((ministry) => (
          <article className={`ministry-card ${ministry.id === "house-groups" ? "ministry-card-featured" : ""}`} id={ministry.id} key={ministry.id}>
            <p className="eyebrow">{ministry.label}</p>
            <h2>{ministry.title}</h2>
            <p>{ministry.copy}</p>
            <a href={ministry.href} target={ministry.external ? "_blank" : undefined} rel={ministry.external ? "noreferrer" : undefined}>{ministry.cta} <span aria-hidden="true">↗</span></a>
          </article>
        ))}
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
