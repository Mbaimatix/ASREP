"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Subscription failed.");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-start gap-3 p-4 rounded-xl bg-sage/20 border border-sage/40"
      >
        <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-white font-medium text-sm">You&apos;re subscribed!</p>
          <p className="text-white/60 text-xs mt-0.5">Thank you for joining our community. Updates are on their way.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2.5">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-required="true"
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          disabled={status === "loading"}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white
            placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-gold
            focus:border-transparent transition disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="w-full px-4 py-3 bg-cta hover:bg-cta-hover text-white font-semibold text-sm
            rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Subscribing…
            </span>
          ) : (
            "Subscribe to Updates"
          )}
        </button>
      </div>

      {status === "error" && (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs text-red-400">
          {errorMsg}
        </p>
      )}

      <p className="text-white/30 text-xs mt-3">
        No spam. Unsubscribe anytime. Your privacy is respected.
      </p>
    </form>
  );
}
