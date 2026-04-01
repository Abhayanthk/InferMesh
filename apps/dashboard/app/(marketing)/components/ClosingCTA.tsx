'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './ClosingCTA.module.css'

export default function ClosingCTA() {
  return (
    <section id="cta-final" className={styles.section} aria-label="Get started">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={styles.orb} 
        aria-hidden="true" 
      />
      <div className={styles.container}>
        <div className={styles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className={styles.eyebrow}>Get Started Today</p>
            <h2 className={styles.headline}>Start Building.</h2>
            <p className={styles.sub}>
              Free to start. No credit card required.<br />
              Join 4.2M+ developers worldwide.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/login" className={styles.btnPrimary}>
                Create Free Account <ArrowRight size={18} style={{ marginLeft: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
