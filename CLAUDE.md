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

Single-page marketing site for the "Bless Ring" product. The entire page lives in `app/page.tsx` — no routing, no additional pages.

```
app/
  layout.tsx      # Root layout: loads Inter + Lora fonts, sets metadata
  globals.css     # Tailwind v4 import + CSS custom properties (colors, fonts)
  page.tsx        # Full landing page + inline sub-components
public/images/    # All product/lifestyle images (PNG)
```

### Key conventions

**Tailwind v4** — configured via `@import "tailwindcss"` in `globals.css` with `@theme inline` for font variables. This differs significantly from v3 (no `tailwind.config.js`).

**Fonts** — loaded via `next/font/google` in `layout.tsx`, exposed as CSS variables `--font-inter` and `--font-lora`. Applied inline with `style={{ fontFamily: "var(--font-inter)" }}` (not via Tailwind font utilities).

**Design width** — 1512px. Sections use `max-w-[1512px] mx-auto` with fixed `px-[200px]` padding. All sizing is pixel-exact to match Figma (node `3756-10902`).

**Color palette** (defined as CSS vars in `globals.css`, used as Tailwind arbitrary values):
- `#faf8f5` — page background
- `#141413` — primary text / CTA button
- `#3d3d3a` — secondary text
- `#73726c` — tertiary / inactive stepper items
- `#bfb5a7` — hero section background fallback

**Page structure** (top to bottom in `app/page.tsx`):
1. Hero — `h-[836px]`, hero-bg.png with gradient overlay, headline + preorder CTA
2. "Stay Close to God" intro — centered text with decorative radial-gradient blobs
3. Four `<FeatureSection>` — each renders the full `JOURNEY_STEPS` stepper with one active step + a paired photo
4. Product specs — ring image centered, 3 specs on each side
5. "Stay Close to God" side-by-side layout
6. Three full-width lifestyle photos (aspect-ratio locked)

The `FeatureStepper` component renders all four journey steps every time, highlighting the `activeIndex` step with a taller vertical bar and visible description text.
