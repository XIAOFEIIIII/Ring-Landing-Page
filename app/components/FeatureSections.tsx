"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STEPS = [
  {
    title: "Be Called",
    description:
      "Morning. Evening. The ring stirs against your finger —\nA gentle call back to the one thing that matters, like a church bell cutting through the noise.",
    image: "/images/feature-becalled.jpg",
    alt: "Woman praying with Bless Ring on her finger",
  },
  {
    title: "Capture",
    description:
      "Double tap — and speak.\nA prayer, a worry, a burst of gratitude, a fragment of a dream — the ring listens.",
    image: "/images/feature-capture.jpg",
    alt: "Man double-tapping Bless Ring to capture a prayer",
  },
  {
    title: "Be Seen",
    description:
      "The ring reads your body's quiet signals — tension, fatigue, calm, rest. Over time, you'll see not just what you prayed, but what you carried.",
    image: "/images/feature-beseen.jpg",
    alt: "Phone showing Bless Ring app with mood and health insights",
  },
];

// Parallax strength — fraction of (card-center − viewport-center) applied as translateY
const PARALLAX = 0.10;

export default function FeatureSections() {
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef      = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      imgWrapRefs.current.forEach((wrap) => {
        if (!wrap) return;
        const card   = wrap.parentElement!;
        const rect   = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        // Positive offset → image shifts down (shows top crop) when card is below center
        // Negative offset → image shifts up (shows bottom crop) when card is above center
        const offset = (vh / 2 - center) * PARALLAX;
        wrap.style.transform = `translateY(${offset}px)`;
      });
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // set initial position
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section>
      {/* ── Photos row ───────────────────────────────────────────────────── */}
      <div className="flex gap-[40px] px-[64px] pt-[40px] pb-0">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="flex-1 relative h-[580px] rounded-[20px] overflow-hidden"
            data-animate
            data-delay={i * 120}
          >
            {/*
              Image wrapper is 20% taller than the card (10% bleed top + 10% bottom).
              The parallax shifts it up/down within that extra room.
            */}
            <div
              ref={(el) => { imgWrapRefs.current[i] = el; }}
              className="absolute inset-x-0 will-change-transform"
              style={{ top: "-10%", bottom: "-10%" }}
            >
              <Image
                src={step.image}
                alt={step.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1512px) 33vw, 475px"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Text row ─────────────────────────────────────────────────────── */}
      <div className="flex gap-[40px] px-[64px] pt-[24px] pb-[60px]">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="flex-1 flex flex-col gap-[16px]"
            data-animate
            data-delay={i * 120 + 180}
          >
            <p className="text-[24px] leading-normal text-[#141413]">
              {step.title}
            </p>
            <p className="text-[16px] leading-[24px] text-[#141413] font-light whitespace-pre-line">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
