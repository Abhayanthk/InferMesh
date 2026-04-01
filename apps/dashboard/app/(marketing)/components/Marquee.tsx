import styles from './Marquee.module.css'

const providers = [
  'OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral', 'Cohere',
  'Qwen', 'Gemini', 'Llama', 'Grok', 'DeepSeek', 'Perplexity',
]

export default function Marquee() {
  return (
    <section id="marquee" className={styles.marquee} aria-label="Trusted by">
      <div className={styles.wrapper}>
        <p className={styles.label}>Powering apps built on</p>
        <div className={styles.track}>
          <div className={styles.inner} aria-hidden="true">
            {/* Duplicate for seamless infinite loop */}
            {[...providers, ...providers].map((name, i) => (
              <span key={i} className={styles.item}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
