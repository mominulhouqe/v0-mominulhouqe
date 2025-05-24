"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/types"

export default function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock additional images for the gallery
  const images = [
    product.imageUrl || "/placeholder.svg",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${product.name} ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
