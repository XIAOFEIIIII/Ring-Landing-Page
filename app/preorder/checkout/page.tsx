"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

function CheckoutForm() {
  const searchParams = useSearchParams();
  const size = searchParams.get("size") || "";
  const prefillEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(prefillEmail);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [showApt, setShowApt] = useState(false);
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country] = useState("United States");

  const [step, setStep] = useState<1 | 2>(1);

  const contactValid = !!(email && firstName && lastName);
  const shippingValid = !!(street && city && state && postalCode);
  const isValid = contactValid && shippingValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: create Stripe checkout session and redirect
    alert("Stripe checkout integration coming soon!");
  };

  const inputClass =
    "w-full h-[44px] px-0 border-0 border-b border-[#d4d0c8] bg-transparent text-[15px] text-[#141413] placeholder:text-[#b5b0a6] outline-none focus:border-[#141413] transition-colors rounded-none";
  const selectClass =
    "w-full h-[44px] px-0 border-0 border-b border-[#d4d0c8] bg-transparent text-[15px] text-[#141413] outline-none focus:border-[#141413] transition-colors rounded-none appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3%204.5L6%207.5L9%204.5%22%20stroke%3D%22%2373726c%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0px_center]";

  return (
    <main className="min-h-screen bg-[#faf8f5]" style={{ overflowX: "clip" }}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="px-5 lg:px-[64px] max-w-[1440px] mx-auto pt-8 lg:pt-10">
        <Link
          href="/preorder"
          className="inline-flex items-center gap-1.5 text-[14px] text-[#73726c] hover:text-[#141413] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Return to product
        </Link>
      </header>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="px-5 lg:px-[64px] max-w-[1440px] mx-auto pt-6 lg:pt-10 pb-20 lg:pb-32">

        <div className="flex flex-col lg:flex-row lg:gap-24">
          {/* ── Left: Form ──────────────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[600px]">
            <h1
              className="text-[36px] lg:text-[44px] font-light leading-[1.1] text-[#141413] mb-10 lg:mb-14"
              style={{ fontFamily: "var(--font-lora)", fontStyle: "normal" }}
            >
              Secure Checkout
            </h1>

            <form onSubmit={handleSubmit}>
              {/* ── Step 1: Contact ───────────────────────────────────── */}
              <section className="mb-2">
                {/* Header */}
                <button
                  type="button"
                  onClick={() => { if (step === 2) setStep(1); }}
                  className="w-full flex items-center justify-between py-5 cursor-pointer border-b border-[#e0dcd5]"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[18px] font-medium ${step === 1 ? "text-[#141413]" : "text-[#141413]"}`}>
                      Contact
                    </span>
                    {step === 2 && contactValid && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#141413]">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  {step === 2 && (
                    <span className="text-[13px] text-[#73726c] underline underline-offset-2">
                      Edit
                    </span>
                  )}
                </button>

                {/* Collapsed summary */}
                {step === 2 && contactValid && (
                  <div className="py-4">
                    <p className="text-[14px] text-[#3d3d3a]">{firstName} {lastName}</p>
                    <p className="text-[13px] text-[#73726c]">{email}</p>
                  </div>
                )}

                {/* Expanded */}
                {step === 1 && (
                  <div className="pt-6 pb-8">
                    <div className="flex flex-col gap-6">
                      <div>
                        <label className="block text-[12px] text-[#73726c] mb-1">Email*</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-[12px] text-[#73726c] mb-1">First Name*</label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[12px] text-[#73726c] mb-1">Last Name*</label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { if (contactValid) setStep(2); }}
                      className={`w-full h-[48px] rounded-full text-[15px] font-semibold mt-8 transition-all duration-200 cursor-pointer ${
                        contactValid
                          ? "bg-[#141413] text-white hover:bg-[#2a2a28]"
                          : "bg-[#c8c4bc] text-[#9a958c] cursor-not-allowed"
                      }`}
                      disabled={!contactValid}
                    >
                      Continue to shipping
                    </button>
                  </div>
                )}
              </section>

              {/* ── Step 2: Shipping ──────────────────────────────────── */}
              <section>
                {/* Header */}
                <div
                  className={`py-5 border-b ${step === 2 ? "border-[#e0dcd5]" : "border-[#f0ece6]"}`}
                >
                  <span className={`text-[18px] font-medium ${step === 2 ? "text-[#141413]" : "text-[#c8c4bc]"}`}>
                    Shipping Address
                  </span>
                </div>

                {/* Expanded */}
                {step === 2 && (
                  <div className="pt-6 pb-2">
                    <div className="flex flex-col gap-6">
                      <div>
                        <label className="block text-[12px] text-[#73726c] mb-1">Country*</label>
                        <input
                          type="text"
                          value={country}
                          disabled
                          className={`${inputClass} text-[#141413]`}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#73726c] mb-1">Address*</label>
                        <input
                          type="text"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>

                      {!showApt ? (
                        <button
                          type="button"
                          onClick={() => setShowApt(true)}
                          className="flex items-center gap-1.5 text-[13px] text-[#73726c] hover:text-[#141413] transition-colors cursor-pointer -mt-2"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M7 4.5V9.5M4.5 7H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                          Add Apt #, Suite, Floor
                        </button>
                      ) : (
                        <div>
                          <label className="block text-[12px] text-[#73726c] mb-1">Apt, Suite, Floor</label>
                          <input
                            type="text"
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      )}

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-[12px] text-[#73726c] mb-1">City*</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={inputClass}
                            required
                          />
                        </div>
                        <div className="w-[100px]">
                          <label className="block text-[12px] text-[#73726c] mb-1">State*</label>
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className={selectClass}
                            required
                          >
                            <option value="">—</option>
                            {US_STATES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-[120px]">
                          <label className="block text-[12px] text-[#73726c] mb-1">ZIP*</label>
                          <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className={inputClass}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      type="submit"
                      className={`w-full h-[56px] rounded-full text-[16px] font-semibold mt-10 transition-all duration-200 cursor-pointer ${
                        shippingValid
                          ? "bg-[#141413] text-white hover:bg-[#2a2a28]"
                          : "bg-[#c8c4bc] text-[#9a958c] cursor-not-allowed"
                      }`}
                      disabled={!shippingValid}
                    >
                      Continue to payment&nbsp;&nbsp;&mdash;&nbsp;&nbsp;$29
                    </button>
                    <p className="text-[13px] text-[#73726c] text-center mt-3">
                      You&apos;ll be redirected to Stripe&apos;s secure checkout
                    </p>
                  </div>
                )}
              </section>
            </form>
          </div>

          {/* ── Right: Order Summary ────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[420px] mt-14 lg:mt-0">
            <h2
              className="text-[36px] lg:text-[44px] font-light leading-[1.1] text-[#141413] mb-8 lg:mb-10"
              style={{ fontFamily: "var(--font-lora)", fontStyle: "normal" }}
            >
              Order Summary
            </h2>

            <div className="bg-white rounded-2xl p-6 lg:p-7">
              {/* Product card */}
              <div className="flex gap-4 pb-5 border-b border-[#f0ece6]">
                <div className="w-[72px] h-[72px] rounded-xl bg-[#f0ece6] flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src="/images/ring-product.png"
                    alt="Bless Ring"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[15px] font-medium text-[#141413]">Bless Ring</p>
                  {size && (
                    <p className="text-[13px] text-[#73726c]">Size {size}</p>
                  )}
                  <p className="text-[13px] text-[#73726c]">Early-bird</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex flex-col gap-3 py-5 border-b border-[#f0ece6]">
                <div className="flex justify-between">
                  <div>
                    <span className="text-[14px] text-[#3d3d3a]">Pre-order deposit</span>
                    <p className="text-[12px] text-[#73726c]">Fully refundable</p>
                  </div>
                  <span className="text-[14px] font-semibold text-[#141413]">$29</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="text-[14px] text-[#3d3d3a]">May &mdash; trial ring</span>
                    <p className="text-[12px] text-[#73726c]">Estimated shipping from May 1. Yours to keep.</p>
                  </div>
                  <span className="text-[14px] text-[#b5b0a6]">$0</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="text-[14px] text-[#3d3d3a]">July &mdash; final ring</span>
                    <p className="text-[12px] text-[#73726c]">Only if you decide to keep it</p>
                  </div>
                  <span className="text-[14px] text-[#b5b0a6]">$150</span>
                </div>
              </div>
              <div className="flex justify-between py-4 border-b border-[#f0ece6]">
                <span className="text-[15px] font-medium text-[#141413]">Total</span>
                <span className="text-[15px] font-medium text-[#141413]">$179</span>
              </div>
              <div className="flex justify-between items-baseline py-4">
                <span className="text-[17px] font-semibold text-[#141413]">Due today</span>
                <span className="text-[20px] font-semibold text-[#141413]">$29</span>
              </div>
            </div>

            {/* Trust signal */}
            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-[#e0dcd5]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#73726c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span className="text-[13px] text-[#73726c]">
                Secure payment via Stripe
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Page wrapper ───────────────────────────────────────────────────────── */

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
          <div className="w-6 h-6 border-2 border-[#d4d0c8] border-t-[#141413] rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
