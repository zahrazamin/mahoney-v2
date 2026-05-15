'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Check } from 'lucide-react'
import { PRODUCTS } from '../lib/products'

export default function ProductCard({
  product,
  wasDragged,
  selectionMode,
  isSelected,
  onToggleSelect,
}: {
  product: typeof PRODUCTS[0]
  wasDragged?: React.MutableRefObject<boolean>
  selectionMode?: 'quote' | 'compare'
  isSelected?: boolean
  onToggleSelect?: () => void
}) {
  const [imageHovered, setImageHovered] = useState(false)
  const [cardHovered, setCardHovered] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (selectionMode && onToggleSelect) {
      onToggleSelect()
      return
    }
    if (!wasDragged?.current) {
      router.push(`/products/${product.id}`)
    }
  }

  return (
    <>
      <style>{`
        .cart-btn {
          background-color: #092211;
          border: 1.5px solid transparent;
          color: #ffffff;
          transition: border-color 1400ms cubic-bezier(0.23, 1, 0.32, 1), transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .cart-btn:hover { border-color: #092211; color: #092211; }
        .cart-btn::before {
          content: '';
          position: absolute;
          width: 200%; height: 200%;
          border-radius: 50%;
          background: #ffffff;
          top: calc(var(--mouse-y, 50%) - 100%);
          left: calc(var(--mouse-x, 50%) - 100%);
          transform: scale(0);
          transition: transform 1400ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0; pointer-events: none;
        }
        .cart-btn:hover::before { transform: scale(3); }
        .cart-btn svg { position: relative; z-index: 1; }
        .cart-btn:active { transform: scale(0.9); }
        .add-to-quote-btn {
          position: relative; overflow: hidden;
        }
        .add-to-quote-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #0B2A1B;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .add-to-quote-btn:hover::before { transform: translateX(0); }
        .add-to-quote-btn span {
          position: relative; z-index: 1;
          transition: color 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .add-to-quote-btn:hover span { color: #AAD576; }
        .quick-overview-btn {
          transition: opacity 180ms ease, transform 140ms cubic-bezier(0.23,1,0.32,1);
        }
        .quick-overview-btn:hover { opacity: 0.82; }
        .quick-overview-btn:active { transform: scale(0.97); }
        @keyframes stock-ping {
          0%   { transform: scale(1);   opacity: 0.4; }
          70%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer' }}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => { setCardHovered(false); setImageHovered(false) }}
        onClick={handleClick}
      >
        {/* Image Box */}
        <div
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
          style={{
          position: 'relative', backgroundColor: '#F0F0F0', borderRadius: '18px', height: '440px', overflow: 'hidden',
          outline: isSelected ? '2.5px solid #092211' : '2.5px solid transparent',
          transition: 'outline-color 180ms ease',
        }}>

          {/* Default product image */}
          <div style={{
            position: 'absolute', inset: 0, padding: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: imageHovered ? 0 : 1,
            transition: 'opacity 220ms ease',
            pointerEvents: 'none',
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain' }} sizes="(max-width: 1400px) 25vw" />
            </div>
          </div>

          {/* Hover: lifestyle image (top 83%) */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '83%',
            borderRadius: '18px 18px 0 0', overflow: 'hidden',
            opacity: imageHovered ? 1 : 0,
            transition: 'opacity 220ms ease',
            pointerEvents: 'none',
          }}>
            <Image src={product.hoverImage} alt={product.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="(max-width: 1400px) 25vw" />
          </div>

          {/* Quick Overview — shown when hovering anywhere on card */}
          <div style={{
            position: 'absolute', bottom: '96px', left: '20px', right: '20px',
            opacity: cardHovered ? 1 : 0,
            transition: 'opacity 220ms ease',
            pointerEvents: cardHovered ? 'auto' : 'none',
            zIndex: 3,
          }}>
            <button
              className="quick-overview-btn"
              style={{
                width: '100%', backgroundColor: '#AAD576', color: '#162518',
                border: 'none', borderRadius: '12px', padding: '16px 40px',
                fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              <span>Quick Overview</span>
            </button>
          </div>

          {/* Add to Quote */}
          <div style={{
            position: 'absolute', bottom: '16px', left: '16px',
            opacity: cardHovered ? 1 : 0,
            transition: 'opacity 220ms ease',
            pointerEvents: cardHovered ? 'auto' : 'none',
          }}>
            <button
              className="add-to-quote-btn"
              style={{
                backgroundColor: '#538D22', color: '#ffffff', border: 'none',
                borderRadius: '9999px', padding: '12px 24px',
                fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              <span>Add to Quote</span>
            </button>
          </div>

          {/* Cart button */}
          <button
            className="cart-btn"
            style={{
              position: 'absolute', bottom: '16px', right: '16px',
              width: '40px', height: '40px', borderRadius: '50%',
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 2,
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

          {/* Selection checkbox */}
          {selectionMode && (
            <div
              onClick={e => { e.stopPropagation(); onToggleSelect?.() }}
              style={{
                position: 'absolute', top: '12px', right: '12px', zIndex: 4,
                width: '26px', height: '26px', borderRadius: '50%',
                backgroundColor: isSelected ? '#092211' : 'rgba(255,255,255,0.92)',
                border: '2px solid #0D2818',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                transition: 'background-color 180ms ease',
              }}
            >
              {isSelected && <Check size={13} strokeWidth={3} color="#ffffff" />}
            </div>
          )}
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 8px 28px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400, color: 'rgba(13,40,24,0.52)', letterSpacing: '0.04em' }}>
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

          {/* Stock status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: product.stockColor, opacity: 0.4, animation: 'stock-ping 1.4s cubic-bezier(0,0,0.2,1) infinite' }} />
              <span style={{ position: 'absolute', inset: '1px', borderRadius: '50%', backgroundColor: product.stockColor }} />
            </span>
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '14px', fontWeight: 600, color: product.stockColor }}>
              {product.stockStatus}
            </span>
          </div>

          {/* Brand logo */}
          <div style={{ position: 'relative', width: '80px', height: '32px', marginTop: '12px' }}>
            <Image src={product.logo} alt="Brand Logo" fill style={{ objectFit: 'contain', objectPosition: 'left center' }} />
          </div>
        </div>
      </div>
    </>
  )
}
