export type PropertyRating = 'liked' | 'disliked' | 'terrible' | null
export type PropertyRankingFilter = 'ranking' | 'liked' | 'unrated' | 'disliked' | 'terrible' | 'duplicates'

export interface DuplicateMatch {
  propertyId: number
  type: 'link' | 'proximity'
  confidence: 'high' | 'medium'
  reason: string
}

export interface Property {
  id: number
  url: string
  normalizedUrl: string | null
  title: string
  imageUrl: string | null
  price: number | null
  source: string
  location: string | null
  neighborhood: string | null
  rating: PropertyRating
  preferenceScore: number | null
  note: string
  rankScore: number
  rankPosition: number | null
  isPreferredNeighborhood: boolean
  matchedNeighborhood: string | null
  hasDuplicates: boolean
  duplicateMatches: DuplicateMatch[]
  createdAt: string
  updatedAt: string
}

export interface PreferredNeighborhood {
  id: number
  name: string
  createdAt: string
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
  updatedAt: string
}

export interface FurnitureItemInput {
  categoryId: number
  url: string
  title?: string
  imageUrl?: string
  price?: number
}

export interface Tip {
  id: number
  title: string
  content: string
  sortOrder: number
}
