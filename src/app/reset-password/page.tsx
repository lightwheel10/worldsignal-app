import Link from "next/link";

import { AuthPage } from "@/components/auth-page";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 transition focus:border-[#f6c343]/70 focus:outline-none focus:ring-2 focus:ring-[#f6c343]/30";

export default function ResetPasswordPage() {
  return (
    <AuthPage
      title="Secure your WorldSignal account"
      subtitle="Set a new password to resume streaming bias spectra, blindspot alerts, and analyst briefings."
      footer={
        <p className="text-center text-xs text-slate-300">
          Need help? Contact{' '}
          <Link className="text-[#f6c343] hover:text-[#ffd768]" href="mailto:support@worldsignal.news">
            support@worldsignal.news
          </Link>
          .
        </p>
      }
    >
      <form action="#" method="post" className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="password">
            New password
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
          <label className="text-sm font-medium text-slate-200" htmlFor="confirmPassword">
            Confirm new password
          </label>
          <input
            className={inputClass}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="********"
            required
            type="password"
          />
        </div>
        <ul className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
          <li>- Minimum 10 characters with at least one capital letter.</li>
          <li>- Include a number or symbol to satisfy newsroom security policies.</li>
          <li>- Avoid passwords used on other intelligence or market systems.</li>
        </ul>
        <button
          className="w-full rounded-2xl bg-[#f6c343] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#ffd768]"
          type="submit"
        >
          Save new password
        </button>
        <p className="text-xs text-slate-300">
          Continuing confirms you reviewed the latest WorldSignal security guidance and will protect embargoed briefings.
        </p>
      </form>
    </AuthPage>
  );
}
