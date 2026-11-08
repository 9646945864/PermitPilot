"use client";

import { useState } from "react";
import {
  PROJECT_LABELS,
  STATUS_LABELS,
  rulesFor,
  type Location,
  type ProjectType,
  type Rule,
  type Status,
} from "../../data/rules";

const STATUS_STYLES: Record<Status, string> = {
  verified: "bg-green-100 text-green-900 border-green-300",
  partly: "bg-yellow-100 text-yellow-900 border-yellow-300",
  likely: "bg-blue-100 text-blue-900 border-blue-300",
  unverified: "bg-red-100 text-red-900 border-red-300",
};

const PROJECTS = Object.keys(PROJECT_LABELS) as ProjectType[];

function RuleCard({ rule }: { rule: Rule }) {
  return (
    <li className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-gray-900">{rule.title}</h3>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${STATUS_STYLES[rule.status]}`}
        >
          {STATUS_LABELS[rule.status]}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-700">
        <span className="font-medium">Stated time:</span> {rule.statedTime}
      </p>
      <p className="mt-1 text-sm text-gray-600">{rule.note}</p>
      <p className="mt-2 text-sm">
        <a
          href={rule.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-800 underline"
        >
          {rule.sourceLabel}
        </a>
      </p>
    </li>
  );
}

export default function PlannerPage() {
  const [project, setProject] = useState<ProjectType>("deck");
  const [location, setLocation] = useState<Location>("city");

  const rules = rulesFor(project, location);
  const steps = rules.filter((r) => r.kind === "step");
  const questions = rules.filter((r) => r.kind === "question");
  const hasCountyStep = steps.some((r) => r.where === "county");

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Permivo route planner</h1>
      <p className="mt-1 text-gray-600">
        See which reviews may apply to a small residential project in Mecklenburg County.
      </p>

      <div
        role="note"
        className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900"
      >
        Draft rules. Nothing here is confirmed unless marked verified. Always confirm with
        Mecklenburg County Code Enforcement and the City of Charlotte before relying on it. Not
        legal advice.
      </div>

      <section className="mt-6" aria-labelledby="project-heading">
        <h2 id="project-heading" className="text-sm font-medium text-gray-700">
          Project type
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROJECTS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={project === p}
              onClick={() => setProject(p)}
              className={`rounded-md border px-3 py-2 text-sm ${
                project === p
                  ? "border-teal-800 bg-teal-800 text-white"
                  : "border-gray-300 bg-white text-gray-800"
              }`}
            >
              {PROJECT_LABELS[p]}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6" aria-labelledby="location-heading">
        <h2 id="location-heading" className="text-sm font-medium text-gray-700">
          Where is the property?
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["city", "outside"] as Location[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={location === l}
              onClick={() => setLocation(l)}
              className={`rounded-md border px-3 py-2 text-sm ${
                location === l
                  ? "border-teal-800 bg-teal-800 text-white"
                  : "border-gray-300 bg-white text-gray-800"
              }`}
            >
              {l === "city" ? "Inside Charlotte city limits" : "Elsewhere in the county"}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="text-lg font-medium text-gray-900">
          Reviews that may apply
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          The order and whether these can run at the same time are not confirmed.
        </p>
        <ul className="mt-3 space-y-3">
          {steps.map((r) => (
            <RuleCard key={r.id} rule={r} />
          ))}
        </ul>
        {!hasCountyStep && (
          <p className="mt-3 text-sm text-gray-600">
            County steps for this project type have not been researched yet.
          </p>
        )}
      </section>

      {questions.length > 0 && (
        <section className="mt-8" aria-labelledby="questions-heading">
          <h2 id="questions-heading" className="text-lg font-medium text-gray-900">
            Open questions to confirm with the agencies
          </h2>
          <ul className="mt-3 space-y-3">
            {questions.map((r) => (
              <RuleCard key={r.id} rule={r} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
