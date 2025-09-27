import Link from "next/link";
import type { ReactNode } from "react";

type AuthPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthPage({ title, subtitle, children, footer }: AuthPageProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="pointer-events-none absolute inset-x-0 top-[-40%] -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(246,195,67,0.28),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-45%] -z-10 h-[520px] bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),_transparent_60%)]" />

      <div className="relative z-10 w-full max-w-md space-y-8">
        <Link href="/" className="inline-flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6c343] text-slate-950 shadow-[0_12px_32px_rgba(246,195,67,0.45)]">
            <span className="text-sm font-black">WS</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-300">WorldSignal</p>
            <p className="text-xs text-slate-400">Bias intelligence platform</p>
          </div>
        </Link>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-[0_32px_90px_rgba(5,6,11,0.55)] backdrop-blur">
          <div className="space-y-3 text-center">
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
            <p className="text-sm text-slate-300 sm:text-base">{subtitle}</p>
          </div>

          <div className="space-y-5">{children}</div>

          {footer ? (
            <div className="border-t border-white/10 pt-5 text-sm text-slate-300">{footer}</div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
