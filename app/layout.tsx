import type { Metadata } from "next";
import { Manrope, Lora } from "next/font/google";
import "./globals.css";
import ScrollAnimations from "./components/ScrollAnimations";
import Header from "./components/Header";
import AmbientGlow from "./components/AmbientGlow";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bless Ring — Catch What Your Heart Whispers",
  description:
    "A ring for your prayer life. It captures what you speak, senses how you are, and gently calls you back — every morning, every evening, and in every quiet moment in between.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${lora.variable} antialiased`}
    >
      <body className="min-h-full">
        <AmbientGlow />

        {/* Content sits above glow layer (z:0) via z:1 stacking context */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Header />
          <ScrollAnimations />
          {children}
        </div>
      </body>
    </html>
  );
}
