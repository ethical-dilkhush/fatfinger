import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FatFinger Info',
  description: 'FatFinger Analytics Dashboard',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
