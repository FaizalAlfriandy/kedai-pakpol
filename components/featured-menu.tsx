"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { motion } from "framer-motion"
import Link from "next/link"

// Featured menu items
const featuredItems = [
  {
    id: 1,
    name: "Nasi Goreng",
    description: "Nasi Goreng yang enak dan mengenyangkan",
    price: 10000,
    image: "/Nasgor.jpg",
    popular: true,
  },
  {
    id: 2,
    name: "Mie Ayam",
    description: "Mie dengan potongan ayam, sayuran, dan bumbu khas",
    price: 10000,
    image: "/Mie Ayam.jpg",
    popular: true,
  },
  {
    id: 4,
    name: "Es Rencengan",
    description: "Minuman segar dengan campuran buah dan sirup",
    price: 1000,
    image: "/rencengan.jpg",
    popular: true,
  },
]

export default function FeaturedMenu() {
  const { addItem } = useCart()
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({})

  const handleAddItem = (item: any) => {
    addItem(item)
    setAddedItems((prev) => ({ ...prev, [item.id]: true }))

    // Reset animation after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }))
    }, 2000)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Menu Favorit</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nikmati menu favorit kami yang paling banyak disukai oleh pelanggan. Semua menu dibuat dengan bahan
            berkualitas dan resep rahasia.
          </p>
          <div className="w-20 h-1 bg-mocha-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {featuredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 relative"
            >
              {item.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-mocha-600 text-white text-xs font-bold px-3 py-1 rounded-full">Populer</span>
                </div>
              )}
              <div className="relative h-48 w-full overflow-hidden group">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1 h-10 opacity-60">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-mocha-600 font-bold">Rp {item.price.toLocaleString()}</span>
                  <Button
                    size="sm"
                    className={`relative overflow-hidden ${
                      addedItems[item.id] ? "bg-green-600 hover:bg-green-700" : "bg-mocha-600 hover:bg-mocha-700"
                    } text-white`}
                    onClick={() => handleAddItem(item)}
                  >
                    {addedItems[item.id] ? "✓ Ditambahkan" : "Tambah"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/menu">
            <Button className="bg-mocha-600 hover:bg-mocha-700 text-white">Lihat Semua Menu</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
