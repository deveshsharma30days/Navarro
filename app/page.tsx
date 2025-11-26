'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [transactionType, setTransactionType] = useState('')
  const [location, setLocation] = useState('')
  const [fiscalYear, setFiscalYear] = useState('')

  const transactionTypes = [
    'Administration services',
    'Commercial printing',
    'Customer support services',
    'Engineering services',
    'Home furnishing products manufacturing',
    'HQ services',
    'Laboratory services',
    'Logistic services',
    'Management services',
    'Manufacturing services(Electronics)',
    'Manufacturing services (HVAC and large kitchen appliances)',
    'Manufacturing services (Motor parts)',
    'Marketing services',
    'Medical devices manufacturing',
    'Metal smelting services',
    'Software R&D services',
    'Textile manufacturing services',
    'Consumer goods wholesale',
    'E-Commerce resale',
    'Fashion and accessories wholesale',
    'Home furnishing wholesale',
    'Industrial metal products wholesale',
    'Industrial products wholesale',
    'Industrial products value-added distributor',
    'Medical devices distribution',
    'Software resale',
    'Software license royalties',
    'Sales commission',
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Automate Transfer Pricing Reports
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              Navarro helps you create your transfer pricing reports effortlessly!
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience our premier self-guided solution for US and OECD transfer pricing reports. 
              Create your report with ease, no know-how required!
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact our experts
            </Link>
          </div>
        </div>
      </section>

      {/* Benchmark Discovery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover your benchmark range now!
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              For each transaction type, the transfer pricing model provides insights through preset benchmarks 
              based on the geographical location of the service provider, reseller, or licensee.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-md border border-primary-100">
            <form className="space-y-6">
              <div>
                <label htmlFor="transaction-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction type *
                </label>
                <select
                  id="transaction-type"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select transaction type</option>
                  {transactionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select location</option>
                  <option value="America">America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                </select>
              </div>

              <div>
                <label htmlFor="fiscal-year" className="block text-sm font-medium text-gray-700 mb-2">
                  Fiscal year *
                </label>
                <select
                  id="fiscal-year"
                  value={fiscalYear}
                  onChange={(e) => setFiscalYear(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select fiscal year</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <p className="text-sm text-gray-500">
                Is your transaction type not listed?{' '}
                <Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">
                  Talk to us to add it.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              In just 3 steps...
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select your transaction type</h3>
              <p className="text-gray-600">
                Choose from our comprehensive list of transaction types
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete our questionnaire</h3>
              <p className="text-gray-600">
                Answer a few simple questions about your business
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download your report</h3>
              <p className="text-gray-600">
                Get your transfer pricing report instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Business, Our Solutions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your business, our solutions!
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              By combining a self-guided questionnaire and our fixed benchmarks, we created a powerful tool 
              that democratize transfer pricing to tax Advisors and Companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tax Advisor */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 border border-primary-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tax Advisor</h3>
              
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  You have multinational clients, but not a transfer pricing team?
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Provide your multinational clients an added-value service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Private label / co-branded transfer pricing reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Block competitors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Refer & Review</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Grow internationally with your clients</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Already have a transfer pricing team?
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Use Navarro to reduce your cost of service</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Company */}
            <div className="bg-gradient-to-br from-white to-primary-50 rounded-lg p-8 border border-primary-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Company</h3>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  All industries, all sizes. Startup, ecommerce, manufacturer… if you have a foreign entity(ies)
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Lower your compliance cost</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Maintain your company's compliance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Save time</span>
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

