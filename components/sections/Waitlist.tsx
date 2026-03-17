'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { WAITLIST, SECTION_IDS, MOTION } from '@/lib/constants'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Waitlist() {
  const shouldReduceMotion = useReducedMotion()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.duration.slow,
        ease: MOTION.ease.out,
      },
    },
  }

  return (
    <section
      id={SECTION_IDS.waitlist}
      className="py-28 px-6 bg-background-deep"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center gap-5">
              {/* Checkmark SVG */}
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 border border-accent/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-accent"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p className="text-display-md font-display text-text-light">
                {WAITLIST.successMessage}
              </p>
              <p className="text-body-base text-text-muted">
                We&apos;ll reach out when your spot is ready.
              </p>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <p className="text-label uppercase tracking-widest text-accent mb-4">
                Join the Waitlist
              </p>
              <h2 className="text-display-md font-display text-text-light mb-4">
                {WAITLIST.heading}
              </h2>
              <p className="text-body-lg text-text-muted mb-10">
                {WAITLIST.subheading}
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <div className="flex-1 min-w-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder={WAITLIST.placeholder}
                    aria-label="Email address"
                    aria-describedby={error ? 'waitlist-error' : undefined}
                    className={[
                      'w-full px-4 py-3 rounded-sm',
                      'bg-background border text-text-light placeholder:text-text-muted',
                      'text-body-base font-display',
                      'outline-none transition-all duration-200',
                      error
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/40'
                        : 'border-surface-subtle focus:border-accent focus:ring-2 focus:ring-accent/30',
                    ].join(' ')}
                  />
                </div>
                <Button type="submit" variant="primary" size="md">
                  {WAITLIST.cta}
                </Button>
              </form>

              {error && (
                <p
                  id="waitlist-error"
                  role="alert"
                  className="mt-3 text-body-sm text-red-400 text-left sm:text-center"
                >
                  {error}
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
