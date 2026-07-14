<?php

declare(strict_types=1);

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
            "INSERT OR IGNORE INTO furniture_items (category_id, url, title, price, source, is_seeded, updated_at) VALUES (?, ?, ?, ?, 'Lista inicial', 1, CURRENT_TIMESTAMP)",
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
