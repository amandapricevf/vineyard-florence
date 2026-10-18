"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Lenis from "lenis";
import { HeaderSearch } from "./components/HeaderSearch";
import { SiteFooter } from "./components/SiteFooter";
import { TriadMark } from "./components/TriadMark";
import { usePrefersReducedMotion } from "./lib/use-prefers-reduced-motion";
import { SiteTicker } from "./components/SiteTicker";
import {
  churchCenterGroupsUrl,
  churchCenterGivingUrl,
  everyOrgCryptoGivingUrl,
  churchCenterSignInUrl,
  directionsUrl,
  logoSize,
  logoWhiteUrl,
  primaryNavigation,
  serviceTimes,
  address,
  contactEmail,
  prayerRequestUrl,
  celebrateRecoveryUrl,
  mensHealthySexualityUrl,
  latviaFacebookUrl,
  vinedresserUrl,
  youtubeUrl,
} from "./site-data";

const heroMessages = [
  {
    label: "Life Together",
    copy: "House Groups are our primary place for friendship, care, worship and becoming more like Jesus together.",
    cta: "Find a House Group",
    href: churchCenterGroupsUrl,
  },
  {
    label: "Coming Up At VF",
    copy: "Find out what is coming up at VF. From Alpha to Baptisms, find out here.",
    cta: "Explore events",
    href: "/events",
  },
  {
    label: "Go Deeper",
    copy: "Ready for something deeper? Check out our VF Foundations 8 week course.",
    cta: "Discover Foundations",
    href: "/discipleship#resources",
  },
];

type SundayFlowStep = {
  time: string;
  title: string;
  copy: string;
  href?: string;
  linkLabel?: string;
  titleLink?: boolean;
  external?: boolean;
};

const sundayFlow: SundayFlowStep[] = [
  {
    time: "15 min before",
    title: "Arrive And Settle In",
    copy: "Grab a good cup of coffee, meet a few friendly people and find a comfortable seat.",
    href: "https://www.vineyardflorence.church",
    linkLabel: "New Here?",
    external: true,
  },
  {
    time: "Bringing kids?",
    title: "Register And Drop Off",
    copy: "Our Kids team will help you register your children, answer questions and show you to the right kids area.",
    href: "https://www.vineyardflorence.church",
    linkLabel: "Register Your Kids",
    external: true,
  },
  {
    time: "First 30–35 min",
    title: "Worship",
    copy: "We begin with passionate, approachable worship and make room to respond to God’s presence.",
  },
  {
    time: "During The Service",
    title: "Weekly Communion",
    copy: "We share communion together, remembering Jesus and the life we have received through Him.",
  },
  {
    time: "Next 30–35 min",
    title: "A Practical Message",
    copy: "Expect Bible-centered teaching that is honest, useful and connected to everyday life.",
    href: "/api/sermons/latest",
    linkLabel: "Watch The Latest Message",
    external: true,
  },
  {
    time: "Closing",
    title: "Prayer And Closing",
    copy: "Share a prayer request if you would like, receive prayer or simply join us for the closing prayer.",
  },
  {
    time: "Next Step",
    title: "Want More?",
    copy: "Find a House Group and take your next step at Vineyard Florence.",
    href: "https://vineyard-florence.caaprojects.chatgpt.site/connect",
    linkLabel: "Click Here",
    titleLink: true,
  },
];

const sundayServices = [
  { label: "Service One", time: "9:00 AM" },
  { label: "Service Two", time: "11:00 AM" },
] as const;

const frequentlyAskedQuestions = [
  {
    question: "What should I wear?",
    answer: "Come as you are—jeans, a dress, a hoodie, work clothes, whatever feels like you. We mainly care that you are here. We do, however, recommend wearing clothes; beyond that, our fashion committee has been permanently disbanded.",
  },
  {
    question: "When should I arrive?",
    answer: "Plan to arrive about 15 minutes before either the 9:00 or 11:00 service. That gives you time to grab a good cup of coffee, meet someone, check in kids and find a seat without making an action-movie entrance at the last second.",
  },
  {
    question: "How long is each service—and what happens?",
    answer: "Each service usually lasts 75–80 minutes. We spend about 30–35 minutes in worship, share communion together and hear a practical, Bible-centered message for another 30–35 minutes. We close by making room for prayer and the Holy Spirit—and still respect your lunch plans.",
  },
  {
    question: "What should I expect if I bring kids?",
    answer: "A member of our Kids team will help you register and check in your children, answer your questions and guide you to the right kids area. First-time check-in takes a few extra minutes—tiny humans, surprisingly, come with logistics.",
  },
  {
    question: "Will I be singled out because I am new?",
    answer: "No. We will not ask you to stand, introduce yourself or wear a blinking ‘new person’ sign. You can participate as much or as little as you feel comfortable. Friendly hellos are likely; a surprise speech is not.",
  },
  {
    question: "What is the worship like?",
    answer: "Our worship is passionate, contemporary and focused on making room for God’s presence. You can sing, stand, listen or simply take it in. There is no vocal audition, and no one is grading your rhythm.",
  },
  {
    question: "Am I expected to give money?",
    answer: "No. Giving is a step for people who call Vineyard Florence home, not a cover charge for walking through the door. If you are visiting, be our guest. The coffee is free and does not arrive with an invoice.",
  },
  {
    question: "Can I come if I am not sure what I believe?",
    answer: "Absolutely. Questions, doubts and honest curiosity are welcome here. You do not need to clean up your life or finish your theology homework before you visit. None of us has everything figured out—and anyone who says otherwise probably needs more coffee.",
  },
  {
    question: "Can someone pray with me?",
    answer: "Yes. We make room near the end of each service for prayer requests and personal prayer, and you can also connect with someone afterward. Share as much or as little as you want; God already knows the unabridged edition.",
  },
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [heroMessage, setHeroMessage] = useState(0);
  const [heroCarouselPaused, setHeroCarouselPaused] = useState(false);
  const introTimerRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const finishIntro = useCallback(() => {
    if (introTimerRef.current) {
      window.clearTimeout(introTimerRef.current);
      introTimerRef.current = null;
    }
    try {
      window.sessionStorage.setItem("vf-intro-seen", "true");
    } catch {
      // The site still works when storage is unavailable.
    }
    document.documentElement.classList.remove("intro-playing");
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The menu is a dropdown: a click anywhere outside it closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target as Element).closest?.(".mobile-menu, .menu-toggle")) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    let introAlreadySeen = false;
    try {
      introAlreadySeen = window.sessionStorage.getItem("vf-intro-seen") === "true";
    } catch {
      // Continue with a first-visit intro when storage is unavailable.
    }

    if (prefersReducedMotion || introAlreadySeen) {
      document.documentElement.classList.remove("intro-playing");
      setIntroComplete(true);
      return;
    }

    document.documentElement.classList.add("intro-playing");
    const onIntroKeyDown = () => finishIntro();
    window.addEventListener("keydown", onIntroKeyDown);
    introTimerRef.current = window.setTimeout(finishIntro, 4900);

    return () => {
      if (introTimerRef.current) window.clearTimeout(introTimerRef.current);
      introTimerRef.current = null;
      window.removeEventListener("keydown", onIntroKeyDown);
      document.documentElement.classList.remove("intro-playing");
    };
  }, [finishIntro, prefersReducedMotion]);

  useEffect(() => {
    // Auto-advancing content is motion too; leave it on manual control.
    if (prefersReducedMotion) return;
    if (!introComplete || heroCarouselPaused) return;
    const timer = window.setTimeout(() => {
      setHeroMessage((current) => (current + 1) % heroMessages.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [heroMessage, heroCarouselPaused, introComplete, prefersReducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let lastHeaderState = false;

    // Smooth scrolling and parallax are motion the stylesheet cannot switch off,
    // because both are driven from JavaScript. Under a reduced-motion
    // preference the page keeps native scrolling and skips the parallax pass,
    // but still tracks scroll position so the sticky header and progress bar
    // keep working.
    const lenis = prefersReducedMotion
      ? null
      : new Lenis({
          duration: 1.28,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.82,
          touchMultiplier: 1.15,
          anchors: { offset: -76 },
        });

    const parallaxItems = prefersReducedMotion
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    const updateMotion = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll-progress", String(scrollY / maxScroll));
      root.style.setProperty("--hero-drift", `${Math.min(scrollY * 0.18, 130)}px`);
      root.style.setProperty("--hero-fade", String(Math.max(0, 1 - scrollY / 650)));

      const nextHeaderState = scrollY > 70;
      if (nextHeaderState !== lastHeaderState) {
        lastHeaderState = nextHeaderState;
        setHeaderSolid(nextHeaderState);
      }

      parallaxItems.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom > -120 && rect.top < window.innerHeight + 120) {
          const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
          element.style.setProperty("--parallax-y", `${centerOffset * -0.055}px`);
        }
      });
    };

    const raf = (time: number) => {
      lenis?.raf(time);
      updateMotion();
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Without Lenis intercepting them, in-page anchor links need the browser's
    // own smooth scrolling suppressed and the fixed header accounted for.
    const onAnchorClick = (nativeEvent: MouseEvent) => {
      if (!prefersReducedMotion) return;
      const link = (nativeEvent.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      nativeEvent.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "auto" });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onAnchorClick);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchorClick);
      revealObserver.disconnect();
      lenis?.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <main className="home-page">
      {!introComplete && (
        <div className="intro-curtain" role="button" aria-label="Skip introduction" onPointerDown={finishIntro}>
          <div className="intro-brand-lockup">
            <img className="intro-logo" src={logoWhiteUrl} alt="" width={logoSize.width} height={logoSize.height} fetchPriority="high" decoding="async" />
          </div>
          <div className="intro-mission-lockup">
            <div><span>UP.</span><span>IN.</span><span>OUT.</span></div>
            <small>LOVE GOD&nbsp;&nbsp;·&nbsp;&nbsp;MAKE DISCIPLES&nbsp;&nbsp;·&nbsp;&nbsp;IMPACT THE WORLD</small>
          </div>
          <span className="intro-circle-ring" />
          <span className="intro-skip-hint">Tap, Click Or Press Any Key To Enter</span>
        </div>
      )}
      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <header className={`site-header ${headerSolid ? "is-scrolled" : ""}`}>
        <div className="header-left">
          <button className="header-icon-button menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="site-navigation" aria-expanded={menuOpen} onClick={() => { setSearchOpen(false); setMenuOpen((open) => !open); }}>
            <span className="hamburger" aria-hidden="true"><i /><i /><i /></span>
            <span className="header-control-label">{menuOpen ? "Close" : "Menu"}</span>
          </button>
          <button
            className="header-icon-button search-toggle"
            type="button"
            aria-label={searchOpen ? "Close website search" : "Search this website"}
            aria-controls="site-search"
            aria-expanded={searchOpen}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen((open) => !open);
            }}
          >
            <span className="search-symbol" aria-hidden="true" />
            <span className="header-control-label">{searchOpen ? "Close" : "Search"}</span>
          </button>
          <a className="header-icon-button header-link watch-button" href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="Watch Vineyard Florence on YouTube">
            <span className="play-symbol" aria-hidden="true" />
            <span className="header-link-label">Watch</span>
          </a>
        </div>
        <a className="brand" href="#top" aria-label="Vineyard Florence Church home" onClick={closeSearch}>
          <img src={logoWhiteUrl} alt="Vineyard Florence Church" width={logoSize.width} height={logoSize.height} fetchPriority="high" decoding="async" />
        </a>
        <div className="header-right">
          <a className="header-icon-button header-link give-button" href={churchCenterGivingUrl} target="_blank" rel="noreferrer" aria-label="Give to Vineyard Florence through Church Center">
            <span className="give-symbol" aria-hidden="true" />
            <span className="header-link-label">Give</span>
          </a>
          <a
            className="header-icon-button header-link sign-in-button"
            href={churchCenterSignInUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Sign in to Vineyard Florence Church Center"
          >
            <span className="sign-in-symbol" aria-hidden="true"><i /></span>
            <span className="header-link-label sign-in-label">Sign in</span>
          </a>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="site-navigation">
          <nav aria-label="Primary navigation">
            {primaryNavigation.map((item) =>
              item.external ? (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                  <span className="nav-marker" aria-hidden="true"><i /><i /><i /></span> {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span className="nav-marker" aria-hidden="true"><i /><i /><i /></span> {item.label}
                </Link>
              ),
            )}
          </nav>
          <p>{serviceTimes}<br /><a href={directionsUrl} target="_blank" rel="noreferrer">{address.street}<br />{address.city}, {address.state} {address.zip} ↗</a></p>
        </div>
        <HeaderSearch id="site-search" open={searchOpen} onClose={closeSearch} />
      </header>

      <section className="hero" id="top" aria-label="Welcome to Vineyard Florence">
        <div className="hero-frame">
          <div className="hero-slideshow" aria-hidden="true">
            <video
              className="hero-video"
              autoPlay={!prefersReducedMotion}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/vineyard-florence/hero-video-poster.jpg"
            >
              <source src="/video/vineyard-florence-hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-shade" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow light hero-kicker">A Place To Belong Before You Become</p>
            <h1 aria-label="Love God. Make Disciples. Impact The World.">
              <span className="hero-line"><span>Love God.</span></span>
              <span className="hero-line"><span>Make Disciples.</span></span>
              <span className="hero-line hero-line-script"><span>Impact The World.</span></span>
            </h1>
            <div className="hero-actions">
              <a className="button button-light magnetic" href={churchCenterGroupsUrl} target="_blank" rel="noreferrer">Find A House Group <span aria-hidden="true">↗</span></a>
              <Link className="text-link light" href="/discipleship">Explore Discipleship <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <aside
            className="hero-overlay-card hero-message-carousel"
            aria-label="Featured announcements"
            aria-roledescription="carousel"
            onMouseEnter={() => setHeroCarouselPaused(true)}
            onMouseLeave={() => setHeroCarouselPaused(false)}
            onFocus={() => setHeroCarouselPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) setHeroCarouselPaused(false);
            }}
          >
            <div className="hero-card-meta">
              <span>{heroMessages[heroMessage].label}</span>
              <span>0{heroMessage + 1} / 0{heroMessages.length}</span>
            </div>
            <div className="hero-card-slide" key={heroMessage} aria-live="polite">
              <p>{heroMessages[heroMessage].copy}</p>
              <a className="hero-card-cta" href={heroMessages[heroMessage].href} target={heroMessages[heroMessage].href.startsWith("http") ? "_blank" : undefined} rel={heroMessages[heroMessage].href.startsWith("http") ? "noreferrer" : undefined}>
                {heroMessages[heroMessage].cta}<span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-card-nav">
              <div aria-label="Choose announcement">
                {heroMessages.map((message, index) => (
                  <button
                    key={message.label}
                    type="button"
                    className={index === heroMessage ? "is-active" : ""}
                    aria-label={`Show announcement ${index + 1}: ${message.label}`}
                    aria-current={index === heroMessage ? "true" : undefined}
                    onClick={() => setHeroMessage(index)}
                  />
                ))}
              </div>
              <button type="button" className="hero-card-next" aria-label="Show next announcement" onClick={() => setHeroMessage((current) => (current + 1) % heroMessages.length)}>→</button>
            </div>
          </aside>
          <div className="hero-outline-word" aria-hidden="true">FLORENCE</div>
          <a className="scroll-cue" href="#journey" aria-label="Scroll to the discipleship pathway"><span /> Explore discipleship</a>
        </div>
      </section>

      <section className="journey section-pad journey-primary" id="journey">
        <div className="journey-heading" data-reveal>
          <div className="section-index">01 — Discipleship Pathway</div>
          <div>
            <p className="eyebrow">Discipleship Is A Journey</p>
            <h2>Start Where You Are.<br /><em>Take One Step.</em></h2>
          </div>
        </div>
        <div className="journey-house-group-callout" data-reveal>
          <div>
            <TriadMark index={2} label="The Primary Place We Grow" />
            <h3>Discipleship Happens<br /><em>In Community.</em></h3>
          </div>
          <p>House Groups are our primary place for friendship, care, worship and growing to become more like Jesus in everyday life.</p>
          <a className="button button-light" href={churchCenterGroupsUrl} target="_blank" rel="noreferrer">Find A House Group <span aria-hidden="true">↗</span></a>
        </div>
        <div className="journey-board" data-reveal>
          <div className="journey-tabs" role="tablist" aria-label="Discipleship journey">
            {[
              ["Gather", "Sunday"],
              ["Grow", "House Groups"],
              ["Go", "Live It Out"],
            ].map(([verb, label], index) => (
              <button key={verb} role="tab" aria-selected={activeStep === index} onClick={() => setActiveStep(index)} className={activeStep === index ? "active" : ""}>
                <TriadMark index={(index + 1) as 1 | 2 | 3} /><strong>{verb}</strong><small>{label}</small>
              </button>
            ))}
          </div>
          <div className="journey-detail" role="tabpanel">
            <span className="journey-number">0{activeStep + 1}</span>
            <div key={activeStep}>
              <p className="eyebrow">{["Come And See", "Grow With Your People", "Live It Out"][activeStep]}</p>
              <h3>{[
                "Meet God And A Community Ready To Welcome You.",
                "Share Real Life Around A Table, Not Just A Row.",
                "Follow Jesus Into The Places He Has Already Sent You.",
              ][activeStep]}</h3>
              <p>{[
                "Our Sunday gathering is the front door: worship, practical teaching, prayer ministry and space to connect over coffee.",
                "House Groups are our primary place for friendship, care, worship and growing to become more like Jesus in everyday life.",
                "You do not need a title to go with Jesus. We will equip you to serve, make disciples and carry His life wherever you go.",
              ][activeStep]}</p>
              <a className="text-link" href={["/#visit", churchCenterGroupsUrl, "/connect#go"][activeStep]} target={activeStep === 1 ? "_blank" : undefined} rel={activeStep === 1 ? "noreferrer" : undefined}>{["Plan A Sunday", "Find A House Group", "Explore Ways To Go"][activeStep]} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="expect section-pad" id="what-to-expect">
        <div className="expect-intro" data-reveal>
          <div className="section-index">02 — What To Expect</div>
          <div>
            <p className="eyebrow">The First-Time Sunday Lowdown</p>
            <h2>Know The Rhythm.<br /><em>Feel At Home.</em></h2>
          </div>
          <p>Both services follow the same relaxed rhythm and usually last about 75–80 minutes. Plan to arrive 15 minutes early—especially if you are checking in kids for the first time. Come early, stay late—we’re so glad you want to visit us.</p>
        </div>

        <div className="expect-sunday-summary" id="visit" data-reveal>
          <div className="expect-service-options" aria-label="Sunday service times">
            {sundayServices.map((service) => (
              <div key={service.time}><span>{service.label}</span><strong>{service.time}</strong></div>
            ))}
          </div>
          <p><strong>75–80 Minutes.</strong> One relaxed, welcoming rhythm at either service.</p>
          <a href={directionsUrl} target="_blank" rel="noreferrer">{address.street}, {address.city} <span aria-hidden="true">↗</span></a>
        </div>

        <div className="expect-timelines">
          <article className="expect-service expect-service-shared" data-reveal="card">
            <div className="expect-service-label">
              <span>Your Sunday</span>
              <strong>9:00 &amp; 11:00</strong>
              <small>The Same Welcoming Flow</small>
            </div>
            <ol className="expect-rail">
              {sundayFlow.map((step) => (
                <li key={step.time}>
                  <time>{step.time}</time>
                  <strong>
                    {step.titleLink && step.href ? (
                      <a href={step.href}>{step.title}</a>
                    ) : step.title}
                  </strong>
                  <p>{step.copy}</p>
                  {step.linkLabel && step.href ? (
                    <a
                      className="expect-step-link"
                      href={step.href}
                      target={step.external ? "_blank" : undefined}
                      rel={step.external ? "noreferrer" : undefined}
                    >
                      {step.linkLabel} <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          </article>
        </div>

        <div className="expect-welcome-note" id="new-here" data-reveal>
          <div>
            <p className="eyebrow">There Is A Place For You Here</p>
            <h3>A Place To Belong Before You <em>Become.</em></h3>
          </div>
          <p>Come as you are—with your questions, your story and no pressure to have everything figured out. We are learning to follow Jesus together.</p>
          <div>
            <Link className="button button-dark" href="/connect">Plan Your Visit <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href={`mailto:${contactEmail}`}>Ask A Question <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="purpose" id="pathway">
        <div className="purpose-intro" data-reveal>
          <p className="eyebrow light">Our Way Of Life</p>
          <h2>Whole-Life Discipleship,<br />In Three Simple Movements.</h2>
          <p>Jesus invites us upward toward God, inward toward one another and outward toward the world He loves.</p>
        </div>
        <div className="purpose-grid">
          {[
            { number: "01", word: "UP", title: "Love God", copy: "Worship, prayer and the expectant presence of God shape everything we do." },
            { number: "02", word: "IN", title: "Make Disciples", copy: "We grow through authentic community, Scripture and life shared around the table." },
            { number: "03", word: "OUT", title: "Impact The World", copy: "We join Jesus in serving our neighbors and carrying hope into everyday places." },
          ].map((item, index) => (
            <article className="purpose-card" key={item.word} data-reveal="card">
              <span className="card-number"><TriadMark index={(index + 1) as 1 | 2 | 3} />{item.number}</span><span className="giant-word">{item.word}</span>
              <div><h3>{item.title}</h3><p>{item.copy}</p><Link href="/discipleship" aria-label={`Explore ${item.title}`}>Explore <span aria-hidden="true">↗</span></Link></div>
            </article>
          ))}
        </div>
      </section>

      <div className="word-ribbon" aria-hidden="true">
        <div>GOD LOVES US AND HE LIKES US <i>△</i> HEAVENLY-MINDED AND EARTHLY GOOD <i>△</i> JESUS-EVERYTHING PEOPLE <i>△</i> ANCHORED IN THE WORD <i>△</i> WALKING IN THE SPIRIT <i>△</i> DO WHAT JESUS DID <i>△</i> GOD LOVES US AND HE LIKES US <i>△</i> HEAVENLY-MINDED AND EARTHLY GOOD <i>△</i> JESUS-EVERYTHING PEOPLE <i>△</i> ANCHORED IN THE WORD <i>△</i> WALKING IN THE SPIRIT <i>△</i> DO WHAT JESUS DID <i>△</i></div>
      </div>

      <section className="prayer section-pad" id="prayer">
        <div className="prayer-visual">
          <img data-parallax src="/images/vineyard-florence/prayer-community.webp" alt="Vineyard Florence members praying together" width={1440} height={960} loading="lazy" decoding="async" />
          <div className="image-note"><span>PRAYER</span><strong>is where<br />movement begins.</strong></div>
        </div>
        <div className="prayer-copy" data-reveal>
          <div className="section-index">03 — Prayer</div>
          <p className="eyebrow">Our First Response, Not Our Last Resort</p>
          <h2>Everything<br />Starts With <em>Prayer.</em></h2>
          <p>Prayer is more than something we do—it is how we stay connected to God and join what He is already doing. Every disciple-making movement is first a prayer movement.</p>
          <Link className="button button-dark" href="/prayer">Enter The Prayer Hub <span aria-hidden="true">↗</span></Link>
          <Link className="prayer-request" href={prayerRequestUrl}><span>Need Prayer?</span><strong>We would be honored to pray with you.</strong><b aria-hidden="true">→</b></Link>
        </div>
      </section>

      <section className="impact" id="impact">
        <div className="impact-top section-pad" data-reveal>
          <div className="section-index">05 — Outward</div>
          <div>
            <p className="eyebrow">The Kingdom Comes Close</p>
            <h2>Faith That Moves<br /><em>Beyond Our Walls.</em></h2>
          </div>
          <p>We believe transformed people transform places. So we show up—with practical help, generous hearts and the hope of Jesus.</p>
        </div>
        <div className="impact-grid">
          <a className="impact-card impact-large" href="#footer" data-reveal="card">
            <img data-parallax src="/images/vineyard-florence/local-care.webp" alt="A Vineyard Florence member praying with someone in the community" width={1114} height={821} loading="lazy" decoding="async" />
            <span className="impact-label"><TriadMark index={1} />Local impact</span>
            <div><small>Serve Northern Kentucky</small><h3>For Our Neighbors.<br />For The City.</h3><p>Food, recovery, practical care and the love of Jesus.</p></div><b aria-hidden="true">↗</b>
          </a>
          <a className="impact-card impact-vinedresser" href={vinedresserUrl} target="_blank" rel="noreferrer" aria-label="Visit The Vinedresser website" data-reveal="card">
            <img src="/images/vineyard-florence/vinedresser.webp" alt="The Vinedresser, a foster and kinship shop" width={1375} height={1345} loading="lazy" decoding="async" />
            <span className="impact-label"><TriadMark index={2} />Foster + kinship</span>
            <div><small>The Vinedresser</small><h3>Making Room<br />For Families.</h3></div><b aria-hidden="true">↗</b>
          </a>
          <a className="impact-card impact-color" href="/merp" data-reveal="card">
            <span className="impact-label"><TriadMark index={3} />Global mission</span>
            <div><small>Give, Go, Pray</small><h3>Hope Has<br />No Borders.</h3><p>Partnering with disciple-making movements near and far.</p></div><b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <section className="give-section section-pad" id="give" aria-labelledby="giving-title">
        <div className="give-copy" data-reveal>
          <div className="section-index">06 — Generosity</div>
          <div>
            <p className="eyebrow light">Generosity That Moves Outward</p>
            <h2 id="giving-title">At Least <em>$1</em> Out Of Every <em>$5</em> Leaves The Building.</h2>
            <p className="give-intro">We believe generosity should carry the hope of Jesus well beyond a Sunday service. Your giving helps fuel practical care, local outreach and ministry beyond our walls.</p>
            <div className="give-actions">
              <a className="button button-light" href={churchCenterGivingUrl} target="_blank" rel="noreferrer" aria-label="Give securely to Vineyard Florence through Church Center">
                Give now <span aria-hidden="true">↗</span>
              </a>
              <a
                className="button give-crypto-button"
                href={everyOrgCryptoGivingUrl}
                aria-label="Donate cryptocurrency to Vineyard Florence through Every.org"
              >
                Donate crypto <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link light" href="#impact">See the impact <span aria-hidden="true">↑</span></a>
            </div>
            <p className="give-crypto-note">Cryptocurrency gifts are securely processed through Every.org.</p>
          </div>
        </div>

        <Script async defer src="https://embeds.every.org/0.4/button.js" strategy="lazyOnload" />

        <aside className="give-ratio" aria-label="At least one dollar out of every five leaves the building" data-reveal="card">
          <span className="give-ratio-kicker">At least</span>
          <strong><span>$1</span><i aria-hidden="true">/</i><span>$5</span></strong>
          <div className="give-ratio-bars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <p>Moving beyond the building to serve people and advance the mission.</p>
        </aside>

        <div className="give-path" data-reveal>
          <div><TriadMark index={1} /><strong>One Clear Step</strong><p>Continue directly to Vineyard Florence&apos;s Church Center giving page.</p></div>
          <div><TriadMark index={2} /><strong>Secure And Simple</strong><p>A familiar giving experience designed to make generosity easy.</p></div>
          <div><TriadMark index={3} /><strong>Purpose Beyond Walls</strong><p>Your gift helps make ministry possible inside the church and throughout the community.</p></div>
        </div>
      </section>

      <section className="next-grid" id="events">
        {[
          { title: "House Groups", copy: "Real relationships, shared meals and discipleship woven into ordinary life.", image: "/images/vineyard-florence/house-groups-table.webp", alt: "Friends sharing conversation around a table at Vineyard Florence", width: 1440, height: 960, href: churchCenterGroupsUrl },
          { title: "Vineyard Kids", copy: "A safe, fun and Spirit-led place where children can know God for themselves.", image: "/images/vineyard-florence/kids-2026/kids-worship-wide.webp", alt: "Children worshiping together in Vineyard Kids", width: 1536, height: 1152, href: "/kids" },
          { title: "Vineyard Students", copy: "Helping middle and high school students build a faith that becomes their own.", image: "/images/vineyard-florence/vineyard-students.webp", alt: "Vineyard Florence students enjoying an outdoor gathering", width: 1600, height: 1200, href: "/students" },
        ].map((card) => (
          <a className="next-card" href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined} key={card.title} data-reveal="card">
            <img data-parallax src={card.image} alt={card.alt} width={card.width} height={card.height} loading="lazy" decoding="async" />
            <div><span>{card.title === "House Groups" ? "The Primary Place We Grow" : "Explore"}</span><h3>{card.title}</h3><p>{card.copy}</p><b aria-hidden="true">↗</b></div>
          </a>
        ))}
      </section>

      <section className="ministry-shortcuts section-pad" id="ministries" aria-labelledby="ministry-shortcuts-title">
        <div className="ministry-shortcuts-heading" data-reveal>
          <div><p className="eyebrow">Find Your People</p><h2 id="ministry-shortcuts-title">Ministry For<br /><em>Every Season.</em></h2></div>
          <p>Explore the communities and ministries that help people connect, heal, grow and live the way of Jesus together.</p>
          <Link className="button button-dark" href="/ministries">View All Ministries <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="ministry-shortcut-grid" data-reveal>
          <Link href="/kids">Vineyard Kids <span aria-hidden="true">↗</span></Link>
          <Link href="/students">Vineyard Students <span aria-hidden="true">↗</span></Link>
          <a href={celebrateRecoveryUrl} target="_blank" rel="noreferrer">Celebrate Recovery <span aria-hidden="true">↗</span></a>
          <a href={mensHealthySexualityUrl} target="_blank" rel="noreferrer">Men&apos;s Healthy Sexuality <span aria-hidden="true">↗</span></a>
          <Link href="/ministries#men">Men&apos;s Ministry <span aria-hidden="true">↗</span></Link>
          <Link href="/ministries#women">Women&apos;s Ministry <span aria-hidden="true">↗</span></Link>
          <Link href="/merp">MERP <span aria-hidden="true">↗</span></Link>
          <a href={latviaFacebookUrl} target="_blank" rel="noreferrer">Latvia <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="faq-top" data-reveal>
          <div className="section-index">07 — Good questions</div>
          <div className="faq-heading">
            <p className="eyebrow">Before You Arrive</p>
            <h2>Q&amp;A?<br /><em>Ask Away.</em></h2>
          </div>
          <p>Clear answers for the things people actually wonder about before visiting—no church-speak decoder required.</p>
        </div>

        <div className="faq-layout">
          <aside className="faq-prompt" data-reveal="card">
            <span className="faq-mark" aria-hidden="true">?</span>
            <div>
              <p className="eyebrow light">Still Curious?</p>
              <h3>There Are No Silly Questions. Some Are Just Better Over Coffee.</h3>
              <a className="button button-light" href={`mailto:${contactEmail}`}>Ask us something <span aria-hidden="true">↗</span></a>
            </div>
          </aside>

          <div className="faq-list" data-reveal>
            {frequentlyAskedQuestions.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-toggle" aria-hidden="true"><i /><i /></span>
                </summary>
                <div className="faq-answer"><div><p>{item.answer}</p></div></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter reveal />

      <SiteTicker />
    </main>
  );
}
