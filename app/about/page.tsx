import Link from "next/link";
import ToolHeader from "../components/ToolHeader";
import { FEEDBACK_URL } from "../../data/site";

export const metadata = { title: "About Permivo" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <ToolHeader />
      <h1 className="tool-title text-3xl text-[#211b18]">About Permivo</h1>

      <p className="mt-3 text-gray-700">
        Permivo helps small residential contractors understand permitting before they submit: which reviews apply to a
        deck, addition or detached garage, what to prepare, and how long each step is said to take. It starts in
        Mecklenburg County and the City of Charlotte, North Carolina.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">Why it exists</h2>
      <p className="mt-2 text-gray-700">
        Permitting for a small project can involve a county building permit and a separate city lot review, each with
        its own system, forms and timeframes. Information is spread across many pages, and some of it conflicts.
        Permivo gathers it in one place and shows where each rule comes from.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">How the rules are checked</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
        <li>Every rule links to its source and shows the date it was last checked.</li>
        <li>A rule is verified only when an official county or city page, or a written agency reply, supports it.</li>
        <li>Anything not confirmed is labeled “Not confirmed” instead of guessed.</li>
        <li>You can see all rules and statuses on the <Link href="/rules" className="text-orange-800 underline">rules page</Link>.</li>
      </ul>

      <h2 className="mt-8 text-lg font-medium text-gray-900">What it is not</h2>
      <p className="mt-2 text-gray-700">
        Permivo is not a government service, is not affiliated with Mecklenburg County or the City of Charlotte, and
        does not give legal advice. It does not submit permits for you. Read the{" "}
        <Link href="/disclaimer" className="text-orange-800 underline">disclaimer</Link>.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">Status</h2>
      <p className="mt-2 text-gray-700">
        Permivo is an early prototype built by one person. Coverage is limited to Mecklenburg County for now. More
        North Carolina counties are planned, added one at a time with the same source checks.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">Tell us what is wrong</h2>
      <p className="mt-2 text-gray-700">
        Corrections and real experiences with these permits make Permivo better.{" "}
        {FEEDBACK_URL ? (
          <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" className="text-orange-800 underline">
            Share feedback
          </a>
        ) : (
          <span>The feedback form is coming soon.</span>
        )}
      </p>
    </main>
  );
}
