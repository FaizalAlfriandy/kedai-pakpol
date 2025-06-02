"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    alert("Pesan telah dikirim! Kami akan segera menghubungi Anda.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan atau ingin memesan untuk acara? Hubungi kami atau kirim pesan melalui form di bawah ini.
          </p>
          <div className="w-20 h-1 bg-mocha-600 mx-auto mt-4"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Kirim Pesan</h3>
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
                <Button type="submit" className="w-full bg-mocha-600 hover:bg-mocha-700">
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Informasi Kontak</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-mocha-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-mocha-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Lokasi</h4>
                    <p className="text-gray-600 mt-1">Jl. Sungai Sahang No.3654 30151 Palembang Sumatera Selatan, Depan Kampus Polsri Manajemen Informatika</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-mocha-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-mocha-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Telepon</h4>
                    <p className="text-gray-600 mt-1">+62 822-1144-5084</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-mocha-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-mocha-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600 mt-1">info@kedaipakpol.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-mocha-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-mocha-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Jam Buka</h4>
                    <p className="text-gray-600 mt-1">Senin - Sabtu: 08.00 - 16.00</p>
                    <p className="text-gray-600">Minggu: Tutup</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-4">Ikuti Kami</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-mocha-100 p-2 rounded-full hover:bg-mocha-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-mocha-600"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-mocha-100 p-2 rounded-full hover:bg-mocha-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-mocha-600"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="bg-mocha-100 p-2 rounded-full hover:bg-mocha-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-mocha-600"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-mocha-100 p-2 rounded-full hover:bg-mocha-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-mocha-600"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                      <path d="m10 15 5-3-5-3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
