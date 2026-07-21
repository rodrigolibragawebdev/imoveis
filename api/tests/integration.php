<?php

declare(strict_types=1);

$databasePath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'imoveis-api-test-' . bin2hex(random_bytes(6)) . '.sqlite';
$upgradeDatabasePath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'imoveis-api-upgrade-test-' . bin2hex(random_bytes(6)) . '.sqlite';
$logDirectory = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'imoveis-api-log-test-' . bin2hex(random_bytes(6));

require_once dirname(__DIR__) . '/bootstrap.php';
require_once dirname(__DIR__) . '/logger.php';
require_once dirname(__DIR__) . '/ranking.php';
require_once dirname(__DIR__) . '/database.php';
require_once dirname(__DIR__) . '/serializers.php';
require_once dirname(__DIR__) . '/preview.php';
require_once dirname(__DIR__) . '/propertyData.php';

function expect(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

try {
    putenv('IMOVEIS_LOG_DIRECTORY=' . $logDirectory);
    $errorId = writeApiErrorLog(new RuntimeException('Falha controlada do teste'), [
        'method' => 'TEST',
        'path' => '/integration',
    ]);
    $logFiles = glob($logDirectory . DIRECTORY_SEPARATOR . 'api-*.log');
    expect(is_array($logFiles) && count($logFiles) === 1, 'O logger deve criar um arquivo diário');
    $logLine = file_get_contents($logFiles[0]);
    expect(is_string($logLine), 'O log deve poder ser lido');
    $logRecord = json_decode(trim($logLine), true, 32, JSON_THROW_ON_ERROR);
    expect($logRecord['errorId'] === $errorId, 'O código da resposta deve correlacionar com o log');
    expect($logRecord['request']['path'] === '/integration', 'O log deve preservar o contexto seguro da rota');

    $migrationFiles = glob(dirname(__DIR__) . '/migrations/*.php');
    expect($migrationFiles !== false, 'As migrations devem ser localizadas');
    natsort($migrationFiles);
    $migrationFiles = array_values($migrationFiles);
    $expectedMigrationCount = count($migrationFiles);

    $upgradeDatabase = new PDO('sqlite:' . $upgradeDatabasePath, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $upgradeDatabase->exec('PRAGMA foreign_keys = ON');
    foreach ($migrationFiles as $migrationFile) {
        if (basename($migrationFile) === '010_allow_repeated_furniture_urls.php') {
            break;
        }
        $migration = require $migrationFile;
        $migration($upgradeDatabase);
    }
    seedDatabase($upgradeDatabase);
    $upgradeItemCount = (int) $upgradeDatabase->query('SELECT COUNT(*) FROM furniture_items')->fetchColumn();
    $upgradeItemId = (int) $upgradeDatabase->query('SELECT MIN(id) FROM furniture_items')->fetchColumn();
    $upgradeVariationInsert = $upgradeDatabase->prepare(<<<'SQL'
        INSERT INTO furniture_item_variations (item_id, url, title, source)
        VALUES (?, 'https://teste.local/upgrade-variation', 'Variação preservada', 'teste.local')
        SQL);
    $upgradeVariationInsert->execute([$upgradeItemId]);
    $allowRepeatedUrls = require dirname(__DIR__) . '/migrations/010_allow_repeated_furniture_urls.php';
    $allowRepeatedUrls($upgradeDatabase);
    $softDeleteMigration = require dirname(__DIR__) . '/migrations/011_furniture_soft_delete.php';
    $softDeleteMigration($upgradeDatabase);
    expect(
        (int) $upgradeDatabase->query('SELECT COUNT(*) FROM furniture_items')->fetchColumn() === $upgradeItemCount,
        'A migration 010 deve preservar os itens existentes',
    );
    expect(
        (int) $upgradeDatabase->query('SELECT COUNT(*) FROM furniture_item_variations')->fetchColumn() === 1,
        'As migrations 010 e 011 devem preservar as variações existentes',
    );
    $upgradeColumns = $upgradeDatabase->query('PRAGMA table_info(furniture_items)')->fetchAll();
    expect(
        in_array('deleted_at', array_column($upgradeColumns, 'name'), true),
        'O upgrade deve adicionar o soft delete aos itens existentes',
    );
    $upgradeVariationInsert = null;
    $upgradeDatabase = null;

    $database = new PDO('sqlite:' . $databasePath, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $database->exec('PRAGMA foreign_keys = ON');
    runMigrations($database);
    seedDatabase($database);
    expect(
        (int) $database->query('SELECT COUNT(*) FROM schema_migrations')->fetchColumn() === $expectedMigrationCount,
        'Todas as migrations devem ser aplicadas',
    );
    expect((int) $database->query('SELECT COUNT(*) FROM furniture_categories')->fetchColumn() === 5, 'O seed deve criar cinco categorias');
    expect((int) $database->query('SELECT COUNT(*) FROM furniture_items')->fetchColumn() === 11, 'O seed deve criar onze móveis');
    expect(
        nonEmptyText(str_repeat('T', 300), 'title') === str_repeat('T', 300),
        'Títulos com mais de 140 caracteres devem ser aceitos',
    );
    $furnitureColumns = $database->query('PRAGMA table_info(furniture_items)')->fetchAll();
    expect(
        in_array('is_purchased', array_column($furnitureColumns, 'name'), true),
        'O catálogo deve persistir o status de compra',
    );
    expect(
        in_array('deleted_at', array_column($furnitureColumns, 'name'), true),
        'O catálogo deve persistir a data de inativação',
    );
    $categoryId = (int) $database->query('SELECT MIN(id) FROM furniture_categories')->fetchColumn();
    $sameUrlInsert = $database->prepare(<<<'SQL'
        INSERT INTO furniture_items (category_id, url, title, source)
        VALUES (?, 'https://teste.local/produto-compartilhado', ?, 'teste.local')
        SQL);
    $sameUrlInsert->execute([$categoryId, 'Produto compartilhado A']);
    $sameUrlInsert->execute([$categoryId, 'Produto compartilhado B']);
    expect(
        (int) $database->query("SELECT COUNT(*) FROM furniture_items WHERE url = 'https://teste.local/produto-compartilhado'")->fetchColumn() === 2,
        'A mesma URL deve ser aceita para itens com nomes diferentes',
    );
    $database->exec("DELETE FROM furniture_items WHERE url = 'https://teste.local/produto-compartilhado'");
    $database->exec('UPDATE furniture_items SET is_purchased = 1 WHERE id = (SELECT MIN(id) FROM furniture_items)');
    $purchasedRow = $database->query(<<<'SQL'
        SELECT i.*, c.name AS category_name, c.color AS category_color
        FROM furniture_items i
        JOIN furniture_categories c ON c.id = i.category_id
        WHERE i.is_purchased = 1
        LIMIT 1
        SQL)->fetch();
    expect(is_array($purchasedRow), 'Um móvel comprado deve ser encontrado');
    expect(mapFurniture($purchasedRow)['isPurchased'] === true, 'O status comprado deve ser serializado como booleano');
    $variationInsert = $database->prepare(<<<'SQL'
        INSERT INTO furniture_item_variations (item_id, url, title, image_url, price, source)
        VALUES (?, ?, ?, ?, ?, ?)
        SQL);
    $variationInsert->execute([
        (int) $purchasedRow['id'],
        'https://teste.local/variacao/1',
        'Opção alternativa',
        null,
        999.9,
        'teste.local',
    ]);
    $variationRow = $database->query('SELECT * FROM furniture_item_variations LIMIT 1')->fetch();
    expect(is_array($variationRow), 'Uma variação deve ser vinculada ao item principal');
    $mappedFurniture = mapFurniture($purchasedRow, [$variationRow]);
    expect(count($mappedFurniture['variations']) === 1, 'O item deve serializar suas variações aninhadas');
    expect($mappedFurniture['variations'][0]['title'] === 'Opção alternativa', 'A variação deve preservar seu título');
    expect($mappedFurniture['deletedAt'] === null, 'Um item ativo deve serializar deletedAt nulo');
    $database->prepare('UPDATE furniture_items SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?')->execute([(int) $purchasedRow['id']]);
    $deletedFurnitureRow = $database->query(<<<'SQL'
        SELECT i.*, c.name AS category_name, c.color AS category_color
        FROM furniture_items i
        JOIN furniture_categories c ON c.id = i.category_id
        WHERE i.deleted_at IS NOT NULL
        LIMIT 1
        SQL)->fetch();
    expect(is_array($deletedFurnitureRow), 'Um item inativo deve continuar no banco');
    expect(mapFurniture($deletedFurnitureRow, [$variationRow])['deletedAt'] !== null, 'O serializer deve expor a data da exclusão');
    expect(
        (int) $database->query('SELECT COUNT(*) FROM furniture_item_variations')->fetchColumn() === 1,
        'O soft delete deve preservar variações',
    );
    $database->prepare('UPDATE furniture_items SET deleted_at = NULL WHERE id = ?')->execute([(int) $purchasedRow['id']]);
    expect(
        (int) $database->query('SELECT COUNT(*) FROM furniture_items WHERE deleted_at IS NULL AND id = ' . (int) $purchasedRow['id'])->fetchColumn() === 1,
        'Restaurar deve devolver o item à lista ativa',
    );
    $permanentDelete = $database->prepare(
        'DELETE FROM furniture_items WHERE id = ? AND deleted_at IS NOT NULL',
    );
    $permanentDelete->execute([(int) $purchasedRow['id']]);
    expect($permanentDelete->rowCount() === 0, 'A exclusão permanente não deve aceitar um item ativo');
    $database->prepare('UPDATE furniture_items SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?')->execute([(int) $purchasedRow['id']]);
    $permanentDelete->execute([(int) $purchasedRow['id']]);
    expect($permanentDelete->rowCount() === 1, 'A exclusão permanente deve remover um item da lixeira');
    expect(
        (int) $database->query('SELECT COUNT(*) FROM furniture_item_variations')->fetchColumn() === 0,
        'Excluir definitivamente o item deve excluir suas variações em cascata',
    );

    runMigrations($database);
    expect(
        (int) $database->query('SELECT COUNT(*) FROM schema_migrations')->fetchColumn() === $expectedMigrationCount,
        'As migrations precisam ser idempotentes',
    );

    foreach (['agendamentos', 'agendamento_notes', 'agendamento_photos'] as $table) {
        $exists = $database->prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?");
        $exists->execute([$table]);
        expect($exists->fetchColumn() !== false, "A tabela {$table} deve existir");
    }

    $database->prepare('INSERT INTO preferred_neighborhoods (name, normalized_name) VALUES (?, ?)')->execute(['Centro', 'centro']);
    $insert = $database->prepare(<<<'SQL'
        INSERT INTO properties
          (url, normalized_url, title, source, location, rating, preference_score, note)
        VALUES (?, ?, ?, 'teste.local', ?, ?, ?, '')
        SQL);
    $fixtures = [
        ['https://teste.local/imovel/1?utm_source=x', 'Apartamento com 2 quartos e 70 m²', 'Centro, Porto Alegre', 'liked', 7],
        ['https://teste.local/imovel/2', 'Apartamento com 2 quartos e 71 m²', 'Centro, Porto Alegre', null, null],
        ['https://teste.local/imovel/3', 'Casa com 3 quartos e 110 m²', 'Outro Bairro, Porto Alegre', 'disliked', null],
        ['https://teste.local/imovel/4', 'Apartamento pequeno', 'Centro, Porto Alegre', 'terrible', null],
        ['https://teste.local/imovel/1?fbclid=abc', 'Cópia do anúncio', 'Centro, Porto Alegre', null, null],
    ];
    foreach ($fixtures as [$url, $title, $location, $rating, $preferenceScore]) {
        $insert->execute([$url, normalizeLinkForComparison($url), $title, $location, $rating, $preferenceScore]);
    }

    $ranked = listRankedProperties($database);
    expect($ranked[0]['rating'] === 'liked', 'Um +1 deve abrir o ranking');
    expect($ranked[0]['rankScore'] === 1170, 'Bairro desejado e nota opcional devem somar bônus ao +1');
    expect($ranked[0]['preferenceScore'] === 7, 'A nota opcional deve ser serializada');
    expect($ranked[0]['isPreferredNeighborhood'] === true, 'Centro deve ser reconhecido como bairro desejado');

    $disliked = array_values(array_filter($ranked, static fn (array $item): bool => $item['rating'] === 'disliked'))[0];
    $terrible = array_values(array_filter($ranked, static fn (array $item): bool => $item['rating'] === 'terrible'))[0];
    expect($disliked['rankScore'] === -1000, 'Um −1 deve ficar depois dos imóveis sem voto após recarregar');
    expect($terrible['rankPosition'] === null, 'Muito ruim não deve receber posição no ranking principal');

    $exactMatches = array_values(array_filter(
        $ranked[0]['duplicateMatches'],
        static fn (array $match): bool => $match['type'] === 'link',
    ));
    expect(count($exactMatches) === 1, 'Links que diferem apenas por tracking devem ser duplicatas exatas');
    expect($ranked[1]['hasDuplicates'] === true, 'Imóveis com mesmo bairro, quartos e área próxima devem ser sinalizados');

    $zoomUrl = 'https://www.zoom.com.br/tv/smart-tv-qd-mini-led-65-tcl-4k-65c6k?_lc=211';
    expect(
        normalizeLinkForComparison($zoomUrl) === 'https://zoom.com.br/tv/smart-tv-qd-mini-led-65-tcl-4k-65c6k',
        'O tracking do Zoom deve ser removido',
    );
    $zoomMetadata = propertyUrlMetadata($zoomUrl);
    expect($zoomMetadata['title'] === 'Smart TV QD-Mini LED 65" TCL 4K 65C6K', 'O slug do Zoom deve gerar um título útil');

    echo "OK: migrations/upgrades, logger, soft delete, ranking, bairros, duplicatas, catálogo, variações e Zoom\n";
} finally {
    putenv('IMOVEIS_LOG_DIRECTORY');
    $insert = null;
    $sameUrlInsert = null;
    $variationInsert = null;
    $permanentDelete = null;
    $upgradeVariationInsert = null;
    $upgradeDatabase = null;
    $exists = null;
    $database = null;
    gc_collect_cycles();
    foreach ([$databasePath, $databasePath . '-shm', $databasePath . '-wal', $upgradeDatabasePath, $upgradeDatabasePath . '-shm', $upgradeDatabasePath . '-wal'] as $file) {
        if (is_file($file)) {
            unlink($file);
        }
    }
    if (isset($logFiles) && is_array($logFiles)) {
        foreach ($logFiles as $logFile) {
            if (is_file($logFile)) {
                unlink($logFile);
            }
        }
    }
    if (is_dir($logDirectory)) {
        rmdir($logDirectory);
    }
}
