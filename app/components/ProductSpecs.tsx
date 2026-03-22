"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Data ─────────────────────────────────────────────────────────────────────

const FRAMES = [
  "/images/Ring Spinning/1.png",
  "/images/Ring Spinning/2.png",
  "/images/Ring Spinning/3.png",
  "/images/Ring Spinning/4.png",
];

const SPECS = [
  { title: "Private Mic",          desc: "Capture at whisper level. Keep recording for up to 60 mins.",         side: "left"  },
  { title: "Sensors",              desc: "PPG — heart rate, HRV, stress & emotion. Temperature. Accelerometer.", side: "left"  },
  { title: "Light Vibrations",     desc: "Multiple patterns, fully customizable.",                               side: "left"  },
  { title: "Quality Materials",    desc: "Ceramic body with seamless stainless steel interior.",                  side: "right" },
  { title: "Water Proof",          desc: "Water resistant for daily use — shower friendly.",                     side: "right" },
  { title: "Long-lasting Battery", desc: "3–5 days of battery life.",                                           side: "right" },
];

// First frame cut happens alone (earlier). Subsequent cuts are simultaneous with spec.
const STEPS: { frame: number; activeSpec: number }[] = [
  { frame: 0, activeSpec: -1 }, // 1.png — no specs
  { frame: 1, activeSpec: -1 }, // → 2.png alone (early cut, no spec yet)
  { frame: 1, activeSpec:  0 }, // Private Mic
  { frame: 1, activeSpec:  1 }, // Sensors
  { frame: 2, activeSpec:  2 }, // → 3.png + Light Vibrations
  { frame: 2, activeSpec:  3 }, // Quality Materials
  { frame: 3, activeSpec:  4 }, // → 4.png + Water Proof
  { frame: 3, activeSpec:  5 }, // Long-lasting Battery
];

// Label positions (fractions of viewport)
// Elliptical arc around ring center (rx≈22vw, ry≈14vh)
// Angles (CW from top): left specs at 300°/270°/240°, right at 60°/90°/120°
const LABEL_X = [0.31, 0.28, 0.31, 0.69, 0.72, 0.69];
const LABEL_Y = [0.36, 0.50, 0.64, 0.36, 0.50, 0.64];

// ── Scroll constants ──────────────────────────────────────────────────────────

const N_STEPS  = STEPS.length;   // 8
const STEP_VH  = 30;
const INIT_VH  = 5;
const TAIL_VH  = 60;
const TOTAL_VH = 100 + INIT_VH + (N_STEPS - 1) * STEP_VH + TAIL_VH; // 375 vh

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductSpecs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep]   = useState(0);
  const rafRef            = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = containerRef.current;
        if (!el) return;
        const scrolled = -el.getBoundingClientRect().top;
        const vh       = window.innerHeight;
        const initPx   = (INIT_VH / 100) * vh;
        const stepPx   = (STEP_VH  / 100) * vh;
        const s = Math.min(N_STEPS - 1, Math.max(0, Math.floor((scrolled - initPx) / stepPx)));
        setStep(prev => prev !== s ? s : prev);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const { frame, activeSpec } = STEPS[step];

  return (
    <div ref={containerRef} style={{ height: `${TOTAL_VH}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Ring frames — stacked, crossfade ───────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[240px] h-[240px]">
            {FRAMES.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`Bless Ring angle ${i + 1}`}
                fill
                className="object-contain"
                sizes="240px"
                priority={i === 0}
                style={{
                  opacity:    i === frame ? 1 : 0,
                  filter:     i === frame ? "blur(0px)" : "blur(3px)",
                  transform:  i === frame ? "scale(1)" : "scale(0.97)",
                  transition: "opacity 0.4s cubic-bezier(0.25, 0, 0.2, 1), filter 0.4s cubic-bezier(0.25, 0, 0.2, 1), transform 0.4s cubic-bezier(0.25, 0, 0.2, 1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Spec labels — cumulative, one-by-one via scroll steps ──────── */}
        {SPECS.map((spec, i) => {
          const isLeft = i < 3;
          const vis    = i <= activeSpec;
          return (
            <div
              key={spec.title}
              className="absolute pointer-events-none"
              style={{
                left:      `${LABEL_X[i] * 100}%`,
                top:       `${LABEL_Y[i] * 100}%`,
                transform: `translate(${isLeft ? "calc(-100% - 10px)" : "10px"}, -50%)`,
                opacity:    vis ? 1 : 0,
                filter:     vis ? "blur(0px)" : "blur(4px)",
                transition: "opacity 0.7s cubic-bezier(0.25,0,0.2,1), filter 0.7s cubic-bezier(0.25,0,0.2,1)",
                transitionDelay: vis ? "200ms" : "0ms",
              }}
            >
              <div className={`flex flex-col gap-0.5 w-[190px] ${isLeft ? "text-right" : "text-left"}`}>
                <p className="text-[17px] font-medium text-[#141413] leading-tight">{spec.title}</p>
                <p className="text-[13px] font-light text-[#73726c] leading-[1.6]">{spec.desc}</p>
              </div>
            </div>
          );
        })}

        {/* ── Frame progress dots ─────────────────────────────────────────── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
          {FRAMES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width:           i === frame ? 20 : 6,
                height:          6,
                backgroundColor: i === frame ? "#141413" : "#bfb5a7",
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
