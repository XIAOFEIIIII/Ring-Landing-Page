"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled]   = useState(false); // past ~40px → frosted bg
  const [pastHero, setPastHero]   = useState(false); // past hero → show preorder

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setPastHero(y > 780); // hero is 836px; reveal button just before exit
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(250, 248, 245, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="flex items-center justify-between h-[72px] px-[64px] max-w-[1512px] mx-auto">
        {/* Wordmark */}
        <span
          className={`text-[17px] font-medium tracking-wide transition-colors duration-500 ${
            scrolled ? "text-[#141413]" : "text-white"
          }`}
        >
          Bless Ring
        </span>

        {/* Preorder — only visible after scrolling past the hero */}
        <button
          className={`flex items-center justify-center h-[38px] px-5 rounded-full text-[14px] font-semibold bg-[#141413] text-white hover:bg-[#2a2a28] transition-all duration-500 cursor-pointer ${
            pastHero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-6px] pointer-events-none"
          }`}
        >
          Preorder&nbsp;—&nbsp;$29
        </button>
      </div>
    </header>
  );
}
