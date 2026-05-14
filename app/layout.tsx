import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mahoney Controls',
  description: 'Industrial electrical components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexSansCondensed.variable}`}>
      <body>{children}</body>
    </html>
  )
}
