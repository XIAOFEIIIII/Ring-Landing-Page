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
  { title: "Private Mic",          desc: "Capture at whisper level. Keep recording for up to 60 mins.",                              side: "left"  },
  { title: "Sensors",              desc: "PPG — heart rate, HRV, stress & emotion. Temperature. Accelerometer.",                     side: "left"  },
  { title: "Light Vibrations",     desc: "Multiple patterns, fully customizable.",                                                    side: "left"  },
  { title: "Quality Materials",    desc: "Ceramic body with seamless stainless steel interior.",                                      side: "right" },
  { title: "Water Proof",          desc: "Water resistant for daily use — shower friendly.",                                          side: "right" },
  { title: "Long-lasting Battery", desc: "3–5 days of battery life.",                                                                side: "right" },
];

// Frame 0–5: one new spec per frame. Frames 6–7: ring keeps spinning, all specs stay.
const FRAME_TO_SPEC = [0, 1, 2, 3, 4, 5, 5, 5];

// Ring surface attachment points (offset from viewport center, ring = 240px container)
const RING_OFFSETS = [
  { dx:  -75, dy:  -55 }, // Private Mic       top-left
  { dx: -100, dy:    0 }, // Sensors           mid-left
  { dx:  -75, dy:   55 }, // Light Vibrations  bot-left
  { dx:   75, dy:  -55 }, // Quality Materials top-right
  { dx:  100, dy:    0 }, // Water Proof       mid-right
  { dx:   75, dy:   55 }, // Long Battery      bot-right
];

// Label anchor positions as fractions of viewport size
const LABEL_X = [0.28, 0.28, 0.28, 0.72, 0.72, 0.72]; // left / right columns
const LABEL_Y = [0.26, 0.50, 0.74, 0.26, 0.50, 0.74]; // top / mid / bottom rows

// ── Scroll constants ──────────────────────────────────────────────────────────

const N_FRAMES = FRAMES.length;  // 8
const STEP_VH  = 30;
const INIT_VH  = 50;
const TAIL_VH  = 60;
const TOTAL_VH = 100 + INIT_VH + (N_FRAMES - 1) * STEP_VH + TAIL_VH; // 420 vh

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

  // Build connection geometry: ring point → knee → label anchor
  const conns = RING_OFFSETS.map((o, i) => {
    const isLeft = i < 3;
    const rx = cx + o.dx;                  // ring attachment x
    const ry = cy + o.dy;                  // ring attachment y
    const lx = vp.w * LABEL_X[i];         // label anchor x
    const ly = vp.h * LABEL_Y[i];         // label anchor y
    // Knee sits just 20px outside the ring attachment — short diagonal, long horizontal
    const kneeX = isLeft ? rx - 20 : rx + 20;
    return { rx, ry, lx, ly, kneeX, isLeft };
  });

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

        {/* ── SVG bent callout lines — cumulative ────────────────────────── */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={vp.w}
          height={vp.h}
          viewBox={`0 0 ${vp.w} ${vp.h}`}
        >
          {conns.map((c, i) => {
            const vis = i <= activeSpec;
            return (
              <g key={i}>
                {/*
                  Bent line: ring point → knee (same y as label) → label anchor
                  pathLength="1" lets us animate with strokeDashoffset 1→0
                */}
                <polyline
                  points={`${c.rx},${c.ry} ${c.kneeX},${c.ly} ${c.lx},${c.ly}`}
                  fill="none"
                  stroke="#141413"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  style={{
                    strokeDasharray:  1,
                    strokeDashoffset: vis ? 0 : 1,
                    transition: "stroke-dashoffset 0.9s cubic-bezier(0.25, 0, 0.2, 1)",
                  }}
                />
                {/* Dot at ring attachment */}
                <circle
                  cx={c.rx} cy={c.ry} r={2.5}
                  fill="#141413"
                  style={{
                    opacity: vis ? 1 : 0,
                    transition: "opacity 0.3s",
                    transitionDelay: vis ? "750ms" : "0ms",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Spec labels — cumulative, at label anchor positions ─────────── */}
        {SPECS.map((spec, i) => {
          const c   = conns[i];
          const vis = i <= activeSpec;
          return (
            <div
              key={spec.title}
              className="absolute pointer-events-none"
              style={{
                left:      `${LABEL_X[i] * 100}%`,
                top:       `${LABEL_Y[i] * 100}%`,
                transform: `translate(${c.isLeft ? "calc(-100% - 10px)" : "10px"}, -50%)`,
                opacity:    vis ? 1 : 0,
                filter:     vis ? "blur(0px)" : "blur(4px)",
                transition: "opacity 0.7s cubic-bezier(0.25,0,0.2,1), filter 0.7s cubic-bezier(0.25,0,0.2,1)",
                transitionDelay: vis ? "700ms" : "0ms",
              }}
            >
              <div className={`flex flex-col gap-0.5 w-[190px] ${c.isLeft ? "text-right" : "text-left"}`}>
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
