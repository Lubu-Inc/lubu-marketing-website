'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { STATS, SECTION_IDS } from '@/lib/constants'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function StatsSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id={SECTION_IDS.stats}
      className="py-16 md:py-24 bg-background-deep"
      aria-label="Key statistics"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: 'easeOut', delay: index * 0.1 }
              }
              className="flex flex-col items-center text-center"
            >
              {/* Thin top separator line — nice-to-have design detail */}
              <div className="w-full border-t border-surface-subtle mb-4" />

              <AnimatedCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
