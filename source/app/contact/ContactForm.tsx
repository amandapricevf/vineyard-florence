"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

const initialStatus: FormStatus = { kind: "idle", message: "" };

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);
  const subjectRef = useRef<HTMLInputElement>(null);

  // Links across the site open this form with ?subject=… so the team knows what
  // the message is about. Read it after mount: the page is statically exported.
  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get("subject");
    if (subject && subjectRef.current) subjectRef.current.value = subject.slice(0, 200);
  }, []);

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
      // reset() empties the subject; keep the one the visitor arrived with.
      if (subjectRef.current) subjectRef.current.value = String(payload.subject ?? "");
      setStatus({ kind: "success", message: "Thank you! Your message was sent and someone from our team will be in touch." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return (
    <form className="kids-form contact-form" onSubmit={submit}>
      <input className="kids-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

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
          <label className="kids-form-wide">Subject<input name="subject" maxLength={200} ref={subjectRef} placeholder="What is this about?" /></label>
          <label className="kids-form-wide">How Can We Help?<textarea name="message" rows={8} required maxLength={4000} placeholder="Ask a question or tell us what you need." /></label>
        </div>
      </fieldset>

      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Send Message <span aria-hidden="true">→</span></button>
      {status.kind !== "idle" ? <p className={`kids-form-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
