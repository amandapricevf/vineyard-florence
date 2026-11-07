"use client";

import { useEffect, useState } from "react";
import { churchToday } from "../lib/church-date";
import {
  eventAnchor,
  monthRangeLabel,
  rhythms,
  sortedEvents,
  upcomingEvents,
  type ChurchEvent,
} from "./event-data";
import { contactFormLink, serviceTimes } from "../site-data";
import { TriadMark } from "../components/TriadMark";

/**
 * Featured panel + calendar list, filtered to what is actually still ahead.
 *
 * Why this is a client component: the site is a static export, so a filter run
 * during the build would freeze whatever "today" meant on the day it was
 * deployed. Instead the server renders the complete list, and after mount the
 * browser recomputes it against the real date. Server output and the first
 * client render are identical, so hydration stays clean — and a visitor with
 * JavaScript disabled still gets every event rather than an empty page.
 */
export function EventsCalendar() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(churchToday());
  }, []);

  const visible = today ? upcomingEvents(today) : sortedEvents;
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <>
      {featured ? <FeaturedEvent event={featured} /> : null}

      <section className="events-calendar" aria-label="Upcoming Vineyard Florence events">
        <div className="events-calendar-heading">
          <p className="eyebrow">{visible.length ? monthRangeLabel(visible) : "Calendar"}</p>
          <h2>
            Coming Up
            <br />
            <em>At VF.</em>
          </h2>
          {visible.length ? <p>Tap any event to register or confirm the latest details.</p> : null}
        </div>

        {rest.length > 0 ? (
          <div className="events-calendar-list">
            {rest.map((event, index) => (
              <EventRow key={event.title} event={event} number={index + 2} />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="events-calendar-list events-empty">
            <h3>No Dated Events Right Now.</h3>
            <p>
              New gatherings are added often. In the meantime, join us {serviceTimes}—and the ongoing
              rhythms below are always open.
            </p>
            <a className="button button-dark button-small" href={contactFormLink("What's Coming Up At VF?")}>
              Ask What&apos;s Coming Up <span aria-hidden="true">→</span>
            </a>
          </div>
        ) : (
          <div className="events-calendar-list">
            <p>
              Nothing else is on the calendar just yet. New gatherings are added often—
              <a href={contactFormLink("What's Coming Up At VF?")}>ask us</a> and we will let you know what is coming.
            </p>
          </div>
        )}

        <p className="events-source-note">
          Dates and details are kept in sync with Vineyard Florence&apos;s event listings. Past events drop
          off this page automatically; use the linked registration or detail page to confirm any
          last-minute changes.
        </p>
      </section>
    </>
  );
}

function FeaturedEvent({ event }: { event: ChurchEvent }) {
  return (
    <section className="events-featured" id={eventAnchor(event)} aria-labelledby="featured-event-title">
      <div className="events-featured-media">
        <img
          src={event.image}
          alt={event.alt}
          width={event.imageSize.width}
          height={event.imageSize.height}
          fetchPriority="high"
          decoding="async"
        />
        <span>Next up</span>
      </div>
      <div className="events-featured-copy">
        <div className="events-featured-topline">
          <span>01 / {event.category}</span>
          <time dateTime={event.isoDate}>{event.featuredDate}</time>
        </div>
        <h2 id="featured-event-title">
          {event.featuredHeadline ?? event.title}{" "}
          {event.featuredHeadlineEmphasis ? <em>{event.featuredHeadlineEmphasis}</em> : null}
        </h2>
        <p>{event.description}</p>
        <dl>
          <div>
            <dt>When</dt>
            <dd>{event.featuredWhen ?? event.schedule}</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{event.featuredWhere ?? event.location}</dd>
          </div>
        </dl>
        <div className="events-featured-actions">
          <a className="button button-light" href={event.primaryHref} target="_blank" rel="noreferrer">
            {event.primaryLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function EventRow({ event, number }: { event: ChurchEvent; number: number }) {
  return (
    <article className="event-row" id={eventAnchor(event)}>
      <time className="event-date" dateTime={event.isoDate}>
        <span>{event.month}</span>
        <strong>{event.day}</strong>
        <small>{event.dateMeta}</small>
      </time>
      <div className="event-row-copy">
        <span className="event-number">{String(number).padStart(2, "0")}</span>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <dl>
          <div>
            <dt>When</dt>
            <dd>{event.schedule}</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{event.location}</dd>
          </div>
        </dl>
        <div className="event-row-actions">
          <a
            className="button button-dark button-small"
            href={event.primaryHref}
            target="_blank"
            rel="noreferrer"
          >
            {event.primaryLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <a
        className="event-row-image"
        href={event.primaryHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`${event.primaryLabel}: ${event.title}`}
      >
        <img
          src={event.image}
          alt={event.alt}
          width={event.imageSize.width}
          height={event.imageSize.height}
          loading="lazy"
          decoding="async"
        />
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export function EventRhythms() {
  return (
    <section className="events-rhythms">
      <div className="events-rhythms-heading">
        <TriadMark index={2} label="Ongoing" />
        <div>
          <p className="eyebrow light">Make It A Rhythm</p>
          <h2>
            Not Every Good Thing
            <br />
            Fits On <em>One Date.</em>
          </h2>
        </div>
      </div>
      <div className="events-rhythm-grid">
        {rhythms.map((rhythm) => (
          <article className="rhythm-card" key={rhythm.title}>
            <div className="rhythm-card-media">
              <img
                src={rhythm.image}
                alt={rhythm.alt}
                width={rhythm.imageSize.width}
                height={rhythm.imageSize.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="rhythm-card-copy">
              <span>{rhythm.kicker}</span>
              <h3>{rhythm.title}</h3>
              <strong>{rhythm.schedule}</strong>
              <p>{rhythm.description}</p>
              {rhythm.href && rhythm.cta ? (
                rhythm.href.startsWith("http") ? (
                  <a href={rhythm.href} target="_blank" rel="noreferrer">
                    {rhythm.cta} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <a href={rhythm.href}>
                    {rhythm.cta} <span aria-hidden="true">→</span>
                  </a>
                )
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
