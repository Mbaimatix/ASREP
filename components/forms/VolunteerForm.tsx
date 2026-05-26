"use client";

import { useState } from "react";

const skillOptions = [
  "Research & Documentation", "Community Facilitation", "Environmental Science",
  "Communications & Media", "Monitoring & Evaluation", "Finance & Administration",
  "IT & Digital Systems", "Legal & Policy", "Healthcare & Welfare", "Education & Training",
];

const availabilityOptions = [
  "1–5 hours/week (remote)", "6–10 hours/week (remote)",
  "Full-time (field deployment)", "Short-term project (1–4 weeks)", "Long-term placement (3+ months)",
];

export default function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) =>
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("skills", selectedSkills.join(", "));

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Volunteer Enquiry",
          fullName: data.get("fullName"),
          email: data.get("email"),
          phone: data.get("phone"),
          organisation: data.get("organisation"),
          message: `Skills: ${data.get("skills")}\nAvailability: ${data.get("availability")}\n\nMessage:\n${data.get("message")}`,
        }),
      });

      if (!res.ok) throw new Error("Submission failed. Please try again.");
      setStatus("success");
      form.reset();
      setSelectedSkills([]);
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
        <h3 className="font-display font-bold text-earth text-xl mb-2">Application Received!</h3>
        <p className="text-charcoal/65 text-sm">
          Thank you for your interest in volunteering with ASREP Africa. Our team will be in touch within 5–7 working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { id: "fullName", label: "Full Name", type: "text", required: true },
          { id: "email", label: "Email Address", type: "email", required: true },
          { id: "phone", label: "Phone Number", type: "tel", required: false },
          { id: "organisation", label: "Organisation / University (optional)", type: "text", required: false },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={`vol-${field.id}`} className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
              {field.label} {field.required && <span aria-hidden="true">*</span>}
            </label>
            <input
              id={`vol-${field.id}`}
              name={field.id}
              type={field.type}
              required={field.required}
              aria-required={field.required}
              className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
                focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <fieldset>
        <legend className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
          Skills &amp; Expertise (select all that apply)
        </legend>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              aria-pressed={selectedSkills.includes(skill)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${selectedSkills.includes(skill)
                  ? "bg-forest border-forest text-white"
                  : "bg-white border-charcoal/20 text-charcoal/70 hover:border-forest/50"
                }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Availability */}
      <div>
        <label htmlFor="vol-availability" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
          Availability <span aria-hidden="true">*</span>
        </label>
        <select
          id="vol-availability"
          name="availability"
          required
          aria-required="true"
          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
            focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent
            bg-white transition"
        >
          <option value="">Select availability</option>
          {availabilityOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="vol-message" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
          Tell Us About Yourself
        </label>
        <textarea
          id="vol-message"
          name="message"
          rows={4}
          placeholder="Briefly describe your background, motivation, and what you hope to contribute to ASREP's mission..."
          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm
            focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent
            resize-none transition"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-forest hover:bg-sage text-white font-semibold text-sm
          rounded-xl transition-all disabled:opacity-50 focus-visible:ring-2
          focus-visible:ring-forest focus-visible:outline-none"
      >
        {status === "loading" ? "Submitting…" : "Submit Volunteer Application"}
      </button>
    </form>
  );
}
