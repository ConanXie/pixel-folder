import React, { useCallback, useRef, useState, useMemo } from "react"
import clsx from "clsx"
import "./folder.css"

type Props = {
  items: number[]
  className?: string
  style?: React.CSSProperties
}

function Folder(props: Props) {
  const { className, items = [], style: propsStyle } = props

  // const [items] = useState([1, 2, 3])

  const [open, setOpen] = useState(false)

  const columns = useMemo(() => Math.ceil(Math.sqrt(items.length)), [items])

  const rows = useMemo(() => Math.ceil(items.length / columns), [items, columns])

  const folderStyles: React.CSSProperties = useMemo(() => {
    const style: React.CSSProperties = {}

    return style
  }, [open])

  const gridStyles: React.CSSProperties = useMemo(() => {
    const style: React.CSSProperties = {
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    }
    if (items.length > 3) {
      if (!open) {
        style.width = columns * 50
        style.height = rows * 50
      } else {
        style.width = 125 * columns + "px"
        style.height = 125 * rows + "px"
      }
    }
    return style
  }, [items, rows, columns, open])

  const gridClassName = useMemo(() => {
    switch (items.length) {
      case 1:
        return "count-one"
      case 2:
        return "count-two"
      case 3:
        return "count-three"
      default:
        return "count-four"
    }
  }, [items])

  const folderRef = useRef<HTMLDivElement>(null)

  const handleDocumentClick = useCallback((event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setOpen(false)

    const folder = folderRef.current!
    folder.removeAttribute("style")

    // clear listener
    document.removeEventListener("click", handleDocumentClick)
  }, [])

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()
    const { currentTarget: target } = event
    const { left, top, width: w, height: h } = target.getBoundingClientRect()
    const width = 125 * columns
    const height = 125 * rows

    setOpen(true)
    target.style.margin = "0"
    target.style.position = "fixed"
    target.style.left = left - (width - w) / 2 - 2 + "px"
    target.style.top = top - (height - h) / 2 - 2 + "px"
    target.style.width = width + "px"
    target.style.height = height + "px"
    target.style.borderRadius = "8px"
    target.style.borderColor = "transparent"
    target.style.boxShadow = `0 2px 8px 0 rgba(0, 0, 0, 0.65)`

    document.addEventListener("click", handleDocumentClick)
  }

  const handleTransitionEnd = useCallback(() => {}, [])

  return (
    <div
      ref={folderRef}
      className={clsx("folder", { open }, className)}
      style={{ ...propsStyle, ...folderStyles }}
      onClick={handleClick}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={clsx("folder-grid", gridClassName)} style={gridStyles}>
        {items.map((item) => (
          <div key={item}>
            <span>
              <div className="item-wrapper">{}</div>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Folder
