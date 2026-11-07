import type { Metadata } from "next";
import { alcoholicsAnonymousUrl, directionsUrl } from "../../site-data";
import { RecoveryGroupPage, churchLocation } from "../recovery-groups";

export const metadata: Metadata = {
  title: "Alcoholics Anonymous (A.A.) | Vineyard Florence Church",
  description: "An A.A. meeting is hosted at Vineyard Florence on Mondays at 7:30 PM. Free, and open to anyone who wants to do something about their drinking.",
};

export default function AlcoholicsAnonymousPage() {
  return (
    <RecoveryGroupPage
      slug="alcoholics-anonymous"
      eyebrow="Recovery · Mondays At 7:30 PM"
      title={["Alcoholics", "Anonymous."]}
      intro="A fellowship of people who come together to solve their drinking problem. It doesn’t cost anything to attend, and membership is open to anyone who wants to do something about their drinking."
    >
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">01 — About A.A.</span><h2>Open To<br /><em>Anyone.</em></h2></div>
        <div className="info-body">
          <dl className="info-details">
            <div><dt>When</dt><dd>Mondays · 7:30 PM</dd></div>
            <div><dt>Where</dt><dd>{churchLocation}</dd></div>
            <div><dt>Cost</dt><dd>Free. No age or education requirements.</dd></div>
          </dl>
          <p>Alcoholics Anonymous is a fellowship of people who come together to solve their drinking problem. It doesn’t cost anything to attend A.A. meetings. There are no age or education requirements to participate. Membership is open to anyone who wants to do something about their drinking problem.</p>
          <p className="info-callout">A.A.’s primary purpose is to help alcoholics to achieve sobriety.</p>
          <h3>The Twelve Steps</h3>
          <p>A.A.’s Twelve Steps are a set of spiritual principles. When practiced as a way of life, they can expel the obsession to drink and enable the sufferer to recover from alcoholism.</p>
          <h3>The Twelve Traditions</h3>
          <p>The Twelve Traditions apply to A.A. as a whole. They outline how A.A. maintains its unity and relates itself to the world around it.</p>
          <h3>The Big Book</h3>
          <p>The book <em>Alcoholics Anonymous</em> describes the A.A. program of recovery. It also contains stories written by the co-founders and stories from a wide range of members who have found recovery in A.A.</p>
          <div className="info-actions">
            <a className="button button-dark" href={directionsUrl} target="_blank" rel="noreferrer">Get Directions <span aria-hidden="true">↗</span></a>
            <a className="text-link" href={alcoholicsAnonymousUrl} target="_blank" rel="noreferrer">Learn More At AA.org <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </RecoveryGroupPage>
  );
}
