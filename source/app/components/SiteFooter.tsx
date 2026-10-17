import Link from "next/link";
import {
  address,
  churchCenterGivingUrl,
  contactEmail,
  directionsUrl,
  facebookUrl,
  footerExploreLinks,
  instagramUrl,
  spotifyPodcastUrl,
  applePodcastUrl,
  logoSize,
  logoWhiteUrl,
  youtubeUrl,
} from "../site-data";

type SiteFooterProps = {
  /**
   * The home page runs an IntersectionObserver that adds `.is-visible` to
   * `[data-reveal]` elements. Interior pages do not, and `[data-reveal]` is
   * `opacity: 0` until that class lands — so the reveal animation must only be
   * requested on the home page or the footer would never appear.
   */
  reveal?: boolean;
  className?: string;
};

export function SiteFooter({ reveal = false, className }: SiteFooterProps) {
  return (
    <footer className={className} id="footer">
      <div className="footer-main" {...(reveal ? { "data-reveal": true } : {})}>
        <div className="footer-brand">
          <img
            src={logoWhiteUrl}
            alt="Vineyard Florence Church"
            width={logoSize.width}
            height={logoSize.height}
            loading="lazy"
            decoding="async"
          />
          <h2>
            Let&apos;s Follow
            <br />
            Jesus <em>Together.</em>
          </h2>
          <div className="footer-actions">
            <a className="button button-light" href={churchCenterGivingUrl} target="_blank" rel="noreferrer">
              Give online <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link light" href={`mailto:${contactEmail}`}>
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            {footerExploreLinks.map((item) => item.external ? (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>
            ) : (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div>
            <span>Visit</span>
            <p>
              Sundays
              <br />
              9:00 &amp; 11:00 AM
            </p>
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              {address.name}
              <br />
              {address.street}
              <br />
              {address.city}, {address.state} {address.zip}
              <br />
              Get directions ↗
            </a>
            <a href={`mailto:${contactEmail}`}>Email us ↗</a>
          </div>
          <div>
            <span>Follow</span>
            <a href={facebookUrl} target="_blank" rel="noreferrer">
              Facebook ↗
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href={youtubeUrl} target="_blank" rel="noreferrer">
              YouTube ↗
            </a>
            <a href={spotifyPodcastUrl} target="_blank" rel="noreferrer">
              Spotify Podcast ↗
            </a>
            <a href={applePodcastUrl} target="_blank" rel="noreferrer">
              Apple Podcasts ↗
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {/*
          The static HTML freezes whatever year the site was last built. Reading
          the year at render time keeps it correct for the visitor even if the
          church does not redeploy in January; suppressHydrationWarning covers
          the one night where the baked year and the live year disagree.
        */}
        <span>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Vineyard Florence Church
        </span>
        <span>Love God · Make Disciples · Impact The World</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
