const benefits = [
  {
    icon: '🌿',
    title: 'Natural',
    desc: 'Only the purest ingredients, sourced responsibly from nature.',
  },
  {
    icon: '🔬',
    title: 'Researched',
    desc: 'Every formula backed by clinical studies and peer-reviewed science.',
  },
  {
    icon: '💤',
    title: 'Deep Sleep',
    desc: 'Formulated to support healthy sleep cycles and deep rest.',
  },
  {
    icon: '✓',
    title: 'Reliable',
    desc: 'Consistent results you can count on, batch after batch.',
  },
]

export default function BenefitsBar() {
  return (
    <section style={{
      backgroundColor: '#F7F5F0',
      padding: 'var(--space-16) 0',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 48px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-4xl)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--color-text-dark)',
          textAlign: 'center',
          marginBottom: '48px',
        }}>
          The future of gut health
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
        }}>
          {benefits.map((item) => (
            <div key={item.title} style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                fontSize: '20px',
              }}>
                {item.icon}
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--weight-semibold)',
                color: 'var(--color-text-dark)',
                marginBottom: '8px',
              }}>
                {item.title}
              </div>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--leading-body)',
                maxWidth: '200px',
                margin: '0 auto',
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
