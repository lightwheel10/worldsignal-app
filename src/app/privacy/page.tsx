import Link from "next/link";

const policySections = [
  {
    title: "Information we collect",
    description:
      "We collect account details you provide, activity within the platform, and diagnostic data that helps us keep WorldSignal reliable and secure.",
    items: [
      "Contact information such as your name, email, and newsroom affiliation",
      "Usage metadata including saved comparisons, alert preferences, and session logs",
      "Support communications and feedback shared with the WorldSignal team",
    ],
  },
  {
    title: "How we use data",
    description:
      "Your information helps us deliver the features you rely on, improve signal coverage, and send service communications you request.",
    items: [
      "Authenticate access to bias explorer, blindspot briefings, and analyst tools",
      "Tailor alert thresholds, regional desks, and daily digests to your settings",
      "Monitor performance, detect abuse, and plan new editorial intelligence capabilities",
    ],
  },
  {
    title: "Your choices",
    description:
      "You stay in control of your account. Manage preferences at any time or reach our privacy desk for tailored requests.",
    items: [
      "Update profile, password, and notifications from your account settings",
      "Export or delete saved timelines by contacting privacy@worldsignal.news",
      "Opt out of analyst briefings while keeping compliance notifications active",
    ],
  },
];

export const metadata = {
  title: "Privacy policy | WorldSignal",
  description: "How WorldSignal collects, uses, and protects newsroom intelligence data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 px-6 py-12">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            WorldSignal
          </Link>
          <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Privacy policy</h1>
          <p className="max-w-2xl text-sm text-slate-400">
            We maintain newsroom-grade safeguards for intelligence, compliance, and editorial research
            workflows. This summary outlines how data moves through WorldSignal Nightly.
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl space-y-12 px-6 py-12">
        {policySections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.35)]">
            <h2 className="text-xl font-semibold text-slate-100">{section.title}</h2>
            <p className="mt-3 text-sm text-slate-400">{section.description}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-sm text-slate-300 shadow-[0_25px_80px_rgba(15,23,42,0.35)]">
          <h2 className="text-xl font-semibold text-slate-100">Contact the privacy desk</h2>
          <p className="mt-3 text-slate-400">
            Have a question about how we handle newsroom data or need to exercise a privacy right? Reach the
            dedicated privacy desk and we will respond within two business days.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm text-slate-200 sm:flex-row sm:items-center sm:gap-4">
            <a className="text-indigo-300 hover:text-indigo-200" href="mailto:privacy@worldsignal.news">
              privacy@worldsignal.news
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:inline" aria-hidden />
            <p className="text-slate-400">WorldSignal Research, 1150 Orbit Street, Suite 340, Washington, DC</p>
          </div>
        </section>
      </main>
    </div>
  );
}
