# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
```

No lint or test scripts are configured.

## Architecture

Single-page marketing site for the "Bless Ring" product built with **Next.js 16** (App Router) + **Tailwind CSS v4** + TypeScript. No routing — one page, extracted into focused components.

**Figma source** — node `3756-10902` in `figma.com/design/aomYtGjkvHy9Q3OeG2cf7W`. Sizing is pixel-exact to match the Figma design.

```
app/
  layout.tsx                  # Root layout: Manrope + Lora fonts, AmbientGlow, Header, ScrollAnimations
  globals.css                 # Tailwind v4 import, CSS vars, keyframe animations, [data-animate] system
  page.tsx                    # Page shell — composes section markup + imported components
  components/
    Header.tsx                # Fixed nav bar
    AmbientGlow.tsx           # Animated background gradient blobs (fixed, z:0)
    ScrollAnimations.tsx      # IntersectionObserver that adds .is-visible to [data-animate] elements
    FeatureSections.tsx       # Four journey-step feature blocks with stepper UI
    ProductSpecs.tsx          # Ring specs layout (ring image + spec cards on each side)
    DayInLife.tsx             # Tabbed scenario section
public/images/                # All product/lifestyle images
```

### Key conventions

**Tailwind v4** — configured via `@import "tailwindcss"` in `globals.css` with `@theme inline` for font variables. No `tailwind.config.js`.

**Fonts** — Manrope (sans, weights 300–600) and Lora (serif/italic) loaded via `next/font/google`, exposed as `--font-manrope` and `--font-lora`. Applied inline: `style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}`. Tailwind font utilities are not used.

**Responsive layout** — Mobile-first with `lg:` breakpoint (1024px). The hero section uses separate mobile (`lg:hidden`) and desktop (`hidden lg:block`) blocks. Other sections use responsive utilities (`lg:flex-row`, `lg:text-[72px]`, etc.). Mobile padding is `px-5`; desktop is `px-[64px]`.

**Design width** — 1512px. Desktop sections use `max-w-[1512px] mx-auto` with `px-[64px]` padding. `<main>` has `overflowX: "clip"` to prevent horizontal scroll from animations.

**Scroll animations** — Add `data-animate` to any element; `ScrollAnimations.tsx` uses IntersectionObserver to toggle `.is-visible`, which triggers the CSS transition defined in `globals.css`. Use `style={{ transitionDelay: "120ms" }}` for staggered reveals.

**Z-index layering** — `AmbientGlow` at z:0 (fixed) → page content at z:1 (layout.tsx wrapper) → film grain overlay at z:9999 (`body::after` in globals.css, SVG noise texture at 3.2% opacity).

**Color palette** (CSS vars in `globals.css`, used as Tailwind arbitrary values):
- `#faf8f5` — page background (`--color-bg`)
- `#141413` — primary text / CTA button (`--color-text-primary`)
- `#3d3d3a` — secondary text (`--color-text-secondary`)
- `#73726c` — tertiary / inactive items (`--color-text-tertiary`)
- `#bfb5a7` — hero section background fallback

**Page structure** (top to bottom in `app/page.tsx`):
1. Hero — mobile: full-screen `h-screen`; desktop: `h-[836px]`, Hero.png with gradient overlay, headline + preorder CTA
2. "Ordinary Days, Faithfully Kept" — two-column intro text
3. `<FeatureSections />` — journey stepper (Capture / Be Seen / Reflect / Witness) + photos
4. `<ProductSpecs />` — ring image centered, specs on each side
5. `<DayInLife />` — tabbed day-in-life scenarios
6. Quote block — centered closing poem
7. Closing CTA — headline + preorder button
