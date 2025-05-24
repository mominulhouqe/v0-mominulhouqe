"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { Product } from "@/lib/types"

// Mock additional images for the gallery
const getAdditionalImages = (product: Product) => {
  // In a real app, these would come from the product data
  return [
    product.imageUrl || "/placeholder.svg",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ]
}

export default function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = getAdditionalImages(product)

  const nextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="space-y-4">
      <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
              aria-label="Zoom image"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="relative h-[80vh] w-full">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </DialogContent>
        </Dialog>

        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
              selectedImage === index ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${product.name} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
