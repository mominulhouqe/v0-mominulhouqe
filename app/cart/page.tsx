"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { formatCurrency } from "@/lib/utils"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">Loading...</div>
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-6">
                <span className="font-semibold">Product</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-semibold">Price</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-semibold">Quantity</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="font-semibold">Total</span>
              </div>
            </div>

            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center"
              >
                <div className="md:col-span-6 flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    {item.selectedSize && <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>}
                    {item.selectedColor && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-500">Color:</span>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.selectedColor }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 md:text-center">
                  <span className="md:hidden font-medium mr-2">Price:</span>
                  {formatCurrency(item.price)}
                </div>

                <div className="md:col-span-2 md:text-center">
                  <span className="md:hidden font-medium mr-2">Quantity:</span>
                  <div className="flex items-center">
                    <button
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
                      onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
                      {item.quantity}
                    </div>
                    <button
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 md:text-right flex justify-between md:block">
                  <div>
                    <span className="md:hidden font-medium mr-2">Total:</span>
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                  <button className="text-red-500 hover:text-red-700" onClick={() => removeFromCart(item)}>
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="p-4 flex justify-between">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </div>

            <Button asChild className="w-full">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
