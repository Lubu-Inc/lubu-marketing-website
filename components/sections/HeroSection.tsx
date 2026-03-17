'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { HERO, MOTION, SECTION_IDS } from '@/lib/constants'

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  const handleCTAClick = useCallback(() => {
    const target = document.getElementById(HERO.ctaSectionId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const transitionBase = {
    duration: shouldReduceMotion ? 0 : MOTION.duration.slow,
    ease: MOTION.ease.out,
  }

  const initialState = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 }

  const animateState = { opacity: 1, y: 0 }

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-screen bg-background overflow-hidden flex items-center"
      aria-label="Hero"
    >
      {/* Subtle radial glow behind the product image */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 75% 50%, rgba(220,116,72,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column: text ── */}
          <motion.div
            initial={initialState}
            animate={animateState}
            transition={transitionBase}
            className="flex flex-col items-start gap-6 order-2 lg:order-1"
          >
            <h1 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-text-light leading-tight tracking-tight">
              {HERO.headline}
            </h1>

            <motion.p
              initial={initialState}
              animate={animateState}
              transition={{ ...transitionBase, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="font-display text-body-lg text-text-muted max-w-[560px]"
            >
              {HERO.subheadline}
            </motion.p>

            <motion.div
              initial={initialState}
              animate={animateState}
              transition={{ ...transitionBase, delay: shouldReduceMotion ? 0 : 0.4 }}
            >
              <Button variant="primary" size="lg" onClick={handleCTAClick}>
                {HERO.cta}
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right column: image composition ── */}
          <motion.div
            initial={initialState}
            animate={animateState}
            transition={{ ...transitionBase, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            {/* Outer container — establishes stacking context */}
            <div className="relative w-full max-w-[540px] h-[420px] md:h-[540px]">

              {/* Sport context image — lowest layer, 70% opacity */}
              <div className="absolute inset-0 z-10 rounded-lg overflow-hidden">
                <Image
                  src="/images/lubu_sport_1.jpeg"
                  alt="Athlete with LUBU insole"
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Primary insole — mid layer */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <Image
                  src="/images/lubu_insole_main.png"
                  alt="LUBU insole — movement intelligence hardware"
                  width={460}
                  height={340}
                  priority
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Secondary insole accent — top layer, floating offset */}
              <div className="absolute bottom-8 right-0 z-30 w-36 md:w-48">
                <Image
                  src="/images/lubu_insole_secondary.jpg"
                  alt="LUBU insole detail"
                  width={192}
                  height={128}
                  className="object-contain drop-shadow-xl rounded-md"
                />
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
