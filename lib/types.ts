export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  imageUrl: string
  category: string
  rating: number
  isNew?: boolean
  discount?: number
  sizes?: string[]
  colors?: string[]
  stock?: number
  isActive?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  imageUrl: string
}
