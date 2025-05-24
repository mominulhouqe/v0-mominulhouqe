"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "I've been shopping with Stylish Threads for years, and I'm always impressed by their quality and customer service. The clothes are stylish, comfortable, and last for ages!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The variety of options at Stylish Threads is amazing. I can always find something that fits my style, and the prices are reasonable for the quality you get.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Stylist",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "As a professional stylist, I recommend Stylish Threads to all my clients. Their collections are always on-trend, and the fabrics are of excellent quality.",
    rating: 4,
  },
]

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-10 left-0 text-primary opacity-20">
            <Quote className="h-24 w-24" />
          </div>

          <div className="relative z-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === currentTestimonial ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-6.327 3.323 1.209-7.04-5.117-4.981 7.063-1.026L10 0l3.172 6.468 7.063 1.026-5.117 4.981 1.209 7.04z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-xl italic text-gray-800 mb-4">"{testimonial.quote}"</blockquote>
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
