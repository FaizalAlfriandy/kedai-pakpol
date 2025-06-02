"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ClickEffect {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export default function ClickAnimation() {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Warna mocha yang berbeda untuk variasi
      const mochaColors = [
        "#9c7057", // mocha-600
        "#815a47", // mocha-700
        "#a67e63", // mocha-500
        "#6b4b3d", // mocha-800
      ]

      const newEffect: ClickEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 100 + 50, // Ukuran acak antara 50-150px
        color: mochaColors[Math.floor(Math.random() * mochaColors.length)],
      }

      setClickEffects((prev) => [...prev, newEffect])

      // Hapus efek setelah animasi selesai
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
      }, 1000)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {clickEffects.map((effect) => (
          <motion.div
            key={effect.id}
            className="absolute rounded-full"
            style={{
              left: effect.x,
              top: effect.y,
              backgroundColor: effect.color,
              originX: "50%",
              originY: "50%",
            }}
            initial={{ opacity: 0.7, scale: 0, translateX: "-50%", translateY: "-50%" }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div
              style={{
                width: effect.size,
                height: effect.size,
                opacity: 0.2,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
