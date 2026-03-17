'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import { ABOUT, MOTION, SECTION_IDS } from '@/lib/constants'

// Partial star: fills the star path to 80% via a linearGradient clip
function StarIcon({ partial = false }: { partial?: boolean }) {
  const id = partial ? 'partialStarGrad' : undefined
  const fill = partial ? 'url(#partialStarGrad)' : 'currentColor'

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {partial && (
        <defs>
          <linearGradient id="partialStarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="80%" stopColor="#DC7448" />
            <stop offset="80%" stopColor="#747470" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M10 1.5l2.472 5.01 5.528.804-4 3.898.944 5.505L10 14.26l-4.944 2.457.944-5.505-4-3.898 5.528-.803L10 1.5z"
        fill={fill}
        stroke="none"
      />
    </svg>
  )
}

export default function About() {
  const shouldReduceMotion = useReducedMotion()

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        transition: {
          duration: MOTION.duration.slow,
          ease: MOTION.ease.out,
        },
        viewport: { once: true },
      }

  return (
    <section
      id={SECTION_IDS.about}
      className="bg-background py-20 md:py-28"
      aria-label="About"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: copy + rating */}
          <motion.div {...motionProps} className="flex flex-col gap-6">
            <p className="text-body-lg text-text-light leading-relaxed">
              {ABOUT.bodyCopy[0]}
            </p>
            <p className="text-body-lg text-text-muted leading-relaxed">
              {ABOUT.bodyCopy[1]}
            </p>

            {/* 4.8 star rating callout */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-accent" aria-hidden="true">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon partial />
              </div>
              <span className="font-mono text-label uppercase tracking-widest text-text-muted">
                {ABOUT.rating}&nbsp;{ABOUT.ratingLabel}
              </span>
            </div>
          </motion.div>

          {/* Right: product image — shown below copy on mobile */}
          <motion.div
            {...motionProps}
            className="flex items-center justify-center order-last md:order-none"
          >
            <Image
              src="/images/lubu_insole_main.png"
              alt="LUBU insole device"
              width={560}
              height={420}
              className="w-full max-w-md md:max-w-full object-contain rounded-xl"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
