import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Categories | Strange Lifestyle",
  description: "Browse our clothing categories and find your perfect style.",
}

const categories = [
  {
    id: "men",
    name: "Men's Collection",
    description: "Stylish and comfortable clothing for men of all ages.",
    image: "/placeholder.svg?height=600&width=600&text=Men's+Collection",
    featured: true,
  },
  {
    id: "women",
    name: "Women's Collection",
    description: "Elegant and trendy clothing for the modern woman.",
    image: "/placeholder.svg?height=600&width=600&text=Women's+Collection",
    featured: true,
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complete your look with our range of stylish accessories.",
    image: "/placeholder.svg?height=600&width=600&text=Accessories",
    featured: true,
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Step out in style with our comfortable and fashionable footwear.",
    image: "/placeholder.svg?height=600&width=600&text=Footwear",
    featured: false,
  },
  {
    id: "activewear",
    name: "Activewear",
    description: "Performance clothing designed for your active lifestyle.",
    image: "/placeholder.svg?height=600&width=600&text=Activewear",
    featured: false,
  },
  {
    id: "winter",
    name: "Winter Collection",
    description: "Stay warm and stylish with our winter collection.",
    image: "/placeholder.svg?height=600&width=600&text=Winter+Collection",
    featured: false,
  },
  {
    id: "summer",
    name: "Summer Collection",
    description: "Beat the heat with our cool and comfortable summer styles.",
    image: "/placeholder.svg?height=600&width=600&text=Summer+Collection",
    featured: false,
  },
  {
    id: "ethnic",
    name: "Ethnic Wear",
    description: "Traditional clothing with a modern twist.",
    image: "/placeholder.svg?height=600&width=600&text=Ethnic+Wear",
    featured: false,
  },
]

export default function CategoriesPage() {
  // Split categories into featured and regular
  const featuredCategories = categories.filter((category) => category.featured)
  const regularCategories = categories.filter((category) => !category.featured)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Shop by Category</h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Explore our wide range of clothing categories and find the perfect style that expresses your unique personality.
      </p>

      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {featuredCategories.map((category) => (
          <Link href={`/products?category=${category.id}`} key={category.id} className="group">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
                <p className="text-white/80 mb-4">{category.description}</p>
                <Button variant="outline" className="bg-white/20 border-white text-white w-fit">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Regular Categories */}
      <h2 className="text-2xl font-bold mb-6">More Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {regularCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden group">
            <div className="relative h-48">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{category.description}</p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/products?category=${category.id}`}>Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seasonal Collections Banner */}
      <div className="mt-16 bg-gray-900 text-white rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Seasonal Collections</h2>
            <p className="mb-6">
              Discover our latest seasonal collections, designed to keep you stylish throughout the year.
            </p>
            <Button asChild className="w-fit">
              <Link href="/products?category=seasonal">
                Explore Collections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative h-[300px] md:h-auto">
            <Image
              src="/placeholder.svg?height=600&width=600&text=Seasonal+Collections"
              alt="Seasonal Collections"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
