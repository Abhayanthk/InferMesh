'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
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

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export default function Hero() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const models = useCounter(300, 2000, started)
  const devs   = useCounter(4200, 2200, started) // -> "4.2M+"

  const scrollToNext = () => {
    document.getElementById('marquee')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      {/* Orbs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className={styles.orb1} 
        aria-hidden="true" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        className={styles.orb2} 
        aria-hidden="true" 
      />

      <div className={styles.inner}>
        {/* ── LEFT COLUMN ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.left}
        >
          <motion.p variants={itemVariants} className={styles.eyebrow}>The Universal AI Gateway</motion.p>

          <motion.h1 variants={itemVariants} className={styles.headline}>
            <span>One API.</span>
            <span>Every Model.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.sub}>
            Access 300+ LLMs — GPT, Claude, Gemini, Llama, Mistral and more
            — through a single OpenAI-compatible endpoint. Switch models
            without changing your code.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.btns}>
            <Link href="/login" className={styles.btnPrimary}>
              Start Building Free
            </Link>
            <a href="#models" className={styles.btnGhost}>
              Browse Models
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.stats}>
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
            <div className={`${styles.statItem} ${styles.statLast}`}>
              <div className={styles.statNum}>$0</div>
              <div className={styles.statLabel}>To Start</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — floating terminal card ── */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className={styles.right} 
          aria-hidden="true"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className={styles.terminalCard}
          >
            {/* mac dots */}
            <div className={styles.terminalBar}>
              <span className={`${styles.dot} ${styles.dotRed}`}   />
              <span className={`${styles.dot} ${styles.dotYellow}`}/>
              <span className={`${styles.dot} ${styles.dotGreen}`} />
            </div>

            <pre className={styles.code}>{`// Switch any model instantly
const response = await client
  .chat.completions.create({
    model: "claude-sonnet-4-6",
    messages: [...]
  })

// Response received: OK
{
  "model": "claude-sonnet-4-6",
  "tokens": 142,
  "latency": "0.4s"
}`}</pre>

            <div className={styles.terminalFooter}>
              <span className={styles.liveDot} />
              <span className={styles.liveText}>Live · 0.4s response time</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <ChevronDown className={styles.scrollChevron} size={20} />
      </motion.button>
    </section>
  )
}
