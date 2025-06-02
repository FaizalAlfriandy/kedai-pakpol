"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { motion, AnimatePresence } from "framer-motion"

// Menu data
const menuCategories = [
  { id: "makanan-berat", name: "Makanan Berat" },
  { id: "snack", name: "Snack" },
  { id: "minuman", name: "Minuman" },
]

const menuItems = [
  {
    id: 1,
    name: "Nasi Goreng",
    description: "Nasi Goreng yang enak dan mengenyangkan",
    price: 10000,
    image: "/Nasgor.jpg",
    category: "makanan-berat",
    popular: true,
  },
  {
    id: 2,
    name: "Mie Ayam",
    description: "Mie dengan potongan ayam, sayuran, dan bumbu khas",
    price: 10000,
    image: "/Mie Ayam.jpg",
    category: "makanan-berat",
    popular: true,
  },
  {
    id: 3,
    name: "Bakso Goreng",
    description: "Bakso yang digoreng dengan tepung renyah",
    price: 1000,
    image: "/Basreng.jpg",
    category: "snack",
    popular: false,
  },
  {
    id: 4,
    name: "Es Rencengan",
    description: "Minuman segar dengan campuran buah dan sirup",
    price: 2000,
    image: "/rencengan.jpg",
    category: "minuman",
    popular: true,
  }
]

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("makanan-berat")
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="pt-20">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Menu Kami</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nikmati berbagai pilihan menu lezat dan terjangkau dari Kedai Pakpol. Semua menu dibuat dengan bahan
              berkualitas dan resep rahasia.
            </p>
            <div className="w-20 h-1 bg-mocha-600 mx-auto mt-4"></div>
          </div>

          <Tabs defaultValue="makanan-berat" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-mocha-100 p-1 rounded-full">
                {menuCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-mocha-600 data-[state=active]:text-white rounded-full px-6 py-2 transition-all duration-300"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {menuCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={category.id}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {menuItems
                      .filter((item) => item.category === category.id)
                      .map((item) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          whileHover={{
                            y: -10,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          }}
                          className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 relative"
                        >
                          {item.popular && (
                            <div className="absolute top-4 right-4 z-10">
                              <span className="bg-mocha-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                Populer
                              </span>
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
                                  addedItems[item.id]
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-mocha-600 hover:bg-mocha-700"
                                }`}
                                onClick={() => handleAddItem(item)}
                              >
                                <AnimatePresence mode="wait">
                                  {addedItems[item.id] ? (
                                    <motion.span
                                      key="added"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -20 }}
                                      className="flex items-center"
                                    >
                                      ✓ Ditambahkan
                                    </motion.span>
                                  ) : (
                                    <motion.span
                                      key="add"
                                      initial={{ opacity: 0, y: -20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 20 }}
                                    >
                                      Tambah
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </Button>
                            </div>
                          </div>

                          {/* Animated border on hover */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-mocha-600"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  )
}
