"use client";

import { useState } from "react";

const hexagonSteps = [
  {
    title: "Father",
    prayer: "Holy, Hallowed And Honored Is Your Name.",
    prompt: "Begin with who God is. Name what you know to be true about His character and thank Him for welcoming you as His child.",
  },
  {
    title: "Kingdom",
    prayer: "Your Kingdom Come. Your Will Be Done In And Through Us.",
    prompt: "Ask where God wants His loving rule to become more visible in your life, your relationships and the world around you.",
  },
  {
    title: "Provision",
    prayer: "Take Care Of Our Needs.",
    prompt: "Bring today’s real needs to God. Pray for daily provision, healing, wisdom and the needs of others.",
  },
  {
    title: "Forgiveness",
    prayer: "Forgive Our Sins And Help Us Forgive Others.",
    prompt: "Receive God’s mercy honestly. Ask Him to show you anyone you need to forgive or approach with humility.",
  },
  {
    title: "Guidance",
    prayer: "Help Us Hear Your Voice.",
    prompt: "Pause and listen. Ask the Holy Spirit to lead your choices and keep your next step aligned with Jesus.",
  },
  {
    title: "Protection",
    prayer: "Deliver Us From Evil.",
    prompt: "Ask God to protect you from the enemy, from harm within yourself and from harm caused by others. Place your trust in His care.",
  },
] as const;

export function PrayerHexagon() {
  const [activeStep, setActiveStep] = useState(0);
  const active = hexagonSteps[activeStep];

  return (
    <div className="prayer-hexagon-tool">
      <div className="prayer-hexagon-choice-area">
        <div className="prayer-hexagon-instruction">
          <strong>Select A Hexagon</strong>
          <span>Each selection reveals a different prayer prompt.</span>
        </div>
        <div className="prayer-hexagon" aria-label="Interactive Disciple's Prayer Pathway">
          <div className="prayer-hexagon-center" aria-hidden="true">
            <span>The Disciple&apos;s</span>
            <strong>Prayer</strong>
            <span>Pathway</span>
          </div>
          {hexagonSteps.map((step, index) => (
            <button
              className={activeStep === index ? "is-active" : ""}
              type="button"
              key={step.title}
              onClick={() => setActiveStep(index)}
              aria-label={`Show the ${step.title} prayer prompt`}
              aria-pressed={activeStep === index}
              aria-controls="prayer-hexagon-detail"
            >
              <small>0{index + 1}</small>
              <strong>{step.title}</strong>
              <span className="prayer-hexagon-choice">{activeStep === index ? "Now Showing" : "Select"}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="prayer-hexagon-detail" id="prayer-hexagon-detail" aria-live="polite">
        <div className="prayer-hexagon-detail-copy" key={active.title}>
          <div className="prayer-hexagon-detail-status"><strong>Selected Prayer Prompt</strong><span>0{activeStep + 1} Of 06</span></div>
          <p className="eyebrow">{active.title}</p>
          <h3>{active.prayer}</h3>
          <p>{active.prompt}</p>
        </div>
      </div>
    </div>
  );
}
