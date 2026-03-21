"use client";

import { useState } from "react";
import Image from "next/image";

const SCENARIOS = [
  {
    time: "6:47 AM",
    label: "Before the day begins",
    photo: "/images/day-in-life/1-photo.jpg",
    app:   "/images/day-in-life/1-app.jpg",
    photoAlt: "Woman lying in bed, ring on her finger",
    appAlt:   "Journal app showing morning capture",
  },
  {
    time: "11:15 AM",
    label: "A pause you didn't plan",
    photo: "/images/day-in-life/2-photo.jpg",
    app:   "/images/day-in-life/2-app.jpg",
    photoAlt: "Man pausing, hands folded over laptop",
    appAlt:   "Mood app showing Uneasy state at 11:00",
  },
  {
    time: "12:30 PM",
    label: "Someone needed prayer",
    photo: "/images/day-in-life/3-photo.jpg",
    app:   "/images/day-in-life/3-app.jpg",
    photoAlt: "Hands with Bless Ring, reaching out",
    appAlt:   "Community prayer feed",
  },
  {
    time: "7:00 PM",
    label: "Fully present",
    photo: "/images/day-in-life/4-photo.jpg",
    app:   "/images/day-in-life/4-app.jpg",
    photoAlt: "Couple reading Bible together",
    appAlt:   "Sermon notes — Ephesians 2:10",
  },
  {
    time: "10:22 PM",
    label: "The day comes full circle",
    photo: "/images/day-in-life/5-photo.jpg",
    app:   "/images/day-in-life/5-app.jpg",
    photoAlt: "Woman scrolling evening devotional on phone",
    appAlt:   "Scripture — Philippians 4:6",
  },
];

export default function DayInLife() {
  const [active, setActive] = useState(0);
  const scene = SCENARIOS[active];

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

      {/* Content: photo left + phone mockup right */}
      <div className="flex gap-[60px] items-start">
        {/* Left — lifestyle photo, 620×620 */}
        <div className="relative shrink-0 w-[620px] h-[620px] rounded-[16px] overflow-hidden">
          <Image
            key={scene.photo}
            src={scene.photo}
            alt={scene.photoAlt}
            fill
            className="object-cover object-center"
            sizes="620px"
          />
        </div>

        {/* Right — phone mockup, 300×620 */}
        <div
          className="relative shrink-0 w-[300px] h-[620px] rounded-[36px] overflow-hidden"
          style={{ boxShadow: "0px 0px 10px 0px rgba(24,18,18,0.08)" }}
        >
          <Image
            key={scene.app}
            src={scene.app}
            alt={scene.appAlt}
            fill
            className="object-cover object-top"
            sizes="300px"
          />
        </div>
      </div>
    </section>
  );
}
