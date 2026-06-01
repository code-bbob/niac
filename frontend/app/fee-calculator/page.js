"use client";

import { useState, useCallback } from "react";
import { Info, FileText, Wallet } from "lucide-react";

function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = (progress * (end - start) + start).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const arbitratorOptions = [
  { value: "1", label: "Sole Arbitrator (1)" },
  { value: "3", label: "Tribunal (3)" },
];

const contractTypes = [
  { value: "domestic", label: "Domestic Arbitration" },
  { value: "international", label: "International Arbitration" },
];

const ADMIN_FEE_TIERS = [
  { max: 2_000_000, minFee: 50_000 },
  { max: 5_000_000, rate: 2 },
  { max: 10_000_000, rate: 1 },
  { max: 20_000_000, rate: 0.75 },
  { max: 50_000_000, rate: 0.4 },
  { max: 100_000_000, rate: 0.2 },
  { max: 200_000_000, rate: 0.1 },
  { max: 500_000_000, rate: 0.05 },
  { max: Number.POSITIVE_INFINITY, rate: 0.3 },
];

const ARBITRATOR_FEE_TIERS = {
  domestic: [
    {
      max: 2_000_000,
      single: { max: 50_000 },
      tribunal: { max: 80_000 },
    },
    {
      max: 5_000_000,
      single: { rate: 2.5, max: 125_000 },
      tribunal: { rate: 5, max: 330_000 },
    },
    {
      max: 10_000_000,
      single: { rate: 1.8, max: 215_000 },
      tribunal: { rate: 3, max: 480_000 },
    },
    {
      max: 20_000_000,
      single: { rate: 0.8, max: 295_000 },
      tribunal: { rate: 2, max: 1_055_000 },
    },
    {
      max: 50_000_000,
      single: { rate: 0.6, max: 475_000 },
      tribunal: { rate: 1.25, max: 1_285_000 },
    },
    {
      max: 100_000_000,
      single: { rate: 0.2, max: 575_000 },
      tribunal: { rate: 0.46, max: 1_535_000 },
    },
    {
      max: 200_000_000,
      single: { rate: 0.15, max: 725_000 },
      tribunal: { rate: 0.25, max: 1_925_000 },
    },
    {
      max: 500_000_000,
      single: { rate: 0.03, max: 815_000 },
      tribunal: { rate: 0.13 },
    },
    {
      max: Number.POSITIVE_INFINITY,
      single: { rate: 0.025 },
      tribunal: { rate: 0.03 },
    },
  ],
  international: [
    {
      max: 2_000_000,
      single: { max: 250_000 },
      tribunal: { max: 450_000 },
    },
    {
      max: 5_000_000,
      single: { rate: 6, max: 430_000 },
      tribunal: { rate: 12, max: 810_000 },
    },
    {
      max: 10_000_000,
      single: { rate: 3, max: 580_000 },
      tribunal: { rate: 7, max: 1_160_000 },
    },
    {
      max: 20_000_000,
      single: { rate: 2.25, max: 805_000 },
      tribunal: { rate: 5, max: 1_710_000 },
    },
    {
      max: 50_000_000,
      single: { rate: 1.15, max: 1_150_000 },
      tribunal: { rate: 2.75, max: 2_535_000 },
    },
    {
      max: 100_000_000,
      single: { rate: 0.75, max: 1_525_000 },
      tribunal: { rate: 1.75, max: 3_410_000 },
    },
    {
      max: 300_000_000,
      single: { rate: 0.5, max: 2_525_000 },
      tribunal: { rate: 1.5, max: 6_410_000 },
    },
    {
      max: 600_000_000,
      single: { rate: 0.3, max: 3_425_000 },
      tribunal: { rate: 0.9, max: 9_110_000 },
    },
    {
      max: 1_000_000_000,
      single: { rate: 0.15, max: 4_025_000 },
      tribunal: { rate: 0.45, max: 10_910_000 },
    },
    {
      max: Number.POSITIVE_INFINITY,
      single: { rate: 0.1 },
      tribunal: { rate: 0.3 },
    },
  ],
};

const VAT_RATE = 0.13;

const getTier = (amount, tiers) =>
  tiers.find((tier) => amount <= tier.max) || tiers[tiers.length - 1];

const calculateAdminFee = (amount) => {
  const tier = getTier(amount, ADMIN_FEE_TIERS);
  if (tier.minFee) {
    return tier.minFee;
  }
  return amount * (tier.rate / 100);
};

const calculateArbitratorFee = (amount, isTribunal, contractType) => {
  const tiers = ARBITRATOR_FEE_TIERS[contractType];
  const tier = getTier(amount, tiers);
  const feeMeta = isTribunal ? tier.tribunal : tier.single;
  if (!feeMeta.rate) {
    return feeMeta.max || 0;
  }
  const computed = amount * (feeMeta.rate / 100);
  if (feeMeta.max) {
    return Math.min(computed, feeMeta.max);
  }
  return computed;
};

export default function FeeCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NRS");
  const [arbitrators, setArbitrators] = useState("1");
  const [contractType, setContractType] = useState("domestic");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const parsedAmount = parseFloat(amount) || 0;
      const numArbitrators = parseInt(arbitrators, 10);
      const isTribunal = numArbitrators === 3;

      const adminFee = calculateAdminFee(parsedAmount);
      const arbFee = calculateArbitratorFee(
        parsedAmount,
        isTribunal,
        contractType
      );
      const subtotal = adminFee + arbFee;
      const vatAmount = subtotal * VAT_RATE;
      const totalWithVat = subtotal + vatAmount;
      const perParty = totalWithVat / 2;

      document.getElementById("res-currency").textContent = currency;
      animateValue("res-total", 0, totalWithVat, 600);
      animateValue("res-admin", 0, adminFee, 600);
      animateValue("res-arb", 0, arbFee, 600);
      animateValue("res-subtotal", 0, subtotal, 600);
      animateValue("res-vat", 0, vatAmount, 600);
      animateValue("res-per-party", 0, perParty, 600);
    },
    [amount, currency, arbitrators, contractType]
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-[120px] pb-[100px] px-8 bg-primary-container">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
        <div className="max-w-[1600px] mx-auto px-10 pt-10 relative z-10">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.25em] uppercase text-tertiary-fixed mb-4">
              Fee Calculator
              <span className="h-px w-8 bg-tertiary-fixed/50" />
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight font-bold text-white mb-6 max-w-7xl">
              Fee Calculator
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-on-primary-container max-w-2xl opacity-90">
              A transparent tool for estimating administrative and arbitrator fees.
              Calculate your total investment in professional dispute resolution
              based on institutional regulations.
            </p>
          </div>
        </div>
        <div className="absolute -right-1/4 -top-1/4 w-[600px] h-[600px] bg-tertiary opacity-10 blur-[120px] rounded-full" />
      </section>

      {/* Calculator */}
      <section className="max-w-[1600px] mx-auto px-8 pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Inputs */}
          <div className="lg:col-span-7 bg-white border border-outline-variant border-t-[3px] border-t-tertiary-container p-10 animate-fade-in-up animate-delay-100">
            <form className="space-y-12" onSubmit={handleSubmit}>
              {/* Step 1: Contract Type */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant block mb-6">
                  Step 01 / SELECT CONTRACT TYPE
                </label>
                <div className="flex flex-wrap gap-2">
                  {contractTypes.map((ct) => (
                    <label key={ct.value} className="cursor-pointer group">
                      <input
                        type="radio"
                        name="contractType"
                        value={ct.value}
                        checked={contractType === ct.value}
                        onChange={() => setContractType(ct.value)}
                        className="hidden peer"
                      />
                      <div className="px-6 py-3 border border-outline-variant peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary-container transition-all group-hover:border-primary">
                        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase">
                          {ct.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 2: Claim Amount */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant block mb-6">
                  Step 02 / ENTER CLAIM AMOUNT
                </label>
                <div className="relative group">
                  <div className="absolute right-0 top-0 h-full flex items-center pr-4">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="bg-transparent border-none text-[11px] font-semibold tracking-[0.1em] uppercase text-primary focus:ring-0 cursor-pointer"
                    >
                      <option value="NRS">NRS</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 py-4 text-2xl sm:text-3xl font-serif transition-all outline-none"
                  />
                </div>
              </div>

              {/* Step 3: Arbitrators */}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant block mb-6">
                  Step 03 / NUMBER OF ARBITRATORS
                </label>
                <div className="flex gap-4">
                  {arbitratorOptions.map((opt) => (
                    <label key={opt.value} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="arbitrators"
                        value={opt.value}
                        checked={arbitrators === opt.value}
                        onChange={() => setArbitrators(opt.value)}
                        className="hidden peer"
                      />
                      <div className="w-full py-4 text-center border border-outline-variant peer-checked:bg-primary peer-checked:text-on-primary transition-all">
                        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase">
                          {opt.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-tertiary-container text-on-tertiary-container py-5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:brightness-95 transition-all shadow-sm"
              >
                Calculate Estimated Fees
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-outline-variant opacity-60">
              <p className="text-sm leading-relaxed">
                * Estimates are based on the NIAC fee schedule. Filing fees are
                excluded. VAT is applied at 13% after administrative and
                arbitrator fees, and totals are split equally between two
                parties.
              </p>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-primary-container text-white p-10 border-t-[3px] border-t-tertiary animate-fade-in-up animate-delay-200">
              <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-8 opacity-70">
                Total Estimate
              </h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span
                  className="font-serif text-3xl opacity-50"
                  id="res-currency"
                >
                  {currency}
                </span>
                <span className="font-serif text-5xl sm:text-6xl" id="res-total">
                  0.00
                </span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase opacity-70">
                    Administrative Fee
                  </span>
                  <span className="text-base sm:text-lg" id="res-admin">
                    0.00
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase opacity-70">
                    Arbitrator(s) Fee
                  </span>
                  <span className="text-base sm:text-lg" id="res-arb">
                    0.00
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase opacity-70">
                    Subtotal (Excl. VAT)
                  </span>
                  <span className="text-base sm:text-lg" id="res-subtotal">
                    0.00
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase opacity-70">
                    VAT (13%)
                  </span>
                  <span className="text-base sm:text-lg" id="res-vat">
                    0.00
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase opacity-70">
                    Per Party (Incl. VAT)
                  </span>
                  <span className="text-base sm:text-lg" id="res-per-party">
                    0.00
                  </span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-surface-container-low border border-outline-variant p-8 animate-fade-in-up animate-delay-300">
              <div className="flex gap-4 items-start">
                <Info className="text-tertiary w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-primary mb-2">
                    Note on Expenses
                  </h4>
                  <p className="text-sm leading-relaxed text-secondary">
                    This calculation does not include travel, accommodation, or
                    hearing room rentals. For complex multi-party disputes,
                    please contact the secretariat for a customized quote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Regulations */}
      <section className="max-w-[1600px] mx-auto px-8 pb-[120px] border-t border-outline-variant pt-[80px]">
        <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up animate-delay-300">
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl text-primary mb-6">
              Official Rules &amp; Regulations
            </h3>
            <p className="text-base leading-relaxed text-secondary mb-8">
              The International Arbitration Center operates under a strict set
              of procedural rules designed to ensure impartiality, efficiency,
              and legal certainty in all proceedings.
            </p>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center gap-4 group"
              >
                <span className="p-3 bg-secondary-container text-on-secondary-container">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.1em] uppercase border-b border-transparent group-hover:border-tertiary transition-all">
                  Download Rules of Arbitration (PDF)
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 group"
              >
                <span className="p-3 bg-secondary-container text-on-secondary-container">
                  <Wallet className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.1em] uppercase border-b border-transparent group-hover:border-tertiary transition-all">
                  View Full Fee Schedule
                </span>
              </a>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden">
            <img
              className="w-full h-full object-cover grayscale brightness-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACQelxIeneVZKYY1dnGWXyRg7tznZZkqI9tzmQmeIyqV6ArJ5ELa0a5Bk9j4Da137HoggRNlFSco_CIHiFYnOvwErS9llYT9WIg2zlBteuIC3MYInSkQodnqgOyP-c1gMlXHfN7xlJ52k9_xTONYbcOtjxcSIp2BU3a1e_f4BHMzfhoQeBN5cbF6jrnIuQGfb5Ys3yoETyqDCIAV2AM59nwwS_9SfgoOfs8hUrNE5T0-YbDUtFG8oykv82sPeI5gsyGbSXjEZ3FShH"
              alt="Legal Gavel"
            />
          </div>
        </div>
      </section>
    </>
  );
}
