import React from "react"
import Background from "./components/Background"
import Folder from "./components/Folder"
import "./styles.css"

export default function App() {
  return (
    <div className="app">
      <Background />
      <h1>What the hell</h1>
      <Folder items={[0, 1]} />
      <Folder style={{ top: 500 }} items={[0, 1]} />
      {/* <Folder style={{ top: 500, left: 500 }} items={[0, 1, 2, 3, 4]} /> */}
    </div>
  )
}
