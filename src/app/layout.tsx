import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { appConfig } from '@/lib/config'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://invitationkami.com'),
  title: {
    default: `${appConfig.name} — Website Undangan Pernikahan Digital Eksklusif & Elegan`,
    template: `%s | ${appConfig.name}`,
  },
  description:
    'Buat undangan pernikahan digital (web invitation) elegan dan responsif dengan fitur terlengkap: musik latar otomatis, RSVP WhatsApp, amplop digital kado, live preview berbagai tema, dan generator link tamu massal.',
  keywords: [
    'undangan pernikahan digital',
    'undangan digital website',
    'wedding invitation online',
    'invitation wedding',
    'undangan online',
    'web nikah',
    'undangan pernikahan modern',
    'undangan pernikahan elegan',
    'rsvp whatsapp wedding',
    'amplop digital pernikahan',
    'generator link undangan tamu',
    'invitationkami',
  ],
  authors: [{ name: 'InvitationKami', url: 'https://invitationkami.com' }],
  creator: 'InvitationKami',
  publisher: 'InvitationKami',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${appConfig.name} — Website Undangan Pernikahan Digital Eksklusif`,
    description:
      'Solusi undangan pernikahan digital modern & elegan dengan live preview 11 tema eksklusif, musik latar, RSVP otomatis, dan generator link tamu massal.',
    url: 'https://invitationkami.com',
    siteName: appConfig.name,
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 800,
        alt: `${appConfig.name} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${appConfig.name} — Undangan Pernikahan Digital Eksklusif`,
    description:
      'Undangan pernikahan digital berbasis web interaktif & estetik. Bagikan momen terindah Anda dengan mudah dan elegan.',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Structured Data JSON-LD for Google Global Search Rich Snippet */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: appConfig.name,
              url: process.env.APP_URL || 'https://invitationkami.com',
              description:
                'Platform pembuatan undangan pernikahan digital (wedding website) interaktif dengan fitur live preview, amplop kado digital, RSVP WhatsApp, dan generator pembagi tautan massal.',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${process.env.APP_URL || 'https://invitationkami.com'}/share-generator`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
