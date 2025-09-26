import Link from "next/link";

const termsSections = [
  {
    title: "Using WorldSignal",
    description:
      "WorldSignal Nightly equips editorial and risk teams with comparative intelligence. Use the service responsibly and comply with applicable newsroom policies.",
    items: [
      "Accounts are licensed to named users. Do not share logins outside your organization.",
      "Insights surfaced through bias explorer or blindspot briefings are advisory and should be validated independently.",
      "You are responsible for safeguarding devices and ensuring only authorized colleagues access your workspace.",
    ],
  },
  {
    title: "Content and attribution",
    description:
      "We aggregate signals from licensed data providers and open sources. Respect source rights and provide attribution when referencing material.",
    items: [
      "Do not redistribute raw data feeds or cached images without permission from the originating outlet.",
      "Use excerpts in accordance with fair use and your organization’s editorial guidelines.",
      "When citing WorldSignal analysis, credit the platform and include the date of retrieval.",
    ],
  },
  {
    title: "Service commitments",
    description:
      "We work to keep WorldSignal available, secure, and continually improving. Occasionally maintenance or API changes may impact features.",
    items: [
      "We provide advance notice of planned downtime through analyst briefings and status alerts.",
      "Feedback shared with our team may be used to guide product development without obligation of compensation.",
      "Either party may terminate the subscription if agreements or acceptable use policies are violated.",
    ],
  },
];

export const metadata = {
  title: "Terms & conditions | WorldSignal",
  description: "Usage expectations, attribution guidelines, and service commitments for WorldSignal Nightly.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 px-6 py-12">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            WorldSignal
          </Link>
          <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Terms &amp; conditions</h1>
          <p className="max-w-2xl text-sm text-slate-400">
            These terms keep WorldSignal Nightly aligned with the editorial standards and compliance needs of modern newsrooms.
            Please review them alongside your organization’s policies.
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl space-y-12 px-6 py-12">
        {termsSections.map((section) => (
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
          <h2 className="text-xl font-semibold text-slate-100">Questions about these terms?</h2>
          <p className="mt-3 text-slate-400">
            Our legal and compliance partners are available to review newsroom requirements or negotiate enterprise terms tailored to your workflow.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm text-slate-200 sm:flex-row sm:items-center sm:gap-4">
            <a className="text-indigo-300 hover:text-indigo-200" href="mailto:legal@worldsignal.news">
              legal@worldsignal.news
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:inline" aria-hidden />
            <p className="text-slate-400">WorldSignal Research, 1150 Orbit Street, Suite 340, Washington, DC</p>
          </div>
        </section>
      </main>
    </div>
  );
}
