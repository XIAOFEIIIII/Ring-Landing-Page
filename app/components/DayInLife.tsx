"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SCENARIOS = [
  {
    time: "7:45 AM",
    label: "Catching a dream",
    photo: "/images/day-in-life/1-photo.jpg",
    apps:  ["/images/day-in-life/1-app.jpg"],
    photoAlt: "Woman lying in bed, ring on her finger",
    appAlt:   "Journal app showing morning capture",
    text: "Still dark outside.\nDouble-tap and capture your dream before it dissolves.",
  },
  {
    time: "11:15 AM",
    label: "When tension rises",
    photo: "/images/day-in-life/2-photo.jpg",
    apps:  ["/images/day-in-life/2-app.jpg"],
    photoAlt: "Man pausing, hands folded over laptop",
    appAlt:   "Mood app showing Uneasy state at 11:00",
    text: "The ring pulses.\nIt's noticed something you hadn't named yet.\nSixty seconds.\nA breath.\nA verse.\nYou return.",
  },
  {
    time: "3:00 PM",
    label: "Praying for a friend",
    photo: "/images/day-in-life/3-photo.jpg",
    apps:  ["/images/day-in-life/3-app.jpg"],
    photoAlt: "Hands with Bless Ring, reaching out",
    appAlt:   "Community prayer feed",
    text: "A request comes in.\nNo need to reply,\nno need to find the right words.\nYou pray.\nThe ring marks it.\nSomewhere, they'll feel it.",
  },
  {
    time: "7:00 PM",
    label: "At Bible study",
    photo: "/images/day-in-life/4-photo.jpg",
    apps:  ["/images/day-in-life/4-app.jpg", "/images/day-in-life/4-app_1.jpg"],
    photoAlt: "Couple reading Bible together",
    appAlt:   "Sermon notes — Ephesians 2:10",
    text: "The ring captures everything.\nYou don't touch your phone.\nYou're there.",
  },
  {
    time: "10:22 PM",
    label: "Evening prayer",
    photo: "/images/day-in-life/5-photo.jpg",
    apps:  ["/images/day-in-life/5-app.jpg"],
    photoAlt: "Woman scrolling evening devotional on phone",
    appAlt:   "Scripture — Philippians 4:6",
    text: "The ring vibrates, right on time.\nYou pray.\nIt remembers.",
  },
];

export default function DayInLife() {
  const [active, setActive] = useState(0);
  const [appIndex, setAppIndex] = useState(0);
  const scene = SCENARIOS[active];

  // Cycle through multiple app images when the active scenario has more than one
  useEffect(() => {
    setAppIndex(0);
    if (scene.apps.length <= 1) return;
    const id = setInterval(() => {
      setAppIndex((i) => (i + 1) % scene.apps.length);
    }, 2500);
    return () => clearInterval(id);
  }, [active, scene.apps.length]);

  return (
    <section className="px-[64px] pt-[120px] pb-[160px] max-w-[1512px] mx-auto">
      {/* Title */}
      <div className="mb-24" data-animate>
        <h2 className="text-[72px] font-light leading-[1.02] text-[#141413]">
          A Day with{" "}
          <em style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>Bless Ring</em>
        </h2>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-black/10 mb-12">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActive(i)}
            className={`flex flex-col gap-1 pb-5 flex-1 text-center cursor-pointer transition-colors duration-200 ${
              i === active ? "border-b-[1.5px] border-[#141413] -mb-px" : ""
            }`}
          >
            <span className={`text-[13px] transition-colors duration-200 ${
              i === active ? "text-[#73726c]" : "text-[#73726c]/40"
            }`}>
              {s.time}
            </span>
            <span className={`text-[16px] font-medium transition-colors duration-200 ${
              i === active ? "text-[#141413]" : "text-[#73726c]"
            }`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content: photo (fill) | phone (center, fixed) | text card (fill) */}
      <div className="flex gap-[40px] items-center">

        {/* Left — lifestyle photo, same width as text card, square */}
        <div className="flex-1 relative aspect-square rounded-[16px] overflow-hidden">
          {SCENARIOS.map((s, i) => (
            <Image
              key={s.photo}
              src={s.photo}
              alt={s.photoAlt}
              fill
              className="object-cover object-center"
              sizes="50vw"
              style={{
                opacity: i === active ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            />
          ))}
        </div>

        {/* Center — phone mockup, fixed width */}
        <div
          className="relative shrink-0 w-[290px] h-[600px] rounded-[36px] overflow-hidden"
          style={{ boxShadow: "0px 8px 40px 0px rgba(24,18,18,0.06)" }}
        >
          {scene.apps.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={scene.appAlt}
              fill
              className="object-cover object-top"
              sizes="300px"
              style={{
                opacity: i === appIndex ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            />
          ))}
        </div>

        {/* Right — text card, fills remaining space */}
        <div
          className="flex-1 relative h-[540px] rounded-[16px] flex items-center justify-center p-[40px]"
          style={{ border: "1px solid rgba(31,30,29,0.15)" }}
        >
          {SCENARIOS.map((s, i) => (
            <p
              key={s.label}
              className="absolute inset-[40px] flex items-center justify-center text-center text-[24px] leading-[1.6] text-[#141413]"
              style={{
                fontFamily:    "var(--font-lora)",
                fontStyle:     "italic",
                whiteSpace:    "pre-line",
                opacity:       i === active ? 1 : 0,
                transition:    "opacity 0.8s ease-in-out",
              }}
            >
              {s.text}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
}
