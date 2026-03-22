"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Data ─────────────────────────────────────────────────────────────────────

const FRAMES = [
  "/images/Ring Spinning/1.png",
  "/images/Ring Spinning/2.png",
  "/images/Ring Spinning/3.png",
  "/images/Ring Spinning/4.png",
  "/images/Ring Spinning/5.png",
  "/images/Ring Spinning/6.png",
  "/images/Ring Spinning/7.png",
  "/images/Ring Spinning/8.png",
];

const SPECS = [
  { title: "Private Mic",          desc: "Capture at whisper level. Keep recording for up to 60 mins.",                                    side: "left"  },
  { title: "Sensors",              desc: "PPG — heart rate, HRV, stress & emotion. Temperature trends. Accelerometer for movement.",        side: "left"  },
  { title: "Light Vibrations",     desc: "Multiple patterns, fully customizable.",                                                           side: "left"  },
  { title: "Quality Materials",    desc: "Ceramic body with seamless stainless steel interior.",                                             side: "right" },
  { title: "Water Proof",          desc: "Water resistant for daily use — shower friendly.",                                                 side: "right" },
  { title: "Long-lasting Battery", desc: "3–5 days of battery life.",                                                                       side: "right" },
];

// Each of the 8 frames maps to one spec index.
// Specs 0 and 3 get two frames; the rest get one.
const FRAME_TO_SPEC = [0, 0, 1, 2, 3, 3, 4, 5];

// Callout line anchor offsets from ring center (ring container is 480×480)
const OFFSETS = [
  { dx: -128, dy: -118 }, // Private Mic       top-left
  { dx: -175, dy:    0 }, // Sensors           mid-left
  { dx: -128, dy:  118 }, // Light Vibrations  bot-left
  { dx:  128, dy: -118 }, // Quality Materials top-right
  { dx:  175, dy:    0 }, // Water Proof       mid-right
  { dx:  128, dy:  118 }, // Long Battery      bot-right
];

const LX_FRAC = [0.24, 0.24, 0.24, 0.76, 0.76, 0.76];

// ── Scroll constants ──────────────────────────────────────────────────────────

const N_FRAMES = FRAMES.length;   // 8
const STEP_VH  = 30;
const INIT_VH  = 10;
const TAIL_VH  = 60;              // dwell after last frame
const TOTAL_VH = 100 + INIT_VH + (N_FRAMES - 1) * STEP_VH + TAIL_VH; // 380 vh

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductSpecs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [vp, setVp]       = useState({ w: 1512, h: 860 });
  const rafRef            = useRef<number | null>(null);

  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
        const f = Math.min(N_FRAMES - 1, Math.max(0, Math.floor((scrolled - initPx) / stepPx)));
        setFrame(prev => prev !== f ? f : prev);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activeSpec = FRAME_TO_SPEC[frame];

  const cx = vp.w / 2;
  const cy = vp.h / 2;
  const conns = OFFSETS.map((o, i) => ({
    rx: cx + o.dx,
    ry: cy + o.dy,
    lx: vp.w * LX_FRAC[i],
    ly: cy + o.dy,
  }));

  return (
    <div ref={containerRef} style={{ height: `${TOTAL_VH}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Ring frames — stacked, crossfade ───────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[480px] h-[480px]">
            {FRAMES.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`Bless Ring angle ${i + 1}`}
                fill
                className="object-contain"
                sizes="480px"
                priority={i === 0}
                style={{
                  opacity:    i === frame ? 1 : 0,
                  transition: "opacity 0.7s cubic-bezier(0.25, 0, 0.2, 1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── SVG callout lines — only the active spec ───────────────────── */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={vp.w}
          height={vp.h}
          viewBox={`0 0 ${vp.w} ${vp.h}`}
        >
          {conns.map((c, i) => {
            const vis = i === activeSpec;
            const len = Math.abs(c.lx - c.rx);
            return (
              <g key={i}>
                <line
                  x1={c.rx} y1={c.ry}
                  x2={c.lx} y2={c.ly}
                  stroke="#141413"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray:  len,
                    strokeDashoffset: vis ? 0 : len,
                    transition: "stroke-dashoffset 0.7s cubic-bezier(0.25, 0, 0.2, 1)",
                  }}
                />
                <circle
                  cx={c.rx} cy={c.ry} r={2.5}
                  fill="#141413"
                  style={{
                    opacity: vis ? 1 : 0,
                    transition: "opacity 0.3s",
                    transitionDelay: vis ? "600ms" : "0ms",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Spec labels — only active spec visible ──────────────────────── */}
        {SPECS.map((spec, i) => {
          const c      = conns[i];
          const vis    = i === activeSpec;
          const isLeft = spec.side === "left";
          return (
            <div
              key={spec.title}
              className="absolute pointer-events-none"
              style={{
                left:      `${(c.lx / vp.w) * 100}%`,
                top:       `${(c.ly / vp.h) * 100}%`,
                transform: `translate(${isLeft ? "calc(-100% - 14px)" : "14px"}, -50%)`,
                opacity:    vis ? 1 : 0,
                filter:     vis ? "blur(0px)" : "blur(4px)",
                transition: "opacity 0.6s cubic-bezier(0.25,0,0.2,1), filter 0.6s cubic-bezier(0.25,0,0.2,1)",
                transitionDelay: vis ? "600ms" : "0ms",
              }}
            >
              <div className={`flex flex-col gap-0.5 w-[200px] ${isLeft ? "text-right" : "text-left"}`}>
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
