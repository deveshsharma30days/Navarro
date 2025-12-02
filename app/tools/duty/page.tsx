'use client'

import { useState } from 'react'

interface DutyRates {
  [key: string]: {
    import: number
    export: number
    vat: number
  }
}

interface CountryRates {
  [key: string]: {
    base: number
    vat: number
    gst: number
  }
}

interface ImportResults {
  productValue: number
  shipping: number
  insurance: number
  cifValue: number
  dutyRate: number
  importDuty: number
  vatRate: number
  vatAmount: number
  gstRate: number
  gstAmount: number
  totalTax: number
  totalCost: number
  type: 'import'
  country: string
  hsCode: string
}

interface ExportResults {
  productValue: number
  exportDuty: number
  dutyRate: number
  shippingCost: number
  documentationFees: number
  totalCost: number
  type: 'export'
  country: string
  origin: string
  hsCode: string
}

export default function DutyCalculator() {
  const [importData, setImportData] = useState({
    productValue: '',
    hsCode: '',
    country: 'IN',
    shipping: '3500',
    insurance: '1500',
  })

  const [exportData, setExportData] = useState({
    productValue: '',
    hsCode: '',
    country: '',
    origin: 'IN',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState<ImportResults | ExportResults | null>(null)
  const [calculationType, setCalculationType] = useState<'import' | 'export' | null>(null)

  const dutyRates: DutyRates = {
    '847130': { import: 10, export: 0, vat: 18 },
    '851712': { import: 12, export: 0, vat: 18 },
    '870323': { import: 15, export: 0, vat: 18 },
    '610910': { import: 20, export: 0, vat: 12 },
    '300490': { import: 5, export: 0, vat: 5 },
  }

  const countryRates: CountryRates = {
    IN: { base: 1.0, vat: 18, gst: 18 },
    US: { base: 1.0, vat: 0, gst: 0 },
    CA: { base: 1.0, vat: 5, gst: 5 },
    GB: { base: 1.0, vat: 20, gst: 20 },
    DE: { base: 1.0, vat: 19, gst: 19 },
    FR: { base: 1.0, vat: 20, gst: 20 },
    JP: { base: 1.0, vat: 10, gst: 10 },
    AU: { base: 1.0, vat: 10, gst: 10 },
    CN: { base: 1.0, vat: 13, gst: 13 },
    BR: { base: 1.0, vat: 17, gst: 17 },
  }

  const getDutyRate = (hsCode: string, type: 'import' | 'export'): number => {
    if (dutyRates[hsCode]) {
      return dutyRates[hsCode][type]
    }

    const firstTwoDigits = hsCode.substring(0, 2)
    const defaultRates: { [key: string]: { import: number; export: number } } = {
      '84': { import: 10, export: 0 },
      '85': { import: 12, export: 0 },
      '87': { import: 15, export: 0 },
      '61': { import: 20, export: 0 },
      '30': { import: 5, export: 0 },
    }

    return defaultRates[firstTwoDigits]?.[type] || (type === 'import' ? 15 : 0)
  }

  const getVATRate = (country: string): number => {
    return countryRates[country]?.vat || 18
  }

  const getGSTRate = (country: string): number => {
    return countryRates[country]?.gst || 18
  }

  const validateInputs = (productValue: number, hsCode: string, country: string, type: 'import' | 'export'): boolean => {
    setError('')
    if (!productValue || productValue <= 0) {
      setError('Please enter a valid product value')
      return false
    }
    if (!hsCode) {
      setError('Please enter an HS code')
      return false
    }
    if (!country) {
      setError('Please select a destination country')
      return false
    }
    return true
  }

  const calculateImportDuty = () => {
    const productValue = parseFloat(importData.productValue)
    const hsCode = importData.hsCode
    const country = importData.country
    const shipping = parseFloat(importData.shipping) || 0
    const insurance = parseFloat(importData.insurance) || 0

    if (!validateInputs(productValue, hsCode, country, 'import')) {
      return
    }

    setLoading(true)
    setTimeout(() => {
      const dutyRate = getDutyRate(hsCode, 'import')
      const vatRate = getVATRate(country)
      const gstRate = getGSTRate(country)

      const cifValue = productValue + shipping + insurance
      const importDuty = cifValue * (dutyRate / 100)
      const vatBase = cifValue + importDuty
      const vatAmount = vatBase * (vatRate / 100)
      const gstAmount = vatBase * (gstRate / 100)
      const totalTax = importDuty + vatAmount + gstAmount
      const totalCost = cifValue + totalTax

      setResults({
        productValue,
        shipping,
        insurance,
        cifValue,
        dutyRate,
        importDuty,
        vatRate,
        vatAmount,
        gstRate,
        gstAmount,
        totalTax,
        totalCost,
        type: 'import',
        country,
        hsCode,
      })
      setCalculationType('import')
      setLoading(false)
    }, 1500)
  }

  const calculateExportDuty = () => {
    const productValue = parseFloat(exportData.productValue)
    const hsCode = exportData.hsCode
    const country = exportData.country
    const origin = exportData.origin

    if (!validateInputs(productValue, hsCode, country, 'export')) {
      return
    }

    setLoading(true)
    setTimeout(() => {
      const dutyRate = getDutyRate(hsCode, 'export')
      const exportDuty = productValue * (dutyRate / 100)
      const shippingCost = productValue * 0.1
      const documentationFees = 2000
      const totalCost = productValue + exportDuty + shippingCost + documentationFees

      setResults({
        productValue,
        exportDuty,
        dutyRate,
        shippingCost,
        documentationFees,
        totalCost,
        type: 'export',
        country,
        origin,
        hsCode,
      })
      setCalculationType('export')
      setLoading(false)
    }, 1500)
  }

  const resetCalculator = () => {
    setResults(null)
    setCalculationType(null)
    setError('')
    setImportData({
      productValue: '',
      hsCode: '',
      country: 'IN',
      shipping: '3500',
      insurance: '1500',
    })
    setExportData({
      productValue: '',
      hsCode: '',
      country: '',
      origin: 'IN',
    })
  }

  const fillExample = (type: 'import' | 'export', value: string, hsCode: string) => {
    if (type === 'import') {
      setImportData({ ...importData, productValue: value, hsCode })
    } else {
      setExportData({ ...exportData, productValue: value, hsCode })
    }
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      {/* Wave Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 Q200,50 400,100 T800,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradientDuty)" />
          <defs>
            <linearGradient id="waveGradientDuty" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            🌍 International Trade <span className="text-cyan-400">Duty Calculator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Calculate import and export duties, taxes, and total costs for international shipments
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 text-center font-semibold">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 mb-6">
            <div className="inline-block w-10 h-10 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Calculating duties and taxes...</p>
          </div>
        )}

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Import Calculator */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-red-200 hover:border-red-400 transition-all duration-300">
            <div className="flex items-center mb-6 pb-4 border-b-2 border-gray-100">
              <span className="text-3xl mr-4">📥</span>
              <h2 className="text-2xl font-extrabold text-gray-900">Import Duty Calculator</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Value (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">₹</span>
                  <input
                    type="number"
                    value={importData.productValue}
                    onChange={(e) => setImportData({ ...importData, productValue: e.target.value })}
                    placeholder="Enter product value"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">HS Code</label>
                <input
                  type="text"
                  value={importData.hsCode}
                  onChange={(e) => setImportData({ ...importData, hsCode: e.target.value })}
                  placeholder="e.g., 847130, 851712"
                  maxLength={10}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => fillExample('import', '75000', '847130')}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs font-medium hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all duration-300"
                  >
                    Laptop: ₹75,000 (847130)
                  </button>
                  <button
                    onClick={() => fillExample('import', '35000', '851712')}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs font-medium hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all duration-300"
                  >
                    Phone: ₹35,000 (851712)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Destination Country</label>
                <select
                  value={importData.country}
                  onChange={(e) => setImportData({ ...importData, country: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none bg-white"
                >
                  <option value="">Select country</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="AU">Australia</option>
                  <option value="CN">China</option>
                  <option value="BR">Brazil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Cost (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">₹</span>
                  <input
                    type="number"
                    value={importData.shipping}
                    onChange={(e) => setImportData({ ...importData, shipping: e.target.value })}
                    placeholder="Enter shipping cost"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Insurance Cost (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">₹</span>
                  <input
                    type="number"
                    value={importData.insurance}
                    onChange={(e) => setImportData({ ...importData, insurance: e.target.value })}
                    placeholder="Enter insurance cost"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={calculateImportDuty}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-bold hover:from-red-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Calculate Import Duty
              </button>
            </div>
          </div>

          {/* Export Calculator */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-green-200 hover:border-green-400 transition-all duration-300">
            <div className="flex items-center mb-6 pb-4 border-b-2 border-gray-100">
              <span className="text-3xl mr-4">📤</span>
              <h2 className="text-2xl font-extrabold text-gray-900">Export Duty Calculator</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Value (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">₹</span>
                  <input
                    type="number"
                    value={exportData.productValue}
                    onChange={(e) => setExportData({ ...exportData, productValue: e.target.value })}
                    placeholder="Enter product value"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">HS Code</label>
                <input
                  type="text"
                  value={exportData.hsCode}
                  onChange={(e) => setExportData({ ...exportData, hsCode: e.target.value })}
                  placeholder="e.g., 847130, 851712"
                  maxLength={10}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => fillExample('export', '60000', '870323')}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs font-medium hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all duration-300"
                  >
                    Car Parts: ₹60,000 (870323)
                  </button>
                  <button
                    onClick={() => fillExample('export', '15000', '610910')}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs font-medium hover:bg-cyan-400 hover:text-white hover:border-cyan-400 transition-all duration-300"
                  >
                    Clothing: ₹15,000 (610910)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Destination Country</label>
                <select
                  value={exportData.country}
                  onChange={(e) => setExportData({ ...exportData, country: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none bg-white"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                  <option value="CN">China</option>
                  <option value="BR">Brazil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Origin Country</label>
                <select
                  value={exportData.origin}
                  onChange={(e) => setExportData({ ...exportData, origin: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none bg-white"
                >
                  <option value="IN">India</option>
                  <option value="CN">China</option>
                  <option value="DE">Germany</option>
                  <option value="JP">Japan</option>
                  <option value="US">United States</option>
                  <option value="BR">Brazil</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                onClick={calculateExportDuty}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Calculate Export Duty
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-cyan-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {calculationType === 'import' ? 'Import' : 'Export'} Calculation Results
              </h2>
              <button
                onClick={resetCalculator}
                className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-primary-500 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-primary-600 transition-all duration-300"
              >
                New Calculation
              </button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {calculationType === 'import' && results.type === 'import' && (
                <>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">Total Landed Cost</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{results.totalCost.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">Including all duties and taxes</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">Import Duty</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{results.importDuty.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">{results.dutyRate}% of CIF Value</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">GST Amount</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{results.gstAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">{results.gstRate}% GST Rate</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">CIF Value</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{results.cifValue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">Product + Shipping + Insurance</div>
                  </div>
                </>
              )}

              {calculationType === 'export' && results.type === 'export' && (
                <>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-l-4 border-green-500 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">Total Export Cost</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{results.totalCost.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">Including all fees</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-l-4 border-green-500 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">Export Duty</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{results.exportDuty.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">{results.dutyRate}% of Product Value</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-l-4 border-green-500 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">Shipping Cost</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{results.shippingCost.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">Estimated shipping</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-l-4 border-green-500 text-center">
                    <div className="text-sm text-gray-600 font-medium mb-2">Product Value</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{results.productValue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">Base product value</div>
                  </div>
                </>
              )}
            </div>

            {/* Breakdown */}
            <div className="bg-gradient-to-br from-gray-50 to-cyan-50 rounded-xl p-6 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Cost Breakdown</h4>
              <div className="space-y-3">
                {calculationType === 'import' && results.type === 'import' && (
                  <>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Product Value:</span>
                      <span className="text-gray-900 font-semibold">₹{results.productValue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Shipping Cost:</span>
                      <span className="text-gray-900 font-semibold">₹{results.shipping.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Insurance Cost:</span>
                      <span className="text-gray-900 font-semibold">₹{results.insurance.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">CIF Value:</span>
                      <span className="text-gray-900 font-semibold">₹{results.cifValue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Import Duty ({results.dutyRate}%):</span>
                      <span className="text-gray-900 font-semibold">₹{results.importDuty.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">GST ({results.gstRate}%):</span>
                      <span className="text-gray-900 font-semibold">₹{results.gstAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 pt-3">
                      <span className="text-gray-900 font-bold text-lg">Total Cost:</span>
                      <span className="text-gray-900 font-bold text-lg">₹{results.totalCost.toLocaleString('en-IN')}</span>
                    </div>
                  </>
                )}

                {calculationType === 'export' && results.type === 'export' && (
                  <>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Product Value:</span>
                      <span className="text-gray-900 font-semibold">₹{results.productValue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Export Duty ({results.dutyRate}%):</span>
                      <span className="text-gray-900 font-semibold">₹{results.exportDuty.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Shipping Cost:</span>
                      <span className="text-gray-900 font-semibold">₹{results.shippingCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700 font-medium">Documentation Fees:</span>
                      <span className="text-gray-900 font-semibold">₹{results.documentationFees.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 pt-3">
                      <span className="text-gray-900 font-bold text-lg">Total Export Cost:</span>
                      <span className="text-gray-900 font-bold text-lg">₹{results.totalCost.toLocaleString('en-IN')}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="bg-white rounded-xl p-6 border-2 border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cost Comparison</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="w-48 font-semibold text-gray-700">Product Value</span>
                    <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-primary-500 rounded-full transition-all duration-800"
                        style={{
                          width: `${Math.min((results.productValue / results.totalCost) * 100, 100)}%`,
                        }}
                      ></div>
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 font-semibold text-gray-900">
                        ₹{results.productValue.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="w-48 font-semibold text-gray-700">
                      Total {calculationType === 'import' ? 'Landed' : 'Export'} Cost
                    </span>
                    <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all duration-800 ${
                          calculationType === 'import'
                            ? 'bg-gradient-to-r from-red-500 to-pink-600'
                            : 'bg-gradient-to-r from-green-500 to-teal-600'
                        }`}
                        style={{
                          width: `${Math.min((results.totalCost / results.totalCost) * 100, 100)}%`,
                        }}
                      ></div>
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 font-semibold text-gray-900">
                        ₹{results.totalCost.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

