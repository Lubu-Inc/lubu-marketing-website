'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { BRAND, FOOTER, NAV_LINKS, SOCIAL_LINKS, SECTION_IDS } from '@/lib/constants'

// ─── LinkedIn SVG ─────────────────────────────────────────────────────────────
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ─── Instagram SVG ────────────────────────────────────────────────────────────
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
} as const

export default function Footer() {
  const scrollTo = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <footer
      id={SECTION_IDS.footer}
      className="bg-background-deep border-t border-surface-subtle/20"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-5">
            <Image
              src={BRAND.logoWhite}
              alt={BRAND.name}
              width={100}
              height={32}
              className="object-contain w-auto h-8"
            />
            <p className="text-body-base font-display text-accent font-medium leading-snug">
              {FOOTER.tagline}
            </p>
            <p className="text-body-sm text-text-muted leading-relaxed">
              {FOOTER.body}
            </p>
          </div>

          {/* ── Nav column ── */}
          <div className="flex flex-col gap-3">
            <p className="text-label uppercase tracking-widest text-text-muted mb-2">
              Navigate
            </p>
            {NAV_LINKS.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                onClick={() => scrollTo(link.sectionId)}
                className="text-body-sm text-text-muted hover:text-text-light text-left transition-colors duration-200 w-fit"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── Social column ── */}
          <div className="flex flex-col gap-5">
            <p className="text-label uppercase tracking-widest text-text-muted">
              Connect
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICON_MAP[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-surface-subtle/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-body-sm text-text-muted">
            &copy; {new Date().getFullYear()} LUBU. All rights reserved.
          </p>
          <p className="text-body-sm text-text-muted">
            {BRAND.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
