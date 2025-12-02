'use client'

import Link from 'next/link'

export default function Tools() {
  const tools = [
    {
      id: 'cbm',
      title: 'CBM Calculator',
      description: 'Calculate cubic meters instantly for accurate shipping volume and freight cost estimation.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      id: 'cbm-3d',
      title: 'CBM Calculator 3D',
      description: 'Visualize container packing with interactive 3D viewer. See how boxes fit in shipping containers.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'templates',
      title: 'Templates',
      description: 'Download professional packing list and invoice templates for seamless documentation.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      id: 'documentation',
      title: 'Documentation Check',
      description: 'Verify all required shipping documents are complete before shipment to avoid delays.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-cyan-400 to-teal-500',
    },
    {
      id: 'duty',
      title: 'Duty Calculation',
      description: 'Calculate import duties and taxes accurately based on product value and duty rates.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-teal-400 to-cyan-500',
    },
    {
      id: 'landing-cost',
      title: 'Landing Cost Calculator',
      description: 'Calculate total landing costs including product cost, duties, shipping, and other fees.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'vessel-tracking',
      title: 'Vessel Tracking',
      description: 'Track your vessel in real-time using vessel number or name for ocean freight shipments.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'container-tracking',
      title: 'Container Tracking',
      description: 'Track shipping containers by container number to monitor your cargo location.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-teal-500 to-cyan-600',
    },
  ]

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      {/* Wave Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 Q200,50 400,100 T800,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradientTools)" />
          <defs>
            <linearGradient id="waveGradientTools" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Shipping <span className="text-cyan-400">Tools</span>
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4">
            Essential tools to streamline your shipping and logistics operations
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.id === 'cbm' ? '/tools/cbm' : tool.id === 'cbm-3d' ? '/tools/cbm-3d' : tool.id === 'duty' ? '/tools/duty' : `#${tool.id}`}
              className="group relative bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden"
            >
              {/* Gradient Background Effect */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Icon Container */}
              <div className={`relative w-20 h-20 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white`}>
                {tool.icon}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium mb-6">
                  {tool.description}
                </p>

                {/* Link Arrow */}
                <div className="flex items-center text-cyan-400 font-semibold group-hover:text-cyan-500 transition-colors">
                  <span>Use Tool</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

