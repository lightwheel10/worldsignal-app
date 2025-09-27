import Link from "next/link";

import { AuthPage } from "@/components/auth-page";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 transition focus:border-[#f6c343]/70 focus:outline-none focus:ring-2 focus:ring-[#f6c343]/30";

export default function ForgotPasswordPage() {
  return (
    <AuthPage
      title="Forgot your password?"
      subtitle="Enter the email linked to your workspace and we will send a reset link."
      footer={
        <div className="space-y-2 text-center">
          <p>
            Remembered your password?{" "}
            <Link className="font-semibold text-[#f6c343] hover:text-[#ffd768]" href="/login">
              Return to login
            </Link>
          </p>
          <p>
            Need an account?{" "}
            <Link className="text-slate-300 underline-offset-4 hover:underline" href="/signup">
              Request access
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
            placeholder="analyst@newsroom.com"
            required
            type="email"
          />
        </div>
        <p className="text-xs text-slate-300">
          Reset links expire in 30 minutes. If you no longer have inbox access, contact{" "}
          <Link className="text-[#f6c343] hover:text-[#ffd768]" href="mailto:support@worldsignal.news">
            support@worldsignal.news
          </Link>
          .
        </p>
        <button
          className="w-full rounded-2xl bg-[#f6c343] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#ffd768]"
          type="submit"
        >
          Send reset link
        </button>
      </form>
    </AuthPage>
  );
}
