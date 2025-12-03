'use client'

import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'

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
  const [threeLoaded, setThreeLoaded] = useState(false)

  const viewerRef = useRef<HTMLDivElement>(null)
  const tbodyRef = useRef<HTMLTableSectionElement>(null)
  const sceneRef = useRef<any>(null)
  const cameraRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const containerWireRef = useRef<any>(null)
  const placedGroupRef = useRef<any>(null)
  const wireframeModeRef = useRef(false)
  const is3DInitializedRef = useRef(false)
  
  // Refs to always get latest values
  const rowsRef = useRef(rows)
  const containerRef = useRef(container)
  const unitRef = useRef(unit)

  const mouseDownRef = useRef(false)
  const lastMouseXRef = useRef(0)
  const lastMouseYRef = useRef(0)
  const cameraDistanceRef = useRef(15)
  const cameraAngleXRef = useRef(0.8)
  const cameraAngleYRef = useRef(0.5)

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

  // Keep refs in sync with state
  useEffect(() => {
    rowsRef.current = rows
  }, [rows])
  
  useEffect(() => {
    containerRef.current = container
  }, [container])
  
  useEffect(() => {
    unitRef.current = unit
  }, [unit])

  const updateRow = (id: number, field: keyof BoxRow, value: string) => {
    const newRows = rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    rowsRef.current = newRows
    setRows(newRows)
  }

  const addBox = () => {
    const newRows = [...rows, { id: nextId, length: '50', width: '40', height: '30', qty: '1' }]
    rowsRef.current = newRows
    setRows(newRows)
    setNextId(nextId + 1)
  }

  const removeBox = (id: number) => {
    const newRows = rows.filter((r) => r.id !== id)
    rowsRef.current = newRows
    setRows(newRows)
  }

  const reset = () => {
    const newRows = [{ id: 1, length: '50', width: '40', height: '30', qty: '1' }]
    rowsRef.current = newRows
    setRows(newRows)
    setNextId(2)
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

  // Initialize Three.js and setup
  useEffect(() => {
    if (!threeLoaded || !viewerRef.current || is3DInitializedRef.current) return

    const THREE = (window as any).THREE
    if (!THREE) {
      console.error('THREE.js library not loaded')
      return
    }

    // Initialize refs with current values
    rowsRef.current = rows
    containerRef.current = container
    unitRef.current = unit

    const viewer = viewerRef.current
    viewer.innerHTML = ''

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b1220)
    sceneRef.current = scene

    // Camera
    const fov = 50
    const aspect = viewer.clientWidth / viewer.clientHeight
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000)
    cameraRef.current = camera
    
    // Define updateCameraPosition before using it
    const updateCameraPosition = () => {
      const cam = cameraRef.current
      if (!cam) return
      cam.position.x =
        cameraDistanceRef.current *
        Math.sin(cameraAngleYRef.current) *
        Math.cos(cameraAngleXRef.current)
      cam.position.y = cameraDistanceRef.current * Math.sin(cameraAngleXRef.current)
      cam.position.z =
        cameraDistanceRef.current *
        Math.cos(cameraAngleYRef.current) *
        Math.cos(cameraAngleXRef.current)
      cam.lookAt(0, 2, 0)
    }
    
    // Set initial camera position
    updateCameraPosition()

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(viewer.clientWidth, viewer.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    viewer.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Mouse controls
    const handleMouseDown = (e: MouseEvent) => {
      mouseDownRef.current = true
      lastMouseXRef.current = e.clientX
      lastMouseYRef.current = e.clientY
      viewer.style.cursor = 'grabbing'
    }

    const handleMouseUp = () => {
      mouseDownRef.current = false
      viewer.style.cursor = 'grab'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDownRef.current) return

      const deltaX = e.clientX - lastMouseXRef.current
      const deltaY = e.clientY - lastMouseYRef.current

      cameraAngleYRef.current += deltaX * 0.01
      cameraAngleXRef.current = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, cameraAngleXRef.current - deltaY * 0.01)
      )

      updateCameraPosition()

      lastMouseXRef.current = e.clientX
      lastMouseYRef.current = e.clientY
    }

    const handleWheel = (e: WheelEvent) => {
      cameraDistanceRef.current = Math.max(
        5,
        Math.min(50, cameraDistanceRef.current + e.deltaY * 0.01)
      )
      updateCameraPosition()
    }

    viewer.addEventListener('mousedown', handleMouseDown)
    viewer.addEventListener('mouseup', handleMouseUp)
    viewer.addEventListener('mousemove', handleMouseMove)
    viewer.addEventListener('wheel', handleWheel)
    viewer.style.cursor = 'grab'

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 20, 10)
    scene.add(directionalLight)

    // Placed group
    const placedGroup = new THREE.Group()
    scene.add(placedGroup)
    placedGroupRef.current = placedGroup

    const createContainerWire = () => {
      const currentScene = sceneRef.current
      if (!currentScene) {
        console.error('Scene not available in createContainerWire')
        return
      }

      // Always read from ref to get latest value
      const c = containerRef.current
      if (!c) {
        console.error('Container ref not available')
        return
      }
      const L = c.L
      const W = c.W
      const H = c.H

      if (containerWireRef.current) {
        currentScene.remove(containerWireRef.current)
        if (containerWireRef.current.geometry) containerWireRef.current.geometry.dispose()
        if (containerWireRef.current.material) containerWireRef.current.material.dispose()
        containerWireRef.current = null
      }

      const oldFloor = currentScene.children.find((child: any) => child.userData?.isFloor)
      if (oldFloor) {
        currentScene.remove(oldFloor)
        if (oldFloor.geometry) oldFloor.geometry.dispose()
        if (oldFloor.material) oldFloor.material.dispose()
      }

      const geom = new THREE.BoxGeometry(L, H, W)
      const edges = new THREE.EdgesGeometry(geom)
      const mat = new THREE.LineBasicMaterial({ color: 0x9fb7d6 })
      const containerWire = new THREE.LineSegments(edges, mat)
      containerWire.position.set(0, H / 2, 0)
      currentScene.add(containerWire)
      containerWireRef.current = containerWire

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
      floor.userData.isFloor = true
      currentScene.add(floor)
    }

    const placeBoxesSimple = () => {
      const currentScene = sceneRef.current
      if (!currentScene || !placedGroupRef.current) {
        console.error('Scene or placedGroup not available in placeBoxesSimple')
        return
      }

      while (placedGroupRef.current.children.length) {
        const old = placedGroupRef.current.children.pop()
        if (old) {
          if (old.geometry) old.geometry.dispose()
          if (old.material) old.material.dispose()
        }
      }

      // Always read from refs to get latest values
      const c = containerRef.current
      const currentRows = rowsRef.current
      const currentUnit = unitRef.current
      
      if (!c || !currentRows) {
        console.error('Container or rows refs not available')
        return
      }
      
      const L = c.L
      const W = c.W
      const H = c.H

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

      const placed: Array<{
        x: number
        y: number
        z: number
        lx: number
        ly: number
        lz: number
      }> = []
      const step = 0.02
      const adaptiveStep = Math.max(step, Math.min(L, W) / 40)

      const overlaps = (
        a: typeof placed[0],
        b: typeof placed[0]
      ) => {
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
          wireframe: wireframeModeRef.current,
        })
        const mesh = new THREE.Mesh(geom, mat)
        mesh.position.set(p.x, p.y, p.z)

        const edges = new THREE.EdgesGeometry(geom)
        const lineMat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 })
        const lines = new THREE.LineSegments(edges, lineMat)
        lines.position.copy(mesh.position)

        placedGroupRef.current.add(mesh)
        placedGroupRef.current.add(lines)
      })
    }

    const update3D = () => {
      try {
        if (!THREE) {
          console.error('THREE.js not available')
          return
        }
        createContainerWire()
        placeBoxesSimple()
      } catch (error) {
        console.error('Error in update3D:', error)
      }
    }

    const fitToView = () => {
      cameraDistanceRef.current = 15
      cameraAngleXRef.current = 0.8
      cameraAngleYRef.current = 0.5
      updateCameraPosition()
    }

    const toggleWireframe = () => {
      wireframeModeRef.current = !wireframeModeRef.current
      if (placedGroupRef.current) {
        placedGroupRef.current.children.forEach((child: any) => {
          if (child.material && child.material.wireframe !== undefined) {
            child.material.wireframe = wireframeModeRef.current
          }
        })
      }
    }

    const takeScreenshot = () => {
      if (!rendererRef.current) return
      rendererRef.current.domElement.toBlob((blob: Blob | null) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'cbm_scene.png'
        a.click()
        URL.revokeObjectURL(url)
      })
    }

    const onResize = () => {
      if (!rendererRef.current || !cameraRef.current) return
      const w = viewer.clientWidth
      const h = viewer.clientHeight
      rendererRef.current.setSize(w, h)
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
    }

    window.addEventListener('resize', onResize)

    // Store functions globally for button handlers
    ;(window as any).fitToView = fitToView
    ;(window as any).toggleWireframe = toggleWireframe
    ;(window as any).takeScreenshot = takeScreenshot
    ;(window as any).updateCBM3D = update3D

    // Initial setup
    console.log('Initializing 3D scene...')
    updateCameraPosition()
    console.log('Camera position set')
    createContainerWire()
    console.log('Container wire created')
    placeBoxesSimple()
    console.log('Boxes placed')

    const animate = () => {
      requestAnimationFrame(animate)
      const currentScene = sceneRef.current
      if (rendererRef.current && currentScene && cameraRef.current) {
        rendererRef.current.render(currentScene, cameraRef.current)
      }
    }
    animate()
    console.log('Animation loop started')

    is3DInitializedRef.current = true
    console.log('3D initialization complete')

    return () => {
      window.removeEventListener('resize', onResize)
      viewer.removeEventListener('mousedown', handleMouseDown)
      viewer.removeEventListener('mouseup', handleMouseUp)
      viewer.removeEventListener('mousemove', handleMouseMove)
      viewer.removeEventListener('wheel', handleWheel)
    }
  }, [threeLoaded])

  // Update 3D when data changes - use separate effect to avoid recreating scene
  useEffect(() => {
    if (is3DInitializedRef.current && (window as any).updateCBM3D) {
      // Small delay to ensure refs are updated
      setTimeout(() => {
        if ((window as any).updateCBM3D) {
          ;(window as any).updateCBM3D()
        }
      }, 10)
    }
  }, [rows, container, unit])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"
        onLoad={() => setThreeLoaded(true)}
        strategy="lazyOnload"
      />
      <main
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
          background: 'linear-gradient(to bottom, #e0f2fe, #ffffff)',
          color: '#1e293b',
          minHeight: '100vh',
          padding: '48px 24px',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px' }}>
            {/* Left Panel: Calculator */}
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '2px solid #a5f3fc',
              }}
            >
              <h1
                style={{
                  margin: '0 0 24px 0',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#0f172a',
                }}
              >
                CBM Calculator —{' '}
                <span style={{ color: '#06b6d4' }}>Single Shipping Container</span>
              </h1>

              {/* Controls */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '32px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#475569',
                  }}
                >
                  Units:
                  <select
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as 'cm' | 'm')}
                    style={{
                      padding: '10px 14px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#475569',
                  }}
                >
                  Container:
                  <select
                    id="container"
                    value={containers.findIndex((c) => c.name === container.name)}
                    onChange={handleContainerChange}
                    style={{
                      padding: '10px 14px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {containers.map((c, idx) => (
                      <option key={idx} value={idx}>
                        {c.name === '20ft Standard' && '20′ Standard — 33.2 m³'}
                        {c.name === '40ft Standard' && '40′ Standard — 67.7 m³'}
                        {c.name === '40ft High Cube' && '40′ High Cube — 76.3 m³'}
                        {c.name === '45ft High Cube' && '45′ High Cube — 86.0 m³'}
                      </option>
                    ))}
                  </select>
                </label>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
                  <button
                    onClick={addBox}
                    style={{
                      padding: '12px 20px',
                      background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 8px rgba(6, 182, 212, 0.3)',
                    }}
                  >
                    + Add box
                  </button>
                  <button
                    onClick={exportCSV}
                    style={{
                      padding: '12px 20px',
                      background: 'linear-gradient(to right, #ecfeff, #dbeafe)',
                      color: '#0891b2',
                      border: '2px solid #a5f3fc',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={reset}
                    style={{
                      padding: '12px 20px',
                      background: 'linear-gradient(to right, #ecfeff, #dbeafe)',
                      color: '#0891b2',
                      border: '2px solid #a5f3fc',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table
                  id="boxTable"
                  style={{ width: '100%', borderCollapse: 'collapse' }}
                >
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#475569',
                        }}
                      >
                        #
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#475569',
                        }}
                      >
                        Length
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#475569',
                        }}
                      >
                        Width
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#475569',
                        }}
                      >
                        Height
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#475569',
                        }}
                      >
                        Qty
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#475569',
                        }}
                      >
                        CBM (row)
                      </th>
                      <th
                        style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#475569',
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody ref={tbodyRef}>
                    {rows.map((row, idx) => (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: '1px solid #f1f5f9',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#ecfeff'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = ''
                        }}
                      >
                        <td
                          style={{
                            padding: '16px',
                            textAlign: 'center',
                            color: '#64748b',
                            fontWeight: 600,
                          }}
                        >
                          {idx + 1}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <input
                            data-id={row.id}
                            data-field="length"
                            type="number"
                            value={row.length}
                            onChange={(e) => updateRow(row.id, 'length', e.target.value)}
                            style={{
                              width: '100px',
                              padding: '8px 12px',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none',
                              transition: 'all 0.2s',
                            }}
                          />
                        </td>
                        <td style={{ padding: '16px' }}>
                          <input
                            data-id={row.id}
                            data-field="width"
                            type="number"
                            value={row.width}
                            onChange={(e) => updateRow(row.id, 'width', e.target.value)}
                            style={{
                              width: '100px',
                              padding: '8px 12px',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none',
                              transition: 'all 0.2s',
                            }}
                          />
                        </td>
                        <td style={{ padding: '16px' }}>
                          <input
                            data-id={row.id}
                            data-field="height"
                            type="number"
                            value={row.height}
                            onChange={(e) => updateRow(row.id, 'height', e.target.value)}
                            style={{
                              width: '100px',
                              padding: '8px 12px',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none',
                              transition: 'all 0.2s',
                            }}
                          />
                        </td>
                        <td style={{ padding: '16px' }}>
                          <input
                            data-id={row.id}
                            data-field="qty"
                            type="number"
                            value={row.qty}
                            onChange={(e) => updateRow(row.id, 'qty', e.target.value)}
                            style={{
                              width: '80px',
                              padding: '8px 12px',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none',
                              transition: 'all 0.2s',
                            }}
                          />
                        </td>
                        <td
                          className="cbm"
                          style={{
                            padding: '16px',
                            textAlign: 'center',
                            color: '#0f172a',
                            fontWeight: 600,
                          }}
                        >
                          {rowCBM(row).toFixed(6)}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <button
                            onClick={() => removeBox(row.id)}
                            style={{
                              padding: '8px 16px',
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#dc2626'
                              e.currentTarget.style.transform = 'scale(1.05)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#ef4444'
                              e.currentTarget.style.transform = 'scale(1)'
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(to bottom right, #ecfeff, #dbeafe)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid #a5f3fc',
                    boxShadow: '0 2px 8px rgba(6, 182, 212, 0.15)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#64748b',
                      marginBottom: '4px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Total CBM
                  </div>
                  <div
                    id="totalCbm"
                    style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}
                  >
                    {totalCBM.toFixed(6)} m³
                  </div>
                </div>
                <div
                  style={{
                    background: 'linear-gradient(to bottom right, #ecfeff, #dbeafe)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid #a5f3fc',
                    boxShadow: '0 2px 8px rgba(6, 182, 212, 0.15)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#64748b',
                      marginBottom: '4px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Container volume
                  </div>
                  <div
                    id="containerVolume"
                    style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}
                  >
                    {container.volume.toFixed(3)} m³
                  </div>
                </div>
                <div
                  style={{
                    background: 'linear-gradient(to bottom right, #ecfeff, #dbeafe)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid #a5f3fc',
                    boxShadow: '0 2px 8px rgba(6, 182, 212, 0.15)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#64748b',
                      marginBottom: '4px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Containers needed
                  </div>
                  <div
                    id="containersNeeded"
                    style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}
                  >
                    {containersNeeded}
                  </div>
                </div>
                <div
                  style={{
                    background: 'linear-gradient(to bottom right, #ecfeff, #dbeafe)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid #a5f3fc',
                    boxShadow: '0 2px 8px rgba(6, 182, 212, 0.15)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#64748b',
                      marginBottom: '4px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Fill
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      id="fillPercent"
                      style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}
                    >
                      {fillPercent.toFixed(2)}%
                    </div>
                    <div
                      style={{
                        width: '150px',
                        height: '8px',
                        background: '#e2e8f0',
                        borderRadius: '999px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        id="fillBar"
                        style={{
                          height: '100%',
                          background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                          width: `${fillPercent}%`,
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                Note: the 3D view uses a simple placement algorithm (grid/shelf style). It&apos;s
                a visual aid — not an industrial packing optimizer.
              </p>
            </div>

            {/* Right Panel: 3D Viewer */}
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '2px solid #a5f3fc',
              }}
            >
              <h2
                style={{
                  margin: '0 0 20px 0',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#0f172a',
                }}
              >
                3D Container Viewer
              </h2>
              <div
                ref={viewerRef}
                style={{
                  width: '100%',
                  height: '640px',
                  borderRadius: '12px',
                  background: '#0b1220',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '16px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Rotate: drag • Zoom: scroll
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      if ((window as any).fitToView) (window as any).fitToView()
                    }}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(to right, #ecfeff, #dbeafe)',
                      color: '#0891b2',
                      border: '1px solid #a5f3fc',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    Reset View
                  </button>
                  <button
                    onClick={() => {
                      if ((window as any).toggleWireframe) (window as any).toggleWireframe()
                    }}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(to right, #ecfeff, #dbeafe)',
                      color: '#0891b2',
                      border: '1px solid #a5f3fc',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    Wireframe
                  </button>
                  <button
                    onClick={() => {
                      if ((window as any).takeScreenshot) (window as any).takeScreenshot()
                    }}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(to right, #ecfeff, #dbeafe)',
                      color: '#0891b2',
                      border: '1px solid #a5f3fc',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    Screenshot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

