'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 shadow-xl sticky top-0 z-50 border-b border-primary-500/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Logo Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-lg group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              {/* Logo Text */}
              <span className="text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-200 transition-colors duration-300">
                Navarro
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/resources" className="text-white/90 hover:text-white px-3 py-2 text-sm font-semibold transition-colors duration-200 relative group">
              Resources
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/tools" className="text-white/90 hover:text-white px-3 py-2 text-sm font-semibold transition-colors duration-200 relative group">
              Tools
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/blogs" className="text-white/90 hover:text-white px-3 py-2 text-sm font-semibold transition-colors duration-200 relative group">
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white px-3 py-2 text-sm font-semibold transition-colors duration-200 relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="text-white/90 hover:text-white px-3 py-2 text-sm font-semibold transition-colors duration-200 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/signup" className="text-white/90 hover:text-white px-3 py-2 text-sm font-semibold transition-colors duration-200">
              Sign up
            </Link>
            <Link href="/login" className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-white/30 hover:border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/90 hover:text-white focus:outline-none focus:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-700/95 backdrop-blur-md border-t border-primary-500/30">
            <Link href="/resources" className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2.5 text-base font-semibold rounded-md transition-colors">
              Resources
            </Link>
            <Link href="/tools" className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2.5 text-base font-semibold rounded-md transition-colors">
              Tools
            </Link>
            <Link href="/blogs" className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2.5 text-base font-semibold rounded-md transition-colors">
              Blogs
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2.5 text-base font-semibold rounded-md transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2.5 text-base font-semibold rounded-md transition-colors">
              Contact
            </Link>
            <Link href="/signup" className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2.5 text-base font-semibold rounded-md transition-colors">
              Sign up
            </Link>
            <Link href="/login" className="bg-white/20 backdrop-blur-md border border-white/30 text-white block px-3 py-2.5 rounded-lg text-base font-bold hover:bg-white/30 hover:border-white/40 shadow-lg transition-all mt-2">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

