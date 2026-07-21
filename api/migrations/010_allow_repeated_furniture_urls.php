<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $database->exec(<<<'SQL'
        CREATE TABLE furniture_items_without_unique_url (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id INTEGER NOT NULL,
          url TEXT NOT NULL,
          title TEXT NOT NULL,
          image_url TEXT,
          price REAL,
          source TEXT NOT NULL,
          is_seeded INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT,
          is_purchased INTEGER NOT NULL DEFAULT 0 CHECK (is_purchased IN (0, 1)),
          FOREIGN KEY (category_id) REFERENCES furniture_categories(id) ON DELETE RESTRICT
        );

        CREATE TABLE furniture_variations_during_rebuild (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          item_id INTEGER NOT NULL,
          url TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          image_url TEXT,
          price REAL,
          source TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (item_id) REFERENCES furniture_items_without_unique_url(id) ON DELETE CASCADE
        );

        INSERT INTO furniture_items_without_unique_url
          (id, category_id, url, title, image_url, price, source, is_seeded, created_at, updated_at, is_purchased)
        SELECT id, category_id, url, title, image_url, price, source, is_seeded, created_at, updated_at, is_purchased
        FROM furniture_items;

        INSERT INTO furniture_variations_during_rebuild
          (id, item_id, url, title, image_url, price, source, created_at, updated_at)
        SELECT id, item_id, url, title, image_url, price, source, created_at, updated_at
        FROM furniture_item_variations;

        DROP TABLE furniture_item_variations;
        DROP TABLE furniture_items;
        ALTER TABLE furniture_items_without_unique_url RENAME TO furniture_items;
        ALTER TABLE furniture_variations_during_rebuild RENAME TO furniture_item_variations;

        CREATE INDEX idx_furniture_category ON furniture_items(category_id);
        CREATE INDEX idx_furniture_price ON furniture_items(price);
        CREATE INDEX idx_furniture_purchased ON furniture_items(is_purchased);
        CREATE INDEX idx_furniture_variation_item ON furniture_item_variations(item_id);
        CREATE INDEX idx_furniture_variation_price ON furniture_item_variations(price);
        SQL);
};
