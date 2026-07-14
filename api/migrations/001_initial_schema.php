<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $database->exec(<<<'SQL'
        CREATE TABLE IF NOT EXISTS properties (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          image_url TEXT,
          price REAL,
          source TEXT NOT NULL,
          location TEXT,
          rating TEXT CHECK (rating IN ('liked', 'disliked', 'terrible') OR rating IS NULL),
          note TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS furniture_categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE COLLATE NOCASE,
          color TEXT NOT NULL DEFAULT '#B65C3A',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS furniture_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id INTEGER NOT NULL,
          url TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          image_url TEXT,
          price REAL,
          source TEXT NOT NULL,
          is_seeded INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES furniture_categories(id) ON DELETE RESTRICT
        );

        CREATE TABLE IF NOT EXISTS tips (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0
        );

        CREATE INDEX IF NOT EXISTS idx_furniture_category ON furniture_items(category_id);
        CREATE INDEX IF NOT EXISTS idx_furniture_price ON furniture_items(price);
        SQL);
};
