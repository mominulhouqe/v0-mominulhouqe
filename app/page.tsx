import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Star,
  TruckIcon,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  ShoppingBag,
  Clock,
  Heart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import FeaturedProducts from "@/components/featured-products"
import CategorySection from "@/components/category-section"
import NewsletterSection from "@/components/newsletter-section"
import LoadingProducts from "@/components/loading-products"
import HeroCarousel from "@/components/hero-carousel"
import TestimonialSection from "@/components/testimonial-section"
import BrandShowcase from "@/components/brand-showcase"
import TrendingProducts from "@/components/trending-products"
import InstagramFeed from "@/components/instagram-feed"

export const metadata = {
  title: "Strange Lifestyle | Unique Fashion & Clothing Store",
  description: "Discover unique clothing that expresses your individuality. Quality fashion for every occasion.",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative">
        <HeroCarousel />
      </section>

      {/* Features Bar */}
      <section className="bg-white py-6 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <TruckIcon className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-gray-500">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <RotateCcw className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Easy Returns</h3>
                <p className="text-sm text-gray-500">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Star className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Top Rated</h3>
                <p className="text-sm text-gray-500">Trusted by customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of unique clothing across different categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Men", "Women", "Accessories", "Footwear", "Activewear", "Sale"].map((category, index) => (
              <Link href={`/products?category=${category.toLowerCase()}`} key={index} className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-md">
                  <div className="relative h-40 w-full">
                    <Image
                      src={`/placeholder.svg?height=160&width=160&text=${category}`}
                      alt={category}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{category}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Badge variant="outline" className="mb-2">
                New Season
              </Badge>
              <h2 className="text-3xl font-bold">New Arrivals</h2>
            </div>
            <Link href="/products" className="text-primary flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <Suspense fallback={<LoadingProducts />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <Badge variant="outline" className="mb-2 border-white text-white">
                Limited Time Offer
              </Badge>
              <h2 className="text-4xl font-bold mb-4">Strange Collection 2024</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Discover our latest collection with unique designs and premium quality fabrics. Express your
                individuality with Strange Lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="default" className="bg-white text-gray-900 hover:bg-gray-200">
                  <Link href="/products?category=new">
                    Shop Collection <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Link href="/products">Browse All</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[400px]">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Strange+Collection"
                alt="Strange Collection"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                Up to 50% Off
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-2">
              Most Popular
            </Badge>
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover what's popular right now - our most loved styles</p>
          </div>
          <Suspense fallback={<LoadingProducts />}>
            <TrendingProducts />
          </Suspense>
        </div>
      </section>

      {/* Three Column Feature */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Unique Style</h3>
              <p className="text-gray-600">
                Express your individuality with our carefully curated collection of unique clothing and accessories.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your orders delivered quickly with our reliable shipping partners across Bangladesh.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Love</h3>
              <p className="text-gray-600">
                We're committed to providing the best shopping experience and quality products for our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-2">
              @strangelifestyle
            </Badge>
            <h2 className="text-3xl font-bold mb-2">Follow Us on Instagram</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get inspired by our latest styles and share your looks with us
            </p>
          </div>
          <InstagramFeed />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">
              Shop by Category
            </Badge>
            <h2 className="text-3xl font-bold">Find Your Style</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Browse our curated collections to find the perfect addition to your wardrobe
            </p>
          </div>
          <CategorySection />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
}
