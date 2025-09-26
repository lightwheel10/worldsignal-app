import Link from "next/link";

import { AuthPage } from "@/components/auth-page";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 transition focus:border-[#f6c343]/70 focus:outline-none focus:ring-2 focus:ring-[#f6c343]/30";

export default function SignupPage() {
  return (
    <AuthPage
      title="Activate WorldSignal Pro"
      subtitle="Request full access to bias comparisons, blindspot briefings, and divergence alerts engineered for global operators."
      footer={
        <p className="text-center">
          Already onboarded?{' '}
          <Link className="font-semibold text-[#f6c343] hover:text-[#ffd768]" href="/login">
            Log in to WorldSignal
          </Link>
        </p>
      }
    >
      <form action="#" method="post" className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
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
            <label className="text-sm font-medium text-slate-200" htmlFor="role">
              Role
            </label>
            <input
              className={inputClass}
              id="role"
              name="role"
              placeholder="Head of Risk"
              required
              type="text"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="organization">
            Organization or desk
          </label>
          <input
            className={inputClass}
            id="organization"
            name="organization"
            placeholder="Global Macro Fund"
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
        <div className="grid gap-4 sm:grid-cols-2">
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200" htmlFor="region">
              Primary region
            </label>
            <select
              className={`${inputClass} appearance-none pr-10 text-slate-200`}
              id="region"
              name="region"
              defaultValue="global"
            >
              <option className="bg-slate-900 text-white" value="global">
                Global macro outlook
              </option>
              <option className="bg-slate-900 text-white" value="indo-pacific">
                Indo Pacific
              </option>
              <option className="bg-slate-900 text-white" value="eurasia">
                Europe and Eurasia
              </option>
              <option className="bg-slate-900 text-white" value="mea">
                Middle East and Africa
              </option>
            </select>
          </div>
        </div>
        <label className="flex items-start gap-3 text-xs text-slate-300">
          <input
            className="mt-1 h-4 w-4 rounded border border-white/20 bg-white/5 text-[#f6c343] focus:ring-[#f6c343]"
            id="nda"
            name="nda"
            type="checkbox"
            required
          />
          <span>
            I agree to the WorldSignal Pro terms and confirm I will handle sensitive briefings in line with compliance policies.
          </span>
        </label>
        <button
          className="w-full rounded-2xl bg-[#f6c343] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#ffd768]"
          type="submit"
        >
          Submit membership request
        </button>
      </form>
    </AuthPage>
  );
}
