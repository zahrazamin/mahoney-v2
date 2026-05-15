'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { Search, User, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react'

const NAV_LINKS = ['Shop', 'Features', 'Brands', 'About']

const MARGIN = 160
const TOP    = 36
const RADIUS = 10
const RANGE  = 220
const BAR_H  = 78
const PAD    = 40

const SHOP_COLUMNS = [
  {
    heading: 'Automation & Control',
    subheading: 'CONTROL & LOGIC',
    items: [
      'Cable Assemblies', 'Electrical Enclosures', 'Fans - AC & DC',
      'Heaters', 'Power Cords', 'Power Dist. Blocks', 'Push Buttons',
      'Sensors', 'Strobe & Rotary Lights', 'Terminal Blocks', 'Tower Lights',
    ],
    brands: [
      { name: 'Altech Corp.', logo: '/images/logo/partner logo/logo-1.png' },
      { name: 'IDEC',           logo: null },
      { name: 'Phoenix Contact', logo: null },
    ],
  },
  {
    heading: 'Circuit Protection',
    subheading: 'POWER & SAFETY',
    items: [
      'AC Receptacles', 'Battery Chargers & UPS', 'Circuit Breakers',
      'Disconnect Switches', 'EMI/RFI Filters/Resistors', 'Fuse Blocks & Holders',
      'Fuses', 'Metallic Braids', 'Motor Disconnects', 'Power Supplies',
      'Relays & I/O Modules', 'Relay Sockets', 'Surge Protection',
    ],
    brands: [
      { name: 'Bussmann', logo: null },
      { name: 'Eaton',    logo: '/images/logo/partner logo/logo-2.png' },
      { name: 'Siemens',  logo: null },
    ],
  },
  {
    heading: 'Panel Accessories',
    subheading: 'HARDWARE & FINISHING',
    items: [
      'Accessories', 'Busbar & Supports', 'DIN & Mounting Rails',
      'Fan Guards & Accy', 'Ferrules', 'Heat Shrink Tubing',
      'Marking & Engraving', 'Switches', 'Thermostats', 'Tools',
    ],
    brands: [
      { name: 'nVent',   logo: null },
      { name: 'Panduit', logo: null },
      { name: 'Wago',    logo: '/images/logo/partner logo/logo-3.png' },
    ],
  },
]

const BRANDS_DATA = [
  { name: 'Altech Corp',         logo: '/images/logo/partner logo/logo-1.png'  },
  { name: 'Eaton',               logo: '/images/logo/partner logo/logo-2.png'  },
  { name: 'Wago',                logo: '/images/logo/partner logo/logo-3.png'  },
  { name: 'ABB',                 logo: '/images/logo/partner logo/logo-4.png'  },
  { name: 'Siemens',             logo: '/images/logo/partner logo/logo-5.png'  },
  { name: 'Phoenix Contact',     logo: '/images/logo/partner logo/logo-6.png'  },
  { name: 'Schneider Electric',  logo: '/images/logo/partner logo/logo-7.png'  },
  { name: 'Rockwell Automation', logo: '/images/logo/partner logo/logo-8.png'  },
  { name: 'Honeywell',           logo: '/images/logo/partner logo/logo-9.png'  },
  { name: 'Molex',               logo: '/images/logo/partner logo/logo-10.png' },
  { name: 'Panduit',             logo: '/images/logo/partner logo/logo-11.png' },
]

const FEATURES_DATA = [
  { image: '/images/banners/feature-image-1.jpg', tag: 'QUOTING',      title: 'Project Quoting & RFQ',   subtitle: 'Competitive pricing on bulk orders'     },
  { image: '/images/banners/feature-image-5.jpg', tag: 'PRODUCTIVITY', title: 'BOM Upload Tool',          subtitle: '50 parts quoted in seconds'             },
  { image: '/images/banners/feature-image-3.jpg', tag: 'RESOURCES',    title: 'Manufacturer Datasheets',  subtitle: 'PDF specs & CAD drawings in one place'  },
  { image: '/images/banners/feature-image-4.jpg', tag: 'WHOLESALE',    title: 'Tax-Exempt Accounts',      subtitle: 'Dedicated pricing for wholesale buyers' },
]

export default function Navbar({ defaultExpanded = false }: { defaultExpanded?: boolean }) {
  const barRef       = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)
  const megaMenuRef  = useRef<HTMLDivElement>(null)
  const megaCardRef  = useRef<HTMLDivElement>(null)
  const aboutLinkRef = useRef<HTMLAnchorElement>(null)
  const aboutDropRef = useRef<HTMLDivElement>(null)
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(label)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  // Sets mega menu geometry imperatively — called from both useLayoutEffect and scroll handler
  function applyMegaGeometry(margin: number, top: number, radius: number) {
    const menu = megaMenuRef.current
    const card = megaCardRef.current
    if (menu) {
      menu.style.top   = `${top + BAR_H}px`
      menu.style.left  = `${margin}px`
      menu.style.right = `${margin}px`
      menu.style.setProperty('--mega-pad', `${(MARGIN + PAD) - margin}px`)
    }
    if (card) {
      card.style.borderRadius = `0 0 ${radius}px ${radius}px`
    }
    if (aboutDropRef.current) {
      aboutDropRef.current.style.top = `${top + BAR_H}px`
    }
  }

  // Set all imperative styles before first paint — owns bar/content/menu geometry
  useLayoutEffect(() => {
    const bar     = barRef.current
    const content = contentRef.current
    if (!bar || !content) return

    if (defaultExpanded) {
      bar.style.clipPath  = 'inset(0 0px 0 0px round 0px)'
      bar.style.transform = 'translateY(0)'
      content.style.transform = `translateY(${BAR_H / 2}px) translateY(-50%)`
      applyMegaGeometry(0, 0, 0)
    } else {
      const p = Math.min(window.scrollY / RANGE, 1)
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      const margin = MARGIN * (1 - e)
      const top    = TOP    * (1 - e)
      const radius = RADIUS * (1 - e)
      bar.style.clipPath  = `inset(0 ${margin}px 0 ${margin}px round ${radius}px)`
      bar.style.transform = `translateY(${top}px)`
      content.style.transform = `translateY(${top + BAR_H / 2}px) translateY(-50%)`
      applyMegaGeometry(margin, top, radius)
    }
  }, [defaultExpanded])

  useEffect(() => {
    const bar     = barRef.current!
    const content = contentRef.current!
    if (!bar || !content) return

    if (defaultExpanded) {
      bar.style.clipPath  = 'inset(0 0px 0 0px round 0px)'
      bar.style.transform = 'translateY(0)'
      content.style.transform = `translateY(${BAR_H / 2}px) translateY(-50%)`
      applyMegaGeometry(0, 0, 0)
      return
    }

    let raf: number

    function update() {
      const p = Math.min(window.scrollY / RANGE, 1)
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2

      const margin = MARGIN * (1 - e)
      const top    = TOP    * (1 - e)
      const radius = RADIUS * (1 - e)

      bar.style.clipPath  = `inset(0 ${margin}px 0 ${margin}px round ${radius}px)`
      bar.style.transform = `translateY(${top}px)`
      content.style.transform = `translateY(${top + BAR_H / 2}px) translateY(-50%)`
      applyMegaGeometry(margin, top, radius)
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
  }, [defaultExpanded])

  useEffect(() => {
    if (activeMenu === 'About' && aboutLinkRef.current && aboutDropRef.current) {
      const rect = aboutLinkRef.current.getBoundingClientRect()
      aboutDropRef.current.style.left = `${rect.left}px`
    }
  }, [activeMenu])

  return (
    <>
      <style>{`
        .browse-all-btn { position: relative; overflow: hidden; }
        .browse-all-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #0B2A1B; border-radius: 9999px;
          transform: translateX(-100%);
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }
        .browse-all-btn:hover::before { transform: translateX(0); }
        .browse-all-btn span { position: relative; z-index: 1; transition: color 500ms cubic-bezier(0.23, 1, 0.32, 1); }
        .browse-all-btn:hover span { color: #AAD576; }
      `}</style>
      {/* ── Backdrop ── */}
      <div style={{
        position: 'fixed', inset: 0,
        zIndex: 997,
        backgroundColor: 'rgba(0,0,0,0.60)',
        pointerEvents: 'none',
        opacity: activeMenu ? 1 : 0,
        transition: 'opacity 240ms cubic-bezier(0.23,1,0.32,1)',
      }} />

      {/* ── Shell ── */}
      <div style={{
        position: 'fixed', left: 0, right: 0, top: 0,
        height: `${TOP + BAR_H}px`,
        zIndex: 1000,
        pointerEvents: 'none',
      }}>
        <div
          ref={barRef}
          style={{
            position: 'absolute', left: 0, right: 0, top: 0,
            height: `${BAR_H}px`,
            backgroundColor: '#0B2A1B',
            filter: 'drop-shadow(0 4px 32px rgba(0,0,0,0.22))',
          }}
        />

        <div
          ref={contentRef}
          style={{
            position: 'absolute', left: 0, right: 0, top: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: `0 ${MARGIN + PAD}px`,
            pointerEvents: 'none',
          }}
        >
          <nav style={{ display: 'flex', alignItems: 'center', gap: '40px', pointerEvents: 'auto' }}>
            {NAV_LINKS.map(label => (
              <NavLink
                key={label}
                label={label}
                active={activeMenu === label}
                onEnter={() => openMenu(label)}
                onLeave={scheduleClose}
                linkRef={label === 'About' ? aboutLinkRef : undefined}
              />
            ))}
          </nav>

          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)', pointerEvents: 'auto',
          }}>
            <Image src="/images/logo/logo-1.svg" alt="Mahoney Controls"
              width={180} height={50} priority style={{ width: 'auto', height: '48px' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'auto' }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400,
              color: '#ffffff', letterSpacing: '0.01em', userSelect: 'none', whiteSpace: 'nowrap',
            }}>
              What are you looking for?
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <IconButton Icon={Search} label="Search" />
              <IconButton Icon={User}   label="Account" />
              <IconButton Icon={ShoppingCart} label="Cart" />
            </div>
          </div>
        </div>
      </div>

      {/* ── About dropdown ── */}
      <div
        ref={aboutDropRef}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        style={{
          position: 'fixed', zIndex: 999, width: '240px',
          pointerEvents: activeMenu === 'About' ? 'auto' : 'none',
          opacity: activeMenu === 'About' ? 1 : 0,
          transform: activeMenu === 'About' ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 200ms cubic-bezier(0.23,1,0.32,1), transform 200ms cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <div style={{
          backgroundColor: '#ffffff', borderRadius: '0 0 16px 16px',
          boxShadow: '0 8px 40px rgba(9,34,17,0.13)',
          overflow: 'hidden', padding: '0 0 6px 0',
        }}>
          {['About Mahoney', 'Our History', 'Authorised Brands', 'The Team', 'Contact Us'].map(label => (
            <a key={label} href="#"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 20px', textDecoration: 'none',
                fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 400,
                color: '#0D2818',
                transition: 'background-color 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F4F8F2' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {label}
              <ChevronRight size={14} strokeWidth={2} style={{ color: 'rgba(13,40,24,0.30)', flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </div>

      {/* ── Mega menu ── */}
      <div
        ref={megaMenuRef}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        style={{
          position: 'fixed',
          zIndex: 999,
          pointerEvents: (activeMenu && activeMenu !== 'About') ? 'auto' : 'none',
          opacity: (activeMenu && activeMenu !== 'About') ? 1 : 0,
          transform: activeMenu ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 200ms cubic-bezier(0.23,1,0.32,1), transform 200ms cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <div
          ref={megaCardRef}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: `0 0 ${RADIUS}px ${RADIUS}px`,
            boxShadow: '0 20px 48px rgba(9,34,17,0.10)',
            overflow: 'hidden',
          }}
        >
          {/* Main body */}
          {activeMenu === 'Features' ? (
            <div style={{ paddingTop: '32px', paddingBottom: '28px', paddingLeft: 'calc(var(--mega-pad) + 28px)' as any, paddingRight: 'calc(var(--mega-pad) + 28px)' as any }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                {FEATURES_DATA.map(f => <FeatureCard key={f.title} {...f} />)}
              </div>
            </div>
          ) : activeMenu === 'Brands' ? (
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              {/* Left anchor panel — extends to dropdown left edge */}
              <div style={{
                flexShrink: 0,
                width: 'calc(var(--mega-pad) + 220px)' as any,
                backgroundColor: '#092211',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '36px', paddingBottom: '36px',
                paddingLeft: 'var(--mega-pad)' as any,
                paddingRight: '28px',
                display: 'flex', flexDirection: 'column',
              }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AAD576', margin: '0 0 10px' }}>Our Partners</p>
                  <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    Trusted<br />Manufacturers
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.52)', lineHeight: 1.65, margin: 0, flex: 1 }}>
                    Shop from 25+ world-class manufacturers across control, protection, and panel hardware.
                  </p>
                  <a href="#" className="browse-all-btn" style={{
                    marginTop: '28px',
                    display: 'inline-flex', alignItems: 'center',
                    fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
                    color: '#ffffff', textDecoration: 'none',
                    backgroundColor: '#538D22',
                    borderRadius: '9999px', padding: '12px 24px',
                    alignSelf: 'flex-start',
                  }}>
                    <span>Browse all brands</span>
                  </a>
              </div>

              {/* Scalable logo grid */}
              <div style={{
                flex: 1,
                paddingTop: '28px', paddingBottom: '28px',
                paddingLeft: '28px',
                paddingRight: 'var(--mega-pad)' as any,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 0,
                alignContent: 'start',
              }}>
                {BRANDS_DATA.map((b, i) => (
                  <BrandLogoCard
                    key={b.name}
                    {...b}
                    borderRight={i % 3 !== 2}
                    borderBottom={Math.floor(i / 3) < Math.ceil((BRANDS_DATA.length + 1) / 3) - 1}
                  />
                ))}
                <BrandMoreCard />
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex', alignItems: 'stretch',
              padding: '28px var(--mega-pad) 0' as React.CSSProperties['padding'],
            }}>
              {/* 3 product columns */}
              <div style={{ flex: 1, display: 'flex' }}>
                {SHOP_COLUMNS.map((col, i) => (
                  <div key={col.heading} style={{
                    flex: 1,
                    paddingRight: '28px',
                    borderRight: i < 2 ? '1px solid #F0EDE8' : 'none',
                    marginRight: i < 2 ? '28px' : '0',
                  }}>
                    {/* Column header */}
                    <div style={{ marginBottom: '18px' }}>
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: '#538D22', margin: '0 0 2px',
                      }}>
                        {col.subheading}
                      </p>
                      <h3 style={{
                        fontFamily: 'var(--font-condensed)', fontSize: '20px', fontWeight: 700,
                        color: '#0D2818', margin: 0, letterSpacing: '-0.01em',
                      }}>
                        {col.heading}
                      </h3>
                    </div>

                    {/* Items */}
                    <div>
                      {col.items.map((item, idx) => (
                        <ColumnItem key={item} label={item} num={idx + 1} />
                      ))}
                    </div>

                    {/* Manufacturers */}
                    <div style={{
                      marginTop: '14px', paddingTop: '14px', paddingBottom: '24px',
                      borderTop: '1px solid #F0EDE8',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        color: 'rgba(13,40,24,0.32)', margin: '0 0 10px',
                      }}>
                        Top Manufacturers
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        {col.brands.map(b => (
                          <BrandChip key={b.name} name={b.name} logo={b.logo} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right sidebar — two image cards */}
              <div style={{
                width: '300px', flexShrink: 0, marginLeft: '28px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <SidebarCard
                  image="/images/products/hover/hover-image.jpg"
                  label="Bulk RFQ"
                  title={<>Bulk RFQ &<br />Project Quotes</>}
                />
                <SidebarCard
                  image="/images/products/hover/10-hover.png"
                  label="25+ Brands"
                  title="Shop by Brand"
                />
              </div>
            </div>
          )}

          {/* Bottom strip */}
          {activeMenu !== 'About' && <div style={{
            padding: '13px var(--mega-pad)' as React.CSSProperties['padding'],
            borderTop: '1px solid #F0EDE8',
            marginTop: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {activeMenu === 'Features' ? (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(13,40,24,0.45)' }}>
                Have a question about our tools?{' '}
                <a href="#" style={{ color: '#538D22', fontWeight: 600, textDecoration: 'none' }}>Talk to our team</a>
              </span>
            ) : activeMenu === 'Brands' ? (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(13,40,24,0.50)' }}>
                Authorized distributor for 25+ leading manufacturers.{' '}
                <a href="#" style={{ color: '#538D22', fontWeight: 600, textDecoration: 'none' }}>Learn more</a>
              </span>
            ) : (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(13,40,24,0.45)' }}>
                Can&apos;t Find What You Need?{' '}
                <a href="#" style={{ color: '#538D22', fontWeight: 600, textDecoration: 'none' }}>Let Us Know</a>
              </span>
            )}
            <a href="#" style={{
              fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
              color: '#538D22', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
            }}>
              {activeMenu === 'Features' ? 'Explore all features' : activeMenu === 'Brands' ? 'Browse all brands' : 'View all products'}
              <ChevronRight size={14} strokeWidth={2.5} />
            </a>
          </div>}
        </div>
      </div>
    </>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BrandLogoCard({ name, logo, borderRight, borderBottom }: {
  name: string; logo: string; borderRight?: boolean; borderBottom?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  return (
    <a href="#" style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={() => { if (cardRef.current) cardRef.current.style.backgroundColor = '#F4F8F2' }}
      onMouseLeave={() => { if (cardRef.current) cardRef.current.style.backgroundColor = 'transparent' }}
    >
      <div ref={cardRef} style={{
        height: '76px',
        backgroundColor: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px 28px',
        borderRight: borderRight ? '1px solid rgba(232,228,220,0.45)' : 'none',
        borderBottom: borderBottom ? '1px solid rgba(232,228,220,0.45)' : 'none',
        transition: 'background-color 200ms ease',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '34px' }}>
          <Image src={logo} alt={name} fill style={{ objectFit: 'contain', objectPosition: 'center' }} sizes="220px" />
        </div>
      </div>
    </a>
  )
}

function AboutLink({ label }: { label: string }) {
  const underlineRef = useRef<HTMLSpanElement>(null)
  const textRef      = useRef<HTMLSpanElement>(null)
  return (
    <a href="#"
      onMouseEnter={() => {
        if (underlineRef.current) underlineRef.current.style.width = '100%'
        if (textRef.current)      textRef.current.style.fontWeight = '500'
      }}
      onMouseLeave={() => {
        if (underlineRef.current) underlineRef.current.style.width = '0%'
        if (textRef.current)      textRef.current.style.fontWeight = '400'
      }}
      style={{ textDecoration: 'none', padding: '10px 0', display: 'block' }}
    >
      <span ref={textRef} style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 400, color: '#0D2818', position: 'relative', display: 'inline-block', transition: 'font-weight 0ms' }}>
        {label}
        <span ref={underlineRef} style={{ position: 'absolute', bottom: '-2px', left: 0, width: '0%', height: '1.5px', backgroundColor: '#0D2818', transition: 'width 480ms cubic-bezier(0.23,1,0.32,1)' }} />
      </span>
    </a>
  )
}

function BrandMoreCard() {
  const underlineRef = useRef<HTMLSpanElement>(null)
  return (
    <a href="#" style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={() => { if (underlineRef.current) underlineRef.current.style.width = '100%' }}
      onMouseLeave={() => { if (underlineRef.current) underlineRef.current.style.width = '0%' }}
    >
      <div style={{ height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ position: 'relative', display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#0D2818', lineHeight: 1 }}>
          +19 Brands
          <span ref={underlineRef} style={{ position: 'absolute', bottom: '-2px', left: 0, width: '0%', height: '1.5px', backgroundColor: '#0D2818', transition: 'width 480ms cubic-bezier(0.23,1,0.32,1)' }} />
        </span>
      </div>
    </a>
  )
}

function FeatureCard({ image, tag, title, subtitle }: { image: string; tag: string; title: string; subtitle: string }) {
  const imgWrapRef = useRef<HTMLDivElement>(null)
  return (
    <a
      href="#"
      onMouseEnter={() => { if (imgWrapRef.current) imgWrapRef.current.style.transform = 'scale(1.07)' }}
      onMouseLeave={() => { if (imgWrapRef.current) imgWrapRef.current.style.transform = 'scale(1)' }}
      style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', display: 'block', textDecoration: 'none', height: '260px' }}
    >
      <div ref={imgWrapRef} style={{ position: 'absolute', inset: 0, transition: 'transform 600ms cubic-bezier(0.23,1,0.32,1)' }}>
        <Image src={image} alt="" fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="25vw" />
      </div>
      {/* gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.58) 100%)' }} />
      {/* glass label chip */}
      <div style={{
        position: 'absolute', top: '26px', left: '26px',
        background: 'linear-gradient(to right, rgba(255,255,255,0.28), rgba(255,255,255,0.08))',
        backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.22)', borderRadius: '9999px', padding: '5px 14px',
        fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500, color: '#ffffff',
      }}>{tag}</div>
      {/* title + arrow */}
      <div style={{ position: 'absolute', bottom: '26px', left: '26px', right: '26px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontFamily: 'var(--font-condensed)', fontSize: '20px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, margin: '0 0 7px', letterSpacing: '-0.01em' }}>{title}</h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.50)', margin: 0, lineHeight: 1.4 }}>{subtitle}</p>
          </div>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#AAD576', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ChevronRight size={18} strokeWidth={2.5} style={{ color: '#162518' }} />
        </div>
      </div>
    </a>
  )
}

function NavLink({ label, active, onEnter, onLeave, linkRef }: {
  label: string
  active: boolean
  onEnter: () => void
  onLeave: () => void
  linkRef?: React.RefObject<HTMLAnchorElement>
}) {
  return (
    <a
      ref={linkRef}
      href="#"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 500,
        color: active ? '#AAD576' : '#ffffff',
        textDecoration: 'none', letterSpacing: '0.01em', whiteSpace: 'nowrap',
        transition: 'color 150ms ease-out',
      }}
    >
      {label}
      <ChevronDown size={15} strokeWidth={2.5} style={{
        flexShrink: 0,
        color: active ? '#AAD576' : 'rgba(255,255,255,0.52)',
        transform: active ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1), color 150ms ease-out',
      }} />
    </a>
  )
}

function ColumnItem({ label, num }: { label: string; num: number }) {
  const linkRef      = useRef<HTMLAnchorElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const textRef      = useRef<HTMLSpanElement>(null)
  return (
    <a
      ref={linkRef}
      href="#"
      onMouseEnter={() => {
        if (underlineRef.current) underlineRef.current.style.width = '100%'
        if (textRef.current)      textRef.current.style.fontWeight = '500'
      }}
      onMouseLeave={() => {
        if (underlineRef.current) underlineRef.current.style.width = '0%'
        if (textRef.current)      textRef.current.style.fontWeight = '400'
      }}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '8px 8px', margin: '0 -8px',
        textDecoration: 'none',
        color: '#0D2818',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500,
        color: 'rgba(13,40,24,0.22)', minWidth: '22px', lineHeight: 1, flexShrink: 0,
        letterSpacing: '0.01em',
      }}>
        {String(num).padStart(2, '0')}
      </span>
      <span style={{ flex: 1, lineHeight: 1 }}>
        <span ref={textRef} style={{
          fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 400,
          position: 'relative', display: 'inline-block',
        }}>
          {label}
          <span
            ref={underlineRef}
            style={{
              position: 'absolute', bottom: '-2px', left: 0,
              width: '0%', height: '1.5px',
              backgroundColor: '#0D2818',
              transition: 'width 480ms cubic-bezier(0.23,1,0.32,1)',
            }}
          />
        </span>
      </span>
      <ChevronRight size={11} strokeWidth={2} style={{ color: 'rgba(13,40,24,0.16)', flexShrink: 0 }} />
    </a>
  )
}

function BrandChip({ name, logo }: { name: string; logo: string | null }) {
  if (logo) {
    return (
      <div style={{ position: 'relative', height: '18px', width: '60px' }}>
        <Image src={logo} alt={name} fill style={{ objectFit: 'contain', objectPosition: 'left' }} sizes="60px" />
      </div>
    )
  }
  return (
    <span style={{
      fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600,
      color: 'rgba(13,40,24,0.48)',
    }}>
      {name}
    </span>
  )
}

function SidebarCard({ image, label, title }: {
  image: string; label: string; title: React.ReactNode
}) {
  const imgWrapRef = useRef<HTMLDivElement>(null)
  return (
    <a href="#"
      onMouseEnter={() => { if (imgWrapRef.current) imgWrapRef.current.style.transform = 'scale(1.07)' }}
      onMouseLeave={() => { if (imgWrapRef.current) imgWrapRef.current.style.transform = 'scale(1)' }}
      style={{
        position: 'relative', borderRadius: '16px',
        overflow: 'hidden', display: 'block', textDecoration: 'none', height: '280px',
      }}>
      <div ref={imgWrapRef} style={{ position: 'absolute', inset: 0, transition: 'transform 600ms cubic-bezier(0.23,1,0.32,1)' }}>
        <Image src={image} alt="" fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="300px" />
      </div>
      {/* gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.75) 100%)',
      }} />
      {/* label chip */}
      <div style={{
        position: 'absolute', top: '24px', left: '24px',
        background: 'linear-gradient(to right, rgba(255,255,255,0.28), rgba(255,255,255,0.08))',
        backdropFilter: 'blur(14px) saturate(180%)',
        WebkitBackdropFilter: 'blur(14px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: '9999px', padding: '5px 14px',
        fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500,
        color: '#ffffff',
      }}>
        {label}
      </div>
      {/* title + arrow */}
      <div style={{
        position: 'absolute', bottom: '24px', left: '24px', right: '24px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px',
      }}>
        <h4 style={{
          fontFamily: 'var(--font-condensed)', fontSize: '20px', fontWeight: 700,
          color: '#ffffff', lineHeight: 1.2, margin: 0, letterSpacing: '-0.01em', flex: 1,
        }}>
          {title}
        </h4>
        <div style={{
          width: '42px', height: '42px', borderRadius: '50%',
          backgroundColor: '#AAD576',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <ChevronRight size={20} strokeWidth={2.5} style={{ color: '#162518' }} />
        </div>
      </div>
    </a>
  )
}

function IconButton({ Icon, label }: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  label: string
}) {
  return (
    <button
      aria-label={label}
      style={{
        background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '44px', height: '44px', borderRadius: '6px',
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
