'use client'

import Image from 'next/image'
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'

const HOVER_IMAGES = [
  '/images/products/hover/9.png',
  '/images/products/hover/10-hover.png',
]

const PRODUCTS = [
  {
    id: 1,
    sku: 'SKU: 11BG0910A110',
    name: 'Illuminated Push Buttons',
    price: '$23.00',
    specs: '22mm | 10A | Green LED | Momentary',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-1.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner logo/logo-1.png',
  },
  {
    id: 2,
    sku: 'SKU: 11BG0910A111',
    name: 'Circuit Breaker',
    price: '$45.00',
    specs: '15A | 1-Pole | DIN Rail Mount',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-2.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner logo/logo-2.png',
  },
  {
    id: 3,
    sku: 'SKU: 11BG0910A112',
    name: 'Cooling Fan',
    price: '$32.00',
    specs: '120V AC | Axial | 119mm',
    stockStatus: 'Lead Time 10 Days',
    stockColor: '#E33C3F',
    image: '/images/products/default/product-3.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner logo/logo-3.png',
  },
  {
    id: 4,
    sku: 'SKU: 11BG0910A113',
    name: 'Warning Light',
    price: '$58.00',
    specs: '24V DC | Red LED | Flashing',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-4.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner logo/logo-1.png',
  },
  {
    id: 5,
    sku: 'SKU: 11BG0910A114',
    name: 'Industrial Relay',
    price: '$18.00',
    specs: '12V DC | DPDT | Plug-in',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-5.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner logo/logo-1.png',
  },
  {
    id: 6,
    sku: 'SKU: 11BG0910A115',
    name: 'Power Supply',
    price: '$85.00',
    specs: '24V DC | 5A | 120W | DIN Rail',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-6.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner logo/logo-2.png',
  },
  {
    id: 7,
    sku: 'SKU: 11BG0910A116',
    name: 'Terminal Block',
    price: '$2.50',
    specs: 'Push-in | 2-Conductor | Gray',
    stockStatus: 'Lead Time 10 Days',
    stockColor: '#E33C3F',
    image: '/images/products/default/product-7.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner logo/logo-3.png',
  },
  {
    id: 8,
    sku: 'SKU: 11BG0910A117',
    name: 'Emergency Stop',
    price: '$42.00',
    specs: '40mm Mushroom | Turn to Release',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-8.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner logo/logo-1.png',
  },
]

export default function SecondSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll <= 0) {
      setScrollProgress(0)
    } else {
      setScrollProgress(scrollLeft / maxScroll)
    }
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft
    dragScrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = 'grabbing'
    scrollRef.current.style.scrollSnapType = 'none'
  }

  const onMouseUp = () => {
    if (!scrollRef.current) return
    isDragging.current = false
    scrollRef.current.style.cursor = 'grab'
    scrollRef.current.style.scrollSnapType = 'x mandatory'
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - dragStartX.current) * 1.5
    scrollRef.current.scrollLeft = dragScrollLeft.current - walk
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: 'smooth' })
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderRadius: '32px 32px 0 0',
        marginTop: '-40px',
        paddingTop: '80px',
        paddingBottom: '120px',
        boxShadow: '0 -16px 64px rgba(0,0,0,0.08)',
      }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .cart-btn {
          background-color: #092211;
          border: 1.5px solid transparent;
          color: #ffffff;
          transition: border-color 1400ms cubic-bezier(0.23, 1, 0.32, 1), color 1400ms cubic-bezier(0.23, 1, 0.32, 1), transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .cart-btn:hover {
          border-color: #092211;
          color: #092211;
        }
        .cart-btn::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          border-radius: 50%;
          background: #ffffff;
          top: calc(var(--mouse-y, 50%) - 100%);
          left: calc(var(--mouse-x, 50%) - 100%);
          transform: scale(0);
          transition: transform 1400ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
          pointer-events: none;
        }
        .cart-btn:hover::before {
          transform: scale(3);
        }
        .cart-btn svg {
          position: relative;
          z-index: 1;
        }
        .cart-btn:active {
          transform: scale(0.9);
        }
        .add-to-quote-btn {
          position: relative;
          overflow: hidden;
        }
        .add-to-quote-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #0B2A1B;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .add-to-quote-btn:hover::before {
          transform: translateX(0);
        }
        .add-to-quote-btn span {
          position: relative;
          z-index: 1;
          transition: color 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .add-to-quote-btn:hover span {
          color: #AAD576;
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 200px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '44px',
            fontWeight: 700,
            color: '#092211',
            letterSpacing: '-0.02em',
          }}
        >
          Find your Product
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            style={{
              backgroundColor: '#F1F4F2',
              color: '#0D2818',
              border: 'none',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            BestSeller
          </button>
          <button
            style={{
              backgroundColor: 'transparent',
              color: '#5A5A5A',
              border: 'none',
              padding: '12px 24px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            New Arrivals
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '24px',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {/* Left spacer (180px width + 20px gap = 200px total margin) */}
        <div style={{ flexShrink: 0, width: '180px', scrollSnapAlign: 'start' }} />
        {PRODUCTS.map((product) => (
          <div key={product.id} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'calc((100vw - 400px - 60px) / 4)' }}>
            <ProductCard product={product} />
          </div>
        ))}
        {/* Right spacer */}
        <div style={{ flexShrink: 0, width: '180px' }} />
      </div>

      {/* Footer Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', padding: '0 200px' }}>
        {/* Progress Bar */}
        <div style={{ width: '200px', height: '2px', backgroundColor: '#E8E4DC', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              backgroundColor: '#092211',
              width: '40px',
              transform: `translateX(${scrollProgress * 160}px)`,
              transition: 'transform 100ms linear',
            }}
          />
        </div>

        {/* Navigation Arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={scrollLeft}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid #E8E4DC',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#092211',
              transition: 'background-color 150ms ease-out',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={scrollRight}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid #E8E4DC',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#092211',
              transition: 'background-color 150ms ease-out',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Box */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#F0F0F0',
          borderRadius: '18px',
          height: '440px',
          overflow: 'hidden',
        }}
      >
        {/* Default product image — centered with padding, fades out on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 0 : 1,
            transition: 'opacity 220ms ease',
            pointerEvents: 'none',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 1400px) 25vw"
            />
          </div>
        </div>

        {/* Hover state — top 86%: lifestyle image + Quick Overview */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '83%',
            borderRadius: '18px 18px 0 0',
            overflow: 'hidden',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 220ms ease',
            pointerEvents: hovered ? 'auto' : 'none',
          }}
        >
          <Image
            src={product.hoverImage}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            sizes="(max-width: 1400px) 25vw"
          />
          {/* Quick Overview — same as Hero Shop Now */}
          <div style={{ position: 'absolute', bottom: '24px', left: '20px', right: '20px' }}>
            <button
              style={{
                width: '100%',
                backgroundColor: '#AAD576',
                color: '#162518',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 40px',
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 160ms ease-out, opacity 160ms ease-out',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.92' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              Quick Overview
            </button>
          </div>
        </div>

        {/* Add to Quote — fades in on hover, to the left of the cart button */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 220ms ease',
            pointerEvents: hovered ? 'auto' : 'none',
          }}
        >
          <button
            className="add-to-quote-btn"
            style={{
              backgroundColor: '#538D22',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span>Add to Quote</span>
          </button>
        </div>

        {/* Cart button — always at bottom-right, never moves */}
        <button
          className="cart-btn"
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
          }}
          onMouseEnter={e => {
            const r = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100).toFixed(0) + '%')
            e.currentTarget.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100).toFixed(0) + '%')
          }}
          onMouseLeave={e => {
            const r = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100).toFixed(0) + '%')
            e.currentTarget.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100).toFixed(0) + '%')
          }}
        >
          <ShoppingCart size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 8px' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400, color: 'rgba(13, 40, 24, 0.52)', letterSpacing: '0.04em' }}>
          {product.sku}
        </div>
        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '18px', fontWeight: 600, color: '#0D2818', lineHeight: 1.2, marginTop: '2px' }}>
          {product.name}
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500, color: '#0D2818' }}>
          {product.price}
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400, color: '#0D2818' }}>
          {product.specs}
        </div>

        {/* Stock Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: product.stockColor }} />
          <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '14px', fontWeight: 600, color: product.stockColor }}>
            {product.stockStatus}
          </span>
        </div>

        {/* Brand Logo */}
        <div style={{ position: 'relative', width: '80px', height: '32px', marginTop: '12px' }}>
          <Image
            src={product.logo}
            alt="Brand Logo"
            fill
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
          />
        </div>
      </div>
    </div>
  )
}
