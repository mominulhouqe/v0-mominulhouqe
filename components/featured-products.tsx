import Link from "next/link"
import { getFeaturedProducts } from "@/lib/products"
import ProductCard from "./product-card"

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  )
}
