"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatRupiah } from "@/lib/utils"
import html2canvas from "html2canvas"

interface ReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
  subtotal: number
  orderNumber: string
}

export default function ReceiptModal({ isOpen, onClose, items, subtotal, orderNumber }: ReceiptModalProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)

  const handleCapture = async () => {
    if (!receiptRef.current) return

    setIsCapturing(true)
    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      })

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = `nota-kedai-pakpol-${orderNumber}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }
      })
    } catch (error) {
      console.error("Error capturing receipt:", error)
    } finally {
      setIsCapturing(false)
    }
  }

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Nota Pembelian</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCapture}
                  disabled={isCapturing}
                  className="flex items-center gap-2"
                >
                  {isCapturing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Camera className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {isCapturing ? "Menyimpan..." : "Simpan"}
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Receipt Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div ref={receiptRef} className="bg-white p-6 space-y-4">
                {/* Header Nota */}
                <div className="text-center border-b-2 border-dashed border-mocha-300 pb-4">
                  <div className="bg-mocha-600 text-white p-3 rounded-xl mb-3 inline-block">
                    <h1 className="text-xl font-bold">KEDAI PAKPOL</h1>
                  </div>
                  <p className="text-sm text-gray-600">Jl. Kampus No. 123, Dekat Fakultas Teknik</p>
                  <p className="text-sm text-gray-600">Telp: +62 822-1144-5084</p>
                </div>

                {/* Info Pesanan */}
                <div className="space-y-2 border-b border-dashed border-mocha-300 pb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">No. Pesanan:</span>
                    <span className="text-sm font-mono font-bold">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tanggal:</span>
                    <span className="text-sm">{currentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Kasir:</span>
                    <span className="text-sm">Pak Pol</span>
                  </div>
                </div>

                {/* Detail Pesanan */}
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-800 border-b border-mocha-200 pb-1">DETAIL PESANAN</h3>
                  {items.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatRupiah(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-mocha-600">{formatRupiah(item.price * item.quantity)}</p>
                      </div>
                      {index < items.length - 1 && <div className="border-b border-dotted border-gray-300"></div>}
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t-2 border-dashed border-mocha-300 pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">TOTAL:</span>
                    <span className="text-xl font-bold text-mocha-600">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="text-center text-xs text-gray-500">*Harga sudah termasuk pajak</div>
                </div>

                {/* Footer */}
                <div className="text-center space-y-2 border-t border-dashed border-mocha-300 pt-4">
                  <div className="bg-mocha-50 p-3 rounded-lg">
                    <p className="text-sm font-bold text-mocha-700">Terima kasih atas pesanan Anda!</p>
                    <p className="text-xs text-gray-600">Silakan tunjukkan nota ini saat pengambilan</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>Follow us: @kedaipakpol</p>
                    <p>Buka: Senin-Sabtu 08:00-20:00</p>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="text-center">
                  <div className="inline-block p-2 border-2 border-mocha-300 rounded-lg">
                    <div className="w-16 h-16 bg-mocha-100 rounded flex items-center justify-center">
                      <img src="/qr dummy.jpg" alt="QR" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Scan QRIS juga bisa ya!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
