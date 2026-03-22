"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Data ─────────────────────────────────────────────────────────────────────

const FRAMES = [
  "/images/Ring Spinning/1.png",                // 0 — intro
  "/images/Ring Spinning/touch to interact.png", // 1
  "/images/Ring Spinning/mic.png",               // 2
  "/images/Ring Spinning/sensors.png",           // 3
  "/images/Ring Spinning/Vibration.png",         // 4
  "/images/Ring Spinning/Battery.png",           // 5
  "/images/Ring Spinning/Material.png",          // 6
  "/images/Ring Spinning/waterproof.png",        // 7
];

// 3 left, 4 right
const SPECS = [
  { title: "Touch to Activate", desc: "Double-tap or press to begin capturing.",                                  side: "left"  },
  { title: "Private Mic",       desc: "Capture at whisper level. Keep recording for up to 60 mins.",             side: "left"  },
  { title: "Sensors",           desc: "PPG — heart rate, HRV, stress & emotion. Temperature. Accelerometer.",    side: "left"  },
  { title: "Light Vibrations",  desc: "Multiple patterns, fully customizable.",                                   side: "right" },
  { title: "Long-lasting Battery", desc: "3–5 days of battery life.",                                            side: "right" },
  { title: "Quality Materials", desc: "Ceramic body with seamless stainless steel interior.",                     side: "right" },
  { title: "Water Proof",       desc: "Water resistant for daily use — shower friendly.",                        side: "right" },
];

// Each step: ring crossfades to feature image + spec appears simultaneously
const STEPS: { frame: number; activeSpec: number }[] = [
  { frame: 0, activeSpec: -1 }, // intro — 1.png, no specs
  { frame: 1, activeSpec:  0 }, // touch to interact + Touch to Activate
  { frame: 2, activeSpec:  1 }, // mic + Private Mic
  { frame: 3, activeSpec:  2 }, // sensors + Sensors
  { frame: 4, activeSpec:  3 }, // Vibration + Light Vibrations
  { frame: 5, activeSpec:  4 }, // Battery + Long-lasting Battery
  { frame: 6, activeSpec:  5 }, // Material + Quality Materials
  { frame: 7, activeSpec:  6 }, // waterproof + Water Proof
];

// Elliptical arc positions — 3 left, 4 right
// isLeft = index < 3
const LABEL_X = [0.31, 0.27, 0.31,  0.69, 0.73, 0.73, 0.69];
const LABEL_Y = [0.34, 0.50, 0.66,  0.28, 0.42, 0.58, 0.72];

// ── Scroll constants ──────────────────────────────────────────────────────────

const N_STEPS  = STEPS.length;   // 8
const STEP_VH  = 30;
const INIT_VH  = 5;
const TAIL_VH  = 60;
const TOTAL_VH = 100 + INIT_VH + (N_STEPS - 1) * STEP_VH + TAIL_VH; // 375 vh

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductSpecs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const rafRef          = useRef<number | null>(null);

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
                alt={`Bless Ring — ${SPECS[i - 1]?.title ?? "intro"}`}
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

        {/* ── Spec labels — cumulative ────────────────────────────────────── */}
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
