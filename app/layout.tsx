import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel_Decorative, Crimson_Text } from 'next/font/google'
import { HouseProvider } from '@/contexts/house-provider'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-heading',
})

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
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
  themeColor: '#12100b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`dark bg-background ${cinzelDecorative.variable} ${crimsonText.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <HouseProvider>
          <SiteHeader />
          <main>{children}</main>
        </HouseProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
