"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { formatCurrency } from "@/lib/utils"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart } = useCart()

  // Close the drawer when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Your Cart ({cart.reduce((count, item) => count + item.quantity, 0)} items)
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 text-center mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="px-6 py-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="mb-4">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && (
                            <span className="flex items-center">
                              Color:{" "}
                              <span
                                className="inline-block w-3 h-3 rounded-full ml-1"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="p-1 hover:bg-gray-100"
                              onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button
                              className="p-1 hover:bg-gray-100"
                              onClick={() => updateQuantity(item, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      </div>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeFromCart(item)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-4 border-t">
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Continue Shopping
                  </Button>
                  <Button asChild>
                    <Link href="/checkout" onClick={onClose}>
                      Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
