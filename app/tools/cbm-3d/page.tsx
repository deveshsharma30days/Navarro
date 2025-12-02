'use client'

import { useState, useEffect, useRef } from 'react'

interface BoxRow {
  id: number
  length: string
  width: string
  height: string
  qty: string
}

interface Container {
  name: string
  volume: number
  L: number
  W: number
  H: number
}

export default function CBM3DCalculator() {
  const [unit, setUnit] = useState<'cm' | 'm'>('cm')
  const [container, setContainer] = useState<Container>({
    name: '20ft Standard',
    volume: 33.2,
    L: 5.9,
    W: 2.35,
    H: 2.39,
  })
  const [rows, setRows] = useState<BoxRow[]>([
    { id: 1, length: '50', width: '40', height: '30', qty: '1' },
  ])
  const [nextId, setNextId] = useState(2)
  const viewerRef = useRef<HTMLDivElement>(null)
  const threeInitialized = useRef(false)

  const containers: Container[] = [
    { name: '20ft Standard', volume: 33.2, L: 5.9, W: 2.35, H: 2.39 },
    { name: '40ft Standard', volume: 67.7, L: 12.03, W: 2.35, H: 2.39 },
    { name: '40ft High Cube', volume: 76.3, L: 12.03, W: 2.35, H: 2.69 },
    { name: '45ft High Cube', volume: 86.0, L: 13.56, W: 2.35, H: 2.69 },
  ]

  const toMeters = (val: string | number): number => {
    const n = parseFloat(String(val))
    if (isNaN(n)) return 0
    return unit === 'cm' ? n / 100 : n
  }

  const rowCBM = (row: BoxRow): number => {
    const L = toMeters(row.length)
    const W = toMeters(row.width)
    const H = toMeters(row.height)
    const Q = parseInt(row.qty) || 0
    return L * W * H * Q
  }

  const totalCBM = rows.reduce((sum, row) => sum + rowCBM(row), 0)
  const containersNeeded = totalCBM > 0 ? Math.ceil(totalCBM / container.volume) : 0
  const fillPercent = container.volume > 0 ? Math.min(100, (totalCBM / container.volume) * 100) : 0

  const addBox = () => {
    setRows([...rows, { id: nextId, length: '50', width: '40', height: '30', qty: '1' }])
    setNextId(nextId + 1)
  }

  const removeBox = (id: number) => {
    setRows(rows.filter((r) => r.id !== id))
  }

  const reset = () => {
    setRows([{ id: 1, length: '50', width: '40', height: '30', qty: '1' }])
    setNextId(2)
  }

  const updateRow = (id: number, field: keyof BoxRow, value: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const exportCSV = () => {
    const lines = [['length', 'width', 'height', 'unit', 'qty', 'cbm']]
    rows.forEach((r) => {
      lines.push([r.length, r.width, r.height, unit, r.qty, rowCBM(r).toFixed(6)])
    })
    const csv = lines.map((l) => l.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cbm_export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleContainerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = containers[parseInt(e.target.value)]
    setContainer(selected)
  }

  // Initialize Three.js
  useEffect(() => {
    if (threeInitialized.current || !viewerRef.current) return

    const initThree = () => {
      // Check if Three.js is loaded
      if (typeof window === 'undefined' || !(window as any).THREE) {
        // Load Three.js from CDN
        const existingScript = document.querySelector('script[src*="three.min.js"]')
        if (existingScript) {
          // Script already exists, wait for it to load
          existingScript.addEventListener('load', initThreeScene)
          if ((window as any).THREE) {
            initThreeScene()
          }
          return
        }
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js'
        script.onload = () => {
          initThreeScene()
        }
        document.head.appendChild(script)
        return
      }

      initThreeScene()
    }

    const initThreeScene = () => {
      try {
        const THREE = (window as any).THREE
        
        // Scene setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0b1220)

        // Camera
        const fov = 50
        const aspect = viewerRef.current!.clientWidth / viewerRef.current!.clientHeight
        let cameraDistance = 15
        let cameraAngleX = 0.8
        let cameraAngleY = 0.5

        const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000)
        
        const updateCameraPosition = () => {
          camera.position.x = cameraDistance * Math.sin(cameraAngleY) * Math.cos(cameraAngleX)
          camera.position.y = cameraDistance * Math.sin(cameraAngleX)
          camera.position.z = cameraDistance * Math.cos(cameraAngleY) * Math.cos(cameraAngleX)
          camera.lookAt(0, 2, 0)
        }
        updateCameraPosition()

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(viewerRef.current!.clientWidth, viewerRef.current!.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio || 1)
        viewerRef.current!.appendChild(renderer.domElement)

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(10, 20, 10)
        scene.add(directionalLight)

        // Groups
        const placedGroup = new THREE.Group()
        scene.add(placedGroup)

        let containerWire: any = null

        const createContainerWire = () => {
          if (containerWire) {
            scene.remove(containerWire)
            if (containerWire.geometry) containerWire.geometry.dispose()
            if (containerWire.material) containerWire.material.dispose()
            containerWire = null
          }

          const geom = new THREE.BoxGeometry(container.L, container.H, container.W)
          const edges = new THREE.EdgesGeometry(geom)
          const mat = new THREE.LineBasicMaterial({ color: 0x9fb7d6 })
          containerWire = new THREE.LineSegments(edges, mat)
          containerWire.position.set(0, container.H / 2, 0)
          scene.add(containerWire)

          const floorGeo = new THREE.PlaneGeometry(container.L * 1.2, container.W * 1.2)
          const floorMat = new THREE.MeshStandardMaterial({
            color: 0x1a365d,
            opacity: 0.1,
            transparent: true,
            side: THREE.DoubleSide,
          })
          const floor = new THREE.Mesh(floorGeo, floorMat)
          floor.rotation.x = -Math.PI / 2
          floor.position.y = 0
          scene.add(floor)
        }

        let wireframeMode = false

        const placeBoxes = () => {
          while (placedGroup.children.length) {
            const old = placedGroup.children.pop()
            if (old) {
              if ('geometry' in old && old.geometry) old.geometry.dispose()
              if ('material' in old && old.material) {
                if (Array.isArray(old.material)) {
                  old.material.forEach((m: any) => m.dispose())
                } else {
                  old.material.dispose()
                }
              }
            }
          }

          const items: Array<{ L: number; W: number; H: number; src: number }> = []
          rows.forEach((r) => {
            const qty = parseInt(r.qty) || 0
            for (let i = 0; i < qty; i++) {
              items.push({
                L: toMeters(r.length),
                W: toMeters(r.width),
                H: toMeters(r.height),
                src: r.id,
              })
            }
          })

          if (items.length === 0) return

          items.sort((a, b) => b.L * b.W * b.H - a.L * a.W * a.H)

          const placed: Array<{ x: number; y: number; z: number; lx: number; ly: number; lz: number }> = []
          const step = 0.02
          const adaptiveStep = Math.max(step, Math.min(container.L, container.W) / 40)

          const overlaps = (a: typeof placed[0], b: typeof placed[0]) => {
            return (
              Math.abs(a.x - b.x) * 2 < a.lx + b.lx &&
              Math.abs(a.y - b.y) * 2 < a.ly + b.ly &&
              Math.abs(a.z - b.z) * 2 < a.lz + b.lz
            )
          }

          const layers: Array<{ y: number; height: number }> = []
          layers.push({ y: 0, height: 0 })

          items.forEach((it) => {
            const lx = Math.max(0.0001, it.L)
            const lz = Math.max(0.0001, it.W)
            const ly = Math.max(0.0001, it.H)
            let placedThis = false

            for (let li = 0; li < layers.length && !placedThis; li++) {
              const layer = layers[li]
              if (layer.height && layer.y + layer.height + ly > container.H + 1e-9) continue

              const stepXZ = adaptiveStep
              for (let x = -container.L / 2 + lx / 2; x <= container.L / 2 - lx / 2 + 1e-9; x += stepXZ) {
                if (placedThis) break
                for (let z = -container.W / 2 + lz / 2; z <= container.W / 2 - lz / 2 + 1e-9; z += stepXZ) {
                  const y = layer.y + ly / 2
                  const candidate = { x, y, z, lx, ly, lz }
                  let ok = true
                  for (const p of placed) {
                    if (overlaps(candidate, p)) {
                      ok = false
                      break
                    }
                  }
                  if (!ok) continue
                  placed.push(candidate)
                  if (!layer.height || ly > layer.height) layer.height = ly
                  placedThis = true
                  break
                }
                if (placedThis) break
              }
            }

            if (!placedThis) {
              const newLayerY = layers.reduce((s, Lr) => Math.max(s, Lr.y + Lr.height), 0)
              if (newLayerY + ly <= container.H + 1e-9) {
                const layer = { y: newLayerY, height: ly }
                layers.push(layer)
                const x = -container.L / 2 + lx / 2
                const z = -container.W / 2 + lz / 2
                const candidate = { x, y: layer.y + ly / 2, z, lx, ly, lz }
                let ok = true
                for (const p of placed) {
                  if (overlaps(candidate, p)) {
                    ok = false
                    break
                  }
                }
                if (ok) placed.push(candidate)
                else placed.push({ x: 0, y: layer.y + ly / 2, z: 0, lx, ly, lz })
              }
            }
          })

          placed.forEach((p) => {
            const geom = new THREE.BoxGeometry(p.lx, p.ly, p.lz)
            const mat = new THREE.MeshStandardMaterial({
              color: new THREE.Color(
                Math.random() * 0.5 + 0.3,
                Math.random() * 0.5 + 0.3,
                Math.random() * 0.5 + 0.3
              ),
              roughness: 0.7,
              metalness: 0.1,
              wireframe: wireframeMode,
            })
            const mesh = new THREE.Mesh(geom, mat)
            mesh.position.set(p.x, p.y, p.z)

            const edges = new THREE.EdgesGeometry(geom)
            const lineMat = new THREE.LineBasicMaterial({ color: 0x000000 })
            const lines = new THREE.LineSegments(edges, lineMat)
            lines.position.copy(mesh.position)

            placedGroup.add(mesh)
            placedGroup.add(lines)
          })
        }

        // Mouse controls
        let mouseDown = false
        let lastMouseX = 0
        let lastMouseY = 0

        const handleMouseDown = (e: MouseEvent) => {
          mouseDown = true
          lastMouseX = e.clientX
          lastMouseY = e.clientY
          if (viewerRef.current) viewerRef.current.style.cursor = 'grabbing'
        }

        const handleMouseUp = () => {
          mouseDown = false
          if (viewerRef.current) viewerRef.current.style.cursor = 'grab'
        }

        const handleMouseMove = (e: MouseEvent) => {
          if (!mouseDown) return
          const deltaX = e.clientX - lastMouseX
          const deltaY = e.clientY - lastMouseY
          cameraAngleY += deltaX * 0.01
          cameraAngleX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraAngleX - deltaY * 0.01))
          updateCameraPosition()
          lastMouseX = e.clientX
          lastMouseY = e.clientY
        }

        const handleWheel = (e: WheelEvent) => {
          cameraDistance = Math.max(5, Math.min(50, cameraDistance + e.deltaY * 0.01))
          updateCameraPosition()
        }

        if (viewerRef.current) {
          viewerRef.current.style.cursor = 'grab'
          viewerRef.current.addEventListener('mousedown', handleMouseDown)
          viewerRef.current.addEventListener('mouseup', handleMouseUp)
          viewerRef.current.addEventListener('mousemove', handleMouseMove)
          viewerRef.current.addEventListener('wheel', handleWheel)
        }

        const fitToView = () => {
          cameraDistance = 15
          cameraAngleX = 0.8
          cameraAngleY = 0.5
          updateCameraPosition()
        }

        const toggleWireframe = () => {
          wireframeMode = !wireframeMode
          placedGroup.children.forEach((child: any) => {
            if ('material' in child && child.material && !Array.isArray(child.material)) {
              if ('wireframe' in child.material) {
                child.material.wireframe = wireframeMode
              }
            }
          })
        }

        const takeScreenshot = () => {
          renderer.domElement.toBlob((blob: Blob | null) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'cbm_scene.png'
              a.click()
              URL.revokeObjectURL(url)
            }
          })
        }

        // Store functions globally for buttons
        ;(window as any).fitToView = fitToView
        ;(window as any).toggleWireframe = toggleWireframe
        ;(window as any).takeScreenshot = takeScreenshot

        const update3D = () => {
          // Get current values from the component state
          const currentContainer = container
          const currentRows = rows
          const currentUnit = unit
          
          // Recreate container wire with current container
          const c = currentContainer
          const L = c.L
          const W = c.W
          const H = c.H
          
          if (containerWire) {
            scene.remove(containerWire)
            if (containerWire.geometry) containerWire.geometry.dispose()
            if (containerWire.material) containerWire.material.dispose()
            containerWire = null
          }

          const geom = new THREE.BoxGeometry(L, H, W)
          const edges = new THREE.EdgesGeometry(geom)
          const mat = new THREE.LineBasicMaterial({ color: 0x9fb7d6 })
          containerWire = new THREE.LineSegments(edges, mat)
          containerWire.position.set(0, H / 2, 0)
          scene.remove(scene.children.find((child: any) => child.type === 'Plane') || scene.children[0])
          scene.add(containerWire)

          const floorGeo = new THREE.PlaneGeometry(L * 1.2, W * 1.2)
          const floorMat = new THREE.MeshStandardMaterial({
            color: 0x1a365d,
            opacity: 0.1,
            transparent: true,
            side: THREE.DoubleSide,
          })
          const floor = new THREE.Mesh(floorGeo, floorMat)
          floor.rotation.x = -Math.PI / 2
          floor.position.y = 0
          scene.add(floor)

          // Recreate boxes with current rows
          while (placedGroup.children.length) {
            const old = placedGroup.children.pop()
            if (old) {
              if ('geometry' in old && old.geometry) old.geometry.dispose()
              if ('material' in old && old.material) {
                if (Array.isArray(old.material)) {
                  old.material.forEach((m: any) => m.dispose())
                } else {
                  old.material.dispose()
                }
              }
            }
          }

          const toMetersLocal = (val: string | number): number => {
            const n = parseFloat(String(val))
            if (isNaN(n)) return 0
            return currentUnit === 'cm' ? n / 100 : n
          }

          const items: Array<{ L: number; W: number; H: number; src: number }> = []
          currentRows.forEach((r) => {
            const qty = parseInt(r.qty) || 0
            for (let i = 0; i < qty; i++) {
              items.push({
                L: toMetersLocal(r.length),
                W: toMetersLocal(r.width),
                H: toMetersLocal(r.height),
                src: r.id,
              })
            }
          })

          if (items.length === 0) return

          items.sort((a, b) => b.L * b.W * b.H - a.L * a.W * a.H)

          const placed: Array<{ x: number; y: number; z: number; lx: number; ly: number; lz: number }> = []
          const step = 0.02
          const adaptiveStep = Math.max(step, Math.min(L, W) / 40)

          const overlaps = (a: typeof placed[0], b: typeof placed[0]) => {
            return (
              Math.abs(a.x - b.x) * 2 < a.lx + b.lx &&
              Math.abs(a.y - b.y) * 2 < a.ly + b.ly &&
              Math.abs(a.z - b.z) * 2 < a.lz + b.lz
            )
          }

          const layers: Array<{ y: number; height: number }> = []
          layers.push({ y: 0, height: 0 })

          items.forEach((it) => {
            const lx = Math.max(0.0001, it.L)
            const lz = Math.max(0.0001, it.W)
            const ly = Math.max(0.0001, it.H)
            let placedThis = false

            for (let li = 0; li < layers.length && !placedThis; li++) {
              const layer = layers[li]
              if (layer.height && layer.y + layer.height + ly > H + 1e-9) continue

              const stepXZ = adaptiveStep
              for (let x = -L / 2 + lx / 2; x <= L / 2 - lx / 2 + 1e-9; x += stepXZ) {
                if (placedThis) break
                for (let z = -W / 2 + lz / 2; z <= W / 2 - lz / 2 + 1e-9; z += stepXZ) {
                  const y = layer.y + ly / 2
                  const candidate = { x, y, z, lx, ly, lz }
                  let ok = true
                  for (const p of placed) {
                    if (overlaps(candidate, p)) {
                      ok = false
                      break
                    }
                  }
                  if (!ok) continue
                  placed.push(candidate)
                  if (!layer.height || ly > layer.height) layer.height = ly
                  placedThis = true
                  break
                }
                if (placedThis) break
              }
            }

            if (!placedThis) {
              const newLayerY = layers.reduce((s, Lr) => Math.max(s, Lr.y + Lr.height), 0)
              if (newLayerY + ly <= H + 1e-9) {
                const layer = { y: newLayerY, height: ly }
                layers.push(layer)
                const x = -L / 2 + lx / 2
                const z = -W / 2 + lz / 2
                const candidate = { x, y: layer.y + ly / 2, z, lx, ly, lz }
                let ok = true
                for (const p of placed) {
                  if (overlaps(candidate, p)) {
                    ok = false
                    break
                  }
                }
                if (ok) placed.push(candidate)
                else placed.push({ x: 0, y: layer.y + ly / 2, z: 0, lx, ly, lz })
              }
            }
          })

          placed.forEach((p) => {
            const geom = new THREE.BoxGeometry(p.lx, p.ly, p.lz)
            const mat = new THREE.MeshStandardMaterial({
              color: new THREE.Color(
                Math.random() * 0.5 + 0.3,
                Math.random() * 0.5 + 0.3,
                Math.random() * 0.5 + 0.3
              ),
              roughness: 0.7,
              metalness: 0.1,
              wireframe: wireframeMode,
            })
            const mesh = new THREE.Mesh(geom, mat)
            mesh.position.set(p.x, p.y, p.z)

            const edges = new THREE.EdgesGeometry(geom)
            const lineMat = new THREE.LineBasicMaterial({ color: 0x000000 })
            const lines = new THREE.LineSegments(edges, lineMat)
            lines.position.copy(mesh.position)

            placedGroup.add(mesh)
            placedGroup.add(lines)
          })
        }

        // Store update function globally so it can be called when data changes
        ;(window as any).updateCBM3D = update3D

        const onResize = () => {
          const w = viewerRef.current!.clientWidth
          const h = viewerRef.current!.clientHeight
          renderer.setSize(w, h)
          camera.aspect = w / h
          camera.updateProjectionMatrix()
        }

        window.addEventListener('resize', onResize)

        createContainerWire()
        placeBoxes()

        const animate = () => {
          requestAnimationFrame(animate)
          renderer.render(scene, camera)
        }
        animate()

        threeInitialized.current = true

        // Cleanup
        return () => {
          window.removeEventListener('resize', onResize)
          if (viewerRef.current) {
            viewerRef.current.removeEventListener('mousedown', handleMouseDown)
            viewerRef.current.removeEventListener('mouseup', handleMouseUp)
            viewerRef.current.removeEventListener('mousemove', handleMouseMove)
            viewerRef.current.removeEventListener('wheel', handleWheel)
          }
        }
      } catch (error) {
        console.error('Failed to initialize Three.js:', error)
      }
    }

    initThree()

    // Cleanup function
    return () => {
      threeInitialized.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update 3D scene when data changes
  useEffect(() => {
    if (!threeInitialized.current || !(window as any).THREE) return
    
    if (!viewerRef.current) return

    // Update scene using stored function
    if ((window as any).updateCBM3D) {
      ;(window as any).updateCBM3D()
    }
  }, [container.H, container.L, container.W, container.volume, rows, unit])

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      {/* Wave Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 Q200,50 400,100 T800,100 T1200,100 L1200,200 L0,200 Z" fill="url(#waveGradientCBM3D)" />
          <defs>
            <linearGradient id="waveGradientCBM3D" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* Left: Calculator */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-4">
              CBM Calculator — <span className="text-cyan-400">Single Shipping Container</span>
            </h1>

            <div className="flex flex-wrap gap-4 items-center mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Units:
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'cm' | 'm')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Container:
                <select
                  value={containers.findIndex((c) => c.name === container.name)}
                  onChange={handleContainerChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                >
                  {containers.map((c, idx) => (
                    <option key={idx} value={idx}>
                      {c.name.replace('ft', '′')} — {c.volume} m³
                    </option>
                  ))}
                </select>
              </label>

              <div className="ml-auto flex gap-2">
                <button
                  onClick={addBox}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-primary-500 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-primary-600 transition-all duration-300"
                >
                  + Add box
                </button>
                <button
                  onClick={exportCSV}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border-2 border-cyan-200 rounded-lg font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300"
                >
                  Export CSV
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border-2 border-cyan-200 rounded-lg font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Length</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Width</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Height</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Qty</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">CBM (row)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-cyan-50 transition-colors">
                      <td className="px-4 py-3 text-center text-gray-600 font-medium">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={row.length}
                          onChange={(e) => updateRow(row.id, 'length', e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={row.width}
                          onChange={(e) => updateRow(row.id, 'width', e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={row.height}
                          onChange={(e) => updateRow(row.id, 'height', e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={row.qty}
                          onChange={(e) => updateRow(row.id, 'qty', e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none"
                        />
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700 font-medium">{rowCBM(row).toFixed(6)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeBox(row.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-6">
              <div className="bg-gradient-to-br from-cyan-50 to-primary-50 px-4 py-3 rounded-lg border border-cyan-200">
                <div className="text-xs text-gray-600 mb-1">Total CBM</div>
                <div className="text-lg font-bold text-gray-900">{totalCBM.toFixed(6)} m³</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-primary-50 px-4 py-3 rounded-lg border border-cyan-200">
                <div className="text-xs text-gray-600 mb-1">Container volume</div>
                <div className="text-lg font-bold text-gray-900">{container.volume.toFixed(3)} m³</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-primary-50 px-4 py-3 rounded-lg border border-cyan-200">
                <div className="text-xs text-gray-600 mb-1">Containers needed</div>
                <div className="text-lg font-bold text-gray-900">{containersNeeded}</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-primary-50 px-4 py-3 rounded-lg border border-cyan-200">
                <div className="text-xs text-gray-600 mb-1">Fill</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{fillPercent.toFixed(2)}%</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-primary-500 transition-all duration-300"
                      style={{ width: `${fillPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Note: the 3D view uses a simple placement algorithm (grid/shelf style). It&apos;s a visual aid — not an industrial packing optimizer.
            </p>
          </div>

          {/* Right: 3D Viewer */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-cyan-100">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">3D Container Viewer</h2>
            <div ref={viewerRef} className="w-full h-[640px] rounded-lg bg-[#0b1220] overflow-hidden" />
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs text-gray-500">Rotate: drag • Zoom: scroll</div>
              <div className="flex gap-2">
                <button
                  onClick={() => (window as any).fitToView?.()}
                  className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border border-cyan-200 rounded-lg text-sm font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300"
                >
                  Reset View
                </button>
                <button
                  onClick={() => (window as any).toggleWireframe?.()}
                  className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border border-cyan-200 rounded-lg text-sm font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300"
                >
                  Wireframe
                </button>
                <button
                  onClick={() => (window as any).takeScreenshot?.()}
                  className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-primary-50 text-cyan-600 border border-cyan-200 rounded-lg text-sm font-semibold hover:from-cyan-100 hover:to-primary-100 hover:border-cyan-400 transition-all duration-300"
                >
                  Screenshot
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

