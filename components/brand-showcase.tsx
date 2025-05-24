export default function BrandShowcase() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-gray-600">Trusted by Top Brands</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {[1, 2, 3, 4, 5].map((brand) => (
            <div key={brand} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img
                src={`/placeholder.svg?height=60&width=120&text=BRAND${brand}`}
                alt={`Brand ${brand}`}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
