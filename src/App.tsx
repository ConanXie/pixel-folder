import React from "react"
import Background from "./components/Background"
import Folder from "./components/Folder"
import "./styles.css"

export default function App() {
  const offset = 200

  return (
    <div className="app">
      <Background />
      <h1>What the hell</h1>
      <Folder
        style={{ left: `calc(50vw - ${offset}px)`, top: `calc(50vh - ${offset}px)` }}
        items={[0, 1]}
      />
      <Folder
        style={{ left: `calc(50vw + ${offset}px)`, top: `calc(50vh - ${offset}px)` }}
        items={[0, 1, 2]}
      />
      <Folder
        style={{ left: `calc(50vw - ${offset}px)`, top: `calc(50vh + ${offset}px)` }}
        items={[0, 1, 2, 3]}
      />
      <Folder
        style={{ left: `calc(50vw + ${offset}px)`, top: `calc(50vh + ${offset}px)` }}
        items={[0, 1, 2, 3, 4, 5, 6]}
      />
    </div>
  )
}
