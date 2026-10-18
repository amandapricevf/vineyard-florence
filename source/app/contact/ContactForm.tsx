"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { findContactTopic, generalContactFormName } from "./contact-topics";

type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

const initialStatus: FormStatus = { kind: "idle", message: "" };

const subscribeToNothing = () => () => {};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  // Links across the site open this page with ?topic=… (one Netlify form per
  // topic, so each notifies the right person) or, for general questions,
  // ?subject=…. The page is statically exported, so the URL is read in the
  // browser; the server render is the general form.
  const search = useSyncExternalStore(subscribeToNothing, () => window.location.search, () => "");
  const params = new URLSearchParams(search);
  const topic = findContactTopic(params.get("topic"));
  const suggestedSubject = params.get("subject")?.slice(0, 200) ?? "";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending", message: "Sending your message…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({ message: "We could not send the form." }));
      if (!response.ok) throw new Error(result.message || "We could not send the form.");
      form.reset();
      setStatus({ kind: "success", message: "Thank you! Your message was sent and someone from our team will be in touch." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return (
    <form className="kids-form contact-form" onSubmit={submit}>
      <input className="kids-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="formName" value={topic?.formName ?? generalContactFormName} />

      <fieldset>
        <legend>Your Information</legend>
        <div className="kids-form-grid">
          <label>Your Name<input name="name" autoComplete="name" required maxLength={160} /></label>
          <label>Phone Number<input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
          <label className="kids-form-wide">Email Address<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Your Message</legend>
        <div className="kids-form-grid">
          {topic ? (
            <p className="kids-form-wide contact-topic">
              <span>Topic</span>{topic.subject}
              <input type="hidden" name="subject" value={topic.subject} />
            </p>
          ) : (
            <label className="kids-form-wide">Subject<input key={suggestedSubject} name="subject" maxLength={200} defaultValue={suggestedSubject} placeholder="What is this about?" /></label>
          )}
          <label className="kids-form-wide">How Can We Help?<textarea name="message" rows={8} required maxLength={4000} placeholder="Ask a question or tell us what you need." /></label>
        </div>
      </fieldset>

      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Send Message <span aria-hidden="true">→</span></button>
      {status.kind !== "idle" ? <p className={`kids-form-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
