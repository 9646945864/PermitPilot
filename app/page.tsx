"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import "./globals.css";
import { PROJECT_LABELS, RULES, STATUS_LABELS } from "../data/rules";

// Paste your Google Form link here. Until then the button shows "Feedback form coming soon".
const FEEDBACK_URL = "";

type Scene = { num: string; label: string; kicker: string; title: string; accent: string; body: string; note: string };

const scenes: Scene[] = [
  { num: "01", label: "The plan", kicker: "Start with the plan", title: "A deck, a drawing, and a permit question.", accent: "DRAW IT", body: "Tell Permivo what you’re building and where. See which reviews may apply before you start.", note: "Project details → likely reviews" },
  { num: "02", label: "The route", kicker: "Follow the route", title: "Two agencies. One clear route.", accent: "ROUTE IT", body: "See city and county steps side by side, with the times agencies state and a link to every source.", note: "City + county → one view" },
  { num: "03", label: "The wait", kicker: "Track the wait", title: "Know where it stands.", accent: "TRACK IT", body: "Log every comment, hold, and resubmission. Compare your real timeline with what agencies say.", note: "Submitted → in review → done" },
  { num: "04", label: "The seal", kicker: "Keep the proof", title: "Approved, with the dates to prove it.", accent: "PROVE IT", body: "Every rule shows its source and whether it’s verified. Anything unconfirmed is marked that way.", note: "Source-backed → easy to trust" },
];

function Mark() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="brand-logo" src="/logo/permivo-logo-a.svg" alt="" aria-hidden="true" />;
}

function SceneArt({ index, tilt }: { index: number; tilt: { x: number; y: number } }) {
  return (
    <div className="art-shell" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
      <div className="art-sky" />
      <div className={`art-object object-${index}`}>
        {index === 0 && <><div className="house-roof" /><div className="house" /><div className="blueprint" /></>}
        {index === 1 && <><div className="agency agency-left">CITY</div><div className="agency agency-right">COUNTY</div><div className="route-line" /><div className="route-dot" /></>}
        {index === 2 && <><div className="calendar"><div className="calendar-top" /><div className="calendar-grid">{Array.from({ length: 16 }, (_, i) => <i key={i} className={i < 7 ? "filled" : ""} />)}</div></div><div className="clock" aria-hidden="true" /></>}
        {index === 3 && <><div className="certificate"><b>VERIFIED</b><span>source-backed rules</span></div><div className="seal">✓</div><i className="confetti c1" /><i className="confetti c2" /><i className="confetti c3" /></>}
      </div>
      <div className="art-ground" />
      <div className="art-caption"><span>{scenes[index].accent}</span><small>{scenes[index].note}</small></div>
    </div>
  );
}

export default function Home() {
  const [scene, setScene] = useState(0);
  const [filter, setFilter] = useState<"all" | "verified" | "open">("all");
  const [showAll, setShowAll] = useState(true);
  const [showSceneDetails, setShowSceneDetails] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("permivo-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;
    setDarkMode(nextDarkMode);
    document.documentElement.dataset.theme = nextDarkMode ? "dark" : "light";
    requestAnimationFrame(() => setPageReady(true));
  }, []);

  function toggleTheme() {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    document.documentElement.dataset.theme = nextDarkMode ? "dark" : "light";
    window.localStorage.setItem("permivo-theme", nextDarkMode ? "dark" : "light");
  }

  const verifiedCount = RULES.filter((rule) => rule.status === "verified").length;
  const filteredRules = useMemo(
    () => RULES.filter((rule) => filter === "all" || (filter === "verified" ? rule.status === "verified" : rule.status !== "verified")),
    [filter]
  );
  const current = scenes[scene];

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!stageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    setTilt({
      x: Number((((event.clientY - rect.top) / rect.height) * -8 + 4).toFixed(2)),
      y: Number((((event.clientX - rect.left) / rect.width) * 12 - 6).toFixed(2)),
    });
  }

  function handleStoryKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") setScene((value) => Math.min(scenes.length - 1, value + 1));
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") setScene((value) => Math.max(0, value - 1));
  }

  return (
    <main className={`home-page page-shell ${pageReady ? "is-ready" : ""}`}>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Permivo home"><Mark /><span>permivo</span></Link>
        <nav>
          <a href="#tools">Tools</a>
          <a href="#status">Status</a>
          <Link href="/planner" className="nav-tool-link">Planner</Link>
          <Link href="/tracker" className="nav-tool-link">Tracker</Link>
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={darkMode}>
            <span className="theme-icon">{darkMode ? "☼" : "☾"}</span>
            <span className="theme-label">{darkMode ? "Light" : "Dark"}</span>
          </button>
          <Link href="/planner" className="header-cta">Try the planner <span>↗</span></Link>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">PERMITS, WITHOUT THE GUESSWORK</p>
          <h1 id="hero-title">The clearer route to <em>getting built.</em></h1>
          <p className="hero-lede">Permivo helps small residential contractors understand what comes next — before a permit turns into a surprise.</p>
          <div className="hero-actions">
            <Link href="/planner" className="primary-button">Plan a project <span>→</span></Link>
            <a href="#how-it-works" className="text-link">See how it works <span>↓</span></a>
          </div>
          <div className="trust-row"><span><b>01</b> Mecklenburg County</span><span><b>●</b> Sources, not guesses</span></div>
        </div>
        <div className="hero-aside">
          <div className="hero-image-wrap">
            <div className="hero-image-label">AI-ASSISTED PERMIT ROUTING</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/permit-ai-hero.png"
              alt="A small residential contractor using AI-assisted permit guidance beside a house plan"
              className="hero-image"
              width={800}
              height={600}
            />
          </div>
          <div className="aside-stamp">NC<br /><b>✦</b><br />BUILD<br />BETTER</div>
        </div>
      </section>

      <section id="how-it-works" className="story-section">
        <div className="story-intro">
          <p className="eyebrow">A BETTER WAY THROUGH</p>
          <h2>Four moments that make the process <em>feel lighter.</em></h2>
          <p>Use the controls or arrow keys to move through the route.</p>
        </div>
        <div className="story-pin">
          <div className="story-grid">
            <div className="story-controls" role="tablist" aria-label="How Permivo works" onKeyDown={handleStoryKey}>
              {scenes.map((item, index) => (
                <button key={item.num} className={scene === index ? "active" : ""} onClick={() => setScene(index)} role="tab" aria-selected={scene === index}>
                  <span>{item.num}</span><strong>{item.label}</strong><i />
                </button>
              ))}
            </div>
            <div className="story-card">
              <div className="story-text" key={scene}>
                <p className="eyebrow orange">{current.num} · {current.kicker.toUpperCase()}</p>
                <h3>{current.title}</h3>
                <p>{current.body}</p>
                {scene === 2 && (
                  <div className="scene-details">
                    <div><b>Current status</b><span>Review timeline is active</span></div>
                    <div><b>Next move</b><span>Log the next agency comment</span></div>
                    <button type="button" onClick={() => setShowSceneDetails((value) => !value)}>{showSceneDetails ? "Hide details ↑" : "Show details ↓"}</button>
                  </div>
                )}
                {scene !== 2 || showSceneDetails ? (
                  <Link href="/planner" className="text-link">Explore the planner <span>→</span></Link>
                ) : (
                  <button type="button" className="text-link detail-reopen" onClick={() => setShowSceneDetails(true)}>Show details <span>↓</span></button>
                )}
              </div>
              <div className="art-stage" ref={stageRef} onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
                <SceneArt index={scene} tilt={tilt} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="tools-section">
        <div className="section-heading">
          <div><p className="eyebrow">05 · THE TOOLS</p><h2>Three tools, <em>one route.</em></h2></div>
          <p>Everything you need to move from “what if?” to “what’s next?”</p>
        </div>
        <div className="tool-grid">
          <Link href="/planner" className="tool-card featured">
            <span className="tool-number">01 / LIVE</span>
            <h3>Route planner <span>↗</span></h3>
            <p>Pick a project and location. See which reviews may apply, with stated times and sources.</p>
            <div className="card-arrow">Open planner →</div>
          </Link>
          <Link href="/tracker" className="tool-card">
            <span className="tool-number">02 / LIVE</span>
            <h3>Permit tracker <span>↗</span></h3>
            <p>Log dates, comments, and holds. Keep your real timeline in view.</p>
            <div className="card-arrow">Open tracker →</div>
          </Link>
          <div className="tool-card coming">
            <span className="tool-number">03 / SOON</span>
            <h3>Readiness checklist</h3>
            <p>Understand what each requirement is, why it exists, and how to complete it.</p>
            <div className="card-arrow">Coming next</div>
          </div>
        </div>
      </section>

      <section id="status" className="status-section">
        <div className="section-heading">
          <div><p className="eyebrow">06 · CHECKED</p><h2>Clarity you can <em>act on.</em></h2></div>
          <p>We label what’s verified, what’s likely, and what still needs a call.</p>
        </div>
        <div className="status-layout">
          <div className="status-score">
            <div className="score-ring"><strong>{verifiedCount}</strong><span>of {RULES.length}</span></div>
            <p>rules verified by an official source or written agency reply.</p>
            <button className="filter-button" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Hide details" : "View status details"} <span>{showAll ? "↑" : "↓"}</span>
            </button>
          </div>
          <div className="status-list">
            <div className="filter-tabs" role="tablist">
              {(["all", "verified", "open"] as const).map((item) => (
                <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>
                  {item === "all" ? "All rules" : item === "verified" ? "Verified" : "To confirm"}
                </button>
              ))}
            </div>
            {showAll && (
              <div className="rule-list">
                {filteredRules.map((rule) => (
                  <div className="rule-row" key={rule.id}>
                    <span className={`status-dot ${rule.status}`} />
                    <div>
                      <b>{rule.title}</b>
                      <small>{rule.projects.map((p) => PROJECT_LABELS[p]).join(", ")} · {rule.note}</small>
                    </div>
                    <span className="rule-status">{STATUS_LABELS[rule.status]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="feedback-section" id="feedback">
        <div><p className="eyebrow orange">07 · FEEDBACK</p><h2>Help make the next step <em>clearer.</em></h2></div>
        <div>
          <p>We’re starting with small residential contractors in Mecklenburg County. If you’ve pulled a permit recently, your experience tells us what to build next.</p>
          {FEEDBACK_URL ? (
            <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" className="outline-button">Share your experience <span>↗</span></a>
          ) : (
            <span className="outline-button">Feedback form coming soon</span>
          )}
        </div>
      </section>

      <footer>
        <Link href="/" className="brand"><Mark /><span>permivo</span></Link>
        <span>Early prototype · Not legal advice</span>
        <span><Link href="/planner">Planner</Link><Link href="/tracker">Tracker</Link></span>
      </footer>
    </main>
  );
}
