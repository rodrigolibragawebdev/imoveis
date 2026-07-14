import type { FurnitureCategory, FurnitureItem, Property, Tip } from '../types/entities.js'

type Row = Record<string, unknown>

export const mapProperty = (row: Row): Property => ({
  id: Number(row.id),
  url: String(row.url),
  title: String(row.title),
  imageUrl: row.image_url ? String(row.image_url) : null,
  price: row.price === null ? null : Number(row.price),
  source: String(row.source),
  location: row.location ? String(row.location) : null,
  rating: row.rating as Property['rating'],
  note: String(row.note),
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
})

export const mapCategory = (row: Row): FurnitureCategory => ({
  id: Number(row.id),
  name: String(row.name),
  color: String(row.color),
  createdAt: String(row.created_at),
})

export const mapFurniture = (row: Row): FurnitureItem => ({
  id: Number(row.id),
  categoryId: Number(row.category_id),
  categoryName: String(row.category_name),
  categoryColor: String(row.category_color),
  url: String(row.url),
  title: String(row.title),
  imageUrl: row.image_url ? String(row.image_url) : null,
  price: row.price === null ? null : Number(row.price),
  source: String(row.source),
  isSeeded: Boolean(row.is_seeded),
  createdAt: String(row.created_at),
})

export const mapTip = (row: Row): Tip => ({
  id: Number(row.id),
  title: String(row.title),
  content: String(row.content),
  sortOrder: Number(row.sort_order),
})

