# PRD — S4 · Bottom Sections + Forms

**Sprint:** s4-bottom-forms
**Date:** 2026-03-17
**Status:** ready
**Outcome:** O1 (Full marketing site live on Vercel preview URL), O2 (Waitlist email capture UI-complete)
**Dependencies:** S1 (complete)
**Parallel-safe with:** S2, S3
**ui_heavy:** true

---

## North Star

Complete the bottom half of the single-scroll page — Trusted By, Waitlist, Contact, and Footer — so the full page can be assembled and S5 polish can begin; all copy sourced from `lib/constants.ts`, all forms UI-only with controlled React state and success-state replacement.

---

## Problem

S1 delivered 11 section placeholder shells and a complete design system. S4 must flesh out the four bottom sections so the page has a complete content surface. These sections include the two forms that are the functional core of the site (waitlist capture, contact), the social-proof grid for institutional credibility, and the footer that closes the experience.

---

## Users

Investors, athletes, and clinicians landing on the marketing page. The waitlist form is the primary conversion action for all three audiences.

---

## Must-Haves

### M1 — Trusted By section (`components/sections/TrustedBy.tsx`)

- Section ID: `SECTION_IDS.trustedBy` → `"trusted-by"` (do not hardcode)
- Render all 8 institutions from `TRUSTED_BY.institutions` in `lib/constants.ts`
- Institutions with `src !== null` render `<Image>` (next/image) with the logo; institutions with `src: null` render the institution name as styled text — same visual weight as logo items, same grid cell size
- Logos with images: UNT HSC, UCLA, NATO Special Forces, Politecnico of Milano
- Text-only fallbacks: Sports Innovation Center, Complutense University, Rizzoli Institute, Cambridge University
- Grid layout: responsive — 2 columns on mobile, 4 columns on desktop (≥768px)
- All logo images: `object-contain`, fixed cell height (e.g. `h-16`), `width` and `height` props set on `<Image>` for LCP compliance
- Entrance animation: fade-up on scroll, gated by `useReducedMotion()` from Framer Motion; use `MOTION` constants for duration and ease

### M2 — Waitlist section (`components/sections/Waitlist.tsx`)

- Section ID: `SECTION_IDS.waitlist` → `"waitlist"`
- Heading: `WAITLIST.heading` ("LUBU is invite-only.")
- Subheading: `WAITLIST.subheading`
- Form: single email input (`type="email"`) + submit button
  - Input placeholder: `WAITLIST.placeholder`
  - Button label: `WAITLIST.cta`
- State management: controlled React state (`useState`) — no external form library, no zod
- Email validation: basic regex on submit — `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` — show inline error message `"Please enter a valid email address."` if invalid; do NOT use the browser's native `required` / `type="email"` validation as the sole gate
- On valid submit: set `submitted = true`; success state replaces the form entirely (unmount form, mount success message)
- Success message: `WAITLIST.successMessage` ("You're on the list.")
- No API call, no network request of any kind
- Entrance animation: fade-up, gated by `useReducedMotion()`

### M3 — Contact section (`components/sections/Contact.tsx`)

- Section ID: `SECTION_IDS.contact` → `"contact"`
- Display `BRAND.email` ("hello@lubu.ai") as a visible `mailto:` link above the form
- Form fields (all required): Name, Subject, Email, Message
  - All fields: controlled `useState` per field
  - `Message` field: `<textarea>`, minimum 4 rows
- Validation on submit: all fields non-empty; email field must also pass the same regex as the waitlist form; show per-field or summary inline error for any invalid state
- On valid submit: set `submitted = true`; success state replaces the form entirely
- Success message: `CONTACT.successMessage` ("Message received. We'll be in touch.")
- No API call, no network request of any kind
- Entrance animation: fade-up, gated by `useReducedMotion()`

### M4 — Footer (`components/sections/Footer.tsx`)

- Section ID: `SECTION_IDS.footer` → `"footer"`
- Background: `#0F0F0D` (Tailwind token `background-deep` — do not use hex literal in JSX)
- Logo: `<Image src={BRAND.logoWhite} alt="LUBU" />` — white version, sourced from `BRAND.logoWhite`
- Tagline: `FOOTER.tagline` ("Run Faster, Play Harder, Recover Smarter.")
- Body copy: `FOOTER.body`
- Nav links: render `NAV_LINKS` from `lib/constants.ts` as the same scroll-to-section buttons used in the Nav (same `scrollIntoView({ behavior: 'smooth' })` pattern on `<button>` elements, not `<a href="#">`)
- Social icons: render `SOCIAL_LINKS` from `lib/constants.ts`; LinkedIn and Instagram — use simple inline SVG or a minimal icon implementation; each opens `href` in `_blank` with `rel="noopener noreferrer"`
- Copyright line: `© {new Date().getFullYear()} LUBU. All rights reserved.` — year must be dynamic via `new Date().getFullYear()`, not hardcoded
- No entrance animation required on footer (static render is acceptable)

---

## Nice-to-Haves

- Subtle divider line or gradient between the Trusted By grid cells and the section background
- Waitlist input field: accent-colored focus ring on focus state
- Footer: thin top border in `surface-subtle` color to visually separate from the Contact section above

---

## User Flows

1. **Waitlist conversion:** Visitor scrolls to Waitlist section → reads invite-only copy → types email → clicks submit → sees "You're on the list." confirmation replacing the form.
2. **Contact inquiry:** Visitor scrolls to Contact section → sees hello@lubu.ai → fills name/subject/email/message → submits → sees confirmation message replacing the form.
3. **Footer nav:** Visitor reaches Footer → uses nav links to jump back to any section → uses social links to open LinkedIn or Instagram in a new tab.

---

## Integration Points

- `lib/constants.ts` — TRUSTED_BY, WAITLIST, CONTACT, FOOTER, BRAND, NAV_LINKS, SOCIAL_LINKS, SECTION_IDS, MOTION — all content and tokens sourced from here; never hardcode strings or hex values in components
- `app/page.tsx` — each new section component is imported and placed in order after the Features section; section IDs come from `SECTION_IDS` constants
- `components/ui/Button.tsx` — reuse existing Button primitive for submit CTAs where consistent with the Button API established in S1
- `public/logos/institutions/` — logo files: `unt_logo.png`, `ucla_logo.png`, `nato_logo.jpeg`, `PoliMi_logo.jpeg`
- `public/brand/LUBU logo - logo white.png` — footer logo asset

---

## File List

Files to create:

```
components/sections/TrustedBy.tsx
components/sections/Waitlist.tsx
components/sections/Contact.tsx
components/sections/Footer.tsx
```

Files to modify:

```
app/page.tsx          — import and compose TrustedBy, Waitlist, Contact, Footer after existing sections
```

Files to read but not modify:

```
lib/constants.ts      — all copy and tokens
components/ui/Button.tsx   — existing Button primitive API
```

---

## Technical Constraints (from CLAUDE.md + S1 retro)

- File config: `next.config.mjs` (not `.ts`) — Next.js 14 only accepts `.js` or `.mjs`
- File paths: no `src/` prefix — all paths are relative to project root (e.g. `components/`, `lib/`, `app/`)
- Static export: `output: 'export'` — no server-side runtime; no `use server`, no API routes, no Node-only APIs
- TypeScript strict mode is on — all props typed, no implicit `any`
- Tailwind brand tokens: `background`, `background-deep`, `accent`, `accent-warm`, `text-muted`, `surface-subtle`, `text-light` — use class names, not hex literals
- Font utilities: `font-display` (Space Grotesk), `font-mono` (Space Mono) — use utility classes
- Framer Motion `useReducedMotion()` must gate all entrance animations — this is a hard requirement per CLAUDE.md and S1 retro
- Scroll pattern: `scrollIntoView({ behavior: 'smooth' })` on `<button>` elements via `useCallback` — not `<a href="#">`
- `next/image` `<Image>` component required for all logo/image rendering — set explicit `width` and `height`; use `sizes` prop for responsive images
- Section IDs: use `SECTION_IDS` constants only; do not define or hardcode new ID strings

---

## Success Criteria

Traceable to OUTCOMES.md:

| Criterion | Outcome |
|---|---|
| TrustedBy, Waitlist, Contact, Footer render at correct scroll positions with correct IDs | O1 |
| All 8 institutions render (4 with logos, 4 text-fallback); logos use next/image | O1 |
| Waitlist email input validates with regex; invalid email shows inline error | O2 |
| Valid waitlist submit shows success state; form unmounts; no API call fires | O2 |
| Contact form validates all fields; invalid state shows inline error | O1 |
| Valid contact submit shows success state; form unmounts; no API call fires | O1 |
| Footer renders BRAND.logoWhite, FOOTER copy, NAV_LINKS, SOCIAL_LINKS, dynamic copyright year | O1 |
| Footer background is `background-deep` (#0F0F0D) | O1 |
| All entrance animations gated by `useReducedMotion()` | O3 |
| `app/page.tsx` composes all 11 sections in order with correct section IDs | O1 |
| `next build` passes with zero TypeScript errors and zero ESLint errors | O1 |
| No strings hardcoded in components — all copy from `lib/constants.ts` | O1 |

---

## Definition of Done

- [ ] `TrustedBy.tsx` renders all 8 institutions; logo/text branching on `src` field; 2-col mobile / 4-col desktop grid
- [ ] `Waitlist.tsx` controlled state, regex validation, success state replaces form, no API call
- [ ] `Contact.tsx` controlled state per field, all-fields-required + email regex validation, success state replaces form, no API call
- [ ] `Footer.tsx` `background-deep` bg, white logo, FOOTER copy, NAV_LINKS scroll buttons, SOCIAL_LINKS with `_blank`, dynamic copyright year
- [ ] `app/page.tsx` updated: TrustedBy, Waitlist, Contact, Footer imported and placed after Features section
- [ ] `next build` exits 0 — no TypeScript errors, no ESLint errors
- [ ] All copy sourced from `lib/constants.ts` — no hardcoded strings in any component
- [ ] All animated components gate on `useReducedMotion()` from Framer Motion
- [ ] All `<Image>` components have explicit `width`, `height`, and `alt` props

---

## Open Questions

- None blocking. If a logo file is missing from `public/logos/institutions/` at runtime, the component should fall back to the text name (same as `src: null` path) — the `src` field in `TRUSTED_BY.institutions` already encodes which institutions have logos vs. text fallback; trust that data.
