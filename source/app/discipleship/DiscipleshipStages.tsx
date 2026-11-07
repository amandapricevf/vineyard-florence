"use client";

import { useState } from "react";
import {
  churchCenterGroupsUrl,
  contactFormLink,
  contactTopicLink,
  houseGroupInterestUrl,
  bibleReadingPlanUrl,
} from "../site-data";

type StageIcon = "seeker" | "believer" | "follower" | "disciple";

type Stage = {
  id: StageIcon;
  label: string;
  title: string;
  marker: string;
  traits: string[];
  nextSteps: { label: string; href: string; external?: boolean }[];
};


const stages: Stage[] = [
  {
    id: "seeker",
    label: "Not Yet A Christian",
    title: "Seeker",
    marker: "01",
    traits: ["Has questions about God, Jesus and religion", "Still seeking answers to those questions"],
    nextSteps: [
      { label: "Keep Showing Up", href: "/#what-to-expect" },
      { label: "Ask About An Alpha Course", href: contactTopicLink("alpha") },
      { label: "Ask About VF Foundations", href: contactTopicLink("vf-foundations") },
      { label: "Explore Celebrate Recovery", href: "/ministries/celebrate-recovery" },
      { label: "Explore Men’s Healthy Sexuality", href: "/ministries/mens-healthy-sexuality" },
      { label: "Visit A House Group", href: churchCenterGroupsUrl, external: true },
    ],
  },
  {
    id: "believer",
    label: "Trust Jesus & Get Baptized",
    title: "Believer",
    marker: "02",
    traits: ["Believes in Jesus Christ", "Baptized", "Born again"],
    nextSteps: [
      { label: "Ask About VF Foundations", href: contactTopicLink("vf-foundations") },
      { label: "Join A House Group", href: houseGroupInterestUrl },
      { label: "Follow The Daily Bible Reading Plan", href: bibleReadingPlanUrl, external: true },
      { label: "Serve And Become A Ministry Partner", href: "/ministries" },
      { label: "Give Your Time, Talent And Treasure", href: contactFormLink("Give Your Time, Talent And Treasure") },
      { label: "Explore Prayer Training", href: "/prayer" },
    ],
  },
  {
    id: "follower",
    label: "Become A Ministry Partner",
    title: "Follower",
    marker: "03",
    traits: ["Follows Jesus Christ", "Takes risks in faith", "Serves regularly", "Growing in faith", "Shares faith with others"],
    nextSteps: [
      { label: "Help Lead A House Group Or Prayer Meeting", href: "/discipleship#leader-path" },
      { label: "Ask About Leader Training", href: contactTopicLink("house-group-leader-training") },
      { label: "Share Life And Resources", href: "/discipleship#resources" },
      { label: "Explore Vineyard Freedom", href: "/ministries/vineyard-freedom" },
    ],
  },
  {
    id: "disciple",
    label: "Complete Leader Training",
    title: "Disciple",
    marker: "04",
    traits: ["Disciple of Jesus Christ", "Making new disciples"],
    nextSteps: [
      { label: "Launch Or Lead A House Group", href: "/discipleship#leader-path" },
      { label: "Ask About Vineyard Leadership Essentials", href: contactTopicLink("leadership-essentials") },
      { label: "Lead A Ministry", href: "/ministries" },
      { label: "Explore Pastoring, Eldership Or Church Planting", href: contactTopicLink("pastoring-eldership-church-planting") },
    ],
  },
];

function StageSymbol({ kind }: { kind: StageIcon }) {
  if (kind === "seeker") return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="22" cy="16" r="7" /><path d="M11 38c0-8 5-12 12-12 4 0 7 1 9 4" /><path d="M33 32c0-3 2-5 5-5s5 2 5 5c0 2-1 3-3 5-1 1-2 2-2 4" /><circle cx="38" cy="45" r="1" fill="currentColor" stroke="none" /></svg>;
  if (kind === "believer") return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 4v28M18 11h12M13 26v15M35 26v15M24 32l-9 9M24 32l9 9" /></svg>;
  if (kind === "follower") return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M4 19c5-5 8 5 13 0s8 5 14 0 8 5 13 0M4 29c5-5 8 5 13 0s8 5 14 0 8 5 13 0" /></svg>;
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M6 24h34M28 12l12 12-12 12" /></svg>;
}

export function DiscipleshipStages() {
  const [selected, setSelected] = useState<StageIcon>("seeker");
  const current = stages.find((stage) => stage.id === selected)!;

  return (
    <section className="discipleship-stages" id="pathway">
      <div className="discipleship-stages-heading">
        <span className="section-index">02 — Your Next Step</span>
        <div><p className="eyebrow">A Path With A Place For You</p><h2>Where Are You<br /><em>Right Now?</em></h2></div>
        <p>Choose the stage that best describes where you are. There is no pressure to have it all figured out. Select a card to see practical next steps and the places at VF that can help you move forward.</p>
      </div>

      <div className="discipleship-stage-grid" aria-label="Explore discipleship stages">
        {stages.map((stage) => (
          <button
            key={stage.id}
            type="button"
            className={`discipleship-stage-card discipleship-stage-${stage.id}${selected === stage.id ? " is-selected" : ""}`}
            aria-pressed={selected === stage.id}
            aria-controls="discipleship-stage-next"
            onClick={() => setSelected(stage.id)}
          >
            <span className="discipleship-stage-icon"><StageSymbol kind={stage.id} /></span>
            <span className="discipleship-stage-label">{stage.label}</span>
            <strong>{stage.title}</strong>
            <span className="discipleship-stage-traits">
              {stage.traits.map((trait) => <span key={trait}>{trait}</span>)}
            </span>
            <span className="discipleship-stage-prompt">See {stage.title} Next Steps <b aria-hidden="true">↗</b></span>
          </button>
        ))}
      </div>

      <div className="discipleship-stage-detail" id="discipleship-stage-next" role="region" aria-label={`${current.title} next steps`} aria-live="polite">
        <div><span>{current.marker} / 04 — {current.title}</span><h3>One Step<br /><em>At A Time.</em></h3><p>Choose the next step that fits your life today. Links to VF pages stay here; external resources open in a new tab.</p></div>
        <div className="discipleship-stage-links">
          <p className="eyebrow">Next Steps For A {current.title}</p>
          {current.nextSteps.map((step) => (
            <a key={step.label} href={step.href} target={step.external ? "_blank" : undefined} rel={step.external ? "noreferrer" : undefined}>
              <span>{step.label}</span><b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
