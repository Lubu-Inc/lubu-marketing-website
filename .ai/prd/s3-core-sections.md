# PRD: S3 · Core Sections
**Project:** LUBU Marketing Website
**Sprint:** S3
**Status:** ready
**Outcome:** O1 — Full marketing site live on Vercel preview URL
**Dependencies:** S1 complete
**ui_heavy:** true
**complexity:** medium
**Generated:** 2026-03-17

---

## North Star

Deliver the three persuasion-critical mid-page sections — About, Comparison, and Features — so every visitor audience (investor, athlete, clinician) encounters concrete proof of LUBU's differentiation before they reach the waitlist CTA.

---

## Problem

S1 laid the foundation and S2 covers above-the-fold content. The mid-page is currently empty placeholder shells. Without About, Comparison, and Features, visitors who scroll past the hero have no evidence of what LUBU does, why it is different, or why they should trust it. These three sections are the persuasion backbone of the page and must ship before the polish sprint (S5) can run.

---

## Users

Investors, elite athletes, and clinicians — all arriving at the same single-scroll experience. The sections must resonate across all three: About builds credibility, Comparison proves hardware differentiation, Features signals IP depth and scientific validation.

---

## Must-Haves

### M1 — About Section (`components/sections/About.tsx`)

- Section mounts at the canonical ID `SECTION_IDS.about` (`'about'`)
- Renders both body copy paragraphs from `ABOUT.bodyCopy[0]` and `ABOUT.bodyCopy[1]` — no hardcoded strings
- Renders the 4.8 rating callout using `ABOUT.rating` and `ABOUT.ratingLabel`
- Animated star display: 5 stars rendered as inline SVG circles/shapes (no icon library); 4 filled coral (`#DC7448`), 1 partially filled to represent 0.8 — use a linear gradient clip on the fifth star SVG to achieve the partial fill at 80%
- Product image visual: use `next/image` to render `/images/lubu_insole_main.png` as a side-by-side or offset decorative element; include `alt="LUBU insole device"`. Image must never block text on mobile — stack vertically below copy at `< md` breakpoint
- Scroll-triggered entrance: `motion.div` with `whileInView`, `initial={{ opacity: 0, y: 32 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.out }}`, `viewport={{ once: true }}`
- `useReducedMotion()` must gate all animations: if `shouldReduceMotion` is true, skip `initial` and `whileInView` variants entirely (render static)
- No hardcoded hex values in JSX — use Tailwind brand tokens (`text-accent`, `bg-accent`, etc.) exclusively

### M2 — Comparison Section (`components/sections/Comparison.tsx`)

- Section mounts at `SECTION_IDS.comparison` (`'comparison'`)
- Heading from `COMPARISON.heading` ("What Sets LUBU Apart")
- 8 comparison rows from `COMPARISON.rows` — each row has `other` and `lubu` fields
- Layout: div-based two-column grid (`grid grid-cols-2`) — do NOT use an HTML `<table>` element. Reasoning: native `<table>` limits animation capabilities (cannot apply `whileInView` to individual rows independently) and requires additional reset work on mobile
- Column headers: left column labeled "Other Wearables" (muted styling — `text-muted`), right column labeled "LUBU" (coral accent — `text-accent font-semibold`)
- Visual dominance rules:
  - Right (LUBU) column background: subtle coral tint — `bg-accent/5` on each LUBU cell
  - Right column text: `text-light` (off-white, `#FAFAF3`) — full brightness
  - Left column text: `text-muted` (`#9B9B98`) — visually receded
  - Left column background: no fill (transparent / default background)
  - A thin vertical separator line between columns: `border-l border-surface-subtle`
  - Row dividers: `border-b border-surface-subtle/40` on each row div
- Row entrance animation: each row is a `motion.div`; stagger rows with `delay: index * 0.07`; `initial={{ opacity: 0, x: -16 }}`, `whileInView={{ opacity: 1, x: 0 }}`, `viewport={{ once: true }}`; `useReducedMotion()` gates all motion
- CTA button at bottom: text from `COMPARISON.cta`, scrolls to `COMPARISON.ctaSectionId` using the same `scrollIntoView({ behavior: 'smooth' })` pattern established in the Nav component
- No hardcoded strings or hex values in JSX

### M3 — Features Section (`components/sections/Features.tsx`)

- Section mounts at `SECTION_IDS.features` (`'features'`)
- Heading from `FEATURES.heading` ("Lab-Grade Precision. Mass-Market Scale.")
- Subheading from `FEATURES.subheading`
- 3 feature cards from `FEATURES.items` — each card renders: icon, `item.title`, `item.body`
- Card layout: `grid grid-cols-1 md:grid-cols-3 gap-6` — single column on mobile, three columns on desktop
- Card styling: dark surface background (`bg-background-deep`), `rounded-2xl`, `p-6 md:p-8`, thin border `border border-surface-subtle/60`, no drop shadow (keep flat and premium)
- Icons: one unique inline SVG per card (geometric, minimal — no external icon library imported):
  - Proprietary Core: a hexagon outline (6 vertices, stroked, filled none) — represents structural complexity/IP
  - Elite Validation: a shield outline with a center checkmark stroke — represents validation/safety
  - Compounding Intelligence: three concentric arcs (signal/wave) — represents data accumulation
  - SVG props: `width="32" height="32"`, `viewBox="0 0 32 32"`, `stroke="currentColor"`, `fill="none"`, `strokeWidth="1.5"`, wrapped in a `<span className="text-accent block mb-4">` so the coral color is inherited
- Card entrance: each card is a `motion.div`; stagger with `delay: index * 0.12`; `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `transition={{ duration: MOTION.duration.base, ease: MOTION.ease.out }}`, `viewport={{ once: true }}`; `useReducedMotion()` gates all motion
- No hardcoded strings or hex values in JSX

### M4 — Page Composition

- All three sections are imported and rendered in `app/page.tsx` in page order: `<About />`, `<Comparison />`, `<Features />`
- The existing placeholder `<div id="about">`, `<div id="comparison">`, `<div id="features">` shells in `page.tsx` are replaced by the real section components — the canonical IDs move inside each component's root element
- No other sections in `page.tsx` are modified

### M5 — Content Source Discipline

- Every string in all three components is imported from `lib/constants.ts` — zero hardcoded copy in JSX
- The `MOTION` constants object from `lib/constants.ts` is used for all duration and ease values — no magic numbers

---

## Nice-to-Haves

- About section: if `lubu_insole_secondary.jpg` resolves cleanly, use it as a second smaller decorative image (offset/rotated) for depth — only if it doesn't complicate mobile layout
- Comparison section: on row hover (desktop only), highlight the full row with a subtle background shift `hover:bg-surface-subtle/20 transition-colors`
- Features section: on card hover (desktop only), a subtle border brightening `hover:border-accent/30 transition-colors`

---

## User Flows

1. Visitor scrolls from Stats into About — reads LUBU's origin story, sees the insole device, sees the 4.8 rating with animated stars, understands this is a credible hardware product
2. Visitor scrolls into Comparison — sees 8 rows animate in, LUBU column is visually dominant in coral, reads the differentiation, clicks "Join the Waitlist" CTA which smooth-scrolls to the Waitlist section
3. Visitor scrolls into Features — three cards reveal in staggered sequence, each icon signals the nature of the feature (IP / validation / data), reads the technical credibility proof points

---

## Integration Points

- `lib/constants.ts` — read-only source for `ABOUT`, `COMPARISON`, `FEATURES`, `MOTION`, `SECTION_IDS`
- `app/page.tsx` — three new section imports replace existing placeholder divs
- `components/sections/` — three new files: `About.tsx`, `Comparison.tsx`, `Features.tsx`
- `public/images/lubu_insole_main.png` — primary product image used in About
- `public/images/lubu_insole_secondary.jpg` — secondary image (nice-to-have)
- Nav scroll behavior — Comparison CTA must use `scrollIntoView({ behavior: 'smooth' })` on a `<button>` element (not `<a href="#">`), matching the pattern set in the Nav component

---

## Architecture Rules (from CLAUDE.md + S1 retro)

- File extension for Next.js config: `next.config.mjs` (not `.ts`) — not relevant to this sprint but noted for awareness
- File paths use NO `src/` prefix — all imports are relative to the project root (e.g. `lib/constants.ts`, `components/sections/About.tsx`)
- Tailwind brand tokens to use (never hex literals):
  - `text-accent` / `bg-accent` / `bg-accent/5` — coral `#DC7448`
  - `text-accent-warm` — warm highlight `#E4A494`
  - `text-muted` — secondary/muted `#9B9B98`
  - `text-surface-subtle` / `border-surface-subtle` — subtle surface `#747470`
  - `text-light` / `bg-text-light` — off-white `#FAFAF3`
  - `bg-background` — main background `#232321`
  - `bg-background-deep` — deep background `#0F0F0D`
- Font utilities: `font-display` (Space Grotesk), `font-mono` (Space Mono)
- Framer Motion `useReducedMotion()` must gate ALL entrance animations — this is non-negotiable per S1 retro and CLAUDE.md
- `next/image` must be used for all images (not `<img>`)
- No icon libraries — inline SVG only
- No hardcoded strings — `lib/constants.ts` only

---

## S1 Retro Learnings Applied

The following findings from `/lubu-marketing-website/.ai/retros/s1-foundation.md` are directly incorporated into this PRD:

1. **No `src/` prefix** — all file paths in this PRD use the no-src-dir convention (e.g. `components/sections/About.tsx`, not `src/components/sections/About.tsx`)
2. **`useReducedMotion()` is mandatory** — S1 retro explicitly flags this as a pattern all future animated components must follow; it is a must-have requirement on all three sections, not a nice-to-have
3. **Scroll CTA pattern** — Comparison CTA must use `useCallback` + `scrollIntoView({ behavior: 'smooth' })` on a `<button>`, not `<a href="#">`, matching the Nav canonical pattern
4. **Import from `lib/constants.ts`** — S1 retro confirms all content (ABOUT, COMPARISON, FEATURES, MOTION, SECTION_IDS) is already populated in `lib/constants.ts`; no new constants need to be added for this sprint
5. **Section IDs are a scroll contract** — the canonical IDs (`'about'`, `'comparison'`, `'features'`) must not change; they are set in both `SECTION_IDS` and expected by the Nav

---

## Files to Create / Modify

| Action | File |
|---|---|
| CREATE | `components/sections/About.tsx` |
| CREATE | `components/sections/Comparison.tsx` |
| CREATE | `components/sections/Features.tsx` |
| MODIFY | `app/page.tsx` — import and mount three new sections, replacing placeholder divs |

**Read-only (do not modify):**
- `lib/constants.ts`
- `next.config.mjs`
- `tailwind.config.ts`
- Any existing section components from S2

---

## Success Criteria

Traced directly to **O1** (all sections render correctly and are fully responsive on desktop and mobile, 320px → 1440px):

1. `About.tsx` renders at `id="about"`, displays both body copy paragraphs from constants, shows the 4.8 rating with a 5-star SVG display (4 full coral, 1 partial at 80%), and renders `lubu_insole_main.png` via `next/image`
2. `Comparison.tsx` renders at `id="comparison"`, displays all 8 rows from `COMPARISON.rows` using div-based grid (no `<table>`), LUBU column has coral accent styling and full-brightness text, Other Wearables column is visually muted, rows animate in on scroll with stagger
3. `Features.tsx` renders at `id="features"`, displays heading and subheading from constants, renders 3 cards each with a unique inline SVG icon (no icon library), title, and body text, cards stagger animate on scroll
4. All three sections are responsive: single-column stacked layout at 320px, full intended layout at 768px+, no horizontal overflow at any viewport
5. All animations respect `prefers-reduced-motion` — when `useReducedMotion()` returns true, components render statically with no motion
6. `next build` completes with zero TypeScript errors and zero ESLint errors
7. No strings are hardcoded in any component — all copy sourced from `lib/constants.ts`
8. `app/page.tsx` mounts sections in correct page order (About before Comparison before Features) and existing placeholder divs for these three IDs are removed

---

## Definition of Done

- [ ] `components/sections/About.tsx` created and passes all About success criteria above
- [ ] `components/sections/Comparison.tsx` created and passes all Comparison success criteria above
- [ ] `components/sections/Features.tsx` created and passes all Features success criteria above
- [ ] `app/page.tsx` updated: three sections imported and rendered, placeholder divs removed
- [ ] Manual visual check: each section renders on desktop (1440px), tablet (768px), and mobile (375px) — no overflow, no layout breaks
- [ ] Manual motion check: animations trigger on scroll, stagger is visible, no jank
- [ ] Manual a11y check: reduced-motion mode renders static (disable animation in OS settings or test with `useReducedMotion` returning true)
- [ ] `next build` exits 0 — no TypeScript errors, no ESLint errors
- [ ] No hardcoded strings or hex color values in any of the three new components
- [ ] PR or commit description references this PRD and lists all files modified

---

## Open Questions

- None blocking. The product images available (`lubu_insole_main.png`, `lubu_insole_secondary.jpg`) are confirmed via glob. All copy, IDs, and motion constants are confirmed in `lib/constants.ts`. Architecture constraints are confirmed via CLAUDE.md and S1 retro.
