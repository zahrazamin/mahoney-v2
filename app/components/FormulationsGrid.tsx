import Image from 'next/image'

const cards = [
  {
    img: '/images/categories/pexels-odaksan-4225118.jpg',
    tag: 'BALANCE',
    heading: 'Support metabolic balance',
  },
  {
    img: '/images/categories/pexels-delot-18471537.jpg',
    tag: 'IMMUNITY',
    heading: 'Strengthen natural immunity',
  },
  {
    img: '/images/categories/pexels-cmrcn-29988966.jpg',
    tag: 'COGNITIVE',
    heading: 'Promote cognitive health',
  },
]

export default function FormulationsGrid() {
  return (
    <section style={{
      backgroundColor: '#F7F5F0',
      padding: 'var(--space-20) 0',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 48px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-medium)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            FORMULATIONS
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-5xl)',
            fontWeight: 'var(--weight-regular)',
            color: 'var(--color-text-dark)',
            lineHeight: 'var(--leading-tight)',
          }}>
            Science-based formulations
          </h2>
        </div>

        {/* 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {cards.map((card) => (
            <div
              key={card.tag}
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                position: 'relative',
                height: '420px',
                cursor: 'pointer',
              }}
            >
              <Image
                src={card.img}
                alt={card.heading}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
              }} />
              {/* Content */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '28px',
              }}>
                <div style={{
                  display: 'inline-block',
                  marginBottom: '12px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 14px',
                  fontSize: 'var(--text-xs)',
                  color: 'white',
                  letterSpacing: '0.06em',
                }}>
                  {card.tag}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--weight-regular)',
                  color: 'white',
                  lineHeight: 'var(--leading-snug)',
                  marginBottom: '16px',
                }}>
                  {card.heading}
                </h3>
                <a
                  href="#"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--color-accent-lime)',
                    color: 'var(--color-dark-green)',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 20px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--weight-medium)',
                    textDecoration: 'none',
                  }}
                >
                  Shop Now →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
