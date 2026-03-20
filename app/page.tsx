import Image from "next/image";
import FeatureSections from "./components/FeatureSections";
import ProductSpecs from "./components/ProductSpecs";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ overflowX: "clip" }}>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[836px] overflow-hidden bg-[#bfb5a7]">
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
          {/* Headline block */}
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

          {/* CTA block */}
          <div className="flex flex-col gap-6 w-[628px]">
            <p
              className="text-[18px] font-light leading-[1.6] text-white hero-animate"
              style={{ animationDelay: "240ms", width: "274px" }}
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
      <section className="flex items-start justify-between px-[64px] py-[120px] max-w-[1512px] mx-auto w-full">
        {/* Left — headline */}
        <div className="flex flex-col w-[638px]" data-animate>
          <h2 className="text-[72px] leading-[1.02] text-[#3d3d3a] font-light">
            Ordinary Days,
          </h2>
          <h2 className="text-[72px] leading-[1.02] text-[#3d3d3a] font-light text-right">
            <em style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>Faithfully</em>{" "}Kept
          </h2>
        </div>

        {/* Right — body copy */}
        <div
          className="text-[18px] leading-[1.6] text-[#141413] font-light w-[610px] flex flex-col gap-4"
          data-animate
          style={{ transitionDelay: "120ms" }}
        >
          <p>The spiritual life doesn't announce itself. It arrives in half-awake thoughts, in the car, in a quiet moment that passes before you can hold it.</p>
          <p>Bless Ring was made for that gap — between feeling and forgetting.</p>
          <p>A ring you wear. A practice you return to. A record of how God has been with you, all along.</p>
        </div>
      </section>

      {/* ── Scroll-driven Feature Sections ────────────────────────────────── */}
      {/* Must be outside any overflow-hidden ancestor for sticky to work */}
      <FeatureSections />

      {/* ── Scroll-driven Product Specs ───────────────────────────────────── */}
      {/* Must be outside overflow-hidden for sticky to work */}
      <ProductSpecs />

    </main>
  );
}
