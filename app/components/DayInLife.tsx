"use client";

import { useState } from "react";
import Image from "next/image";

const SCENARIOS = [
  {
    time: "6:47 AM",
    label: "Before the day begins",
    image: "/images/A day with bless ring/morning.jpg",
    imageAlt: "Half-awake, a thought forming",
    cards: [
      {
        type: "recording",
        title: "Capturing",
        body: "Speak it before it disappears.",
        duration: "0:08",
        note: "Double-tap · Ring glows once",
      },
      {
        type: "transcript",
        title: "Just now",
        lines: [
          "A thought forming,",
          "before the alarm goes off…",
        ],
        note: "Saved automatically",
      },
    ],
  },
  {
    time: "9:15 AM",
    label: "A pause you didn't plan",
    image: "/images/A day with bless ring/mood check.jpg",
    imageAlt: "A quiet moment mid-morning",
    cards: [
      {
        type: "mood",
        title: "Body Signal",
        value: "Tension noticed",
        note: "A stretch you hadn't named yet",
        cta: "60 seconds?",
      },
      {
        type: "prompt",
        title: "A breath. A verse.",
        body: "\"Cast all your anxiety on him because he cares for you.\"",
        note: "1 Peter 5:7",
      },
    ],
  },
  {
    time: "12:30 PM",
    label: "Reading yourself back",
    image: "/images/A day with bless ring/journal.jpg",
    imageAlt: "Lunch alone, reading the app",
    cards: [
      {
        type: "transcript",
        title: "This morning · 6:47 AM",
        lines: [
          "\"I keep thinking about what",
          "forgiveness actually costs…\"",
        ],
        note: "More honest than you expected",
      },
      {
        type: "stat",
        label: "Today",
        value: "3",
        unit: " moments",
        note: "Captured since you woke up",
      },
    ],
  },
  {
    time: "7:00 PM",
    label: "Fully present",
    image: "/images/A day with bless ring/sermon.jpg",
    imageAlt: "Bible study, fully present",
    cards: [
      {
        type: "recording",
        title: "Recording",
        body: "You don't touch your phone. You're fully present for once.",
        duration: "24:11",
        note: "Ring is capturing · Tap to pause",
      },
      {
        type: "transcript",
        title: "Auto-transcribed",
        lines: [
          "\"The Spirit intercedes for us",
          "with groans too deep for words…\"",
        ],
        note: "Romans 8:26 · Saved",
      },
    ],
  },
  {
    time: "10:22 PM",
    label: "The day comes full circle",
    image: "/images/A day with bless ring/evening.jpg",
    imageAlt: "Evening prayer, hands folded",
    cards: [
      {
        type: "notification",
        icon: "☩",
        title: "Evening Prayer",
        body: "The ring vibrates, right on time. You fold your hands.",
        sub: "Gentle pulse · 3 times",
      },
      {
        type: "recording",
        title: "Recording",
        body: "Not because it has to. Because you want to remember.",
        duration: "2:34",
        note: "Saved to tonight",
      },
    ],
  },
];

type Card = {
  type: string;
  icon?: string;
  title?: string;
  label?: string;
  body?: string;
  sub?: string;
  value?: string;
  unit?: string;
  note?: string;
  duration?: string;
  lines?: string[];
  cta?: string;
};

function AppCard({ card }: { card: Card }) {
  const base =
    "rounded-2xl p-6 flex flex-col gap-3 bg-white/70 backdrop-blur-sm shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-black/[0.05]";

  if (card.type === "notification") {
    return (
      <div className={base}>
        <div className="flex items-center gap-2">
          <span className="text-[18px]">{card.icon}</span>
          <span className="text-[13px] font-semibold text-[#141413]">{card.title}</span>
        </div>
        <p className="text-[13px] font-light text-[#3d3d3a] leading-[1.6]">{card.body}</p>
        <p className="text-[11px] text-[#73726c]">{card.sub}</p>
      </div>
    );
  }

  if (card.type === "stat") {
    return (
      <div className={base}>
        <p className="text-[11px] text-[#73726c] uppercase tracking-wider">{card.label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-[44px] font-light leading-none text-[#141413]">{card.value}</span>
          <span className="text-[16px] text-[#3d3d3a] font-light">{card.unit}</span>
        </div>
        <p className="text-[12px] text-[#73726c]">{card.note}</p>
      </div>
    );
  }

  if (card.type === "recording") {
    return (
      <div className={base}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#141413]">{card.title}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[12px] text-[#73726c]">{card.duration}</span>
          </span>
        </div>
        <p className="text-[13px] font-light text-[#3d3d3a] leading-[1.6]">{card.body}</p>
        {/* Waveform decoration */}
        <div className="flex items-center gap-[3px] h-6 my-1">
          {[3,5,8,6,9,5,7,4,8,6,3,7,9,5,6,4,8,5,7,3].map((h, i) => (
            <div key={i} className="w-[3px] rounded-full bg-[#141413]/20" style={{ height: `${h * 2.5}px` }} />
          ))}
        </div>
        <p className="text-[11px] text-[#73726c]">{card.note}</p>
      </div>
    );
  }

  if (card.type === "transcript") {
    return (
      <div className={base}>
        <p className="text-[11px] text-[#73726c] uppercase tracking-wider">{card.title}</p>
        <div className="flex flex-col gap-0.5">
          {(card.lines as string[]).map((l, i) => (
            <p key={i} className="text-[14px] font-light text-[#141413] leading-[1.6] italic" style={{ fontFamily: "var(--font-lora)" }}>{l}</p>
          ))}
        </div>
        <p className="text-[11px] text-[#73726c]">{card.note}</p>
      </div>
    );
  }

  if (card.type === "mood") {
    return (
      <div className={base}>
        <p className="text-[11px] text-[#73726c] uppercase tracking-wider">{card.title}</p>
        <p className="text-[15px] font-medium text-[#141413]">{card.value}</p>
        <p className="text-[12px] text-[#73726c]">{card.note}</p>
        <div className="mt-1 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#141413]/6 w-fit">
          <span className="text-[12px] text-[#3d3d3a]">{card.cta}</span>
        </div>
      </div>
    );
  }

  if (card.type === "prompt") {
    return (
      <div className={`${base} bg-[#141413]/[0.03]`}>
        <p className="text-[11px] text-[#73726c] uppercase tracking-wider">{card.title}</p>
        <p className="text-[15px] font-light text-[#141413] leading-[1.6] italic" style={{ fontFamily: "var(--font-lora)" }}>{card.body}</p>
        <p className="text-[11px] text-[#73726c]">{card.note}</p>
      </div>
    );
  }

  return null;
}

export default function DayInLife() {
  const [active, setActive] = useState(0);
  const scene = SCENARIOS[active];

  return (
    <section className="px-[64px] pt-[120px] pb-[160px] max-w-[1512px] mx-auto">
      {/* Header */}
      <div className="mb-24" data-animate>
        <h2 className="text-[72px] font-light leading-[1.02] text-[#141413]">
          A Day with{" "}
          <em style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>Bless Ring</em>
        </h2>
      </div>

      {/* Tab bar — full width */}
      <div className="flex border-b border-black/10 mb-12">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActive(i)}
            className={`flex flex-col gap-1 pb-5 flex-1 text-center transition-colors duration-200 cursor-pointer ${
              i === active ? "border-b-[1.5px] border-[#141413] -mb-px" : ""
            }`}
          >
            <span className={`text-[13px] transition-colors duration-200 ${i === active ? "text-[#73726c]" : "text-[#73726c]/40"}`}>
              {s.time}
            </span>
            <span className={`text-[16px] font-medium transition-colors duration-200 ${i === active ? "text-[#141413]" : "text-[#73726c]"}`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex gap-10 h-[560px]">
        {/* Photo */}
        <div className="relative w-[560px] shrink-0 rounded-2xl overflow-hidden">
          <Image
            src={scene.image}
            alt={scene.imageAlt}
            fill
            className="object-cover object-center transition-opacity duration-300"
            sizes="560px"
          />
        </div>

        {/* Cards */}
        <div className="flex flex-col justify-center gap-5 flex-1">
          {scene.cards.map((card, i) => (
            <AppCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
