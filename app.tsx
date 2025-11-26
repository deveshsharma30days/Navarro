'use client'

import { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

interface AppProps {
  children: ReactNode
}

export default function App({ children }: AppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

