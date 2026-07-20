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

export type AmortizationSystem = 'price' | 'sac'

export interface FinancingSimulation {
  id: number
  name: string
  propertyValue: number
  downPayment: number
  financedAmount: number
  annualRate: number
  termMonths: number
  system: AmortizationSystem
  lender: string
  firstInstallment: number
  lastInstallment: number
  totalPaid: number
  totalInterest: number
  createdAt: string
}

export interface FinancingSimulationInput {
  name: string
  propertyValue: number
  downPayment: number
  financedAmount: number
  annualRate: number
  termMonths: number
  system: AmortizationSystem
  lender: string
  firstInstallment: number
  lastInstallment: number
  totalPaid: number
  totalInterest: number
}

export interface AgendamentoNote {
  id: number
  content: string
  createdAt: string
}

export interface AgendamentoPhoto {
  id: number
  url: string
  createdAt: string
}

export interface AgendamentoProperty {
  id: number
  title: string
  imageUrl: string | null
  price: number | null
  source: string
  location: string | null
  url: string
}

export interface Agendamento {
  id: number
  propertyId: number
  property: AgendamentoProperty
  advanced: boolean | null
  active: boolean
  notes: AgendamentoNote[]
  photos: AgendamentoPhoto[]
  createdAt: string
  updatedAt: string
}
