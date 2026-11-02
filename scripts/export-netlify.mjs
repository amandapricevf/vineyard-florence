import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const kit = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(process.argv[2] || path.join(kit, "source"));
const output = path.join(kit, "deploy");
await mkdir(output, { recursive: true });
await cp(path.join(source, "dist/client"), output, { recursive: true });
await cp(path.join(source, ".vinext/fonts"), path.join(output, "fonts"), { recursive: true });
await cp(path.join(source, "app/icon.png"), path.join(output, "icon.png"));
const portableFonts = text => text.replace(/\/[^"'()\s<>\\]+\/\.vinext\/fonts\//g, "/fonts/");
for (const name of await readdir(path.join(output, "assets"))) {
  if (!name.endsWith(".js")) continue;
  const file = path.join(output, "assets", name);
  const script = await readFile(file, "utf8");
  await writeFile(file, portableFonts(script.replaceAll("https://vineyard-florence.caaprojects.chatgpt.site/", "/")));
}
await cp(path.join(kit, "scripts/netlify-adapter.js"), path.join(output, "netlify-adapter.js"));
const { default: worker } = await import(pathToFileURL(path.join(source, "dist/server/index.js")).href);
const routes = [];
async function findPages(directory, parts = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith("api")) await findPages(path.join(directory, entry.name), [...parts, entry.name]);
    if (entry.isFile() && entry.name === "page.tsx") routes.push("/" + parts.join("/"));
  }
}
await findPages(path.join(source, "app"));
// The contact page serves one Netlify form per topic, so each topic's
// notifications can go to the right person.
const contactTopics = JSON.parse(await readFile(path.join(source, "app/contact/contact-topics.json"), "utf8"));
const forms = {
  "/prayer-request": "prayer-request",
  "/contact": ["contact-us-general-questions", ...contactTopics.map(topic => topic.formName)],
  "/join-a-house-group": "house-group-interest-signup",
  "/kids/register": "kids-registration",
  "/kids/media-release": "kids-media-release",
  "/students/new": "students-new-student",
  "/students/serve": "students-serve",
  "/students/newsletter": "students-newsletter",
  "/students/media-release": "students-media-release",
};
const formBlueprints = [];
for (const route of routes) {
  const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  if (response.status !== 200) throw new Error(`Cannot export ${route}: ${response.status}`);
  let html = await response.text();
  html = portableFonts(html.replaceAll("https://vineyard-florence.caaprojects.chatgpt.site/", "/"));
  html = html.replace("<head>", '<head><script src="/netlify-adapter.js"></script>');
  if (forms[route]) {
    const form = html.match(/<form\b[^>]*class="kids-form[\s\S]*?<\/form>/)?.[0];
    if (!form) throw new Error(`Missing form: ${route}`);
    const names = [...new Set([...form.matchAll(/\bname="([^"]+)"/g)].map(match => match[1]))];
    names.push("formType");
    for (const formName of [forms[route]].flat()) {
      formBlueprints.push(`<form name="${formName}" method="POST" data-netlify="true" netlify-honeypot="website" hidden><input type="hidden" name="form-name" value="${formName}"/>${names.map(name => `<input name="${name}"/>`).join("")}</form>`);
    }
  }
  const directory = path.join(output, route === "/" ? "" : route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}
await writeFile(path.join(output, "netlify-forms.html"), `<!doctype html><html lang="en"><head><meta name="robots" content="noindex"/><title>Form Definitions</title></head><body>${formBlueprints.join("\n")}</body></html>`);
const snapshot = JSON.parse(await readFile(path.join(kit, "netlify/sermons-snapshot.json"), "utf8"));
const cutoff = new Date(); cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 3);
const streams = snapshot.streams.filter(item => Date.parse(item.publishedAt) >= cutoff.getTime() && Date.parse(item.publishedAt) <= Date.now());
await mkdir(path.join(output, "api"), { recursive: true });
await writeFile(path.join(output, "api/sermons.json"), JSON.stringify({ streams, refreshedAt: snapshot.exportedAt }));
const latest = streams[0];
await writeFile(path.join(output, "_redirects"), `/api/sermons/latest ${latest ? `https://www.youtube.com/watch?v=${latest.videoId}` : "/sermons#latest-services"} 302\n/api/sermons /api/sermons.json 200\n`);
// Netlify serves 404.html for unknown paths. Use the site's own branded
// not-found page (app/not-found.tsx), rendered by the worker, so a mistyped link
// still lands somewhere with the header, search and a way back.
const notFound = await worker.fetch(new Request("http://localhost/__vf-not-found__", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
if (notFound.status !== 404) throw new Error(`Expected the not-found page to render with 404, got ${notFound.status}`);
let notFoundHtml = portableFonts((await notFound.text()).replaceAll("https://vineyard-florence.caaprojects.chatgpt.site/", "/"));
notFoundHtml = notFoundHtml.replace("<head>", '<head><script src="/netlify-adapter.js"></script>');
await writeFile(path.join(output, "404.html"), notFoundHtml);
console.log(`Exported ${routes.length} pages, ${formBlueprints.length} forms, and ${streams.length} sermons.`);
