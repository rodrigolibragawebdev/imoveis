<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $columns = $database->query('PRAGMA table_info(furniture_items)')->fetchAll();
    $columnNames = array_column($columns, 'name');

    if (!in_array('is_purchased', $columnNames, true)) {
        $database->exec(
            'ALTER TABLE furniture_items ADD COLUMN is_purchased INTEGER NOT NULL DEFAULT 0 CHECK (is_purchased IN (0, 1))',
        );
    }

    $database->exec('CREATE INDEX IF NOT EXISTS idx_furniture_purchased ON furniture_items(is_purchased)');
};
