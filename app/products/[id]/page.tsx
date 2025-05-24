import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import ProductGallery from "@/components/product-gallery"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductRecommendations from "@/components/product-recommendations"
import ProductReviews from "@/components/product-reviews"
import ProductTabs from "@/components/product-tabs"
import { Truck, ShieldCheck, RotateCcw, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found | Stylish Threads",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} | Stylish Threads`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const isInStock = (product.stock || 0) > 0
  const isLowStock = isInStock && (product.stock || 0) < 10

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Gallery */}
        <ProductGallery product={product} />

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Breadcrumbs and badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.isNew && (
              <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                New Arrival
              </Badge>
            )}
            {product.discount && product.discount > 0 && (
              <Badge variant="default" className="bg-red-500 hover:bg-red-600">
                {product.discount}% OFF
              </Badge>
            )}
            {isLowStock && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Low Stock
              </Badge>
            )}
            {!isInStock && (
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                Out of Stock
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${star <= product.rating ? "text-yellow-400" : "text-gray-300"}`}
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
            <span className="ml-2 text-gray-600">{product.rating} out of 5</span>
            <a href="#reviews" className="ml-4 text-primary hover:underline">
              See all reviews
            </a>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-2 text-lg text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
              {product.discount && product.discount > 0 && (
                <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  Save {formatCurrency(product.originalPrice! - product.price)}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">Tax included. Shipping calculated at checkout.</p>
          </div>

          {/* Short Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Availability */}
          <div className="mb-6">
            <p className="flex items-center">
              <span className="font-medium mr-2">Availability:</span>
              {isInStock ? (
                <span className="text-green-600 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {isLowStock ? `Only ${product.stock} left in stock` : "In Stock"}
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Add to Cart */}
          <AddToCartButton product={product} />

          {/* Shipping & Returns */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Free Shipping</h3>
                <p className="text-xs text-gray-500">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Secure Payment</h3>
                <p className="text-xs text-gray-500">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-start">
              <RotateCcw className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Easy Returns</h3>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Fast Delivery</h3>
                <p className="text-xs text-gray-500">2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <ProductTabs product={product} />

      {/* Reviews */}
      <div id="reviews" className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <ProductReviews productId={product.id} />
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <ProductRecommendations currentProductId={product.id} />
      </div>
    </div>
  )
}
