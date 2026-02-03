import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'jrcybersec | Consultoria em Cybersegurança',
  description: 'Consultoria especializada em GRC, Cybersegurança, Pentest e Cloud Security. Proteja seu negócio com quem entende do assunto.',
  generator: 'v0.app',
  icons: {
    icon: {
      url: '/shield-favicon.svg',
      type: 'image/svg+xml',
    },
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
