import { MARQUEE_ITEMS, MARQUEE_PREFIX, SECTION_IDS } from '@/lib/constants'

function MarqueeStrip() {
  return (
    <div className="flex items-center gap-0 whitespace-nowrap" aria-hidden="true">
      {/* Prefix label */}
      <span className="font-display text-lg text-text-muted mr-4 shrink-0">
        {MARQUEE_PREFIX}
      </span>

      {/* Items with coral dividers */}
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-4 shrink-0">
          <span className="font-display text-lg text-text-light">{item}</span>
          {i < MARQUEE_ITEMS.length - 1 && (
            <span className="font-display text-lg text-accent select-none">/</span>
          )}
        </span>
      ))}

      {/* Trailing separator before the loop repeats */}
      <span className="font-display text-lg text-accent mx-6 select-none">/</span>
    </div>
  )
}

export default function MarqueeSection() {
  return (
    <section
      id={SECTION_IDS.marquee}
      className="py-5 bg-background-deep overflow-hidden"
      aria-label="Brand marquee"
    >
      {/* The track is 200% wide — two identical copies side-by-side.
          CSS animates translateX(0) → translateX(-50%) for a seamless loop.
          prefers-reduced-motion pauses it (see globals.css). */}
      <div
        className="marquee-track flex will-change-transform"
        style={{ width: 'max-content' }}
      >
        <MarqueeStrip />
        {/* Duplicate for seamless loop */}
        <MarqueeStrip />
      </div>
    </section>
  )
}
