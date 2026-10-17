"use client";

import { FormEvent, useState } from "react";

type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

const initialStatus: FormStatus = { kind: "idle", message: "" };

async function sendForm(form: HTMLFormElement, formType: "registration" | "media-release") {
  const formData = new FormData(form);
  const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
  payload.formType = formType;
  if (formType === "media-release") payload.permissions = formData.getAll("permissions");

  const response = await fetch("/api/kids-forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({ message: "We could not send the form." }));
  if (!response.ok) throw new Error(result.message || "We could not send the form.");
  return result;
}

function StatusMessage({ status }: { status: FormStatus }) {
  if (status.kind === "idle") return null;
  return <p className={`kids-form-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p>;
}

export function KidsRegistrationForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ kind: "sending", message: "Sending your registration…" });
    try {
      await sendForm(form, "registration");
      form.reset();
      setStatus({ kind: "success", message: "Form sent successfully." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return (
    <form className="kids-form" onSubmit={submit}>
      <input className="kids-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <fieldset>
        <legend>Parent Or Guardian</legend>
        <div className="kids-form-grid">
          <label>First Name<input name="guardianFirstName" autoComplete="given-name" required maxLength={80} /></label>
          <label>Last Name<input name="guardianLastName" autoComplete="family-name" required maxLength={80} /></label>
          <label>Phone<input name="guardianPhone" type="tel" autoComplete="tel" required maxLength={30} /></label>
          <label>Email<input name="guardianEmail" type="email" autoComplete="email" required maxLength={160} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Second Parent Or Guardian <small>Optional</small></legend>
        <div className="kids-form-grid">
          <label>First Name<input name="secondGuardianFirstName" autoComplete="off" maxLength={80} /></label>
          <label>Last Name<input name="secondGuardianLastName" autoComplete="off" maxLength={80} /></label>
          <label>Phone<input name="secondGuardianPhone" type="tel" autoComplete="off" maxLength={30} /></label>
          <label>Email<input name="secondGuardianEmail" type="email" autoComplete="off" maxLength={160} /></label>
          <label className="kids-form-wide">Relationship To Child<input name="secondGuardianRelationship" maxLength={100} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Child&apos;s Information</legend>
        <div className="kids-form-grid">
          <label>First Name<input name="childFirstName" required maxLength={80} /></label>
          <label>Last Name<input name="childLastName" required maxLength={80} /></label>
          <label>Gender<select name="childGender" required defaultValue=""><option value="" disabled>Select One</option><option>Boy</option><option>Girl</option></select></label>
          <label>Birthday<input name="childBirthday" type="date" required /></label>
          <label className="kids-form-wide">Age And Grade<input name="childAgeGrade" required maxLength={100} placeholder="Example: Age 7, second grade" /></label>
          <label className="kids-form-wide">Anything We Should Know?<textarea name="childDetails" rows={5} maxLength={1500} placeholder="Allergies, special needs or other helpful details" /></label>
        </div>
      </fieldset>

      <p className="kids-form-privacy">This information is sent directly to Vineyard Florence and is used only to help your family prepare for Vineyard Kids.</p>
      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Register Your Child <span aria-hidden="true">→</span></button>
      <StatusMessage status={status} />
    </form>
  );
}

export function KidsMediaReleaseForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ kind: "sending", message: "Sending your release…" });
    try {
      await sendForm(form, "media-release");
      form.reset();
      setStatus({ kind: "success", message: "Form sent successfully." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return (
    <form className="kids-form" onSubmit={submit}>
      <input className="kids-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <fieldset>
        <legend>Family Information</legend>
        <div className="kids-form-grid">
          <label>Parent Or Guardian Name<input name="guardianName" autoComplete="name" required maxLength={160} /></label>
          <label>Email<input name="guardianEmail" type="email" autoComplete="email" required maxLength={160} /></label>
          <label>Phone<input name="guardianPhone" type="tel" autoComplete="tel" required maxLength={30} /></label>
          <label>Child Or Children&apos;s Names<input name="childNames" required maxLength={300} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Permission</legend>
        <p className="kids-form-explainer">I give Vineyard Florence permission to photograph or record my child and use those images to share the life of the church in the places selected below.</p>
        <div className="kids-check-list">
          <label><input type="checkbox" name="permissions" value="Church website" /> Church Website</label>
          <label><input type="checkbox" name="permissions" value="Church social media" /> Church Social Media</label>
          <label><input type="checkbox" name="permissions" value="Printed church materials" /> Printed Church Materials</label>
        </div>
        <label className="kids-consent"><input type="checkbox" name="consent" required /> I understand that names will not be published with a child&apos;s image unless Vineyard Florence receives separate permission.</label>
      </fieldset>

      <fieldset>
        <legend>Electronic Signature</legend>
        <div className="kids-form-grid">
          <label>Type Your Full Name<input name="signature" required maxLength={160} /></label>
          <label>Date<input name="signedDate" type="date" required /></label>
        </div>
      </fieldset>

      <p className="kids-form-privacy">Submitting this form sends your release directly to Vineyard Florence. Contact the church at any time if you want to change or withdraw permission.</p>
      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Submit Media Release <span aria-hidden="true">→</span></button>
      <StatusMessage status={status} />
    </form>
  );
}
