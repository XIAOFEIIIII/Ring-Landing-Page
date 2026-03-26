"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Slide =
  | { type: "image"; src: string; alt: string; contain?: boolean }
  | { type: "video"; src: string };

const CAROUSEL_SLIDES: Slide[] = [
  { type: "image", src: "/images/ring-product.png", alt: "Bless Ring", contain: true },
  { type: "video", src: "/images/carousel-1.mp4" },
  { type: "video", src: "/images/carousel-2.mp4" },
  { type: "image", src: "/images/carousel-3.jpg", alt: "Bless Ring lifestyle" },
  { type: "image", src: "/images/carousel-4.jpg", alt: "Bless Ring lifestyle" },
  { type: "image", src: "/images/carousel-5.jpg", alt: "Bless Ring lifestyle" },
  { type: "image", src: "/images/carousel-6.jpg", alt: "Bless Ring lifestyle" },
  { type: "image", src: "/images/carousel-7.jpg", alt: "Bless Ring lifestyle" },
];

const RING_SIZES = [7, 8, 9, 10];

const SIZE_GUIDE = [
  { size: 7, circumference: "up to 55 mm", fits: "Women, smaller hands" },
  { size: 8, circumference: "up to 58 mm", fits: "Most women / slender men" },
  { size: 9, circumference: "up to 60 mm", fits: "Most men" },
  { size: 10, circumference: "up to 62 mm", fits: "Men, broader fingers" },
];

function PreorderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromHome = searchParams.get("email") || "";
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sizeHint, setSizeHint] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrentSlide((index + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  // Auto-advance: 4s for images, wait for video to end for videos
  useEffect(() => {
    const slide = CAROUSEL_SLIDES[currentSlide];
    if (slide.type === "video") {
      const video = videoRefs.current[currentSlide];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
        const onEnded = () => goTo(currentSlide + 1);
        video.addEventListener("ended", onEnded);
        return () => video.removeEventListener("ended", onEnded);
      }
    }
    // Pause all videos when not active
    videoRefs.current.forEach((v, i) => {
      if (v && i !== currentSlide) v.pause();
    });
    timerRef.current = setTimeout(() => goTo(currentSlide + 1), 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentSlide, goTo]);

  return (
    <main className="min-h-screen bg-[#faf8f5]" style={{ overflowX: "clip" }}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="px-5 lg:px-[64px] max-w-[1440px] mx-auto pt-8 lg:pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] text-[#73726c] hover:text-[#141413] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Return to home
        </Link>
      </header>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="px-5 lg:px-[64px] max-w-[1440px] mx-auto pt-6 lg:pt-10 pb-20 lg:pb-32">

        <div className="flex flex-col lg:flex-row lg:gap-20 lg:justify-center">
          {/* ── Left: Image carousel + trust signals ───────────────────── */}
          <div className="flex-1 lg:max-w-[520px]">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#f0ece6]">
              {CAROUSEL_SLIDES.map((slide, i) =>
                slide.type === "image" ? (
                  <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className={`transition-opacity duration-700 ease-in-out ${
                      slide.contain ? "object-contain p-8" : "object-cover"
                    } ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
                    priority={i === 0}
                  />
                ) : (
                  <video
                    key={slide.src}
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={slide.src}
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      i === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )
              )}

              {/* Pill nav — bottom right */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1.5">
                <button
                  onClick={() => goTo(currentSlide - 1)}
                  className="w-6 h-6 flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="#141413" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {CAROUSEL_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentSlide ? "w-5 h-[5px] bg-[#141413]" : "w-[5px] h-[5px] bg-[#141413]/25"
                    }`}
                  />
                ))}
                <button
                  onClick={() => goTo(currentSlide + 1)}
                  className="w-6 h-6 flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="#141413" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Trust signals ──────────────────────────────────────────── */}
            <div className="grid grid-cols-3 gap-4 mt-8 mb-8 lg:mb-0">
              <div className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full bg-[#f0ece6] flex items-center justify-center mb-3">
                  {/* Shield with checkmark */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L3 6.5v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12v-5L12 2z"/>
                    <path d="M9 12.5l2 2 4.5-4.5" strokeWidth="1.4"/>
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-[#141413] leading-[1.45]">Fully refundable</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full bg-[#f0ece6] flex items-center justify-center mb-3">
                  {/* Shipping box — free shipping */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-[#141413] leading-[1.45]">Free shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full bg-[#f0ece6] flex items-center justify-center mb-3">
                  {/* Lightning bolt — charger included */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-[#141413] leading-[1.45]">Charger included</span>
              </div>
            </div>
          </div>

          {/* ── Right: Order details ─────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[520px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141413] text-white text-[12px] font-medium tracking-wide mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              EARLY-BIRD PRICING
            </div>

            {/* Product title */}
            <h1
              className="text-[36px] lg:text-[44px] font-light leading-[1.1] text-[#141413] mb-3"
              style={{ fontFamily: "var(--font-lora)", fontStyle: "normal" }}
            >
              Bless Ring
            </h1>
            <p className="text-[16px] font-light leading-[1.7] text-[#3d3d3a] mb-6">
              A gentle companion for prayer, reflection, and spiritual rhythm.
            </p>

            {/* ── Pricing ───────────────────────────────────────────────── */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-[28px] font-medium text-[#141413]">$179</span>
              <span className="text-[17px] text-[#73726c] line-through">$229</span>
              <span className="text-[14px] font-medium text-[#141413] bg-[#e8e4dd] px-2 py-0.5 rounded">
                Save $50
              </span>
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
                    onClick={() => { setSelectedSize(size); setSizeHint(false); }}
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
              <p className="text-[13px] text-[#73726c] leading-[1.6] mt-3">
                Between sizes? Size up for comfort.<br/>Need a different fit? One free exchange included.
              </p>
              {sizeHint && !selectedSize && (
                <p className="text-[13px] text-red-500 mt-2">Please select a size to continue.</p>
              )}
            </div>

            {/* ── How it works timeline ────────────────────────────────── */}
            <div className="mb-10">
              <p className="text-[15px] font-medium text-[#141413] mb-5">How it works</p>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-semibold text-[#141413]">Now</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-medium text-[#141413]">$29 deposit</p>
                    <p className="text-[13px] text-[#73726c]">Fully refundable anytime.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-semibold text-[#141413]">May</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-medium text-[#141413]">Trial ring ships free from May 1</p>
                    <p className="text-[13px] text-[#73726c]">Try before you commit. Keep it either way.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-semibold text-[#141413]">Jul</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-medium text-[#141413]">You decide</p>
                    <p className="text-[13px] text-[#73726c]">Pay $150 for the final ring, or get a full refund.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CTA ───────────────────────────────────────────────────── */}
            <button
              onClick={() => {
                if (!selectedSize) {
                  setSizeHint(true);
                  return;
                }
                router.push(`/preorder/checkout?size=${selectedSize}&email=${encodeURIComponent(emailFromHome)}`);
              }}
              className="w-full h-[56px] rounded-full text-[16px] font-semibold bg-[#141413] text-white hover:bg-[#2a2a28] transition-all duration-200 cursor-pointer"
            >
              Continue&nbsp;&nbsp;&mdash;&nbsp;&nbsp;$29
            </button>

          </div>
        </div>

        {/* ── Features ──────────────────────────────────────────────────── */}
        <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row lg:gap-16 lg:justify-center">
          {/* Left — image */}
          <div className="lg:max-w-[520px] flex-1 mb-8 lg:mb-0">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/feature-water.jpg"
                alt="Bless Ring on hand touching water"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right — description + feature grid */}
          <div className="flex-1 lg:max-w-[520px] flex flex-col justify-center">
            <p className="text-[16px] font-light leading-[1.7] text-[#3d3d3a] mb-8">
              Tap your ring to capture a prayer, a thought, or a moment of gratitude — in your own voice, whenever it comes to you. Throughout the day, Bless Ring gently calls you back with personalized reflections drawn from scripture and your own words. Over time, it learns your rhythm, tracks how you&apos;re feeling, and helps you see how your faith is growing — quietly, naturally, from a ring on your finger.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0ece6] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d3d3a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                </div>
                <span className="text-[14px] font-medium text-[#141413]">Voice Capture</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0ece6] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d3d3a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <span className="text-[14px] font-medium text-[#141413]">Daily Rhythm</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0ece6] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d3d3a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M12 6l2 3h-4l2-3z" fill="#3d3d3a" stroke="none"/>
                  </svg>
                </div>
                <span className="text-[14px] font-medium text-[#141413]">Personalized Devotional</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0ece6] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d3d3a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <span className="text-[14px] font-medium text-[#141413]">Emotion Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0ece6] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d3d3a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <span className="text-[14px] font-medium text-[#141413]">Gentle Reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0ece6] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d3d3a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <span className="text-[14px] font-medium text-[#141413]">Private &amp; Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <div className="mt-16 lg:mt-24 max-w-[720px] mx-auto">
          <h2
            className="text-[24px] lg:text-[28px] font-light text-[#141413] mb-8 text-center"
            style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
          >
            Frequently asked
          </h2>
          <FAQ />
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

            <p className="text-[13px] text-[#73726c] leading-[1.6] mb-6">
              We recommend wearing on your index finger. Already have a ring for that finger? Start there. Otherwise, measure around your knuckle.
            </p>

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

const FAQ_ITEMS = [
  {
    q: "What exactly do I get for $29?",
    a: "Your $29 deposit locks in the early-bird price of $179 (retail $229). In May, we ship you a free trial ring to wear and test. The deposit is fully refundable at any time — no questions asked.",
  },
  {
    q: "What's the difference between the trial ring and the official ring?",
    a: "Same hardware, same sensors. The trial ring is an early unit we send ahead of launch so you can try it before committing.",
  },
  {
    q: "Who can see my recordings?",
    a: "Your audio is stored locally on your device. If you choose to transcribe a recording, it\u2019s encrypted before being sent to our servers, processed, and deleted immediately after \u2014 we never store it in the cloud. No one at Bless Ring has access to your data.",
  },
  {
    q: "How does the ring connect to the app?",
    a: "Via Bluetooth. Open the app, hold the ring near your phone, and follow the steps — takes under two minutes.",
  },
  {
    q: "Is the ring waterproof?",
    a: "The Bless Ring is water-resistant for everyday use — washing hands, showering. Avoid prolonged submersion.",
  },
  {
    q: "What if the size doesn't fit?",
    a: "We offer a one-time free size exchange. Just reach out via our support page.",
  },
  {
    q: "What if I decide not to purchase in July?",
    a: "We'll refund your $29 in full, no questions asked. The trial ring is yours to keep.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className="border-b border-[#e8e4dd]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
          >
            <span className="text-[15px] font-medium text-[#141413] pr-4">{item.q}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
            >
              <path d="M8 3v10M3 8h10" stroke="#73726c" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-[200px] pb-5" : "max-h-0"
            }`}
          >
            <p className="text-[14px] text-[#73726c] leading-[1.6] pr-8">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PreorderPage() {
  return (
    <Suspense>
      <PreorderContent />
    </Suspense>
  );
}

