import { getProducts } from "@/lib/products"
import ProductCard from "./product-card"
import Link from "next/link"

export default async function ProductGrid({
  category,
  sort,
}: {
  category?: string
  sort?: string
}) {
  const products = await getProducts({ category, sort })

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-gray-500 mb-4">Try changing your filters or check back later.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  )
}
