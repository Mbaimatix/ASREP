"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── Inner component that reads search params ────────────────────────────────
// Must be wrapped in <Suspense> to avoid build-time bail-out error.
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/dashboard";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(errorParam ? "Invalid credentials. Please try again." : "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    } else if (res?.url) {
      router.push(res.url);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl">
      <h1 className="font-display font-bold text-earth text-2xl mb-6 text-center">Staff Login</h1>

      {error && (
        <div role="alert" className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
              focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
              focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className="w-full py-3.5 bg-forest hover:bg-sage text-white font-semibold text-sm
            rounded-xl transition-all disabled:opacity-50 focus-visible:ring-2
            focus-visible:ring-forest focus-visible:outline-none"
        >
          {isLoading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="text-muted text-xs text-center mt-5">
        Forgotten your password? Contact{" "}
        <a href="mailto:asrepafrica@gmail.com" className="text-forest hover:underline">
          asrepafrica@gmail.com
        </a>
      </p>
    </div>
  );
}

// ─── Page shell ──────────────────────────────────────────────────────────────
export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-forest flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 justify-center mb-4">
            <div className="relative w-10 h-10">
              <Image src="/logos/asrep-logo-white.png" alt="ASREP Africa" fill className="object-contain" />
            </div>
            <div>
              <p className="text-white font-display font-bold text-xl">ASREP <span className="text-gold">AFRICA</span></p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Staff Portal</p>
            </div>
          </Link>
          <p className="text-white/50 text-sm">Sign in to access the content management system.</p>
        </div>

        {/* Form wrapped in Suspense to allow useSearchParams at build time */}
        <Suspense fallback={
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-pulse">
            <div className="h-8 bg-sand rounded-xl mb-6" />
            <div className="space-y-5">
              <div className="h-12 bg-sand rounded-xl" />
              <div className="h-12 bg-sand rounded-xl" />
              <div className="h-12 bg-forest/20 rounded-xl" />
            </div>
          </div>
        }>
          <LoginForm />
        </Suspense>

        <p className="text-white/30 text-xs text-center mt-6">
          This portal is for ASREP Africa staff only.{" "}
          <Link href="/" className="text-white/50 hover:text-white transition-colors">
            Return to website →
          </Link>
        </p>
      </div>
    </main>
  );
}
