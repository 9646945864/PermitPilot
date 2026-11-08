
import Link from "next/link";

const features = [
  {
    title: "Permit Preparation",
    description:
      "Prepare applications and identify missing documents before submission.",
    href: "/prepare",
    icon: "📋"
  },
  {
    title: "Correction Assistant",
    description:
      "Understand reviewer comments and turn corrections into actionable tasks.",
    href: "/corrections",
    icon: "🤖"
  },
  {
    title: "Permit Tracker",
    description:
      "Keep track of permit statuses, deadlines, and resubmissions.",
    href: "/permits",
    icon: "📊"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between border-b bg-white px-8 py-5">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          PermitPilot
        </Link>

        <span className="text-sm text-gray-500">
          Contractor Dashboard
        </span>
      </nav>

      <section className="mx-auto max-w-6xl px-8 py-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Your permitting workspace
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to PermitPilot.
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Spend less time navigating complicated permitting processes
          and more time getting projects done.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-3xl">{feature.icon}</div>

              <h2 className="mt-5 text-xl font-semibold">
                {feature.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>

              <p className="mt-6 text-sm font-semibold text-blue-600">
                Open workspace →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="font-semibold text-blue-900">
            Starting jurisdiction
          </h2>
          <p className="mt-2 text-sm text-blue-800">
            Mecklenburg County, North Carolina
          </p>
          <p className="mt-2 text-xs text-blue-700">
            Initial development jurisdiction. Requirements must be
            verified against current official sources.
          </p>
        </div>
      </section>
    </main>
  );
}
