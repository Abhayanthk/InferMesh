'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './Hero.module.css'

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function useCounter(target: number, duration = 2000, start = true) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.floor(easeOut(progress) * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return value
}

export default function Hero() {
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const models = useCounter(300, 2000, started)
  const devs = useCounter(4200, 2200, started)   // in thousands → shown as "4.2M+"

  const scrollToNext = () => {
    const next = document.getElementById('marquee')
    next?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>The Universal AI Gateway</p>

        <h1 className={styles.headline}>
          <span>One API.</span>
          <span>Every Model.</span>
        </h1>

        <p className={styles.sub}>
          Access 300+ LLMs — GPT, Claude, Gemini, Llama, Mistral and more
          — through a single OpenAI-compatible endpoint. Switch models
          without changing your code.
        </p>

        <div className={styles.btns}>
          <Link href="/login" className={styles.btnPrimary}>
            Start Building Free
          </Link>
          <a href="#models" className={styles.btnGhost}>
            Browse Models
          </a>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNum}>{started ? `${models}+` : '0'}</div>
            <div className={styles.statLabel}>Models Available</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>
              {started ? `${(devs / 1000).toFixed(1)}M+` : '0'}
            </div>
            <div className={styles.statLabel}>Developers</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>$0</div>
            <div className={styles.statLabel}>To Start</div>
          </div>
        </div>
      </div>

      <button className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll to next section">
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollChevron}>↓</span>
      </button>
    </section>
  )
}
