"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxBackground() {
  const [windowHeight, setWindowHeight] = useState(0)
  const { scrollY } = useScroll()

  // Transform values based on scroll position
  const y1 = useTransform(scrollY, [0, windowHeight], [0, 100])
  const y2 = useTransform(scrollY, [0, windowHeight], [0, -150])
  const y3 = useTransform(scrollY, [0, windowHeight], [0, 80])
  const opacity = useTransform(scrollY, [0, windowHeight * 0.5], [0.2, 0])

  useEffect(() => {
    setWindowHeight(window.innerHeight)

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <motion.div className="absolute top-[10%] left-[5%] text-mocha-200 opacity-20" style={{ y: y1, opacity }}>
        <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a8 8 0 0 0-8 8v12h16V10a8 8 0 0 0-8-8Z"></path>
        </svg>
      </motion.div>

      <motion.div className="absolute top-[30%] right-[10%] text-mocha-200 opacity-10" style={{ y: y2, opacity }}>
        <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 17H2a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3Z"></path>
          <path d="M22 9H2"></path>
          <path d="M22 9a8 8 0 0 0-8-8H2"></path>
          <path d="M22 9a8 8 0 0 1-8 8H2"></path>
        </svg>
      </motion.div>

      <motion.div className="absolute bottom-[20%] left-[15%] text-mocha-200 opacity-15" style={{ y: y3, opacity }}>
        <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path>
          <path d="M12 14v4"></path>
          <path d="M12 6h.01"></path>
        </svg>
      </motion.div>
    </div>
  )
}
