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
    <main className="min-h-screen py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      {/* Wave Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 Q200,50 400,100 T800,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradientCBM)" />
          <defs>
            <linearGradient id="waveGradientCBM" x1="0%" y1="0%" x2="100%" y2="0%">
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
            CBM Calculator — <span className="text-cyan-400">Seafreight (FCL & LCL)</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Calculate CBM, volume weight and container suggestions (20&apos;GP / 40&apos;GP / 40&apos;HC). Reference: IncoDocs.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-primary-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-cyan-100 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Billing precision</label>
              <select
                value={precision}
                onChange={(e) => setPrecision(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none bg-white"
              >
                <option value="0.01">0.01 m³ (0.01)</option>
                <option value="0.1">0.1 m³ (0.1)</option>
                <option value="1">1 m³ (1)</option>
              </select>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={addRow}
                className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border-2 border-cyan-200 rounded-lg font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300"
              >
                + Add Item
              </button>
              <button
                onClick={calculate}
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-primary-500 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-primary-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Calculate
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border-2 border-cyan-200 rounded-lg font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-cyan-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 w-12">#</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Dimensions</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 w-28">Unit</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 w-24">Qty</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 w-32">Wt (kg)</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 w-32">CBM / item</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 w-32">Total CBM</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const cbmSingle = computeCbm(item.length, item.width, item.height, item.unit)
                  const cbmTotal = cbmSingle * item.qty
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-cyan-50 transition-colors">
                      <td className="py-3 px-2 text-center text-gray-600 font-medium">{index + 1}</td>
                      <td className="py-3 px-2">
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="number"
                            step="0.001"
                            placeholder="L"
                            value={item.length || ''}
                            onChange={(e) => updateItem(index, 'length', parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none text-sm"
                          />
                          <input
                            type="number"
                            step="0.001"
                            placeholder="W"
                            value={item.width || ''}
                            onChange={(e) => updateItem(index, 'width', parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none text-sm"
                          />
                          <input
                            type="number"
                            step="0.001"
                            placeholder="H"
                            value={item.height || ''}
                            onChange={(e) => updateItem(index, 'height', parseFloat(e.target.value) || 0)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none text-sm"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <select
                          value={item.unit}
                          onChange={(e) => updateItem(index, 'unit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none text-sm bg-white"
                        >
                          <option value="m">m</option>
                          <option value="cm">cm</option>
                          <option value="mm">mm</option>
                          <option value="in">in</option>
                          <option value="ft">ft</option>
                        </select>
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.qty || 1}
                          onChange={(e) => updateItem(index, 'qty', parseInt(e.target.value) || 1)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none text-sm"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          step="0.1"
                          value={item.weight || 0}
                          onChange={(e) => updateItem(index, 'weight', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none text-sm"
                        />
                      </td>
                      <td className="py-3 px-2 text-center text-gray-700 font-medium">
                        {cbmSingle > 0 ? cbmSingle.toFixed(4) : '-'}
                      </td>
                      <td className="py-3 px-2 text-center text-gray-700 font-semibold">
                        {cbmTotal > 0 ? cbmTotal.toFixed(4) : '-'}
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => removeRow(index)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {items.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No items added. Click &quot;+ Add Item&quot; to start calculating.
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Enter item dimensions and quantity. Supported units: m, cm, mm, in, ft.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipment Summary */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-cyan-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Shipment Summary</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actual total weight (kg)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="e.g. 2500"
                value={actualWeight || ''}
                onChange={(e) => setActualWeight(parseFloat(e.target.value) || 0)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                <span className="text-gray-600 font-medium">Raw total CBM (m³)</span>
                <strong className="text-gray-900 text-lg">{results.rawCbm.toFixed(4)}</strong>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                <span className="text-gray-600 font-medium">Billing CBM (rounded up)</span>
                <strong className="text-cyan-600 text-lg">{results.billedCbm.toFixed(4)}</strong>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                <span className="text-gray-600 font-medium">Volume weight (kg) (1 CBM = 1000kg)</span>
                <strong className="text-gray-900 text-lg">{Math.round(results.volWeight)}</strong>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                <span className="text-gray-600 font-medium">Chargeable weight (kg)</span>
                <strong className="text-primary-600 text-lg font-bold">{Math.round(results.chargeableWeight)}</strong>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                <span className="text-gray-600 font-medium">Suggested container</span>
                <strong className="text-gray-900 text-lg">{results.container}</strong>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Container utilization</span>
                <strong className="text-gray-900 text-lg">{results.containerUtil}</strong>
              </div>
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
              <button
                onClick={exportJson}
                className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border-2 border-cyan-200 rounded-lg font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300"
              >
                Export JSON
              </button>
              <label className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border-2 border-cyan-200 rounded-lg font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300 cursor-pointer">
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Details & Notes */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-cyan-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Details & Notes</h3>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                <strong className="text-gray-900">CBM formula:</strong> Length × Width × Height — convert all dimensions to <em>metres</em>.
              </p>
              <p>
                <strong className="text-gray-900">LCL billing:</strong> Charged on higher of actual weight or volumetric weight (1 CBM = 1000 kg by default).
              </p>
              <p>
                <strong className="text-gray-900">FCL guidance:</strong> Choose container type by total CBM. Typical internal volumes used by this tool (approx): 20&apos;GP=33, 40&apos;GP=67, 40&apos;HC=76 m³.
              </p>
              <p>
                Reference:{' '}
                <a
                  href="https://incodocs.com/tools/cbm-calculator-seafreight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-600 font-semibold underline"
                >
                  IncoDocs CBM Calculator
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* JSON Output */}
        <div className="mt-6 bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-cyan-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-extrabold text-gray-900">Items JSON</h3>
            <p className="text-sm text-gray-500">You can import/export item lists (JSON)</p>
          </div>
          <pre className="bg-gradient-to-br from-cyan-50 to-primary-50 rounded-lg p-4 mt-4 max-h-64 overflow-auto text-xs text-gray-700 border border-cyan-200">
            {JSON.stringify({ items, ...results }, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}

