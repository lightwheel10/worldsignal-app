"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

const deliveryFrequencies = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

type Stage = "idle" | "success";

type ConfettiPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  background: string;
  rotation: number;
};

export function SubscribeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  const emailError = useMemo(() => {
    if (!hasAttemptedSubmit) return "";
    if (!email.trim()) return "Please enter an email address.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email.trim())) return "Enter a valid email address.";
    return "";
  }, [email, hasAttemptedSubmit]);

  useEffect(() => {
    if (stage === "success") {
      const colors = ["#7dd3fc", "#a5b4fc", "#f472b6", "#c084fc", "#fde68a"];
      const pieces: ConfettiPiece[] = Array.from({ length: 80 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2 + Math.random() * 1.4,
        background: colors[index % colors.length],
        rotation: Math.random() * 360,
      }));
      setConfettiPieces(pieces);
    } else {
      setConfettiPieces([]);
    }
  }, [stage]);

  useEffect(() => {
    if (!isOpen) {
      setStage("idle");
      setEmail("");
      setFrequency("daily");
      setHasAttemptedSubmit(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    if (emailError) {
      return;
    }
    setStage("success");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:text-white"
      >
        Subscribe
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-6 sm:items-center sm:py-12">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_30px_120px_rgba(15,23,42,0.55)]">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-100"
              aria-label="Close subscription modal"
            >
              Esc
            </button>

            {stage === "idle" ? (
              <form className="max-h-[min(90vh,34rem)] space-y-6 overflow-y-auto p-6 sm:p-8" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">Stay ahead of the narrative</h2>
                  <p className="text-sm text-slate-400">
                    Pick how often you want the WorldSignal digest and we will send it straight to your inbox.
                  </p>
                </div>

                <label className="block text-sm font-medium text-slate-200" htmlFor="subscription-email">
                  Email
                </label>
                <input
                  id="subscription-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  placeholder="you@example.com"
                  required
                />
                {emailError ? <p className="text-xs text-rose-400">{emailError}</p> : null}

                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium text-slate-200">Update cadence</legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {deliveryFrequencies.map((option) => {
                      const isActive = frequency === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFrequency(option.value)}
                          className={`rounded-xl border px-4 py-3 text-sm transition ${
                            isActive
                              ? "border-indigo-400 bg-indigo-500/10 text-indigo-200"
                              : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500 hover:text-slate-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(99,102,241,0.35)] transition hover:bg-indigo-400"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="relative max-h-[min(90vh,34rem)] space-y-5 overflow-y-auto p-6 text-center sm:p-8">
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10">
                  <span className="text-3xl">🎉</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-white">You&apos;re on the list!</h2>
                  <p className="text-sm text-slate-300">
                    Expect your {frequency} briefing at <span className="font-medium text-white">{email}</span> starting tomorrow.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mx-auto inline-flex items-center justify-center rounded-full border border-indigo-500/40 px-5 py-2 text-sm font-medium text-indigo-200 transition hover:border-indigo-400 hover:text-white"
                >
                  Close
                </button>

                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                  {confettiPieces.map((piece) => (
                    <span
                      key={piece.id}
                      className="absolute h-2 w-2 origin-top animate-confetti rounded-sm"
                      style={{
                        left: `${piece.left}%`,
                        animationDelay: `${piece.delay}s`,
                        animationDuration: `${piece.duration}s`,
                        background: piece.background,
                        ["--confetti-rotation" as const]: `${piece.rotation}deg`,
                      } as CSSProperties}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
