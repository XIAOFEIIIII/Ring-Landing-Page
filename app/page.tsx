import Image from "next/image";
import FeatureSections from "./components/FeatureSections";
import DayInLife from "./components/DayInLife";
import ProductSpecs from "./components/ProductSpecs";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ overflowX: "clip" }}>
      {/* ── Hero — mobile ─────────────────────────────────────────────────── */}
      <section className="lg:hidden relative h-screen overflow-hidden bg-[#bfb5a7]">
        <Image
          src="/images/hero-phone.jpg"
          alt="Bless Ring on a surface"
          fill
          className="object-cover object-center hero-image-animate"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Headline — top */}
        <div className="relative z-10 pt-28 px-6 text-center">
          <h1 className="text-[34px] font-light leading-tight text-white hero-animate" style={{ animationDelay: "120ms" }}>
            Catch what your heart whispers{" "}
            <em className="not-italic font-normal" style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
              before it slips away.
            </em>
          </h1>
        </div>

        {/* Body + CTA — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 flex flex-col items-center gap-5 text-center">
          <p className="text-[16px] font-light leading-[1.6] text-white hero-animate max-w-[280px]" style={{ animationDelay: "240ms" }}>
            A prayer companion that keeps you close to God — every day.
          </p>
          <button
            className="flex items-center justify-center h-11 px-4 rounded-full bg-[#141413] text-white text-base font-semibold w-full max-w-[280px] hover:bg-[#2a2a28] transition-colors cursor-pointer hero-animate"
            style={{ animationDelay: "360ms" }}
          >
            Preorder &nbsp;—&nbsp; $29
          </button>
        </div>
      </section>

      {/* ── Hero — desktop ─────────────────────────────────────────────────── */}
      <section className="hidden lg:block relative h-[836px] overflow-hidden bg-[#bfb5a7]">
        <Image
          src="/images/Hero.png"
          alt="Bless Ring on a surface"
          fill
          className="object-cover object-center hero-image-animate"
          priority
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

        <div className="relative z-10 flex flex-col gap-24 h-full pt-40 px-16 max-w-[1512px] mx-auto">
          <div className="flex flex-col gap-6 text-white">
            <h1
              className="text-[68px] font-light leading-tight max-w-[900px] hero-animate"
              style={{ animationDelay: "120ms" }}
            >
              Catch what your heart whispers
              <br />
              <em
                className="not-italic font-normal"
                style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
              >
                before it slips away.
              </em>
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            <p
              className="text-[18px] font-light leading-[1.6] text-white hero-animate max-w-[274px]"
              style={{ animationDelay: "240ms" }}
            >
              A prayer companion that keeps you close to God — every day.
            </p>
            <button
              className="flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-[#141413] text-white text-base font-semibold w-[230px] hover:bg-[#2a2a28] transition-colors cursor-pointer hero-animate"
              style={{ animationDelay: "360ms" }}
            >
              Preorder &nbsp;—&nbsp; $29
            </button>
          </div>
        </div>
      </section>

      {/* ── Core Concept ──────────────────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between px-5 py-16 lg:px-[64px] lg:py-[120px] max-w-[1512px] mx-auto w-full gap-10 lg:gap-0">
        {/* Left — headline */}
        <div className="flex flex-col lg:w-[638px]" data-animate>
          <h2 className="text-[40px] lg:text-[72px] leading-[1.02] text-[#3d3d3a] font-light">
            Ordinary Days,
          </h2>
          <h2 className="text-[40px] lg:text-[72px] leading-[1.02] text-[#3d3d3a] font-light text-right">
            <em style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>Faithfully</em>{" "}Kept
          </h2>
        </div>

        {/* Right — body copy */}
        <div
          className="text-[16px] lg:text-[18px] leading-[1.6] text-[#141413] font-light lg:w-[610px] flex flex-col gap-4"
          data-animate
          style={{ transitionDelay: "120ms" }}
        >
          <p>The spiritual life doesn't announce itself. It arrives in half-awake thoughts, in the car, in a quiet moment that passes before you can hold it.</p>
          <p>Bless Ring was made for that gap — between feeling and forgetting.</p>
          <p>A ring you wear. A practice you return to. A record of how God has been with you, all along.</p>
        </div>
      </section>

      {/* ── Scroll-driven Feature Sections ────────────────────────────────── */}
      <div id="features">
        <FeatureSections />
      </div>

      {/* ── Scroll-driven Product Specs ───────────────────────────────────── */}
      <div id="specs">
        <ProductSpecs />
      </div>

      {/* ── Day in Life ───────────────────────────────────────────────────── */}
      <DayInLife />

      {/* ── Quote ─────────────────────────────────────────────────────────── */}
      <section className="flex items-center justify-center px-5 py-16 lg:px-[64px] lg:py-[120px]">
        <p
          className="text-[16px] lg:text-[18px] font-light leading-[1.6] text-[#141413] text-center w-full max-w-[610px]"
          data-animate
        >
          Someday you'll look back and see the whole story.<br />
          Not just what you asked for —<br />
          but where God was,<br />
          in all the ordinary days.
        </p>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center gap-12 px-5 pt-20 pb-16 lg:px-[64px] lg:pt-[160px] lg:pb-[120px]">
        <div className="flex flex-col items-center gap-5 text-center max-w-[640px]" data-animate>
          <h2 className="text-[36px] lg:text-[64px] font-light leading-[1.05] text-[#141413]">
            Begin your{" "}
            <em style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
              practice.
            </em>
          </h2>
          <p className="text-[16px] lg:text-[18px] font-light leading-[1.6] text-[#3d3d3a]">
            Bless Ring ships early 2025. Reserve yours today and be among the first to wear it.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4" data-animate style={{ transitionDelay: "120ms" }}>
          <button className="flex items-center justify-center h-[52px] px-8 rounded-full bg-[#141413] text-white text-[16px] font-semibold hover:bg-[#2a2a28] transition-colors cursor-pointer">
            Pre-order today&nbsp;—&nbsp;$29
          </button>
          <div className="flex flex-col items-center gap-1.5 text-[13px] text-[#73726c] font-light text-center max-w-[420px]">
            <p>Lock in $179 early-bird pricing (retail: $229) — full refund available before final purchase</p>
            <p>Get another free early-access ring in May and share feedback with the founding team directly</p>
          </div>
        </div>
      </section>

    </main>
  );
}
