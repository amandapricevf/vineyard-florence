"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { vinedresserUrl } from "../site-data";

export type StaffPerson = {
  name: string;
  role: string;
  image: string;
  bio: string;
  fullBio: string[];
};

function linkVinedresser(text: string) {
  return text
    .split(/(The Vinedresser Foster and Kinship Shop|The Vinedresser|Vinedresser)/g)
    .map((part, index) => {
      if (!/^(The Vinedresser Foster and Kinship Shop|The Vinedresser|Vinedresser)$/.test(part)) {
        return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
      }

      return (
        <a className="vinedresser-inline-link" href={vinedresserUrl} target="_blank" rel="noreferrer" key={`${part}-${index}`}>
          {part}
        </a>
      );
    });
}

export function StaffDirectory({ people }: { people: StaffPerson[] }) {
  const [activePerson, setActivePerson] = useState<StaffPerson | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activePerson) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePerson(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    };
  }, [activePerson]);

  const openBio = (person: StaffPerson, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActivePerson(person);
  };

  return (
    <>
      <section className="staff-grid" aria-label="Vineyard Florence staff">
        {people.map((person, index) => (
          <article className={`staff-card ${index === 0 ? "staff-card-featured" : ""}`} key={person.name}>
            <div className="staff-photo">
              <img src={person.image} alt={`${person.name}, ${person.role}`} loading="lazy" decoding="async" />
            </div>
            <div className="staff-card-copy">
              <p className="eyebrow">{linkVinedresser(person.role)}</p>
              <h2>{person.name}</h2>
              <p>{linkVinedresser(person.bio)}</p>
              <button className="staff-bio-trigger" type="button" onClick={(event) => openBio(person, event.currentTarget)}>
                Read full bio <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {activePerson && (
        <div className="staff-bio-modal" role="dialog" aria-modal="true" aria-labelledby="staff-bio-title" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActivePerson(null);
        }}>
          <div className="staff-bio-panel">
            <button ref={closeButtonRef} className="staff-bio-close" type="button" onClick={() => setActivePerson(null)} aria-label={`Close ${activePerson.name} biography`}>
              <span aria-hidden="true">×</span>
            </button>
            <div className="staff-bio-portrait">
              <img src={activePerson.image} alt="" decoding="async" />
              <span aria-hidden="true">MEET</span>
            </div>
            <div className="staff-bio-content">
              <p className="eyebrow">{linkVinedresser(activePerson.role)}</p>
              <h2 id="staff-bio-title">{activePerson.name}</h2>
              <div className="staff-bio-copy">
                {activePerson.fullBio.map((paragraph) => <p key={paragraph}>{linkVinedresser(paragraph)}</p>)}
              </div>
              <button className="staff-bio-done" type="button" onClick={() => setActivePerson(null)}>Close bio <span aria-hidden="true">←</span></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
