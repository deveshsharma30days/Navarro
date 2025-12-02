'use client'

import Link from 'next/link'

export default function Tools() {
  const tools = [
    {
      id: 'cbm',
      title: 'CBM Calculator',
      description: 'Calculate cubic meters instantly for accurate shipping volume and freight cost estimation.',
      details: 'Perfect for FCL and LCL shipments. Supports multiple units (m, cm, mm, in, ft) with automatic conversion. Get instant CBM calculations, volume weight, and container suggestions for 20\'GP, 40\'GP, and 40\'HC containers.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-cyan-400 to-blue-500',
      bgPattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-cbm" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid-cbm)" />
        </svg>
      ),
    },
    {
      id: 'cbm-3d',
      title: 'CBM Calculator 3D',
      description: 'Visualize container packing with interactive 3D viewer. See how boxes fit in shipping containers.',
      details: 'Experience real-time 3D visualization of your cargo placement. Rotate, zoom, and explore container layouts. Supports multiple container types with visual fill percentage indicators. Export screenshots and CSV data for documentation.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-600',
      bgPattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-3d" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="1" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid-3d)" />
        </svg>
      ),
    },
    {
      id: 'templates',
      title: 'Templates',
      description: 'Download professional packing list and invoice templates for seamless documentation.',
      details: 'Access ready-to-use templates for packing lists, commercial invoices, and shipping labels. All templates are compliant with international shipping standards. Customize and download in multiple formats including PDF, Excel, and Word.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'from-blue-400 to-cyan-500',
      bgPattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="lines-templates" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#lines-templates)" />
        </svg>
      ),
    },
    {
      id: 'documentation',
      title: 'Documentation Check',
      description: 'Verify all required shipping documents are complete before shipment to avoid delays.',
      details: 'Comprehensive checklist for international shipping documents including commercial invoices, packing lists, certificates of origin, and customs declarations. Get country-specific requirements and avoid costly delays at customs.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-cyan-400 to-teal-500',
      bgPattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dots-docs" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots-docs)" />
        </svg>
      ),
    },
    {
      id: 'duty',
      title: 'Duty Calculation',
      description: 'Calculate import duties and taxes accurately based on product value and duty rates.',
      details: 'Calculate import and export duties for multiple countries with HS code lookup. Includes GST, VAT, and other applicable taxes. Get detailed cost breakdowns showing CIF value, duty amounts, and total landed costs. Supports major trading countries.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-teal-400 to-cyan-500',
      bgPattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="waves-duty" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M0,15 Q7.5,10 15,15 T30,15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#waves-duty)" />
        </svg>
      ),
    },
    {
      id: 'landing-cost',
      title: 'Landing Cost Calculator',
      description: 'Calculate total landing costs including product cost, duties, shipping, and other fees.',
      details: 'Comprehensive cost calculator that factors in product cost, shipping fees, insurance, duties, taxes, handling charges, and port fees. Get accurate total landed cost estimates to make informed purchasing decisions and optimize your supply chain.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'from-cyan-500 to-blue-600',
      bgPattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="bars-cost" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="2" height="8" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#bars-cost)" />
        </svg>
      ),
    },
    {
      id: 'vessel-tracking',
      title: 'Vessel Tracking',
      description: 'Track your vessel in real-time using vessel number or name for ocean freight shipments.',
      details: 'Monitor your ocean freight shipments with real-time vessel tracking. Get current location, estimated arrival times, port schedules, and route information. Track multiple vessels simultaneously and receive alerts for schedule changes.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-600',
      bgPattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="waves-vessel" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M0,12.5 Q6.25,6.25 12.5,12.5 T25,12.5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#waves-vessel)" />
        </svg>
      ),
    },
    {
      id: 'container-tracking',
      title: 'Container Tracking',
      description: 'Track shipping containers by container number to monitor your cargo location.',
      details: 'Track individual containers using container numbers across major shipping lines. View container status, location history, gate-in/out times, and delivery updates. Integrates with major carriers for accurate real-time tracking information.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-teal-500 to-cyan-600',
      bgPattern: (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-container" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid-container)" />
        </svg>
      ),
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

      {/* Shipping Container Illustration - Top Right */}
      <div className="absolute top-20 right-10 w-64 h-64 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="60" width="160" height="120" fill="none" stroke="#0ea5e9" strokeWidth="3" rx="4"/>
          <rect x="30" y="70" width="140" height="100" fill="none" stroke="#22d3ee" strokeWidth="2" rx="2"/>
          <line x1="30" y1="120" x2="170" y2="120" stroke="#0ea5e9" strokeWidth="2"/>
          <line x1="30" y1="140" x2="170" y2="140" stroke="#0ea5e9" strokeWidth="2"/>
          <circle cx="50" cy="100" r="8" fill="#22d3ee" opacity="0.5"/>
          <circle cx="150" cy="100" r="8" fill="#22d3ee" opacity="0.5"/>
        </svg>
      </div>

      {/* Cargo Ship Illustration - Top Left */}
      <div className="absolute top-32 left-10 w-72 h-48 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 140 L280 140 L260 100 L40 100 Z" fill="none" stroke="#0ea5e9" strokeWidth="3"/>
          <rect x="60" y="80" width="180" height="60" fill="none" stroke="#22d3ee" strokeWidth="2" rx="2"/>
          <rect x="80" y="60" width="140" height="20" fill="none" stroke="#0ea5e9" strokeWidth="2" rx="2"/>
          <circle cx="100" cy="110" r="12" fill="#22d3ee" opacity="0.4"/>
          <circle cx="200" cy="110" r="12" fill="#22d3ee" opacity="0.4"/>
          <path d="M20 140 Q10 150 20 160 L280 160 Q290 150 280 140" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
        </svg>
      </div>

      {/* Shipping Boxes Illustration - Bottom Left */}
      <div className="absolute bottom-20 left-16 w-56 h-56 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="80" width="60" height="60" fill="none" stroke="#0ea5e9" strokeWidth="2" rx="2"/>
          <rect x="100" y="100" width="60" height="60" fill="none" stroke="#22d3ee" strokeWidth="2" rx="2"/>
          <line x1="70" y1="80" x2="70" y2="140" stroke="#0ea5e9" strokeWidth="2"/>
          <line x1="40" y1="110" x2="100" y2="110" stroke="#0ea5e9" strokeWidth="2"/>
          <line x1="130" y1="100" x2="130" y2="160" stroke="#22d3ee" strokeWidth="2"/>
          <line x1="100" y1="130" x2="160" y2="130" stroke="#22d3ee" strokeWidth="2"/>
        </svg>
      </div>

      {/* Cargo Plane Illustration - Bottom Right */}
      <div className="absolute bottom-32 right-16 w-64 h-48 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 250 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="125" cy="90" rx="100" ry="30" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
          <rect x="50" y="80" width="150" height="20" fill="none" stroke="#22d3ee" strokeWidth="2" rx="2"/>
          <path d="M200 90 L220 70 L230 90 L220 110 Z" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
          <path d="M50 90 L30 70 L20 90 L30 110 Z" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
          <circle cx="125" cy="90" r="15" fill="#22d3ee" opacity="0.3"/>
        </svg>
      </div>

      {/* Warehouse Illustration - Middle Right */}
      <div className="absolute top-1/2 right-20 transform -translate-y-1/2 w-48 h-48 opacity-5 pointer-events-none hidden xl:block">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="100" width="140" height="80" fill="none" stroke="#0ea5e9" strokeWidth="2" rx="2"/>
          <path d="M30 100 L100 40 L170 100" fill="none" stroke="#22d3ee" strokeWidth="2"/>
          <rect x="50" y="120" width="30" height="40" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
          <rect x="120" y="120" width="30" height="40" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
          <line x1="65" y1="120" x2="65" y2="160" stroke="#22d3ee" strokeWidth="1"/>
          <line x1="50" y1="140" x2="80" y2="140" stroke="#22d3ee" strokeWidth="1"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          {/* Shipping Icons Decoration */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl opacity-10 pointer-events-none">
            <div className="flex justify-center items-center gap-8">
              {/* Container Icon */}
              <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                <rect x="15" y="30" width="70" height="50" fill="none" stroke="currentColor" strokeWidth="2" rx="2"/>
                <line x1="15" y1="55" x2="85" y2="55" stroke="currentColor" strokeWidth="1"/>
                <circle cx="30" cy="42" r="4" fill="currentColor" opacity="0.5"/>
                <circle cx="70" cy="42" r="4" fill="currentColor" opacity="0.5"/>
              </svg>
              {/* Ship Icon */}
              <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                <path d="M10 70 L90 70 L85 50 L15 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="25" y="45" width="50" height="25" fill="none" stroke="currentColor" strokeWidth="1.5" rx="1"/>
                <circle cx="35" cy="57" r="5" fill="currentColor" opacity="0.3"/>
                <circle cx="65" cy="57" r="5" fill="currentColor" opacity="0.3"/>
              </svg>
              {/* Plane Icon */}
              <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="20" y="46" width="60" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" rx="1"/>
                <path d="M85 50 L95 40 L100 50 L95 60 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight relative z-10">
            Shipping <span className="text-cyan-400">Tools</span>
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-4 relative z-10">
            Essential tools to streamline your shipping and logistics operations
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full relative z-10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.id === 'cbm' ? '/tools/cbm' : tool.id === 'cbm-3d' ? '/tools/cbm-3d' : tool.id === 'duty' ? '/tools/duty' : `#${tool.id}`}
              className="group relative rounded-3xl p-8 overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                {tool.bgPattern}
              </div>

              {/* Shipping Decorative Icon - Top Right Corner */}
              <div className="absolute top-4 right-4 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                {tool.id === 'cbm' || tool.id === 'cbm-3d' ? (
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <rect x="20" y="30" width="60" height="50" fill="none" stroke="currentColor" strokeWidth="2" rx="2"/>
                    <line x1="20" y1="55" x2="80" y2="55" stroke="currentColor" strokeWidth="1"/>
                    <circle cx="35" cy="42" r="3" fill="currentColor"/>
                    <circle cx="65" cy="42" r="3" fill="currentColor"/>
                  </svg>
                ) : tool.id === 'vessel-tracking' || tool.id === 'container-tracking' ? (
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <path d="M10 60 L90 60 L85 40 L15 40 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <rect x="25" y="35" width="50" height="25" fill="none" stroke="currentColor" strokeWidth="1.5" rx="1"/>
                    <circle cx="40" cy="47" r="4" fill="currentColor" opacity="0.4"/>
                    <circle cx="60" cy="47" r="4" fill="currentColor" opacity="0.4"/>
                  </svg>
                ) : tool.id === 'duty' || tool.id === 'landing-cost' ? (
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M35 50 L45 60 L65 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : tool.id === 'templates' ? (
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <rect x="25" y="20" width="50" height="60" fill="none" stroke="currentColor" strokeWidth="2" rx="2"/>
                    <line x1="35" y1="35" x2="65" y2="35" stroke="currentColor" strokeWidth="2"/>
                    <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="2"/>
                    <line x1="35" y1="65" x2="55" y2="65" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <rect x="20" y="40" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="2" rx="2"/>
                    <line x1="30" y1="40" x2="30" y2="80" stroke="currentColor" strokeWidth="1"/>
                    <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                )}
              </div>

              {/* Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}></div>
              
              {/* Animated Gradient Blob */}
              <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${tool.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 group-hover:scale-150 transition-all duration-700`}></div>
              <div className={`absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br ${tool.gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-15 group-hover:scale-150 transition-all duration-700`}></div>
              
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-t-3xl"></div>
              
              {/* Icon Container with Glass Effect */}
              <div className={`relative w-24 h-24 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white z-10`}
                style={{
                  background: `linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(59, 130, 246, 0.9))`,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px 0 rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {tool.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors leading-tight">
                  {tool.title}
                </h3>
                <p className="text-gray-700 leading-relaxed font-medium mb-3 text-sm">
                  {tool.description}
                </p>
                <p className="text-gray-600 leading-relaxed text-xs mb-6 opacity-80">
                  {tool.details}
                </p>

                {/* Apple iOS Style Glass Button */}
                <div className="relative inline-flex items-center justify-center px-6 py-3 rounded-full overflow-hidden group/btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 4px 16px 0 rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {/* Button Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300`}></div>
                  
                  {/* Button Content */}
                  <span className="relative text-cyan-600 font-semibold text-sm group-hover/btn:text-cyan-700 transition-colors flex items-center gap-2">
                    Use Tool
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </div>
              </div>

              {/* Border Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-xl`}></div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

