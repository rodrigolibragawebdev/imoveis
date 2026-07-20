<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $database->exec(<<<'SQL'
        ALTER TABLE agendamentos ADD COLUMN active INTEGER NOT NULL DEFAULT 1;
        CREATE INDEX IF NOT EXISTS idx_agendamentos_active ON agendamentos(property_id, active);
        SQL);
};
