import Link from "next/link";

import { AuthPage } from "@/components/auth-page";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 transition focus:border-[#f6c343]/70 focus:outline-none focus:ring-2 focus:ring-[#f6c343]/30";

export default function LoginPage() {
  return (
    <AuthPage
      title="Sign in to WorldSignal"
      subtitle="Access your briefings, bias monitors, and saved digests."
      footer={
        <div className="space-y-2 text-center">
          <p>
            Need membership?{" "}
            <Link className="font-semibold text-[#f6c343] hover:text-[#ffd768]" href="/signup">
              Request WorldSignal Pro
            </Link>
          </p>
          <p>
            <Link className="text-slate-300 underline-offset-4 hover:underline" href="/forgot-password">
              Forgot your password?
            </Link>
          </p>
        </div>
      }
    >
      <form action="#" method="post" className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="email">
            Work email
          </label>
          <input
            className={inputClass}
            id="email"
            name="email"
            type="email"
            placeholder="analyst@newsroom.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="password">
            Password
          </label>
          <input
            className={inputClass}
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <label className="flex items-center gap-2">
            <input
              className="h-4 w-4 rounded border border-white/20 bg-white/5 text-[#f6c343] focus:ring-[#f6c343]"
              id="remember"
              name="remember"
              type="checkbox"
            />
            <span>Keep me signed in</span>
          </label>
          <Link className="hover:text-white" href="/forgot-password">
            Reset access
          </Link>
        </div>
        <button
          className="w-full rounded-2xl bg-[#f6c343] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#ffd768]"
          type="submit"
        >
          Enter newsroom
        </button>
      </form>
    </AuthPage>
  );
}
