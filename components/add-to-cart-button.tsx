"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import type { Product } from "@/lib/types"

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined,
  )
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined,
  )

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      selectedSize,
      selectedColor,
    })
  }

  return (
    <div className="space-y-6">
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Select Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded-md ${
                  selectedSize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-300 hover:border-primary"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Select Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color ? "border-primary" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium mb-2">Quantity</h3>
        <div className="flex items-center">
          <button
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300">{quantity}</div>
          <button
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <Button className="w-full" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </div>
  )
}
