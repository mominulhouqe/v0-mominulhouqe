import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    location: "Dhaka, Bangladesh",
    rating: 5,
    comment: "Amazing quality and unique designs! I always get compliments when wearing Strange Lifestyle pieces.",
    image: "/placeholder.svg?height=80&width=80&text=Sarah",
  },
  {
    id: 2,
    name: "Rafiq Hassan",
    location: "Chittagong, Bangladesh",
    rating: 5,
    comment: "Fast delivery and excellent customer service. The clothes fit perfectly and the quality is outstanding.",
    image: "/placeholder.svg?height=80&width=80&text=Rafiq",
  },
  {
    id: 3,
    name: "Fatima Khan",
    location: "Sylhet, Bangladesh",
    rating: 5,
    comment: "Love the unique style! Strange Lifestyle helps me express my personality through fashion.",
    image: "/placeholder.svg?height=80&width=80&text=Fatima",
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
