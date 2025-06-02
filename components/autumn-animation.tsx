"use client"

import { useEffect, useState } from "react"

interface Leaf {
  id: number
  left: number
  animationDuration: number
  animationDelay: number
  size: number
  color: string
  shape: string
}

export default function AutumnAnimation() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    const leafColors = ["#f59e0b", "#ea580c", "#dc2626", "#b91c1c", "#92400e", "#d97706"]
    const leafShapes = ["🍂", "🍁", "🌿", "🍃"]

    const generateLeaves = () => {
      const newLeaves: Leaf[] = []
      for (let i = 0; i < 15; i++) {
        newLeaves.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 3 + 8, // 8-11 seconds
          animationDelay: Math.random() * 5,
          size: Math.random() * 20 + 15, // 15-35px
          color: leafColors[Math.floor(Math.random() * leafColors.length)],
          shape: leafShapes[Math.floor(Math.random() * leafShapes.length)],
        })
      }
      setLeaves(newLeaves)
    }

    generateLeaves()
    const interval = setInterval(generateLeaves, 10000) // Regenerate every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="autumn-leaf absolute"
          style={{
            left: `${leaf.left}%`,
            fontSize: `${leaf.size}px`,
            color: leaf.color,
            animationDuration: `${leaf.animationDuration}s, 4s`,
            animationDelay: `${leaf.animationDelay}s`,
          }}
        >
          {leaf.shape}
        </div>
      ))}

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-red-300 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full opacity-30 animate-ping"></div>
    </div>
  )
}
