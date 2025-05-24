import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

// Mock trending products data
const trendingProducts = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    imageUrl: "/placeholder.svg?height=400&width=400&text=T-Shirt",
    category: "men",
    rating: 4.5,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 49.99,
    originalPrice: null,
    imageUrl: "/placeholder.svg?height=400&width=400&text=Jeans",
    category: "men",
    rating: 4.2,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 39.99,
    originalPrice: 59.99,
    imageUrl: "/placeholder.svg?height=400&width=400&text=Dress",
    category: "women",
    rating: 4.8,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Leather Jacket",
    price: 129.99,
    originalPrice: null,
    imageUrl: "/placeholder.svg?height=400&width=400&text=Jacket",
    category: "women",
    rating: 4.6,
    isNew: true,
    isBestSeller: false,
  },
]

export default function TrendingProducts() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <div className="relative">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              {product.isNew && <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">New</Badge>}
              {product.isBestSeller && (
                <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">Best Seller</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500 mb-1 capitalize">{product.category}</div>
              <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
              <div className="flex items-center">
                <span className="font-bold">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${star <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
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
                <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/products/${product.id}`}>View Details</Link>
              </Button>
              <Button size="icon" className="flex-shrink-0">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button asChild variant="outline">
          <Link href="/products">
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
