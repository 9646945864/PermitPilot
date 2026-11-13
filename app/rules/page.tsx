"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ToolHeader from "../components/ToolHeader";
import {
  JURISDICTIONS,
  DEFAULT_JURISDICTION,
  PROJECT_LABELS,
  RULES,
  STATUS_LABELS,
  type ProjectType,
  type Status,
} from "../../data/rules";

const STATUS_STYLES: Record<Status, string> = {
  verified: "bg-green-100 text-green-900 border-green-300",
  partly: "bg-yellow-100 text-yellow-900 border-yellow-300",
  likely: "bg-blue-100 text-blue-900 border-blue-300",
  unverified: "bg-red-100 text-red-900 border-red-300",
};

const STATUS_ORDER: Status[] = ["verified", "partly", "likely", "unverified"];
const PROJECTS = ["all", "deck", "addition", "garage", "trade"] as const;

export default function RulesPage() {
  const [status, setStatus] = useState<Status | "all">("all");
  const [project, setProject] = useState<(typeof PROJECTS)[number]>("all");
  const jurisdiction = JURISDICTIONS[DEFAULT_JURISDICTION];

  const counts = useMemo(() => {
    const c: Record<Status, number> = { verified: 0, partly: 0, likely: 0, unverified: 0 };
    RULES.forEach((r) => (c[r.status] += 1));
    return c;
  }, []);

  const shown = RULES.filter(
    (r) =>
      (status === "all" || r.status === status) &&
      (project === "all" || r.projects.includes(project as ProjectType))
  ).sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <ToolHeader />
      <h1 className="tool-title text-3xl text-[#211b18]">Rules and sources</h1>
      <p className="mt-1 text-gray-600">
        Every rule Permivo uses for {jurisdiction.name}, with its source, status, and the date it was last checked.
      </p>

      <div className="mt-4 rounded-lg border border-orange-100 bg-white p-4 text-sm text-gray-700">
        <p>
          <span className="font-medium">{counts.verified}</span> of {RULES.length} rules are verified. A rule is
          marked verified only when an official county or city page, or a written reply from the agency, supports it.
          Third-party guides are treated as leads, not sources.
        </p>
      </div>

      <section className="mt-6" aria-labelledby="filters-heading">
        <h2 id="filters-heading" className="sr-only">Filters</h2>
        <div className="flex flex-wrap gap-2">
          {(["all", ...STATUS_ORDER] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                status === s
                  ? "border-orange-800 bg-orange-800 text-white"
                  : "border-orange-200 bg-white text-gray-800 hover:border-orange-400"
              }`}
            >
              {s === "all" ? "All statuses" : `${STATUS_LABELS[s]} (${counts[s]})`}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROJECTS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={project === p}
              onClick={() => setProject(p)}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                project === p
                  ? "border-orange-800 bg-orange-800 text-white"
                  : "border-orange-200 bg-white text-gray-800 hover:border-orange-400"
              }`}
            >
              {p === "all" ? "All projects" : PROJECT_LABELS[p as ProjectType]}
            </button>
          ))}
        </div>
      </section>

      <ul className="mt-6 space-y-3">
        {shown.map((r) => (
          <li key={r.id} className="rounded-lg border border-orange-100 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-medium text-gray-900">{r.title}</h2>
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${STATUS_STYLES[r.status]}`}>
                {STATUS_LABELS[r.status]}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {r.id} · {r.projects.map((p) => PROJECT_LABELS[p]).join(", ")} ·{" "}
              {r.where === "city" ? "Inside Charlotte city limits" : "Whole county"}
            </p>
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-medium">Stated time:</span> {r.statedTime}
            </p>
            <p className="mt-1 text-sm text-gray-600">{r.note}</p>
            <p className="mt-2 text-sm">
              <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-orange-800 underline">
                {r.sourceLabel}
              </a>
              <span className="text-gray-500"> · checked {r.checkedOn}</span>
            </p>
          </li>
        ))}
        {shown.length === 0 && <li className="text-sm text-gray-600">No rules match these filters.</li>}
      </ul>

      <p className="mt-8 text-sm text-gray-600">
        Found something wrong or out of date? Use the feedback link on the home page. See also the{" "}
        <Link href="/disclaimer" className="text-orange-800 underline">disclaimer</Link> and{" "}
        <Link href="/about" className="text-orange-800 underline">about page</Link>.
      </p>
    </main>
  );
}
