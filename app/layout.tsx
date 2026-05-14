import type { Metadata } from 'next'
import { IBM_Plex_Sans_Condensed } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

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
    <html lang="en" className={`${GeistSans.variable} ${ibmPlexSansCondensed.variable}`}>
      <body>{children}</body>
    </html>
  )
}
