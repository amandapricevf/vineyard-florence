import type { Metadata } from "next";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import {
  eventsUrl,
  churchCenterGroupsUrl,
  contactTopicLink,
  latviaFacebookUrl,
  vinedresserUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Ministries | Vineyard Florence Church",
  description: "Find community, care and discipleship through Vineyard Florence ministries for kids, students, adults, recovery and House Groups.",
};

/** The four groups the directory is organised into, in page order. The
 *  recovery group keeps the #recovery-groups anchor that other pages link to. */
const ministryGroups = [
  { id: "life", anchor: "life-together", title: "Life Together", intro: "House Groups and gatherings for men and women: the places we grow as friends who follow Jesus." },
  { id: "family", anchor: "kids-and-students", title: "Kids & Students", intro: "Sunday environments where children and students can know God, ask real questions and build friendships." },
  { id: "recovery", anchor: "recovery-groups", title: "Recovery Groups", intro: "Recovery, support and healing ministries that meet at Vineyard Florence. Whatever you are carrying, you do not have to carry it alone." },
  { id: "mission", anchor: "outreach-and-mission", title: "Outreach & Mission", intro: "Serving foster and kinship families here at home and partnering with disciple-making movements around the world." },
] as const;

const ministries = [
  { id: "house-groups", group: "life", label: "The Primary Place We Grow", title: "House Groups", copy: "Our primary place for friendship, care, worship and growing to become more like Jesus in everyday life.", href: churchCenterGroupsUrl, cta: "Find A House Group", external: true },
  { id: "kids", group: "family", label: "Children", title: "Vineyard Kids", copy: "A safe, fun and Spirit-led place where children can know God, learn the way of Jesus and build friendships on Sunday mornings.", href: "/kids", cta: "Explore Vineyard Kids", external: false },
  { id: "students", group: "family", label: "Middle + High School", title: "Vineyard Students", copy: "A community where students can ask real questions, encounter Jesus and build a faith that becomes their own.", href: "/students", cta: "Explore Vineyard Students", external: false },
  { id: "celebrate-recovery", group: "recovery", label: "Recovery · Mondays 6:30 PM", title: "Celebrate Recovery", copy: "A biblical and balanced 12-step program that helps us overcome any hurt, hang-up or habit, and experience more of God’s hope, healing and freedom.", href: "/ministries/celebrate-recovery", cta: "Explore Celebrate Recovery", external: false },
  { id: "alcoholics-anonymous", group: "recovery", label: "Recovery · Mondays 7:30 PM", title: "Alcoholics Anonymous", copy: "A fellowship of people who come together to solve their drinking problem. Free, and open to anyone who wants to do something about their drinking.", href: "/ministries/alcoholics-anonymous", cta: "Explore A.A.", external: false },
  { id: "mens-healthy-sexuality", group: "recovery", label: "Recovery · For Men", title: "Men’s Healthy Sexuality", copy: "Men who have chosen to bond together to live connected, live sober and live free of compulsive sexual behaviors and their impacts.", href: "/ministries/mens-healthy-sexuality", cta: "Explore MHS", external: false },
  { id: "griefshare", group: "recovery", label: "Support · Saturdays 1:00 PM", title: "GriefShare", copy: "A 13-week, faith-based support group for anyone grieving the loss of a friend, family member, spouse or grandparent.", href: "/ministries/griefshare", cta: "Explore GriefShare", external: false },
  { id: "vineyard-freedom", group: "recovery", label: "Healing + Freedom", title: "Vineyard Freedom", copy: "Experience the freedom, healing and restoration Jesus offers. Through prayer, biblical truth and the leading of the Holy Spirit, we walk alongside those seeking breakthrough from spiritual oppression, generational cycles, emotional wounds, trauma and strongholds.", href: "/ministries/vineyard-freedom", cta: "Explore Vineyard Freedom", external: false },
  { id: "men", group: "life", label: "Men", title: "Men’s Ministry", copy: "Connection, discipleship and practical brotherhood.", href: contactTopicLink("mens-ministry"), cta: "Connect With Men’s Ministry", external: false },
  { id: "women", group: "life", label: "Women", title: "Women’s Ministry", copy: "Gatherings and relationships that create room for women to be encouraged, grow in faith and follow Jesus together.", href: eventsUrl, cta: "See Women’s Events", external: false },
  { id: "vinedresser", group: "mission", label: "Foster + Kinship", title: "The Vinedresser", copy: "Free children’s clothing, diapers and practical support for foster and kinship families in Northern Kentucky, helping to ease the costs of caring for kids.", href: vinedresserUrl, cta: "Visit The Vinedresser", external: true },
  { id: "merp", group: "mission", label: "Global Mission", title: "MERP", copy: "The Middle Eastern Refugee Partnership: making disciples who make disciples among people on the move through church planting, local leadership and humanitarian relief.", href: "/merp", cta: "Explore MERP", external: false },
  { id: "latvia", group: "mission", label: "Global Mission", title: "Latvia", copy: "Explore Latvia ministry updates and connect through Facebook.", href: latviaFacebookUrl, cta: "Visit Latvia On Facebook", external: true },
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
          <a className="ministries-recovery-prompt" href="#recovery-groups">
            <span>Looking for a recovery or support group?</span>
            <strong>Celebrate Recovery, A.A., Men’s Healthy Sexuality, GriefShare and Vineyard Freedom</strong>
            <b>See Recovery Groups <i aria-hidden="true">↓</i></b>
          </a>
          <p>Not sure where to begin? Tell us who you are hoping to connect with, and a real person will help you find the right place.</p>
          <a className="text-link light" href={contactTopicLink("find-a-ministry")}>Ask For Help <span aria-hidden="true">↗</span></a>
        </aside>
      </section>

      <nav className="ministries-jump" id="ministry-directory" aria-label="Jump to a group of ministries">
        <span>Jump to</span>
        {ministryGroups.map((group) => (
          <a key={group.id} href={`#${group.anchor}`} className={group.id === "recovery" ? "is-recovery" : undefined}>{group.title}</a>
        ))}
      </nav>

      {ministryGroups.map((group, groupIndex) => (
        <section className="ministries-group" id={group.anchor} key={group.id} aria-labelledby={`${group.anchor}-title`}>
          <header className="ministries-group-heading">
            <span className="section-index">0{groupIndex + 1}</span>
            <h2 id={`${group.anchor}-title`}>{group.title}</h2>
            <p>{group.intro}</p>
          </header>
          <div className="ministries-grid">
            {ministries.filter((ministry) => ministry.group === group.id).map((ministry) => (
              <article className={`ministry-card ${ministry.id === "house-groups" ? "ministry-card-featured" : ""}`} id={ministry.id} key={ministry.id}>
                <p className="eyebrow">{ministry.label}</p>
                <h3>{ministry.title}</h3>
                <p>{ministry.copy}</p>
                <a href={ministry.href} target={ministry.external ? "_blank" : undefined} rel={ministry.external ? "noreferrer" : undefined}>{ministry.cta} <span aria-hidden="true">{ministry.external ? "↗" : "→"}</span></a>
              </article>
            ))}
          </div>
        </section>
      ))}

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
