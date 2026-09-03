import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant, Cormorant_Garamond } from 'next/font/google'
import { HouseProvider } from '@/contexts/house-provider'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-heading',
})

const cormorant = Cormorant({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Harry Potter Explorer — Распределяющая шляпа проводит тебя',
  description:
    'Пройди распределение, узнай свой факультет и исследуй волшебный мир Гарри Поттера: персонажи, факультеты и разговоры с обитателями Хогвартса.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0d14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`dark bg-background ${cormorantGaramond.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="fixed inset-0 -z-20 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 fog-layer-1" />
          <div className="absolute inset-0 fog-layer-2" />
          <div className="absolute inset-0 vignette-overlay" />
        </div>
        <HouseProvider>
          <SiteHeader />
          <main>{children}</main>
        </HouseProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
