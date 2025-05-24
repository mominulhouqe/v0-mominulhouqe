"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { getCategories } from "@/lib/products"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mounted, setMounted] = useState(false)
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  // Available colors and sizes
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#00FF00" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  useEffect(() => {
    setMounted(true)

    // Fetch categories
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)
    }

    fetchCategories()

    // Initialize filters from URL
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategories([category])
    }

    const color = searchParams.get("color")
    if (color) {
      setSelectedColors(color.split(","))
    }

    const size = searchParams.get("size")
    if (size) {
      setSelectedSizes(size.split(","))
    }

    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice && maxPrice) {
      setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)])
    }
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories[0])
    }

    if (selectedColors.length > 0) {
      params.set("color", selectedColors.join(","))
    }

    if (selectedSizes.length > 0) {
      params.set("size", selectedSizes.join(","))
    }

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    const sort = searchParams.get("sort")
    if (sort) {
      params.set("sort", sort)
    }

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 200])
    router.push("/products")
  }

  if (!mounted) {
    return <div>Loading filters...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "colors", "sizes"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([category.slug])
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category.slug))
                      }
                    }}
                  />
                  <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={200}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color.name}`}
                    checked={selectedColors.includes(color.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedColors([...selectedColors, color.value])
                      } else {
                        setSelectedColors(selectedColors.filter((c) => c !== color.value))
                      }
                    }}
                  />
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.value }}
                    />
                    <label htmlFor={`color-${color.name}`} className="text-sm cursor-pointer">
                      {color.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizes">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <div
                  key={size}
                  className={`flex items-center justify-center h-10 border rounded-md cursor-pointer ${
                    selectedSizes.includes(size)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-300 hover:border-primary"
                  }`}
                  onClick={() => {
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(selectedSizes.filter((s) => s !== size))
                    } else {
                      setSelectedSizes([...selectedSizes, size])
                    }
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  )
}
