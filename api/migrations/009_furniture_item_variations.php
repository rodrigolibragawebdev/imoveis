<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $database->exec(<<<'SQL'
        CREATE TABLE IF NOT EXISTS furniture_item_variations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          item_id INTEGER NOT NULL,
          url TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          image_url TEXT,
          price REAL,
          source TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (item_id) REFERENCES furniture_items(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_furniture_variation_item ON furniture_item_variations(item_id);
        CREATE INDEX IF NOT EXISTS idx_furniture_variation_price ON furniture_item_variations(price);
        SQL);
};
