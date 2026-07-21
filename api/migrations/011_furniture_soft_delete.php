<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $columns = $database->query('PRAGMA table_info(furniture_items)')->fetchAll();
    $columnNames = array_column($columns, 'name');

    if (!in_array('deleted_at', $columnNames, true)) {
        $database->exec('ALTER TABLE furniture_items ADD COLUMN deleted_at TEXT');
    }

    $database->exec('CREATE INDEX IF NOT EXISTS idx_furniture_deleted_at ON furniture_items(deleted_at)');
};
