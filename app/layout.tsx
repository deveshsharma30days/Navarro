import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import App from '@/components/App'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Navarro - Automate Transfer Pricing Reports',
  description: 'Navarro helps you create your transfer pricing reports effortlessly!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>
          {children}
        </App>
      </body>
    </html>
  )
}

