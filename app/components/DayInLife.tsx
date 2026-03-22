"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SCENARIOS = [
  {
    time: "7:45 AM",
    label: "Catching a dream",
    photo: "/images/day-in-life/1-photo.jpg",
    appPhone: "/images/day-in-life/1-app-phone.jpg",
    appPhoneW: 1164, appPhoneH: 1192,
    apps:  ["/images/day-in-life/1-app.jpg"],
    photoAlt: "Woman lying in bed, ring on her finger",
    appAlt:   "Journal app showing morning capture",
    text: "Still dark outside.\nDouble-tap and capture your dream before it dissolves.",
  },
  {
    time: "11:15 AM",
    label: "When tension rises",
    photo: "/images/day-in-life/2-photo.jpg",
    appPhone: "/images/day-in-life/2-app-phone.jpg",
    appPhoneW: 1164, appPhoneH: 1424,
    apps:  ["/images/day-in-life/2-app.jpg"],
    photoAlt: "Man pausing, hands folded over laptop",
    appAlt:   "Mood app showing Uneasy state at 11:00",
    text: "The ring pulses.\nIt's noticed something you hadn't named yet.\nSixty seconds.\nA breath.\nA verse.\nYou return.",
  },
  {
    time: "3:00 PM",
    label: "Praying for a friend",
    photo: "/images/day-in-life/3-photo.jpg",
    appPhone: "/images/day-in-life/3-app-phone.jpg",
    appPhoneW: 1160, appPhoneH: 1424,
    apps:  ["/images/day-in-life/3-app.jpg"],
    photoAlt: "Hands with Bless Ring, reaching out",
    appAlt:   "Community prayer feed",
    text: "A request comes in.\nNo need to reply,\nno need to find the right words.\nYou pray.\nThe ring marks it.\nSomewhere, they'll feel it.",
  },
  {
    time: "7:00 PM",
    label: "At Bible study",
    photo: "/images/day-in-life/4-photo.jpg",
    appPhone: "/images/day-in-life/4-app-phone.jpg",
    appPhoneW: 1160, appPhoneH: 836,
    apps:  ["/images/day-in-life/4-app.jpg", "/images/day-in-life/4-app_1.jpg"],
    photoAlt: "Couple reading Bible together",
    appAlt:   "Sermon notes — Ephesians 2:10",
    text: "The ring captures everything.\nYou don't touch your phone.\nYou're there.",
  },
  {
    time: "10:22 PM",
    label: "Evening prayer",
    photo: "/images/day-in-life/5-photo.jpg",
    appPhone: "/images/day-in-life/5-app-phone.jpg",
    appPhoneW: 1608, appPhoneH: 1768,
    apps:  ["/images/day-in-life/5-app.jpg"],
    photoAlt: "Woman scrolling evening devotional on phone",
    appAlt:   "Scripture — Philippians 4:6",
    text: "The ring vibrates, right on time.\nYou pray.\nIt remembers.",
  },
];

// ── Mobile: one row per scenario, no tabs ────────────────────────────────────

function MobileScenarioRow({ scenario }: { scenario: typeof SCENARIOS[0] }) {
  return (
    <div data-animate className="flex flex-col gap-5">
      {/* Row header — larger title */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[13px] text-[#73726c]">{scenario.time}</span>
        <span className="text-[22px] font-light leading-tight text-[#141413]">{scenario.label}</span>
      </div>

      {/* Photo + app-phone card stacked */}
      <div className="flex flex-col">
        {/* Main photo */}
        <div className="relative w-full aspect-square rounded-[16px] overflow-hidden">
          <Image
            src={scenario.photo}
            alt={scenario.photoAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* App-phone card — 2/3 width, negative margin overlaps photo bottom */}
        <div className="self-center w-2/3 relative z-10 rounded-[16px] overflow-hidden -mt-[28%]"
          style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.20)" }}
        >
          <Image
            src={scenario.appPhone}
            alt={scenario.appAlt}
            width={scenario.appPhoneW}
            height={scenario.appPhoneH}
            style={{ width: "100%", height: "auto", display: "block" }}
            sizes="67vw"
          />
        </div>
      </div>

      {/* Text */}
      <p
        className="text-[15px] leading-[1.6] text-[#141413] text-right whitespace-pre-line"
        style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
      >
        {scenario.text}
      </p>
    </div>
  );
}

// ── Desktop: tabbed layout ────────────────────────────────────────────────────

function DesktopDayInLife() {
  const [active, setActive] = useState(0);
  const [appIndex, setAppIndex] = useState(0);
  const scene = SCENARIOS[active];

  useEffect(() => {
    setAppIndex(0);
    if (scene.apps.length <= 1) return;
    const id = setInterval(() => {
      setAppIndex((i) => (i + 1) % scene.apps.length);
    }, 2500);
    return () => clearInterval(id);
  }, [active, scene.apps.length]);

  return (
    <>
      {/* Tab bar */}
      <div className="flex border-b border-black/10 mb-12" data-animate style={{ transitionDelay: "80ms" }}>
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

      {/* 2-col layout: [photo + text below] | [app screenshot] */}
      <div className="flex gap-6 items-start justify-center">

        {/* Left — photo (square) + text below */}
        <div className="w-[480px] shrink-0 flex flex-col gap-6">
          <div className="relative w-full aspect-square rounded-[16px] overflow-hidden" data-animate style={{ transitionDelay: "100ms" }}>
            {SCENARIOS.map((s, i) => (
              <Image
                key={s.photo}
                src={s.photo}
                alt={s.photoAlt}
                fill
                className="object-cover object-center"
                sizes="50vw"
                style={{ opacity: i === active ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}
              />
            ))}
          </div>

          {/* Text below photo */}
          <div
            className="relative text-[18px] leading-[1.6] text-[#141413]"
            data-animate
            style={{ fontFamily: "var(--font-lora)", transitionDelay: "400ms" }}
          >
            {SCENARIOS.map((s, i) => (
              <p
                key={s.label}
                className="absolute inset-0 whitespace-pre-line"
                style={{ opacity: i === active ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}
              >
                {s.text}
              </p>
            ))}
            <p className="invisible pointer-events-none whitespace-pre-line" aria-hidden>
              {SCENARIOS.reduce((a, b) => a.text.length > b.text.length ? a : b).text}
            </p>
          </div>
        </div>

        {/* Right — app screenshot */}
        <div
          className="relative w-[290px] h-[600px] rounded-[16px] overflow-hidden shrink-0"
          data-animate
          style={{ boxShadow: "0px 8px 40px 0px rgba(24,18,18,0.06)", transitionDelay: "250ms" }}
        >
          {scene.apps.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={scene.appAlt}
              fill
              className="object-cover object-top"
              sizes="300px"
              style={{ opacity: i === appIndex ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}
            />
          ))}
        </div>

      </div>
    </>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

export default function DayInLife() {
  return (
    <section className="px-5 pt-16 pb-20 lg:px-[64px] lg:pt-[120px] lg:pb-[160px] max-w-[1512px] mx-auto">

      {/* Title */}
      <div className="mb-12 lg:mb-24" data-animate>
        <h2 className="text-[30px] lg:text-[72px] font-light leading-[1.02] text-[#141413]">
          A Day with{" "}
          <em style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>Bless Ring</em>
        </h2>
      </div>

      {/* Mobile: flat list */}
      <div className="flex flex-col gap-[72px] lg:hidden">
        {SCENARIOS.map((s) => (
          <MobileScenarioRow key={s.label} scenario={s} />
        ))}
      </div>

      {/* Desktop: tabbed */}
      <div className="hidden lg:block">
        <DesktopDayInLife />
      </div>

    </section>
  );
}
