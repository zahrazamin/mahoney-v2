'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, Minus, Plus, X, Check } from 'lucide-react'
import { PRODUCTS } from '../lib/products'
import ProductCard from './ProductCard'

const FILTER_GROUPS = [
  { id: 'availability', label: 'Availability', options: [
    { label: 'In Stock', count: 9 },
    { label: 'Out of Stock', count: 0 },
  ]},
  { id: 'brand', label: 'Brand', options: [
    { label: 'Altech Corp', count: 4 },
    { label: 'Eaton', count: 3 },
    { label: 'Wago', count: 2 },
  ]},
  { id: 'category', label: 'Category', options: [
    { label: 'Pushbuttons', count: 3 },
    { label: 'Circuit Protection', count: 2 },
    { label: 'Power Supplies', count: 2 },
    { label: 'Relays', count: 1 },
    { label: 'Terminal Blocks', count: 1 },
  ]},
]

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest']

function FilterGroup({ label, options, open, onToggle, checked, onToggleOption }: {
  label: string
  options: { label: string; count: number }[]
  open: boolean
  onToggle: () => void
  checked: Set<string>
  onToggleOption: (opt: string) => void
}) {
  return (
    <div>
      <div style={{ height: '1px', backgroundColor: 'rgba(13,40,24,0.1)' }} />
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: '#0D2818' }}>
          {label}
        </span>
        {open
          ? <Minus size={14} strokeWidth={2} color="#0D2818" />
          : <Plus size={14} strokeWidth={2} color="#0D2818" />
        }
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? '300px' : '0', transition: 'max-height 300ms cubic-bezier(0.23,1,0.32,1)' }}>
        <div style={{ paddingBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map(opt => {
            const isChecked = checked.has(opt.label)
            const muted = opt.count === 0
            return (
              <div
                key={opt.label}
                onClick={() => !muted && onToggleOption(opt.label)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: muted ? 'default' : 'pointer', opacity: muted ? 0.35 : 1 }}
              >
                <div style={{
                  width: '16px', height: '16px', borderRadius: '3px', flexShrink: 0,
                  border: isChecked ? 'none' : '1.5px solid rgba(13,40,24,0.3)',
                  backgroundColor: isChecked ? '#0D2818' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 150ms ease',
                }}>
                  {isChecked && <Check size={10} strokeWidth={3} color="#ffffff" />}
                </div>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400, color: '#0D2818', flex: 1 }}>
                  {opt.label}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#0D2818', opacity: 0.4 }}>
                  {opt.count}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ProductList() {
  const [sort, setSort] = useState('Featured')
  const [cols, setCols] = useState(3)
  const [page, setPage] = useState(1)
  const totalPages = 6
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    availability: true, brand: true, category: false, price: true,
  })
  const [checkedOptions, setCheckedOptions] = useState<Set<string>>(new Set())

  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(999)
  const priceActive = priceMin > 0 || priceMax < 999

  const toggleOption = (opt: string) =>
    setCheckedOptions(prev => {
      const next = new Set(prev)
      if (next.has(opt)) next.delete(opt); else next.add(opt)
      return next
    })

  const clearAllFilters = () => {
    setCheckedOptions(new Set())
    setPriceMin(0)
    setPriceMax(999)
  }
  const [bulkMode, setBulkMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [compareMode, setCompareMode] = useState(false)
  const [compareIds, setCompareIds] = useState<Set<number>>(new Set())

  const toggleGroup = (id: string) =>
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }))

  const toggleBulkMode = () => {
    setBulkMode(v => !v)
    setSelectedIds(new Set())
    setCompareMode(false)
    setCompareIds(new Set())
  }

  const toggleCompareMode = () => {
    setCompareMode(v => !v)
    setCompareIds(new Set())
    setBulkMode(false)
    setSelectedIds(new Set())
  }

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleCompare = (id: number) => {
    setCompareIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); return next }
      if (next.size >= 4) return prev
      next.add(id)
      return next
    })
  }

  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const selectionMode = bulkMode ? 'quote' : compareMode ? 'compare' : undefined
  const visibleProducts = activeCategory ? PRODUCTS.filter(p => p.category === activeCategory) : PRODUCTS

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '120px 200px 100px' }}>
      <style>{`
        .pl-sort-select:focus { outline: none; }
        .fl-atq-btn {
          position: relative; overflow: hidden;
          transition: transform 160ms ease-out;
        }
        .fl-atq-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #0B2A1B;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23,1,0.32,1);
          z-index: 0;
        }
        .fl-atq-btn:hover::before { transform: translateX(0); }
        .fl-atq-btn > span {
          position: relative; z-index: 1;
          transition: color 500ms cubic-bezier(0.23,1,0.32,1);
          color: #162518;
        }
        .fl-atq-btn:hover > span { color: #AAD576; }
        .fl-atq-btn:active { transform: scale(0.97); }
        .fl-cmp-btn {
          position: relative; overflow: hidden;
          transition: transform 160ms ease-out;
        }
        .fl-cmp-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #162518;
          border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23,1,0.32,1);
          z-index: 0;
        }
        .fl-cmp-btn:hover::before { transform: translateX(0); }
        .fl-cmp-btn > span {
          position: relative; z-index: 1;
          transition: color 500ms cubic-bezier(0.23,1,0.32,1);
          color: #ffffff;
        }
        .fl-cmp-btn:hover > span { color: #ffffff; }
        .fl-cmp-btn:active { transform: scale(0.97); }
        .cat-card img { transition: transform 600ms cubic-bezier(0.23,1,0.32,1); }
        .cat-card:hover img { transform: scale(1.06); }
        .cat-tag { position: relative; overflow: hidden; cursor: pointer; }
        .cat-tag::before {
          content: '';
          position: absolute;
          width: 200%; height: 200%;
          border-radius: 50%;
          background: #AAD576;
          top: calc(var(--tag-y, 50%) - 100%);
          left: calc(var(--tag-x, 50%) - 100%);
          transform: scale(0);
          transition: transform 500ms cubic-bezier(0.23,1,0.32,1);
          z-index: 0; pointer-events: none;
        }
        .cat-tag:hover::before { transform: scale(3); }
        .cat-tag > span { position: relative; z-index: 1; color: #ffffff; transition: color 500ms cubic-bezier(0.23,1,0.32,1); }
        .cat-tag:hover > span { color: #0D2818; }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', textDecoration: 'none', opacity: 0.6 }}>
          Home
        </Link>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', opacity: 0.3 }}>/</span>
        {activeCategory ? (
          <>
            <Link href="/products" style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', opacity: 0.4, textDecoration: 'none' }}>
              Products
            </Link>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', opacity: 0.3 }}>/</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818' }}>{activeCategory}</span>
          </>
        ) : (
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', opacity: 0.4 }}>Products</span>
        )}
      </div>

      {/* Page title */}
      <h1 style={{
        fontFamily: 'var(--font-condensed)',
        fontSize: '48px', fontWeight: 700,
        color: '#0D2818', letterSpacing: '-0.02em', lineHeight: 1.1,
        margin: '40px 0 10px',
      }}>
        {activeCategory || 'All Products'}
      </h1>
      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400,
        color: '#0D2818', margin: '0 0 32px',
      }}>
        {activeCategory ? `Showing all products in ${activeCategory}` : 'Explore our complete range of industrial controls'}
      </p>

      {/* Category banners — hidden when a category is active */}
      {!activeCategory && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '52px' }}>
        {[
          { name: 'Automation & Control', spec: 'Pushbuttons | Indicators | Selectors', image: '/images/banners/product-page-banner-1.jpg' },
          { name: 'Circuit Protection',   spec: 'Breakers | Fuses | Surge Protection',  image: '/images/banners/product-page-banner-4.jpg' },
          { name: 'Panel Accessories',    spec: 'Terminal Blocks | Relays | Power',      image: '/images/banners/product-page-banner-3.jpg' },
        ].map(cat => (
          <div key={cat.name} className="cat-card" onClick={() => router.push(`/products?category=${encodeURIComponent(cat.name)}`)} style={{ cursor: 'pointer', position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9' }}>
            <Image src={cat.image} alt={cat.name} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="30vw" />

            {/* Glass bottom overlay with name + spec + badge */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              backgroundColor: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.18)',
              padding: '20px 24px 22px 28px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '0px' }}>
                  {cat.name}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.65)' }}>
                  {cat.spec}
                </div>
              </div>
              <div
                className="cat-tag"
                onMouseEnter={e => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--tag-x', ((e.clientX - r.left) / r.width * 100).toFixed(0) + '%')
                  e.currentTarget.style.setProperty('--tag-y', ((e.clientY - r.top) / r.height * 100).toFixed(0) + '%')
                }}
                onMouseLeave={e => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--tag-x', ((e.clientX - r.left) / r.width * 100).toFixed(0) + '%')
                  e.currentTarget.style.setProperty('--tag-y', ((e.clientY - r.top) / r.height * 100).toFixed(0) + '%')
                }}
                style={{
                  flexShrink: 0,
                  background: 'linear-gradient(to right, rgba(255,255,255,0.28), rgba(255,255,255,0.08))',
                  backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
                  border: '1px solid rgba(255,255,255,0.22)', borderRadius: '9999px', padding: '5px 14px',
                  fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500,
                }}
              >
                <span>10 Products</span>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {/* Content: sidebar + grid */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>

        {/* Filter sidebar */}
        <div style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>

          {/* Filters pill + count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              border: '1px solid rgba(13,40,24,0.2)', borderRadius: '9999px',
              padding: '12px 16px', backgroundColor: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: '#0D2818',
            }}>
              <SlidersHorizontal size={14} strokeWidth={2} />
              Filters
            </button>
          </div>

          {/* Active filter chips */}
          {(checkedOptions.size > 0 || priceActive) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {[...checkedOptions].map(opt => (
                <div key={opt} style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  backgroundColor: '#F1F4F2', borderRadius: '9999px', padding: '5px 10px 5px 12px',
                }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#0D2818' }}>{opt}</span>
                  <button
                    onClick={() => toggleOption(opt)}
                    style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0', color: '#0D2818', opacity: 0.6 }}
                  >
                    <X size={11} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
              {priceActive && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  backgroundColor: '#F1F4F2', borderRadius: '9999px', padding: '5px 10px 5px 12px',
                }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#0D2818' }}>
                    ${priceMin} – ${priceMax}
                  </span>
                  <button
                    onClick={() => { setPriceMin(0); setPriceMax(999) }}
                    style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '0', color: '#0D2818', opacity: 0.6 }}
                  >
                    <X size={11} strokeWidth={2.5} />
                  </button>
                </div>
              )}
              <button
                onClick={clearAllFilters}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#0D2818', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: '5px 2px' }}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Filter groups */}
          <div>
            {FILTER_GROUPS.map(group => (
              <FilterGroup
                key={group.id}
                label={group.label}
                options={group.options}
                open={openGroups[group.id] ?? false}
                onToggle={() => toggleGroup(group.id)}
                checked={checkedOptions}
                onToggleOption={toggleOption}
              />
            ))}

            {/* Price filter */}
            <div>
              <div style={{ height: '1px', backgroundColor: 'rgba(13,40,24,0.1)' }} />
              <button
                onClick={() => toggleGroup('price')}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: '#0D2818' }}>Price</span>
                {openGroups.price
                  ? <Minus size={14} strokeWidth={2} color="#0D2818" />
                  : <Plus size={14} strokeWidth={2} color="#0D2818" />
                }
              </button>
              <div style={{ overflow: 'hidden', maxHeight: openGroups.price ? '200px' : '0', transition: 'max-height 300ms cubic-bezier(0.23,1,0.32,1)' }}>
                <div style={{ paddingBottom: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#0D2818', opacity: 0.5, margin: '0 0 14px' }}>
                    The highest price is $999.00
                  </p>
                  <input
                    type="range" min={0} max={999} value={priceMax}
                    onChange={e => setPriceMax(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#0D2818', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(13,40,24,0.2)', borderRadius: '9999px', padding: '8px 14px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#0D2818', opacity: 0.5 }}>$</span>
                      <input
                        type="number" min={0} max={priceMax} value={priceMin}
                        onChange={e => setPriceMin(Math.min(Number(e.target.value), priceMax))}
                        style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818' }}
                      />
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(13,40,24,0.2)', borderRadius: '9999px', padding: '8px 14px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#0D2818', opacity: 0.5 }}>$</span>
                      <input
                        type="number" min={priceMin} max={999} value={priceMax}
                        onChange={e => setPriceMax(Math.max(Number(e.target.value), priceMin))}
                        style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: '1px', backgroundColor: 'rgba(13,40,24,0.1)' }} />
            </div>
          </div>
        </div>

        {/* Product grid area */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', opacity: 0.5 }}>
              {visibleProducts.length} Products
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818' }}>Sort by</span>
                <div style={{ position: 'relative' }}>
                  <select
                    className="pl-sort-select"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    style={{
                      fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818',
                      border: '1px solid rgba(13,40,24,0.2)', borderRadius: '9999px',
                      padding: '12px 36px 12px 16px',
                      backgroundColor: 'transparent', cursor: 'pointer',
                      appearance: 'none', WebkitAppearance: 'none',
                    }}
                  >
                    {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <ChevronDown
                    size={13} strokeWidth={2} color="#0D2818"
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  />
                </div>
              </div>

              {/* Add to Quote toggle */}
              <div
                onClick={toggleBulkMode}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
              >
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818' }}>Add to Quote</span>
                <div style={{
                  width: '50px', height: '28px', borderRadius: '9999px',
                  backgroundColor: bulkMode ? '#092211' : '#EFEFEF',
                  position: 'relative',
                  transition: 'background-color 200ms ease',
                  flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute', top: '4px',
                    left: bulkMode ? '26px' : '4px',
                    width: '20px', height: '20px', borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    transition: 'left 200ms cubic-bezier(0.23,1,0.32,1)',
                  }} />
                </div>
              </div>

              {/* Compare toggle */}
              <div
                onClick={toggleCompareMode}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
              >
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818' }}>Compare</span>
                <div style={{
                  width: '50px', height: '28px', borderRadius: '9999px',
                  backgroundColor: compareMode ? '#092211' : '#EFEFEF',
                  position: 'relative',
                  transition: 'background-color 200ms ease',
                  flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute', top: '4px',
                    left: compareMode ? '26px' : '4px',
                    width: '20px', height: '20px', borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    transition: 'left 200ms cubic-bezier(0.23,1,0.32,1)',
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '12px' }}>
            {visibleProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                selectionMode={selectionMode}
                isSelected={compareMode ? compareIds.has(product.id) : selectedIds.has(product.id)}
                onToggleSelect={() => compareMode ? toggleCompare(product.id) : toggleSelect(product.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '48px' }}>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{
            padding: '0 12px', height: '38px', borderRadius: '9999px',
            border: 'none', backgroundColor: 'transparent',
            color: '#0D2818', display: 'flex', alignItems: 'center', gap: '6px',
            cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.3 : 1,
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400,
            transition: 'opacity 150ms ease',
          }}
        >
          <ChevronLeft size={15} strokeWidth={2} />
          Previous
        </button>

        {/* 1 */}
        {[1, 2].map(n => (
          <button key={n} onClick={() => setPage(n)} style={{
            width: '38px', height: '38px', borderRadius: '50%',
            border: '1px solid rgba(13,40,24,0.2)',
            backgroundColor: page === n ? '#092211' : 'transparent',
            color: page === n ? '#ffffff' : '#0D2818',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: page === n ? 600 : 400,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background-color 160ms ease, color 160ms ease',
          }}>{n}</button>
        ))}

        {/* Ellipsis */}
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#0D2818', opacity: 0.4, padding: '0 4px' }}>...</span>

        {/* Last page */}
        <button onClick={() => setPage(totalPages)} style={{
          width: '38px', height: '38px', borderRadius: '50%',
          border: '1px solid rgba(13,40,24,0.2)',
          backgroundColor: page === totalPages ? '#092211' : 'transparent',
          color: page === totalPages ? '#ffffff' : '#0D2818',
          fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: page === totalPages ? 600 : 400,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background-color 160ms ease, color 160ms ease',
        }}>{totalPages}</button>

        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{
            padding: '0 12px', height: '38px', borderRadius: '9999px',
            border: 'none', backgroundColor: 'transparent',
            color: '#0D2818', display: 'flex', alignItems: 'center', gap: '6px',
            cursor: page === totalPages ? 'default' : 'pointer', opacity: page === totalPages ? 0.3 : 1,
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400,
            transition: 'opacity 150ms ease',
          }}
        >
          Next
          <ChevronRight size={15} strokeWidth={2} />
        </button>
      </div>

        </div>
      </div>

      {/* Floating quote bar */}
      <div style={{
        position: 'fixed', bottom: '36px', left: '50%',
        transform: `translateX(-50%) translateY(${bulkMode && selectedIds.size > 0 ? '0' : '120px'})`,
        opacity: bulkMode && selectedIds.size > 0 ? 1 : 0,
        pointerEvents: bulkMode && selectedIds.size > 0 ? 'auto' : 'none',
        transition: 'transform 320ms cubic-bezier(0.23,1,0.32,1), opacity 220ms ease',
        zIndex: 100,
        display: 'flex', alignItems: 'center', gap: '20px',
        backgroundColor: '#092211',
        borderRadius: '9999px',
        padding: '10px 10px 10px 28px',
        boxShadow: '0 8px 48px rgba(9,34,17,0.3)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
          {selectedIds.size} product{selectedIds.size !== 1 ? 's' : ''} selected
        </span>
        <button
          className="fl-atq-btn"
          style={{
            backgroundColor: '#AAD576', border: 'none', borderRadius: '9999px',
            padding: '12px 28px', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
          }}
        >
          <span>Add to Quote</span>
        </button>
      </div>

      {/* Floating compare bar */}
      <div style={{
        position: 'fixed', bottom: '36px', left: '50%',
        transform: `translateX(-50%) translateY(${compareMode && compareIds.size > 0 ? '0' : '120px'})`,
        opacity: compareMode && compareIds.size > 0 ? 1 : 0,
        pointerEvents: compareMode && compareIds.size > 0 ? 'auto' : 'none',
        transition: 'transform 320ms cubic-bezier(0.23,1,0.32,1), opacity 220ms ease',
        zIndex: 100,
        display: 'flex', alignItems: 'center', gap: '20px',
        backgroundColor: '#2D5A0E',
        borderRadius: '9999px',
        padding: '10px 10px 10px 28px',
        boxShadow: '0 8px 48px rgba(45,90,14,0.3)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
          {compareIds.size} of 4 selected
        </span>
        <button
          className="fl-cmp-btn"
          style={{
            backgroundColor: '#0D2818', border: 'none', borderRadius: '9999px',
            padding: '12px 28px', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
          }}
        >
          <span>Compare Now</span>
        </button>
      </div>
    </div>
  )
}
