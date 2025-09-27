import Link from "next/link";

import { AuthPage } from "@/components/auth-page";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 transition focus:border-[#f6c343]/70 focus:outline-none focus:ring-2 focus:ring-[#f6c343]/30";

export default function SignupPage() {
  return (
    <AuthPage
      title="Request WorldSignal access"
      subtitle="Tell us who should be provisioned and we will follow up shortly."
      footer={
        <p className="text-center">
          Already have an account?{" "}
          <Link className="font-semibold text-[#f6c343] hover:text-[#ffd768]" href="/login">
            Log in here
          </Link>
        </p>
      }
    >
      <form action="#" method="post" className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="name">
            Full name
          </label>
          <input
            className={inputClass}
            id="name"
            name="name"
            placeholder="Alex Rivera"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="organization">
            Organization
          </label>
          <input
            className={inputClass}
            id="organization"
            name="organization"
            placeholder="WorldSignal Newsroom"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="email">
            Work email
          </label>
          <input
            className={inputClass}
            id="email"
            name="email"
            placeholder="analyst@newsroom.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="password">
            Create password
          </label>
          <input
            className={inputClass}
            id="password"
            name="password"
            placeholder="********"
            required
            type="password"
          />
        </div>
        <p className="text-xs text-slate-300">
          We review every request to ensure secure access. You will receive a confirmation email once your workspace is ready.
        </p>
        <button
          className="w-full rounded-2xl bg-[#f6c343] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#ffd768]"
          type="submit"
        >
          Submit request
        </button>
      </form>
    </AuthPage>
  );
}
