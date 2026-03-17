# CLAUDE.md — LUBU Marketing Website

## Project
Single-page marketing website for LUBU.AI. One purpose: waitlist email capture.
Three audiences: investors, athletes, clinicians — one unified experience.

## Stack
- **Framework:** Next.js 14 (App Router, static export — `output: 'export'`)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Deployment:** Vercel (static export, no server-side runtime)

## Design Direction
- Aesthetic: premium, futuristic, dark-first
- Color palette:
  - **Background:** `#232321` (black) + `#0F0F0D` (deep black)
  - **Primary accent:** `#DC7448` (coral/salmon — rgb(220, 108, 72))
  - **Warm highlight:** `#E4A494` (darksalmon — rgb(228, 164, 148))
  - **Muted text / secondary:** `#9B9B98` (darkgray — rgb(155, 155, 152))
  - **Subtle surface:** `#747470` (dimgray — rgb(116, 116, 112))
  - **Light text / off-white:** `#FAFAF3` (floralwhite — rgb(250, 250, 243))
- Typography: one display font (geometric sans — e.g. Inter, Geist, or Space Grotesk) + one mono accent for data/stats
- Motion: entrance animations on scroll, smooth 60fps, no janky repaints — use `will-change` and GPU-composited properties only (transform, opacity). Respect `prefers-reduced-motion`.
- Performance budget: LCP < 2s cold, Lighthouse ≥ 90

## File Structure
```
src/
  app/
    layout.tsx        ← metadata, fonts, global styles
    page.tsx          ← single page, all sections composed here
  components/
    nav/
    sections/         ← one file per section (Hero, Marquee, SocialProof, Stats, About, Comparison, Features, TrustedBy, Waitlist, Contact, Footer)
    ui/               ← reusable primitives (Button, AnimatedCounter, etc.)
  lib/
    constants.ts      ← all static content (copy, stats, logos list)
  styles/
    globals.css
public/
  brand/              ← LUBU logo black + white
  logos/
    partners/         ← "Backed by the best" logos
    institutions/     ← "Trusted By" logos
  images/             ← product + sport photos
```

## Content Source
All copy lives in `src/lib/constants.ts` — never hardcode strings in components.

## Forms (UI-only — no backend)
- Waitlist form: email input → show success state ("You're on the list.") — no API call
- Contact form: name/subject/email/message → show success state — no API call
- Backend integration (Google Sheets) is a post-launch sprint

## Assets Available
- `public/brand/LUBU logo - logo white.png` — use on dark backgrounds
- `public/brand/LUBU logo - logo black.png` — use on light backgrounds
- `public/images/` — insole + sport photography
- `public/logos/partners/` — Haslam, Intennse, Juventus, MLS Innovation Lab, Techstars
- `public/logos/institutions/` — PoliMi, NATO, UCLA, UNT (others: text fallback)

## Nav Links
Home, Features, About, Comparison, Join Waitlist, Contact Us
**No Pricing link.**

## SEO
- meta title: `"LUBU — Movement Intelligence Platform"`
- meta description: `"The first wearable that tracks the mechanical cause of health."`
- og:image: product shot (1200x630)
- No index blocking on preview, index on production

## Non-Goals (do not implement)
- Pricing page
- Backend email persistence
- Multi-page routing
- Auth, user accounts, analytics
- Server components that require a Node runtime