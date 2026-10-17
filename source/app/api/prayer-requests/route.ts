type PrayerPayload = Record<string, unknown>;

function getDatabase() {
  const runtime = globalThis as typeof globalThis & { __VINEYARD_D1__?: D1Database };
  if (!runtime.__VINEYARD_D1__) throw new Error("The prayer request database is unavailable");
  return runtime.__VINEYARD_D1__;
}

function text(value: unknown, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

function validEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

async function emailRequest(payload: { id: string; name: string; email: string; phone: string; request: string; contactPermission: string; confidentiality: string }) {
  // Add one recipient address in Sites as PRAYER_FORM_RECIPIENT_EMAIL.
  // The existing Microsoft Graph connection handles the rest.
  const destinationEmail = process.env.PRAYER_FORM_RECIPIENT_EMAIL?.trim();
  if (!destinationEmail) return false;

  const accessToken = await graphAccessToken();
  const sender = process.env.PRAYER_FORM_SENDER_EMAIL || process.env.KIDS_FORM_SENDER_EMAIL || destinationEmail;
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject: `Prayer Request${payload.name ? ` — ${payload.name}` : " — Anonymous"}`,
        body: {
          contentType: "HTML",
          content: `<h1>Prayer Request</h1><p><strong>Name:</strong> ${escapeHtml(payload.name || "Anonymous")}</p><p><strong>Email:</strong> ${escapeHtml(payload.email || "Not provided")}</p><p><strong>Phone:</strong> ${escapeHtml(payload.phone || "Not provided")}</p><p><strong>May contact:</strong> ${escapeHtml(payload.contactPermission)}</p><p><strong>Confidentiality:</strong> ${escapeHtml(payload.confidentiality)}</p><p><strong>Request:</strong></p><p style="white-space:pre-wrap">${escapeHtml(payload.request)}</p><p><small>Submission ID: ${escapeHtml(payload.id)}</small></p>`,
        },
        toRecipients: [{ emailAddress: { address: destinationEmail } }],
        ...(payload.email ? { replyTo: [{ emailAddress: { address: payload.email } }] } : {}),
      },
      saveToSentItems: true,
    }),
  });
  if (!response.ok) throw new Error("EMAIL_SEND_FAILED");
  return true;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 15_000) return Response.json({ message: "This submission is too large." }, { status: 413 });

    const payload = await request.json() as PrayerPayload;
    if (text(payload.website)) return Response.json({ ok: true });

    const name = text(payload.name, 160);
    const email = text(payload.email, 160);
    const phone = text(payload.phone, 30);
    const prayerRequest = text(payload.request);
    const confidentiality = text(payload.confidentiality, 100);
    const contactPermission = text(payload.contactPermission, 10) === "Yes" ? "Yes" : "No";
    if (!prayerRequest || !confidentiality) return Response.json({ message: "Please complete every required field." }, { status: 400 });
    if (!validEmail(email)) return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
    if (contactPermission === "Yes" && !email && !phone) return Response.json({ message: "Please provide an email address or phone number if you would like us to contact you." }, { status: 400 });

    const id = crypto.randomUUID();
    const database = getDatabase();
    await database.prepare(`INSERT INTO prayer_requests
      (id, name, email, phone, request, contact_permission, confidentiality, delivery_status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'stored', CURRENT_TIMESTAMP)`)
      .bind(id, name || null, email || null, phone || null, prayerRequest, contactPermission, confidentiality)
      .run();

    try {
      if (await emailRequest({ id, name, email, phone, request: prayerRequest, contactPermission, confidentiality })) {
        await database.prepare("UPDATE prayer_requests SET delivery_status = 'emailed' WHERE id = ?").bind(id).run();
      }
    } catch {
      // The request remains safely stored even if Outlook is not connected or temporarily unavailable.
    }

    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ message: "We could not send the form. Please try again." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
