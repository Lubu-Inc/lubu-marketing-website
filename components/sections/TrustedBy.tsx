'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { TRUSTED_BY, TRUSTED_BY_HEADING, SECTION_IDS, MOTION } from '@/lib/constants'

export default function TrustedBy() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.base,
        ease: MOTION.ease.out,
      },
    },
  }

  return (
    <section
      id={SECTION_IDS.trustedBy}
      className="py-20 px-6 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.p
          className="text-label uppercase tracking-widest text-text-muted text-center mb-12"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: MOTION.duration.base,
            ease: MOTION.ease.out,
          }}
        >
          {TRUSTED_BY_HEADING}
        </motion.p>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {TRUSTED_BY.institutions.map((institution) => (
            <motion.div
              key={institution.name}
              variants={itemVariants}
              className="flex items-center justify-center h-20 rounded-sm border border-surface-subtle/30 bg-background-deep/40 px-4"
            >
              {institution.src !== null ? (
                <Image
                  src={institution.src}
                  alt={institution.name}
                  width={120}
                  height={48}
                  className="object-contain h-12 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              ) : (
                <span className="text-body-sm text-text-muted font-display text-center leading-tight px-2 border border-surface-subtle/40 rounded-sm py-1.5 w-full">
                  {institution.name}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
