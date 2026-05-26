"use client";

import { useState } from "react";

const partnerTypes = [
  { value: "institutional", label: "Institutional / Government" },
  { value: "funding", label: "Funding / Foundation" },
  { value: "corporate-csr", label: "Corporate / CSR" },
  { value: "academic", label: "Academic / Research" },
  { value: "ngo", label: "NGO / Civil Society" },
  { value: "other", label: "Other" },
];

export default function PartnerForm() {
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
          subject: `Partnership Enquiry — ${data.get("partnerType")}`,
          fullName: data.get("contactName"),
          email: data.get("email"),
          organisation: data.get("organisationName"),
          message: `Partner Type: ${data.get("partnerType")}\nWebsite: ${data.get("website") || "Not provided"}\n\n${data.get("message")}`,
        }),
      });

      if (!res.ok) throw new Error("Submission failed. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
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
        <h3 className="font-display font-bold text-earth text-xl mb-2">Enquiry Received!</h3>
        <p className="text-charcoal/65 text-sm max-w-sm mx-auto">
          Thank you for your interest in partnering with ASREP Africa. Our partnerships team will contact you within 5 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="org-name" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            Organisation Name <span aria-hidden="true">*</span>
          </label>
          <input id="org-name" name="organisationName" type="text" required aria-required="true"
            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            Contact Name <span aria-hidden="true">*</span>
          </label>
          <input id="contact-name" name="contactName" type="text" required aria-required="true"
            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="partner-email" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input id="partner-email" name="email" type="email" required aria-required="true"
            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="partner-website" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            Website
          </label>
          <input id="partner-website" name="website" type="url" placeholder="https://"
            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition" />
        </div>
      </div>

      <div>
        <label htmlFor="partner-type" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
          Partnership Type <span aria-hidden="true">*</span>
        </label>
        <select id="partner-type" name="partnerType" required aria-required="true"
          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition">
          <option value="">Select type</option>
          {partnerTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="partner-message" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
          Partnership Interest / Proposal
        </label>
        <textarea id="partner-message" name="message" rows={5}
          placeholder="Describe your organisation's areas of interest, proposed collaboration type, and any relevant existing work in Kenya's ASAL regions..."
          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none transition" />
      </div>

      {status === "error" && <p role="alert" className="text-red-600 text-sm">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading"}
        className="w-full py-4 bg-forest hover:bg-sage text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-50">
        {status === "loading" ? "Submitting…" : "Send Partnership Enquiry"}
      </button>
    </form>
  );
}
