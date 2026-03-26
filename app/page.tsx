import Image from "next/image";
import Link from "next/link";
import FeatureSections from "./components/FeatureSections";
import DayInLife from "./components/DayInLife";
import ProductSpecs from "./components/ProductSpecs";
import HeroCTA from "./components/HeroCTA";

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
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Headline — top */}
        <div className="relative z-10 pt-28 px-6 text-center">
          <h1 className="text-[34px] font-light leading-tight text-white hero-animate" style={{ animationDelay: "120ms" }}>
            Catch what your heart{" "}
            <em className="not-italic font-normal" style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
              Whispers.
            </em>
          </h1>
        </div>

        {/* Body + CTA — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 flex flex-col items-center gap-5 text-center">
          <p className="text-[16px] font-light leading-[1.6] text-white hero-animate max-w-[280px]" style={{ animationDelay: "240ms" }}>
            A prayer companion that keeps you close to God — every day.
          </p>
          <HeroCTA
            className="w-full max-w-[320px] hero-animate"
            style={{ animationDelay: "360ms" }}
          />
        </div>
      </section>

      {/* ── Hero — desktop ─────────────────────────────────────────────────── */}
      <section className="hidden lg:block relative h-screen overflow-hidden bg-[#bfb5a7]">
        <Image
          src="/images/Hero.png"
          alt="Bless Ring on a surface"
          fill
          className="object-cover object-center hero-image-animate"
          priority
          quality={90}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

        <div className="relative z-10 flex flex-col justify-center h-full px-16 max-w-[1512px] mx-auto">
          <div className="flex flex-col gap-8 text-white">
            <h1
              className="text-[68px] font-light leading-tight max-w-[900px] hero-animate"
              style={{ animationDelay: "120ms" }}
            >
              Catch what your heart{" "}
              <em
                className="not-italic font-normal"
                style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
              >
                Whispers.
              </em>
            </h1>
            <p
              className="text-[18px] font-light leading-[1.6] text-white hero-animate max-w-[274px]"
              style={{ animationDelay: "240ms" }}
            >
              A prayer companion that keeps you close to God — every day.
            </p>
            <HeroCTA
              className="w-[400px] hero-animate"
              style={{ animationDelay: "360ms" }}
            />
          </div>
        </div>
      </section>

      {/* ── Core Concept — headline ─────────────────────────────────────── */}
      <section className="flex flex-col items-center px-5 py-16 lg:px-[64px] lg:py-[120px] max-w-[1512px] mx-auto w-full">
        <div className="flex flex-col gap-3 lg:gap-4 items-center" data-animate>
          <h2 className="text-[40px] lg:text-[72px] leading-[1.02] text-[#3d3d3a] font-light text-center">
            Ordinary Days,
          </h2>
          <h2 className="text-[40px] lg:text-[72px] leading-[1.02] text-[#3d3d3a] font-light text-center">
            <em style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>Faithfully</em>{" "}Kept
          </h2>
        </div>
      </section>

      {/* ── Scroll-driven Feature Sections ────────────────────────────────── */}
      <div id="features">
        <FeatureSections />
      </div>

      {/* ── Core Concept — body copy ──────────────────────────────────────── */}
      <section className="flex justify-center px-5 py-16 lg:px-[64px] lg:pt-[160px] lg:pb-[120px] max-w-[1512px] mx-auto w-full">
        <div
          className="text-[20px] lg:text-[24px] leading-[1.6] text-[#141413] font-light max-w-[680px] flex flex-col gap-4 text-center"
          style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
          data-animate
        >
          <p>The spiritual life doesn&apos;t announce itself. It arrives in a half-awake moment, then passes before you can hold it. Bless Ring was made for that gap — between feeling and forgetting.</p>
        </div>
      </section>

      {/* ── Scroll-driven Product Specs ───────────────────────────────────── */}
      <div id="specs">
        <ProductSpecs />
      </div>

      {/* ── Day in Life ───────────────────────────────────────────────────── */}
      <DayInLife />

      {/* ── Quote ─────────────────────────────────────────────────────────── */}
      <section className="flex items-center justify-center px-5 py-16 lg:px-[64px] lg:py-[120px]">
        <p
          className="text-[20px] lg:text-[24px] font-light leading-[1.6] text-[#141413] text-center w-full max-w-[680px]"
          data-animate
          style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
        >
          Someday you'll look back and see the whole story.<br />
          Not just what you asked for —<br />
          but where God was,<br />
          in all the ordinary days.
        </p>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center gap-12 px-5 pt-20 pb-16 lg:px-[64px] lg:pt-[160px] lg:pb-[120px]">
        <h2 className="text-[36px] lg:text-[64px] font-light leading-[1.05] text-[#141413] text-center" data-animate>
          Begin your{" "}
          <em style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
            practice.
          </em>
        </h2>

        <div className="flex flex-col gap-1 text-[16px] lg:text-[18px] font-light leading-[1.6] text-[#3d3d3a] text-center" data-animate style={{ transitionDelay: "80ms" }}>
          <p>$179 early-bird price (retail $229) — fully refundable</p>
          <p>Option to add a second ring in May at the same rate</p>
          <p>Direct access to the founding team</p>
        </div>

        <div className="flex flex-col items-center" data-animate style={{ transitionDelay: "160ms" }}>
          <Link href="/preorder" className="flex items-center justify-center h-[52px] px-8 rounded-full bg-[#141413] text-white text-[16px] font-semibold hover:bg-[#2a2a28] transition-colors cursor-pointer no-underline">
            Preorder today&nbsp;—&nbsp;$29
          </Link>
        </div>
      </section>

    </main>
  );
}
