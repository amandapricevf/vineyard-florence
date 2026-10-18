"use client";

import { FormEvent, useState } from "react";
import { houseGroups, notSureOption } from "./house-group-data";

type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

const initialStatus: FormStatus = { kind: "idle", message: "" };

export function HouseGroupForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.contactMethods = formData.getAll("contactMethods");
    setStatus({ kind: "sending", message: "Sending your form…" });

    try {
      const response = await fetch("/api/house-group-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({ message: "We could not send the form." }));
      if (!response.ok) throw new Error(result.message || "We could not send the form.");
      form.reset();
      setStatus({ kind: "success", message: "Thank you! Someone from our House Group team will be in touch." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return (
    <form className="kids-form house-group-form" onSubmit={submit}>
      <input className="kids-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <fieldset>
        <legend>Your Information</legend>
        <div className="kids-form-grid">
          <label>First Name<input name="firstName" autoComplete="given-name" required maxLength={80} /></label>
          <label>Last Name<input name="lastName" autoComplete="family-name" required maxLength={80} /></label>
          <label className="kids-form-wide">Email Address<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
          <label>Phone Number<input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
          <label>Phone Type<select name="phoneType" defaultValue="Mobile"><option>Mobile</option><option>Home</option><option>Work</option><option>Other</option></select></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Address <small>Optional</small></legend>
        <div className="kids-form-grid">
          <label>Address Type<select name="addressType" defaultValue="Home"><option>Home</option><option>Work</option><option>Other</option></select></label>
          <label>Country<input name="country" autoComplete="country-name" maxLength={80} defaultValue="United States" /></label>
          <label className="kids-form-wide">Street Address<input name="street" autoComplete="address-line1" maxLength={160} /></label>
          <label className="kids-form-wide">Apt/Unit/Box<input name="unit" autoComplete="address-line2" maxLength={80} /></label>
          <label>City<input name="city" autoComplete="address-level2" maxLength={80} /></label>
          <label>State<input name="state" autoComplete="address-level1" maxLength={40} /></label>
          <label>Zip Code<input name="zip" autoComplete="postal-code" maxLength={20} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Your House Group</legend>
        <p className="kids-form-explainer">What is your preferred method of communication?</p>
        <div className="kids-check-list">
          <label><input type="checkbox" name="contactMethods" value="Email" /> Email</label>
          <label><input type="checkbox" name="contactMethods" value="Call" /> Call</label>
          <label><input type="checkbox" name="contactMethods" value="Text" /> Text</label>
        </div>
        <div className="kids-form-grid">
          <label className="kids-form-wide">Pick One: Which House Group Would You Like To Know More About?
            <select name="houseGroup" required defaultValue="">
              <option value="" disabled>Select One</option>
              {houseGroups.map((group, index) => <option key={group} value={group}>{index + 1}. {group}</option>)}
              <option>{notSureOption}</option>
            </select>
          </label>
          <label className="kids-form-wide">Are You Interested In Leading Or Co-Leading A Group?<select name="interestedInLeading" defaultValue=""><option value="">Select One</option><option>Yes</option><option>No</option></select></label>
          <label className="kids-form-wide">Is There Anything You Would Like To Share Or Any Questions You Have?<textarea name="questions" rows={5} maxLength={2000} /></label>
        </div>
      </fieldset>

      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Submit <span aria-hidden="true">→</span></button>
      {status.kind !== "idle" ? <p className={`kids-form-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
