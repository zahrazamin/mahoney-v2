'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const CATEGORIES = [
  {
    label: 'Fans & Cooling',
    sub: 'AC/DC axial & blower fans',
    image: '/images/products/fans-ac-dc.jpg',
    count: '240+ SKUs',
  },
  {
    label: 'Heaters',
    sub: 'Panel & enclosure heaters',
    image: '/images/products/heaters.jpg',
    count: '180+ SKUs',
  },
  {
    label: 'Power Cords',
    sub: 'NEMA, IEC & custom assemblies',
    image: '/images/products/power-cords.jpg',
    count: '320+ SKUs',
  },
  {
    label: 'Distribution Blocks',
    sub: 'Terminal & power distribution',
    image: '/images/products/power-dist-blocks.jpg',
    count: '150+ SKUs',
  },
]

const STATS = [
  { value: '50K+', label: 'Products in stock' },
  { value: '24 hr', label: 'Same-day shipping cutoff' },
  { value: '99.2%', label: 'Order accuracy rate' },
  { value: '30+', label: 'Years of experience' },
]

export default function SecondSection() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderRadius: '24px 24px 0 0',
        marginTop: '-40px',
        minHeight: '100vh',
        boxShadow: '0 -16px 64px rgba(0,0,0,0.18)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          padding: '48px 80px 0',
          marginBottom: '64px',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '32px 24px',
              borderLeft: i > 0 ? '1px solid #E8E4DC' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '42px',
                fontWeight: 700,
                color: '#1C2B1E',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 400,
                color: '#5A5A5A',
                letterSpacing: '0.01em',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Section header */}
      <div
        style={{
          padding: '0 80px',
          marginBottom: '36px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#2D4A30',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            In-stock &amp; ready to ship
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: '48px',
              fontWeight: 700,
              color: '#1C2B1E',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            Shop by Category
          </h2>
        </div>
        <BrowseAllButton />
      </div>

      {/* Category grid */}
      <div
        style={{
          padding: '0 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        {CATEGORIES.map(cat => (
          <CategoryCard key={cat.label} {...cat} />
        ))}
      </div>

      {/* Bottom promo strip */}
      <div
        style={{
          margin: '64px 80px 0',
          backgroundColor: '#1C2B1E',
          borderRadius: '20px',
          padding: '48px 56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#C8E06A',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            No minimum order
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: '36px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              maxWidth: '520px',
            }}
          >
            Can&apos;t find what you need? Our team sources it for you.
          </h3>
        </div>
        <ContactButton />
      </div>
    </div>
  )
}

function CategoryCard({
  label,
  sub,
  image,
  count,
}: {
  label: string
  sub: string
  image: string
  count: string
}) {
  return (
    <a
      href="#"
      style={{
        display: 'block',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        border: '1px solid #E8E4DC',
        textDecoration: 'none',
        transition: 'box-shadow 200ms cubic-bezier(0.23,1,0.32,1), transform 200ms cubic-bezier(0.23,1,0.32,1)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      onMouseDown={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(0.98)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1)' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', backgroundColor: '#F2F0EB' }}>
        <Image
          src={image}
          alt={label}
          fill
          sizes="(max-width: 1400px) 25vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: '20px 22px 22px' }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 600,
            color: '#2D4A30',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}
        >
          {count}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '20px',
            fontWeight: 700,
            color: '#1C2B1E',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            marginBottom: '4px',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: '#5A5A5A',
            lineHeight: 1.4,
          }}
        >
          {sub}
        </div>
      </div>
    </a>
  )
}

function BrowseAllButton() {
  return (
    <a
      href="#"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-sans)',
        fontSize: '14px',
        fontWeight: 600,
        color: '#1C2B1E',
        textDecoration: 'none',
        borderBottom: '1.5px solid #1C2B1E',
        paddingBottom: '2px',
        letterSpacing: '0.01em',
        transition: 'opacity 150ms ease-out',
        whiteSpace: 'nowrap',
        marginBottom: '8px',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
    >
      Browse all categories
      <ArrowRight size={14} strokeWidth={2} />
    </a>
  )
}

function ContactButton() {
  return (
    <a
      href="#"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#C8E06A',
        color: '#1C2B1E',
        borderRadius: '9999px',
        padding: '16px 36px',
        fontFamily: 'var(--font-sans)',
        fontSize: '15px',
        fontWeight: 600,
        textDecoration: 'none',
        letterSpacing: '0.01em',
        transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), opacity 160ms ease-out',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.9' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      Contact our team
      <ArrowRight size={15} strokeWidth={2} />
    </a>
  )
}
