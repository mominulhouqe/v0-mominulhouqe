import Image from "next/image"
import type { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">NEW</div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.originalPrice && product.originalPrice > product.price ? (
              <>
                <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
              </>
            ) : (
              <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
            )}
          </div>

          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-4 w-4 ${star <= product.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-6.327 3.323 1.209-7.04-5.117-4.981 7.063-1.026L10 0l3.172 6.468 7.063 1.026-5.117 4.981 1.209 7.04z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
