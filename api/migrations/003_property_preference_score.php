<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $columns = $database->query('PRAGMA table_info(properties)')->fetchAll();
    $columnNames = array_column($columns, 'name');
    if (!in_array('preference_score', $columnNames, true)) {
        $database->exec(
            'ALTER TABLE properties ADD COLUMN preference_score INTEGER CHECK (preference_score BETWEEN 0 AND 10 OR preference_score IS NULL)',
        );
    }
};
