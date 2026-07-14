export type PropertyRating = 'liked' | 'disliked' | 'terrible' | null

export interface Property {
  id: number
  url: string
  title: string
  imageUrl: string | null
  price: number | null
  source: string
  location: string | null
  rating: PropertyRating
  note: string
  createdAt: string
  updatedAt: string
}

export interface FurnitureCategory {
  id: number
  name: string
  color: string
  createdAt: string
}

export interface FurnitureItem {
  id: number
  categoryId: number
  categoryName: string
  categoryColor: string
  url: string
  title: string
  imageUrl: string | null
  price: number | null
  source: string
  isSeeded: boolean
  createdAt: string
}

export interface Tip {
  id: number
  title: string
  content: string
  sortOrder: number
}

