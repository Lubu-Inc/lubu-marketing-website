'use client'

import { useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import { COMPARISON, MOTION, SECTION_IDS } from '@/lib/constants'

export default function Comparison() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToWaitlist = useCallback(() => {
    const el = document.getElementById(COMPARISON.ctaSectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      id={SECTION_IDS.comparison}
      className="bg-background-deep py-20 md:py-28"
      aria-label="Comparison"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.h2
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: MOTION.duration.base, ease: MOTION.ease.out },
                viewport: { once: true },
              })}
          className="font-display text-display-md text-text-light mb-12 text-center"
        >
          {COMPARISON.heading}
        </motion.h2>

        {/* Comparison grid */}
        <div className="rounded-2xl overflow-hidden border border-surface-subtle/40">
          {/* Header row */}
          <div className="grid grid-cols-2">
            <div className="px-6 py-4 text-text-muted font-display text-label uppercase tracking-widest bg-background-deep border-b border-surface-subtle/40">
              Other Wearables
            </div>
            <div className="px-6 py-4 text-accent font-display text-label uppercase tracking-widest font-semibold bg-accent/5 border-b border-surface-subtle/40 border-l border-surface-subtle/40">
              LUBU
            </div>
          </div>

          {/* Data rows */}
          {COMPARISON.rows.map((row, index) => {
            const rowMotionProps = shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, x: -16 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: {
                    duration: MOTION.duration.base,
                    ease: MOTION.ease.out,
                    delay: index * 0.07,
                  },
                  viewport: { once: true },
                }

            return (
              <motion.div
                key={index}
                {...rowMotionProps}
                className="grid grid-cols-2 border-b border-surface-subtle/40 last:border-b-0 hover:bg-surface-subtle/20 transition-colors duration-200"
              >
                {/* Other column */}
                <div className="px-6 py-4 text-text-muted text-body-sm">
                  {row.other}
                </div>
                {/* LUBU column */}
                <div className="px-6 py-4 text-text-light text-body-sm bg-accent/5 border-l border-surface-subtle border-l-accent/30">
                  {row.lubu}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={scrollToWaitlist}
            className="inline-flex items-center justify-center font-medium rounded-sm px-8 py-4 text-body-lg bg-accent text-text-light border border-accent hover:bg-accent-warm hover:border-accent-warm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background-deep"
          >
            {COMPARISON.cta}
          </button>
        </div>
      </div>
    </section>
  )
}
