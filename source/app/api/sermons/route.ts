import { streamArchiveSeed, type StreamArchiveItem } from "../../sermons/stream-archive";

const playlistFeedUrl = "https://www.youtube.com/feeds/videos.xml?playlist_id=UULVezpWG2xkplYJJZyTayTyKg";

function threeYearCutoffIso(now = new Date()) {
  const cutoff = new Date(now);
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 3);
  return cutoff.toISOString();
}

function getDatabase() {
  const runtime = globalThis as typeof globalThis & { __VINEYARD_D1__?: D1Database };
  if (!runtime.__VINEYARD_D1__) throw new Error("The sermon archive database is unavailable");
  return runtime.__VINEYARD_D1__;
}

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function tagValue(source: string, tag: string) {
  const match = source.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1]?.trim() ?? "";
}

function parseLatestStreams(xml: string): StreamArchiveItem[] {
  return Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)).flatMap((match) => {
    const entry = match[1];
    const videoId = tagValue(entry, "yt:videoId");
    const title = decodeXml(tagValue(entry, "title"));
    const publishedAt = tagValue(entry, "published");
    if (!videoId || !title || !publishedAt) return [];
    return [{
      videoId,
      title,
      publishedAt,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    }];
  });
}

async function seedHistoricalArchive() {
  const database = getDatabase();
  const countRow = await database.prepare("SELECT COUNT(*) AS count FROM sermon_streams").first<{ count: number }>();
  if (Number(countRow?.count ?? 0) >= streamArchiveSeed.length) return;

  const sql = "INSERT OR IGNORE INTO sermon_streams (video_id, title, published_at, thumbnail, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)";
  for (let start = 0; start < streamArchiveSeed.length; start += 50) {
    const batch = streamArchiveSeed.slice(start, start + 50).map((item) => database.prepare(sql).bind(
      item.videoId,
      item.title,
      item.publishedAt,
      item.thumbnail,
    ));
    await database.batch(batch);
  }
}

async function refreshFromYouTube() {
  const response = await fetch(playlistFeedUrl, {
    cache: "no-store",
    headers: { "user-agent": "Vineyard Florence Church sermon archive" },
  });
  if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);

  const latestStreams = parseLatestStreams(await response.text());
  if (!latestStreams.length) return;

  const database = getDatabase();
  const sql = `INSERT INTO sermon_streams (video_id, title, published_at, thumbnail, updated_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(video_id) DO UPDATE SET
      title = excluded.title,
      published_at = excluded.published_at,
      thumbnail = excluded.thumbnail,
      updated_at = CURRENT_TIMESTAMP`;
  await database.batch(latestStreams.map((item) => database.prepare(sql).bind(
    item.videoId,
    item.title,
    item.publishedAt,
    item.thumbnail,
  )));
}

export async function GET() {
  try {
    await seedHistoricalArchive();
    try {
      await refreshFromYouTube();
    } catch (error) {
      console.warn("YouTube sermon refresh failed; serving the saved archive.", error);
    }

    const result = await getDatabase().prepare(`SELECT
      video_id AS videoId,
      title,
      published_at AS publishedAt,
      thumbnail
      FROM sermon_streams
      WHERE published_at >= ?
      ORDER BY published_at DESC`).bind(threeYearCutoffIso()).all<StreamArchiveItem>();

    return Response.json(
      { streams: result.results ?? [], refreshedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=900, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load the sermon archive";
    return Response.json({ streams: streamArchiveSeed, error: message }, { status: 200 });
  }
}
