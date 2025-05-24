"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, User, Search, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "./cart-provider"
import { useAuth } from "./auth-provider"
import { cn } from "@/lib/utils"
import CartDrawer from "./cart-drawer"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const { cart } = useCart()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const cartItemCount = mounted ? cart.reduce((count, item) => count + item.quantity, 0) : 0

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-200",
          isScrolled ? "bg-white shadow-sm" : "bg-white/80 backdrop-blur-md",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="relative h-10 w-10 mr-2">
                  <Image src="/logo-placeholder.png" alt="Strange Lifestyle" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold text-primary">Strange Lifestyle</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-gray-600",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search, Cart, Account */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Search..." className="pl-8 w-[200px] h-9" />
              </div>

              {user ? (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/account">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/login">
                    <LogIn className="h-5 w-5" />
                  </Link>
                </Button>
              )}

              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Search..." className="pl-8 w-full" />
              </div>

              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-gray-600",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <Link
                    href="/account"
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
