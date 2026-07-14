<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $propertyColumns = $database->query('PRAGMA table_info(properties)')->fetchAll();
    $propertyColumnNames = array_column($propertyColumns, 'name');
    if (!in_array('normalized_url', $propertyColumnNames, true)) {
        $database->exec('ALTER TABLE properties ADD COLUMN normalized_url TEXT');
    }

    $furnitureColumns = $database->query('PRAGMA table_info(furniture_items)')->fetchAll();
    $furnitureColumnNames = array_column($furnitureColumns, 'name');
    if (!in_array('updated_at', $furnitureColumnNames, true)) {
        $database->exec('ALTER TABLE furniture_items ADD COLUMN updated_at TEXT');
        $database->exec('UPDATE furniture_items SET updated_at = created_at WHERE updated_at IS NULL');
    }

    $database->exec(<<<'SQL'
        CREATE TABLE IF NOT EXISTS preferred_neighborhoods (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE COLLATE NOCASE,
          normalized_name TEXT NOT NULL UNIQUE,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_properties_normalized_url ON properties(normalized_url);
        CREATE INDEX IF NOT EXISTS idx_preferred_neighborhood_name ON preferred_neighborhoods(normalized_name);
        SQL);

    $rows = $database->query('SELECT id, url FROM properties')->fetchAll();
    $update = $database->prepare('UPDATE properties SET normalized_url = ? WHERE id = ?');
    foreach ($rows as $row) {
        $update->execute([normalizeLinkForComparison((string) $row['url']), (int) $row['id']]);
    }
};
