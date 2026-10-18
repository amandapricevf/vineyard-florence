/* Static hosting compatibility. Loaded before the React entrypoint. */
(() => {
  const originalFetch = window.fetch.bind(window);
  const formNames = {
    "/api/prayer-requests": () => "prayer-request",
    // One Netlify form per contact topic; the page says which one in formName.
    "/api/contact": payload => /^contact-[a-z0-9-]+$/.test(payload.formName || "") ? payload.formName : "contact-us-general-questions",
    "/api/house-group-signup": () => "house-group-interest-signup",
    "/api/kids-forms": payload => `kids-${payload.formType}`,
    "/api/student-forms": payload => `students-${payload.formType}`,
  };
  const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), {
    status, headers: { "Content-Type": "application/json" },
  });
  window.fetch = async (input, options = {}) => {
    const url = new URL(typeof input === "string" ? input : input.url, location.href);
    if (url.origin === location.origin && formNames[url.pathname] && (options.method || "GET").toUpperCase() === "POST") {
      try {
        const payload = JSON.parse(options.body);
        if (payload.website) return jsonResponse({ ok: true });
        if (url.pathname === "/api/prayer-requests" && payload.contactPermission === "Yes" && !payload.email && !payload.phone) {
          return jsonResponse({ message: "Please provide an email address or phone number if you would like us to contact you." }, 400);
        }
        const body = new URLSearchParams({ "form-name": formNames[url.pathname](payload) });
        for (const [key, value] of Object.entries(payload)) body.set(key, Array.isArray(value) ? value.join(", ") : String(value ?? ""));
        const result = await originalFetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
        return result.ok ? jsonResponse({ ok: true }) : jsonResponse({ message: "We could not send the form. Please try again." }, result.status);
      } catch {
        return jsonResponse({ message: "We could not send the form. Please try again." }, 500);
      }
    }
    if (url.origin === location.origin && url.pathname === "/api/sermons") {
      try {
        const live = await originalFetch("/.netlify/functions/sermons");
        if (live.ok && (live.headers.get("Content-Type") || "").includes("application/json")) return live;
      } catch { /* Manual uploads use the packaged archive snapshot. */ }
      return originalFetch("/api/sermons.json");
    }
    return originalFetch(input, options);
  };
  // Full page navigation keeps static routes independent of a React server.
  window.addEventListener("click", event => {
    const anchor = event.target.closest?.("a[href]");
    if (!anchor || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target || anchor.hasAttribute("download")) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin === "https://vineyard-florence.caaprojects.chatgpt.site") url.host = location.host;
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (url.pathname === "/api/sermons/latest") {
      event.preventDefault(); event.stopImmediatePropagation();
      window.fetch("/api/sermons").then(response => response.json()).then(archive => {
        const latest = (archive.streams || []).filter(item => /^[\w-]{11}$/.test(item.videoId) && Date.parse(item.publishedAt) <= Date.now()).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))[0];
        location.assign(latest ? `https://www.youtube.com/watch?v=${latest.videoId}` : "/sermons#latest-services");
      }).catch(() => location.assign("/sermons#latest-services"));
      return;
    }
    if (url.pathname.replace(/\/$/, "") !== location.pathname.replace(/\/$/, "")) {
      event.preventDefault(); event.stopImmediatePropagation(); location.assign(url.href);
    }
  }, true);
})();
