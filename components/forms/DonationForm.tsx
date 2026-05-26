"use client";

import { useState } from "react";

const presetAmounts = [
  { kes: 500, label: "KES 500", impact: "Plants 5 indigenous seedlings" },
  { kes: 1000, label: "KES 1,000", impact: "Trains an eco-champion for a day" },
  { kes: 2500, label: "KES 2,500", impact: "Funds a community peace dialogue" },
  { kes: 5000, label: "KES 5,000", impact: "Sponsors an eco-champion for a month" },
];

const programmes = [
  { id: "climate", label: "Climate Resilience & NbS" },
  { id: "peace", label: "Peacebuilding & Social Cohesion" },
  { id: "research", label: "Research & Indigenous Knowledge" },
  { id: "governance", label: "Civic Governance & Youth" },
  { id: "unrestricted", label: "Where Most Needed (Unrestricted)" },
];

export default function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [programme, setProgramme] = useState("unrestricted");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = customAmount ? parseInt(customAmount, 10) : (selectedAmount ?? 0);

  const handlePreset = (kes: number) => {
    setSelectedAmount(kes);
    setCustomAmount("");
  };

  const handleCustom = (val: string) => {
    setCustomAmount(val.replace(/\D/g, ""));
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!amount || amount < 100) {
      setError("Minimum donation is KES 100.");
      return;
    }
    if (!donorName.trim() || !donorEmail.trim()) {
      setError("Please enter your name and email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/donate/pesapal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "KES",
          programme,
          donorName,
          donorEmail,
          donorPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment initiation failed.");

      // Redirect to Pesapal checkout
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Step 1 — Amount */}
      <fieldset>
        <legend className="font-semibold text-charcoal text-base mb-4">
          1. Choose your donation amount
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {presetAmounts.map((p) => (
            <button
              key={p.kes}
              type="button"
              onClick={() => handlePreset(p.kes)}
              className={`flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all
                focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none
                ${selectedAmount === p.kes
                  ? "border-forest bg-forest text-white"
                  : "border-charcoal/15 hover:border-forest/50 bg-white"
                }`}
            >
              <span className={`font-bold text-base ${selectedAmount === p.kes ? "text-white" : "text-charcoal"}`}>
                {p.label}
              </span>
              <span className={`text-xs mt-1 ${selectedAmount === p.kes ? "text-white/70" : "text-muted"}`}>
                {p.impact}
              </span>
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="relative">
          <label htmlFor="custom-amount" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider block mb-1.5">
            Or enter custom amount (KES)
          </label>
          <div className="flex items-center">
            <span className="absolute left-4 text-charcoal/50 font-medium text-sm">KES</span>
            <input
              id="custom-amount"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={customAmount}
              onChange={(e) => handleCustom(e.target.value)}
              placeholder="e.g. 10,000"
              className="w-full pl-14 pr-4 py-3 rounded-xl border-2 border-charcoal/15 text-sm
                focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent
                transition"
            />
          </div>
        </div>
      </fieldset>

      {/* Step 2 — Programme */}
      <fieldset>
        <legend className="font-semibold text-charcoal text-base mb-4">
          2. Designate your gift (optional)
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {programmes.map((p) => (
            <label
              key={p.id}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all
                ${programme === p.id
                  ? "border-forest bg-forest/5"
                  : "border-charcoal/10 hover:border-forest/30"
                }`}
            >
              <input
                type="radio"
                name="programme"
                value={p.id}
                checked={programme === p.id}
                onChange={() => setProgramme(p.id)}
                className="accent-forest w-4 h-4 shrink-0"
              />
              <span className="text-sm text-charcoal font-medium">{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Step 3 — Donor details */}
      <fieldset>
        <legend className="font-semibold text-charcoal text-base mb-4">
          3. Your details
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="donor-name" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="donor-name"
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
              aria-required="true"
              className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/15 text-sm
                focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="donor-email" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
              Email Address <span aria-hidden="true">*</span>
            </label>
            <input
              id="donor-email"
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              required
              aria-required="true"
              className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/15 text-sm
                focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="donor-phone" className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
              Phone Number (optional — for M-Pesa confirmation)
            </label>
            <input
              id="donor-phone"
              type="tel"
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
              placeholder="+254 7XX XXX XXX"
              className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/15 text-sm
                focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition"
            />
          </div>
        </div>
      </fieldset>

      {/* Summary */}
      {amount > 0 && (
        <div className="bg-forest/5 border-2 border-forest/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-charcoal/70 text-sm">Donation Amount</span>
            <span className="font-bold text-forest text-lg">KES {amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-charcoal/70 text-sm">Programme</span>
            <span className="text-charcoal text-sm font-medium">
              {programmes.find((p) => p.id === programme)?.label}
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p role="alert" className="text-red-600 text-sm font-medium px-1">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !amount || amount < 100}
        className="w-full py-4 bg-cta hover:bg-cta-hover text-white font-bold text-base rounded-xl
          transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50
          disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
          focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Connecting to payment…
          </span>
        ) : (
          `Donate KES ${amount ? amount.toLocaleString() : "–"} Securely`
        )}
      </button>

      <p className="text-muted text-xs text-center">
        Payments processed securely via Pesapal (M-Pesa, Visa, Mastercard, PayPal).
        You will receive an email confirmation.
      </p>
    </form>
  );
}
