import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTrendingProducts } from "@/lib/products"
import ProductCard from "./product-card"

export default async function TrendingProducts() {
  const products = await getTrendingProducts()

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
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
