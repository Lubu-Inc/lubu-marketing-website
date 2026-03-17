'use client'

import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import { FEATURES, MOTION, SECTION_IDS } from '@/lib/constants'

// Hexagon outline — represents structural complexity / proprietary IP
function HexagonIcon() {
  // 6 vertices of a regular hexagon centered at (16, 16) with radius 13
  const r = 13
  const cx = 16
  const cy = 16
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <polygon points={points} strokeLinejoin="round" />
    </svg>
  )
}

// Shield with checkmark — represents validation / safety
function ShieldCheckIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {/* Shield path */}
      <path
        d="M16 3L5 7.5V16c0 6.075 4.6 10.8 11 13 6.4-2.2 11-6.925 11-13V7.5L16 3z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Checkmark */}
      <path
        d="M11 16l3.5 3.5L21 13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Three concentric arcs — represents data accumulation / compounding intelligence
function ConcentricArcsIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {/* Innermost arc, radius 5 */}
      <path
        d="M9.5 22a9 9 0 0 1 0-12"
        strokeLinecap="round"
      />
      {/* Middle arc, radius 9 */}
      <path
        d="M6 25.5a14 14 0 0 1 0-19"
        strokeLinecap="round"
      />
      {/* Outermost arc, radius 13 */}
      <path
        d="M2.5 29a19 19 0 0 1 0-26"
        strokeLinecap="round"
      />
    </svg>
  )
}

const ICONS = [HexagonIcon, ShieldCheckIcon, ConcentricArcsIcon]

export default function Features() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id={SECTION_IDS.features}
      className="bg-background py-20 md:py-28"
      aria-label="Features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading block */}
        <motion.div
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: MOTION.duration.base, ease: MOTION.ease.out },
                viewport: { once: true },
              })}
          className="max-w-3xl mb-16"
        >
          <h2 className="font-display text-display-md text-text-light mb-4">
            {FEATURES.heading}
          </h2>
          <p className="text-body-lg text-text-muted">
            {FEATURES.subheading}
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.items.map((item, index) => {
            const IconComponent = ICONS[index]
            const cardMotionProps = shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: {
                    duration: MOTION.duration.base,
                    ease: MOTION.ease.out,
                    delay: index * 0.12,
                  },
                  viewport: { once: true },
                }

            return (
              <motion.div
                key={item.title}
                {...cardMotionProps}
                className="bg-background-deep rounded-2xl p-6 md:p-8 border border-surface-subtle/60 border-t-accent hover:border-t-accent/80 hover:border-surface-subtle/80 transition-colors duration-200 flex flex-col"
              >
                {/* Icon — coral color inherited via text-accent */}
                <span className="text-accent block mb-4">
                  <IconComponent />
                </span>

                {/* Title */}
                <h3 className="font-display text-body-lg font-semibold text-text-light mb-3">
                  {item.title}
                </h3>

                {/* Body */}
                <p className="text-body-base text-text-muted leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
