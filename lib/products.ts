import type { Product, Category } from "./types"

// Mock product data
const products: Product[] = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    description: "A comfortable and versatile cotton t-shirt for everyday wear.",
    price: 24.99,
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.5,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray", "Navy"],
    stock: 45,
    isActive: true,
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with a comfortable stretch fabric.",
    price: 49.99,
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.2,
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    colors: ["Blue", "Black", "Gray"],
    stock: 28,
    isActive: true,
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    description: "A lightweight floral dress perfect for summer days.",
    price: 39.99,
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "women",
    rating: 4.8,
    isNew: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral Print", "Blue", "Pink"],
    stock: 15,
    isActive: true,
  },
  {
    id: "4",
    name: "Leather Jacket",
    description: "A classic leather jacket that never goes out of style.",
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.6,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Brown"],
    stock: 8,
    isActive: true,
  },
  {
    id: "5",
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes for all terrains.",
    price: 89.99,
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "footwear",
    rating: 4.4,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black/Red", "Blue/White", "Gray/Yellow"],
    stock: 32,
    isActive: true,
  },
  {
    id: "6",
    name: "Casual Backpack",
    description: "A durable backpack with multiple compartments for everyday use.",
    price: 34.99,
    originalPrice: 44.99,
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "accessories",
    rating: 4.3,
    colors: ["Black", "Navy", "Olive"],
    stock: 20,
    isActive: true,
  },
  {
    id: "7",
    name: "Summer Hat",
    description: "A stylish and protective hat for sunny days.",
    price: 19.99,
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "accessories",
    rating: 4.1,
    sizes: ["S/M", "L/XL"],
    colors: ["Beige", "White", "Black"],
    stock: 25,
    isActive: true,
  },
  {
    id: "8",
    name: "Formal Shirt",
    description: "A crisp formal shirt for professional settings.",
    price: 44.99,
    imageUrl: "/placeholder.svg?height=400&width=300",
    category: "men",
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Pink"],
    stock: 18,
    isActive: true,
  },
  // Add more products as needed
]

// Mock data for categories
const categories: Category[] = [
  {
    id: "1",
    name: "Men's Clothing",
    slug: "men",
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "2",
    name: "Women's Clothing",
    slug: "women",
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "3",
    name: "Accessories",
    slug: "accessories",
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "4",
    name: "Footwear",
    slug: "footwear",
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "5",
    name: "Sale",
    slug: "sale",
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
]

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all categories
export async function getCategories(): Promise<Category[]> {
  await delay(300) // Simulate API delay
  return categories
}

// Get all products
export async function getProducts({
  category,
  sort,
  minPrice,
  maxPrice,
  color,
  size,
}: {
  category?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
  color?: string
  size?: string
} = {}): Promise<Product[]> {
  await delay(500) // Simulate API delay

  let filteredProducts = products.filter((product) => product.isActive)

  // Filter by category
  if (category) {
    if (category === "sale") {
      filteredProducts = filteredProducts.filter((product) => product.originalPrice !== undefined)
    } else {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }
  }

  // Filter by price range
  if (minPrice !== undefined && maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)
  }

  // Filter by color
  if (color) {
    const colors = color.split(",")
    filteredProducts = filteredProducts.filter(
      (product) => product.colors && product.colors.some((c) => colors.includes(c)),
    )
  }

  // Filter by size
  if (size) {
    const sizes = size.split(",")
    filteredProducts = filteredProducts.filter(
      (product) => product.sizes && product.sizes.some((s) => sizes.includes(s)),
    )
  }

  // Sort products
  if (sort) {
    switch (sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filteredProducts.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
  }

  return filteredProducts
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(300) // Simulate API delay
  return products.find((product) => product.id === id && product.isActive)
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  await delay(500) // Simulate API delay
  return products.filter((product) => product.isNew && product.isActive).slice(0, 4)
}

// Get trending products
export async function getTrendingProducts(): Promise<Product[]> {
  await delay(500) // Simulate API delay
  return products
    .filter((product) => product.isActive)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
}

// Get related products
export async function getRelatedProducts(currentProductId: string): Promise<Product[]> {
  await delay(500) // Simulate API delay

  const currentProduct = products.find((product) => product.id === currentProductId)

  if (!currentProduct) {
    return products.slice(0, 4)
  }

  // Find products in the same category
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId && product.category === currentProduct.category)
    .slice(0, 4)

  // If not enough related products, add some random ones
  if (relatedProducts.length < 4) {
    const randomProducts = products
      .filter((product) => product.id !== currentProductId && !relatedProducts.includes(product))
      .slice(0, 4 - relatedProducts.length)

    return [...relatedProducts, ...randomProducts]
  }

  return relatedProducts
}

// Get low stock products
export async function getLowStockProducts(): Promise<Product[]> {
  await delay(500) // Simulate API delay
  return products.filter(
    (product) => product.stock !== undefined && product.stock <= 10 && product.stock > 0 && product.isActive,
  )
}

// Get out of stock products
export async function getOutOfStockProducts(): Promise<Product[]> {
  await delay(500) // Simulate API delay
  return products.filter((product) => product.stock !== undefined && product.stock === 0 && product.isActive)
}

// Update product stock
export async function updateProductStock(id: string, newStock: number): Promise<Product | undefined> {
  await delay(300) // Simulate API delay
  const productIndex = products.findIndex((product) => product.id === id)

  if (productIndex === -1) {
    return undefined
  }

  products[productIndex] = {
    ...products[productIndex],
    stock: newStock,
  }

  return products[productIndex]
}
