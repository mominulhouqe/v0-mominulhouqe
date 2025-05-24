import { getRelatedProducts } from "@/lib/products"
import ProductCard from "./product-card"
import Link from "next/link"

export default async function ProductRecommendations({
  currentProductId,
}: {
  currentProductId: string
}) {
  const products = await getRelatedProducts(currentProductId)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  )
}
