'use client'

import { useState } from 'react'

export default function Tools() {
  const [cbmLength, setCbmLength] = useState('')
  const [cbmWidth, setCbmWidth] = useState('')
  const [cbmHeight, setCbmHeight] = useState('')
  const [cbmQuantity, setCbmQuantity] = useState('1')
  const [cbmResult, setCbmResult] = useState<number | null>(null)

  const [dutyValue, setDutyValue] = useState('')
  const [dutyRate, setDutyRate] = useState('')
  const [dutyResult, setDutyResult] = useState<number | null>(null)

  const [landingCost, setLandingCost] = useState('')
  const [landingDuty, setLandingDuty] = useState('')
  const [landingShipping, setLandingShipping] = useState('')
  const [landingOther, setLandingOther] = useState('0')
  const [landingResult, setLandingResult] = useState<number | null>(null)

  const [vesselNumber, setVesselNumber] = useState('')
  const [containerNumber, setContainerNumber] = useState('')

  const calculateCBM = (length: string, width: string, height: string, quantity: string) => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const h = parseFloat(height)
    const qty = parseFloat(quantity) || 1

    if (l && w && h) {
      const cbm = (l * w * h) / 1000000 * qty
      setCbmResult(cbm)
    } else {
      setCbmResult(null)
    }
  }

  const calculateDuty = (value: string, rate: string) => {
    const v = parseFloat(value)
    const r = parseFloat(rate)

    if (v && r) {
      const duty = (v * r) / 100
      setDutyResult(duty)
    } else {
      setDutyResult(null)
    }
  }

  const calculateLandingCost = (cost: string, duty: string, shipping: string, other: string) => {
    const c = parseFloat(cost) || 0
    const d = parseFloat(duty) || 0
    const s = parseFloat(shipping) || 0
    const o = parseFloat(other) || 0

    if (c || d || s || o) {
      const total = c + d + s + o
      setLandingResult(total)
    } else {
      setLandingResult(null)
    }
  }

  const downloadTemplate = (type: 'packing' | 'invoice') => {
    // This would typically download a template file
    alert(`${type === 'packing' ? 'Packing List' : 'Invoice'} template download would be triggered here`)
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* CBM Calculator */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">CBM Calculator</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Length (cm)</label>
                <input
                  type="number"
                  value={cbmLength}
                  onChange={(e) => {
                    const val = e.target.value
                    setCbmLength(val)
                    calculateCBM(val, cbmWidth, cbmHeight, cbmQuantity)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter length"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Width (cm)</label>
                <input
                  type="number"
                  value={cbmWidth}
                  onChange={(e) => {
                    const val = e.target.value
                    setCbmWidth(val)
                    calculateCBM(cbmLength, val, cbmHeight, cbmQuantity)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter width"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={cbmHeight}
                  onChange={(e) => {
                    const val = e.target.value
                    setCbmHeight(val)
                    calculateCBM(cbmLength, cbmWidth, val, cbmQuantity)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter height"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  value={cbmQuantity}
                  onChange={(e) => {
                    const val = e.target.value
                    setCbmQuantity(val)
                    calculateCBM(cbmLength, cbmWidth, cbmHeight, val)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="1"
                />
              </div>
              {cbmResult !== null && (
                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Total CBM:</p>
                  <p className="text-2xl font-extrabold text-cyan-400">{cbmResult.toFixed(4)} m³</p>
                </div>
              )}
            </div>
          </div>

          {/* Packing List and Invoice Templates */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">Templates</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Download professional packing list and invoice templates for your shipping documentation.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => downloadTemplate('packing')}
                className="w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Download Packing List Template
              </button>
              <button
                onClick={() => downloadTemplate('invoice')}
                className="w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Download Invoice Template
              </button>
            </div>
          </div>

          {/* Documentation Check */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">Documentation Check</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Verify that all required shipping documents are in order before shipment.
            </p>
            <div className="space-y-3">
              {['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Insurance Certificate'].map((doc, idx) => (
                <div key={idx} className="flex items-center p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                  <input type="checkbox" className="w-5 h-5 text-cyan-400 rounded focus:ring-cyan-400" />
                  <label className="ml-3 text-gray-700 font-medium">{doc}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Duty Calculation */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">Duty Calculation</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Value ($)</label>
                <input
                  type="number"
                  value={dutyValue}
                  onChange={(e) => {
                    const val = e.target.value
                    setDutyValue(val)
                    calculateDuty(val, dutyRate)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter product value"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duty Rate (%)</label>
                <input
                  type="number"
                  value={dutyRate}
                  onChange={(e) => {
                    const val = e.target.value
                    setDutyRate(val)
                    calculateDuty(dutyValue, val)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter duty rate"
                />
              </div>
              {dutyResult !== null && (
                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Duty Amount:</p>
                  <p className="text-2xl font-extrabold text-cyan-400">${dutyResult.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Landing Cost Calculator */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">Landing Cost Calculator</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Cost ($)</label>
                <input
                  type="number"
                  value={landingCost}
                  onChange={(e) => {
                    const val = e.target.value
                    setLandingCost(val)
                    calculateLandingCost(val, landingDuty, landingShipping, landingOther)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter product cost"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duty & Taxes ($)</label>
                <input
                  type="number"
                  value={landingDuty}
                  onChange={(e) => {
                    const val = e.target.value
                    setLandingDuty(val)
                    calculateLandingCost(landingCost, val, landingShipping, landingOther)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter duty amount"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Cost ($)</label>
                <input
                  type="number"
                  value={landingShipping}
                  onChange={(e) => {
                    const val = e.target.value
                    setLandingShipping(val)
                    calculateLandingCost(landingCost, landingDuty, val, landingOther)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter shipping cost"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Other Costs ($)</label>
                <input
                  type="number"
                  value={landingOther}
                  onChange={(e) => {
                    const val = e.target.value
                    setLandingOther(val)
                    calculateLandingCost(landingCost, landingDuty, landingShipping, val)
                  }}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="0"
                />
              </div>
              {landingResult !== null && (
                <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Total Landing Cost:</p>
                  <p className="text-2xl font-extrabold text-cyan-400">${landingResult.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Vessel Tracking */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">Vessel Tracking</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Track your vessel in real-time using the vessel number or name.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vessel Number/Name</label>
                <input
                  type="text"
                  value={vesselNumber}
                  onChange={(e) => setVesselNumber(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter vessel number or name"
                />
              </div>
              <button
                onClick={() => alert(`Tracking vessel: ${vesselNumber || 'Please enter a vessel number'}`)}
                className="w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Track Vessel
              </button>
            </div>
          </div>

          {/* Container Tracking */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cyan-100 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">Container Tracking</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Track your shipping container using the container number.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Container Number</label>
                <input
                  type="text"
                  value={containerNumber}
                  onChange={(e) => setContainerNumber(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter container number"
                />
              </div>
              <button
                onClick={() => alert(`Tracking container: ${containerNumber || 'Please enter a container number'}`)}
                className="w-full bg-gradient-to-r from-cyan-400 to-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Track Container
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

