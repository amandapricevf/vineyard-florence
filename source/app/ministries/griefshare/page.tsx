import type { Metadata } from "next";
import { contactTopicLink } from "../../site-data";
import { RecoveryGroupPage, churchLocation } from "../recovery-groups";

export const metadata: Metadata = {
  title: "GriefShare | Vineyard Florence Church",
  description: "A 13-week, faith-based support group for anyone grieving the loss of a friend or family member. Saturdays, 1:00–3:00 PM at Vineyard Florence.",
};

export default function GriefSharePage() {
  return (
    <RecoveryGroupPage
      slug="griefshare"
      eyebrow="Support Group · Saturdays"
      title={["GriefShare.", "Healing Together."]}
      intro="A compassionate, faith-based space where we come together to navigate the journey of loss and healing."
    >
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">01 — About The Group</span><h2>Come As<br /><em>You Are.</em></h2></div>
        <div className="info-body">
          <p>GriefShare is a 13-week support group that meets weekly at Vineyard Florence. It provides a compassionate, faith-based space where we can come together to navigate the journey of loss and healing. Whether you’ve lost a friend, family member, spouse or grandparent, this group offers support and understanding as we process grief together.</p>
          <p>Come as you are to share, heal and find hope in a safe, supportive environment. Each session is designed to help us see the ways the Lord cares for us amidst life’s challenges. We look forward to walking this journey of healing with you.</p>
          <dl className="info-details">
            <div><dt>When</dt><dd>Saturdays · 1:00–3:00 PM, for 13 weeks</dd></div>
            <div><dt>Where</dt><dd>{churchLocation}</dd></div>
            <div><dt>Cost</dt><dd>$20 per person, covering the cost of the workbook</dd></div>
            <div><dt>Contact</dt><dd>Carol Jenkins</dd></div>
          </dl>
          <p>For the next session’s start date, to register, or with any questions, contact Carol Jenkins.</p>
          <div className="info-actions">
            <a className="button button-dark" href={contactTopicLink("griefshare")}>Contact Carol To Register <span aria-hidden="true">→</span></a>
            <a className="text-link" href="https://www.griefshare.org/" target="_blank" rel="noreferrer">Learn More At GriefShare.org <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </RecoveryGroupPage>
  );
}
