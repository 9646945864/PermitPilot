"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { RULES } from "../data/rules";

const display = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display" });
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
const monoFont = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// Paste your Google Form link here. Until then the feedback button shows as "coming soon".
const FEEDBACK_URL = "";

const O = "#F26B1D"; // main orange
const DEEP = "#C2500F"; // dark orange (white text passes contrast on this)
const LIGHT = "#FFF1E8";
const CREAM = "#FFF8F1";
const INK = "#1F1A17";
const MUTED = "#6B5E55";

const D = { fontFamily: "var(--font-display), Georgia, serif" } as const;
const M = { fontFamily: "var(--font-mono), ui-monospace, monospace" } as const;

const SCENES = [
  {
    num: "01",
    label: "The plan",
    kicker: "We start with the plan",
    title: ["A deck, a drawing and ", "a permit question."],
    body: "Tell Permivo what you’re building and where. See which reviews may apply before you start.",
  },
  {
    num: "02",
    label: "The route",
    kicker: "Two agencies, one route",
    title: ["Inside Charlotte, ", "the city and county both review."],
    body: "See each step side by side, with the times the agencies state and a link to where each one comes from.",
  },
  {
    num: "03",
    label: "The wait",
    kicker: "Keep track as you go",
    title: ["Know where it ", "stands."],
    body: "Log every comment, hold, and resubmission. Compare your real timeline with what the agencies say.",
  },
  {
    num: "04",
    label: "The seal",
    kicker: "Nothing guessed",
    title: ["Approved, with ", "the dates to prove it."],
    body: "Every rule shows its source and whether it’s verified. Anything unconfirmed is marked that way.",
  },
] as const;

const CSS = `
@keyframes rise{from{transform:rotateX(-78deg);opacity:0}to{transform:rotateX(0);opacity:1}}
@keyframes fadeup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.rise{transform-origin:50% 100%;animation:rise .9s cubic-bezier(.2,.8,.2,1) both}
.fadeup{animation:fadeup .6s ease both}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion: reduce){.rise,.fadeup{animation:none}html{scroll-behavior:auto}}
`;

function Layer({ z, children }: { z: number; children: ReactNode }) {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `translateZ(${z}px)`, filter: "drop-shadow(0 6px 6px rgba(120,50,10,0.25))" }}
    >
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
        {children}
      </svg>
    </div>
  );
}

function Sky() {
  return (
    <>
      <circle cx="310" cy="70" r="36" fill="#FFC48A" />
      <ellipse cx="90" cy="62" rx="38" ry="12" fill="#FFFFFF" />
      <ellipse cx="116" cy="54" rx="26" ry="10" fill="#FFFFFF" />
      <path d="M0 210Q90 150 180 200T400 190V300H0Z" fill="#FFD8B8" />
    </>
  );
}

function ScenePlan() {
  return (
    <>
      <Layer z={0}>
        <Sky />
      </Layer>
      <Layer z={24}>
        <rect x="105" y="128" width="140" height="92" fill="#FFFFFF" />
        <polygon points="95,132 175,78 255,132" fill={DEEP} />
        <rect x="212" y="88" width="14" height="30" fill="#8F3A09" />
        <rect x="162" y="168" width="26" height="52" fill={O} />
        <rect x="120" y="148" width="28" height="26" fill="#FFE4CC" />
        <rect x="204" y="148" width="28" height="26" fill="#FFE4CC" />
      </Layer>
      <Layer z={48}>
        <path d="M0 250Q100 226 200 246T400 238V300H0Z" fill="#F7A267" />
        <rect x="238" y="206" width="128" height="10" fill={O} />
        <g stroke={DEEP} strokeWidth="1.5">
          <path d="M262 206V216M286 206V216M310 206V216M334 206V216" />
        </g>
        <g fill={DEEP}>
          <rect x="242" y="216" width="6" height="34" />
          <rect x="300" y="216" width="6" height="34" />
          <rect x="358" y="216" width="6" height="34" />
        </g>
        <path d="M242 188H366" stroke={DEEP} strokeWidth="4" strokeLinecap="round" />
        <path d="M250 188V206M274 188V206M298 188V206M322 188V206M346 188V206M362 188V206" stroke={DEEP} strokeWidth="3" />
      </Layer>
      <Layer z={72}>
        <g transform="rotate(-6 80 190)">
          <rect x="32" y="150" width="104" height="76" rx="4" fill={CREAM} stroke={O} strokeWidth="2" />
          <path d="M44 168H124M44 184H124M44 200H124M62 156V220M88 156V220M112 156V220" stroke="#FFD0A8" strokeWidth="1" />
          <path d="M52 212H116M52 207V217M116 207V217" stroke={DEEP} strokeWidth="2" />
          <rect x="56" y="178" width="30" height="22" fill="none" stroke={DEEP} strokeWidth="2.5" />
        </g>
      </Layer>
    </>
  );
}

function SceneRoute() {
  return (
    <>
      <Layer z={0}>
        <Sky />
      </Layer>
      <Layer z={24}>
        <rect x="34" y="150" width="120" height="70" fill="#FFFFFF" />
        <polygon points="26,152 94,112 162,152" fill={DEEP} />
        <g fill="#FFE4CC">
          <rect x="46" y="164" width="10" height="56" />
          <rect x="68" y="164" width="10" height="56" />
          <rect x="90" y="164" width="10" height="56" />
          <rect x="112" y="164" width="10" height="56" />
          <rect x="134" y="164" width="10" height="56" />
        </g>
        <rect x="250" y="130" width="120" height="90" fill="#FFFFFF" />
        <rect x="250" y="122" width="120" height="12" fill={DEEP} />
        <g fill="#FFE4CC">
          <rect x="262" y="146" width="26" height="22" />
          <rect x="300" y="146" width="26" height="22" />
          <rect x="338" y="146" width="22" height="22" />
          <rect x="262" y="182" width="26" height="22" />
          <rect x="338" y="182" width="22" height="22" />
        </g>
        <rect x="302" y="182" width="24" height="38" fill={O} />
        <path d="M310 122V96" stroke="#8F3A09" strokeWidth="3" />
        <path d="M310 96H334L326 104L334 112H310Z" fill={O} />
      </Layer>
      <Layer z={48}>
        <path d="M0 252Q100 232 200 250T400 244V300H0Z" fill="#F7A267" />
        <g fill="none" stroke={DEEP} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 10">
          <path d="M96 232C130 262 160 252 184 236" />
          <path d="M310 232C276 262 246 252 222 236" />
        </g>
      </Layer>
      <Layer z={72}>
        <circle cx="203" cy="216" r="26" fill="#FFFFFF" />
        <circle cx="203" cy="216" r="20" fill={O} />
        <path d="M193 216L200 223L214 208" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Layer>
    </>
  );
}

function SceneWait() {
  return (
    <>
      <Layer z={0}>
        <Sky />
      </Layer>
      <Layer z={24}>
        <rect x="70" y="62" width="190" height="170" rx="10" fill="#FFFFFF" />
        <path d="M70 72a10 10 0 0 1 10-10H250a10 10 0 0 1 10 10V96H70Z" fill={O} />
        <rect x="104" y="50" width="8" height="26" rx="4" fill="#8F3A09" />
        <rect x="218" y="50" width="8" height="26" rx="4" fill="#8F3A09" />
        {Array.from({ length: 20 }, (_, i) => {
          const c = i % 5;
          const r = Math.floor(i / 5);
          const fill = i < 8 ? O : i < 11 ? DEEP : "#FFE4CC";
          return <rect key={i} x={86 + c * 32} y={108 + r * 28} width="24" height="20" rx="4" fill={fill} />;
        })}
        <circle cx="262" cy="118" r="18" fill={INK} />
        <rect x="255" y="109" width="5" height="18" rx="2" fill="#FFFFFF" />
        <rect x="265" y="109" width="5" height="18" rx="2" fill="#FFFFFF" />
      </Layer>
      <Layer z={48}>
        <path d="M0 262Q100 244 200 260T400 254V300H0Z" fill="#F7A267" />
        <path d="M60 272H340" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <g fill="#FFFFFF" stroke={DEEP} strokeWidth="3">
          <circle cx="60" cy="272" r="7" />
          <circle cx="140" cy="272" r="7" />
          <circle cx="220" cy="272" r="7" />
          <circle cx="300" cy="272" r="7" />
        </g>
        <circle cx="340" cy="272" r="9" fill={DEEP} />
      </Layer>
      <Layer z={72}>
        <circle cx="330" cy="130" r="32" fill="#FFFFFF" stroke={O} strokeWidth="4" />
        <path d="M330 130V110M330 130L346 138" stroke={DEEP} strokeWidth="4" strokeLinecap="round" />
        <circle cx="330" cy="130" r="3.5" fill={DEEP} />
      </Layer>
    </>
  );
}

function SceneSeal() {
  const bumps = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return { x: 200 + 52 * Math.cos(a), y: 160 + 52 * Math.sin(a) };
  });
  const confetti: [number, number, number, string][] = [
    [60, 70, 20, O],
    [110, 40, -30, DEEP],
    [310, 60, 35, "#F7A267"],
    [350, 120, -15, O],
    [50, 160, -25, "#F7A267"],
    [345, 210, 20, DEEP],
    [70, 230, 40, O],
  ];
  return (
    <>
      <Layer z={0}>
        <g transform="translate(200 160)">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M0 0L-30 -240L30 -240Z" transform={`rotate(${i * 30})`} fill={i % 2 ? "#FFE4CC" : "#FFD8B8"} />
          ))}
        </g>
      </Layer>
      <Layer z={24}>
        <rect x="118" y="52" width="164" height="210" rx="8" fill="#FFFFFF" />
        <rect x="136" y="70" width="80" height="8" rx="4" fill="#FFD0A8" />
        <rect x="136" y="86" width="52" height="6" rx="3" fill="#FFE4CC" />
        <rect x="136" y="236" width="128" height="6" rx="3" fill="#FFE4CC" />
      </Layer>
      <Layer z={48}>
        <path d="M178 196L160 262L190 248L204 268L216 200Z" fill="#B8480B" />
        <path d="M222 196L240 262L210 248L196 268L184 200Z" fill="#8F3A09" />
        {bumps.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="13" fill={O} />
        ))}
        <circle cx="200" cy="160" r="52" fill={O} />
        <circle cx="200" cy="160" r="42" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="2 4" />
        <circle cx="200" cy="160" r="34" fill={CREAM} />
        <path d="M184 160L196 172L220 146" stroke={DEEP} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Layer>
      <Layer z={72}>
        {confetti.map(([x, y, r, c], i) => (
          <rect key={i} x={x} y={y} width="14" height="7" rx="2" fill={c} transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </Layer>
    </>
  );
}

const ART = [ScenePlan, SceneRoute, SceneWait, SceneSeal];

function Logo({ size = 36 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo/permivo-logo-a.svg" alt="Permivo" width={size} height={size} />
  );
}

export default function Home() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    const stage = stageRef.current;
    if (!el || !stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const scaled = p * SCENES.length;
      const idx = Math.min(SCENES.length - 1, Math.floor(scaled));
      setScene((s) => (s === idx ? s : idx));
      if (!reduce) stage.style.setProperty("--turn", `${(scaled - idx - 0.5) * 10}deg`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + ((i + 0.5) / SCENES.length) * total });
  }, []);

  const s = SCENES[scene];
  const Art = ART[scene];
  const verified = RULES.filter((r) => r.status === "verified").length;
  const unconfirmed = RULES.filter((r) => r.status === "partly" || r.status === "likely").length;
  const open = RULES.filter((r) => r.status === "unverified");

  return (
    <div
      className={`${display.variable} ${bodyFont.variable} ${monoFont.variable}`}
      style={{ background: CREAM, color: INK, fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-5 sm:px-8"
        style={{ background: "rgba(255,248,241,0.85)", backdropFilter: "blur(8px)" }}
      >
        <Link href="/" aria-label="Permivo home" className="flex items-center">
          <Logo size={40} />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm sm:gap-6">
          <a href="#tools" className="hidden sm:inline">Tools</a>
          <a href="#status" className="hidden sm:inline">Status</a>
          <Link href="/planner" className="hidden sm:inline">Planner</Link>
          <Link href="/tracker" className="hidden sm:inline">Tracker</Link>
          <Link
            href="/planner"
            className="rounded-md px-4 py-2 font-medium text-white"
            style={{ background: DEEP }}
          >
            Try the planner
          </Link>
        </nav>
      </header>

      <section ref={sectionRef} style={{ height: "420vh" }} className="relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-16">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${LIGHT} 1.5px, transparent 1.5px)`,
              backgroundSize: "22px 22px",
              opacity: 0.9,
            }}
          />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-5 sm:px-8 md:grid-cols-[0.85fr_1.15fr]">
            <div key={scene} className="fadeup order-2 md:order-1" aria-live="polite">
              <p className="text-xs tracking-widest" style={{ ...M, color: DEEP }}>
                {s.num} · {s.kicker.toUpperCase()}
              </p>
              <h1
                className="mt-3"
                style={{ ...D, fontSize: "clamp(2rem, 4.6vw, 3.8rem)", lineHeight: 1.06, fontWeight: 400 }}
              >
                {s.title[0]}
                <em style={{ color: O }}>{s.title[1]}</em>
              </h1>
              <p className="mt-4 max-w-md text-base" style={{ color: MUTED }}>
                {s.body}
              </p>
              {scene === SCENES.length - 1 && (
                <Link
                  href="/planner"
                  className="mt-6 inline-block rounded-md px-5 py-3 text-sm font-medium text-white"
                  style={{ background: DEEP }}
                >
                  Open the planner
                </Link>
              )}
            </div>

            <div className="order-1 md:order-2" style={{ perspective: "1400px" }}>
              <div
                ref={stageRef}
                className="relative mx-auto w-full max-w-[640px]"
                style={{
                  aspectRatio: "4 / 3.4",
                  transformStyle: "preserve-3d",
                  transform: "rotateX(10deg) rotateY(var(--turn, 0deg))",
                  transition: "transform 0.15s linear",
                }}
              >
                <div
                  className="absolute left-[8%] right-[8%] top-0 bottom-[22%]"
                  style={{
                    transform: "translateZ(0)",
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(#FFE4CC, #FFF8F1)",
                    borderRadius: 6,
                  }}
                >
                  <div key={scene} className="rise absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                    <Art />
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute left-[2%] right-[2%]"
                  style={{
                    top: "78%",
                    height: "34%",
                    transformOrigin: "50% 0%",
                    transform: "rotateX(70deg)",
                    background: `repeating-linear-gradient(45deg, #F7A267 0 14px, #F26B1D 14px 28px)`,
                    boxShadow: "0 18px 30px rgba(120,50,10,0.3)",
                  }}
                />
              </div>
            </div>
          </div>

          <ol
            className="absolute bottom-5 left-5 flex flex-wrap gap-x-5 gap-y-1 text-[11px] tracking-widest sm:left-8"
            style={M}
            aria-label="Scenes"
          >
            {SCENES.map((x, i) => (
              <li key={x.num}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === scene}
                  className="flex items-center gap-2"
                  style={{ color: i === scene ? INK : MUTED }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: i === scene ? O : "#E4C7B0" }}
                  />
                  {x.label.toUpperCase()}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="text-xs tracking-widest" style={{ ...M, color: DEEP }}>
          05 · THE TOOLS
        </p>
        <h2 className="mt-3" style={{ ...D, fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.1 }}>
          Three tools, <em style={{ color: O }}>one route.</em>
        </h2>
        <p className="mt-3 max-w-xl" style={{ color: MUTED }}>
          For small residential contractors building decks, additions, and garages in Mecklenburg County.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/planner" className="rounded-lg border bg-white p-5" style={{ borderColor: "#F2D4BE" }}>
            <p className="text-xs" style={{ ...M, color: DEEP }}>01 · LIVE</p>
            <h3 className="mt-2 text-lg font-medium">Route planner</h3>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>
              Pick a project and a location. See which reviews may apply, with stated times and sources.
            </p>
          </Link>
          <Link href="/tracker" className="rounded-lg border bg-white p-5" style={{ borderColor: "#F2D4BE" }}>
            <p className="text-xs" style={{ ...M, color: DEEP }}>02 · LIVE</p>
            <h3 className="mt-2 text-lg font-medium">Permit tracker</h3>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>
              Log dates, comments, and holds. Compare your real timeline with what the agencies state.
            </p>
          </Link>
          <div className="rounded-lg border p-5" style={{ borderColor: "#F2D4BE", background: LIGHT }}>
            <p className="text-xs" style={{ ...M, color: MUTED }}>03 · COMING SOON</p>
            <h3 className="mt-2 text-lg font-medium">Readiness checklist</h3>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>
              What each requirement is, why it exists, and how to complete it, built from official checklists.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="check-heading"
        style={{
          backgroundImage: `radial-gradient(#FFD8B8 2px, transparent 2px)`,
          backgroundSize: "26px 26px",
          backgroundColor: LIGHT,
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-xs tracking-widest" style={{ ...M, color: DEEP }}>
            06 · CHECKED
          </p>
          <h2
            id="check-heading"
            className="mt-3"
            style={{ ...D, fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.1 }}
          >
            What you can <em style={{ color: O }}>check.</em>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Which reviews apply", "County plan review and, inside Charlotte, the city lot review."],
              ["Stated times", "What the agencies say, not what we guess."],
              ["Sources", "Every rule links to the page or reply it came from."],
              ["What’s unconfirmed", "Open questions are marked, never hidden."],
            ].map(([t, d], i) => (
              <div key={t} className="rounded-lg border bg-white p-4" style={{ borderColor: "#F2D4BE" }}>
                <p className="text-xs" style={{ ...M, color: DEEP }}>0{i + 1}</p>
                <h3 className="mt-1 font-medium">{t}</h3>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="status" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="text-xs tracking-widest" style={{ ...M, color: DEEP }}>
          07 · STATUS
        </p>
        <h2 className="mt-3" style={{ ...D, fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.1 }}>
          What we’ve <em style={{ color: O }}>confirmed.</em>
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <div className="rounded-lg border bg-white p-5" style={{ borderColor: "#F2D4BE" }}>
            <p style={{ ...D, fontSize: "3rem", lineHeight: 1 }}>
              {verified}
              <span className="text-lg" style={{ color: MUTED }}> of {RULES.length}</span>
            </p>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>
              rules verified by an official source or written agency reply. {unconfirmed} more are partly verified or
              likely and need confirming.
            </p>
          </div>
          <div className="rounded-lg border bg-white p-5" style={{ borderColor: "#F2D4BE" }}>
            <p className="text-xs" style={{ ...M, color: DEEP }}>OPEN QUESTIONS</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {open.length === 0 ? <li>None right now.</li> : open.map((r) => <li key={r.id}>{r.title}</li>)}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm" style={{ color: MUTED }}>
          Permivo is an early prototype. Rules are draft until marked verified. Always confirm with Mecklenburg County Code
          Enforcement and the City of Charlotte. Not legal advice.
        </p>
      </section>

      <section id="feedback" style={{ background: INK, color: "#FFF8F1" }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-8 md:grid-cols-2">
          <div>
            <p className="text-xs tracking-widest" style={{ ...M, color: "#F7A267" }}>
              08 · FEEDBACK
            </p>
            <h2 className="mt-3" style={{ ...D, fontSize: "clamp(2rem, 4.4vw, 3.4rem)", fontWeight: 400, lineHeight: 1.08 }}>
              Tell us <em style={{ color: O }}>what’s missing.</em>
            </h2>
          </div>
          <div className="self-end">
            <p style={{ color: "#E9D7C9" }}>
              Permit help, for all of us. We’re starting with small residential contractors in Mecklenburg County, NC.
              If you’ve pulled a permit recently, your experience tells us what to build next.
            </p>
            {FEEDBACK_URL ? (
              <a
                href={FEEDBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-md px-5 py-3 text-sm font-medium"
                style={{ background: O, color: INK }}
              >
                Share your experience
              </a>
            ) : (
              <p className="mt-5 inline-block rounded-md border px-5 py-3 text-sm" style={{ borderColor: "#5A4A3F" }}>
                Feedback form coming soon
              </p>
            )}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8" style={{ color: MUTED }}>
        <span className="flex items-center gap-3">
          <Logo size={28} />
          <span>Early prototype. Not legal advice. Planner entries stay in your browser.</span>
        </span>
        <span className="flex gap-4">
          <Link href="/planner">Planner</Link>
          <Link href="/tracker">Tracker</Link>
        </span>
      </footer>
    </div>
  );
}
