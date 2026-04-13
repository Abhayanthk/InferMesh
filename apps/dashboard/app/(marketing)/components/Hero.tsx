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
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
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
        initial={{ opacity: 0, scale: 0.8, x: -100, y: -100 }}
        animate={{ 
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.2, 1],
          x: [-50, 0, -50],
          y: [-50, 50, -50]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={styles.orb1} 
        aria-hidden="true" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
        animate={{ 
          opacity: [0.08, 0.18, 0.08],
          scale: [1, 1.3, 1],
          x: [50, -50, 50],
          y: [100, -100, 100]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "block"
              }}
            >
              One API.
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f43f5e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "block"
              }}
            >
              Every Model.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.sub}>
            Access 300+ LLMs — GPT, Claude, Gemini, Llama, Mistral and more
            — through a single OpenAI-compatible endpoint. Switch models
            without changing your code.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.btns}>
            <Link href="/workspace/api-keys" className={styles.btnPrimary}>
              Start Building Free
            </Link>
            <a href="#models" className={styles.btnGhost}>
              Browse Models
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.stats}>
            <div className={styles.statItem}>
              <motion.div 
                animate={started ? { scale: [1, 1.1, 1] } : {}}
                className={styles.statNum}
              >
                {started ? `${models}+` : '0'}
              </motion.div>
              <div className={styles.statLabel}>Models Available</div>
            </div>
            <div className={styles.statItem}>
              <motion.div 
                animate={started ? { scale: [1, 1.1, 1] } : {}}
                className={styles.statNum}
              >
                {started ? `${(devs / 1000).toFixed(1)}M+` : '0'}
              </motion.div>
              <div className={styles.statLabel}>Developers</div>
            </div>
            <div className={`${styles.statItem} ${styles.statLast}`}>
              <div className={styles.statNum}>$0</div>
              <div className={styles.statLabel}>To Start</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — IDE card ── */}
        <motion.div 
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className={styles.right} 
          aria-hidden="true"
        >
          <div className={styles.ideContainer}>
            <div className={styles.ideHeader}>
              <div className={styles.macDots}>
                <span className={`${styles.dot} ${styles.dotRed}`}   />
                <span className={`${styles.dot} ${styles.dotYellow}`}/>
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.ideTabs}>
                <div className={`${styles.ideTab} ${styles.ideTabActive}`}>fetch_model.ts</div>
                <div className={styles.ideTab}>package.json</div>
              </div>
            </div>
            
            <div className={styles.ideLayout}>
              <div className={styles.ideSidebar}>
                <div className={styles.ideSidebarTitle}>EXPLORER</div>
                <div className={styles.ideFileActive}>
                  <span className={styles.fileIcon}>TS</span> fetch_model.ts
                </div>
                <div className={styles.ideFile}>
                  <span className={styles.fileIcon}>{}</span> package.json
                </div>
                <div className={styles.ideFile}>
                  <span className={styles.fileIconEnv}>.env</span> .env.local
                </div>
              </div>
              
              <div className={styles.ideContent}>
                <div className={styles.ideCode}>
                  <pre>
                    <span className={styles.tokenComment}>// Switch any model instantly</span>
                    <br />
                    <span className={styles.tokenKeyword}>const</span> <span className={styles.tokenVar}>response</span> <span className={styles.tokenOperator}>=</span> <span className={styles.tokenKeyword}>await</span> <span className={styles.tokenObj}>client</span>.<span className={styles.tokenProp}>chat</span>.<span className={styles.tokenProp}>completions</span>.<span className={styles.tokenMethod}>create</span>(<span className={styles.tokenOperator}>{"{"}</span>
                    <br />
                    {"  "}<span className={styles.tokenProp}>model</span>: <span className={styles.tokenString}>"claude-sonnet-4-6"</span>,
                    <br />
                    {"  "}<span className={styles.tokenProp}>messages</span>: [
                    <br />
                    {"    "}<span className={styles.tokenOperator}>{"{"}</span> <span className={styles.tokenProp}>role</span>: <span className={styles.tokenString}>"user"</span>, <span className={styles.tokenProp}>content</span>: <span className={styles.tokenString}>"Explain quantum computing"</span> <span className={styles.tokenOperator}>{"}"}</span>
                    <br />
                    {"  "}]
                    <br />
                    <span className={styles.tokenOperator}>{"}"}</span>);
                  </pre>
                </div>
                
                <div className={styles.ideOutput}>
                  <div className={styles.ideOutputHeader}>
                    <span>TERMINAL</span>
                    <div className={styles.liveIndicator}>
                      <span className={styles.liveDot} />
                      <span>Live · 0.4s latency</span>
                    </div>
                  </div>
                  <pre className={styles.ideOutputText}>
                    <span className={styles.tokenSuccess}>✓ Response received</span>
                    <br />
                    {'{'}
                    <br />
                    {'  "model": "claude-sonnet-4-6",'}
                    <br />
                    {'  "tokens_used": 142,'}
                    <br />
                    {'  "status": "success"'}
                    <br />
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
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
