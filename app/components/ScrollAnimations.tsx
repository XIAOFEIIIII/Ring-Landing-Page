"use client";

import { useEffect } from "react";

// Watches all [data-animate] elements and adds .is-visible when they enter
// the viewport. Animation styles live in globals.css.
export default function ScrollAnimations() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay ?? "0";
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );

    // One RAF ensures the browser has painted the initial opacity:0 state
    // before the observer fires, preventing a "jump to visible" flash.
    requestAnimationFrame(() => {
      els.forEach((el) => observer.observe(el));
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
