'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [shippingMethod, setShippingMethod] = useState('')
  const [destination, setDestination] = useState('')
  const [packageWeight, setPackageWeight] = useState('')

  const shippingMethods = [
    'Express Shipping',
    'Standard Shipping',
    'Economy Shipping',
    'International Shipping',
    'Same-Day Delivery',
    'Next-Day Delivery',
    'Freight Shipping',
    'Air Cargo',
    'Sea Freight',
    'Ground Shipping',
    'Overnight Shipping',
    'Priority Mail',
    'Parcel Shipping',
    'Bulk Shipping',
    'Refrigerated Shipping',
    'Hazardous Materials Shipping',
  ]

  const shippingDestinations = [
    'Domestic',
    'International',
    'North America',
    'Europe',
    'Asia Pacific',
    'Latin America',
    'Middle East',
    'Africa',
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden min-h-[600px] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
            style={{ objectFit: 'cover' }}
          >
            <source src="/video/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for better text readability - darker overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-800/50 to-gray-900/60 z-10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-cyan-300 mb-6 leading-tight tracking-tight">
              Master the Art of <span className="text-cyan-100">Sh<span className="relative inline-block align-baseline">
                <div className='mt-[0.05em]'>
                <img 
                  src="/image/1.png" 
                  alt="i" 
                  className="inline-block  h-[0.6em] w-[0.4em] rotate-180 align-baseline"
                  style={{ marginTop: 0, padding: 0, verticalAlign: 'baseline' }}
                />
                </div>
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-400 text-[1em] leading-none pointer-events-none">·</span>
              </span>pping</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-amber-100 mb-4">
              Navaro teaches you everything about shipping and logistics!
            </p>
            <p className="text-xl md:text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed font-medium" >
              Transform your shipping operations with expert insights, powerful tools, and comprehensive resources designed for modern businesses.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full mb-8"></div>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Learn About Shipping
            </Link>
          </div>
        </div>
      </section>

      {/* Benchmark Discovery Section */}
      

      {/* 3 Steps Section */}
     

      {/* Your Business, Our Solutions Section */}
      <section className="py-20 bg-primary-50 relative overflow-hidden">
        {/* Wave Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-12" viewBox="0 0 1200 250" preserveAspectRatio="none">
            <path d="M0,125 Q400,75 800,125 T1200,125 L1200,250 L0,250 Z" fill="url(#waveGradient7)" />
            <defs>
              <linearGradient id="waveGradient7" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute bottom-0 right-0 w-full h-full opacity-12" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradient8)" />
            <defs>
              <linearGradient id="waveGradient8" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Your business, our <span className="text-cyan-400">shipping solutions</span>!
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              Learn shipping best practices, optimize logistics costs, and streamline your supply chain. 
              We provide comprehensive shipping education and solutions for businesses of all sizes.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tax Advisor */}
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-10 border-2 border-cyan-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                <h3 className="text-3xl font-extrabold text-gray-900">E-Commerce Businesses</h3>
              </div>
              
              <div className="mb-8 ml-6">
                <h4 className="text-xl font-bold text-gray-800 mb-6 leading-tight">
                  Running an online store and need shipping guidance?
                </h4>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Learn shipping rate optimization strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Understand packaging and labeling requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Master international shipping regulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Reduce shipping costs and improve margins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Streamline order fulfillment processes</span>
                  </li>
                </ul>
              </div>

              <div className="ml-6">
                <h4 className="text-xl font-bold text-gray-800 mb-6 leading-tight">
                  Already have a logistics team?
                </h4>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Enhance your team&apos;s shipping knowledge and efficiency</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Company */}
            <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-10 border-2 border-cyan-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-2 h-12 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                <h3 className="text-3xl font-extrabold text-gray-900">Manufacturers & Wholesalers</h3>
              </div>
              
              <div className="ml-6">
                <h4 className="text-xl font-bold text-gray-800 mb-6 leading-tight">
                  All industries, all sizes. Whether you&apos;re a startup, manufacturer, or established business shipping products
                </h4>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Learn freight shipping and bulk logistics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Understand customs and import/export procedures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Optimize supply chain and reduce shipping costs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 text-xl font-bold">✓</span>
                    <span className="text-lg font-medium leading-relaxed">Master warehouse management and fulfillment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modules Overview Section */}
      <section className="py-20 bg-primary-50 relative overflow-hidden">
        {/* Wave Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 1200 250" preserveAspectRatio="none">
            <path d="M0,125 Q400,75 800,125 T1200,125 L1200,250 L0,250 Z" fill="url(#waveGradient10)" />
            <defs>
              <linearGradient id="waveGradient10" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradient11)" />
            <defs>
              <linearGradient id="waveGradient11" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Comprehensive <span className="text-cyan-400">Learning Modules</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              Master shipping and logistics with our comprehensive educational modules covering all aspects of international trade
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Customs Documentation */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Customs Documentation</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Learn how to prepare and file all required customs documents including commercial invoices, packing lists, and certificates of origin.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Commercial Invoice preparation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Packing List requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Certificate of Origin</span>
                </li>
              </ul>
            </div>

            {/* Import/Export Regulations */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Import/Export Regulations</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Understand international trade regulations, compliance requirements, and country-specific import/export rules.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Country-specific regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Compliance requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Trade agreements</span>
                </li>
              </ul>
            </div>

            {/* HS Code Classification */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">HS Code Classification</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Master the Harmonized System (HS) code classification for accurate product categorization and duty calculation.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>HS code lookup and search</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Product classification guide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Duty rate determination</span>
                </li>
              </ul>
            </div>

            {/* Prohibited Items */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Prohibited Items</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Learn about restricted and prohibited items for international shipping to avoid customs issues and delays.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Restricted items list</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Country-specific restrictions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span>Special permits required</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Additional Learning Modules */}
            <div className="group bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 shadow-xl border-2 border-cyan-200 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Duty & Tax Calculation</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Learn how to calculate import duties, taxes, and fees accurately for different countries and product categories.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 shadow-xl border-2 border-cyan-200 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Packaging & Labeling</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Master proper packaging techniques and labeling requirements for safe and compliant shipments.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 shadow-xl border-2 border-cyan-200 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">Shipping Methods</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Compare shipping methods, carriers, and delivery options to choose the best solution for your needs.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/resources"
              className="inline-block bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore All Learning Modules
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
        {/* Wave Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 Q200,50 400,100 T800,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradient9)" />
            <defs>
              <linearGradient id="waveGradient9" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Featured <span className="text-cyan-400">Tools</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              Powerful shipping tools to streamline your logistics operations and save time
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
          </div>

          {/* Horizontal List Style Layout */}
          <div className="space-y-4">
            {/* CBM Calculator */}
            <Link href="/tools#cbm" className="group block bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-400 hover:shadow-xl hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">CBM Calculator</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Calculate cubic meters instantly for accurate shipping volume and freight cost estimation.
                    </p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Packing List & Invoice Templates */}
            <Link href="/tools#templates" className="group block bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-400 hover:shadow-xl hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Templates</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Download professional packing list and invoice templates for seamless documentation.
                    </p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Documentation Check */}
            <Link href="/tools#documentation" className="group block bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-400 hover:shadow-xl hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Documentation Check</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Verify all required shipping documents are complete before shipment to avoid delays.
                    </p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Duty Calculation */}
            <Link href="/tools#duty" className="group block bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-400 hover:shadow-xl hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Duty Calculation</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Calculate import duties and taxes accurately based on product value and duty rates.
                    </p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Landing Cost Calculator */}
            <Link href="/tools#landing-cost" className="group block bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-400 hover:shadow-xl hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Landing Cost Calculator</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Calculate total landing costs including product cost, duties, shipping, and other fees.
                    </p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Vessel Tracking */}
            <Link href="/tools#vessel-tracking" className="group block bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-400 hover:shadow-xl hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Vessel Tracking</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Track your vessel in real-time using vessel number or name for ocean freight shipments.
                    </p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Container Tracking */}
            <Link href="/tools#container-tracking" className="group block bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-400 hover:shadow-xl hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">Container Tracking</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Track shipping containers by container number to monitor your cargo location.
                    </p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="inline-block bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        {/* Wave Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 Q300,150 600,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradient12)" />
            <defs>
              <linearGradient id="waveGradient12" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              What Our <span className="text-cyan-400">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              Trusted by businesses worldwide to streamline their shipping and logistics operations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed font-medium mb-6">
                &quot;Navaro has completely transformed how we handle shipping. The tools are intuitive and the learning modules helped our team understand international shipping regulations. Highly recommended!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  SM
                </div>
                <div>
                  <p className="font-extrabold text-gray-900">Sarah Mitchell</p>
                  <p className="text-sm text-gray-600">E-Commerce Director</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed font-medium mb-6">
                &quot;The CBM calculator and duty calculation tools saved us hours of manual work. The documentation check feature ensures we never miss any required paperwork. Excellent platform!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  JD
                </div>
                <div>
                  <p className="font-extrabold text-gray-900">James Davis</p>
                  <p className="text-sm text-gray-600">Logistics Manager</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed font-medium mb-6">
                &quot;As a small business owner, Navaro made international shipping accessible. The learning modules are comprehensive and the templates saved me so much time. Worth every penny!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  EW
                </div>
                <div>
                  <p className="font-extrabold text-gray-900">Emily Wilson</p>
                  <p className="text-sm text-gray-600">Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

