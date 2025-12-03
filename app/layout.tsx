import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// @ts-ignore - Importing root app.tsx file
import App from '../app'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Navaro - Master the Art of Shipping',
  description: 'Navaro teaches you everything about shipping and logistics! Learn shipping best practices and optimize your supply chain.',
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

