import Image from "next/image"

const brands = [
  { name: "Brand 1", logo: "/placeholder.svg?height=60&width=120&text=Brand+1" },
  { name: "Brand 2", logo: "/placeholder.svg?height=60&width=120&text=Brand+2" },
  { name: "Brand 3", logo: "/placeholder.svg?height=60&width=120&text=Brand+3" },
  { name: "Brand 4", logo: "/placeholder.svg?height=60&width=120&text=Brand+4" },
  { name: "Brand 5", logo: "/placeholder.svg?height=60&width=120&text=Brand+5" },
  { name: "Brand 6", logo: "/placeholder.svg?height=60&width=120&text=Brand+6" },
]

export default function BrandShowcase() {
  return (
    <section className="py-16 bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Trusted Partners</h2>
          <p className="text-gray-600">We work with the best brands to bring you quality products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
