import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { ThemeContext } from '../pages/_app'

// useLayoutEffect on client, useEffect on server (avoids SSR warning)
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const getTextFromChildren = (children) => {
  if (children == null) return ''
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(getTextFromChildren).join('')
  if (children?.type === 'br') return '\n'
  // RenderElements React element from @graphcms/rich-text-react-renderer:
  // children = React.createElement(RenderElements, { content: [astNodes], ... })
  // The raw AST text nodes are in children.props.content
  if (Array.isArray(children?.props?.content)) {
    return children.props.content.map(getTextFromChildren).join('')
  }
  if (children?.children != null) return getTextFromChildren(children.children)
  if (typeof children === 'object' && typeof children.text === 'string')
    return children.text
  if (typeof children === 'object' && typeof children.value === 'string')
    return children.value
  if (children?.props && 'children' in children.props)
    return getTextFromChildren(children.props.children)
  return ''
}

const MIN_SCALE = 0.25
const MAX_SCALE = 8
const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const MermaidDiagram = ({ code }) => {
  const { theme } = useContext(ThemeContext)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  const baseId = useId().replace(/:/g, '')
  const renderCountRef = useRef(0)

  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const [focused, setFocused] = useState(false)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const fitRef = useRef({ scale: 1, x: 0, y: 0 })
  const dragRef = useRef(null)
  const pointersRef = useRef(new Map()) // pointerId → {x, y}
  const pinchRef = useRef(null) // { dist }
  const svgSizeRef = useRef({ w: 0, h: 0 }) // natural (unscaled) SVG dimensions
  const scaleRef = useRef(1) // mirrors scale state, updated synchronously

  // Render mermaid SVG
  useEffect(() => {
    let cancelled = false
    setError(null)
    setSvg('')

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
        })
        renderCountRef.current += 1
        const id = `mermaid-${baseId}-${renderCountRef.current}`
        const { svg: rendered } = await mermaid.render(id, code)
        if (!cancelled) setSvg(rendered)
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to render diagram')
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [code, theme, baseId])

  // Compute fit-to-container transform after SVG is in the DOM
  useIsomorphicLayoutEffect(() => {
    if (!svg || !contentRef.current || !containerRef.current) return
    const svgEl = contentRef.current.querySelector('svg')
    if (!svgEl) return

    const containerW = containerRef.current.clientWidth
    const containerH = containerRef.current.clientHeight
    const svgW = svgEl.getBoundingClientRect().width
    const svgH = svgEl.getBoundingClientRect().height

    if (svgW <= 0 || svgH <= 0) return

    svgSizeRef.current = { w: svgW, h: svgH }

    const fitScale = clamp(
      Math.min(containerW / svgW, containerH / svgH),
      MIN_SCALE,
      1,
    )
    const fitX = (containerW - svgW * fitScale) / 2
    const fitY = (containerH - svgH * fitScale) / 2

    fitRef.current = { scale: fitScale, x: fitX, y: fitY }
    scaleRef.current = fitScale
    setScale(fitScale)
    setOffset({ x: fitX, y: fitY })
  }, [svg])

  // Clamp offset so at least BOUNDS_MARGIN px of the diagram stays visible
  const BOUNDS_MARGIN = 80
  const clampOffset = useCallback((ox, oy, sc) => {
    if (!containerRef.current) return { x: ox, y: oy }
    const { w: svgW, h: svgH } = svgSizeRef.current
    if (svgW <= 0 || svgH <= 0) return { x: ox, y: oy }
    const containerW = containerRef.current.clientWidth
    const containerH = containerRef.current.clientHeight
    return {
      x: clamp(ox, BOUNDS_MARGIN - svgW * sc, containerW - BOUNDS_MARGIN),
      y: clamp(oy, BOUNDS_MARGIN - svgH * sc, containerH - BOUNDS_MARGIN),
    }
  }, [])

  // Wheel → zoom toward cursor, only when focused
  const handleWheel = useCallback(
    (e) => {
      if (!focused) return
      e.preventDefault()
      const rect = containerRef.current.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const delta = e.deltaY < 0 ? 1.1 : 1 / 1.1
      setScale((prev) => {
        const next = clamp(prev * delta, MIN_SCALE, MAX_SCALE)
        scaleRef.current = next
        const ratio = next / prev
        setOffset((o) =>
          clampOffset(cx - ratio * (cx - o.x), cy - ratio * (cy - o.y), next),
        )
        return next
      })
    },
    [focused, clampOffset],
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel, svg])

  // Pointer events: 1 pointer = pan, 2 pointers = pinch-to-zoom
  const handlePointerDown = useCallback(
    (e) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (pointersRef.current.size === 1) {
        dragRef.current = {
          startX: e.clientX,
          startY: e.clientY,
          originX: offset.x,
          originY: offset.y,
        }
      } else {
        // Second finger — cancel pan, begin pinch
        dragRef.current = null
        const pts = [...pointersRef.current.values()]
        const dx = pts[0].x - pts[1].x
        const dy = pts[0].y - pts[1].y
        pinchRef.current = { dist: Math.sqrt(dx * dx + dy * dy) }
      }
    },
    [offset],
  )

  const handlePointerMove = useCallback(
    (e) => {
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (pointersRef.current.size >= 2 && pinchRef.current) {
        // Pinch zoom
        const pts = [...pointersRef.current.values()]
        const dx = pts[0].x - pts[1].x
        const dy = pts[0].y - pts[1].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const ratio = dist / pinchRef.current.dist
        pinchRef.current.dist = dist

        const rect = containerRef.current.getBoundingClientRect()
        const cx = (pts[0].x + pts[1].x) / 2 - rect.left
        const cy = (pts[0].y + pts[1].y) / 2 - rect.top

        setScale((prev) => {
          const next = clamp(prev * ratio, MIN_SCALE, MAX_SCALE)
          scaleRef.current = next
          const r = next / prev
          setOffset((o) =>
            clampOffset(cx - r * (cx - o.x), cy - r * (cy - o.y), next),
          )
          return next
        })
      } else if (pointersRef.current.size === 1 && dragRef.current) {
        // Pan
        const newX =
          dragRef.current.originX + e.clientX - dragRef.current.startX
        const newY =
          dragRef.current.originY + e.clientY - dragRef.current.startY
        setOffset(clampOffset(newX, newY, scaleRef.current))
      }
    },
    [clampOffset],
  )

  const handlePointerUp = useCallback((e) => {
    pointersRef.current.delete(e.pointerId)
    if (pointersRef.current.size < 2) pinchRef.current = null
    if (pointersRef.current.size === 0) dragRef.current = null
  }, [])

  // Reset to fit-to-container default
  const handleReset = useCallback(() => {
    const { scale: fs, x: fx, y: fy } = fitRef.current
    setScale(fs)
    setOffset({ x: fx, y: fy })
  }, [])

  const isTransformed =
    Math.abs(scale - fitRef.current.scale) > 0.001 ||
    Math.abs(offset.x - fitRef.current.x) > 1 ||
    Math.abs(offset.y - fitRef.current.y) > 1

  if (error) {
    return (
      <pre className="text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-md overflow-x-auto text-sm">
        {`Mermaid render error:\n${error}\n\n${code}`}
      </pre>
    )
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center p-8 text-light-muted dark:text-dark-muted text-sm">
        Loading diagram...
      </div>
    )
  }

  return (
    <div
      className={`relative rounded-md border overflow-hidden bg-light-card dark:bg-dark-card transition-shadow ${focused ? 'border-blue-500 ring-2 ring-blue-500' : 'border-light-border dark:border-dark-border'}`}
    >
      {/* zoom controls */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
        <button
          onClick={() => setScale((s) => clamp(s * 1.25, MIN_SCALE, MAX_SCALE))}
          className="w-7 h-7 flex items-center justify-center rounded bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text text-sm leading-none select-none"
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setScale((s) => clamp(s / 1.25, MIN_SCALE, MAX_SCALE))}
          className="w-7 h-7 flex items-center justify-center rounded bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text text-sm leading-none select-none"
          title="Zoom out"
        >
          −
        </button>
        {isTransformed && (
          <button
            onClick={handleReset}
            className="px-2 h-7 flex items-center justify-center rounded bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text text-xs leading-none select-none"
            title="Reset view"
          >
            reset
          </button>
        )}
      </div>

      {/* diagram canvas */}
      <div
        ref={containerRef}
        tabIndex={0}
        className={`overflow-hidden select-none outline-none cursor-grab active:cursor-grabbing ${
          !focused ? 'cursor-default' : ''
        }`}
        style={{ height: '420px' }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={contentRef}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            display: 'inline-block',
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      <p className="absolute bottom-2 left-2 text-xs text-light-muted dark:text-dark-muted pointer-events-none select-none">
        {focused
          ? 'scroll to zoom · drag to pan · click outside to release'
          : 'click to interact'}
      </p>
    </div>
  )
}

export { getTextFromChildren }
export default MermaidDiagram
