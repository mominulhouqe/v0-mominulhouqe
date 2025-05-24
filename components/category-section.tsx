import Link from "next/link"
import Image from "next/image"
import { getCategories } from "@/lib/products"

export default async function CategorySection() {
  const categories = await getCategories()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.slug}`}
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="relative h-64 w-full">
            <Image
              src={category.imageUrl || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <span className="inline-block bg-white text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Shop Now
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
