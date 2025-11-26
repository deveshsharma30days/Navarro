'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Navarro
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Products
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Resources
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            <Link href="/signup" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Sign up
            </Link>
            <Link href="/login" className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/products" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
              Products
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
              Resources
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
              Contact
            </Link>
            <Link href="/signup" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
              Sign up
            </Link>
            <Link href="/login" className="bg-primary-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

