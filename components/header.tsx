"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import Cart from "@/components/cart"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { items } = useCart()
  const pathname = usePathname()

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const navItems = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/menu", label: "Menu" },
    { href: "/contact", label: "Kontak" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <svg className="flex items-center gap-4" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none">
              <rect width="120" height="120" rx="20" fill="#A0522D"/>
              <circle cx="60" cy="50" r="25" fill="#fff"/>
              <circle cx="60" cy="50" r="15" fill="#A0522D"/>
              <path d="M40 30 Q42 20 44 30 Q46 40 44 60 Q42 70 40 60 Q38 40 40 30 Z" fill="#fff"/>
              <path d="M80 30 h2 v10 h-2 z
                      M83 30 h2 v10 h-2 z
                      M86 30 h2 v10 h-2 z
                      M81 40 h6 v25 h-6 z" fill="#fff"/>
              <text x="60" y="105" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="14" font-weight="bold">
                Kedai Pakpol
              </text>
            </svg>
          <span className="text-xl font-bold text-mocha-600">Kedai Pakpol</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium ${isActive(item.href) ? "text-mocha-600" : "text-gray-700 hover:text-mocha-600"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-mocha-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="ml-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 block ${
                  isActive(item.href) ? "text-mocha-600 font-medium" : "text-gray-700 hover:text-mocha-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
