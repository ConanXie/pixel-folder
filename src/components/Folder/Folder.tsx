import React, { useCallback, useRef, useState, useMemo } from "react"
import clsx from "clsx"
import "./folder.css"

type Props = {
  items: number[]
  className?: string
  style?: React.CSSProperties
}

/** Folder Component */
function Folder(props: Props) {
  const { className, items = [], style: propsStyle } = props

  // state of folder opening
  const [open, setOpen] = useState(false)

  const folderRef = useRef<HTMLDivElement>(null)

  const columns = useMemo(() => Math.ceil(Math.sqrt(items.length)), [items])

  const rows = useMemo(() => Math.ceil(items.length / columns), [items, columns])

  // dynamic styles of folder container
  const folderStyles: React.CSSProperties = useMemo(() => {
    const style: React.CSSProperties = {}

    if (open) {
      const folder = folderRef.current!

      const { left, top, width: w, height: h } = folder.getBoundingClientRect()
      const width = 125 * columns
      const height = 125 * rows

      style.margin = "0"
      style.position = "fixed"
      style.left = left - (width - w) / 2 - 2 + "px"
      style.top = top - (height - h) / 2 - 2 + "px"
      style.width = width + "px"
      style.height = height + "px"
      style.borderRadius = "8px"
      style.borderColor = "transparent"
      style.boxShadow = `0 2px 8px 0 rgba(0, 0, 0, 0.65)`
    }

    return style
  }, [open, columns, rows])

  // dynamic styles of grid container
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

  // calculate classname of grid
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

  const handleDocumentClick = useCallback((event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setOpen(false)

    // clear listener
    document.removeEventListener("click", handleDocumentClick)
  }, [])

  function handleFolderClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()

    setOpen(true)

    document.addEventListener("click", handleDocumentClick)
  }

  const handleTransitionEnd = useCallback(() => {}, [])

  return (
    <div
      ref={folderRef}
      className={clsx("folder", { open }, className)}
      style={{ ...propsStyle, ...folderStyles }}
      onClick={handleFolderClick}
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
