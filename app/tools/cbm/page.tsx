'use client'

import { useState, useEffect } from 'react'

interface Item {
  length: number
  width: number
  height: number
  unit: string
  qty: number
  weight: number
}

const LENGTH_TO_M: { [key: string]: number } = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  in: 0.0254,
  ft: 0.3048,
}

const CONTAINER_CAPACITIES: { [key: string]: number } = {
  '20GP': 33.0,
  '40GP': 67.0,
  '40HC': 76.0,
}

const DEFAULT_ITEMS: Item[] = [
  { length: 1.2, width: 1.0, height: 1.0, unit: 'm', qty: 5, weight: 500 },
  { length: 0.8, width: 0.6, height: 0.4, unit: 'm', qty: 10, weight: 200 },
]

export default function CBMCalculator() {
  const [items, setItems] = useState<Item[]>(DEFAULT_ITEMS)
  const [precision, setPrecision] = useState('0.01')
  const [actualWeight, setActualWeight] = useState(0)
  const [results, setResults] = useState({
    rawCbm: 0,
    billedCbm: 0,
    volWeight: 0,
    chargeableWeight: 0,
    container: '—',
    containerUtil: '—',
  })

  const computeCbm = (l: number, w: number, h: number, unit: string = 'm'): number => {
    if (!l || !w || !h) return 0
    const f = LENGTH_TO_M[unit] || 1
    return (l * f) * (w * f) * (h * f)
  }

  const roundUp = (value: number, precision: number): number => {
    if (!precision || precision <= 0) return value
    return Math.ceil(value / precision) * precision
  }

  const suggestContainer = (totalCbm: number): { container: string; util: string } => {
    const caps = CONTAINER_CAPACITIES
    const keys = Object.keys(caps).sort((a, b) => caps[a] - caps[b])
    
    for (const k of keys) {
      if (totalCbm <= caps[k]) {
        const util = (totalCbm / caps[k]) * 100
        return { container: k, util: util.toFixed(1) }
      }
    }
    
    const cap = caps['40HC']
    return { container: 'Multiple (40HC base)', util: ((totalCbm / cap) * 100).toFixed(1) }
  }

  const calculate = () => {
    const rawCbm = items.reduce(
      (sum, item) => sum + computeCbm(item.length, item.width, item.height, item.unit) * item.qty,
      0
    )
    const precisionNum = parseFloat(precision)
    const billed = roundUp(rawCbm, precisionNum)
    const volWeight = billed * 1000 // 1 CBM = 1000 kg for seafreight
    const chargeable = Math.max(actualWeight, volWeight)
    const container = suggestContainer(billed)

    setResults({
      rawCbm,
      billedCbm: billed,
      volWeight,
      chargeableWeight: chargeable,
      container: container.container,
      containerUtil: container.util + ' %',
    })
  }

  useEffect(() => {
    calculate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, precision, actualWeight])

  const addRow = () => {
    setItems([...items, { length: 0, width: 0, height: 0, unit: 'm', qty: 1, weight: 0 }])
  }

  const removeRow = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const clearAll = () => {
    setItems([])
    setActualWeight(0)
    setResults({
      rawCbm: 0,
      billedCbm: 0,
      volWeight: 0,
      chargeableWeight: 0,
      container: '—',
      containerUtil: '—',
    })
  }

  const exportJson = () => {
    const data = {
      items,
      rawCbm: results.rawCbm,
      billedCbm: results.billedCbm,
      volWeight: results.volWeight,
      chargeable: results.chargeableWeight,
      container: results.container,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cbm_items.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string)
        let importedItems: Item[] = []

        if (Array.isArray(parsed)) {
          importedItems = parsed
        } else if (parsed.items && Array.isArray(parsed.items)) {
          importedItems = parsed.items
        } else {
          alert('JSON format not recognized. Provide an array or {items:[...]}')
          return
        }

        setItems(importedItems)
      } catch (e) {
        alert('Invalid JSON')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <main className="min-h-screen py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Left Aligned */}
        <div className="mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
            SEAFREIGHT CALCULATOR
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-3 leading-tight">
            CBM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Calculator</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Calculate cubic meters, volume weight, and get container recommendations for FCL & LCL shipments
          </p>
        </div>

        {/* Main Layout - Sidebar Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Main Calculator (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Controls Bar */}
            <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-blue-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Precision:</span>
                  <select
                    value={precision}
                    onChange={(e) => setPrecision(e.target.value)}
                    className="px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-semibold text-gray-700"
                  >
                    <option value="0.01">0.01 m³</option>
                    <option value="0.1">0.1 m³</option>
                    <option value="1">1 m³</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addRow}
                    className="px-5 py-2.5 bg-blue-50 text-blue-700 border-2 border-blue-200 rounded-lg font-bold hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 text-sm"
                  >
                    + Add Item
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-5 py-2.5 bg-gray-50 text-gray-700 border-2 border-gray-200 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 text-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-cyan-600">
                    <tr>
                      <th className="text-left py-4 px-4 text-sm font-bold text-white w-12">#</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-white">Dimensions</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-white w-24">Unit</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-white w-20">Qty</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-white w-28">Weight</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-white w-32">CBM/item</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-white w-32">Total CBM</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-white w-20">Action</th>
                    </tr>
                  </thead>
              <tbody>
                {items.map((item, index) => {
                  const cbmSingle = computeCbm(item.length, item.width, item.height, item.unit)
                  const cbmTotal = cbmSingle * item.qty
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors even:bg-gray-50/30">
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="number"
                            step="0.001"
                            placeholder="L"
                            value={item.length || ''}
                            onChange={(e) => updateItem(index, 'length', parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium"
                          />
                          <input
                            type="number"
                            step="0.001"
                            placeholder="W"
                            value={item.width || ''}
                            onChange={(e) => updateItem(index, 'width', parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium"
                          />
                          <input
                            type="number"
                            step="0.001"
                            placeholder="H"
                            value={item.height || ''}
                            onChange={(e) => updateItem(index, 'height', parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={item.unit}
                          onChange={(e) => updateItem(index, 'unit', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white font-medium"
                        >
                          <option value="m">m</option>
                          <option value="cm">cm</option>
                          <option value="mm">mm</option>
                          <option value="in">in</option>
                          <option value="ft">ft</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.qty || 1}
                          onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 1)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="number"
                          step="0.1"
                          value={item.weight || 0}
                          onChange={(e) => updateItem(index, 'weight', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-gray-700 font-semibold text-sm">
                          {cbmSingle > 0 ? cbmSingle.toFixed(4) : '—'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-blue-600 font-bold text-sm">
                          {cbmTotal > 0 ? cbmTotal.toFixed(4) : '—'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => removeRow(index)}
                          className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-bold"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-400">
                      <div className="flex flex-col items-center">
                        <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="font-semibold">No items added yet</p>
                        <p className="text-sm mt-1">Click &quot;+ Add Item&quot; to start</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Supported units: m, cm, mm, in, ft
              </p>
            </div>
          </div>
          </div>

          {/* Right Sidebar - Results (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 shadow-xl text-white">
              <h3 className="text-xl font-black mb-6 uppercase tracking-wide">Shipment Summary</h3>
              
              <div className="mb-5">
                <label className="block text-sm font-bold mb-2 text-blue-100">Total Weight (kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Enter weight"
                  value={actualWeight || ''}
                  onChange={(e) => setActualWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 font-semibold"
                />
              </div>

              <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-blue-100 font-medium text-sm">Raw CBM</span>
                  <strong className="text-white text-lg font-black">{results.rawCbm.toFixed(4)} m³</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-blue-100 font-medium text-sm">Billing CBM</span>
                  <strong className="text-yellow-300 text-lg font-black">{results.billedCbm.toFixed(4)} m³</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-blue-100 font-medium text-sm">Volume Weight</span>
                  <strong className="text-white text-lg font-black">{Math.round(results.volWeight)} kg</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-blue-100 font-medium text-sm">Chargeable Weight</span>
                  <strong className="text-yellow-300 text-xl font-black">{Math.round(results.chargeableWeight)} kg</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-blue-100 font-medium text-sm">Container</span>
                  <strong className="text-white text-lg font-black">{results.container}</strong>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-blue-100 font-medium text-sm">Utilization</span>
                  <strong className="text-white text-lg font-black">{results.containerUtil}</strong>
                </div>
              </div>
            </div>

            {/* Export/Import Card */}
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Data Management</h4>
              <div className="space-y-3">
                <button
                  onClick={exportJson}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm"
                >
                  📥 Export JSON
                </button>
                <label className="block w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm cursor-pointer text-center">
                  📤 Import JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 shadow-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Quick Info</h4>
              <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                <p>
                  <span className="font-bold">Formula:</span> L × W × H (in metres)
                </p>
                <p>
                  <span className="font-bold">LCL:</span> Charged on higher of weight or volume
                </p>
                <p>
                  <span className="font-bold">Containers:</span> 20&apos;GP (33m³), 40&apos;GP (67m³), 40&apos;HC (76m³)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

