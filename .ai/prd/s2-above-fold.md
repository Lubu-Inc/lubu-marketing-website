# PRD — S2 · Above the Fold
**Sprint:** s2-above-fold
**Status:** ready
**Date:** 2026-03-17
**Outcome:** O1 (Full marketing site live on Vercel preview URL) + O3 (Performance and motion targets met)
**Dependencies:** S1 · Foundation (complete)
**ui_heavy:** true

---

## North Star

Deliver the complete above-the-fold experience — Hero, Marquee, Social Proof, and Stats — so a first-time visitor immediately understands what LUBU is, feels the premium brand, and is drawn to scroll further.

---

## Problem

The site has a working nav and section shells (S1) but no above-the-fold content. A visitor landing on the page today sees a blank dark screen. This sprint makes the first impression real: the product message, the motion that signals innovation, the credibility signals, and the data that backs the claim.

---

## Users

Investors, elite athletes, and sports clinicians landing on the LUBU marketing site for the first time. They need to understand the product promise, feel the brand quality, and see social proof — within 3 seconds of page load.

---

## Scope

Four components, delivered as section files under `components/sections/`:

1. `HeroSection.tsx`
2. `MarqueeSection.tsx`
3. `SocialProofSection.tsx`
4. `StatsSection.tsx`

One shared primitive (if not already present):

5. `components/ui/AnimatedCounter.tsx`

No changes to `lib/constants.ts` — all required copy is already defined there.

---

## Must-Haves

### 1. Hero Section (`components/sections/HeroSection.tsx`)

**Layout — desktop (≥1024px):**
- Full-viewport-height section (`min-h-screen`) with `id={SECTION_IDS.hero}`.
- Two-column grid: left column holds text content; right column holds the product image composition.
- Background: `bg-background` (`#232321`). A subtle radial gradient from `accent` (`#DC7448`) at ~15% opacity blooms behind the product image to add depth — implement as an absolutely positioned `div` with `bg-gradient-radial` or inline style, not a full-bleed image.

**Layout — mobile (<1024px):**
- Single column, stacked. Product image appears above the text block.
- Headline font size steps down from `text-5xl` / `text-6xl` (desktop) to `text-3xl` (mobile).

**Text content (all from `lib/constants.ts`):**
- Headline: `HERO.headline` — rendered as `<h1>`, font class `font-display`, large weight (`font-bold` or `font-extrabold`), color `text-text-light` (`#FAFAF3`).
- Subheadline: `HERO.subheadline` — rendered as `<p>`, font class `font-display`, color `text-text-muted` (`#9B9B98`), max-width constrained to ~560px to prevent overly wide lines.
- CTA button: `HERO.cta` — use the existing `Button` primitive from `components/ui/Button.tsx`. On click, call `scrollIntoView({ behavior: 'smooth' })` on `document.getElementById(HERO.ctaSectionId)`. This is the canonical scroll pattern from S1 (use `useCallback`).

**Product image composition:**
- Primary image: `public/images/lubu_insole_main.png` — rendered via `next/image`, `priority` flag set (above the fold), `alt="LUBU insole — movement intelligence hardware"`.
- Secondary image: `public/images/lubu_insole_secondary.jpg` — rendered via `next/image`, positioned as a floating accent overlapping the primary image (absolute positioning within a relative container). Smaller size, slight vertical offset, subtle drop shadow. `alt="LUBU insole detail"`.
- Sport context image: `public/images/lubu_sport_1.jpeg` — rendered via `next/image`, positioned below/behind the insole images to provide athletic context. Lower z-index, reduced opacity (~70%) so the insole remains the hero. `alt="Athlete with LUBU insole"`.
- Wrap all three images in a single `relative` div. Use `z-index` layering (Tailwind `z-10`, `z-20`, `z-30`) to create depth.

**Entrance animation:**
- Text block: `motion.div` from Framer Motion, `initial={{ opacity: 0, y: 24 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.out }}`.
- Product image group: `motion.div`, same pattern but with a slight delay (`delay: 0.15`).
- Gate all animations with `useReducedMotion()` — if reduced motion is preferred, skip to final state immediately (set `duration: 0`).
- Use only `transform` and `opacity` — no `height`, `width`, or layout-triggering properties in animations.

---

### 2. Marquee Section (`components/sections/MarqueeSection.tsx`)

**Purpose:** Infinite horizontal scroll strip reinforcing brand energy. Sits immediately below the Hero.

**Structure:**
- Section with `id={SECTION_IDS.marquee}`, `py-4` or `py-6`, `bg-background-deep` (`#0F0F0D`), `overflow-hidden`.
- Inner strip contains the marquee text. The strip is duplicated (two identical copies side-by-side) so the loop is seamless.
- Each item renders as: `[MARQUEE_PREFIX]` (styled as label/prefix text in `text-text-muted`) followed by each word from `MARQUEE_ITEMS` separated by a styled bullet or slash divider in `text-accent`. Example visible output: `Level up with more:  power  /  control  /  speed  /  ...`
- The full phrase repeats across both copies so no blank gap is visible at any point in the loop.

**Animation — pure CSS infinite scroll (no JS library, no Framer Motion for the loop itself):**
- Apply a CSS `@keyframes marquee` animation defined in `styles/globals.css`:
  ```css
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  ```
  `-50%` because the strip is 200% wide (two copies). This produces a seamless infinite loop.
- Apply to the inner strip element via a Tailwind `animate-[marquee_30s_linear_infinite]` arbitrary value, or a custom class in `globals.css`. Duration: 30s.
- Add `will-change: transform` to the animated element for GPU compositing.
- Respect `prefers-reduced-motion`: wrap the animated class in a `@media (prefers-reduced-motion: reduce)` override that sets `animation: none`. This can be done in `globals.css` alongside the keyframe.
- Do NOT use `framer-motion` for this loop — it is pure CSS for performance.

**Typography:**
- Font: `font-display`, size `text-lg` or `text-xl`, color `text-text-light` for the prefix, `text-accent` for the separator glyphs, `text-text-light` for the words.
- All content sourced from `MARQUEE_PREFIX` and `MARQUEE_ITEMS` constants.

---

### 3. Social Proof Section (`components/sections/SocialProofSection.tsx`)

**Purpose:** Establish credibility with partner logos immediately below the marquee.

**Structure:**
- Section with `id={SECTION_IDS.socialProof}`, padding `py-12` or `py-16`, `bg-background` (`#232321`).
- Label: `SOCIAL_PROOF.label` ("Backed by the best") — rendered as a `<p>` or `<span>`, centered, `text-text-muted`, `text-sm`, `uppercase tracking-widest` for an editorial feel.
- Logo strip: `flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-8`.
- Each logo: `next/image`, `alt={logo.name}`, max height `h-8` or `h-10` (use `height` prop on `next/image`, constrain via CSS). Apply `opacity-60 hover:opacity-100 transition-opacity duration-200` for a polished hover state. Do not force white — the logos have varied backgrounds; render them as-is (partners may have dark or light assets).
- All logo data sourced from `SOCIAL_PROOF.logos` — iterate, never hardcode filenames in JSX.

**Entrance animation:**
- Wrap the whole section content in a `motion.div` with scroll-triggered reveal: use Framer Motion `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 16 }}`, `viewport={{ once: true, amount: 0.3 }}`, `transition={{ duration: MOTION.duration.base, ease: MOTION.ease.out }}`.
- Gate with `useReducedMotion()`.

---

### 4. Stats Section (`components/sections/StatsSection.tsx`)

**Purpose:** Four animated counters that count up when the section enters the viewport, communicating scale and precision.

**Structure:**
- Section with `id={SECTION_IDS.stats}`, `py-16 md:py-24`, `bg-background-deep` (`#0F0F0D`).
- Four-column grid: `grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12`.
- Each stat card: centered, stat number on top in `font-mono text-4xl md:text-5xl font-bold text-accent`, label below in `font-display text-sm md:text-base text-text-muted`.

**Animated counter — `components/ui/AnimatedCounter.tsx`:**

This is a reusable primitive. Implementation spec:

```
Props:
  value: string   // e.g. "120B+", "50K+", "95%", "90%"
```

Parsing logic (internal to the component):
- Strip non-numeric suffix (e.g. `"B+"`, `"K+"`, `"%"`) and store as `suffix`.
- Strip non-numeric prefix if any and store as `prefix`.
- Parse the numeric portion as a float → `target`.
- Abbreviation multiplier: if suffix contains `"B"` → target display is `120`, suffix `"B+"`. If suffix contains `"K"` → target display is `50`, suffix `"K+"`. Count up to the display number, not the raw value.

Animation implementation (Framer Motion only — no external counter library):
- Use `useInView` from `framer-motion` with `{ once: true, amount: 0.5 }` to detect when the stat enters the viewport.
- Use `useMotionValue(0)` for the raw numeric value.
- Use `animate(motionValue, target, { duration: 1.8, ease: 'easeOut' })` — trigger inside a `useEffect` that fires when `inView` becomes `true`.
- Use `useTransform(motionValue, (v) => Math.round(v).toString())` to derive the display string.
- Render: `{prefix}{displayValue}{suffix}`.
- Gate with `useReducedMotion()` — if reduced motion preferred, skip animation and render final value immediately (call `motionValue.set(target)` without animating).

**Entrance animation on the cards:**
- Each stat card: `motion.div`, `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 20 }}`, staggered `delay: index * 0.1`, `viewport={{ once: true }}`.
- Gate with `useReducedMotion()`.

All stat data sourced from `STATS` constant — iterate, never hardcode values.

---

## Nice-to-Haves (implement only if time allows, do not block DoD)

- Add `lubu_sport_2.jpeg` as a faint full-bleed background texture behind the Hero at very low opacity (~8%) for added atmosphere.
- Marquee speed adjustable via a single CSS custom property (`--marquee-duration`) set on `:root` in `globals.css` so it can be tuned without touching component code.
- Stats section: thin horizontal separator line (`border-t border-surface-subtle`) above each stat number as a subtle design detail.

---

## Integration Points

- `lib/constants.ts` — read-only. `HERO`, `MARQUEE_PREFIX`, `MARQUEE_ITEMS`, `SOCIAL_PROOF`, `STATS`, `SECTION_IDS`, `MOTION` are all consumed in this sprint. Do not add or modify keys.
- `styles/globals.css` — add `@keyframes marquee` and `prefers-reduced-motion` override. Do not touch existing token declarations or base styles from S1.
- `app/page.tsx` — import and render all four new section components in order: `<HeroSection />`, `<MarqueeSection />`, `<SocialProofSection />`, `<StatsSection />`. The section shells placed by S1 must be replaced (not duplicated) by these implementations.
- `components/ui/Button.tsx` — consumed by HeroSection. Do not modify — use as-is from S1.
- `next.config.mjs` — no changes needed. Static export config from S1 is correct.

---

## S1 Retro Learnings Applied

- **No `src/` prefix:** All file paths in this PRD drop the `src/` prefix. Files live at `components/sections/`, `components/ui/`, `lib/`, `styles/`, `app/` — not `src/app/` etc. (S1 retro: PRD had wrong prefix, implementation had to deviate.)
- **`next.config.mjs` not `.ts`:** No config file changes needed this sprint, but any reference must use `.mjs`.
- **Canonical scroll pattern:** Hero CTA uses `document.getElementById(HERO.ctaSectionId)` + `scrollIntoView({ behavior: 'smooth' })` wrapped in `useCallback`. This is identical to the Nav pattern from S1 — do not introduce a different scroll mechanism.
- **`useReducedMotion()` on every animated component:** S1 retro called this out explicitly. Every component in this sprint that uses Framer Motion must call `useReducedMotion()` and skip or instant-set animation values when it returns `true`.
- **Tailwind brand token names:** Use `bg-background`, `bg-background-deep`, `text-accent`, `text-accent-warm`, `text-text-muted`, `text-text-light`, `bg-surface-subtle` — never hex literals in JSX or className strings.
- **Font utility classes:** `font-display` (Space Grotesk) and `font-mono` (Space Mono) — these are already configured as Tailwind utilities by S1.
- **Section IDs must not change:** Use `SECTION_IDS.*` constants. Do not hardcode id strings.

---

## File List

Files to create (new):
- `components/sections/HeroSection.tsx`
- `components/sections/MarqueeSection.tsx`
- `components/sections/SocialProofSection.tsx`
- `components/sections/StatsSection.tsx`
- `components/ui/AnimatedCounter.tsx`

Files to modify (existing):
- `app/page.tsx` — replace section placeholder shells with real component imports
- `styles/globals.css` — add `@keyframes marquee` + `prefers-reduced-motion` override

Files to read (no modification):
- `lib/constants.ts` — source of all copy and config
- `components/ui/Button.tsx` — used as-is in Hero CTA
- `next.config.mjs` — reference only

---

## Success Criteria

These map directly to O1 and O3:

1. **Hero renders correctly** — headline, subheadline, and CTA visible on both desktop (≥1024px) and mobile (320px). CTA click smoothly scrolls to the waitlist section.
2. **Product images display** — `lubu_insole_main.png` renders as the primary image; `lubu_insole_secondary.jpg` and `lubu_sport_1.jpeg` visible as composition layers. No broken image icons.
3. **Marquee loops without pause or gap** — the animation runs continuously and seamlessly at 30s per cycle. No JavaScript required for the loop.
4. **Marquee respects reduced motion** — animation pauses/stops when `prefers-reduced-motion: reduce` is set in the OS.
5. **All 5 partner logos render** — Haslam, Intennse, Juventus, MLS Innovation Lab, Techstars visible in the social proof bar with correct alt text.
6. **Counters count up on scroll** — all 4 stat values animate from 0 to their target (120, 50, 95, 90) when the stats section enters the viewport. Count-up uses Framer Motion only (no external library).
7. **Counters respect reduced motion** — when `prefers-reduced-motion: reduce`, counters display final values immediately without animation.
8. **No hardcoded strings in components** — all copy and configuration flows from `lib/constants.ts`.
9. **No TypeScript errors** — `npx tsc --noEmit` passes clean.
10. **Build succeeds** — `npm run build` produces static export in `out/` without errors or warnings.
11. **LCP target not regressed** — the `priority` flag on `lubu_insole_main.png` ensures it is preloaded; no new render-blocking resources introduced.

---

## Open Questions

- None blocking. Partner logo assets are confirmed present at `public/logos/partners/` with filenames matching `SOCIAL_PROOF.logos` in constants.
- Product images are confirmed present at `public/images/` (`lubu_insole_main.png`, `lubu_insole_secondary.jpg`, `lubu_sport_1.jpeg`).
- If `next/image` requires explicit `width`/`height` props and the image dimensions are unknown at build time, use `fill` layout with a sized wrapper div as a fallback for the floating images.

---

## Definition of Done

- [ ] All 5 files created, all 2 files modified per the file list above
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `npm run build` exits 0, `out/` directory populated
- [ ] Hero section visible and correct on viewport widths 320px, 768px, 1280px, 1440px
- [ ] Marquee animates continuously in a browser with default OS settings
- [ ] Marquee is static (no animation) when `prefers-reduced-motion: reduce` is active
- [ ] Social proof bar shows all 5 logos with no broken images
- [ ] Stats counters count up from 0 to final value on first scroll into view
- [ ] Stats counters show final values instantly when reduced motion is preferred
- [ ] No string literals for copy appear in any component file (all from constants)
- [ ] No hex color literals appear in any component file (all from Tailwind brand tokens)
- [ ] `npm run build` emits no TypeScript or ESLint errors
