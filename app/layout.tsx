import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lubu.ai'),
  title: 'LUBU — Movement Intelligence Platform',
  description: 'The first wearable that tracks the mechanical cause of health.',
  openGraph: {
    title: 'LUBU — Movement Intelligence Platform',
    description: 'The first wearable that tracks the mechanical cause of health.',
    type: 'website',
    images: [
      {
        url: '/images/lubu_insole_main.png',
        width: 1200,
        height: 630,
        alt: 'LUBU Movement Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUBU — Movement Intelligence Platform',
    description: 'The first wearable that tracks the mechanical cause of health.',
    images: ['/images/lubu_insole_main.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="bg-background text-text-light antialiased font-display">
        {children}
      </body>
    </html>
  )
}
