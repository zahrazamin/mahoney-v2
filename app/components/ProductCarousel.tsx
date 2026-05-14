'use client'

import { useState } from 'react'
import Image from 'next/image'

const products = [
  {
    img: '/images/products/img-AMU1084CCL-300x300.jpg',
    name: 'Daily Balance',
    price: '$42.00',
  },
  {
    img: '/images/products/img-m_22003008ul.jpg',
    name: 'Gut Shield',
    price: '$38.00',
  },
  {
    img: '/images/products/Rectangle 11.png',
    name: 'Skin Radiance',
    price: '$45.00',
  },
  {
    img: '/images/products/heaters.jpg',
    name: 'Sleep Formula',
    price: '$36.00',
  },
]

function CartSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function ArrowBtn({ children, onHoverIn, onHoverOut }: { children: React.ReactNode; onHoverIn: () => void; onHoverOut: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => { setHovered(true); onHoverIn() }}
      onMouseLeave={() => { setHovered(false); onHoverOut() }}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid #E8E4DC',
        backgroundColor: hovered ? '#1C2B1E' : 'white',
        color: hovered ? 'white' : '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 150ms ease, color 150ms ease',
      }}
    >
      {children}
    </button>
  )
}

export default function ProductCarousel() {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'newarrivals'>('bestsellers')

  return (
    <section style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '28px 28px 0 0',
      marginTop: '-28px',
      position: 'relative',
      zIndex: 10,
      padding: '48px 48px 64px 48px',
    }}>
      {/* Top row: heading + tabs */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.25rem',
          fontWeight: 400,
          color: '#1A1A1A',
          lineHeight: 1.2,
        }}>
          Find your supplement
        </h2>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {(['bestsellers', 'newarrivals'] as const).map((tab) => {
            const label = tab === 'bestsellers' ? 'Best Sellers' : 'New Arrivals'
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 'var(--weight-semibold)' : 'var(--weight-regular)',
                  color: isActive ? '#1A1A1A' : '#5A5A5A',
                  paddingBottom: '2px',
                  backgroundColor: 'transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: isActive ? '2px solid #1A1A1A' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Product cards row */}
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {products.map((product) => (
          <div
            key={product.name}
            style={{
              backgroundColor: '#F7F5F0',
              borderRadius: '20px',
              overflow: 'hidden',
              width: 'calc(25% - 12px)',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {/* Image area */}
            <div style={{
              backgroundColor: '#F7F5F0',
              height: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              position: 'relative',
            }}>
              <Image
                src={product.img}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'contain', padding: '32px' }}
              />
            </div>

            {/* Content area */}
            <div style={{ padding: '0 16px 60px 16px', backgroundColor: '#F7F5F0' }}>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: '#5A5A5A',
                marginBottom: '4px',
              }}>Vitamin</div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                fontWeight: 400,
                color: '#1A1A1A',
                marginBottom: '4px',
              }}>{product.name}</div>
              <div style={{
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--weight-regular)',
                color: '#1A1A1A',
              }}>{product.price}</div>
            </div>

            {/* Cart button — bottom left */}
            <button style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#1C2B1E',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
            }}>
              <CartSVG />
            </button>

            {/* Cart button — bottom right */}
            <button style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#1C2B1E',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
            }}>
              <CartSVG />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom navigation: dots left, arrows right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
        {/* Dot pagination */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: i === 0 ? '20px' : '6px',
              height: '6px',
              borderRadius: '9999px',
              backgroundColor: i === 0 ? '#1A1A1A' : '#E8E4DC',
              transition: 'width 250ms ease',
            }} />
          ))}
        </div>

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <ArrowBtn onHoverIn={() => {}} onHoverOut={() => {}}>‹</ArrowBtn>
          <ArrowBtn onHoverIn={() => {}} onHoverOut={() => {}}>›</ArrowBtn>
        </div>
      </div>
    </section>
  )
}
