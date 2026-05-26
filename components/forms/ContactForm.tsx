"use client";

import { useState } from "react";

const subjects = [
  "General Enquiry",
  "Programme Information",
  "Partnership Enquiry",
  "Media & Press",
  "Donation Enquiry",
  "Volunteer Enquiry",
  "Policy Documents Request",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Submission failed.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-earth text-xl mb-2">Message Sent!</h3>
        <p className="text-charcoal/65 text-sm max-w-sm mx-auto">
          Thank you for reaching out to ASREP Africa. We will respond within 3–5 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input id="contact-name" name="fullName" type="text" required aria-required="true"
            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
              focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input id="contact-email" name="email" type="email" required aria-required="true"
            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
              focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-org" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
          Organisation (optional)
        </label>
        <input id="contact-org" name="organisation" type="text"
          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
            focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition" />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
          Subject <span aria-hidden="true">*</span>
        </label>
        <select id="contact-subject" name="subject" required aria-required="true"
          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition">
          <option value="">Select a subject</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea id="contact-message" name="message" rows={6} required aria-required="true"
          placeholder="How can ASREP Africa help you? Please include as much detail as relevant..."
          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
            focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent
            resize-none transition" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <button type="submit" disabled={status === "loading"}
        className="w-full py-4 bg-forest hover:bg-sage text-white font-semibold text-sm
          rounded-xl transition-all disabled:opacity-50 focus-visible:ring-2
          focus-visible:ring-forest focus-visible:outline-none">
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
