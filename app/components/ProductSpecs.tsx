"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SPECS = [
  { title: "Private Mic",        desc: "Capture at whisper level. Can keep recording for up to 40 mins",                                                    side: "left"  },
  { title: "Light Vibrations",   desc: "With multiple patterns customizable",                                                                                side: "left"  },
  { title: "Sensors",            desc: "PPG measures heart rate and HRV, temperature trends, and movement",                                                  side: "left"  },
  { title: "Quality Materials",  desc: "Ceramic body with seamless stainless steel interior",                                                                side: "right" },
  { title: "Water Proof",        desc: "Water resistant up to 100m / 328 ft",                                                                               side: "right" },
  { title: "Long-lasting Battery", desc: "3–5 days of battery life. Typically charges in 30 min",                                                           side: "right" },
];

// Pixel offsets from ring center — ring lives in a fixed 440×433 container
const OFFSETS = [
  { dx: -128, dy: -118 }, // Private Mic      top-left
  { dx: -175, dy:    0 }, // Light Vibrations  mid-left
  { dx: -128, dy:  118 }, // Emotion Sensing   bot-left
  { dx:  128, dy: -118 }, // Ceramic Body      top-right
  { dx:  175, dy:    0 }, // Water Proof       mid-right
  { dx:  128, dy:  118 }, // Powerful Battery  bot-right
];

// Label line-end X as a fraction of viewport width
const LX_FRAC = [0.26, 0.26, 0.26, 0.74, 0.74, 0.74];

const STEP_VH  = 50;
const INIT_VH  = 20;
const N        = SPECS.length;
const TOTAL_VH = 100 + INIT_VH + (N - 1) * STEP_VH; // ~370 vh

export default function ProductSpecs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [vp, setVp]         = useState({ w: 1512, h: 860 });
  const rafRef              = useRef<number | null>(null);

  // Keep viewport dimensions accurate for SVG coordinate math
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Scroll → which features are revealed
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = containerRef.current;
        if (!el) return;
        const scrolled = -el.getBoundingClientRect().top;
        const vh       = window.innerHeight;
        const initPx   = (INIT_VH * vh) / 100;
        const stepPx   = (STEP_VH  * vh) / 100;
        const n = Math.min(N, Math.max(0, Math.floor((scrolled - initPx) / stepPx) + 1));
        setActive(prev => prev !== n ? n : prev);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Build connection-point coordinates from live viewport size
  const cx = vp.w / 2;
  const cy = vp.h / 2;
  const conns = OFFSETS.map((o, i) => ({
    rx: cx + o.dx,
    ry: cy + o.dy,
    lx: vp.w * LX_FRAC[i],
    ly: cy + o.dy, // horizontal line → same Y as ring point
  }));

  return (
    <div ref={containerRef} style={{ height: `${TOTAL_VH}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Ring — centered ──────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[440px] h-[433px]">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: "rotate(-48.08deg)" }}
            >
              <div className="relative w-[265px] h-[353px]">
                <Image
                  src="/images/ring-product.png"
                  alt="Bless Ring"
                  fill
                  className="object-contain"
                  sizes="265px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── SVG callout lines ─────────────────────────────────────────────── */}
        {/* viewBox matches live viewport so pixel coords align perfectly */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={vp.w}
          height={vp.h}
          viewBox={`0 0 ${vp.w} ${vp.h}`}
        >
          {conns.map((c, i) => {
            const vis = i < active;
            const len = Math.abs(c.lx - c.rx);
            return (
              <g key={i}>
                {/* Line draws from ring outward as dashoffset: len → 0 */}
                <line
                  x1={c.rx} y1={c.ry}
                  x2={c.lx} y2={c.ly}
                  stroke="#141413"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: len,
                    strokeDashoffset: vis ? 0 : len,
                    transition: "stroke-dashoffset 0.9s cubic-bezier(0.25, 0, 0.2, 1)",
                  }}
                />
                {/* Small dot at ring attachment point */}
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

        {/* ── Feature labels ────────────────────────────────────────────────── */}
        {SPECS.map((spec, i) => {
          const c      = conns[i];
          const vis    = i < active;
          const isLeft = spec.side === "left";
          return (
            <div
              key={spec.title}
              className="absolute pointer-events-none"
              style={{
                left:      `${(c.lx / vp.w) * 100}%`,
                top:       `${(c.ly / vp.h) * 100}%`,
                transform: `translate(${isLeft ? "calc(-100% - 14px)" : "14px"}, -50%)`,
                opacity:   vis ? 1 : 0,
                filter:    vis ? "blur(0px)" : "blur(4px)",
                transition: "opacity 0.65s cubic-bezier(0.25,0,0.2,1), filter 0.65s cubic-bezier(0.25,0,0.2,1)",
                transitionDelay: vis ? "700ms" : "0ms",
              }}
            >
              <div className={`flex flex-col gap-0.5 w-[190px] ${isLeft ? "text-right" : "text-left"}`}>
                <p className="text-[17px] font-medium text-[#141413] leading-tight">{spec.title}</p>
                <p className="text-[13px] font-light text-[#73726c] leading-[1.6]">{spec.desc}</p>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
