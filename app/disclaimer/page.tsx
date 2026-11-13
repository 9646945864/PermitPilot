import Link from "next/link";
import ToolHeader from "../components/ToolHeader";

export const metadata = { title: "Disclaimer | Permivo" };

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <ToolHeader />
      <h1 className="tool-title text-3xl text-[#211b18]">Disclaimer</h1>
      <p className="mt-1 text-sm text-gray-500">Early prototype. Last updated November 2026.</p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">Not legal or professional advice</h2>
      <p className="mt-2 text-gray-700">
        Permivo provides general information only. It is not legal, engineering, architectural or other professional
        advice, and it does not replace the requirements of any permitting agency.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">Not affiliated with any agency</h2>
      <p className="mt-2 text-gray-700">
        Permivo is independent. It is not affiliated with, endorsed by, or operated by Mecklenburg County, the City of
        Charlotte, or any other government body.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">Rules change and may be wrong</h2>
      <p className="mt-2 text-gray-700">
        Permit rules, fees and timeframes change, and some information on agency pages is unclear or inconsistent.
        Every rule shows a status and the date it was last checked. Items marked “Not confirmed” have not been
        verified. Review times shown are the times agencies state, not guarantees of how long a permit will take.
        Always confirm with the county or city before you rely on anything here, and before you buy materials, sign
        contracts or begin work.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">No guarantees</h2>
      <p className="mt-2 text-gray-700">
        Permivo is provided as is, without warranties of any kind. You are responsible for your own permits and for
        following all applicable laws and codes.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">Your information</h2>
      <p className="mt-2 text-gray-700">
        The checklist ticks and tracker entries are saved in your own browser and are not sent to Permivo. Permivo has
        no accounts. The site is hosted on Vercel, which may keep standard server logs. Do not enter personal
        information you would not want stored on your own device.
      </p>

      <h2 className="mt-8 text-lg font-medium text-gray-900">Sources</h2>
      <p className="mt-2 text-gray-700">
        Links to agency pages and documents are provided for reference. Their content belongs to their publishers.
        See the <Link href="/rules" className="text-orange-800 underline">rules page</Link> for the source of each rule.
      </p>
    </main>
  );
}
