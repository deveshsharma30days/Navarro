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
    <main className="min-h-screen py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Centered with Badge */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
            <span>🌍</span>
            <span>INTERNATIONAL TRADE</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-3 leading-tight">
            Duty <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Calculator</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Calculate import and export duties, taxes, and total costs for international shipments
          </p>
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

        {/* Results Section - Show at Top if Available */}
        {results && (
          <div className="mb-8 bg-white rounded-2xl p-6 shadow-2xl border-4 border-purple-500 animate-fadeIn">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  {calculationType === 'import' ? '📥 Import' : '📤 Export'} Results
                </h2>
                <p className="text-gray-600 text-sm">HS Code: {results.hsCode} | Country: {results.country}</p>
              </div>
              <button
                onClick={resetCalculator}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                New Calculation
              </button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {calculationType === 'import' && results.type === 'import' && (
                <>
                  <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-5 border-l-4 border-red-500">
                    <div className="text-xs text-gray-600 font-bold uppercase mb-2">Total Cost</div>
                    <div className="text-2xl font-black text-gray-900">₹{results.totalCost.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-5 border-l-4 border-red-500">
                    <div className="text-xs text-gray-600 font-bold uppercase mb-2">Import Duty</div>
                    <div className="text-2xl font-black text-gray-900">₹{results.importDuty.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-gray-500 mt-1">{results.dutyRate}% rate</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-5 border-l-4 border-red-500">
                    <div className="text-xs text-gray-600 font-bold uppercase mb-2">GST</div>
                    <div className="text-2xl font-black text-gray-900">₹{results.gstAmount.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-gray-500 mt-1">{results.gstRate}% rate</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-5 border-l-4 border-red-500">
                    <div className="text-xs text-gray-600 font-bold uppercase mb-2">CIF Value</div>
                    <div className="text-2xl font-black text-gray-900">₹{results.cifValue.toLocaleString('en-IN')}</div>
                  </div>
                </>
              )}

              {calculationType === 'export' && results.type === 'export' && (
                <>
                  <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-5 border-l-4 border-green-500">
                    <div className="text-xs text-gray-600 font-bold uppercase mb-2">Total Cost</div>
                    <div className="text-2xl font-black text-gray-900">₹{results.totalCost.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-5 border-l-4 border-green-500">
                    <div className="text-xs text-gray-600 font-bold uppercase mb-2">Export Duty</div>
                    <div className="text-2xl font-black text-gray-900">₹{results.exportDuty.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-gray-500 mt-1">{results.dutyRate}% rate</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-5 border-l-4 border-green-500">
                    <div className="text-xs text-gray-600 font-bold uppercase mb-2">Shipping</div>
                    <div className="text-2xl font-black text-gray-900">₹{results.shippingCost.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-5 border-l-4 border-green-500">
                    <div className="text-xs text-gray-600 font-bold uppercase mb-2">Product Value</div>
                    <div className="text-2xl font-black text-gray-900">₹{results.productValue.toLocaleString('en-IN')}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Calculator Cards - Vertical Stack */}
        <div className="space-y-6">
          {/* Import Calculator */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-l-4 border-red-500 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">📥</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900">Import Duty Calculator</h2>
              </div>
              <div className="hidden md:block px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-bold">
                IMPORT
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Product Value (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    value={importData.productValue}
                    onChange={(e) => setImportData({ ...importData, productValue: e.target.value })}
                    placeholder="Enter product value"
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">HS Code</label>
                <input
                  type="text"
                  value={importData.hsCode}
                  onChange={(e) => setImportData({ ...importData, hsCode: e.target.value })}
                  placeholder="e.g., 847130"
                  maxLength={10}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => fillExample('import', '75000', '847130')}
                    className="px-4 py-1.5 bg-red-50 border-2 border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 hover:border-red-300 transition-all text-red-700"
                  >
                    💻 Laptop (847130)
                  </button>
                  <button
                    onClick={() => fillExample('import', '35000', '851712')}
                    className="px-4 py-1.5 bg-red-50 border-2 border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 hover:border-red-300 transition-all text-red-700"
                  >
                    📱 Phone (851712)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Destination</label>
                <select
                  value={importData.country}
                  onChange={(e) => setImportData({ ...importData, country: e.target.value })}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white font-semibold"
                >
                  <option value="">Select country</option>
                  <option value="IN">🇮🇳 India</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="GB">🇬🇧 United Kingdom</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="FR">🇫🇷 France</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="CN">🇨🇳 China</option>
                  <option value="BR">🇧🇷 Brazil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Shipping (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    value={importData.shipping}
                    onChange={(e) => setImportData({ ...importData, shipping: e.target.value })}
                    placeholder="Shipping cost"
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Insurance (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    value={importData.insurance}
                    onChange={(e) => setImportData({ ...importData, insurance: e.target.value })}
                    placeholder="Insurance cost"
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={calculateImportDuty}
              className="w-full mt-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-black text-lg hover:from-red-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              🧮 Calculate Import Duty & Taxes
            </button>
          </div>

          {/* Export Calculator */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">📤</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900">Export Duty Calculator</h2>
              </div>
              <div className="hidden md:block px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-bold">
                EXPORT
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Product Value (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-lg">₹</span>
                  <input
                    type="number"
                    value={exportData.productValue}
                    onChange={(e) => setExportData({ ...exportData, productValue: e.target.value })}
                    placeholder="Enter product value"
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-semibold text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">HS Code</label>
                <input
                  type="text"
                  value={exportData.hsCode}
                  onChange={(e) => setExportData({ ...exportData, hsCode: e.target.value })}
                  placeholder="e.g., 870323"
                  maxLength={10}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-semibold"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => fillExample('export', '60000', '870323')}
                    className="px-4 py-1.5 bg-green-50 border-2 border-green-200 rounded-lg text-xs font-bold hover:bg-green-100 hover:border-green-300 transition-all text-green-700"
                  >
                    🚗 Car Parts (870323)
                  </button>
                  <button
                    onClick={() => fillExample('export', '15000', '610910')}
                    className="px-4 py-1.5 bg-green-50 border-2 border-green-200 rounded-lg text-xs font-bold hover:bg-green-100 hover:border-green-300 transition-all text-green-700"
                  >
                    👕 Clothing (610910)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Destination</label>
                <select
                  value={exportData.country}
                  onChange={(e) => setExportData({ ...exportData, country: e.target.value })}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white font-semibold"
                >
                  <option value="">Select country</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="GB">🇬🇧 United Kingdom</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="FR">🇫🇷 France</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="IN">🇮🇳 India</option>
                  <option value="CN">🇨🇳 China</option>
                  <option value="BR">🇧🇷 Brazil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Origin Country</label>
                <select
                  value={exportData.origin}
                  onChange={(e) => setExportData({ ...exportData, origin: e.target.value })}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white font-semibold"
                >
                  <option value="IN">🇮🇳 India</option>
                  <option value="CN">🇨🇳 China</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="BR">🇧🇷 Brazil</option>
                  <option value="other">🌍 Other</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateExportDuty}
              className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-black text-lg hover:from-green-700 hover:to-teal-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              🧮 Calculate Export Duty & Fees
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

