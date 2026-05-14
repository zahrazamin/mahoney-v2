'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Search, User, ShoppingCart, ChevronDown } from 'lucide-react'

const NAV_LINKS = ['Shop', 'Features', 'About', 'Contact']

const MARGIN = 160   // bar left/right margin at rest
const TOP    = 36    // bar top offset at rest
const RADIUS = 10    // bar border-radius at rest
const RANGE  = 220   // scroll px to complete animation — longer = smoother
const BAR_H  = 78    // bar height
const PAD    = 40    // gap between bar edge and content

export default function Navbar() {
  const barRef     = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar     = barRef.current!
    const content = contentRef.current!
    if (!bar || !content) return

    let raf: number

    function update() {
      const p = Math.min(window.scrollY / RANGE, 1)
      // ease-in-out quad — stays proportional to scroll gesture, no jarring jump
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2

      const margin = MARGIN * (1 - e)
      const top    = TOP    * (1 - e)
      const radius = RADIUS * (1 - e)

      // GPU-composited only: clip-path + transform, zero layout triggers
      bar.style.clipPath  = `inset(0 ${margin}px 0 ${margin}px round ${radius}px)`
      bar.style.transform = `translateY(${top}px)`

      // Content: transform only, tracks bar's vertical center
      content.style.transform = `translateY(${top + BAR_H / 2}px) translateY(-50%)`
    }

    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    // Transparent full-viewport shell — never resizes, never moves
    <div style={{
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      height: `${TOP + BAR_H}px`,
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      {/* The visual bar — only this element animates horizontally */}
      <div
        ref={barRef}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          transform: `translateY(${TOP}px)`,
          height: `${BAR_H}px`,
          backgroundColor: '#0B2A1B',
          filter: 'drop-shadow(0 4px 32px rgba(0,0,0,0.22))',
          clipPath: `inset(0 ${MARGIN}px 0 ${MARGIN}px round ${RADIUS}px)`,
        }}
      />

      {/* Content — left/right position is fixed forever, only top tracks the bar */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          transform: `translateY(${TOP + BAR_H / 2}px) translateY(-50%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${MARGIN + PAD}px`,
          pointerEvents: 'none',
        }}
      >
        {/* Left: nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '40px', pointerEvents: 'auto' }}>
          {NAV_LINKS.map(label => <NavLink key={label} label={label} />)}
        </nav>

        {/* Center: logo */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto',
        }}>
          <Image
            src="/images/logo/logo-1.svg"
            alt="Mahoney Controls"
            width={180}
            height={50}
            priority
            style={{ width: 'auto', height: '48px' }}
          />
        </div>

        {/* Right: search hint + icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'auto' }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 400,
            color: '#ffffff',
            letterSpacing: '0.01em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}>
            What are you looking for?
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <IconButton Icon={Search} label="Search" />
            <IconButton Icon={User} label="Account" />
            <IconButton Icon={ShoppingCart} label="Cart" />
          </div>
        </div>
      </div>
    </div>
  )
}

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontFamily: 'var(--font-sans)',
        fontSize: '16px',
        fontWeight: 500,
        color: '#ffffff',
        textDecoration: 'none',
        letterSpacing: '0.01em',
        transition: 'color 150ms ease-out',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <ChevronDown size={18} strokeWidth={2.5} style={{ flexShrink: 0, color: 'white' }} />
    </a>
  )
}

function IconButton({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  label: string
}) {
  return (
    <button
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '6px',
        transition: 'background 150ms ease-out, transform 160ms ease-out',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.93)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      <Icon size={24} strokeWidth={1.5} />
    </button>
  )
}
