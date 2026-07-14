import { database } from '../database/connection.js';
import { mapCategory, mapFurniture } from '../utils/rowMappers.js';
class FurnitureRepository {
    findCategories() {
        const rows = database.prepare(`
      SELECT c.*, COUNT(i.id) AS item_count
      FROM furniture_categories c
      LEFT JOIN furniture_items i ON i.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name COLLATE NOCASE
    `).all();
        return rows.map((row) => mapCategory(row));
    }
    findCategoryById(id) {
        const row = database.prepare('SELECT * FROM furniture_categories WHERE id = ?').get(id);
        return row ? mapCategory(row) : null;
    }
    createCategory(name, color) {
        const result = database.prepare('INSERT INTO furniture_categories (name, color) VALUES (?, ?)').run(name, color);
        return this.findCategoryById(Number(result.lastInsertRowid));
    }
    findItems(options) {
        const where = options.categoryId ? 'WHERE i.category_id = @categoryId' : '';
        const orderBy = {
            'price-asc': 'i.price IS NULL, i.price ASC, i.id DESC',
            'price-desc': 'i.price IS NULL, i.price DESC, i.id DESC',
            newest: 'i.created_at DESC, i.id DESC',
        }[options.sort];
        const rows = database.prepare(`
      SELECT i.*, c.name AS category_name, c.color AS category_color
      FROM furniture_items i
      JOIN furniture_categories c ON c.id = i.category_id
      ${where}
      ORDER BY ${orderBy}
    `).all({ categoryId: options.categoryId });
        return rows.map((row) => mapFurniture(row));
    }
    findItemById(id) {
        const row = database.prepare(`
      SELECT i.*, c.name AS category_name, c.color AS category_color
      FROM furniture_items i
      JOIN furniture_categories c ON c.id = i.category_id
      WHERE i.id = ?
    `).get(id);
        return row ? mapFurniture(row) : null;
    }
    findItemByUrl(url) {
        const row = database.prepare(`
      SELECT i.*, c.name AS category_name, c.color AS category_color
      FROM furniture_items i
      JOIN furniture_categories c ON c.id = i.category_id
      WHERE i.url = ?
    `).get(url);
        return row ? mapFurniture(row) : null;
    }
    createItem(data) {
        const result = database.prepare(`
      INSERT INTO furniture_items (category_id, url, title, image_url, price, source)
      VALUES (@categoryId, @url, @title, @imageUrl, @price, @source)
    `).run(data);
        return this.findItemById(Number(result.lastInsertRowid));
    }
    deleteItem(id) {
        return database.prepare('DELETE FROM furniture_items WHERE id = ?').run(id).changes > 0;
    }
}
export const furnitureRepository = new FurnitureRepository();
