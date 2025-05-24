"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=800&width=1600",
    title: "Summer Collection 2023",
    subtitle: "Discover the latest trends",
    description: "Explore our new summer collection with vibrant colors and comfortable fabrics.",
    cta: "Shop Now",
    link: "/products?category=summer",
    position: "left",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=800&width=1600",
    title: "Exclusive Discounts",
    subtitle: "Limited time offer",
    description: "Get up to 50% off on selected items. Don't miss out on these amazing deals!",
    cta: "View Offers",
    link: "/products?category=sale",
    position: "right",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=800&width=1600",
    title: "New Arrivals",
    subtitle: "Fresh styles just in",
    description: "Be the first to shop our newest arrivals and stay ahead of the fashion curve.",
    cta: "Explore Now",
    link: "/products?category=new",
    position: "center",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "left":
        return "items-start text-left left-[10%]"
      case "right":
        return "items-end text-right right-[10%]"
      default:
        return "items-center text-center left-1/2 -translate-x-1/2"
    }
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div
            className={`absolute z-20 top-1/2 -translate-y-1/2 max-w-md flex flex-col ${getPositionClasses(
              slide.position,
            )}`}
          >
            <span className="text-white/90 text-sm md:text-base uppercase tracking-wider mb-2">{slide.subtitle}</span>
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
            <p className="text-white/80 mb-6 max-w-sm">{slide.description}</p>
            <div>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={slide.link}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
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
