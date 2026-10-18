const destinationEmail = "info@vineyardflorence.church";

type ContactPayload = Record<string, unknown>;

function text(value: unknown, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

async function graphAccessToken() {
  const tenantId = process.env.MS_GRAPH_TENANT_ID;
  const clientId = process.env.MS_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) throw new Error("EMAIL_NOT_CONFIGURED");

  const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, scope: "https://graph.microsoft.com/.default", grant_type: "client_credentials" }),
  });
  if (!response.ok) throw new Error("EMAIL_AUTH_FAILED");
  const result = await response.json() as { access_token?: string };
  if (!result.access_token) throw new Error("EMAIL_AUTH_FAILED");
  return result.access_token;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 15_000) return Response.json({ message: "This submission is too large." }, { status: 413 });

    const payload = await request.json() as ContactPayload;
    if (text(payload.website)) return Response.json({ ok: true });

    const name = text(payload.name, 160);
    const email = text(payload.email, 160);
    const phone = text(payload.phone, 30);
    const subject = text(payload.subject, 200) || "General Question";
    const message = text(payload.message);
    if (!name || !email || !message) return Response.json({ message: "Please complete every required field." }, { status: 400 });
    if (!validEmail(email)) return Response.json({ message: "Please enter a valid email address." }, { status: 400 });

    const accessToken = await graphAccessToken();
    const sender = process.env.CONTACT_FORM_SENDER_EMAIL || process.env.KIDS_FORM_SENDER_EMAIL || destinationEmail;
    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject: `${subject} — ${name}`,
          body: {
            contentType: "HTML",
            content: `<h1>${escapeHtml(subject)}</h1><p>Submitted from the Vineyard Florence website.</p><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p><p><strong>Message:</strong></p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
          },
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
