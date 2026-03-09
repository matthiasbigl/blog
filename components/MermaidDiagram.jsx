import React, { useEffect, useId, useRef, useState, useContext } from 'react'
import { ThemeContext } from '../pages/_app'

const getTextFromChildren = (children) => {
  if (children == null) return ''
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(getTextFromChildren).join('')
  if (Array.isArray(children?.children))
    return children.children.map(getTextFromChildren).join('')
  if (typeof children === 'object' && typeof children.text === 'string')
    return children.text
  if (typeof children === 'object' && typeof children.value === 'string')
    return children.value
  if (children?.props?.children)
    return getTextFromChildren(children.props.children)
  return ''
}

const MermaidDiagram = ({ code }) => {
  const { theme } = useContext(ThemeContext)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  const baseId = useId().replace(/:/g, '')
  const renderCountRef = useRef(0)

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
      className="mermaid-diagram flex justify-center overflow-x-auto py-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export { getTextFromChildren }
export default MermaidDiagram
