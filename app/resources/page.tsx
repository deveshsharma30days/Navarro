'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('basics')
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const categories = [
    {
      id: 'basics',
      name: 'Shipping Basics',
      topics: [
        'Understanding Shipping Methods',
        'Packaging Best Practices',
        'Labeling Requirements',
        'Shipping Insurance',
        'Tracking Packages',
        'Handling Returns',
      ],
      description: 'Learn the fundamentals of shipping, from choosing the right method to packaging your products correctly.',
      content: {
        overview: 'Shipping basics cover everything you need to know to get started with shipping products. This includes understanding different shipping methods, proper packaging techniques, and essential labeling requirements.',
        methods: 'Common shipping methods include Express (1-3 days), Standard (3-7 days), and Economy (7-14 days). Choose based on your customer needs and budget.',
        packaging: 'Proper packaging protects your products during transit. Use appropriate box sizes, padding materials, and secure closures to prevent damage.',
      },
    },
    {
      id: 'international',
      name: 'International Shipping',
      topics: [
        'Customs Documentation',
        'Duty & Tax Calculation',
        'Import/Export Regulations',
        'International Carriers',
        'Prohibited Items',
        'HS Code Classification',
      ],
      description: 'Master international shipping with guides on customs, duties, regulations, and cross-border logistics.',
      content: {
        overview: 'International shipping requires understanding customs procedures, duty calculations, and country-specific regulations. Proper documentation is crucial for smooth cross-border shipments.',
        customs: 'Customs documentation typically includes commercial invoices, packing lists, and certificates of origin. Requirements vary by country and product type.',
        duties: 'Duties and taxes are calculated based on the product value, origin country, and destination. Use HS codes to determine applicable rates.',
      },
    },
    {
      id: 'optimization',
      name: 'Cost Optimization',
      topics: [
        'Carrier Comparison',
        'Rate Negotiation',
        'Bulk Shipping Discounts',
        'Zone Skipping',
        'Dimensional Weight',
        'Shipping Software',
      ],
      description: 'Learn strategies to reduce shipping costs and optimize your logistics operations.',
      content: {
        overview: 'Shipping cost optimization involves comparing carriers, negotiating rates, and implementing strategies to reduce overall logistics expenses.',
        carriers: 'Compare rates across multiple carriers (USPS, FedEx, UPS, DHL) to find the best rates for your shipping volume and destinations.',
        strategies: 'Strategies include negotiating volume discounts, using zone skipping for long distances, and optimizing package dimensions to avoid dimensional weight charges.',
      },
    },
  ]

  const activeCategoryData = categories.find(c => c.id === activeCategory)!

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Shipping <span className="text-cyan-400">Resources</span>
          </h1>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium mb-4">
            Comprehensive guides and resources covering all aspects of shipping and logistics
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            Need help with a specific shipping topic?{' '}
            <a href="/contact" className="text-cyan-400 hover:text-cyan-500 font-semibold underline">
              Contact Us
            </a>
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-400 to-primary-500 text-white shadow-xl transform scale-105'
                  : 'bg-white text-gray-700 border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-lg'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-cyan-100 p-10 mb-8">
          {/* Description */}
          <div className="mb-8">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              {activeCategoryData.description}
            </p>
          </div>

          {/* Topics */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
              <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
              Topics Covered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-6">
              {activeCategoryData.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-3 text-gray-800 font-medium hover:bg-cyan-100 transition-colors"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection('overview')}
              className="w-full text-left flex items-center justify-between mb-4"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                Overview
              </h2>
              <svg
                className={`w-6 h-6 text-cyan-400 transition-transform ${expandedSections.overview ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedSections.overview && (
              <div className="ml-6 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {activeCategoryData.content.overview}
                </p>
              </div>
            )}
          </div>

          {/* Additional Content Sections */}
          {activeCategoryData.content.methods && (
            <div className="mb-8">
              <button
                onClick={() => toggleSection('methods')}
                className="w-full text-left flex items-center justify-between mb-4"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                  <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                  Shipping Methods
                </h2>
                <svg
                  className={`w-6 h-6 text-cyan-400 transition-transform ${expandedSections.methods ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.methods && (
                <div className="ml-6 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {activeCategoryData.content.methods}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeCategoryData.content.packaging && (
            <div className="mb-8">
              <button
                onClick={() => toggleSection('packaging')}
                className="w-full text-left flex items-center justify-between mb-4"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                  <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                  Packaging Guidelines
                </h2>
                <svg
                  className={`w-6 h-6 text-cyan-400 transition-transform ${expandedSections.packaging ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.packaging && (
                <div className="ml-6 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {activeCategoryData.content.packaging}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeCategoryData.content.customs && (
            <div className="mb-8">
              <button
                onClick={() => toggleSection('customs')}
                className="w-full text-left flex items-center justify-between mb-4"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                  <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                  Customs Documentation
                </h2>
                <svg
                  className={`w-6 h-6 text-cyan-400 transition-transform ${expandedSections.customs ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.customs && (
                <div className="ml-6 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {activeCategoryData.content.customs}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeCategoryData.content.duties && (
            <div className="mb-8">
              <button
                onClick={() => toggleSection('duties')}
                className="w-full text-left flex items-center justify-between mb-4"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                  <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                  Duties & Taxes
                </h2>
                <svg
                  className={`w-6 h-6 text-cyan-400 transition-transform ${expandedSections.duties ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.duties && (
                <div className="ml-6 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {activeCategoryData.content.duties}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeCategoryData.content.carriers && (
            <div className="mb-8">
              <button
                onClick={() => toggleSection('carriers')}
                className="w-full text-left flex items-center justify-between mb-4"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                  <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                  Carrier Comparison
                </h2>
                <svg
                  className={`w-6 h-6 text-cyan-400 transition-transform ${expandedSections.carriers ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.carriers && (
                <div className="ml-6 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {activeCategoryData.content.carriers}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeCategoryData.content.strategies && (
            <div className="mb-8">
              <button
                onClick={() => toggleSection('strategies')}
                className="w-full text-left flex items-center justify-between mb-4"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
                  <div className="w-2 h-10 bg-gradient-to-b from-cyan-400 to-primary-500 rounded-full mr-4"></div>
                  Optimization Strategies
                </h2>
                <svg
                  className={`w-6 h-6 text-cyan-400 transition-transform ${expandedSections.strategies ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.strategies && (
                <div className="ml-6 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {activeCategoryData.content.strategies}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tools Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Shipping <span className="text-cyan-400">Tools</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
              Essential tools to streamline your shipping and logistics operations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CBM Calculator */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">CBM Calculator</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Calculate cubic meters instantly for accurate shipping volume and freight cost estimation.
              </p>
              <Link
                href="/tools#cbm"
                className="inline-block w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Use Tool
              </Link>
            </div>

            {/* Packing List & Invoice Templates */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Templates</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Download professional packing list and invoice templates for seamless documentation.
              </p>
              <Link
                href="/tools#templates"
                className="inline-block w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Use Tool
              </Link>
            </div>

            {/* Documentation Check */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Documentation Check</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Verify all required shipping documents are complete before shipment to avoid delays.
              </p>
              <Link
                href="/tools#documentation"
                className="inline-block w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Use Tool
              </Link>
            </div>

            {/* Duty Calculation */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Duty Calculation</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Calculate import duties and taxes accurately based on product value and duty rates.
              </p>
              <Link
                href="/tools#duty"
                className="inline-block w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Use Tool
              </Link>
            </div>

            {/* Landing Cost Calculator */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Landing Cost Calculator</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Calculate total landing costs including product cost, duties, shipping, and other fees.
              </p>
              <Link
                href="/tools#landing-cost"
                className="inline-block w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Use Tool
              </Link>
            </div>

            {/* Vessel Tracking */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Vessel Tracking</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Track your vessel in real-time using vessel number or name for ocean freight shipments.
              </p>
              <Link
                href="/tools#vessel-tracking"
                className="inline-block w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Use Tool
              </Link>
            </div>

            {/* Container Tracking */}
            <div className="group bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">Container Tracking</h3>
              <p className="text-gray-600 leading-relaxed font-medium mb-4">
                Track shipping containers by container number to monitor your cargo location.
              </p>
              <Link
                href="/tools#container-tracking"
                className="inline-block w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Use Tool
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
