import { database } from '../database/connection.js'
import type { FurnitureCategory, FurnitureItem } from '../types/entities.js'
import { mapCategory, mapFurniture } from '../utils/rowMappers.js'

export interface CreateFurnitureData {
  categoryId: number
  url: string
  title: string
  imageUrl: string | null
  price: number | null
  source: string
}

interface FindFurnitureOptions {
  categoryId?: number
  sort: 'price-asc' | 'price-desc' | 'newest'
}

class FurnitureRepository {
  findCategories(): FurnitureCategory[] {
    const rows = database.prepare(`
      SELECT c.*, COUNT(i.id) AS item_count
      FROM furniture_categories c
      LEFT JOIN furniture_items i ON i.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name COLLATE NOCASE
    `).all()
    return rows.map((row) => mapCategory(row as Record<string, unknown>))
  }

  findCategoryById(id: number): FurnitureCategory | null {
    const row = database.prepare('SELECT * FROM furniture_categories WHERE id = ?').get(id)
    return row ? mapCategory(row as Record<string, unknown>) : null
  }

  createCategory(name: string, color: string): FurnitureCategory {
    const result = database.prepare(
      'INSERT INTO furniture_categories (name, color) VALUES (?, ?)',
    ).run(name, color)
    return this.findCategoryById(Number(result.lastInsertRowid))!
  }

  findItems(options: FindFurnitureOptions): FurnitureItem[] {
    const where = options.categoryId ? 'WHERE i.category_id = @categoryId' : ''
    const orderBy = {
      'price-asc': 'i.price IS NULL, i.price ASC, i.id DESC',
      'price-desc': 'i.price IS NULL, i.price DESC, i.id DESC',
      newest: 'i.created_at DESC, i.id DESC',
    }[options.sort]

    const rows = database.prepare(`
      SELECT i.*, c.name AS category_name, c.color AS category_color
      FROM furniture_items i
      JOIN furniture_categories c ON c.id = i.category_id
      ${where}
      ORDER BY ${orderBy}
    `).all({ categoryId: options.categoryId })

    return rows.map((row) => mapFurniture(row as Record<string, unknown>))
  }

  findItemById(id: number): FurnitureItem | null {
    const row = database.prepare(`
      SELECT i.*, c.name AS category_name, c.color AS category_color
      FROM furniture_items i
      JOIN furniture_categories c ON c.id = i.category_id
      WHERE i.id = ?
    `).get(id)
    return row ? mapFurniture(row as Record<string, unknown>) : null
  }

  findItemByUrl(url: string): FurnitureItem | null {
    const row = database.prepare(`
      SELECT i.*, c.name AS category_name, c.color AS category_color
      FROM furniture_items i
      JOIN furniture_categories c ON c.id = i.category_id
      WHERE i.url = ?
    `).get(url)
    return row ? mapFurniture(row as Record<string, unknown>) : null
  }

  createItem(data: CreateFurnitureData): FurnitureItem {
    const result = database.prepare(`
      INSERT INTO furniture_items (category_id, url, title, image_url, price, source)
      VALUES (@categoryId, @url, @title, @imageUrl, @price, @source)
    `).run(data)
    return this.findItemById(Number(result.lastInsertRowid))!
  }

  deleteItem(id: number): boolean {
    return database.prepare('DELETE FROM furniture_items WHERE id = ?').run(id).changes > 0
  }
}

export const furnitureRepository = new FurnitureRepository()

