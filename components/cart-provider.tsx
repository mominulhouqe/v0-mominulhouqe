"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (product: CartItem) => void
  updateQuantity: (product: CartItem, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart with the same size and color
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor,
      )

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += product.quantity

        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${updatedCart[existingItemIndex].quantity}`,
        })

        return updatedCart
      } else {
        // Add new item to cart
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        })

        return [...prevCart, product]
      }
    })
  }

  const removeFromCart = (product: CartItem) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) =>
          !(
            item.id === product.id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor === product.selectedColor
          ),
      )

      toast({
        title: "Removed from cart",
        description: `${product.name} has been removed from your cart`,
      })

      return updatedCart
    })
  }

  const updateQuantity = (product: CartItem, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
        ) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const clearCart = () => {
    setCart([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
