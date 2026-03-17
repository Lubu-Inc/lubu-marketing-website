'use client'

import { useEffect, useRef, useState } from 'react'
import {
  useMotionValue,
  animate,
  useInView,
  useReducedMotion,
} from 'framer-motion'

interface AnimatedCounterProps {
  value: string
  label: string
}

function parseValue(raw: string): { prefix: string; target: number; suffix: string } {
  // Extract leading non-numeric prefix (none expected, but safe to handle)
  const prefixMatch = raw.match(/^([^0-9]*)/)
  const prefix = prefixMatch ? prefixMatch[1] : ''

  // Extract trailing non-numeric suffix: "B+", "K+", "%"
  const suffixMatch = raw.match(/[0-9]+(?:\.[0-9]+)?(.*)$/)
  const rawSuffix = suffixMatch ? suffixMatch[1] : ''

  // Extract numeric portion
  const numericMatch = raw.match(/[0-9]+(?:\.[0-9]+)?/)
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : 0

  // "120B+" → target=120, suffix="B+"
  // "50K+"  → target=50,  suffix="K+"
  // "95%"   → target=95,  suffix="%"
  return { prefix, target: numeric, suffix: rawSuffix }
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const { prefix, target, suffix } = parseValue(value)

  const motionValue = useMotionValue(shouldReduceMotion ? target : 0)
  const [displayNum, setDisplayNum] = useState(
    shouldReduceMotion ? target : 0
  )

  useEffect(() => {
    // Keep React state in sync with the MotionValue for display
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayNum(Math.round(latest))
    })
    return unsubscribe
  }, [motionValue])

  useEffect(() => {
    if (shouldReduceMotion) {
      motionValue.set(target)
      setDisplayNum(target)
      return
    }
    if (isInView) {
      const controls = animate(motionValue, target, {
        duration: 1.8,
        ease: 'easeOut',
      })
      return () => controls.stop()
    }
  }, [isInView, motionValue, target, shouldReduceMotion])

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="font-mono text-4xl md:text-5xl font-bold text-accent leading-none">
        {prefix}
        {displayNum}
        {suffix}
      </div>
      <p className="font-display text-sm md:text-body-base text-text-muted mt-3 max-w-[160px]">
        {label}
      </p>
    </div>
  )
}
