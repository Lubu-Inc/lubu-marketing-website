# PRD: S1 · Foundation
**Project:** LUBU.AI Marketing Website
**Sprint:** S1 · Foundation
**Status:** pending
**Generated:** 2026-03-17
**Mode:** --lean (no CTO audit, no UX review phase — tech stack is locked)

---

## North Star

Bootstrap a fully configured Next.js + TypeScript + Tailwind project with a global design system and a sticky nav shell so that every downstream sprint (S2, S3, S4) can drop sections in without touching config or design tokens.

---

## ui_heavy: true

---

## Outcome Traceability

| Sprint deliverable | Traces to |
|---|---|
| Next.js static export config | O1 — site accessible via Vercel preview URL |
| Design system tokens + typography | O1 — 11 sections render with consistent visual identity |
| Sticky nav with scroll-to-section | O1 — nav and CTA interactions work end-to-end |
| Global layout shell (meta, fonts) | O1 — site accessible on desktop and mobile |

---

## Problem This Sprint Solves

S2, S3, and S4 are parallel sprints that each author sections of the site. Without a shared foundation — project scaffolding, Tailwind config with brand tokens, font loading, and a working nav component — those sprints cannot start and would each make incompatible local decisions about color, type scale, and motion constants. S1 resolves all of that upfront so downstream sprints have zero setup cost.

---

## Tech Stack (confirmed from CLAUDE.md — do not deviate)

| Concern | Decision |
|---|---|
| Framework | Next.js 14, App Router, `output: 'export'` (static export) |
| Language | TypeScript strict mode |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion (install now, used in S2+) |
| Deployment target | Vercel (static export — no Node server runtime) |
| New dependencies | None beyond the above — no new libs without a forcing function |

---

## Design System Tokens (encode in `tailwind.config.ts`)

### Color palette

| Token name | Hex | Usage |
|---|---|---|
| `background` | `#232321` | Primary page background |
| `background-deep` | `#0F0F0D` | Deep black — section alternates, hero |
| `accent` | `#DC7448` | Primary CTA, highlights, borders |
| `accent-warm` | `#E4A494` | Hover states, subtle accents |
| `text-muted` | `#9B9B98` | Secondary body text, labels |
| `surface-subtle` | `#747470` | Dividers, inactive UI elements |
| `text-light` | `#FAFAF3` | Primary text on dark backgrounds |

### Typography

- **Display font:** Space Grotesk (geometric sans — load via `next/font/google`)
- **Mono accent:** JetBrains Mono or Space Mono (for stats/data figures — load via `next/font/google`)
- Scale defined in `tailwind.config.ts` (do not use arbitrary values in components)

### Motion constants (in `src/lib/constants.ts`)

```ts
export const MOTION = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.7,
  },
  ease: {
    out: [0.0, 0.0, 0.2, 1.0],
    inOut: [0.4, 0.0, 0.2, 1.0],
  },
  reducedMotion: 'prefers-reduced-motion',
} as const
```

All animated components must check `useReducedMotion()` from Framer Motion and skip entrance effects when true.

---

## Must-Haves (definition gates the sprint)

1. `next.config.ts` sets `output: 'export'` — static build must succeed (`next build` exits 0, `out/` directory is produced).
2. `tailwind.config.ts` contains all 7 brand color tokens as named values (no hex literals in components).
3. Both fonts (display + mono) load via `next/font/google` in `src/app/layout.tsx`, applied as CSS variables.
4. `src/lib/constants.ts` exports `NAV_LINKS`, `SOCIAL_LINKS`, and `MOTION` constants — no strings hardcoded in components.
5. Sticky nav renders on desktop and mobile with all 6 nav links (Home, Features, About, Comparison, Join Waitlist, Contact Us), LinkedIn and Instagram social icons, and the LUBU logo from `public/brand/LUBU logo - logo white.png`.
6. Each nav link scrolls smoothly to its target section anchor (anchors may be empty placeholder `<section id="...">` elements at this stage — wired in, not populated).
7. `src/app/page.tsx` renders the nav + 11 placeholder `<section>` elements with correct IDs so S2/S3/S4 can drop content in without changing IDs.
8. `next build` completes without TypeScript errors, Tailwind purge warnings, or console errors in the browser.

---

## Nice-to-Haves (do not block the sprint on these)

- Mobile hamburger menu with smooth open/close animation (acceptable to ship desktop nav only for S1 — mobile nav polish is within S5 scope)
- Active link highlighting on scroll (S5 scope)
- OG image meta tag populated with a real image (placeholder string is fine for S1)

---

## File List — Every File Created in This Sprint

```
next.config.ts                          ← static export config
tailwind.config.ts                      ← brand tokens, typography scale, animation utilities
tsconfig.json                           ← strict TypeScript
package.json                            ← Next.js 14, Framer Motion, TypeScript, Tailwind deps
postcss.config.js                       ← Tailwind PostCSS plugin

src/
  app/
    layout.tsx                          ← font loading, global meta, CSS variables, OG tags
    page.tsx                            ← nav + 11 placeholder sections with IDs
    globals.css                         ← Tailwind base/components/utilities + CSS reset

  components/
    nav/
      Nav.tsx                           ← sticky nav — logo, links, social icons, scroll behavior

  lib/
    constants.ts                        ← NAV_LINKS, SOCIAL_LINKS, MOTION constants, section IDs
```

Files NOT created in S1 (deferred to S2/S3/S4):
- All section components under `src/components/sections/`
- All reusable UI primitives under `src/components/ui/`

---

## Section IDs (canonical — must be set in S1, never changed)

These IDs are the contract between Nav scroll behavior and section components. Set them in S1. S2/S3/S4 use them without modification.

| Section | id |
|---|---|
| Hero | `hero` |
| Marquee | `marquee` |
| Social Proof | `social-proof` |
| Stats | `stats` |
| About | `about` |
| Comparison | `comparison` |
| Features | `features` |
| Trusted By | `trusted-by` |
| Waitlist | `waitlist` |
| Contact | `contact` |
| Footer | `footer` |

Nav link targets:
- Home → `#hero`
- Features → `#features`
- About → `#about`
- Comparison → `#comparison`
- Join Waitlist → `#waitlist`
- Contact Us → `#contact`

---

## Nav Component Specification

**Behavior:**
- Fixed/sticky to top, full width, `z-50`
- Background: `#0F0F0D` at 90% opacity with `backdrop-blur-sm` on scroll (transparent when at top)
- Logo: `public/brand/LUBU logo - logo white.png` — rendered via `next/image`, height 32px
- Nav links: right-aligned, `text-light` color, hover → `text-accent`, smooth transition
- Social icons: LinkedIn + Instagram SVG icons, same color treatment as nav links
- Scroll behavior: `scrollIntoView({ behavior: 'smooth' })` on click — no `href` hash jumps (avoids URL pollution)
- Mobile: hamburger icon replaces link list below `md` breakpoint (can be minimal for S1; full animation is S5)

**No JavaScript routing** — this is a single-page scroll experience. Nav links are `<button>` elements calling `scrollIntoView`, not `<a href>` anchors.

---

## `src/app/page.tsx` Structure

```tsx
// Renders: Nav + 11 placeholder sections
// Each section has correct id, min-height to visually confirm scroll targets
// Background alternates between #232321 and #0F0F0D for visual separation

<main>
  <Nav />
  <section id="hero" className="min-h-screen bg-background-deep" />
  <section id="marquee" className="min-h-[120px] bg-background" />
  <section id="social-proof" className="min-h-[200px] bg-background" />
  <section id="stats" className="min-h-[200px] bg-background-deep" />
  <section id="about" className="min-h-screen bg-background" />
  <section id="comparison" className="min-h-screen bg-background-deep" />
  <section id="features" className="min-h-screen bg-background" />
  <section id="trusted-by" className="min-h-[300px] bg-background-deep" />
  <section id="waitlist" className="min-h-[400px] bg-background" />
  <section id="contact" className="min-h-[400px] bg-background-deep" />
  <footer id="footer" className="bg-background" />
</main>
```

---

## `src/app/layout.tsx` Specification

- `metadata` export: title `"LUBU — Movement Intelligence Platform"`, description `"The first wearable that tracks the mechanical cause of health."`, og:image placeholder
- Fonts: Space Grotesk → CSS variable `--font-display`, Space Mono → CSS variable `--font-mono`
- `<html lang="en">`, `<body>` applies both font variables and `bg-background text-text-light antialiased`
- No server components requiring Node runtime — layout is static-compatible

---

## Definition of Done

- [ ] `next build` exits 0 with `output: 'export'` — `out/` directory is produced with no errors
- [ ] TypeScript strict mode passes with zero errors (`npx tsc --noEmit`)
- [ ] Browser renders the page: sticky nav visible, LUBU logo loads, all 6 nav links visible
- [ ] Each nav link scrolls smoothly to a visible section placeholder
- [ ] Tailwind brand tokens are set; no hex literals appear in any `.tsx` file
- [ ] Both fonts load and render in the browser (verify via DevTools Network tab)
- [ ] `src/lib/constants.ts` is the sole source of nav copy, social links, and motion constants
- [ ] No console errors in the browser on first load

---

## Open Questions

- None. Tech stack is locked in CLAUDE.md. All copy and content are sourced from OUTCOMES.md. All design decisions are specified above. S1 is unambiguous.

---

## Constraints Carried Forward

- No server-side runtime. Everything must work as a static export.
- No pricing nav link — ever.
- All copy lives in `src/lib/constants.ts` — not in components.
- `prefers-reduced-motion` must be respected in all animated components (install Framer Motion in S1 so the hook is available in S2+).
