# Sprint Retrospective: s3-core-sections
Date: 2026-03-17

## What was built
Three persuasion-critical mid-page sections: About (origin story + 4.8-star rating + insole product image), Comparison (8-row div-based two-column grid with LUBU visual dominance), and Features (3 feature cards with unique inline SVG icons and stagger entrance animations).

## What broke or was harder than expected
- Tailwind color token naming required careful attention: keys like `text-muted` in the config produce `text-text-muted` utility classes (the utility prefix + the color name), matching the pattern in Nav.tsx. The PRD aliases (`text-muted`, `text-light`) are shorthand — the actual Tailwind classes require the `text-` prefix doubled. Verified against Nav.tsx before writing any JSX.
- The partial star (0.8 fill) required a `linearGradient` with `id` uniqueness inside the SVG — used a conditional `id` to avoid duplicate SVG gradient IDs across the 5-star render, though only one partial star is ever rendered so collisions are not a concern in practice.
- Framer Motion's `useReducedMotion()` guard pattern required spreading an empty object `{}` when motion is disabled rather than conditionally rendering a different element type, preserving consistent DOM structure.

## What was over/under-specified in the PRD
- The PRD said "coral left border accent" on the LUBU column but also mentioned `border-l border-surface-subtle` as a separator. These are not contradictory but needed reconciling: the left border on LUBU cells uses `border-l-accent/30` for the coral tint, which provides both the separator and the visual accent simultaneously.
- The `border-t-accent` card top accent in Features is a Tailwind v3 pattern that works with `border-t` — had to ensure the border-top color override is written as a separate class after the base border class.
- M4 (page.tsx modification) in the PRD conflicted with the PL instructions which explicitly say "DO NOT modify app/page.tsx — integration happens in a separate step." PL instructions take precedence; page.tsx was left untouched.

## Audit findings summary
- Reliability: No audit run (lean mode)
- Security: No audit run (lean mode)

## Patterns discovered (useful for future sprints)
- `components/ui/Button.tsx` exists with `primary`/`outline`/`ghost` variants — future sections should import this rather than writing inline button classes. The Comparison CTA was written inline to match the nav's `scrollIntoView` callback pattern, but could be refactored to use the Button component.
- All `'use client'` directives are required for any component using Framer Motion or `useCallback`/`useEffect` — this is non-negotiable with Next.js App Router static export.
- SVG gradient `id` attributes must be unique per page if multiple instances of the same component render. For the star rating, the partial gradient id `partialStarGrad` is fine since only one partial star renders per About section.
- The `@/` import alias maps to the project root (no `src/` directory) — confirmed via Nav.tsx imports.

## Suggestions for next sprint on this objective
- S4 (remaining sections: Hero, Stats, TrustedBy, Waitlist, Contact, Footer) should note that `components/ui/Button.tsx` already exists and is the canonical CTA element — use it everywhere instead of inline button classes.
- The page.tsx integration (mounting About, Comparison, Features) was deferred per PL instructions — whoever owns that integration step should ensure the placeholder `<section>` elements for about/comparison/features are replaced, not just have imports added alongside them.
- Consider adding a `components/ui/SectionWrapper.tsx` with consistent max-width and padding as a DRY wrapper — currently all three sections repeat `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
