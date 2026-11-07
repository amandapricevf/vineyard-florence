import type { ReactNode } from "react";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { address } from "../site-data";

/** The recovery groups that meet at Vineyard Florence, each with its own page. */
export const recoveryGroups = [
  { slug: "celebrate-recovery", title: "Celebrate Recovery", when: "Mondays · 6:30–8:30 PM" },
  { slug: "alcoholics-anonymous", title: "Alcoholics Anonymous (A.A.)", when: "Mondays · 7:30 PM" },
  { slug: "mens-healthy-sexuality", title: "Men’s Healthy Sexuality", when: "Email to connect" },
  { slug: "griefshare", title: "GriefShare", when: "Saturdays · 1:00–3:00 PM" },
] as const;

export type RecoverySlug = (typeof recoveryGroups)[number]["slug"];

export const churchLocation = `${address.name} · ${address.street}, ${address.city}, ${address.state} ${address.zip}`;

/** Shared frame for a recovery group page: hero, the page's own sections, then links to the other groups. */
export function RecoveryGroupPage({ slug, eyebrow, title, intro, children }: {
  slug: RecoverySlug;
  eyebrow: string;
  title: [string, string];
  intro: string;
  children: ReactNode;
}) {
  const others = recoveryGroups.filter((group) => group.slug !== slug);
  return (
    <main className="interior-page kids-form-page info-page recovery-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title[0]}<br /><em>{title[1]}</em></h1>
        <p>{intro}</p>
        <Link className="text-link light" href="/ministries#recovery-groups">← Back To Recovery Groups</Link>
      </section>
      {children}
      <section className="kids-form-shell info-shell-alt">
        <div className="kids-form-heading"><span className="section-index">Recovery At VF</span><h2>Other Recovery<br /><em>Groups.</em></h2></div>
        <div className="info-body">
          <p>Each of these groups meets at Vineyard Florence. You are welcome in any of them.</p>
          <ul className="recovery-others">
            {others.map((group) => (
              <li key={group.slug}><Link href={`/ministries/${group.slug}`}><strong>{group.title}</strong><span>{group.when}</span><b aria-hidden="true">→</b></Link></li>
            ))}
          </ul>
        </div>
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
