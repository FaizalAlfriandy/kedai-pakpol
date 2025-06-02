"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

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

export default function Menu() {
  const [activeTab, setActiveTab] = useState("makanan-berat")
  const { addItem } = useCart()
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({})
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

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
    <section id="menu" className="py-16 relative" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-[5%] text-mocha-200 opacity-20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a8 8 0 0 0-8 8v12h16V10a8 8 0 0 0-8-8Z"></path>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-[5%] text-mocha-200 opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 17H2a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3Z"></path>
            <path d="M22 9H2"></path>
            <path d="M22 9a8 8 0 0 0-8-8H2"></path>
            <path d="M22 9a8 8 0 0 1-8 8H2"></path>
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Menu Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nikmati berbagai pilihan menu lezat dan terjangkau dari Kedai Pakpol. Semua menu dibuat dengan bahan
            berkualitas dan resep rahasia.
          </p>
          <motion.div
            className="w-20 h-1 bg-mocha-600 mx-auto mt-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <Tabs defaultValue="makanan-berat" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
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
          </motion.div>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <motion.div
                key={category.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
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
                            variant="default"
                            size="sm"
                            className={
                              addedItems[item.id]
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-mocha-600 hover:bg-mocha-700 text-white"
                            }
                            onClick={() => handleAddItem(item)}
                          >
                            {addedItems[item.id] ? "✓ Ditambahkan" : "Tambah"}
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
