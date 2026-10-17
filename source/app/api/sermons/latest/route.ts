import { GET as getArchive } from "../route";

export async function GET(request: Request) {
  const response = await getArchive();
  const archive = await response.json() as { streams?: { videoId: string; publishedAt: string }[]; error?: string };
  // Do not describe an old fallback snapshot as the latest message.
  const latest = !archive.error ? archive.streams
    ?.filter((stream) => /^[\w-]{11}$/.test(stream.videoId) && Date.parse(stream.publishedAt) <= Date.now())
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))[0] : undefined;
  const destination = latest
    ? `https://www.youtube.com/watch?v=${latest.videoId}`
    : new URL("/sermons#latest-services", request.url).href;
  return new Response(null, { status: 302, headers: { Location: destination, "Cache-Control": "no-store" } });
}
