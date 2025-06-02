"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background dengan bentuk organik */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-mocha-50 via-orange-50 to-yellow-50"></div>

        {/* Bentuk organik */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-mocha-200 to-mocha-300 rounded-full opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-orange-200 to-yellow-200 rounded-full opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Elemen dekoratif makanan */}
        <motion.div
          className="absolute top-20 left-20 text-6xl opacity-10"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          🍜
        </motion.div>

        <motion.div
          className="absolute top-40 right-40 text-5xl opacity-15"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          🍗
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-40 text-4xl opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          🥤
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
    
            {/* Title dengan efek khusus */}
            <motion.h1
              className="text-5xl lg:text-7xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="block text-gray-800">Kedai</span>
              <span className="block bg-gradient-to-r from-mocha-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent relative">
                Pakpol
                <motion.div
                  className="absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-mocha-400 to-orange-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={isLoaded ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Makanan enak, mengenyangkan, dan terjangkau untuk mahasiswa.
              <span className="font-semibold text-mocha-600"> Rasakan kelezatan</span> menu kami yang dibuat dengan
              cinta.
            </motion.p>

            {/* Buttons dengan desain unik */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center lg:items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link href="/menu">
                <motion.div className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-mocha-600 to-orange-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <Button
                    size="lg"
                    className="relative bg-gradient-to-r from-mocha-600 to-orange-600 hover:from-mocha-700 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl"
                  >
                    🍽️ Lihat Menu
                  </Button>
                </motion.div>
              </Link>

              <Link href="/contact">
                <motion.div className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-mocha-600 text-mocha-600 hover:bg-mocha-50 px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm bg-white/80"
                  >
                    📞 Hubungi Kami
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-mocha-600">1000+</div>
                <div className="text-sm text-gray-600">Pelanggan Puas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-mocha-600">15+</div>
                <div className="text-sm text-gray-600">Menu Spesial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-mocha-600">4.8⭐</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image dengan desain unik */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Container utama dengan bentuk unik */}
            <div className="relative">
              {/* Background shape */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-mocha-200 to-orange-200 rounded-[3rem] transform rotate-6"
                animate={{
                  rotate: [6, 8, 6],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Main image */}
              <motion.div
                className="relative h-[400px] lg:h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl transform -rotate-3"
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/Nasgor.jpg"
                  alt="Kedai Pakpol Makanan Lezat"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mocha-900/20 to-transparent" />
              </motion.div>

              {/* Floating cards */}
              {isLoaded && (
                <>
                  <motion.div
                    className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-mocha-100"
                    initial={{ opacity: 0, y: 20, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: -10 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    whileHover={{ y: -5, rotate: -5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white text-xl">
                        💰
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Terjangkau</p>
                        <p className="text-sm text-gray-600">Mulai Rp 10.000</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-mocha-100"
                    initial={{ opacity: 0, y: -20, rotate: 10 }}
                    animate={{ opacity: 1, y: 0, rotate: 10 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    whileHover={{ y: -5, rotate: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white text-xl">
                        😋
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Lezat</p>
                        <p className="text-sm text-gray-600">Resep Rahasia</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-mocha-600 to-orange-600 text-white py-3 px-6 rounded-full shadow-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="font-bold flex items-center gap-2">🔥 Favorit Mahasiswa!</span>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
