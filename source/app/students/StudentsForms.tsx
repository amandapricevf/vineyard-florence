"use client";

import { FormEvent, useState } from "react";

type FormType = "new-student" | "serve" | "newsletter" | "media-release";
type FormStatus = { kind: "idle" | "sending" | "success" | "error"; message: string };

const initialStatus: FormStatus = { kind: "idle", message: "" };

async function sendForm(form: HTMLFormElement, formType: FormType) {
  const formData = new FormData(form);
  const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
  payload.formType = formType;
  if (formType === "media-release") payload.permissions = formData.getAll("permissions");

  const response = await fetch("/api/student-forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({ message: "We could not send the form." }));
  if (!response.ok) throw new Error(result.message || "We could not send the form.");
}

function StatusMessage({ status }: { status: FormStatus }) {
  if (status.kind === "idle") return null;
  return <p className={`kids-form-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p>;
}

function useStudentForm(formType: FormType, successMessage: string) {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ kind: "sending", message: "Sending your information…" });
    try {
      await sendForm(form, formType);
      form.reset();
      setStatus({ kind: "success", message: successMessage });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "We could not send the form." });
    }
  }

  return { status, submit };
}

function Honeypot() {
  return <input className="kids-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />;
}

export function NewStudentForm() {
  const { status, submit } = useStudentForm("new-student", "Form sent successfully.");
  return (
    <form className="kids-form" onSubmit={submit}>
      <Honeypot />
      <fieldset><legend>Parent Or Guardian</legend><div className="kids-form-grid">
        <label>First And Last Name<input name="guardianName" autoComplete="name" required maxLength={160} /></label>
        <label>Email Address<input name="guardianEmail" type="email" autoComplete="email" required maxLength={160} /></label>
        <label>Phone Number<input name="guardianPhone" type="tel" autoComplete="tel" required maxLength={30} /></label>
        <label>Preferred Contact Method<select name="contactPreference" required defaultValue=""><option value="" disabled>Select One</option><option>Email</option><option>Phone Call</option><option>Text Message</option></select></label>
      </div></fieldset>
      <fieldset><legend>Your Student</legend><div className="kids-form-grid">
        <label>Student Name<input name="studentNames" required maxLength={300} /></label>
        <label>Grade<input name="studentGrades" required maxLength={100} placeholder="Example: 8th grade" /></label>
        <label className="kids-form-wide">Anything We Should Know? <small>Optional</small><textarea name="studentDetails" rows={5} maxLength={1500} placeholder="Questions, allergies, accessibility needs or anything that will help us welcome your student" /></label>
      </div></fieldset>
      <p className="kids-form-privacy">This information is sent directly to Vineyard Florence and is used only to help welcome your family to Vineyard Students.</p>
      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Let Us Know You’re Coming <span aria-hidden="true">→</span></button>
      <StatusMessage status={status} />
    </form>
  );
}

export function StudentServeForm() {
  const { status, submit } = useStudentForm("serve", "Form sent successfully.");
  return (
    <form className="kids-form" onSubmit={submit}>
      <Honeypot />
      <fieldset><legend>Your Information</legend><div className="kids-form-grid">
        <label>First Name<input name="firstName" autoComplete="given-name" required maxLength={80} /></label>
        <label>Last Name<input name="lastName" autoComplete="family-name" required maxLength={80} /></label>
        <label>Email Address<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
        <label>Phone Number<input name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
        <label className="kids-form-wide">Questions Or Helpful Details<textarea name="questions" rows={6} required maxLength={1600} placeholder="Tell us what interests you about serving with Vineyard Students." /></label>
      </div></fieldset>
      <p className="kids-form-privacy">A ministry leader will contact you to answer questions and explain the process for joining the Students team.</p>
      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Start The Conversation <span aria-hidden="true">→</span></button>
      <StatusMessage status={status} />
    </form>
  );
}

export function StudentNewsletterForm() {
  const { status, submit } = useStudentForm("newsletter", "Form sent successfully.");
  return (
    <form className="kids-form" onSubmit={submit}>
      <Honeypot />
      <fieldset><legend>Newsletter Sign-Up</legend><div className="kids-form-grid">
        <label>First And Last Name<input name="guardianName" autoComplete="name" required maxLength={160} /></label>
        <label>Student Name Or Names<input name="studentNames" required maxLength={300} /></label>
        <label>Email Address<input name="guardianEmail" type="email" autoComplete="email" required maxLength={160} /></label>
        <label>Phone Number<input name="guardianPhone" type="tel" autoComplete="tel" required maxLength={30} /></label>
      </div></fieldset>
      <p className="kids-form-privacy">Your information is sent directly to Vineyard Florence and will be used for Vineyard Students parent communication.</p>
      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Join The Newsletter <span aria-hidden="true">→</span></button>
      <StatusMessage status={status} />
    </form>
  );
}

export function StudentMediaReleaseForm() {
  const { status, submit } = useStudentForm("media-release", "Form sent successfully.");
  return (
    <form className="kids-form" onSubmit={submit}>
      <Honeypot />
      <fieldset><legend>Family Information</legend><div className="kids-form-grid">
        <label>Parent Or Guardian Name<input name="guardianName" autoComplete="name" required maxLength={160} /></label>
        <label>Email Address<input name="guardianEmail" type="email" autoComplete="email" required maxLength={160} /></label>
        <label>Phone Number<input name="guardianPhone" type="tel" autoComplete="tel" required maxLength={30} /></label>
        <label>Student Name Or Names<input name="studentNames" required maxLength={300} /></label>
      </div></fieldset>
      <fieldset><legend>Permission</legend>
        <p className="kids-form-explainer">I give Vineyard Florence permission to photograph or record my student and use those images to share the life of the church in the places selected below.</p>
        <div className="kids-check-list">
          <label><input type="checkbox" name="permissions" value="Church website" /> Church Website</label>
          <label><input type="checkbox" name="permissions" value="Church social media" /> Church Social Media</label>
          <label><input type="checkbox" name="permissions" value="Printed church materials" /> Printed Church Materials</label>
        </div>
        <label className="kids-consent"><input type="checkbox" name="consent" required /> I understand that names will not be published with a student’s image unless Vineyard Florence receives separate permission.</label>
      </fieldset>
      <fieldset><legend>Electronic Signature</legend><div className="kids-form-grid">
        <label>Type Your Full Name<input name="signature" required maxLength={160} /></label>
        <label>Date<input name="signedDate" type="date" required /></label>
      </div></fieldset>
      <p className="kids-form-privacy">Submitting this form sends your release directly to Vineyard Florence. Contact the church at any time if you want to change or withdraw permission.</p>
      <button className="button button-dark" type="submit" disabled={status.kind === "sending"}>Submit Media Release <span aria-hidden="true">→</span></button>
      <StatusMessage status={status} />
    </form>
  );
}
