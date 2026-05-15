'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { PRODUCTS } from '../lib/products'
import ProductCard from './ProductCard'

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

