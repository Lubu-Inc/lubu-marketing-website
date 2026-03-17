import Nav from '@/components/nav/Nav'

// S1: Shell page — all 11 section placeholders with canonical IDs.
// S2/S3/S4 will replace the empty sections with full content components.
// Do NOT change section IDs — they are the scroll contract with Nav.

export default function Home() {
  return (
    <main>
      <Nav />

      {/* 1. Hero */}
      <section
        id="hero"
        className="min-h-screen bg-background-deep"
        aria-label="Hero"
      />

      {/* 2. Marquee */}
      <section
        id="marquee"
        className="min-h-[120px] bg-background"
        aria-label="Marquee"
      />

      {/* 3. Social Proof */}
      <section
        id="social-proof"
        className="min-h-[200px] bg-background"
        aria-label="Social Proof"
      />

      {/* 4. Stats */}
      <section
        id="stats"
        className="min-h-[200px] bg-background-deep"
        aria-label="Stats"
      />

      {/* 5. About */}
      <section
        id="about"
        className="min-h-screen bg-background"
        aria-label="About"
      />

      {/* 6. Comparison */}
      <section
        id="comparison"
        className="min-h-screen bg-background-deep"
        aria-label="Comparison"
      />

      {/* 7. Features */}
      <section
        id="features"
        className="min-h-screen bg-background"
        aria-label="Features"
      />

      {/* 8. Trusted By */}
      <section
        id="trusted-by"
        className="min-h-[300px] bg-background-deep"
        aria-label="Trusted By"
      />

      {/* 9. Waitlist */}
      <section
        id="waitlist"
        className="min-h-[400px] bg-background"
        aria-label="Join Waitlist"
      />

      {/* 10. Contact */}
      <section
        id="contact"
        className="min-h-[400px] bg-background-deep"
        aria-label="Contact"
      />

      {/* 11. Footer */}
      <footer
        id="footer"
        className="bg-background"
        aria-label="Footer"
      />
    </main>
  )
}
