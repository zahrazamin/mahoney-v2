'use client'

import Image from 'next/image'
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PRODUCTS } from '../lib/products'

export default function SecondSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)
  const wasDragged = useRef(false)

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
    wasDragged.current = false
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
    if (Math.abs(walk) > 8) wasDragged.current = true
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
          transition: border-color 1400ms cubic-bezier(0.23, 1, 0.32, 1), transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
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
        @keyframes stock-ping {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @media (hover: hover) and (pointer: fine) {
          .arrow-btn:hover { background-color: #F0F0F0; border-color: #C4C0B8; }
        }
        .arrow-btn {
          transition: background-color 180ms cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 180ms cubic-bezier(0.23, 1, 0.32, 1),
                      transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .arrow-btn:active { transform: scale(0.9); }
        .filter-tab {
          position: relative;
          overflow: hidden;
          transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .filter-tab::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .filter-tab:hover::before { transform: translateX(0); }
        .filter-tab > span { position: relative; z-index: 1; transition: color 500ms cubic-bezier(0.23, 1, 0.32, 1); }
        .filter-tab:active { transform: scale(0.95); }
        .filter-tab-active::before { background: #0D2818; }
        .filter-tab-active:hover > span { color: #ffffff; }
        .filter-tab-inactive::before { background: #F1F4F2; }
        .filter-tab-inactive:hover > span { color: #0D2818; }
        .quick-overview-btn {
          position: relative;
          overflow: hidden;
          transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .quick-overview-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #0B2A1B;
          border-radius: 12px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .quick-overview-btn:hover::before { transform: translateX(0); }
        .quick-overview-btn > span { position: relative; z-index: 1; transition: color 500ms cubic-bezier(0.23, 1, 0.32, 1); }
        .quick-overview-btn:hover > span { color: #AAD576; }
        .quick-overview-btn:active { transform: scale(0.97); }
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
            className="filter-tab filter-tab-active"
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
            <span>BestSeller</span>
          </button>
          <button
            className="filter-tab filter-tab-inactive"
            style={{
              backgroundColor: 'transparent',
              color: '#5A5A5A',
              border: 'none',
              padding: '12px 24px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '9999px',
            }}
          >
            <span>New Arrivals</span>
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
            <ProductCard product={product} wasDragged={wasDragged} />
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
            className="arrow-btn"
            onClick={scrollLeft}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '1px solid #E8E4DC', backgroundColor: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#092211',
            }}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            className="arrow-btn"
            onClick={scrollRight}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '1px solid #E8E4DC', backgroundColor: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#092211',
            }}
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  wasDragged,
}: {
  product: typeof PRODUCTS[0]
  wasDragged: React.MutableRefObject<boolean>
}) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (!wasDragged.current) {
      router.push(`/products/${product.id}`)
    }
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
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
              className="quick-overview-btn"
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
              }}
            >
              <span>Quick Overview</span>
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
          SKU: {product.sku}
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
          <span style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              backgroundColor: product.stockColor, opacity: 0.4,
              animation: 'stock-ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
            }} />
            <span style={{
              position: 'absolute', inset: '1px', borderRadius: '50%',
              backgroundColor: product.stockColor,
            }} />
          </span>
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
