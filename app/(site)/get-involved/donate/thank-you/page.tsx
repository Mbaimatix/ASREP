import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You for Donating",
  description: "Your donation to ASREP Africa has been received. Thank you for supporting resilience in Kenya's ASALs.",
};

export default function DonationThankYouPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="font-display font-bold text-earth text-3xl mb-3">
          Thank You!
        </h1>
        <p className="text-charcoal/70 text-base leading-relaxed mb-8">
          Your donation to ASREP Africa has been received. A confirmation email is on its way to you.
          Your generosity directly supports eco-champions, peace dialogues, and indigenous knowledge
          preservation in Kenya&apos;s ASALs.
        </p>
        <div className="bg-forest/5 border border-forest/15 rounded-xl p-5 mb-8">
          <p className="text-forest font-semibold text-sm">
            &ldquo;Rooted in the ASALs. Driven by Evidence. United for Peace and Resilience.&rdquo;
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="px-7 py-3.5 bg-forest hover:bg-sage text-white font-semibold text-sm rounded-xl transition-colors">
            Back to Home
          </Link>
          <Link href="/impact"
            className="px-7 py-3.5 border-2 border-forest text-forest hover:bg-forest hover:text-white font-semibold text-sm rounded-xl transition-all">
            See Our Impact
          </Link>
        </div>
      </div>
    </main>
  );
}
