import { database } from '../database/connection.js'
import type { Property, PropertyRating } from '../types/entities.js'
import { mapProperty } from '../utils/rowMappers.js'

export interface CreatePropertyData {
  url: string
  title: string
  imageUrl: string | null
  price: number | null
  source: string
  location: string | null
}

class PropertyRepository {
  findAll(): Property[] {
    const rows = database.prepare('SELECT * FROM properties ORDER BY created_at DESC, id DESC').all()
    return rows.map((row) => mapProperty(row as Record<string, unknown>))
  }

  findById(id: number): Property | null {
    const row = database.prepare('SELECT * FROM properties WHERE id = ?').get(id)
    return row ? mapProperty(row as Record<string, unknown>) : null
  }

  findByUrl(url: string): Property | null {
    const row = database.prepare('SELECT * FROM properties WHERE url = ?').get(url)
    return row ? mapProperty(row as Record<string, unknown>) : null
  }

  create(data: CreatePropertyData): Property {
    const result = database.prepare(`
      INSERT INTO properties (url, title, image_url, price, source, location)
      VALUES (@url, @title, @imageUrl, @price, @source, @location)
    `).run(data)

    return this.findById(Number(result.lastInsertRowid))!
  }

  updateReview(id: number, rating: PropertyRating, note: string): Property | null {
    database.prepare(`
      UPDATE properties
      SET rating = ?, note = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(rating, note, id)
    return this.findById(id)
  }

  delete(id: number): boolean {
    return database.prepare('DELETE FROM properties WHERE id = ?').run(id).changes > 0
  }
}

export const propertyRepository = new PropertyRepository()

