'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { CONTACT, BRAND, SECTION_IDS, MOTION } from '@/lib/constants'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormState {
  name: string
  subject: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  subject?: string
  email?: string
  message?: string
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()

  const [form, setForm] = useState<FormState>({
    name: '',
    subject: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.subject.trim()) next.subject = 'Subject is required.'
    if (!form.email.trim()) {
      next.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) next.message = 'Message is required.'
    return next
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    setErrors({})
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

  const inputBase = [
    'w-full px-4 py-3 rounded-sm',
    'bg-background border text-text-light placeholder:text-text-muted',
    'text-body-base font-display',
    'outline-none transition-all duration-200',
  ].join(' ')

  const inputValid = 'border-surface-subtle focus:border-accent focus:ring-2 focus:ring-accent/30'
  const inputError = 'border-red-500 focus:ring-2 focus:ring-red-500/40'

  return (
    <section
      id={SECTION_IDS.contact}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Label */}
          <p className="text-label uppercase tracking-widest text-text-muted mb-4 text-center">
            Contact
          </p>

          {/* Direct email link */}
          <p className="text-body-base text-text-muted text-center mb-10">
            Reach us directly at{' '}
            <a
              href={`mailto:${BRAND.email}`}
              className="text-accent hover:text-accent-warm transition-colors duration-200 underline underline-offset-2"
            >
              {CONTACT.email}
            </a>
          </p>

          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center gap-5 py-8">
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
              <p className="text-display-md font-display text-text-light text-center">
                {CONTACT.successMessage}
              </p>
            </div>
          ) : (
            /* ── Form state ── */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  className={`${inputBase} ${errors.name ? inputError : inputValid}`}
                />
                {errors.name && (
                  <p id="error-name" role="alert" className="mt-1.5 text-body-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  className={`${inputBase} ${errors.subject ? inputError : inputValid}`}
                />
                {errors.subject && (
                  <p id="error-subject" role="alert" className="mt-1.5 text-body-sm text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  className={`${inputBase} ${errors.email ? inputError : inputValid}`}
                />
                {errors.email && (
                  <p id="error-email" role="alert" className="mt-1.5 text-body-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={`${inputBase} resize-y min-h-[7rem] ${errors.message ? inputError : inputValid}`}
                />
                {errors.message && (
                  <p id="error-message" role="alert" className="mt-1.5 text-body-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" variant="primary" size="md" className="self-start">
                Send Message
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
