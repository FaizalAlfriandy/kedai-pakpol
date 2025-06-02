"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendEmail } from "@/lib/actions"
import { toast } from "@/components/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendEmail(formData)
      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.",
        variant: "default",
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Gagal mengirim pesan",
        description: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
        variant: "destructive",
      })
      console.error("Error sending email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Pesan
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tulis pesan Anda di sini"
            rows={5}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-mocha-600 hover:bg-mocha-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
        </Button>
      </form>
      <Toaster />
    </>
  )
}
