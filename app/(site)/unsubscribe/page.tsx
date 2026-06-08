import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsubscribe | ASREP Africa",
  robots: { index: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string; e?: string; s?: string }>;
}) {
  const params = await searchParams;

  // Redirect GET requests with valid token params to the API route to process
  if (params.e && params.s && !params.success && !params.error) {
    return (
      <main className="min-h-screen bg-cream py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-forest animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <p className="text-charcoal/70 text-lg">Processing your request…</p>
          {/* Client-side redirect to API handler */}
          <meta httpEquiv="refresh" content={`0;url=/api/newsletter/unsubscribe?e=${params.e}&s=${params.s}`} />
        </div>
      </main>
    );
  }

  const isSuccess = params.success === "true";
  const isError = !!params.error;

  return (
    <main className="min-h-screen bg-cream py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        {/* Icon */}
        <div
          className={`mx-auto mb-8 w-20 h-20 rounded-full flex items-center justify-center ${
            isSuccess ? "bg-forest/10" : isError ? "bg-red-50" : "bg-sand/50"
          }`}
        >
          {isSuccess ? (
            <svg className="w-10 h-10 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : isError ? (
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold text-earth text-4xl mb-4">
          {isSuccess
            ? "You've been unsubscribed"
            : isError
            ? "Something went wrong"
            : "Unsubscribe"}
        </h1>

        {/* Message */}
        <p className="text-charcoal/70 text-lg leading-relaxed mb-10">
          {isSuccess
            ? "You've been successfully removed from our mailing list. You won't receive any further newsletter emails from ASREP Africa."
            : isError
            ? "We couldn't process your unsubscribe request. The link may have expired or been used already. Please contact us directly at asrepafrica@gmail.com and we'll remove you manually."
            : "Use the unsubscribe link from any ASREP Africa newsletter email to unsubscribe. If you're having trouble, email us at asrepafrica@gmail.com."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-forest text-white font-semibold rounded-xl hover:bg-sage transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Homepage
          </Link>
          {isSuccess && (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-forest/30 text-forest font-semibold rounded-xl hover:bg-forest/5 transition-colors"
            >
              Contact Us
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
