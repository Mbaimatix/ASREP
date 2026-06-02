"use client";

import { useState } from "react";

interface NewsletterBannerProps {
  variant?: "dark" | "light";
  heading?: string;
  subtext?: string;
}

export default function NewsletterBanner({
  variant = "dark",
  heading = "Stay connected with ASREP Africa",
  subtext = "Get field updates, programme news, and impact stories direct to your inbox.",
}: NewsletterBannerProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSuccess(true);
      else setError("Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = variant === "dark";

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className={`w-full py-14 px-4 ${isDark ? "bg-forest" : "bg-sand"}`}
    >
      <div className="container-asrep">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: text */}
          <div className="max-w-xl text-center lg:text-left">
            <h2
              id="newsletter-heading"
              className={`font-display font-bold text-2xl md:text-3xl mb-3 ${isDark ? "text-white" : "text-earth"}`}
            >
              {heading}
            </h2>
            <p className={`text-base leading-relaxed ${isDark ? "text-white/75" : "text-charcoal/70"}`}>
              {subtext}
            </p>
          </div>

          {/* Right: form or success */}
          <div className="w-full lg:w-auto lg:min-w-[400px]">
            {success ? (
              <div
                className={`flex items-center gap-3 px-6 py-4 rounded-xl ${isDark ? "bg-white/10 text-white" : "bg-forest/10 text-forest"}`}
                role="status"
              >
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">
                  You&apos;re subscribed! Welcome to the ASREP community.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
                noValidate
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email address"
                  className={`flex-1 px-4 py-3 rounded-lg text-sm border outline-none focus:ring-2 focus:ring-offset-1 transition ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/40 focus:ring-offset-forest"
                      : "bg-white border-sand text-charcoal placeholder:text-charcoal/40 focus:ring-forest/40 focus:ring-offset-sand"
                  }`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                    isDark
                      ? "bg-cta text-white hover:bg-earth"
                      : "bg-forest text-white hover:bg-sage"
                  }`}
                >
                  {loading ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            )}
            {error && (
              <p className={`mt-2 text-sm ${isDark ? "text-red-300" : "text-red-600"}`} role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
