<?php

declare(strict_types=1);

return static function (PDO $database): void {
    $database->exec(<<<'SQL'
        CREATE TABLE IF NOT EXISTS financing_simulations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          property_value REAL NOT NULL,
          down_payment REAL NOT NULL DEFAULT 0,
          financed_amount REAL NOT NULL,
          annual_rate REAL NOT NULL,
          term_months INTEGER NOT NULL,
          system TEXT NOT NULL CHECK (system IN ('price', 'sac')),
          lender TEXT NOT NULL,
          first_installment REAL NOT NULL,
          last_installment REAL NOT NULL,
          total_paid REAL NOT NULL,
          total_interest REAL NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        SQL);
};
