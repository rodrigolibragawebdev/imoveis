<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $database->exec(<<<'SQL'
        CREATE TABLE IF NOT EXISTS agendamentos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
          advanced INTEGER,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS agendamento_notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          agendamento_id INTEGER NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS agendamento_photos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          agendamento_id INTEGER NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
          file_path TEXT NOT NULL,
          mime_type TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_agendamentos_property ON agendamentos(property_id);
        CREATE INDEX IF NOT EXISTS idx_agendamento_notes ON agendamento_notes(agendamento_id);
        CREATE INDEX IF NOT EXISTS idx_agendamento_photos ON agendamento_photos(agendamento_id);
        SQL);
};
