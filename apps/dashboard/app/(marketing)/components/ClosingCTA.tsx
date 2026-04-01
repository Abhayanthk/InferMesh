import Link from 'next/link'
import styles from './ClosingCTA.module.css'

export default function ClosingCTA() {
  return (
    <section id="cta-final" className={styles.section} aria-label="Get started">
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Get Started Today</p>
          <h2 className={styles.headline}>Start Building.</h2>
          <p className={styles.sub}>
            Free to start. No credit card required.<br />
            Join 4.2M+ developers worldwide.
          </p>
          <Link href="/login" className={styles.btnPrimary}>
            Create Free Account →
          </Link>
        </div>
      </div>
    </section>
  )
}
