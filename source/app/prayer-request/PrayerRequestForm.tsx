"use client";

import { FormEvent, useState } from "react";

type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

const initialStatus: FormStatus = { kind: "idle", message: "" };

export function PrayerRequestForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setStatus({ kind: "sending", message: "Sending your prayer request…" });

    try {
      const response = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({ message: "We could not send the form." }));
      if (!response.ok) throw new Error(result.message || "We could not send the form.");
      form.reset();
      setStatus({ kind: "success", message: "Form sent successfully." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return (
    <form className="kids-form prayer-request-form" onSubmit={submit}>
      <input className="kids-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <fieldset>
        <legend>Your Information <small>Optional</small></legend>
        <div className="kids-form-grid">
          <label>Your Name<input name="name" autoComplete="name" maxLength={160} /></label>
          <label>Email Address<input name="email" type="email" autoComplete="email" maxLength={160} /></label>
          <label className="kids-form-wide">Phone Number<input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Your Prayer Request</legend>
        <div className="kids-form-grid">
          <label className="kids-form-wide">How Can We Pray For You?<textarea name="request" rows={8} required maxLength={4000} placeholder="Share as much or as little as you feel comfortable sharing." /></label>
          <label className="kids-form-wide">Who May See This Request?<select name="confidentiality" required defaultValue="Prayer Team Only"><option>Prayer Team Only</option><option>Prayer And Pastoral Teams</option><option>May Be Shared Anonymously With Church Prayer Gatherings</option></select></label>
        </div>
        <label className="kids-consent"><input type="checkbox" name="contactPermission" value="Yes" /> A member of the Vineyard Florence team may contact me about this request.</label>
      </fieldset>

      <p className="kids-form-privacy">Your request is stored securely and is shared only according to the confidentiality preference you select.</p>
      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Send Prayer Request <span aria-hidden="true">→</span></button>
      {status.kind !== "idle" ? <p className={`kids-form-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
