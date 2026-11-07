"use client";

import { FormEvent, useState } from "react";

type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

const initialStatus: FormStatus = { kind: "idle", message: "" };

export function StockGiftForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending", message: "Sending your details…" });

    try {
      const response = await fetch("/api/stock-gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({ message: "We could not send the form." }));
      if (!response.ok) throw new Error(result.message || "We could not send the form.");
      form.reset();
      setStatus({ kind: "success", message: "Thank you! We will reach out shortly to discuss how to donate your stock." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return (
    <form className="kids-form stock-gift-form" onSubmit={submit}>
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
        <legend>Your Stock Gift</legend>
        <div className="kids-form-grid">
          <label>Stock Ticker<input name="ticker" required maxLength={20} placeholder="e.g. AAPL" autoCapitalize="characters" spellCheck={false} /></label>
          <label>Estimated Total Value<input name="estimatedValue" required maxLength={40} inputMode="decimal" placeholder="e.g. $5,000" /></label>
        </div>
      </fieldset>

      <p className="kids-form-privacy">We will reach out shortly to discuss how to donate the stock. Nothing is transferred by sending this form.</p>
      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Send Details <span aria-hidden="true">→</span></button>
      {status.kind !== "idle" ? <p className={`kids-form-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
