<?php

declare(strict_types=1);

require_once __DIR__ . '/seed.php';

function database(): PDO
{
    static $database = null;
    if ($database instanceof PDO) {
        return $database;
    }

    if (!extension_loaded('pdo_sqlite')) {
        throw new RuntimeException('A extensão pdo_sqlite precisa estar ativa no PHP da Hostinger');
    }

    $defaultPath = dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . 'imoveis-data' . DIRECTORY_SEPARATOR . 'casa-em-pauta.sqlite';
    $databasePath = (string) (getenv('IMOVEIS_DATABASE_PATH') ?: $defaultPath);
    $isAbsolutePath = str_starts_with($databasePath, DIRECTORY_SEPARATOR)
        || preg_match('/^[A-Za-z]:[\\\\\/]/', $databasePath) === 1;
    if (!$isAbsolutePath) {
        $databasePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . ltrim($databasePath, './\\');
    }

    $directory = dirname($databasePath);
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        throw new RuntimeException('Não foi possível criar a pasta persistente do banco de dados');
    }

    $database = new PDO('sqlite:' . $databasePath, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $database->exec('PRAGMA foreign_keys = ON');
    $database->exec('PRAGMA journal_mode = WAL');
    $database->exec('PRAGMA busy_timeout = 5000');

    runMigrations($database);
    seedDatabase($database);

    return $database;
}

function runMigrations(PDO $database): void
{
    $database->exec(<<<'SQL'
        CREATE TABLE IF NOT EXISTS schema_migrations (
          version TEXT PRIMARY KEY,
          applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        SQL);

    $files = glob(__DIR__ . DIRECTORY_SEPARATOR . 'migrations' . DIRECTORY_SEPARATOR . '*.php');
    if ($files === false) {
        throw new RuntimeException('Não foi possível localizar as migrations');
    }
    sort($files, SORT_NATURAL);

    $wasApplied = $database->prepare('SELECT 1 FROM schema_migrations WHERE version = ?');
    $markApplied = $database->prepare('INSERT INTO schema_migrations (version) VALUES (?)');

    foreach ($files as $file) {
        $version = pathinfo($file, PATHINFO_FILENAME);
        $wasApplied->execute([$version]);
        if ($wasApplied->fetchColumn() !== false) {
            continue;
        }

        $migration = require $file;
        if (!is_callable($migration)) {
            throw new RuntimeException("Migration inválida: {$version}");
        }

        $database->beginTransaction();
        try {
            $migration($database);
            $markApplied->execute([$version]);
            $database->commit();
        } catch (Throwable $error) {
            if ($database->inTransaction()) {
                $database->rollBack();
            }
            throw new RuntimeException("Falha na migration {$version}", 0, $error);
        }
    }
}
