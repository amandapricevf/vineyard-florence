import snapshot from "../sermons-snapshot.json" with { type: "json" };
const feed = "https://www.youtube.com/feeds/videos.xml?playlist_id=UULVezpWG2xkplYJJZyTayTyKg";
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const tag = (entry, name) => entry.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`))?.[1]?.trim() || "";
export default async () => {
  const archive = new Map(snapshot.streams.map(item => [item.videoId, item]));
  try {
    const response = await fetch(feed, { signal: AbortSignal.timeout(8000) });
    if (response.ok) for (const match of (await response.text()).matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const videoId = tag(match[1], "yt:videoId"), publishedAt = tag(match[1], "published"), title = decode(tag(match[1], "title"));
      if (/^[\w-]{11}$/.test(videoId) && publishedAt && title) archive.set(videoId, { videoId, publishedAt, title, thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` });
    }
  } catch { /* Keep the historical snapshot available when YouTube is unavailable. */ }
  const cutoff = new Date(); cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 3);
  const streams = [...archive.values()].filter(item => Date.parse(item.publishedAt) >= cutoff.getTime() && Date.parse(item.publishedAt) <= Date.now()).sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  return Response.json({ streams, refreshedAt: new Date().toISOString() }, { headers: { "Cache-Control": "public, max-age=300" } });
};
