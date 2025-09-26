/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getGdeltHeadlines } from "@/lib/gdelt";

const heroStats = [
  { label: "Cities monitored", value: "340" },
  { label: "Analysts on-call", value: "28" },
  { label: "Signals today", value: "1.9M" },
];

const productHighlights = [
  {
    title: "Bias spectrum explorer",
    description:
      "Swipe between left, center, and right coverage to see how each headline frames stakes, actors, and solutions.",
  },
  {
    title: "Blindspot briefings",
    description:
      "Morning and evening digests flag stories your usual outlets skipped, so you can rebalance editorial focus.",
  },
  {
    title: "Ownership transparency",
    description:
      "See newsroom ownership, political donations, and reliability scores attached to every source in one tap.",
  },
  {
    title: "Narrative timeline",
    description:
      "Track how a headline evolves across 24 hours with archived pulls, quote comparisons, and sentiment shifts.",
  },
];

const subscriptionTiers = [
  {
    name: "Free",
    price: "$0",
    description: "Compare top headlines and sample blindspots updated twice a day.",
    benefits: [
      "Core bias spectrum",
      "Daily blindspot sample",
      "3 story timelines saved",
    ],
  },
  {
    name: "Pro",
    price: "$14/mo",
    description: "Unlimited comparisons, alerts, and analyst digests for professionals and newsrooms.",
    benefits: [
      "Unlimited bias explorer",
      "Instant divergence alerts",
      "Regional analyst brief",
      "Source ownership dossiers",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Contact",
    description: "Embed WorldSignal into your editorial or risk workflow with SSO, API, and custom desks.",
    benefits: [
      "Dedicated intelligence pod",
      "Compliance-ready exports",
      "Private blindspot channels",
    ],
  },
];

function getPrimaryTheme(themes: string[]): string {
  if (!themes.length) {
    return "GLOBAL";
  }
  const first = themes[0].replace(/_/g, " ").trim();
  if (!first) {
    return "GLOBAL";
  }
  const short = first.length > 26 ? `${first.slice(0, 26)}...` : first;
  return short.toUpperCase();
}

function formatRelativeTime(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) {
    return "Updated";
  }
  const diffMs = Date.now() - parsed.getTime();
  const diffMinutes = Math.max(Math.floor(diffMs / 60000), 0);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function normalizeExcerpt(value: string): string {
  if (!value) {
    return "No summary provided by source.";
  }
  return value.length > 220 ? `${value.slice(0, 217)}...` : value;
}

export default async function Home() {
  const gdeltStories = await getGdeltHeadlines({ maxStories: 28 });
  const heroStory = gdeltStories[0];
  const remainingStories = heroStory ? gdeltStories.slice(1) : gdeltStories;
  const spotlightStories = remainingStories.slice(0, 6);
  const worldStories = remainingStories.slice(6, 12);
  const insightStories = remainingStories.slice(12, 18);
  const briefStories = remainingStories.slice(18, 26);
  const photoStories = remainingStories.filter((story) => story.socialImage).slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-slate-100">
            <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-[0.3em] text-slate-950">
              WS
            </span>
            <span className="text-lg font-semibold tracking-wide">WorldSignal Nightly</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
            <Link className="hover:text-slate-100" href="#spotlight">
              Spotlight
            </Link>
            <Link className="hover:text-slate-100" href="#world">
              World
            </Link>
            <Link className="hover:text-slate-100" href="#insights">
              Insights
            </Link>
            <Link className="hover:text-slate-100" href="#briefs">
              Briefings
            </Link>
            <Link className="hover:text-slate-100" href="#photos">
              Photo desk
            </Link>
          </nav>
          <div className="hidden items-center gap-3 text-sm md:flex">
            <Link className="text-slate-400 hover:text-slate-100" href="/login">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-100 transition hover:border-slate-500"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
        <section className="grid gap-8 lg:grid-cols-[2.2fr_1fr]">
          {heroStory ? (
            <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_40px_120px_rgba(15,23,42,0.4)]">
              {heroStory.socialImage ? (
                <div className="relative h-80 w-full overflow-hidden">
                  <img src={heroStory.socialImage} alt={heroStory.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                </div>
              ) : (
                <div className="h-80 w-full bg-slate-800" />
              )}
              <div className="relative space-y-5 p-8">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-300">
                  {getPrimaryTheme(heroStory.themes)}
                </span>
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  {heroStory.title}
                </h1>
                <p className="text-sm text-slate-300">{normalizeExcerpt(heroStory.excerpt)}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span>{heroStory.sourceDomain}</span>
                  <span>{formatRelativeTime(heroStory.publishedAt)}</span>
                </div>
                <Link
                  href={heroStory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  Read full story <span aria-hidden>&rarr;</span>
                </Link>
              </div>
              <div className="border-t border-slate-800 bg-slate-900/80 px-8 py-5">
                <div className="grid gap-4 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="text-xs text-slate-400">
                      <p className="text-sm font-semibold text-slate-100">{stat.value}</p>
                      <p className="uppercase tracking-[0.3em]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
              Live feed is warming up-refresh for the latest headlines.
            </div>
          )}

          <aside className="space-y-6" id="spotlight">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Tonight&apos;s spotlight</h2>
              <div className="mt-4 space-y-5">
                {spotlightStories.slice(0, 5).map((story) => (
                  <div key={story.url} className="border-b border-slate-800 pb-4 last:border-none last:pb-0">
                    <Link
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:text-indigo-300"
                    >
                      {story.title}
                    </Link>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                      <span>{story.sourceDomain}</span>
                      <span>{formatRelativeTime(story.publishedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.45)]" id="insights">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Insider guidance</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {insightStories.slice(0, 4).map((story) => (
                  <Link
                    key={story.url}
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-lg bg-slate-800/60 px-3 py-2 transition hover:bg-slate-800"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" aria-hidden />
                    <span className="leading-snug text-slate-200">
                      {story.title}
                      <span className="mt-1 block text-xs text-slate-500">{formatRelativeTime(story.publishedAt)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section id="world" className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Global desk</h2>
            <Link className="text-sm font-semibold text-indigo-300 hover:text-indigo-200" href="#">
              Explore regions
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {worldStories.map((story) => (
              <article key={story.url} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-[0_25px_90px_rgba(15,23,42,0.45)]">
                {story.socialImage ? (
                  <div className="relative h-44 w-full overflow-hidden">
                    <img src={story.socialImage} alt={story.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-44 w-full bg-slate-800" />
                )}
                <div className="space-y-3 p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {getPrimaryTheme(story.themes)}
                  </span>
                  <Link
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-semibold text-white hover:text-indigo-300"
                  >
                    {story.title}
                  </Link>
                  <p className="text-sm text-slate-300">{normalizeExcerpt(story.excerpt)}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{story.sourceDomain}</span>
                    <span>{formatRelativeTime(story.publishedAt)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="briefs" className="mt-16 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.45)]">
            <h2 className="text-xl font-semibold text-white">Nightly briefing</h2>
            <div className="mt-6 space-y-6">
              {briefStories.map((story) => (
                <article key={story.url} className="border-b border-slate-800 pb-6 last:border-none last:pb-0">
                  <Link
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-base font-semibold text-white hover:text-indigo-300"
                  >
                    {story.title}
                  </Link>
                  <p className="mt-2 text-sm text-slate-300">{normalizeExcerpt(story.excerpt)}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{story.sourceDomain}</span>
                    <span>{formatRelativeTime(story.publishedAt)}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6" id="photos">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Markets & policy radar</h2>
              <ul className="mt-4 space-y-4 text-sm text-slate-300">
                {spotlightStories.slice(0, 6).map((story) => (
                  <li key={`${story.url}-policy`} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                    <Link
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-snug text-slate-200 hover:text-emerald-300"
                    >
                      {story.title}
                      <span className="mt-1 block text-xs text-slate-500">{story.sourceDomain}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.45)]">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Photo desk</h2>
              <div className="mt-4 grid gap-4">
                {photoStories.length ? (
                  photoStories.map((story) => (
                    <Link
                      key={`${story.url}-photo`}
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3 hover:border-slate-600"
                    >
                      <div className="relative h-16 w-20 overflow-hidden rounded-md bg-slate-800">
                        <img src={story.socialImage} alt={story.title} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1 text-xs text-slate-300">
                        <p className="font-semibold text-slate-100">{story.title}</p>
                        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                          {story.sourceDomain}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No photo-led coverage detected in the latest pull.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16">
          <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/80 px-8 py-10 shadow-[0_25px_90px_rgba(15,23,42,0.45)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Tools for serious newsrooms</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">
                  Our coverage comparison tools help newsrooms and operators track bias, surface blindspots, and brief leadership with the full context behind every headline.
                </p>
              </div>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                Request a walk-through <span aria-hidden>&nearr;</span>
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {productHighlights.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-600"
                >
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300">
                    Learn more <span aria-hidden>&rarr;</span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="plans" className="mt-16">
          <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/80 px-8 py-10 shadow-[0_25px_90px_rgba(15,23,42,0.45)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Subscription plans</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">
                  Whether you are calibrating newsroom output, briefing a cabinet, or hedging a portfolio, WorldSignal scales with your need for clarity.
                </p>
              </div>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                Talk with our team <span aria-hidden>&nearr;</span>
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {subscriptionTiers.map((tier) => (
                <article
                  key={tier.name}
                  className={`rounded-3xl border bg-slate-900 p-6 transition hover:border-slate-600 ${
                    tier.featured ? "border-[#f6c343]/70 shadow-[0_30px_90px_rgba(246,195,67,0.25)]" : "border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{tier.name}</p>
                    {tier.featured ? (
                      <span className="rounded-full bg-[#f6c343] px-3 py-1 text-xs font-semibold text-slate-950">
                        Most popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{tier.price}</p>
                  <p className="mt-3 text-sm text-slate-300">{tier.description}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-200">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f6c343]" aria-hidden />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
                    href="/signup"
                  >
                    Choose plan <span aria-hidden>&rarr;</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">WorldSignal</p>
            <p className="mt-2 text-sm text-slate-500">Global narratives decoded for modern newsrooms.</p>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link className="hover:text-slate-100" href="#">
              Privacy
            </Link>
            <Link className="hover:text-slate-100" href="#">
              Terms
            </Link>
            <Link className="hover:text-slate-100" href="mailto:briefings@worldsignal.news">
              briefings@worldsignal.news
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


