import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../../components/InteriorChrome";
import { houseGroupInterestUrl, vineyardFreedomIntakeUrl, womenOfWarfareUrl } from "../../site-data";

export const metadata: Metadata = {
  title: "Vineyard Freedom | Vineyard Florence Church",
  description: "Experience the freedom, healing and restoration Jesus offers through prayer, biblical truth and the leading of the Holy Spirit. Start with the intake questionnaire.",
};

const freedomEmail = "mailto:vineyardfreedom@vineyardflorence.church?bcc=amanda.price%40vineyardflorence.church";
const pdf = (name: string) => `/files/vineyard-freedom/${name}.pdf`;

const steps = [
  "Fill out the intake questionnaire if you want to take the next step in experiencing Jesus’ healing, freedom and deliverance.",
  "Once we receive your questionnaire, we will assign a ministry team to you, and they will reach out with next steps.",
  "The ministry team will read, fast and pray through your questionnaire and make notes on anything the Holy Spirit highlights to them. Then they will reach out to you to schedule a prayer session.",
  "The ministry team will follow up with you within a week of your prayer session, with any resources to help you continue to walk in freedom: referrals to counseling, daily declarations, prayer, how to renew your mind, addiction resources, marriage resources, book recommendations and more.",
];

type Resource = { title: string; note: string; href: string; external?: boolean };

const resourceGroups: { heading: string; intro: string; items: Resource[] }[] = [
  {
    heading: "Staying Free",
    intro: "We believe that walking in community with others helps us identify our blind spots and continue walking in freedom. These resources point you toward connecting with others as you follow Jesus together.",
    items: [
      { title: "Staying Free", note: "Freedom aftercare guide · PDF", href: pdf("Freedom-Aftercare"), external: true },
      { title: "House Groups", note: "Find a group to walk with", href: houseGroupInterestUrl },
      { title: "Women of Warfare Ministries", note: "Facebook", href: womenOfWarfareUrl, external: true },
    ],
  },
  {
    heading: "Counseling Services",
    intro: "Sometimes ongoing healing is needed to continue walking in freedom. These counseling services and support are here for you.",
    items: [
      { title: "Eve Center", note: "evecenter.org", href: "https://evecenter.org/", external: true },
      { title: "Hope Springs Center", note: "hopespringscenter.org", href: "https://www.hopespringscenter.org/kayellen-mckenzie", external: true },
      { title: "Counseling Alliance", note: "counselingalliance.com", href: "https://counselingalliance.com/", external: true },
      { title: "Christ-Centered Counseling", note: "Christian counseling", href: "https://christcenteredcounseling.clientsecure.me/", external: true },
      { title: "Recovery Groups", note: "Celebrate Recovery, A.A., MHS and GriefShare at VF", href: "/ministries#recovery-groups" },
      { title: "CareNet", note: "carenetnky.org", href: "https://carenetnky.org/", external: true },
    ],
  },
  {
    heading: "Books",
    intro: "These books are helpful for continuing inner healing and deliverance work.",
    items: [
      { title: "Inner Healing and Deliverance Handbook", note: "Jenny Eivaz", href: "https://a.co/d/04twERrq", external: true },
      { title: "Heal to Hear: Healing Your Soul to Hear the Voice of God", note: "Natalie Breckenridge", href: "https://a.co/d/00plNCRx", external: true },
    ],
  },
  {
    heading: "Affirmations & Self-Declarations",
    intro: "Intentional statements you can speak out loud or to yourself to reinforce truth, identity and direction.",
    items: [
      { title: "Authority In Christ", note: "Declarations · PDF", href: pdf("Authority-In-Christ-Declarations"), external: true },
      { title: "Scripture for Depression & Heaviness", note: "Scriptures · PDF", href: pdf("Scriptures-for-Depression-Heaviness"), external: true },
      { title: "Renewing Your Mind", note: "Biblical truths · PDF", href: pdf("Biblical-Truths-About-Renewing-Your-Mind"), external: true },
      { title: "Our Inheritance In Christ", note: "Biblical truths · PDF", href: pdf("Biblical-Truths-About-Our-Inheritance-in-Christ"), external: true },
      { title: "Warfare Against the Enemy", note: "Prayers · PDF", href: pdf("Warfare-Prayers-Against-the-Enemy"), external: true },
      { title: "Identity In Christ", note: "Declarations · PDF", href: pdf("Identity-In-Christ-Declarations"), external: true },
    ],
  },
];

export default function VineyardFreedomPage() {
  return (
    <main className="interior-page kids-form-page info-page recovery-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero">
        <p className="eyebrow light">Healing + Freedom</p>
        <h1>Vineyard<br /><em>Freedom.</em></h1>
        <p>Breaking bondages. Setting captives free. Experience the freedom, healing and restoration that Jesus offers us.</p>
        <Link className="text-link light" href="/ministries#vineyard-freedom">← Back To Ministries</Link>
      </section>

      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">01 — About</span><h2>Freedom, Identity<br /><em>And Wholeness.</em></h2></div>
        <div className="info-body">
          <img src="/images/ministries/vineyard-freedom-logo.webp" alt="Vineyard Freedom: Breaking bondages. Setting captives free." width={1000} height={667} loading="lazy" decoding="async" />
          <p>Vineyard Freedom is designed to help you experience the freedom, healing and restoration that Jesus offers us. Through prayer, biblical truth and the leading of the Holy Spirit, we walk alongside those seeking breakthrough from spiritual oppression, generational cycles, emotional wounds, trauma and strongholds.</p>
          <p>Completing the intake questionnaire helps our ministry team prayerfully prepare to serve you with care, wisdom, humility and confidentiality.</p>
          <p className="info-callout">This process is not about condemnation, but about freedom, identity and wholeness in Christ. If you are ready to pursue deeper healing and walk in freedom, we are honored to walk this journey with you.</p>
        </div>
      </section>

      <section className="kids-form-shell info-shell-alt">
        <div className="kids-form-heading"><span className="section-index">02 — The Process</span><h2>Your Next<br /><em>Step.</em></h2></div>
        <div className="info-body">
          <ol className="freedom-steps">
            {steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p>If you are ready to experience the freedom Jesus has for you, start with the intake questionnaire.</p>
          <div className="info-actions">
            <a className="button button-dark" href={vineyardFreedomIntakeUrl} target="_blank" rel="noreferrer">Start The Intake Questionnaire <span aria-hidden="true">↗</span></a>
          </div>
          <p className="freedom-contact">If you have any questions, email <a href={freedomEmail}>VineyardFreedom@vineyardflorence.church</a>.</p>
        </div>
      </section>

      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">03 — After Care</span><h2>Keep Walking<br /><em>In Freedom.</em></h2></div>
        <div className="info-body">
          {resourceGroups.map((group) => (
            <div className="freedom-resource-group" key={group.heading}>
              <h3>{group.heading}</h3>
              <p>{group.intro}</p>
              <ul className="recovery-others">
                {group.items.map((item) => (
                  <li key={item.title}>
                    {item.external
                      ? <a href={item.href} target="_blank" rel="noreferrer"><strong>{item.title}</strong><span>{item.note}</span><b aria-hidden="true">↗</b></a>
                      : <Link href={item.href}><strong>{item.title}</strong><span>{item.note}</span><b aria-hidden="true">→</b></Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
