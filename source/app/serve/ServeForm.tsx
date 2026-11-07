"use client";

import { FormEvent, useState } from "react";

type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

const initialStatus: FormStatus = { kind: "idle", message: "" };

const teams = ["Kids Ministry", "Student Ministry", "First Impressions Team", "Media Team", "Worship Team", "Not sure yet"];

export function ServeForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.teams = formData.getAll("teams");
    if (!(payload.teams as string[]).length) {
      setStatus({ kind: "error", message: "Please choose at least one team, or “Not sure yet”." });
      return;
    }
    setStatus({ kind: "sending", message: "Sending your sign-up…" });

    try {
      const response = await fetch("/api/serve-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({ message: "We could not send the form." }));
      if (!response.ok) throw new Error(result.message || "We could not send the form.");
      form.reset();
      setStatus({ kind: "success", message: "Thank you for signing up to serve! Someone from the team will be in touch." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return (
    <form className="kids-form serve-form" onSubmit={submit}>
      <input className="kids-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <fieldset>
        <legend>Your Information</legend>
        <div className="kids-form-grid">
          <label className="kids-form-wide">Your Name<input name="name" autoComplete="name" required maxLength={160} /></label>
          <label>Phone Number<input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
          <label>Email Address<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Where Would You Like To Serve?</legend>
        <p className="kids-form-explainer">Choose any that interest you.</p>
        <div className="kids-check-list">
          {teams.map((team) => (
            <label key={team}><input type="checkbox" name="teams" value={team} /> {team}</label>
          ))}
        </div>
        <div className="kids-form-grid">
          <label className="kids-form-wide">Which Service Works Best?<select name="service" defaultValue="Either"><option>9:00 AM</option><option>11:00 AM</option><option>Either</option></select></label>
          <label className="kids-form-wide">Anything We Should Know?<textarea name="notes" rows={4} maxLength={2000} placeholder="Experience, availability or questions" /></label>
        </div>
      </fieldset>

      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Sign Up To Serve <span aria-hidden="true">→</span></button>
      {status.kind !== "idle" ? <p className={`kids-form-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
