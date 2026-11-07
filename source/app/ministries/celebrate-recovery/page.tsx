import type { Metadata } from "next";
import { contactTopicLink, directionsUrl } from "../../site-data";
import { RecoveryGroupPage, churchLocation } from "../recovery-groups";

export const metadata: Metadata = {
  title: "Celebrate Recovery | Vineyard Florence Church",
  description: "A biblical and balanced 12-step program for any hurt, hang-up or habit. Mondays, 6:30–8:30 PM at Vineyard Florence.",
};

export default function CelebrateRecoveryPage() {
  return (
    <RecoveryGroupPage
      slug="celebrate-recovery"
      eyebrow="Recovery · Mondays"
      title={["Celebrate", "Recovery."]}
      intro="A biblical and balanced 12-step program that helps us overcome any hurt, hang-up or habit, and experience more of God’s hope, healing and freedom."
    >
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">01 — Is It For You?</span><h2>Hope, Healing<br /><em>And Freedom.</em></h2></div>
        <div className="info-body">
          <img src="/images/recovery/celebrate-recovery-worship.webp" alt="Celebrate Recovery large group gathered for worship at Vineyard Florence" width={800} height={600} loading="lazy" decoding="async" />
          <h3>Is Celebrate Recovery for you?</h3>
          <ul className="recovery-questions">
            <li>Are there things I do that hurt others?</li>
            <li>Is there something in my life I wish I could live without?</li>
            <li>Do I have a painful hurt, habit or hang-up from which I need to be freed?</li>
          </ul>
          <p>Celebrate Recovery is a biblical and balanced 12-step program that helps us overcome any hurt, hang-up or habit (such as low self-esteem, need to control, depression, fear, anger, perfectionism, broken relationships, abuse, pornography, dependency on alcohol or drugs, and much more).</p>
          <p>The purpose of Celebrate Recovery is to help us experience more of God’s hope, healing and freedom in our lives. By working through the 12 steps and 8 biblical principles with others who can relate, we grow spiritually and are freed from what is weighing us down and holding us back. We look forward to celebrating recovery with you!</p>
        </div>
      </section>

      <section className="kids-form-shell info-shell-alt">
        <div className="kids-form-heading"><span className="section-index">02 — Meeting Time</span><h2>Take Off<br /><em>The Mask.</em></h2></div>
        <div className="info-body">
          <dl className="info-details">
            <div><dt>When</dt><dd>Monday evenings · 6:30–8:30 PM (doors open at 6:00 PM)</dd></div>
            <div><dt>Where</dt><dd>{churchLocation}</dd></div>
            <div><dt>Leader</dt><dd>Amber Brown · <a href="mailto:amber.brown@vineyardflorence.church">amber.brown@vineyardflorence.church</a></dd></div>
          </dl>
          <p>Weekly meetings provide a safe place where you can take off your “mask.” You decide when and how much you participate. Men and women are divided into smaller groups after the large group time. Confidentiality and anonymity are strictly maintained.</p>
          <p>If you have any questions or want to let us know you are coming, email our CR leader, Amber Brown, or send us a message.</p>
          <div className="info-actions">
            <a className="button button-dark" href={contactTopicLink("celebrate-recovery")}>Let Us Know You’re Coming <span aria-hidden="true">→</span></a>
            <a className="text-link" href={directionsUrl} target="_blank" rel="noreferrer">Get Directions <span aria-hidden="true">↗</span></a>
          </div>
          <div className="recovery-gallery">
            <img src="/images/recovery/celebrate-recovery-outdoor.webp" alt="Celebrate Recovery group meeting outdoors on benches among the trees" width={1200} height={900} loading="lazy" decoding="async" />
            <img src="/images/recovery/celebrate-recovery-picnic.webp" alt="Celebrate Recovery picnic under a shelter with balloons" width={1200} height={900} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </RecoveryGroupPage>
  );
}
