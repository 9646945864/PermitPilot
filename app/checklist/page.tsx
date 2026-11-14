"use client";

import Link from "next/link";
import ToolHeader from "../components/ToolHeader";
import { NotCovered, PlaceSelector, ReportLink, isCovered, usePlace } from "../components/PlaceSelector";
import { useEffect, useMemo, useState } from "react";
import { PROJECT_LABELS, STATUS_LABELS, type Location, type ProjectType, type Status } from "../../data/rules";
import { GROUP_LABELS, GROUP_ORDER, itemsFor } from "../../data/checklist";

const STORAGE_KEY = "permivo-checklist-v1";
const PROJECTS: ProjectType[] = ["deck", "addition", "garage"];

const STATUS_STYLES: Record<Status, string> = {
  verified: "bg-green-100 text-green-900 border-green-300",
  partly: "bg-yellow-100 text-yellow-900 border-yellow-300",
  likely: "bg-blue-100 text-blue-900 border-blue-300",
  unverified: "bg-orange-100 text-orange-900 border-orange-300",
};

export default function ChecklistPage() {
  const [project, setProject] = useState<ProjectType>("deck");
  const [location, setLocation] = useState<Location>("city");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [place, setPlace] = usePlace();
  const covered = isCovered(place);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setDone(parsed as Record<string, boolean>);
      }
    } catch {
      // ignore unreadable storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      // storage may be unavailable
    }
  }, [done, loaded]);

  const items = useMemo(() => itemsFor(project, location), [project, location]);
  const keyFor = (id: string) => `${project}:${location}:${id}`;
  const doneCount = items.filter((i) => done[keyFor(i.id)]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  function toggle(id: string) {
    setDone((prev) => ({ ...prev, [keyFor(id)]: !prev[keyFor(id)] }));
  }

  function reset() {
    const prefix = `${project}:${location}:`;
    setDone((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => !k.startsWith(prefix))));
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <ToolHeader />
      <h1 className="tool-title text-3xl text-[#211b18]">Readiness checklist</h1>
      <p className="mt-1 text-gray-600">
        What to have ready before you submit. Each item explains what it is, why it matters, and how to do it.
      </p>

      <div role="note" className="mt-4 rounded-lg border border-orange-300 bg-orange-50 p-3 text-sm text-orange-950">
        Draft checklist. Items marked verified come from an official county or city page. Items marked not confirmed are
        typical plan contents. The county’s own Project Submittal Requirements decide what you must submit. A finished
        checklist does not guarantee the county will accept your plans. Not legal advice.
      </div>

      <PlaceSelector place={place} onChange={setPlace} />
      {!covered && <NotCovered place={place} />}
      {covered && (<>
      <section className="mt-6" aria-labelledby="project-heading">
        <h2 id="project-heading" className="text-sm font-medium text-gray-700">Project type</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROJECTS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={project === p}
              onClick={() => setProject(p)}
              className={`rounded-md border px-3 py-2 text-sm ${
                project === p ? "border-orange-800 bg-orange-800 text-white" : "border-gray-300 bg-white text-gray-800"
              }`}
            >
              {PROJECT_LABELS[p]}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5" aria-labelledby="location-heading">
        <h2 id="location-heading" className="text-sm font-medium text-gray-700">Where is the property?</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["city", "outside"] as Location[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={location === l}
              onClick={() => setLocation(l)}
              className={`rounded-md border px-3 py-2 text-sm ${
                location === l ? "border-orange-800 bg-orange-800 text-white" : "border-gray-300 bg-white text-gray-800"
              }`}
            >
              {l === "city" ? "Inside Charlotte city limits" : "Elsewhere in the county"}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-orange-100 bg-white p-4" aria-live="polite">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium text-gray-900">
            {doneCount} of {items.length} ready
          </p>
          <p className="text-sm text-gray-600">{pct}%</p>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded bg-orange-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-orange-700" style={{ width: `${pct}%` }} />
        </div>
        <button type="button" onClick={reset} className="mt-3 rounded border border-gray-300 px-3 py-1 text-sm text-gray-700">
          Clear ticks for this project
        </button>
      </section>

      {GROUP_ORDER.map((group) => {
        const groupItems = items.filter((i) => i.group === group);
        if (groupItems.length === 0) return null;
        return (
          <section key={group} className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">{GROUP_LABELS[group]}</h2>
            <ul className="mt-3 space-y-3">
              {groupItems.map((item) => {
                const checked = !!done[keyFor(item.id)];
                return (
                  <li key={item.id} className="rounded-lg border border-orange-100 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <input
                        id={`item-${item.id}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(item.id)}
                        className="mt-1 h-5 w-5 accent-orange-700"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <label htmlFor={`item-${item.id}`} className={`font-medium ${checked ? "text-gray-500 line-through" : "text-gray-900"}`}>
                            {item.title}
                          </label>
                          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${STATUS_STYLES[item.status]}`}>
                            {STATUS_LABELS[item.status]}
                          </span>
                        </div>
                        <details className="mt-2 text-sm text-gray-700">
                          <summary className="cursor-pointer text-orange-800">What, why, and how</summary>
                          <p className="mt-2"><span className="font-medium">What:</span> {item.what}</p>
                          <p className="mt-1"><span className="font-medium">Why:</span> {item.why}</p>
                          <p className="mt-1"><span className="font-medium">How:</span> {item.how}</p>
                          <p className="mt-2">
                            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-orange-800 underline">
                              {item.sourceLabel}
                            </a>
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Checked {item.checkedOn} · <ReportLink id={item.id} />
                          </p>
                        </details>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      </>)}
      <p className="mt-8 text-sm text-gray-600">
        Ticks are saved in this browser only. Next: use the <Link href="/planner" className="text-orange-800 underline">route planner</Link> to
        see which reviews apply, and the <Link href="/tracker" className="text-orange-800 underline">tracker</Link> to log dates.
      </p>
    </main>
  );
}
