"use client";

import { useEffect, useRef } from "react";

// Each blob drifts at a different speed (fraction of scroll)
const BLOBS = [
  {
    // Warm amber — right, starts mid-low
    style: {
      width: "800px", height: "800px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,183,77,0.28) 0%, transparent 70%)",
      filter: "blur(60px)",
      right: "-200px", top: "40%",
    },
    speed: -0.06,
  },
  {
    // Muted gold — left, starts lower
    style: {
      width: "700px", height: "700px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(238,192,80,0.22) 0%, transparent 70%)",
      filter: "blur(70px)",
      left: "-150px", top: "60%",
    },
    speed: -0.05,
  },
];

export default function AmbientGlow() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const y = window.scrollY;
        refs.current.forEach((el, i) => {
          if (!el) return;
          el.style.transform = `translateY(${y * BLOBS[i].speed}px)`;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        pointerEvents: "none", overflow: "hidden",
      }}
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          style={{ position: "absolute", ...blob.style }}
        />
      ))}
    </div>
  );
}
