import Link from "next/link";
import type { ReactNode } from "react";

type AuthPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

const liveSignals = [
  { label: "Bias checks today", value: "12,487" },
  { label: "Blindspots flagged", value: "86" },
  { label: "Analyst desks online", value: "24" },
];

const highlightList = [
  "Swipe across left, center, and right coverage in one dashboard.",
  "Automate blindspot alerts into Slack, Teams, or email.",
  "Audit every outlet with ownership and reliability data.",
];

const briefingCards = [
  {
    title: "Overnight brief",
    detail: "See how 43 publications framed the ceasefire vote before markets open.",
  },
  {
    title: "Signal shifts",
    detail: "We surface divergence spikes the moment narratives split beyond twenty five percent.",
  },
];

export function AuthPage({ title, subtitle, children, footer }: AuthPageProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-12%] top-[-18%] h-96 w-96 rounded-full bg-[#f6c343]/25 blur-3xl" />
        <div className="absolute right-[-25%] top-1/4 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute bottom-[-18%] left-1/3 h-72 w-72 rounded-full bg-cyan-400/16 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-[0_40px_120px_rgba(5,6,11,0.65)] backdrop-blur-lg sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <aside className="space-y-8">
            <Link href="/" className="inline-flex items-center gap-3 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6c343] text-slate-950 shadow-[0_12px_35px_rgba(246,195,67,0.45)]">
                <span className="text-sm font-black">WS</span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.42em] text-slate-300">
                  WorldSignal
                </p>
                <p className="text-sm text-slate-400">See every side of the story</p>
              </div>
            </Link>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Bias-aware coverage built for newsrooms, analysts, and policy teams.
              </h2>
              <p className="text-sm text-slate-300 sm:text-base">
                Benchmark narratives, surface blindspots, and brief leadership with confidence. The same intelligence that powers the landing page lives in your console.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {liveSignals.map((signal) => (
                <div key={signal.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xl font-semibold text-white sm:text-2xl">{signal.value}</p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.3em] text-slate-400">
                    {signal.label}
                  </p>
                </div>
              ))}
            </div>

            <ul className="space-y-3 text-sm text-slate-200">
              {highlightList.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#f6c343]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="grid gap-4 sm:grid-cols-2">
              {briefingCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f6c343]">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{card.detail}</p>
                </div>
              ))}
            </div>
          </aside>

          <section className="space-y-8 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_70px_rgba(5,6,11,0.55)] sm:p-8">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-300">
                WorldSignal Pro Access
                <span className="h-1.5 w-1.5 rounded-full bg-[#f6c343]" />
              </div>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
              <p className="text-sm text-slate-300 sm:text-base">{subtitle}</p>
            </div>

            <div className="space-y-6">{children}</div>

            {footer ? <div className="border-t border-white/10 pt-6 text-sm text-slate-300">{footer}</div> : null}
          </section>
        </div>
      </div>
    </div>
  );
}
