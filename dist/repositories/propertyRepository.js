import { database } from '../database/connection.js';
import { mapProperty } from '../utils/rowMappers.js';
class PropertyRepository {
    findAll() {
        const rows = database.prepare('SELECT * FROM properties ORDER BY created_at DESC, id DESC').all();
        return rows.map((row) => mapProperty(row));
    }
    findById(id) {
        const row = database.prepare('SELECT * FROM properties WHERE id = ?').get(id);
        return row ? mapProperty(row) : null;
    }
    findByUrl(url) {
        const row = database.prepare('SELECT * FROM properties WHERE url = ?').get(url);
        return row ? mapProperty(row) : null;
    }
    create(data) {
        const result = database.prepare(`
      INSERT INTO properties (url, title, image_url, price, source, location)
      VALUES (@url, @title, @imageUrl, @price, @source, @location)
    `).run(data);
        return this.findById(Number(result.lastInsertRowid));
    }
    updateReview(id, rating, note) {
        database.prepare(`
      UPDATE properties
      SET rating = ?, note = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(rating, note, id);
        return this.findById(id);
    }
    delete(id) {
        return database.prepare('DELETE FROM properties WHERE id = ?').run(id).changes > 0;
    }
}
export const propertyRepository = new PropertyRepository();
