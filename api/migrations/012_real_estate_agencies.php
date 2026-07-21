<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $database->exec(<<<'SQL'
        CREATE TABLE IF NOT EXISTS real_estate_agencies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE COLLATE NOCASE,
          keyword TEXT NOT NULL,
          normalized_keyword TEXT NOT NULL UNIQUE,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        SQL);

    $propertyColumns = $database->query('PRAGMA table_info(properties)')->fetchAll();
    $propertyColumnNames = array_column($propertyColumns, 'name');
    if (!in_array('agency_id', $propertyColumnNames, true)) {
        $database->exec(
            'ALTER TABLE properties ADD COLUMN agency_id INTEGER REFERENCES real_estate_agencies(id) ON DELETE SET NULL',
        );
    }
    if (!in_array('agency_match_mode', $propertyColumnNames, true)) {
        $database->exec(
            "ALTER TABLE properties ADD COLUMN agency_match_mode TEXT NOT NULL DEFAULT 'automatic' "
            . "CHECK (agency_match_mode IN ('automatic', 'manual'))",
        );
    }

    $database->exec(<<<'SQL'
        CREATE INDEX IF NOT EXISTS idx_real_estate_agencies_keyword
          ON real_estate_agencies(normalized_keyword);
        CREATE INDEX IF NOT EXISTS idx_properties_agency
          ON properties(agency_id);
        SQL);
};
