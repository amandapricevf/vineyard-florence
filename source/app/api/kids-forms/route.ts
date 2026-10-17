const destinationEmail = "info@vineyardflorence.church";

// Production email delivery uses Vineyard Florence's Microsoft 365 tenant.
// Configure MS_GRAPH_TENANT_ID, MS_GRAPH_CLIENT_ID and MS_GRAPH_CLIENT_SECRET
// in Sites; KIDS_FORM_SENDER_EMAIL is optional and defaults to the inbox above.

type FormPayload = Record<string, unknown> & { formType?: string };

const labels: Record<string, string> = {
  guardianFirstName: "Parent/Guardian First Name",
  guardianLastName: "Parent/Guardian Last Name",
  guardianName: "Parent/Guardian Name",
  guardianPhone: "Parent/Guardian Phone",
  guardianEmail: "Parent/Guardian Email",
  secondGuardianFirstName: "Second Parent/Guardian First Name",
  secondGuardianLastName: "Second Parent/Guardian Last Name",
  secondGuardianPhone: "Second Parent/Guardian Phone",
  secondGuardianEmail: "Second Parent/Guardian Email",
  secondGuardianRelationship: "Second Parent/Guardian Relationship",
  childFirstName: "Child First Name",
  childLastName: "Child Last Name",
  childGender: "Child Gender",
  childBirthday: "Child Birthday",
  childAgeGrade: "Child Age And Grade",
  childDetails: "Allergies, Special Needs Or Other Details",
  childNames: "Child Or Children’s Names",
  permissions: "Approved Uses",
  consent: "Consent Confirmation",
  signature: "Electronic Signature",
  signedDate: "Date Signed",
};

function text(value: unknown, max = 1600) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean).join(", ").slice(0, max);
  return String(value ?? "").trim().slice(0, max);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

function requiredFields(formType: string) {
  return formType === "registration"
    ? ["guardianFirstName", "guardianLastName", "guardianPhone", "guardianEmail", "childFirstName", "childLastName", "childGender", "childBirthday", "childAgeGrade"]
    : ["guardianName", "guardianPhone", "guardianEmail", "childNames", "permissions", "consent", "signature", "signedDate"];
}

async function graphAccessToken() {
  const tenantId = process.env.MS_GRAPH_TENANT_ID;
  const clientId = process.env.MS_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) throw new Error("EMAIL_NOT_CONFIGURED");

  const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });
  if (!response.ok) throw new Error("EMAIL_AUTH_FAILED");
  const result = await response.json() as { access_token?: string };
  if (!result.access_token) throw new Error("EMAIL_AUTH_FAILED");
  return result.access_token;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 30_000) return Response.json({ message: "This submission is too large." }, { status: 413 });

    const payload = await request.json() as FormPayload;
    if (text(payload.website)) return Response.json({ ok: true });
    const formType = text(payload.formType, 30);
    if (!['registration', 'media-release'].includes(formType)) return Response.json({ message: "Please choose a valid form." }, { status: 400 });

    const email = text(payload.guardianEmail, 160);
    if (!validEmail(email)) return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
    const missing = requiredFields(formType).filter((field) => !text(payload[field]));
    if (missing.length) return Response.json({ message: "Please complete every required field." }, { status: 400 });

    const rows = Object.keys(labels)
      .filter((field) => text(payload[field]))
      .map((field) => `<tr><th style="padding:8px 14px 8px 0;text-align:left;vertical-align:top">${escapeHtml(labels[field])}</th><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(text(payload[field]))}</td></tr>`)
      .join("");
    const formTitle = formType === "registration" ? "Vineyard Kids Pre-Registration" : "Vineyard Kids Website & Social Media Release";
    const guardian = formType === "registration" ? `${text(payload.guardianFirstName)} ${text(payload.guardianLastName)}`.trim() : text(payload.guardianName);
    const accessToken = await graphAccessToken();
    const sender = process.env.KIDS_FORM_SENDER_EMAIL || destinationEmail;
    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject: `${formTitle} — ${guardian}`,
          body: { contentType: "HTML", content: `<h1>${escapeHtml(formTitle)}</h1><p>Submitted from vineyardflorence.church.</p><table>${rows}</table>` },
          toRecipients: [{ emailAddress: { address: destinationEmail } }],
          replyTo: [{ emailAddress: { address: email } }],
        },
        saveToSentItems: true,
      }),
    });
    if (!response.ok) throw new Error("EMAIL_SEND_FAILED");

    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const code = error instanceof Error ? error.message : "EMAIL_SEND_FAILED";
    const message = code === "EMAIL_NOT_CONFIGURED"
      ? "Online delivery is being connected. For now, please email info@vineyardflorence.church."
      : "We could not send the form. Please try again or email info@vineyardflorence.church.";
    return Response.json({ message }, { status: code === "EMAIL_NOT_CONFIGURED" ? 503 : 500, headers: { "Cache-Control": "no-store" } });
  }
}
