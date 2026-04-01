'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Pricing.module.css'

const freePlan = {
  tier: 'Free',
  price: '$0',
  priceSuffix: '/mo',
  desc: 'Perfect to get started',
  features: [
    'Access to free-tier models',
    '10 requests per minute',
    'Community support',
    'Basic analytics dashboard',
  ],
  cta: 'Get Started',
  ctaHref: '/login',
  popular: false,
}

const proPlan = {
  tier: 'Pro',
  price: 'Pay as you go',
  priceSuffix: '',
  desc: 'For serious builders',
  features: [
    'All 300+ models unlocked',
    'Priority routing and failover',
    'Full analytics dashboard',
    'Streaming support',
    'Email support',
  ],
  cta: 'Start Building',
  ctaHref: '/login',
  popular: true,
}

const enterprisePlan = {
  tier: 'Enterprise',
  price: 'Custom',
  priceSuffix: '',
  desc: 'For teams and organizations',
  features: [
    'Everything in Pro',
    'Dedicated infrastructure',
    '99.9% SLA guarantee',
    'SSO and team management',
    'Data residency options',
    'Dedicated account support',
  ],
  cta: 'Contact Us',
  ctaHref: 'mailto:hello@openrouterclone.ai',
  popular: false,
}

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <section id="pricing" className={styles.section} aria-label="Pricing">
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.eyebrow}>Pricing</p>
          <h2 className={styles.title}>Transparent. Simple. Fair.</h2>
          <p className={styles.subtitle}>
            Pay only for what you use. No monthly fees. No surprises.
          </p>

          {/* Billing toggle */}
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${billing === 'monthly' ? styles.toggleActive : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`${styles.toggleBtn} ${billing === 'annual' ? styles.toggleActive : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual
              <span className={styles.saveBadge}>Save 20%</span>
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {/* FREE */}
          <div className={styles.card}>
            <div className={styles.tier}>{freePlan.tier}</div>
            <div className={styles.price}>
              {freePlan.price}
              {freePlan.priceSuffix && (
                <span className={styles.priceSuffix}>{freePlan.priceSuffix}</span>
              )}
            </div>
            <div className={styles.desc}>{freePlan.desc}</div>
            <div className={styles.divider} />
            <ul className={styles.features}>
              {freePlan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <Link href={freePlan.ctaHref} className={`${styles.cta} ${styles.ctaGhost}`}>
              {freePlan.cta}
            </Link>
          </div>

          {/* PRO */}
          <div className={`${styles.card} ${styles.cardPopular}`}>
            <span className={styles.popularBadge}>Most Popular</span>
            <div className={styles.tier}>{proPlan.tier}</div>
            <div className={`${styles.price} ${styles.priceSmall}`}>{proPlan.price}</div>
            <div className={styles.desc}>{proPlan.desc}</div>
            <div className={styles.divider} />
            <ul className={styles.features}>
              {proPlan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <Link href={proPlan.ctaHref} className={`${styles.cta} ${styles.ctaPrimary}`}>
              {proPlan.cta}
            </Link>
          </div>

          {/* ENTERPRISE */}
          <div className={styles.card}>
            <div className={styles.tier}>{enterprisePlan.tier}</div>
            <div className={styles.price}>{enterprisePlan.price}</div>
            <div className={styles.desc}>{enterprisePlan.desc}</div>
            <div className={styles.divider} />
            <ul className={styles.features}>
              {enterprisePlan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a href={enterprisePlan.ctaHref} className={`${styles.cta} ${styles.ctaGhost}`}>
              {enterprisePlan.cta}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
