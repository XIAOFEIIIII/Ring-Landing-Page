"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const RING_SIZES = [7, 8, 9, 10];

const SIZE_GUIDE = [
  { size: 7, circumference: "up to 55 mm", fits: "Women, smaller hands" },
  { size: 8, circumference: "up to 58 mm", fits: "Most women / slender men" },
  { size: 9, circumference: "up to 60 mm", fits: "Most men" },
  { size: 10, circumference: "up to 62 mm", fits: "Men, broader fingers" },
];

export default function PreorderPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  return (
    <main
      className="min-h-screen"
      style={{ overflowX: "clip" }}
    >
      {/* ── Minimal header ──────────────────────────────────────────────── */}
      <header className="flex items-center h-[72px] px-5 lg:px-[64px] max-w-[1512px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-[14px] text-[#73726c] hover:text-[#141413] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>
      </header>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="px-5 lg:px-[64px] max-w-[1120px] mx-auto pb-20 lg:pb-32">
        {/* Two-column layout on desktop */}
        <div className="flex flex-col lg:flex-row lg:gap-20">

          {/* ── Left column: Product ────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[520px]">
            {/* Product image */}
            <div className="relative w-full aspect-square max-w-[480px] mx-auto lg:mx-0 mb-8 rounded-2xl overflow-hidden bg-[#f0ece6]">
              <Image
                src="/images/ring-product.png"
                alt="Bless Ring"
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            {/* Trust signals — desktop only */}
            <div className="hidden lg:flex flex-col gap-4 mt-8 pl-1">
              <TrustItem
                icon="shield"
                title="$29 fully refundable"
                desc="Change your mind anytime — full refund, no questions."
              />
              <TrustItem
                icon="truck"
                title="Free trial ring in May"
                desc="Try before you commit. Keep it either way."
              />
              <TrustItem
                icon="lock"
                title="Secure payment via Stripe"
                desc="Your payment details are handled securely."
              />
            </div>
          </div>

          {/* ── Right column: Order details ─────────────────────────────── */}
          <div className="flex-1 lg:max-w-[480px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141413] text-white text-[12px] font-medium tracking-wide mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              EARLY-BIRD PRICING
            </div>

            {/* Product title */}
            <h1 className="text-[32px] lg:text-[40px] font-light leading-tight text-[#141413] mb-2">
              Bless Ring
            </h1>
            <p className="text-[16px] lg:text-[17px] font-light leading-[1.6] text-[#3d3d3a] mb-8">
              A prayer companion that listens when you speak, reflects what you feel, and keeps you close to God — every day.
            </p>

            {/* ── Pricing ───────────────────────────────────────────────── */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-[36px] font-medium text-[#141413]">$179</span>
              <span className="text-[20px] text-[#73726c] line-through">$229</span>
              <span className="text-[14px] font-medium text-[#141413] bg-[#e8e4dd] px-2 py-0.5 rounded">
                Save $50
              </span>
            </div>

            {/* ── How it works ──────────────────────────────────────────── */}
            <div className="border border-[#e0dcd5] rounded-xl p-5 mb-8">
              <p className="text-[14px] font-medium text-[#141413] mb-4">How it works</p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#141413] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] font-semibold text-white">1</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#141413]">Pay $29 deposit &mdash; lock in $179 early-bird price</p>
                    <p className="text-[13px] text-[#73726c] leading-[1.5]">Fully refundable if you change your mind.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#141413] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] font-semibold text-white">2</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#141413]">May &mdash; free trial ring ships to you</p>
                    <p className="text-[13px] text-[#73726c] leading-[1.5]">Wear it, try it, share your feedback with us.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#141413] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] font-semibold text-white">3</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#141413]">July &mdash; you decide</p>
                    <p className="text-[13px] text-[#73726c] leading-[1.5]">Love it? Pay $150 and we ship the final ring. Not for you? Full $29 refund &mdash; keep the trial ring.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Ring size ─────────────────────────────────────────────── */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[14px] font-medium text-[#141413]">
                  Ring size
                </label>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-[13px] text-[#73726c] underline underline-offset-2 hover:text-[#141413] transition-colors cursor-pointer"
                >
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {RING_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[48px] h-[48px] rounded-full border text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? "bg-[#141413] text-white border-[#141413]"
                        : "bg-transparent text-[#3d3d3a] border-[#d4d0c8] hover:border-[#141413]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ── CTA ───────────────────────────────────────────────────── */}
            <button
              onClick={() => {
                router.push(`/preorder/checkout?size=${selectedSize}`);
              }}
              className={`w-full h-[56px] rounded-full text-[16px] font-semibold transition-all duration-200 cursor-pointer ${
                selectedSize
                  ? "bg-[#141413] text-white hover:bg-[#2a2a28]"
                  : "bg-[#d4d0c8] text-[#9a958c] cursor-not-allowed"
              }`}
              disabled={!selectedSize}
            >
              Continue&nbsp;&nbsp;—&nbsp;&nbsp;$29
            </button>

            {/* Trust signals — mobile only */}
            <div className="flex flex-col gap-4 mt-10 lg:hidden">
              <TrustItem
                icon="shield"
                title="$29 fully refundable"
                desc="Change your mind anytime — full refund, no questions."
              />
              <TrustItem
                icon="truck"
                title="Free trial ring in May"
                desc="Try before you commit. Keep it either way."
              />
              <TrustItem
                icon="lock"
                title="Secure payment via Stripe"
                desc="Your payment details are handled securely."
              />
            </div>
          </div>
        </div>
      </div>
      {/* ── Size guide modal ──────────────────────────────────────────── */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          onClick={() => setShowSizeGuide(false)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative bg-[#faf8f5] rounded-2xl p-6 lg:p-8 w-full max-w-[520px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] font-medium text-[#141413]">Size guide</h2>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0ece6] transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="#141413" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[60px_1fr_1fr] gap-x-4 pb-3 border-b border-[#e0dcd5]">
              <span className="text-[13px] font-medium text-[#141413]">Size</span>
              <span className="text-[13px] font-medium text-[#141413]">Knuckle circumference</span>
              <span className="text-[13px] font-medium text-[#141413]">Typically fits</span>
            </div>

            {/* Table rows */}
            {SIZE_GUIDE.map((row) => (
              <div
                key={row.size}
                className="grid grid-cols-[60px_1fr_1fr] gap-x-4 py-3.5 border-b border-[#f0ece6] last:border-b-0"
              >
                <span className="text-[15px] text-[#141413]">{row.size}</span>
                <span className="text-[14px] text-[#3d3d3a]">{row.circumference}</span>
                <span className="text-[14px] text-[#3d3d3a]">{row.fits}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

/* ── Trust signal row ──────────────────────────────────────────────────── */

function TrustItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-full bg-[#f0ece6] flex items-center justify-center shrink-0 mt-0.5">
        {icon === "shield" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#73726c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        )}
        {icon === "lock" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#73726c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        )}
        {icon === "truck" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#73726c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        )}
      </div>
      <div>
        <p className="text-[14px] font-medium text-[#141413]">{title}</p>
        <p className="text-[13px] text-[#73726c] leading-[1.5]">{desc}</p>
      </div>
    </div>
  );
}
