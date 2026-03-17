# Sprint Retrospective: s1-foundation
Date: 2026-03-17

## What was built
Full Next.js 14 + TypeScript strict + Tailwind v3 project scaffold with LUBU brand design tokens, Space Grotesk + Space Mono font loading, a sticky responsive nav with all 6 links + social icons + scroll behavior, 11 section placeholder shells with canonical IDs, and a reusable Button primitive. Static export (`out/`) verified green on first final build.

## What broke or was harder than expected
- `create-next-app` CLI scaffolds to Next.js 16 / Tailwind v4 as of 2026-03 — collides with the PRD's locked stack (Next.js 14 + Tailwind v3). Required manual scaffold-to-temp-dir approach then selective copy of `.gitignore` and `next-env.d.ts`, then manual `package.json` with pinned versions.
- Next.js 14 does not support `next.config.ts` — only `.js` or `.mjs`. The PRD and CLAUDE.md both reference `next.config.ts` but the runtime rejects it. Renamed to `next.config.mjs` immediately after first failed build.
- `tsconfig.json` was partially populated by the copied scaffold (had `jsx: react-jsx`, `target: ES2017`, extra include patterns) — needed an edit pass to match Next.js 14 expected config (`jsx: preserve`, no target override).

## What was over/under-specified in the PRD
- PRD references `next.config.ts` as the filename — this should be `next.config.mjs` for Next.js 14. Future PRDs should specify `.mjs`.
- PRD specifies `src/` directory prefix (e.g. `src/app/layout.tsx`, `src/lib/constants.ts`) but CLAUDE.md and the `--no-src-dir` scaffold flag both indicate no `src/` prefix. The implementation follows the no-src-dir convention correctly. PRD file list should be updated to drop the `src/` prefix for consistency.
- PRD is silent on `metadataBase` — Next.js 14 emits build warnings without it. Added `metadataBase: new URL('https://lubu.ai')` to suppress.

## Audit findings summary
- Reliability: No audit run (--lean mode)
- Security: No audit run (--lean mode)

## Patterns discovered (useful for future sprints)
- `NAV_LINKS`, `SOCIAL_LINKS`, `SECTION_IDS`, `MOTION`, and all site copy are exported from `lib/constants.ts` — section components should import from there, never hardcode strings.
- Nav uses `useCallback` + `scrollIntoView({ behavior: 'smooth' })` on `<button>` elements (not `<a href="#">`) — this is the canonical scroll pattern for this site.
- Tailwind brand tokens are `background`, `background-deep`, `accent`, `accent-warm`, `text-muted`, `surface-subtle`, `text-light` — use these names, never hex literals in components.
- Font variables are `--font-display` (Space Grotesk) and `--font-mono` (Space Mono), available as `font-display` and `font-mono` Tailwind utility classes.
- All animated components must call `useReducedMotion()` from Framer Motion — Framer Motion is installed and available.

## Suggestions for next sprint on this objective
- S2/S3/S4 should import all copy from `lib/constants.ts` — the full content for every section is already populated there (Hero, Marquee, Social Proof, Stats, About, Comparison, Features, Trusted By, Waitlist, Contact, Footer).
- Section component files should live at `components/sections/[SectionName].tsx` per CLAUDE.md file structure.
- The canonical section IDs (set in `page.tsx` and `SECTION_IDS` constant) must not change — they are the scroll contract between Nav and all sections.
- Framer Motion `useReducedMotion()` must gate all entrance animations in every animated component. The `MOTION` constants object is already exported from `lib/constants.ts`.
