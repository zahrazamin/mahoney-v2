'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const WORDS = ['Backorders', 'Sourcing Delays', 'Out-of-Stocks', 'Missing Components', 'Lead Times']
const TYPE_MS   = 80
const DELETE_MS = 45
const PAUSE_TYPED   = 1500
const PAUSE_DELETED = 320

const PRODUCT = {
  sku: 'DMRBA',
  name: 'AC RECEPTACLES',
  description: 'Altech Receptacle, Black, 15A/250VAC IP54 DIN Rail',
  brand: 'Altech Corp.',
  image: '/images/products/product-1.png',
}

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100.5vh',
        minHeight: '640px',
        overflow: 'hidden',
        backgroundColor: '#162518',
      }}
    >
      {/* Left panel */}
      <div style={{ position: 'absolute', inset: 0, right: '50%', overflow: 'hidden' }}>
        <Image
          src="/images/banners/banner-1.png"
          alt=""
          fill
          sizes="50vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to right, #4E604000 50%, #4E6040 100%)',
            pointerEvents: 'none' 
          }} 
        />
      </div>

      {/* Right panel */}
      <div style={{ position: 'absolute', inset: 0, left: '50%', overflow: 'hidden', backgroundColor: '#162518' }}>
        <Image
          src="/images/banners/banner-3.png"
          alt=""
          fill
          sizes="50vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          padding: '0 32px',
          paddingTop: '32px',
          marginTop: '-80px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '64px',
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: '32px',
            maxWidth: '900px',
            letterSpacing: '-0.01em',
          }}
        >
          Stop Waiting on <TypewriterWord />.
          <br />
          Mahoney got you covered!
        </h1>

        <ShopNowButton />
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '64px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          zIndex: 3,
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: '#ffffff', letterSpacing: '0.04em' }}>
          1 / 3
        </span>
        <div style={{ width: '120px', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <SlideArrow Icon={ChevronLeft} label="Previous" />
          <SlideArrow Icon={ChevronRight} label="Next" />
        </div>
      </div>

      <ProductCard />
      <CallNowCard />
    </section>
  )
}

function ShopNowButton() {
  return (
    <a
      href="#"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#AAD576',
        color: '#162518',
        borderRadius: '9999px',
        padding: '16px 40px',
        fontFamily: 'var(--font-sans)',
        fontSize: '16px',
        fontWeight: 600,
        textDecoration: 'none',
        letterSpacing: '0.02em',
        transition: 'transform 160ms ease-out, box-shadow 160ms ease-out, opacity 160ms ease-out',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.92' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      Shop Now
    </a>
  )
}

function SlideArrow({ Icon, label }: { Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; label: string }) {
  return (
    <button
      aria-label={label}
      style={{
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '32px', height: '32px', borderRadius: '6px',
        transition: 'color 150ms ease-out, background 150ms ease-out, transform 160ms ease-out',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent' }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.9)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      <Icon size={17} strokeWidth={2} />
    </button>
  )
}

function ProductCard() {
  return (
    <div
      style={{
        position: 'absolute', bottom: '72px', right: '48px', width: '500px',
        backgroundColor: 'rgba(255, 255, 255, 0.14)', backdropFilter: 'blur(34px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '18px', padding: '22px', display: 'flex', gap: '22px',
        zIndex: 3, boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{ width: '160px', alignSelf: 'stretch', borderRadius: '12px', backgroundColor: '#ffffff', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
        <Image src={PRODUCT.image} alt={PRODUCT.name} fill sizes="160px" style={{ objectFit: 'cover' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, color: '#A5C96B' }}>
            SKU: {PRODUCT.sku}
          </span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#52C41A' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500, color: '#E0E0E0' }}>
            Shipping today
          </span>
        </div>

        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em', lineHeight: 1.2 }}>
          {PRODUCT.name}
        </div>

        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#9AA096', lineHeight: 1.4 }}>
          {PRODUCT.description}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px', paddingTop: '10px', borderTop: '1px solid rgba(0, 0, 0, 0.3)' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: '#3B7BBE' }}>
            {PRODUCT.brand}
          </span>
          <button
            style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: '#ffffff', backgroundColor: '#538D22', border: 'none', borderRadius: '10px', padding: '12px 24px', cursor: 'pointer', transition: 'transform 160ms ease-out, opacity 160ms ease-out' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

function TypewriterWord() {
  const [text, setText] = useState('Lead Times')
  const wordIdx   = useRef(4)   // start at 'Lead Times'
  const charIdx   = useRef(10)  // 'Lead Times'.length
  const deleting  = useRef(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const word = WORDS[wordIdx.current]

      if (!deleting.current) {
        if (charIdx.current < word.length) {
          charIdx.current++
          setText(word.slice(0, charIdx.current))
          timer = setTimeout(tick, TYPE_MS)
        } else {
          timer = setTimeout(() => { deleting.current = true; tick() }, PAUSE_TYPED)
        }
      } else {
        if (charIdx.current > 0) {
          charIdx.current--
          setText(word.slice(0, charIdx.current))
          timer = setTimeout(tick, DELETE_MS)
        } else {
          deleting.current = false
          wordIdx.current = (wordIdx.current + 1) % WORDS.length
          timer = setTimeout(tick, PAUSE_DELETED)
        }
      }
    }

    timer = setTimeout(tick, PAUSE_TYPED)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span style={{ color: '#ffffff', whiteSpace: 'nowrap' }}>
      {text}
      <span className="typewriter-cursor" />
    </span>
  )
}

function CallNowCard() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '72px',
        left: '48px',
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.5)',
        borderRadius: '14px',
        padding: '14px 32px 14px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        zIndex: 3,
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Phone size={22} color="#AAD576" fill="#AAD576" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400, color: '#0D2818', lineHeight: 1 }}>
          Call now
        </span>
        <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '20px', fontWeight: 700, color: '#162518', letterSpacing: '-0.01em', lineHeight: 1 }}>
          332-222-4532
        </span>
      </div>
    </div>
  )
}
