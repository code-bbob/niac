"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  CheckCircle,
  Loader2,
  Upload,
  FileText,
  Banknote,
  Search,
  Copy,
  ExternalLink,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function ScrollReveal() {
  useEffect(() => {
    const els = () => document.querySelectorAll(".reveal");
    const cb = (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    const obs = new IntersectionObserver(cb, { threshold: 0.08 });
    const scan = () => els().forEach((el) => obs.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      obs.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const STEPS = [
  { num: 1, label: "Fill Form", desc: "Complete your registration details" },
  { num: 2, label: "Get ID", desc: "Receive your unique Registration ID" },
  { num: 3, label: "Send Wire", desc: "Transfer USD with your ID in the memo" },
  { num: 4, label: "Upload Proof", desc: "Submit your MT103 receipt" },
  { num: 5, label: "Confirmed", desc: "We verify & confirm your seat" },
];

function WorkflowStepper() {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-[#1e3a8a]/10 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-[#1e3a8a]" />
        </div>
        <h3 className="font-serif text-lg text-[#1e3a8a] font-semibold">
          How It Works
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="relative flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2"
          >
            <div className="flex items-center gap-3 sm:flex-col sm:items-center">
              <div className="w-9 h-9 bg-[#9F8320] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {step.num}
              </div>
              <div className="sm:text-center">
                <p className="text-sm font-semibold text-stone-800">
                  {step.label}
                </p>
                <p className="text-xs text-stone-400 hidden sm:block">
                  {step.desc}
                </p>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="hidden sm:block absolute top-4 -right-2.5 text-stone-300">
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowSidebar() {
  return (
    <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/15 rounded-xl p-6">
      <h3 className="font-serif text-[#1e3a8a] font-semibold mb-4 text-base">
        Payment Workflow
      </h3>
      <div className="space-y-4">
        {[
          {
            step: "1",
            icon: FileText,
            text: "Submit this registration form to get your unique Registration ID",
          },
          {
            step: "2",
            icon: Banknote,
            text: "Send USD wire to Sanima Bank — put your Registration ID in the memo field",
          },
          {
            step: "3",
            icon: Upload,
            text: "Upload your wire receipt / MT103 below to shift status to Pending Verification",
          },
          {
            step: "4",
            icon: Search,
            text: "We match your transfer against our bank statement and Confirm your seat",
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#9F8320] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {item.step}
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BankDetailsCard({ event }) {
  const [copiedField, setCopiedField] = useState(null);
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const field = (label, value) => (
    <div className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
      <div>
        <span className="text-xs text-stone-400 uppercase tracking-wider">
          {label}
        </span>
        <p className="text-sm font-semibold text-stone-800">{value || "—"}</p>
      </div>
      {value && (
        <button
          onClick={() => copyToClipboard(value, label)}
          className="flex-shrink-0 w-7 h-7 hover:bg-stone-100 rounded flex items-center justify-center transition-colors"
          title="Copy"
        >
          {copiedField === label ? (
            <CheckCircle className="w-3.5 h-3.5 text-green-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="bg-white border-2 border-[#9F8320]/30 rounded-xl overflow-hidden">
        <div className="bg-[#9F8320] px-5 py-3">
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4 text-white" />
            <p className="text-white font-semibold text-sm">
              Sanima Bank Wire Details
            </p>
          </div>
        </div>
        <div className="px-5 py-3">
          {field("Bank Name", event?.bank_name || "Sanima Bank Ltd.")}
          {field(
            "Account Name",
            event?.bank_account_name || "Nepal International A.D.R. Center",
          )}
          {field("Account Number", event?.bank_number)}
          {field("Account Type", event?.bank_account_type || "Savings Account")}
          {field("SWIFT Code", event?.swift_code)}
          {field("Bank Address", event?.bank_address || "Kathmandu, Nepal")}
        </div>
        <div className="bg-red-50 border-t-2 border-red-200 px-5 py-3">
          <p className="text-xs text-red-700 font-semibold flex items-start gap-1.5">
            <span className="text-base leading-none mt-0.5">⚠</span>
            You MUST include your Registration ID in the wire transfer
            memo/remarks. Otherwise we cannot match your payment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EventRegistrationPage() {
  const params = useParams();
  const slug = params.slug;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    spaces: 1,
    participant_type: "foreign_early_bird",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    company: "",
    comment: "",
    reference_code: "",
  });

  const pricing = useMemo(() => {
    if (!event) return null;
    const { participant_type, spaces } = form;
    let label, unit, totalDisplay;
    if (participant_type === "nepali_scholars") {
      const price = event.nepali_price_npr || 25000;
      label = unit = `NPR ${price.toLocaleString()}`;
      totalDisplay = `NPR ${(price * spaces).toLocaleString()}`;
    } else if (participant_type === "nepali_institutional") {
      const price = event.institutional_price_npr || 100000;
      label = unit = `NPR ${price.toLocaleString()}`;
      totalDisplay = `NPR ${(price * spaces).toLocaleString()}`;
    } else if (participant_type === "nepali_individual") {
      const price = event.individual_price_npr || 45000;
      label = unit = `NPR ${price.toLocaleString()}`;
      totalDisplay = `NPR ${(price * spaces).toLocaleString()}`;
    } else if (participant_type === "foreign_early_bird") {
      const price = event.foreign_early_bird_usd || 200;
      label = unit = `USD ${price.toLocaleString()}`;
      totalDisplay = `USD ${(price * spaces).toLocaleString()}`;
    } else {
      const price = event.foreign_standard_usd || 250;
      label = unit = `USD ${price.toLocaleString()}`;
      totalDisplay = `USD ${(price * spaces).toLocaleString()}`;
    }
    return { label, unit, totalDisplay };
  }, [event, form.participant_type, form.spaces]);

  // Success state
  const [bookingData, setBookingData] = useState(null);
  const [proofUploading, setProofUploading] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);
  const [proofError, setProofError] = useState(null);

  // Proof confirmation
  const [pendingFile, setPendingFile] = useState(null);
  const fileInputRef = useRef(null);

  // Token/lookup state
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState(null);
  const [showLookupForm, setShowLookupForm] = useState(false);
  const [lookupForm, setLookupForm] = useState({
    email: "",
    registration_id: "",
  });

  useEffect(() => {
    if (!slug) return;

    const token = new URLSearchParams(window.location.search).get("token");
    const lsToken = !token
      ? localStorage.getItem(`niac_booking_${slug}`)
      : null;
    const lookupToken = token || lsToken;

    const fetchEvent = fetch(`${API_URL}/events/${slug}/`).then((r) => {
      if (!r.ok) throw new Error("Event not found");
      return r.json();
    });

    if (lookupToken) {
      setLookupLoading(true);
      Promise.all([
        fetchEvent,
        fetch(
          `${API_URL}/event-bookings/lookup/?token=${encodeURIComponent(lookupToken)}`,
        ).then((r) => r.json()),
      ])
        .then(([eventData, lookupData]) => {
          setEvent(eventData);
          if (lookupData.booking) {
            setBookingData(lookupData.booking);
            setProofUploaded(
              lookupData.booking.status === "pending_verification" ||
                lookupData.booking.status === "confirmed",
            );
            setSuccess(true);
            if (token) {
              window.history.replaceState({}, "", window.location.pathname);
            }
          } else {
            setLookupError("Booking not found. The link may be invalid.");
          }
          setLoading(false);
          setLookupLoading(false);
        })
        .catch(() => {
          setError("Failed to load your booking details.");
          setLoading(false);
          setLookupLoading(false);
        });
    } else {
      fetchEvent
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load event details.");
          setLoading(false);
        });
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...form,
        event: event.id,
        total_amount_display: pricing?.totalDisplay || "",
      };
      const res = await fetch(`${API_URL}/event-bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Submission failed. Please try again.",
        );
      }

      const booking = data.booking || data;
      setBookingData(booking);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const bookToken = booking.lookup_token || data.lookup_token;
      if (bookToken) {
        localStorage.setItem(`niac_booking_${slug}`, bookToken);
        window.history.replaceState({}, "", `?token=${bookToken}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPendingFile(file);
    setProofError(null);
  };

  const confirmUpload = async () => {
    if (!pendingFile || !bookingData?.id) return;

    setProofUploading(true);
    setProofError(null);

    try {
      const formData = new FormData();
      formData.append("proof_file", pendingFile);

      const res = await fetch(
        `${API_URL}/event-bookings/${bookingData.id}/upload_proof/`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setProofUploaded(true);
      setPendingFile(null);
    } catch (err) {
      setProofError(err.message);
    } finally {
      setProofUploading(false);
    }
  };

  const cancelUpload = () => {
    setPendingFile(null);
    setProofError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleLookupChange = (e) => {
    const { name, value } = e.target;
    setLookupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    setLookupError(null);
    setLookupLoading(true);

    try {
      const params = new URLSearchParams({
        email: lookupForm.email,
        registration_id: lookupForm.registration_id,
      });
      const res = await fetch(`${API_URL}/event-bookings/lookup/?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No booking found");
      }

      const lsToken = data.booking?.lookup_token;
      if (lsToken) {
        localStorage.setItem(`niac_booking_${slug}`, lsToken);
        window.history.replaceState({}, "", `?token=${lsToken}`);
      }

      setBookingData(data.booking);
      setProofUploaded(
        data.booking.status === "pending_verification" ||
          data.booking.status === "confirmed",
      );
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setLookupError(err.message);
    } finally {
      setLookupLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#9F8320] animate-spin" />
          <p className="text-stone-500 text-sm font-medium">
            Loading registration...
          </p>
        </div>
      </div>
    );
  }

  // ── SUCCESS VIEW ──────────────────────────────────────────────────────────

  if (success) {
    return (
      <>
        <ScrollReveal />
        <section className="min-h-screen bg-white pt-28 pb-24 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8">
            {/* Success header */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-[#1e3a8a] font-bold mb-2">
                Registration Received, Payment Pending!
              </h1>
              <p className="text-stone-500 text-sm">
                Thank you for registering for{" "}
                <strong className="text-stone-700">{event?.title}</strong>
              </p>
            </div>

            {!proofUploaded && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-xl leading-none mt-0.5">⚠</span>
                  <div>
                    <p className="text-red-800 font-bold text-sm">
                      Action Required — Wire Transfer Not Yet Completed
                    </p>
                    <p className="text-red-700 text-xs mt-1.5 leading-relaxed">
                      Your registration is on hold until you send the wire
                      transfer and upload the payment receipt. A link to return
                      to this page has been emailed to you — you can leave and
                      come back anytime.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Registration ID Badge */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-[#9F8320] to-[#c9a961] text-white px-8 py-4 rounded-xl shadow-lg shadow-[#9F8320]/30">
                <p className="text-xs tracking-[0.2em] uppercase opacity-80 mb-1">
                  Your Registration ID
                </p>
                <p className="font-mono text-3xl md:text-4xl font-bold tracking-wider">
                  {bookingData?.registration_id || "—"}
                </p>
              </div>
              <p className="text-xs text-stone-400 mt-3">
                Save this ID — you will need it for your wire transfer.
              </p>
            </div>

            {/* Pricing Summary on Success */}
            {bookingData?.total_amount_display && (
              <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/15 rounded-xl p-5 mb-8">
                <h4 className="font-semibold text-[#1e3a8a] text-sm mb-3">
                  Registration Fee Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Participant Type</span>
                    <span className="font-medium text-stone-800">
                      {bookingData.participant_type === "nepali_institutional"
                        ? "Institutional Fee"
                        : bookingData.participant_type === "nepali_individual"
                          ? "Individual Fee"
                          : bookingData.participant_type === "nepali_scholars"
                            ? "Scholars, Academics & Students"
                            : bookingData.participant_type ===
                                "foreign_early_bird"
                              ? "Early Bird"
                              : "Standard"}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Number of Participants</span>
                    <span className="font-medium text-stone-800">
                      {bookingData.spaces}
                    </span>
                  </div>
                  <div className="border-t border-stone-200 pt-2 flex justify-between">
                    <span className="font-semibold text-stone-800">
                      Total Amount
                    </span>
                    <span className="font-bold text-lg text-[#1e3a8a]">
                      {bookingData.total_amount_display}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-6 mb-8">
              <h3 className="font-serif text-[#1e3a8a] font-semibold mb-4 text-lg">
                Complete Your Registration – 3 Simple Steps
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-amber-100">
                  <div className="w-8 h-8 bg-[#9F8320] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">
                      Send Wire Transfer to Sanima Bank
                    </p>
                    <p className="text-stone-500 text-xs mt-1">
                      Instruct your bank to wire{" "}
                      <strong>
                        {bookingData?.total_amount_display ||
                          "the ticket amount"}
                      </strong>
                      . You <strong className="text-red-600">MUST</strong> put{" "}
                      <span className="font-mono font-bold text-[#1e3a8a] bg-[#1e3a8a]/10 px-1.5 py-0.5 rounded">
                        {bookingData?.registration_id}
                      </span>{" "}
                      in the wire memo/remarks field.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-amber-100">
                  <div className="w-8 h-8 bg-[#9F8320] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">
                      Upload Your MT103 / Wire Receipt
                    </p>
                    <p className="text-stone-500 text-xs mt-1">
                      Upload your payment receipt below. Your status will change
                      to <strong>"Pending Verification"</strong>.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-amber-100">
                  <div className="w-8 h-8 bg-[#9F8320] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">
                      We Match & Confirm
                    </p>
                    <p className="text-stone-500 text-xs mt-1">
                      Our team checks your transfer against our Sanima Bank
                      statement and flips your status to{" "}
                      <strong>"Confirmed"</strong>. You'll get a confirmation
                      email.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <BankDetailsCard event={event} />

            {/* Proof Upload */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-[#9F8320]" />
                <h3 className="font-serif text-lg text-[#1e3a8a] font-semibold">
                  Upload Wire Transfer Receipt
                </h3>
              </div>
              <p className="text-stone-500 text-sm mb-4">
                After sending your wire, upload the MT103 or bank receipt here.
                We'll verify and confirm your registration.
              </p>

              {proofUploaded ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-semibold text-sm">
                    Receipt Uploaded Successfully!
                  </p>
                  {bookingData?.status === "confirmed" ? (
                    <p className="text-green-600 text-xs mt-1">
                      Your registration is <strong>Confirmed</strong>. Thank
                      you!
                    </p>
                  ) : (
                    <p className="text-green-600 text-xs mt-1">
                      Your status is now <strong>Pending Verification</strong>.
                      We'll confirm within 2–3 business days.
                    </p>
                  )}
                </div>
              ) : pendingFile ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-center">
                  <p className="text-amber-800 font-semibold text-sm mb-2">
                    Once uploaded, the receipt cannot be changed.
                  </p>
                  <p className="text-amber-600 text-xs mb-4">
                    Are you sure you want to upload this receipt?
                  </p>
                  <p className="text-xs text-amber-500 mb-4 truncate max-w-full">
                    Selected file: <strong>{pendingFile.name}</strong>
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={cancelUpload}
                      disabled={proofUploading}
                      className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-lg text-sm font-semibold hover:bg-stone-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmUpload}
                      disabled={proofUploading}
                      className="px-5 py-2.5 bg-[#9F8320] hover:bg-[#9F8320]/90 disabled:bg-stone-400 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      {proofUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Yes, Upload Receipt"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {proofError && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {proofError}
                    </div>
                  )}
                  <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-stone-300 hover:border-[#9F8320]/50 rounded-lg p-8 cursor-pointer transition-colors bg-stone-50/50 hover:bg-stone-50">
                    <Upload className="w-8 h-8 text-stone-400 mb-2" />
                    <p className="text-sm font-semibold text-stone-600">
                      Click to upload your receipt
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      PDF, PNG, or JPG accepted
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileSelect}
                    />
                  </label>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href={`/events/${slug}`}
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-8 py-4 text-sm tracking-wider uppercase transition-all duration-500 rounded-lg"
              >
                Back to Event
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-[#9F8320] hover:bg-[#9F8320]/90 text-white font-semibold px-8 py-4 text-sm tracking-wider uppercase transition-all duration-500 rounded-lg"
              >
                All Events
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── FORM VIEW ─────────────────────────────────────────────────────────────

  return (
    <>
      <ScrollReveal />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "url('/images/possibility1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
        <div className="absolute top-0 right-0 w-1/3 h-1 bg-[#9F8320] z-10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
          <Link
            href={`/events/${slug}`}
            className="reveal inline-flex items-center gap-2 text-white/60 hover:text-[#9F8320] text-sm transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Event
          </Link>
          <div className="max-w-3xl">
            <div className="reveal flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#9F8320]/70 font-medium mb-4">
              <span className="h-px w-8 bg-[#9F8320]/40" />
              Event Registration
            </div>
            <h1 className="reveal font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-4">
              {event?.title}
            </h1>
            <div className="reveal flex flex-wrap items-center gap-4 mt-6">
              {event?.event_start_date && (
                <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/15 px-5 py-2.5 rounded-full text-sm text-white/80">
                  <Calendar className="w-4 h-4 text-[#9F8320]" />
                  {new Date(event.event_start_date).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                  {event?.event_end_date &&
                    ` — ${new Date(event.event_end_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}`}
                </span>
              )}
              <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/15 px-5 py-2.5 rounded-full text-sm text-white/80">
                <MapPin className="w-4 h-4 text-[#9F8320]" />
                Kathmandu, Nepal
              </span>
            </div>
            {(event?.nepali_price_npr ||
              event?.institutional_price_npr ||
              event?.individual_price_npr ||
              event?.foreign_early_bird_usd ||
              event?.foreign_standard_usd) && (
              <div className="reveal mt-6 inline-flex flex-wrap items-stretch gap-0 bg-[#9F8320]/15 border border-[#9F8320]/30 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-r border-[#9F8320]/20">
                  <span className="text-white/60 text-xs tracking-wider uppercase">
                    Institutional Fee
                  </span>
                  <p className="text-white font-semibold text-base">
                    NPR{" "}
                    {event.institutional_price_npr?.toLocaleString() ||
                      "100,000"}
                  </p>
                </div>
                <div className="px-5 py-3 border-r border-[#9F8320]/20">
                  <span className="text-white/60 text-xs tracking-wider uppercase">
                    Individual Fee
                  </span>
                  <p className="text-white font-semibold text-base">
                    NPR{" "}
                    {event.individual_price_npr?.toLocaleString() || "45,000"}
                  </p>
                </div>
                <div className="px-5 py-3 border-r border-[#9F8320]/20">
                  <span className="text-white/60 text-xs tracking-wider uppercase">
                    Scholars & Students
                  </span>
                  <p className="text-white font-semibold text-base">
                    NPR {event.nepali_price_npr?.toLocaleString() || "25,000"}
                  </p>
                </div>
                <div className="px-5 py-3 border-r border-[#9F8320]/20">
                  <span className="text-white/60 text-xs tracking-wider uppercase">
                    Early Bird
                  </span>
                  <p className="text-[#9F8320] font-semibold text-base">
                    USD{" "}
                    {event.foreign_early_bird_usd?.toLocaleString() || "150"}
                  </p>
                  <span className="text-white/40 text-[10px]">
                    until Aug 2026
                  </span>
                </div>
                <div className="px-5 py-3">
                  <span className="text-white/60 text-xs tracking-wider uppercase">
                    Standard
                  </span>
                  <p className="text-white font-semibold text-base">
                    USD {event.foreign_standard_usd?.toLocaleString() || "200"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 72" fill="none" className="w-full h-auto">
            <path
              d="M0 72V0C240 48 480 72 720 72C960 72 1200 48 1440 0V72H0Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* Workflow Stepper */}
      <section className="py-8 bg-stone-50 border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <WorkflowStepper />
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="reveal">
                <h2 className="font-serif text-2xl text-[#1e3a8a] font-semibold mb-4">
                  Why Register?
                </h2>
                <ul className="space-y-4">
                  {[
                    {
                      icon: Users,
                      text: "Network with global ADR professionals",
                    },
                    {
                      icon: Calendar,
                      text: "Keynote sessions, panels & workshops",
                    },
                    {
                      icon: MapPin,
                      text: "Experience the rich culture of Nepal",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-stone-600 text-sm"
                      >
                        <div className="w-8 h-8 bg-[#9F8320]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-[#9F8320]" />
                        </div>
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Payment Workflow Sidebar */}
              <div className="reveal">
                <WorkflowSidebar />
              </div>

              {/* Registration Fees */}
              <div className="reveal bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-3 text-base">
                  Registration Fees
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-stone-600">Early Bird</span>
                    <span className="font-bold text-stone-800">
                      USD{" "}
                      {event?.foreign_early_bird_usd?.toLocaleString() || "200"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-stone-600">Standard</span>
                    <span className="font-bold text-stone-800">
                      USD{" "}
                      {event?.foreign_standard_usd?.toLocaleString() || "250"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-stone-600">Institutional Fee</span>
                    <span className="font-bold text-stone-800">
                      NPR{" "}
                      {event?.institutional_price_npr?.toLocaleString() ||
                        "100,000"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-stone-600">Individual Fee</span>
                    <span className="font-bold text-stone-800">
                      NPR{" "}
                      {event?.individual_price_npr?.toLocaleString() ||
                        "45,000"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-stone-600">
                      Scholars, Academics & Students
                    </span>
                    <span className="font-bold text-stone-800">
                      NPR{" "}
                      {event?.nepali_price_npr?.toLocaleString() || "25,000"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Info / Bank Details */}
              <div className="reveal">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-3 text-base">
                  Payment Instructions
                </h3>
                <BankDetailsCard event={event} />
              </div>

              <div className="reveal bg-stone-50 border border-stone-200 rounded-xl p-6">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-3">
                  Need Help?
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  For inquiries about registration, sponsorship, or the event
                  program, please contact us.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#9F8320] text-sm font-semibold hover:underline underline-offset-4"
                >
                  Contact Us
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="reveal bg-stone-50 border border-stone-200 rounded-xl p-6">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-3">
                  Hotel Accommodation
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  We recommend the following hotels for your stay during the
                  event:
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-sm text-stone-800 mb-2">
                      Hotel View Bhrikuti
                    </p>
                    <div className="rounded-lg overflow-hidden">
                      <iframe
                        src="https://maps.google.com/maps?q=Hotel%20View%20Bhrikuti%20Kathmandu&output=embed"
                        width="100%"
                        height="160"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Hotel View Bhrikuti location"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-stone-800 mb-2">
                      Best Western Plus Hotel
                    </p>
                    <div className="rounded-lg overflow-hidden">
                      <iframe
                        src="https://maps.google.com/maps?q=Best%20Western%20Plus%20Hotel%20Kathmandu&output=embed"
                        width="100%"
                        height="160"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Best Western Plus Hotel location"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="reveal bg-white border-t-4 border-[#9F8320] shadow-sm rounded-xl p-8 md:p-10">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-100">
                  <div>
                    <h2 className="font-serif text-2xl text-[#1e3a8a] font-semibold">
                      Registration Form
                    </h2>
                    <p className="text-stone-400 text-sm mt-1">
                      Fill in your details to secure your place
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-lg">
                    <Users className="w-4 h-4 text-[#9F8320]" />
                    <span className="text-sm font-semibold text-stone-700">
                      {form.spaces || 1}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Spaces */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Number of Spaces <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            spaces: Math.max(1, p.spaces - 1),
                          }))
                        }
                        className="w-10 h-10 border border-stone-300 rounded-lg flex items-center justify-center text-stone-600 hover:border-[#9F8320] hover:text-[#9F8320] transition-all"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-lg text-stone-800">
                        {form.spaces}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            spaces: Math.min(20, p.spaces + 1),
                          }))
                        }
                        className="w-10 h-10 border border-stone-300 rounded-lg flex items-center justify-center text-stone-600 hover:border-[#9F8320] hover:text-[#9F8320] transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Participant Type */}
                  {/* Participant Type */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-3">
                      Participant Type <span className="text-red-400">*</span>
                    </label>

                    {/* International Participants */}
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      International Participants
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      {[
                        {
                          value: "foreign_early_bird",
                          label: "Early Bird",
                          price: event?.foreign_early_bird_usd
                            ? `USD ${event.foreign_early_bird_usd.toLocaleString()}`
                            : "USD 200",
                          subtitle: "until Aug 2026",
                        },
                        {
                          value: "foreign_standard",
                          label: "Standard",
                          price: event?.foreign_standard_usd
                            ? `USD ${event.foreign_standard_usd.toLocaleString()}`
                            : "USD 250",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              participant_type: opt.value,
                            }))
                          }
                          className={`relative text-left p-4 rounded-xl border-2 transition-all ${
                            form.participant_type === opt.value
                              ? "border-[#9F8320] bg-[#9F8320]/5 shadow-sm"
                              : "border-stone-200 bg-white hover:border-stone-300"
                          }`}
                        >
                          <p className="text-sm font-semibold text-stone-800">
                            {opt.label}
                          </p>
                          <p className="text-lg font-bold text-[#1e3a8a] mt-1">
                            {opt.price}
                          </p>
                          {opt.subtitle && (
                            <p className="text-xs text-[#9F8320] font-medium mt-0.5">
                              {opt.subtitle}
                            </p>
                          )}
                          {form.participant_type === opt.value && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-[#9F8320] rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Nepali Participants — grouped box */}
                    <div className="border-2 border-[#1e3a8a]/15 bg-[#1e3a8a]/[0.03] rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-xs font-semibold text-[#1e3a8a] uppercase tracking-wider">
                          Nepali Participants
                        </p>
                        <span className="text-[#9F8320] text-[10px] font-medium bg-[#9F8320]/10 px-2 py-0.5 rounded-full">
                          Limited Seats
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          {
                            value: "nepali_institutional",
                            label: "Institutional Fee",
                            price: event?.institutional_price_npr
                              ? `NPR ${event.institutional_price_npr.toLocaleString()}`
                              : "NPR 100,000",
                          },
                          {
                            value: "nepali_individual",
                            label: "Individual Fee",
                            price: event?.individual_price_npr
                              ? `NPR ${event.individual_price_npr.toLocaleString()}`
                              : "NPR 45,000",
                          },
                          {
                            value: "nepali_scholars",
                            label: "Scholars, Academics & Students",
                            price: event?.nepali_price_npr
                              ? `NPR ${event.nepali_price_npr.toLocaleString()}`
                              : "NPR 25,000",
                          },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              setForm((p) => ({
                                ...p,
                                participant_type: opt.value,
                              }))
                            }
                            className={`relative text-left p-4 rounded-xl border-2 bg-white transition-all ${
                              form.participant_type === opt.value
                                ? "border-[#9F8320] bg-[#9F8320]/5 shadow-sm"
                                : "border-stone-200 hover:border-stone-300"
                            }`}
                          >
                            <p className="text-sm font-semibold text-stone-800">
                              {opt.label}
                            </p>
                            <p className="text-lg font-bold text-[#1e3a8a] mt-1">
                              {opt.price}
                            </p>
                            {form.participant_type === opt.value && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-[#9F8320] rounded-full flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. John Doe"
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        Phone <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+977 1234567890"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Law Firm, Institution, etc."
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="Street address, P.O. Box"
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                    />
                  </div>

                  {/* City + State + ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        City <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="Kathmandu"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        State / Province <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        required
                        placeholder="Bagmati"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        ZIP Code <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="zip_code"
                        value={form.zip_code}
                        onChange={handleChange}
                        required
                        placeholder="44600"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Country <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 text-sm transition-all appearance-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2375777d' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                      }}
                    >
                      <option value="">Select your country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Special Requests / Comments
                    </label>
                    <textarea
                      name="comment"
                      value={form.comment}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Dietary requirements, accessibility needs, or any questions..."
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Pricing Summary */}
                  {pricing && (
                    <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/15 rounded-xl p-5">
                      <h4 className="font-semibold text-[#1e3a8a] text-sm mb-3">
                        Registration Fee Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-stone-600">
                          <span>Participant Type</span>
                          <span className="font-medium text-stone-800">
                            {form.participant_type === "nepali_institutional"
                              ? "Institutional Fee"
                              : form.participant_type === "nepali_individual"
                                ? "Individual Fee"
                                : form.participant_type === "nepali_scholars"
                                  ? "Scholars, Academics & Students"
                                  : form.participant_type ===
                                      "foreign_early_bird"
                                    ? "Early Bird"
                                    : "Standard"}
                          </span>
                        </div>
                        <div className="flex justify-between text-stone-600">
                          <span>Unit Price</span>
                          <span className="font-medium text-stone-800">
                            {pricing.unit}
                          </span>
                        </div>
                        <div className="flex justify-between text-stone-600">
                          <span>Number of Participants</span>
                          <span className="font-medium text-stone-800">
                            {form.spaces}
                          </span>
                        </div>
                        <div className="border-t border-stone-200 pt-2 flex justify-between">
                          <span className="font-semibold text-stone-800">
                            Total Amount
                          </span>
                          <span className="font-bold text-lg text-[#1e3a8a]">
                            {pricing.totalDisplay}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#9F8320] hover:bg-[#9F8320]/90 disabled:bg-stone-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 text-sm tracking-wider uppercase shadow-lg shadow-[#9F8320]/20"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Register Now
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-stone-400 mt-4">
                      By submitting, you agree to our terms and conditions. We
                      will handle your data in accordance with our privacy
                      policy.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Already Registered? Lookup */}
      <section className="pb-16 bg-white border-t border-stone-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-10">
          <div className="text-center">
            <p className="text-stone-500 text-sm">
              Already registered?{" "}
              <button
                onClick={() => setShowLookupForm(!showLookupForm)}
                className="text-[#9F8320] font-semibold hover:underline"
              >
                Look up your registration
              </button>
            </p>
          </div>
          {showLookupForm && (
            <div className="max-w-md mx-auto mt-6 bg-stone-50 border border-stone-200 rounded-xl p-6">
              <h4 className="font-semibold text-stone-800 mb-1">
                Find Your Booking
              </h4>
              <p className="text-xs text-stone-400 mb-4">
                Enter the email and Registration ID you received.
              </p>
              {lookupError && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {lookupError}
                </div>
              )}
              <form onSubmit={handleLookupSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={lookupForm.email}
                  onChange={handleLookupChange}
                  required
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm"
                />
                <input
                  type="text"
                  name="registration_id"
                  value={lookupForm.registration_id}
                  onChange={handleLookupChange}
                  required
                  placeholder="Your Registration ID (e.g., ADR-001)"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm"
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="w-full bg-[#9F8320] hover:bg-[#9F8320]/90 disabled:bg-stone-400 text-white font-semibold py-3 px-6 rounded-xl transition-all text-sm tracking-wider uppercase"
                >
                  {lookupLoading ? "Searching..." : "Search"}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
