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
      <section className="py-20 relative overflow-hidden">
        {/* Wave Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradient1)" />
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ transform: 'scaleX(-1)' }}>
            <path d="M0,100 Q300,150 600,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradient2)" />
            <defs>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              Master the Art of <span className="text-cyan-400">Shipping</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
              Navarro teaches you everything about shipping and logistics!
            </p>
            <p className="text-xl md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              Learn shipping best practices, optimize your logistics, and streamline your supply chain. 
              Get expert guidance on shipping methods, rates, and international shipping requirements!
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
      <section className="py-20 relative overflow-hidden">
        {/* Wave Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 right-0 w-full h-full opacity-8" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path d="M0,150 Q400,100 800,150 T1200,150 L1200,300 L0,300 Z" fill="url(#waveGradient3)" />
            <defs>
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-8" viewBox="0 0 1200 250" preserveAspectRatio="none">
            <path d="M0,125 Q300,75 600,125 T1200,125 L1200,250 L0,250 Z" fill="url(#waveGradient4)" />
            <defs>
              <linearGradient id="waveGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Get your <span className="text-cyan-400">shipping quote</span> now!
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              Calculate shipping rates and delivery times based on your shipping method, destination, and package details. 
              Get instant quotes for domestic and international shipping.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300">
            <form className="space-y-6">
              <div>
                <label htmlFor="shipping-method" className="block text-base font-semibold text-gray-800 mb-3">
                  Shipping Method *
                </label>
                <select
                  id="shipping-method"
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-gray-700 font-medium bg-white transition-all hover:border-cyan-300"
                >
                  <option value="">Select shipping method</option>
                  {shippingMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="destination" className="block text-base font-semibold text-gray-800 mb-3">
                  Destination *
                </label>
                <select
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-gray-700 font-medium bg-white transition-all hover:border-cyan-300"
                >
                  <option value="">Select destination</option>
                  {shippingDestinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="package-weight" className="block text-base font-semibold text-gray-800 mb-3">
                  Package Weight (kg) *
                </label>
                <select
                  id="package-weight"
                  value={packageWeight}
                  onChange={(e) => setPackageWeight(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-gray-700 font-medium bg-white transition-all hover:border-cyan-300"
                >
                  <option value="">Select package weight</option>
                  <option value="0-1">0-1 kg</option>
                  <option value="1-5">1-5 kg</option>
                  <option value="5-10">5-10 kg</option>
                  <option value="10-20">10-20 kg</option>
                  <option value="20+">20+ kg</option>
                </select>
              </div>

              <p className="text-base text-gray-600 font-medium">
                Need help with custom shipping solutions?{' '}
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-500 font-semibold underline">
                  Contact our shipping experts.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Wave Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,100 Q200,50 400,100 T800,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradient5)" />
            <defs>
              <linearGradient id="waveGradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute bottom-0 right-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ transform: 'scaleX(-1)' }}>
            <path d="M0,100 Q300,150 600,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradient6)" />
            <defs>
              <linearGradient id="waveGradient6" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              In just <span className="text-cyan-400">3 steps</span>...
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 text-center transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-cyan-400 to-primary-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-extrabold text-white">1</span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Choose your shipping method</h3>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                Select from express, standard, economy, or specialized shipping options
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 text-center transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-cyan-400 to-primary-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-extrabold text-white">2</span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Get shipping rates & quotes</h3>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                Calculate shipping costs and delivery times instantly
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 text-center transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-cyan-400 to-primary-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-extrabold text-white">3</span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Ship with confidence</h3>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                Track your packages and manage your shipments efficiently
              </p>
            </div>
          </div>
        </div>
      </section>

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
                    <span className="text-lg font-medium leading-relaxed">Enhance your team's shipping knowledge and efficiency</span>
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
                  All industries, all sizes. Whether you're a startup, manufacturer, or established business shipping products
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
    </main>
  )
}

