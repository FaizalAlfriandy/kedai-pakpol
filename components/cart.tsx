"use client"

import { X, ShoppingBag, Check } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatRupiah } from "@/lib/utils"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReceiptModal from "@/components/receipt-modal"

interface CartProps {
  open: boolean
  onClose: () => void
}

export default function Cart({ open, onClose }: CartProps) {
  const { items, updateItemQuantity, removeItem, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const generateOrderNumber = () => {
    const date = new Date()
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "")
    const timeStr = date.getTime().toString().slice(-4)
    return `KP${dateStr}${timeStr}`
  }

  const handleCheckout = () => {
    if (items.length === 0) return

    const newOrderNumber = generateOrderNumber()
    setOrderNumber(newOrderNumber)
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      setCheckoutSuccess(true)

      setTimeout(() => {
        // Show receipt first
        setShowReceipt(true)
        setIsCheckingOut(false)
        setCheckoutSuccess(false)
      }, 1500)
    }, 1500)
  }

  const handleReceiptClose = () => {
    setShowReceipt(false)

    // Format the WhatsApp message
    const message = formatWhatsAppMessage(items, subtotal, orderNumber)

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/6282211445084?text=Halo,%20saya%20ingin%20memesan%20sesuatu.%20Ini%20Struk%20pemesanan%20saya.%20(Tambahkan%20nota).`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")

    // Clear the cart and close the sidebar
    clearCart()
    onClose()
  }

  const formatWhatsAppMessage = (items: any[], subtotal: number, orderNum: string) => {
    let message = `*Pesanan Kedai Pakpol*\n\n`
    message += `📋 No. Pesanan: ${orderNum}\n`
    message += `📅 Tanggal: ${new Date().toLocaleDateString("id-ID")}\n\n`

    // Add each item to the message
    items.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ${formatRupiah(item.price * item.quantity)}\n`
    })

    // Add the subtotal
    message += `\n💰 *Total: ${formatRupiah(subtotal)}*\n\n`

    // Add customer note
    message += "Mohon konfirmasi pesanan ini. Terima kasih! 🙏"

    return message
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Cart sidebar dengan desain unik */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-b from-white to-mocha-50 shadow-2xl flex flex-col z-10"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header dengan desain unik */}
              <div className="relative bg-gradient-to-r from-mocha-600 to-orange-600 text-white p-6 rounded-b-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Keranjang Belanja</h2>
                      <p className="text-sm opacity-80">{items.length} item dipilih</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-1 left-0 right-0 h-4 bg-gradient-to-r from-mocha-600 to-orange-600 rounded-b-3xl"></div>
                <div className="absolute -bottom-2 left-2 right-2 h-4 bg-gradient-to-r from-mocha-500 to-orange-500 rounded-b-3xl opacity-50"></div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <AnimatePresence mode="wait">
                  {checkoutSuccess ? (
                    <motion.div
                      className="flex flex-col items-center justify-center h-full text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Check className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h3>
                      <p className="text-gray-600">Membuat nota pembelian...</p>
                    </motion.div>
                  ) : items.length === 0 ? (
                    <motion.div
                      className="flex flex-col items-center justify-center h-full text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Keranjang Kosong</h3>
                      <p className="text-gray-500">Anda belum menambahkan menu apapun.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AnimatePresence initial={false}>
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            className="bg-white rounded-2xl p-4 shadow-lg border border-mocha-100"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{
                              opacity: 0,
                              x: -20,
                              height: 0,
                              marginTop: 0,
                              marginBottom: 0,
                              paddingTop: 0,
                              paddingBottom: 0,
                            }}
                            transition={{ duration: 0.3 }}
                            layout
                          >
                            <div className="flex gap-3">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                                  <motion.button
                                    className="text-red-500 hover:text-red-700 p-1"
                                    onClick={() => removeItem(item.id)}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <X className="h-4 w-4" />
                                  </motion.button>
                                </div>
                                <p className="text-sm text-gray-500 mb-3">{formatRupiah(item.price)} / item</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center bg-mocha-100 rounded-full">
                                    <motion.button
                                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-800"
                                      onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      -
                                    </motion.button>
                                    <span className="px-3 font-bold text-gray-900">{item.quantity}</span>
                                    <motion.button
                                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-800"
                                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      +
                                    </motion.button>
                                  </div>
                                  <motion.p
                                    className="font-bold text-mocha-600"
                                    key={item.price * item.quantity}
                                    initial={{ scale: 1.2, color: "#f97316" }}
                                    animate={{ scale: 1, color: "#9c7057" }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {formatRupiah(item.price * item.quantity)}
                                  </motion.p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer dengan desain unik */}
              <div className="bg-white border-t border-mocha-200 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total Belanja</span>
                  <motion.span
                    className="text-2xl font-bold text-mocha-600"
                    key={subtotal}
                    initial={{ scale: 1.2, color: "#f97316" }}
                    animate={{ scale: 1, color: "#9c7057" }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatRupiah(subtotal)}
                  </motion.span>
                </div>
                <p className="text-sm text-gray-500 text-center">Pengiriman dan pajak dihitung saat checkout</p>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full bg-gradient-to-r from-mocha-600 to-orange-600 hover:from-mocha-700 hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl"
                    disabled={items.length === 0 || isCheckingOut}
                    onClick={handleCheckout}
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Memproses...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">📱 Pesan via WhatsApp</span>
                    )}
                  </Button>
                </motion.div>

                <div className="text-center">
                  <motion.button
                    type="button"
                    className="text-sm font-medium text-mocha-600 hover:text-mocha-700"
                    onClick={onClose}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Lanjutkan Belanja
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={showReceipt}
        onClose={handleReceiptClose}
        items={items}
        subtotal={subtotal}
        orderNumber={orderNumber}
      />
    </>
  )
}
