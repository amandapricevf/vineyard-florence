import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { TriadMark } from "../components/TriadMark";
import {
  churchCenterEventsUrl,
  churchCenterGivingUrl,
  churchCenterGroupsUrl,
  churchCenterHomeUrl,
  churchCenterSignInUrl,
  contactEmail,
  prayerRequestUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Next Steps | Vineyard Florence Church",
  description: "Take one clear next step into discipleship at Vineyard Florence—find a House Group, visit, request prayer, explore events or give.",
};

const nextSteps = [
  { mark: 2, label: "Belong", title: "Find A House Group", copy: "Share meals, build real friendships and practice following Jesus with people who know your name.", href: churchCenterGroupsUrl, external: true, cta: "Explore Open Groups" },
  { mark: 1, label: "Start Here", title: "Plan Your First Sunday", copy: "Know when to arrive, what happens, where kids go and how long each service lasts.", href: "/#what-to-expect", external: false, cta: "Plan A Visit" },
  { mark: 3, label: "Coming Up", title: "Explore Events", copy: "Find courses, baptisms, gatherings, serving opportunities and the next place to jump in.", href: churchCenterEventsUrl, external: true, cta: "See Church Center Events" },
  { mark: 1, label: "Care", title: "Request Prayer", copy: "Tell our prayer team what is happening and let people stand with you in compassionate prayer.", href: prayerRequestUrl, external: false, cta: "Share A Prayer Request" },
  { mark: 2, label: "Generosity", title: "Give Simply And Securely", copy: "Support the day-to-day, local, regional, and global impact of VF.", href: churchCenterGivingUrl, external: true, cta: "Give Online" },
  { mark: 3, label: "Your Account", title: "Open Church Center App", copy: "Sign in to manage registrations, giving and the ways you are connected at Vineyard Florence.", href: churchCenterSignInUrl, external: true, cta: "Sign In" },
] as const;

export default function ConnectPage() {
  return (
    <main className="interior-page connect-page" id="top">
      <InteriorHeader />

      <section className="connect-hero">
        <div className="connect-hero-triad" aria-hidden="true"><i /><i /><i /></div>
        <div className="interior-hero-copy">
          <p className="eyebrow light">A Pathway Into Discipleship</p>
          <h1>Gather. Grow.<br /><em>Go Together.</em></h1>
          <p>Sundays are the front door. House Groups are the primary place we build friendships, receive care and practice following Jesus together.</p>
          <a className="button button-light" href="#next-steps">Find Your Next Step <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="connect-intro">
        <span className="section-index">01 — Your Discipleship Pathway</span>
        <div><p className="eyebrow">Start With Community</p><h2>Find Your People.<br /><em>Follow Jesus Together.</em></h2></div>
        <p>You will always know where a button is taking you. Some steps continue securely in Vineyard Florence Church Center, where registrations, groups and giving already live.</p>
      </section>

      <section className="connect-step-grid" id="next-steps">
        {nextSteps.map((step) => {
          const content = <><TriadMark index={step.mark as 1 | 2 | 3} label={step.label} /><span>{step.label}</span><h2>{step.title}</h2><p>{step.copy}</p><strong>{step.cta} <b aria-hidden="true">↗</b></strong></>;
          const className = step.title === "Find A House Group" ? "connect-step-featured" : undefined;
          return step.external ? <a className={className} key={step.title} href={step.href} target="_blank" rel="noreferrer">{content}</a> : <Link className={className} key={step.title} href={step.href}>{content}</Link>;
        })}
      </section>

      <section className="connect-church-center">
        <div><p className="eyebrow light">One Familiar Place For The Details</p><h2>Church Center,<br /><em>Made Simple.</em></h2></div>
        <div className="connect-church-center-copy"><p>Church Center is Vineyard Florence&apos;s secure home for groups, registrations, giving and your account. You do not need it to explore the website or visit on Sunday.</p><a className="button button-light" href={churchCenterHomeUrl} target="_blank" rel="noreferrer">Open Church Center App <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="connect-ministries-link">
        <div><p className="eyebrow light">Kids · Students · Recovery · Groups · Men · Women</p><h2>Looking For A<br /><em>Ministry?</em></h2></div>
        <p>Use one clear directory to find Vineyard Kids, Students, House Groups, Celebrate Recovery, Men&apos;s Healthy Sexuality, Men&apos;s Ministry and Women&apos;s Ministry.</p>
        <Link className="button button-light" href="/ministries">Explore Ministries <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="connect-human" id="go">
        <div><p className="eyebrow">Still Not Sure?</p><h2>People Before<br /><em>Platforms.</em></h2></div>
        <p>If none of these buttons quite fits, tell us what you are looking for. A real person will help you find the right next step—no maze of menus required.</p>
        <a className="button button-dark" href={`mailto:${contactEmail}?subject=Help%20Me%20Find%20My%20Next%20Step`}>Start A Conversation <span aria-hidden="true">↗</span></a>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
