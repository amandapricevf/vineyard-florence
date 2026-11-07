"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { streamArchiveSeed, type StreamArchiveItem } from "./stream-archive";

const watchUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;
const thumbnailUrl = (videoId: string) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
const streamsUrl = "https://www.youtube.com/@VineyardFlorence/streams";
const streamPlaylistId = "UULVezpWG2xkplYJJZyTayTyKg";
const streamPlaylistUrl = `https://www.youtube.com/playlist?list=${streamPlaylistId}`;
const streamEmbedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${streamPlaylistId}&rel=0`;
const pageSize = 24;
const seedById = new Map(streamArchiveSeed.map((stream) => [stream.videoId, stream]));

function threeYearCutoff() {
  const cutoff = new Date();
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 3);
  return cutoff;
}

function fallbackDescription(title: string) {
  const normalized = title.trim().toLowerCase();
  if (normalized === "sunday morning service" || normalized === "sunday service") {
    return "A full Vineyard Florence Sunday gathering with worship, prayer and teaching from this week’s service.";
  }
  return `A Vineyard Florence gathering centered on ${title}, with worship, prayer and practical teaching for following Jesus.`;
}

function normalizeStreams(items: StreamArchiveItem[]) {
  const cutoff = threeYearCutoff();
  return items
    .filter((stream) => new Date(stream.publishedAt) >= cutoff)
    .map((stream) => {
      const enriched = seedById.get(stream.videoId);
      return {
        ...stream,
        description: enriched?.description ?? stream.description ?? fallbackDescription(stream.title),
        transcriptAvailable: enriched?.transcriptAvailable ?? stream.transcriptAvailable ?? false,
      };
    });
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function serviceLabel(title: string) {
  const normalized = title.trim().toLowerCase();
  if (normalized === "sunday morning service" || normalized === "sunday service") return "Sunday Morning Service";
  return title;
}

export function SermonDirectory() {
  const [streams, setStreams] = useState(() => normalizeStreams(streamArchiveSeed));
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isCurrent, setIsCurrent] = useState(false);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const newest = streams[0] ?? streamArchiveSeed[0];

  useEffect(() => {
    let active = true;
    fetch("/api/sermons")
      .then((response) => response.json())
      .then((payload: { streams?: StreamArchiveItem[] }) => {
        if (active && payload.streams?.length) setStreams(normalizeStreams(payload.streams));
      })
      .catch(() => undefined)
      .finally(() => { if (active) setIsCurrent(true); });
    return () => { active = false; };
  }, []);

  const filteredStreams = useMemo(() => {
    if (!deferredQuery) return streams;
    return streams.filter((stream) => {
      const date = formatDate(stream.publishedAt).toLowerCase();
      const searchable = `${stream.title} ${stream.description ?? ""} ${date}`.toLowerCase();
      return deferredQuery.split(/\s+/).every((term) => searchable.includes(term));
    });
  }, [deferredQuery, streams]);

  const visibleStreams = filteredStreams.slice(0, visibleCount);

  return (
    <>
      <section className="sermons-hero" aria-labelledby="sermons-title">
        <div className="sermons-hero-copy">
          <p className="eyebrow">Watch · Listen · Live It</p>
          <h1 id="sermons-title">Sunday Teaching<br />For The Way Of <em>Jesus.</em></h1>
          <p>Explore three years of Vineyard Florence livestreams in one place. New Sunday services appear automatically, with the original YouTube date and a helpful message overview.</p>
          <div className="sermons-hero-actions">
            <a className="button button-dark" href="#service-archive">Browse the archive <span aria-hidden="true">↓</span></a>
            <a className="text-link" href={streamsUrl} target="_blank" rel="noreferrer">View on YouTube <span aria-hidden="true">↗</span></a>
          </div>
          <dl className="sermons-stats" aria-label="Sunday service archive overview">
            <div><dt>{streams.length}</dt><dd>Service videos</dd></div>
            <div><dt>Weekly</dt><dd>New livestreams</dd></div>
            <div><dt>3 Years</dt><dd>Rolling archive</dd></div>
          </dl>
        </div>

        <a className="sermons-featured" href={watchUrl(newest.videoId)} target="_blank" rel="noreferrer" aria-label={`Watch ${serviceLabel(newest.title)} from ${formatDate(newest.publishedAt)} on YouTube`}>
          <img src={thumbnailUrl(newest.videoId)} alt="Latest Vineyard Florence Church Sunday livestream" width={480} height={360} fetchPriority="high" decoding="async" />
          <span className="sermons-featured-shade" aria-hidden="true" />
          <span className="sermons-featured-label">Latest livestream</span>
          <span className="sermons-featured-play" aria-hidden="true">▶</span>
          <span className="sermons-featured-copy"><strong>{serviceLabel(newest.title)}</strong><small>Uploaded {formatDate(newest.publishedAt)}</small></span>
        </a>
        <span className="sermons-hero-outline" aria-hidden="true">WORD</span>
      </section>

      <section className="sermons-method" aria-label="About the Sunday service archive">
        <p className="eyebrow">Teaching For The Journey</p>
        <h2>Missed A Sunday?<br /><em>Start Right Here.</em></h2>
        <div>
          <p>Catch the most recent Vineyard Florence service or explore the past three years of livestreams, newest first.</p>
          <p>Every card includes an overview and upload date, then opens the original full service on YouTube.</p>
        </div>
      </section>

      <section className="latest-streams" id="latest-services" aria-labelledby="latest-services-title">
        <header className="latest-streams-heading">
          <div>
            <p className="eyebrow">Fresh From Sunday</p>
            <h2 id="latest-services-title">Latest <em>Services.</em></h2>
          </div>
          <div>
            <p>Watch the newest Sunday livestream here, or use the archive below to choose any recorded service.</p>
            <a className="text-link" href={streamsUrl} target="_blank" rel="noreferrer">Open Vineyard Florence Streams <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <div className="latest-player-shell">
          <div className="latest-player-frame">
            <iframe
              src={streamEmbedUrl}
              title="Latest Vineyard Florence Sunday services"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <aside className="latest-player-copy">
            <p className="eyebrow">Sunday Livestreams</p>
            <h3>One Place For<br /><em>Every Service.</em></h3>
            <p>The playlist updates when YouTube archives a Vineyard Florence livestream. Choose a service in the player or browse every dated recording below.</p>
            <dl>
              <div><dt>9:00 AM</dt><dd>First service</dd></div>
              <div><dt>11:00 AM</dt><dd>Second service</dd></div>
            </dl>
            <a className="button button-dark" href={streamPlaylistUrl} target="_blank" rel="noreferrer">Open the YouTube playlist <span aria-hidden="true">↗</span></a>
          </aside>
        </div>
      </section>

      <section className="sermon-library" id="service-archive" aria-labelledby="service-archive-title">
        <div className="sermon-filter-shell">
          <div className="sermon-filter-topline">
            <div>
              <p className="eyebrow">Three-Year Livestream Directory</p>
              <h2 id="service-archive-title">Three Years.<br /><em>Every Service.</em></h2>
            </div>
            <label className="sermon-search">
              <span>Search service titles or dates</span>
              <span className="sermon-search-field">
                <span className="search-symbol" aria-hidden="true" />
                <input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(pageSize); }} type="search" placeholder="Try “August 2026” or a message title" />
                {query && <button type="button" onClick={() => { setQuery(""); setVisibleCount(pageSize); }} aria-label="Clear service search">Clear</button>}
              </span>
            </label>
          </div>
          <div className="sermon-results-meta" aria-live="polite">
            <span>Showing {visibleStreams.length} of {filteredStreams.length} services</span>
            <span className="sermon-sync-state"><i className={isCurrent ? "is-current" : ""} aria-hidden="true" />{isCurrent ? "Synced with YouTube" : "Checking for the latest service"}</span>
          </div>
        </div>

        {visibleStreams.length ? (
          <div className="stream-archive-shell">
            <div className="sermon-grid stream-archive-grid">
              {visibleStreams.map((stream, index) => (
                <article className="sermon-card stream-card" key={stream.videoId}>
                  <a className="sermon-card-media" href={watchUrl(stream.videoId)} target="_blank" rel="noreferrer" aria-label={`Watch ${serviceLabel(stream.title)} from ${formatDate(stream.publishedAt)} on YouTube`}>
                    <img src={thumbnailUrl(stream.videoId)} alt="" width={480} height={360} loading={index < 6 ? "eager" : "lazy"} decoding="async" />
                    <span aria-hidden="true">▶</span>
                    <small>Full service</small>
                  </a>
                  <div className="sermon-card-copy">
                    <div className="sermon-card-meta">
                      <time dateTime={stream.publishedAt}>Uploaded {formatDate(stream.publishedAt)}</time>
                      <span className="message-label">Livestream</span>
                    </div>
                    <h3>{serviceLabel(stream.title)}</h3>
                    <p className="stream-description">{stream.description}</p>
                    <div className="sermon-card-actions">
                      <a href={watchUrl(stream.videoId)} target="_blank" rel="noreferrer">Watch full service <span aria-hidden="true">↗</span></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {visibleCount < filteredStreams.length && (
              <div className="stream-load-more">
                <button className="button button-dark" type="button" onClick={() => setVisibleCount((count) => count + pageSize)}>
                  Show more services <span aria-hidden="true">↓</span>
                </button>
                <small>{filteredStreams.length - visibleCount} more in the archive</small>
              </div>
            )}
          </div>
        ) : (
          <div className="sermon-empty">
            <span aria-hidden="true">⌕</span>
            <h3>No Service Matches That Search.</h3>
            <p>Try a month, year or broader title—or clear the search to browse every archived livestream.</p>
            <button className="button button-dark" type="button" onClick={() => { setQuery(""); setVisibleCount(pageSize); }}>Show every service</button>
          </div>
        )}
      </section>

      <section className="sermons-cta interior-cta">
        <p className="eyebrow">Keep Listening</p>
        <h2>New Messages.<br /><em>Every Week.</em></h2>
        <div><p>Subscribe on YouTube for Sunday teaching, worship and practical training from Vineyard Florence.</p><a className="button button-light" href="https://www.youtube.com/@VineyardFlorence?sub_confirmation=1" target="_blank" rel="noreferrer">Subscribe on YouTube <span aria-hidden="true">↗</span></a></div>
      </section>
    </>
  );
}
