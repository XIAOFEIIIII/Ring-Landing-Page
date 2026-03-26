"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroCTA({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    router.push(`/preorder?email=${encodeURIComponent(email)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`} style={style}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="h-11 flex-1 px-4 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-[15px] text-white placeholder:text-white/50 outline-none focus:border-white/60 transition-colors"
      />
      <button
        type="submit"
        className="h-11 px-5 rounded-full bg-[#141413] text-white text-[15px] font-semibold hover:bg-[#2a2a28] transition-colors cursor-pointer whitespace-nowrap"
      >
        Preorder&nbsp;&mdash;&nbsp;$29
      </button>
    </form>
  );
}
