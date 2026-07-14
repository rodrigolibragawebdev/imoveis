<?php

declare(strict_types=1);

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
    createSchema($database);
    seedDatabase($database);

    return $database;
}

function createSchema(PDO $database): void
{
    $database->exec(<<<'SQL'
        CREATE TABLE IF NOT EXISTS properties (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          image_url TEXT,
          price REAL,
          source TEXT NOT NULL,
          location TEXT,
          rating TEXT CHECK (rating IN ('liked', 'disliked', 'terrible') OR rating IS NULL),
          note TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS furniture_categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE COLLATE NOCASE,
          color TEXT NOT NULL DEFAULT '#B65C3A',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS furniture_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id INTEGER NOT NULL,
          url TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          image_url TEXT,
          price REAL,
          source TEXT NOT NULL,
          is_seeded INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES furniture_categories(id) ON DELETE RESTRICT
        );

        CREATE TABLE IF NOT EXISTS tips (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0
        );

        CREATE INDEX IF NOT EXISTS idx_furniture_category ON furniture_items(category_id);
        CREATE INDEX IF NOT EXISTS idx_furniture_price ON furniture_items(price);
        SQL);
}

function seedDatabase(PDO $database): void
{
    if ((int) $database->query('SELECT COUNT(*) FROM furniture_categories')->fetchColumn() > 0) {
        return;
    }

    $categories = [
        ['Sala', '#B65C3A'],
        ['Cozinha', '#5C7656'],
        ['Quarto', '#A67C52'],
        ['Lavanderia', '#527A7A'],
        ['Escritório', '#7A6652'],
    ];
    $items = [
        ['Sala', 'Sofá confortável', 'https://www.google.com/search?q=sofa+3+lugares', 2500],
        ['Sala', 'Mesa de jantar', 'https://www.google.com/search?q=mesa+de+jantar+4+lugares', 1200],
        ['Sala', 'Rack ou painel para TV', 'https://www.google.com/search?q=rack+painel+tv', 650],
        ['Cozinha', 'Geladeira frost free', 'https://www.google.com/search?q=geladeira+frost+free', 3500],
        ['Cozinha', 'Fogão ou cooktop', 'https://www.google.com/search?q=fogao+5+bocas', 1400],
        ['Cozinha', 'Micro-ondas', 'https://www.google.com/search?q=microondas+30+litros', 700],
        ['Quarto', 'Cama queen', 'https://www.google.com/search?q=cama+queen+box', 1800],
        ['Quarto', 'Guarda-roupa', 'https://www.google.com/search?q=guarda+roupa+casal', 2200],
        ['Lavanderia', 'Máquina de lavar', 'https://www.google.com/search?q=maquina+de+lavar+12kg', 2300],
        ['Escritório', 'Mesa de trabalho', 'https://www.google.com/search?q=mesa+para+escritorio', 700],
        ['Escritório', 'Cadeira ergonômica', 'https://www.google.com/search?q=cadeira+ergonomica+escritorio', 1100],
    ];

    $database->beginTransaction();
    try {
        $insertCategory = $database->prepare('INSERT OR IGNORE INTO furniture_categories (name, color) VALUES (?, ?)');
        foreach ($categories as $category) {
            $insertCategory->execute($category);
        }

        $findCategory = $database->prepare('SELECT id FROM furniture_categories WHERE name = ?');
        $insertItem = $database->prepare(
            "INSERT OR IGNORE INTO furniture_items (category_id, url, title, price, source, is_seeded) VALUES (?, ?, ?, ?, 'Lista inicial', 1)",
        );
        foreach ($items as [$categoryName, $title, $url, $price]) {
            $findCategory->execute([$categoryName]);
            $categoryId = $findCategory->fetchColumn();
            if ($categoryId !== false) {
                $insertItem->execute([(int) $categoryId, $url, $title, $price]);
            }
        }
        $database->commit();
    } catch (Throwable $error) {
        if ($database->inTransaction()) {
            $database->rollBack();
        }
        throw $error;
    }
}

/** @param array<string, mixed> $row */
function mapProperty(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'url' => (string) $row['url'],
        'title' => (string) $row['title'],
        'imageUrl' => $row['image_url'] !== null ? (string) $row['image_url'] : null,
        'price' => $row['price'] !== null ? (float) $row['price'] : null,
        'source' => (string) $row['source'],
        'location' => $row['location'] !== null ? (string) $row['location'] : null,
        'rating' => $row['rating'] !== null ? (string) $row['rating'] : null,
        'note' => (string) $row['note'],
        'createdAt' => (string) $row['created_at'],
        'updatedAt' => (string) $row['updated_at'],
    ];
}

/** @param array<string, mixed> $row */
function mapCategory(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'name' => (string) $row['name'],
        'color' => (string) $row['color'],
        'createdAt' => (string) $row['created_at'],
    ];
}

/** @param array<string, mixed> $row */
function mapFurniture(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'categoryId' => (int) $row['category_id'],
        'categoryName' => (string) $row['category_name'],
        'categoryColor' => (string) $row['category_color'],
        'url' => (string) $row['url'],
        'title' => (string) $row['title'],
        'imageUrl' => $row['image_url'] !== null ? (string) $row['image_url'] : null,
        'price' => $row['price'] !== null ? (float) $row['price'] : null,
        'source' => (string) $row['source'],
        'isSeeded' => (bool) $row['is_seeded'],
        'createdAt' => (string) $row['created_at'],
    ];
}

/** @param array<string, mixed> $row */
function mapTip(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'title' => (string) $row['title'],
        'content' => (string) $row['content'],
        'sortOrder' => (int) $row['sort_order'],
    ];
}
