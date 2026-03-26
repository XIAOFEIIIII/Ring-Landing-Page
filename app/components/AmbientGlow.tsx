"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Each blob drifts at a different speed (fraction of scroll)
const BLOBS = [
  {
    // Warm amber — right, starts mid-low
    style: {
      width: "800px", height: "800px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,183,77,0.28) 0%, transparent 70%)",
      filter: "blur(60px)",
      right: "-200px", top: "55%",
    },
    speed: -0.18,
  },
  {
    // Muted gold — left, starts mid
    style: {
      width: "700px", height: "700px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(238,192,80,0.22) 0%, transparent 70%)",
      filter: "blur(70px)",
      left: "-150px", top: "75%",
    },
    speed: -0.14,
  },
];

export default function AmbientGlow() {
  const pathname = usePathname();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const hidden = pathname.startsWith("/preorder");

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

  if (hidden) return null;

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
