'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SOCIAL_PROOF, MOTION, SECTION_IDS } from '@/lib/constants'

export default function SocialProofSection() {
  const shouldReduceMotion = useReducedMotion()

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: MOTION.duration.base, ease: MOTION.ease.out },
      }

  return (
    <section
      id={SECTION_IDS.socialProof}
      className="py-12 md:py-16 bg-background"
      aria-label="Social proof — partner logos"
    >
      <motion.div
        {...motionProps}
        className="max-w-6xl mx-auto px-6 lg:px-12"
      >
        {/* Label */}
        <p className="text-center text-text-muted text-sm uppercase tracking-widest font-display mb-8">
          {SOCIAL_PROOF.label}
        </p>

        {/* Logo strip — horizontal scroll on mobile */}
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-8 md:gap-12 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {SOCIAL_PROOF.logos.map((logo) => (
            <div
              key={logo.name}
              className="shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="object-contain h-8 md:h-10 w-auto"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
