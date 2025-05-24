"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Express Your Strange",
    subtitle: "New Collection 2024",
    description: "Discover unique clothing that tells your story. Be different, be strange, be you.",
    image: "/placeholder.svg?height=600&width=1200&text=Strange+Collection",
    cta: "Shop Now",
    link: "/products",
    bgColor: "from-purple-900 to-indigo-900",
  },
  {
    id: 2,
    title: "Limited Edition",
    subtitle: "Exclusive Designs",
    description: "Get your hands on our limited edition pieces before they're gone forever.",
    image: "/placeholder.svg?height=600&width=1200&text=Limited+Edition",
    cta: "Explore",
    link: "/products?category=limited",
    bgColor: "from-gray-900 to-black",
  },
  {
    id: 3,
    title: "Summer Vibes",
    subtitle: "Fresh & Comfortable",
    description: "Stay cool and stylish with our summer collection. Perfect for any occasion.",
    image: "/placeholder.svg?height=600&width=1200&text=Summer+Collection",
    cta: "Shop Summer",
    link: "/products?category=summer",
    bgColor: "from-blue-900 to-teal-900",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`relative h-full bg-gradient-to-r ${slide.bgColor}`}>
            <div className="absolute inset-0">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover opacity-30"
                priority={index === 0}
              />
            </div>
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <p className="text-lg md:text-xl mb-2 opacity-90">{slide.subtitle}</p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">{slide.description}</p>
                  <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-200">
                    <Link href={slide.link}>{slide.cta}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
