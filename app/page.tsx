import Nav from '@/components/nav/Nav'
import HeroSection from '@/components/sections/HeroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import StatsSection from '@/components/sections/StatsSection'
import About from '@/components/sections/About'
import Comparison from '@/components/sections/Comparison'
import Features from '@/components/sections/Features'
import TrustedBy from '@/components/sections/TrustedBy'
import Waitlist from '@/components/sections/Waitlist'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <MarqueeSection />
      <SocialProofSection />
      <StatsSection />
      <About />
      <Comparison />
      <Features />
      <TrustedBy />
      <Waitlist />
      <Contact />
      <Footer />
    </main>
  )
}
