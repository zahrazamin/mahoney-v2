'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import {
  Minus, Plus, ShieldCheck, Truck, RotateCcw,
  ChevronRight, ChevronDown, Download, Check, Share2, ShoppingCart, Copy,
} from 'lucide-react'
import { PRODUCTS } from '../lib/products'

function parsePrice(priceStr: string) {
  const dot = priceStr.indexOf('.')
  if (dot === -1) return { whole: priceStr, decimal: '' }
  return { whole: priceStr.slice(0, dot), decimal: priceStr.slice(dot) }
}

const TRUST = [
  { Icon: Truck,       label: 'Free Shipping',   sub: 'Orders over $250' },
  { Icon: RotateCcw,   label: 'Easy Returns',     sub: '30-day policy' },
  { Icon: ShieldCheck, label: 'Authorized Dist.', sub: 'OEM certified' },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(13,40,24,0.1)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500, color: '#0D2818' }}>
          {question}
        </span>
        <ChevronDown
          size={17} color="#0D2818" strokeWidth={2}
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 220ms cubic-bezier(0.23,1,0.32,1)', flexShrink: 0, marginLeft: '16px' }}
        />
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? '300px' : '0', transition: 'max-height 300ms cubic-bezier(0.23,1,0.32,1)' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.7, lineHeight: 1.7, paddingBottom: '20px', margin: 0 }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function ProductDetail({ productId }: { productId?: string }) {
  const [activeImage,     setActiveImage]     = useState(0)
  const [quantity,        setQuantity]        = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [openSection,     setOpenSection]     = useState<string | null>('details')
  const [stickyVisible,   setStickyVisible]   = useState(false)
  const [skuCopied,       setSkuCopied]       = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)

  const id    = productId ? parseInt(productId, 10) : 1
  const base  = PRODUCTS.find(p => p.id === id) ?? PRODUCTS[0]
  const price = parsePrice(base.price)

  const specParts = base.specs.split('|').map(s => s.trim())
  const variants  = [specParts[0] ?? 'Standard', 'Heavy Duty', 'IP67 Rated']

  const images = [
    base.image,
    '/images/products/hover/hover-image.jpg',
    '/images/products/hover/10-hover.png',
    '/images/products/hover/9.png',
  ]

  const keySpecs = [
    { label: 'Specifications', value: base.specs },
    { label: 'IP Rating',      value: 'IP65' },
    { label: 'Rated Voltage',  value: specParts[1] ?? '250V AC' },
    { label: 'Housing',        value: 'Thermoplastic' },
    { label: 'Certifications', value: 'UL, CE, RoHS' },
    { label: 'Mounting',       value: 'DIN Rail / Panel' },
  ]

  const related = PRODUCTS.filter(p => p.id !== base.id).slice(0, 2)
  const breadcrumbs = ['Home', 'Products', 'Industrial Controls', base.name]

  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const toggle = (id: string) =>
    setOpenSection(prev => (prev === id ? null : id))

  const ACCORDIONS = [
    {
      id: 'details',
      title: 'Product Details',
      content: (
        <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
          {[
            base.specs,
            'Sealed IP65-rated housing for wet and dusty environments',
            'RoHS, CE and UL certified for industrial applications',
            'Operating temperature: −25 °C to +70 °C',
            'Compatible with standard 22 mm panel cutout',
            'Silver alloy contacts rated for 100,000 operations',
          ].map((b, i) => (
            <li key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818', lineHeight: 1.6 }}>
              {b}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'specs',
      title: 'Key Specifications',
      content: (
        <div>
          {keySpecs.map(({ label, value }, i) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '11px 0',
                borderBottom: i < keySpecs.length - 1 ? '1px solid rgba(13,40,24,0.1)' : 'none',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818' }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818', fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Lead Time',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
          {[
            { label: 'In-stock items',  value: 'Same-day shipping if ordered before 2 PM EST' },
            { label: 'Lead-time items', value: '7–10 business days' },
            { label: 'Free shipping',   value: 'On orders over $250' },
            { label: 'International',   value: 'Available — contact us for rates' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600, color: '#0D2818', flexShrink: 0 }}>
                {label}:
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818' }}>{value}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        .pd-add-quote {
          position: relative;
          overflow: hidden;
          transition: transform 160ms ease-out;
        }
        .pd-add-quote::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #d4d4d4;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .pd-add-quote:hover::before { transform: translateX(0); }
        .pd-add-quote > span {
          position: relative; z-index: 1;
          color: #0D2818;
        }
        .pd-add-quote:active { transform: scale(0.97); }

        .pd-buy-now {
          position: relative;
          overflow: hidden;
          transition: transform 160ms ease-out;
        }
        .pd-buy-now::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #0B2A1B;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .pd-buy-now:hover::before { transform: translateX(0); }
        .pd-buy-now > span {
          position: relative; z-index: 1; color: #ffffff;
          transition: color 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pd-buy-now:hover > span { color: #AAD576; }
        .pd-buy-now:active { transform: scale(0.97); }

        .pd-thumb { transition: border-color 160ms cubic-bezier(0.23, 1, 0.32, 1); }
        .pd-qty-btn { transition: background-color 140ms ease-out; }
        .pd-qty-btn:hover { background-color: rgba(13,40,24,0.1) !important; }
        .pd-accordion-btn { transition: background-color 140ms ease-out; }
        .pd-accordion-btn:hover { background-color: rgba(13,40,24,0.03); }
        .pd-variant { transition: border-color 180ms ease-out, background-color 180ms ease-out, color 180ms ease-out; }
        .pd-crumb { transition: color 140ms ease-out; cursor: pointer; }
        .pd-crumb:hover { text-decoration: underline; }
        .pd-related-cart {
          background-color: #092211;
          border: 1.5px solid transparent;
          color: #ffffff;
          transition: border-color 1400ms cubic-bezier(0.23, 1, 0.32, 1), transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pd-related-cart:hover { border-color: #092211; color: #092211; }
        .pd-related-cart::before {
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
        .pd-related-cart:hover::before { transform: scale(3); }
        .pd-related-cart svg { position: relative; z-index: 1; stroke: currentColor; }
        .pd-related-cart:active { transform: scale(0.9); }
        .pd-share-btn { transition: color 140ms ease-out; }
        .pd-share-btn:hover { color: #538D22 !important; }

        @keyframes stock-ping {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .pd-sticky-add {
          position: relative; overflow: hidden;
          transition: transform 160ms ease-out;
        }
        .pd-sticky-add::before {
          content: '';
          position: absolute; inset: 0;
          background: #AAD576;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .pd-sticky-add:hover::before { transform: translateX(0); }
        .pd-sticky-add > span {
          position: relative; z-index: 1;
          transition: color 400ms cubic-bezier(0.23, 1, 0.32, 1);
          color: #ffffff;
        }
        .pd-sticky-add:hover > span { color: #0D2818; }
        .pd-sticky-add:active { transform: scale(0.97); }

        .pd-quote-outline {
          position: relative; overflow: hidden;
          transition: transform 160ms ease-out;
        }
        .pd-quote-outline::before {
          content: '';
          position: absolute; inset: 0;
          background: #0D2818;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .pd-quote-outline:hover::before { transform: translateX(0); }
        .pd-quote-outline > span {
          position: relative; z-index: 1;
          color: #0D2818;
          transition: color 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pd-quote-outline:hover > span { color: #ffffff; }
        .pd-quote-outline:active { transform: scale(0.97); }
      `}</style>

      {/* ── Main two-column grid ─────────────────────────────────────── */}
      <div
        style={{
          padding: '120px 200px 100px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '72px',
          alignItems: 'start',
        }}
      >

        {/* ── LEFT: sticky image panel ─────────────────────────────────── */}
        <div
          style={{
            position: 'sticky',
            top: '100px',
            alignSelf: 'flex-start',
            height: 'calc(100vh - 160px)',
            display: 'flex',
            gap: '14px',
          }}
        >

          {/* Vertical thumbnails */}
          <div
            style={{
              width: '108px', flexShrink: 0,
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}
          >
            {images.map((src, i) => (
              <button
                key={i}
                className="pd-thumb"
                onClick={() => setActiveImage(i)}
                style={{
                  width: '108px', height: '108px',
                  backgroundColor: 'transparent', borderRadius: '10px',
                  border: activeImage === i ? '1px solid rgba(13,40,24,0.35)' : '1px solid transparent',
                  cursor: 'pointer', padding: '5px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#ffffff', borderRadius: '7px', overflow: 'hidden' }}>
                  <Image src={src} alt={`View ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="108px" />
                </div>
              </button>
            ))}
          </div>

          {/* Single active image — fills remaining height */}
          <div style={{ flex: 1, position: 'relative', backgroundColor: '#ffffff', borderRadius: '24px', overflow: 'hidden' }}>
            {images.map((src, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: activeImage === i ? 1 : 0,
                  transition: 'opacity 320ms cubic-bezier(0.23, 1, 0.32, 1)',
                  pointerEvents: 'none',
                }}
              >
                <Image src={src} alt={base.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:1600px) 46vw" priority={i === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: product info ──────────────────────────────────────── */}
        <div>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  className={i < breadcrumbs.length - 1 ? 'pd-crumb' : undefined}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    color: '#0D2818',
                    fontWeight: 400,
                    opacity: i === breadcrumbs.length - 1 ? 0.45 : 1,
                  }}
                >
                  {crumb}
                </span>
                {i < breadcrumbs.length - 1 && (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.35 }}>/</span>
                )}
              </span>
            ))}
          </div>

          {/* Brand logo + category chip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ position: 'relative', width: '120px', height: '44px' }}>
              <Image src={base.logo} alt="Brand" fill style={{ objectFit: 'contain', objectPosition: 'left center' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
              color: '#538D22', letterSpacing: '0.1em', textTransform: 'uppercase',
              backgroundColor: 'rgba(83,141,34,0.1)', borderRadius: '6px', padding: '5px 10px',
            }}>
              Industrial Cooling
            </span>
          </div>

          {/* Title */}
          <div style={{ marginBottom: '20px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '38px', fontWeight: 700,
                color: '#0D2818', letterSpacing: '-0.02em',
                lineHeight: 1.1, margin: 0,
              }}
            >
              {base.name}
            </h1>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1px', marginBottom: '28px' }}>
            <span
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '32px', fontWeight: 700,
                color: '#0D2818', letterSpacing: '-0.03em', lineHeight: 1,
              }}
            >
              {price.whole}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '18px', fontWeight: 500,
                color: '#0D2818', lineHeight: 1, marginTop: '4px',
              }}
            >
              {price.decimal}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '16px', color: '#0D2818',
                alignSelf: 'flex-end', marginLeft: '8px', marginBottom: '3px',
              }}
            >
              / unit
            </span>
          </div>

          {/* SKU box */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(13,40,24,0.06)',
                borderRadius: '8px',
                padding: '8px 14px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#0D2818', letterSpacing: '0.04em' }}>
                SKU: {base.sku}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(base.sku)
                  setSkuCopied(true)
                  setTimeout(() => setSkuCopied(false), 1500)
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: skuCopied ? '#538D22' : '#0D2818', transition: 'color 200ms ease' }}
              >
                {skuCopied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2} />}
              </button>
            </div>
          </div>

          {/* Short description */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px', color: '#0D2818', opacity: 0.8,
              lineHeight: 1.65, margin: '0 0 24px',
            }}
          >
            {`The ${base.name} is engineered for demanding industrial environments — built to spec: ${base.specs.toLowerCase()}. Trusted by system integrators across North America.`}
          </p>

          {/* Variant selector */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600 }}>Select Size/Spec:</span> {variants[selectedVariant]}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
              {variants.map((v, i) => (
                <button
                  key={v}
                  className="pd-variant"
                  onClick={() => setSelectedVariant(i)}
                  style={{
                    padding: '14px 22px',
                    borderRadius: '9999px',
                    border: `1.5px solid #0D2818`,
                    backgroundColor: selectedVariant === i ? '#0D2818' : 'transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: selectedVariant === i ? '#ffffff' : '#0D2818',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  {selectedVariant === i && <Check size={13} strokeWidth={2.5} />}
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Stock status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '20px' }}>
            <span style={{ position: 'relative', width: '10px', height: '10px', flexShrink: 0 }}>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                backgroundColor: '#E33C3F', opacity: 0.4,
                animation: 'stock-ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
              }} />
              <span style={{
                position: 'absolute', inset: '2px', borderRadius: '50%',
                backgroundColor: '#E33C3F',
              }} />
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: '#E33C3F' }}>
              Only 10 left in stock
            </span>
          </div>

          {/* CTA row */}
          <div ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Quantity selector */}
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: '2px',
                  backgroundColor: '#ffffff', borderRadius: '9999px',
                  border: '1.5px solid #E8E4DC',
                  padding: '0 10px', alignSelf: 'stretch', flexShrink: 0,
                }}
              >
                <button
                  className="pd-qty-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D2818',
                  }}
                >
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600, color: '#0D2818', minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  className="pd-qty-btn"
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D2818',
                  }}
                >
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                className="pd-add-quote"
                style={{
                  flex: 1, padding: '16px 24px',
                  border: 'none',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500,
                  cursor: 'pointer', backgroundColor: '#AAD576',
                }}
              >
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Buy It Now */}
            <button
              className="pd-buy-now"
              style={{
                width: '100%', padding: '16px 24px',
                backgroundColor: '#538D22', border: 'none', borderRadius: '9999px',
                fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <span>Buy It Now</span>
            </button>

            {/* Add to Quote */}
            <button
              className="pd-quote-outline"
              style={{
                width: '100%', padding: '16px 24px',
                backgroundColor: 'transparent', border: '1.5px solid #0D2818', borderRadius: '9999px',
                fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <span>Add to Quote</span>
            </button>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '28px 0',
              marginBottom: '16px',
            }}
          >
            {TRUST.map(({ Icon, label, sub }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
                <Icon size={28} color="#0D2818" strokeWidth={1.5} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: '#0D2818' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#0D2818', opacity: 0.5 }}>{sub}</span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div>
            {ACCORDIONS.map(({ id, title, content }) => (
              <div key={id} style={{ borderBottom: '1px solid rgba(13,40,24,0.1)' }}>
                <button
                  className="pd-accordion-btn"
                  onClick={() => toggle(id)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '22px', fontWeight: 600, color: '#0D2818' }}>
                    {title}
                  </span>
                  <ChevronDown
                    size={17} color="#0D2818" strokeWidth={2}
                    style={{
                      transform: openSection === id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)',
                      flexShrink: 0,
                    }}
                  />
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: openSection === id ? '600px' : '0',
                    transition: 'max-height 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  <div style={{ padding: '0 8px 18px' }}>{content}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Share */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '24px 0 0',
            }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500, color: '#0D2818' }}>
              Share:
            </span>
            {[
              { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              { label: 'Instagram', path: 'M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zm-4 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.5-7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' },
              { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
              { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63z' },
            ].map(({ label, path }) => (
              <button
                key={label}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0.8, transition: 'opacity 160ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0D2818" stroke="none">
                  <path d={path} />
                </svg>
              </button>
            ))}
          </div>

          {/* Downloads */}
          <div
            style={{
              padding: '20px 0 0',
            }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500, color: '#0D2818', display: 'block', marginBottom: '12px' }}>
              Downloads:
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['Datasheet', 'Catalog'].map(label => (
                <button
                  key={label}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '14px 22px', borderRadius: '9999px',
                    border: '1.5px solid rgba(13,40,24,0.2)',
                    backgroundColor: 'transparent', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500,
                    color: '#0D2818', transition: 'border-color 160ms ease, background-color 160ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0D2818'; e.currentTarget.style.backgroundColor = '#0D2818'; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,40,24,0.2)'; e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0D2818'; }}
                >
                  <Download size={14} strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Related products */}
          <div style={{ marginTop: '28px', backgroundColor: '#F3F4F2', borderRadius: '20px', padding: '24px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '22px', fontWeight: 600,
                color: '#0D2818', letterSpacing: '-0.01em',
                marginBottom: '16px',
              }}
            >
              You May Also Need
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {related.map(p => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px', backgroundColor: '#ffffff', borderRadius: '14px',
                  }}
                >
                  <div style={{ width: '88px', height: '88px', position: 'relative', flexShrink: 0 }}>
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: 'contain' }} sizes="88px" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 500,
                        color: '#0D2818', marginBottom: '2px',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}
                    >
                      {p.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 400, color: '#0D2818', opacity: 0.7 }}>
                      {p.price}
                    </div>
                  </div>
                  <button
                    className="pd-related-cart"
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0, position: 'relative', overflow: 'hidden',
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
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Technical Specifications ─────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          backgroundImage: 'url(/images/banners/hero_right.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 200px',
        }}
      >
        {/* White card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
          }}
        >
          {/* Left: heading */}
          <div style={{ padding: '52px 48px', borderRight: '1px solid rgba(13,40,24,0.08)' }}>
            <div
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600,
                color: '#538D22', letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Product Details
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '36px', fontWeight: 700,
                color: '#0D2818', letterSpacing: '-0.02em', lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              Built to Industrial Standards.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '15px',
                color: '#0D2818', opacity: 0.6, lineHeight: 1.65,
              }}
            >
              Every component is engineered to perform in demanding environments — certified, tested, and trusted by system integrators.
            </p>
          </div>

          {/* Right: specs table */}
          <div>
            {([
              ['Part No.',          base.sku],
              ['Specifications',    base.specs],
              ['IP Rating',         'IP65'],
              ['Rated Voltage',     '250V AC'],
              ['Rated Current',     '10A'],
              ['Housing Material',  'Thermoplastic'],
              ['Temperature Range', '-25°C to +70°C'],
              ['Mounting',          'DIN Rail / Panel'],
            ] as [string, string][]).map(([label, value], i) => (
              <div
                key={label}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 40px',
                  backgroundColor: i % 2 === 0 ? '#F7F7F5' : '#ffffff',
                  borderBottom: i < 7 ? '1px solid rgba(13,40,24,0.06)' : 'none',
                }}
              >
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.7 }}>
                  {label}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', fontWeight: 600 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Choose Mahoney ───────────────────────────────────────── */}
      <div style={{ backgroundColor: '#F1F4F2', padding: '80px 200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#538D22', marginBottom: '16px' }}>
            Why Choose Us
          </div>
          <h2 style={{ fontFamily: 'var(--font-condensed)', fontSize: '40px', fontWeight: 700, color: '#0D2818', letterSpacing: '-0.02em', margin: 0 }}>
            Why would you choose Mahoney?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[
            { stat: '60+',  label: 'Years in Business' },
            { stat: '3rd',  label: 'Generation Family Ownership' },
            { stat: '25+',  label: 'Manufacturer Lines Stocked' },
            { stat: '1918', label: 'NEC Heritage Begins' },
          ].map(({ stat, label }) => (
            <div
              key={stat}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '48px 36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '64px', fontWeight: 700, color: '#0D2818', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {stat}
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818', opacity: 0.7, lineHeight: 1.4 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', opacity: 0.6, lineHeight: 1.7, textAlign: 'center', maxWidth: '680px', margin: '40px auto 0' }}>
          We treat $50,000 panel builds with the same precision as a $50 repair ensuring every part is 100% genuine, fully warrantied, and compliant with the highest UL and NEMA safety ratings.
        </p>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#ffffff', padding: '80px 200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#538D22', marginBottom: '16px' }}>
            FAQ
          </div>
          <h2 style={{ fontFamily: 'var(--font-condensed)', fontSize: '40px', fontWeight: 700, color: '#0D2818', letterSpacing: '-0.02em', margin: 0 }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', borderTop: '1px solid rgba(13,40,24,0.1)' }}>
          <FaqItem question="Is this product in stock and ready to ship?" answer="Yes — in-stock items ship same day if ordered before 2 PM EST. Lead-time items typically ship within 7–10 business days. You can see live stock status on every product page." />
          <FaqItem question="Are all products 100% genuine OEM parts?" answer="Absolutely. Mahoney Electric Supplies is an authorized distributor. Every part is sourced directly from the manufacturer and comes with full OEM warranty coverage." />
          <FaqItem question="What certifications does this product carry?" answer="This product is UL, CE, and RoHS certified and fully compliant with current NEC and NEMA safety standards." />
          <FaqItem question="Can I request a quote for bulk orders?" answer='Yes. Use the "Add to Quote" button on any product page to build your list, then submit it to our team. We offer volume pricing for qualifying orders.' />
          <FaqItem question="What is your return policy?" answer="We offer a 30-day hassle-free return policy on all stocked items. Items must be unused and in original packaging. Contact our team to initiate a return." />
        </div>
      </div>

      {/* ── Product Guide ────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#F7F7F5', padding: '80px 200px' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#538D22', marginBottom: '14px' }}>
            Product Guide
          </div>
          <h2 style={{ fontFamily: 'var(--font-condensed)', fontSize: '40px', fontWeight: 700, color: '#0D2818', letterSpacing: '-0.02em', margin: '0 0 20px' }}>
            What Are Electrical Enclosures?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818', opacity: 0.75, lineHeight: 1.75, maxWidth: '780px', margin: 0 }}>
            Electrical enclosures are protective cabinets that house electrical components such as relays, terminal blocks, power supplies, and control devices. These enclosures create a secure environment for electrical systems, preventing environmental hazards from damaging sensitive electronics.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818', opacity: 0.75, lineHeight: 1.75, maxWidth: '780px', margin: '16px 0 0' }}>
            In industrial settings, electrical enclosures also provide a structured mounting surface for control panel components. Devices can be arranged in an organized layout, making wiring easier to manage and simplifying maintenance and troubleshooting.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818', opacity: 0.75, lineHeight: 1.75, maxWidth: '780px', margin: '16px 0 0' }}>
            Enclosures are commonly used in manufacturing equipment, automation systems, energy distribution systems, and building control panels.
          </p>
        </div>

        {/* Types */}
        <div style={{ marginBottom: '56px' }}>
          <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '26px', fontWeight: 600, color: '#0D2818', letterSpacing: '-0.01em', marginBottom: '24px' }}>
            Types of Electrical Enclosures at Mahoney Controls
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { title: 'Wall-Mounted',      desc: 'The most common type used in control panel installations. Compact protection mountable directly on walls or equipment frames.' },
              { title: 'Free-Standing',     desc: 'Larger cabinets designed for complex control systems or multiple assemblies — commonly used in industrial automation and machine control centers.' },
              { title: 'Weather-Resistant', desc: 'Protection in outdoor or harsh environments where moisture, dust, or temperature extremes may be present.' },
              { title: 'Modular',           desc: 'Expand system capacity by connecting multiple enclosure sections together — ideal for growing installations.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px 32px' }}>
                <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '18px', fontWeight: 600, color: '#0D2818', marginBottom: '10px' }}>{title}</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.7, lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who uses + Why buy — 2 col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '56px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '26px', fontWeight: 600, color: '#0D2818', letterSpacing: '-0.01em', marginBottom: '16px' }}>
              Who Uses Electrical Enclosures?
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.75, lineHeight: 1.75, margin: '0 0 14px' }}>
              Electrical enclosures are used by control panel builders, OEM machine manufacturers, and electrical contractors who design and install industrial automation systems. Maintenance electricians also frequently purchase replacement enclosures when upgrading aging control panels.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.75, lineHeight: 1.75, margin: 0 }}>
              Industries that rely heavily on electrical enclosures include manufacturing, logistics, food processing, automotive production, and energy systems.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '26px', fontWeight: 600, color: '#0D2818', letterSpacing: '-0.01em', marginBottom: '16px' }}>
              Why Buy from Mahoney Controls?
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.75, lineHeight: 1.75, margin: '0 0 14px' }}>
              Mahoney Controls maintains an inventory of commonly used electrical enclosures so customers can source cabinets quickly for new installations or equipment upgrades. Our team understands the needs of panel builders and can help match enclosure specifications to the requirements of specific applications.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.75, lineHeight: 1.75, margin: 0 }}>
              Mahoney is family-owned and has supplied electrical professionals since 1963.
            </p>
          </div>
        </div>

        {/* What to look for */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '40px 48px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '26px', fontWeight: 600, color: '#0D2818', letterSpacing: '-0.01em', marginBottom: '24px' }}>
            What to Look for When Buying Electrical Enclosures
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 48px' }}>
            {[
              ['Enclosure size',              'The cabinet must provide enough space for all components, wiring, and airflow.'],
              ['Environmental rating',        'Look for enclosures rated for dust, moisture, or outdoor conditions when required.'],
              ['Material construction',       'Steel, stainless steel, and aluminum each offer different levels of durability and corrosion resistance.'],
              ['Mounting configuration',      'Choose wall-mounted or floor-standing enclosures based on the installation location.'],
              ['Ventilation requirements',    'Systems that generate heat may require ventilation or cooling fans.'],
            ].map(([label, desc]) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#538D22', flexShrink: 0, marginTop: '8px' }} />
                <div>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: '#0D2818' }}>{label}: </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.7 }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation tips */}
        <div style={{ borderLeft: '3px solid #538D22', paddingLeft: '24px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#538D22', marginBottom: '10px' }}>
            Installation & Maintenance Tips
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#0D2818', opacity: 0.75, lineHeight: 1.75, margin: 0 }}>
            Electrical enclosures should be installed in locations that allow adequate airflow and safe access for maintenance. Ensure all wiring is properly routed and secured to prevent strain or interference with moving components. Regular inspection of enclosure seals and ventilation components helps maintain reliable protection for internal electronics.
          </p>
        </div>

      </div>

      {/* ── Sticky bottom bar ────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid rgba(13,40,24,0.1)',
          padding: '12px 200px',
          display: 'flex', alignItems: 'center', gap: '24px',
          zIndex: 500,
          boxShadow: '0 -8px 32px rgba(0,0,0,0.07)',
          transform: stickyVisible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: '50px', height: '50px', backgroundColor: '#F3F3F3',
              borderRadius: '10px', position: 'relative', flexShrink: 0, overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: '6px' }}>
              <Image src={base.image} alt={base.name} fill style={{ objectFit: 'contain' }} sizes="50px" />
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-condensed)', fontSize: '18px', fontWeight: 700, color: '#0D2818',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              {base.name}
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#0D2818' }}>
              {base.price} / unit
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button
            className="pd-sticky-add"
            style={{
              padding: '0 28px', height: '46px',
              border: 'none', borderRadius: '9999px',
              fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600,
              cursor: 'pointer', backgroundColor: '#0D2818',
            }}
          >
            <span>Add to Cart</span>
          </button>
          <button
            style={{
              padding: '0 28px', height: '46px',
              backgroundColor: '#538D22', border: 'none', borderRadius: '9999px',
              fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600,
              color: '#ffffff', cursor: 'pointer',
            }}
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  )
}
