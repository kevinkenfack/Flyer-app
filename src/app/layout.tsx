import type { Metadata } from 'next'
import { Geist } from 'geist/font'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Générateur de Flyers',
  description: 'Créez facilement vos flyers personnalisés',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${Geist.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}