import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vibecard.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'VibeCard — AIで性格診断',
    template: '%s | VibeCard',
  },
  description:
    '5つの質問に答えるだけ。AIがあなただけの性格タイプを分析し、シェアできる美しいカードを生成します。',
  openGraph: {
    title: 'VibeCard — AIで性格診断',
    description: '5つの質問に答えるだけ。AIがあなたのVibeを診断。',
    type: 'website',
    siteName: 'VibeCard',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeCard — AIで性格診断',
    description: '5つの質問に答えるだけ。AIがあなたのVibeを診断。',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
