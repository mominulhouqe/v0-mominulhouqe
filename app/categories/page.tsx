import Image from "next/image"
import Link from "next/link"
import { getCategories } from "@/lib/products"

export const metadata = {
  title: "Categories | Strange Lifestyle",
  description: "Browse our clothing categories and find your perfect style at Strange Lifestyle.",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Shop by Category</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our wide range of unique clothing across different categories. Find your perfect style and express
          your individuality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-80 w-full">
              <Image
                src={category.imageUrl || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <span className="inline-block bg-white text-primary px-4 py-2 rounded-full text-sm font-medium group-hover:bg-primary group-hover:text-white transition-colors">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Categories */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Collections</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-96 rounded-lg overflow-hidden group">
            <Image
              src="/placeholder.svg?height=400&width=600&text=New+Arrivals"
              alt="New Arrivals"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
              <div className="p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">New Arrivals</h3>
                <p className="text-lg mb-6">Discover the latest additions to our collection</p>
                <Link
                  href="/products?category=new"
                  className="inline-block bg-white text-purple-900 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden group">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Sale+Items"
              alt="Sale Items"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-red-900/80 to-transparent flex items-center justify-end">
              <div className="p-8 text-white text-right">
                <h3 className="text-3xl font-bold mb-4">Sale Items</h3>
                <p className="text-lg mb-6">Up to 50% off on selected items</p>
                <Link
                  href="/products?category=sale"
                  className="inline-block bg-white text-red-900 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Shop Sale
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
