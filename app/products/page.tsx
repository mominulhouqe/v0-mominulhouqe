import { Suspense } from "react"
import ProductFilters from "@/components/product-filters"
import ProductGrid from "@/components/product-grid"
import LoadingProducts from "@/components/loading-products"

export const metadata = {
  title: "Products | Stylish Threads",
  description: "Browse our collection of stylish clothes for all occasions.",
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : undefined

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters />
        </div>

        <div className="w-full md:w-3/4">
          <Suspense fallback={<LoadingProducts />}>
            <ProductGrid category={category} sort={sort} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
