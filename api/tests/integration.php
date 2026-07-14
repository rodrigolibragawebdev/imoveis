<?php

declare(strict_types=1);

$databasePath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'imoveis-api-test-' . bin2hex(random_bytes(6)) . '.sqlite';

require_once dirname(__DIR__) . '/bootstrap.php';
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
    $database = new PDO('sqlite:' . $databasePath, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $database->exec('PRAGMA foreign_keys = ON');
    runMigrations($database);
    seedDatabase($database);
    expect((int) $database->query('SELECT COUNT(*) FROM schema_migrations')->fetchColumn() === 2, 'As duas migrations devem ser aplicadas');
    expect((int) $database->query('SELECT COUNT(*) FROM furniture_categories')->fetchColumn() === 5, 'O seed deve criar cinco categorias');
    expect((int) $database->query('SELECT COUNT(*) FROM furniture_items')->fetchColumn() === 11, 'O seed deve criar onze móveis');

    runMigrations($database);
    expect((int) $database->query('SELECT COUNT(*) FROM schema_migrations')->fetchColumn() === 2, 'As migrations precisam ser idempotentes');

    $database->prepare('INSERT INTO preferred_neighborhoods (name, normalized_name) VALUES (?, ?)')->execute(['Centro', 'centro']);
    $insert = $database->prepare(<<<'SQL'
        INSERT INTO properties
          (url, normalized_url, title, source, location, rating, note)
        VALUES (?, ?, ?, 'teste.local', ?, ?, '')
        SQL);
    $fixtures = [
        ['https://teste.local/imovel/1?utm_source=x', 'Apartamento com 2 quartos e 70 m²', 'Centro, Porto Alegre', 'liked'],
        ['https://teste.local/imovel/2', 'Apartamento com 2 quartos e 71 m²', 'Centro, Porto Alegre', null],
        ['https://teste.local/imovel/3', 'Casa com 3 quartos e 110 m²', 'Outro Bairro, Porto Alegre', 'disliked'],
        ['https://teste.local/imovel/4', 'Apartamento pequeno', 'Centro, Porto Alegre', 'terrible'],
        ['https://teste.local/imovel/1?fbclid=abc', 'Cópia do anúncio', 'Centro, Porto Alegre', null],
    ];
    foreach ($fixtures as [$url, $title, $location, $rating]) {
        $insert->execute([$url, normalizeLinkForComparison($url), $title, $location, $rating]);
    }

    $ranked = listRankedProperties($database);
    expect($ranked[0]['rating'] === 'liked', 'Um +1 deve abrir o ranking');
    expect($ranked[0]['rankScore'] === 1100, 'O bairro desejado deve somar bônus ao +1');
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

    echo "OK: migrations, ranking, bairros, duplicatas e Zoom\n";
} finally {
    $insert = null;
    $database = null;
    gc_collect_cycles();
    foreach ([$databasePath, $databasePath . '-shm', $databasePath . '-wal'] as $file) {
        if (is_file($file)) {
            unlink($file);
        }
    }
}
