'use client'

import Image from 'next/image'
import { useState } from 'react'

const COLUMNS = [
  {
    heading: 'Products',
    links: ['Circuit Breakers', 'Contactors & Relays', 'Cooling Fans', 'Enclosures', 'Power Supplies', 'Terminal Blocks', 'View All Products'],
  },
  {
    heading: 'Company',
    links: ['About Mahoney', 'Our History', 'Partnerships', 'Careers', 'Press & Media'],
  },
  {
    heading: 'Resources',
    links: ['Datasheets', 'CAD Files', 'Product Catalog', 'Technical Blog', 'FAQ', 'Compliance Docs'],
  },
]

const SOCIAL = [
  {
    label: 'Facebook',
    path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    label: 'Instagram',
    paths: [
      'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z',
      'M17.5 6.5h.01',
      'M7.55 3.27A10 10 0 0 1 12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12a10 10 0 0 1 1.27-4.95',
    ],
    isRect: true,
  },
  {
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z',
    circle: 'cx="4" cy="4" r="2"',
  },
  {
    label: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.639 5.906-5.639z',
    isX: true,
  },
]

function FooterLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '14px',
        fontWeight: 400,
        color: hovered ? '#AAD576' : 'rgba(255,255,255,0.6)',
        textDecoration: 'none',
        transition: 'color 200ms ease',
        display: 'block',
        paddingBottom: '10px',
      }}
    >
      {label}
    </a>
  )
}

function SocialIcon({ item }: { item: typeof SOCIAL[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href="#"
      aria-label={item.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        backgroundColor: hovered ? 'rgba(170,213,118,0.12)' : 'transparent',
        transition: 'background-color 200ms ease, border-color 200ms ease',
        borderColor: hovered ? 'rgba(170,213,118,0.4)' : 'rgba(255,255,255,0.15)',
        flexShrink: 0,
      }}
    >
      {item.isX ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill={hovered ? '#AAD576' : 'rgba(255,255,255,0.7)'} style={{ transition: 'fill 200ms ease' }}>
          <path d={item.path} />
        </svg>
      ) : item.isRect ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hovered ? '#AAD576' : 'rgba(255,255,255,0.7)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 200ms ease' }}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill={hovered ? '#AAD576' : 'rgba(255,255,255,0.7)'} stroke="none" />
        </svg>
      ) : item.circle ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hovered ? '#AAD576' : 'rgba(255,255,255,0.7)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 200ms ease' }}>
          <path d={item.path} />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hovered ? '#AAD576' : 'rgba(255,255,255,0.7)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 200ms ease' }}>
          <path d={item.path} />
        </svg>
      )}
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#092211' }}>
      {/* CTA band */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '64px 200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#AAD576',
            marginBottom: '10px',
          }}>
            Get a Quote Today
          </p>
          <h2 style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '36px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            Need industrial components<br />for your next project?
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <CtaButton label="Request a Quote" primary />
          <CtaButton label="Browse Products" primary={false} />
        </div>
      </div>

      {/* Main footer grid */}
      <div style={{
        padding: '72px 200px 56px',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
        gap: '48px',
      }}>
        {/* Brand column */}
        <div>
          <Image
            src="/images/logo/logo-1.svg"
            alt="Mahoney Controls"
            width={160}
            height={44}
            style={{ width: 'auto', height: '40px', marginBottom: '20px', filter: 'brightness(0) invert(1)' }}
          />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            margin: '0 0 28px',
            maxWidth: '260px',
          }}>
            Authorized distributor of industrial electrical components since 1918. Trusted by engineers across North America.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {SOCIAL.map(item => <SocialIcon key={item.label} item={item} />)}
          </div>
        </div>

        {/* Nav columns */}
        {COLUMNS.map(col => (
          <div key={col.heading}>
            <p style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '20px',
            }}>
              {col.heading}
            </p>
            {col.links.map(link => <FooterLink key={link} label={link} />)}
          </div>
        ))}
      </div>

      {/* Contact strip */}
      <div style={{
        margin: '0 200px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '32px 0',
        display: 'flex',
        gap: '48px',
      }}>
        {[
          { label: 'Phone', value: '+1 (800) 624-6639' },
          { label: 'Email', value: 'sales@mahoneycontrols.com' },
          { label: 'Address', value: '142 Industrial Pkwy, Buffalo, NY 14201' },
          { label: 'Hours', value: 'Mon–Fri 8 am – 5 pm EST' },
        ].map(item => (
          <div key={item.label}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '4px',
            }}>
              {item.label}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              margin: 0,
            }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        margin: '0 200px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '24px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.3)',
          margin: 0,
        }}>
          © 2026 Mahoney Controls. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '28px' }}>
          {['Privacy Policy', 'Terms of Use', 'Accessibility'].map(link => (
            <FooterLink key={link} label={link} />
          ))}
        </div>
      </div>
    </footer>
  )
}

function CtaButton({ label, primary }: { label: string; primary: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '15px',
        fontWeight: 600,
        padding: '14px 28px',
        borderRadius: '9999px',
        border: primary ? 'none' : '1.5px solid rgba(255,255,255,0.25)',
        cursor: 'pointer',
        transition: 'background-color 220ms ease, color 220ms ease, border-color 220ms ease',
        backgroundColor: primary
          ? (hovered ? '#AAD576' : '#538D22')
          : (hovered ? 'rgba(255,255,255,0.08)' : 'transparent'),
        color: primary
          ? '#ffffff'
          : (hovered ? '#ffffff' : 'rgba(255,255,255,0.75)'),
        borderColor: primary ? 'transparent' : (hovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.25)'),
      }}
    >
      {label}
    </button>
  )
}
