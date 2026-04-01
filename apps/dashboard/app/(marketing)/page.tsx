'use client'

import GrainOverlay from './components/GrainOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import HowItWorks from './components/HowItWorks'
import ModelGrid from './components/ModelGrid'
import CodeBlock from './components/CodeBlock'
import Features from './components/Features'
import Pricing from './components/Pricing'
import ClosingCTA from './components/ClosingCTA'
import Footer from './components/Footer'
import styles from './landing.module.css'

export default function LandingPage() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <ModelGrid />
        <CodeBlock />
        <Features />
        <Pricing />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
