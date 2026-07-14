<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/ranking.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/serializers.php';
require_once __DIR__ . '/preview.php';
require_once __DIR__ . '/propertyData.php';

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');

try {
    $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
    $path = rtrim(requestPath(), '/') ?: '/';
    requireAllowedOrigin();

    if ($method === 'OPTIONS') {
        header('Allow: GET, POST, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 600');
        sendNoContent();
    }

    $database = database();

    if ($method === 'GET' && $path === '/health') {
        $database->query('SELECT 1')->fetchColumn();
        sendJson(['status' => 'ok']);
    }

    if ($method === 'GET' && $path === '/properties') {
        sendJson(listRankedProperties($database));
    }

    if ($method === 'POST' && $path === '/properties/bulk') {
        $body = jsonBody();
        $links = $body['links'] ?? null;
        if (!is_array($links) || count($links) < 1) {
            throw new ApiException('Informe pelo menos um link');
        }
        if (count($links) > 20) {
            throw new ApiException('Envie no máximo 20 links por vez');
        }

        $normalizedLinks = [];
        foreach ($links as $link) {
            $canonical = canonicalHttpUrl($link);
            $normalizedLinks[normalizeLinkForComparison($canonical)] = $canonical;
        }
        $find = $database->prepare('SELECT * FROM properties WHERE normalized_url = ? OR url = ? LIMIT 1');
        $insert = $database->prepare(
            'INSERT INTO properties (url, normalized_url, title, image_url, price, source, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
        );
        $propertyIds = [];

        foreach ($normalizedLinks as $normalizedLink => $link) {
            $find->execute([$normalizedLink, $link]);
            $existing = $find->fetch();
            if (is_array($existing)) {
                $propertyIds[] = (int) $existing['id'];
                continue;
            }

            $preview = linkPreview($link);
            try {
                $insert->execute([
                    $preview['url'],
                    $normalizedLink,
                    $preview['title'],
                    $preview['imageUrl'],
                    $preview['price'],
                    $preview['source'],
                    $preview['location'],
                ]);
                $propertyIds[] = (int) $database->lastInsertId();
            } catch (PDOException $error) {
                if (!str_contains(strtolower($error->getMessage()), 'unique')) {
                    throw $error;
                }
                $find->execute([$normalizedLink, $link]);
                $created = $find->fetch();
                if (is_array($created)) {
                    $propertyIds[] = (int) $created['id'];
                }
            }
        }
        $selectedIds = array_flip($propertyIds);
        $properties = array_values(array_filter(
            listRankedProperties($database),
            static fn (array $property): bool => isset($selectedIds[(int) $property['id']]),
        ));
        sendJson($properties, 201);
    }

    if ($method === 'PATCH' && preg_match('#^/properties/(?<id>\d+)/review$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $body = jsonBody();
        $rating = $body['rating'] ?? null;
        if (!in_array($rating, [null, 'liked', 'disliked', 'terrible'], true)) {
            throw new ApiException('A avaliação informada é inválida');
        }
        $noteValue = $body['note'] ?? '';
        if (!is_string($noteValue)) {
            throw new ApiException('A observação precisa ser um texto');
        }
        $note = trim($noteValue);
        if (mb_strlen($note) > 280) {
            throw new ApiException('A observação deve ter até 280 caracteres');
        }

        $preferenceScore = null;
        if ($rating === 'liked') {
            if (array_key_exists('preferenceScore', $body)) {
                if ($body['preferenceScore'] !== null) {
                    $validatedScore = filter_var($body['preferenceScore'], FILTER_VALIDATE_INT, [
                        'options' => ['min_range' => 0, 'max_range' => 10],
                    ]);
                    if ($validatedScore === false) {
                        throw new ApiException('A nota precisa ser um número inteiro entre 0 e 10');
                    }
                    $preferenceScore = (int) $validatedScore;
                }
            } else {
                $findCurrentScore = $database->prepare('SELECT preference_score FROM properties WHERE id = ?');
                $findCurrentScore->execute([$id]);
                $currentScore = $findCurrentScore->fetchColumn();
                $preferenceScore = $currentScore !== false && $currentScore !== null ? (int) $currentScore : null;
            }
        }

        $update = $database->prepare(
            'UPDATE properties SET rating = ?, preference_score = ?, note = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        );
        $update->execute([$rating, $preferenceScore, $note, $id]);
        if ($update->rowCount() === 0) {
            $exists = $database->prepare('SELECT 1 FROM properties WHERE id = ?');
            $exists->execute([$id]);
            if ($exists->fetchColumn() === false) {
                throw new ApiException('Imóvel não encontrado', 404);
            }
        }
        $property = findRankedProperty($database, $id);
        if ($property === null) {
            throw new ApiException('Imóvel não encontrado', 404);
        }
        sendJson($property);
    }

    if ($method === 'DELETE' && preg_match('#^/properties/(?<id>\d+)$#', $path, $match) === 1) {
        $delete = $database->prepare('DELETE FROM properties WHERE id = ?');
        $delete->execute([positiveInteger($match['id'], 'id')]);
        if ($delete->rowCount() === 0) {
            throw new ApiException('Imóvel não encontrado', 404);
        }
        sendNoContent();
    }

    if ($method === 'GET' && $path === '/neighborhoods') {
        sendJson(listPreferredNeighborhoods($database));
    }

    if ($method === 'POST' && $path === '/neighborhoods') {
        $body = jsonBody();
        $name = cleanText($body['name'] ?? null, 'name', 2, 60);
        $normalizedName = foldText($name);
        if ($normalizedName === '') {
            throw new ApiException('Informe um bairro válido');
        }
        try {
            $insert = $database->prepare(
                'INSERT INTO preferred_neighborhoods (name, normalized_name) VALUES (?, ?)',
            );
            $insert->execute([$name, $normalizedName]);
        } catch (PDOException $error) {
            if (str_contains(strtolower($error->getMessage()), 'unique')) {
                throw new ApiException('Esse bairro já está na lista de desejados', 409, $error);
            }
            throw $error;
        }
        $find = $database->prepare('SELECT * FROM preferred_neighborhoods WHERE id = ?');
        $find->execute([(int) $database->lastInsertId()]);
        $neighborhood = $find->fetch();
        if (!is_array($neighborhood)) {
            throw new RuntimeException('Não foi possível cadastrar o bairro');
        }
        sendJson(mapNeighborhood($neighborhood), 201);
    }

    if ($method === 'DELETE' && preg_match('#^/neighborhoods/(?<id>\d+)$#', $path, $match) === 1) {
        $delete = $database->prepare('DELETE FROM preferred_neighborhoods WHERE id = ?');
        $delete->execute([positiveInteger($match['id'], 'id')]);
        if ($delete->rowCount() === 0) {
            throw new ApiException('Bairro não encontrado', 404);
        }
        sendNoContent();
    }

    if ($method === 'GET' && $path === '/furniture/categories') {
        $rows = $database->query(<<<'SQL'
            SELECT c.*
            FROM furniture_categories c
            ORDER BY c.name COLLATE NOCASE
            SQL)->fetchAll();
        sendJson(array_map('mapCategory', $rows));
    }

    if ($method === 'POST' && $path === '/furniture/categories') {
        $body = jsonBody();
        $name = cleanText($body['name'] ?? null, 'name', 2, 40);
        $color = $body['color'] ?? '#B65C3A';
        if (!is_string($color) || preg_match('/^#[0-9A-Fa-f]{6}$/', $color) !== 1) {
            throw new ApiException('Informe uma cor hexadecimal válida');
        }
        try {
            $insert = $database->prepare('INSERT INTO furniture_categories (name, color) VALUES (?, ?)');
            $insert->execute([$name, strtoupper($color)]);
        } catch (PDOException $error) {
            if (str_contains(strtolower($error->getMessage()), 'unique')) {
                throw new ApiException('Já existe uma categoria com esse nome', 409, $error);
            }
            throw $error;
        }
        $find = $database->prepare('SELECT * FROM furniture_categories WHERE id = ?');
        $find->execute([(int) $database->lastInsertId()]);
        $category = $find->fetch();
        if (!is_array($category)) {
            throw new RuntimeException('Não foi possível criar a categoria');
        }
        sendJson(mapCategory($category), 201);
    }

    if ($method === 'GET' && $path === '/furniture/items') {
        $sort = (string) ($_GET['sort'] ?? 'price-asc');
        $orderBy = match ($sort) {
            'price-asc' => 'i.price IS NULL, i.price ASC, i.id DESC',
            'price-desc' => 'i.price IS NULL, i.price DESC, i.id DESC',
            'newest' => 'i.created_at DESC, i.id DESC',
            default => throw new ApiException('A ordenação informada é inválida'),
        };
        $categoryId = isset($_GET['categoryId']) && $_GET['categoryId'] !== ''
            ? positiveInteger($_GET['categoryId'], 'categoryId')
            : null;
        $sql = <<<SQL
            SELECT i.*, c.name AS category_name, c.color AS category_color
            FROM furniture_items i
            JOIN furniture_categories c ON c.id = i.category_id
            SQL;
        $parameters = [];
        if ($categoryId !== null) {
            $sql .= ' WHERE i.category_id = ?';
            $parameters[] = $categoryId;
        }
        $sql .= " ORDER BY {$orderBy}";
        $query = $database->prepare($sql);
        $query->execute($parameters);
        sendJson(array_map('mapFurniture', $query->fetchAll()));
    }

    if ($method === 'POST' && $path === '/furniture/items') {
        $body = jsonBody();
        $categoryId = positiveInteger($body['categoryId'] ?? null, 'categoryId');
        $url = canonicalHttpUrl($body['url'] ?? null);
        $title = null;
        if (isset($body['title']) && $body['title'] !== '') {
            $title = cleanText($body['title'], 'title', 1, 140);
        }
        $imageUrl = null;
        if (isset($body['imageUrl']) && $body['imageUrl'] !== '') {
            $imageUrl = canonicalHttpUrl($body['imageUrl'], 'imageUrl');
        }
        $price = optionalPrice($body['price'] ?? null);

        $findCategory = $database->prepare('SELECT 1 FROM furniture_categories WHERE id = ?');
        $findCategory->execute([$categoryId]);
        if ($findCategory->fetchColumn() === false) {
            throw new ApiException('Categoria não encontrada', 404);
        }
        $findExisting = $database->prepare('SELECT 1 FROM furniture_items WHERE url = ?');
        $findExisting->execute([$url]);
        if ($findExisting->fetchColumn() !== false) {
            throw new ApiException('Este link já está no catálogo', 409);
        }

        $preview = linkPreview($url);
        try {
            $insert = $database->prepare(
                'INSERT INTO furniture_items (category_id, url, title, image_url, price, source, updated_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
            );
            $insert->execute([
                $categoryId,
                $url,
                $title ?? $preview['title'],
                $imageUrl ?? $preview['imageUrl'],
                $price ?? $preview['price'],
                $preview['source'],
            ]);
        } catch (PDOException $error) {
            if (str_contains(strtolower($error->getMessage()), 'unique')) {
                throw new ApiException('Este link já está no catálogo', 409, $error);
            }
            throw $error;
        }
        $find = $database->prepare(<<<'SQL'
            SELECT i.*, c.name AS category_name, c.color AS category_color
            FROM furniture_items i
            JOIN furniture_categories c ON c.id = i.category_id
            WHERE i.id = ?
            SQL);
        $find->execute([(int) $database->lastInsertId()]);
        $item = $find->fetch();
        if (!is_array($item)) {
            throw new RuntimeException('Não foi possível criar o item');
        }
        sendJson(mapFurniture($item), 201);
    }

    if ($method === 'PATCH' && preg_match('#^/furniture/items/(?<id>\d+)$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $body = jsonBody();
        $categoryId = positiveInteger($body['categoryId'] ?? null, 'categoryId');
        $url = canonicalHttpUrl($body['url'] ?? null);
        $title = cleanText($body['title'] ?? null, 'title', 1, 140);
        $imageUrl = null;
        if (isset($body['imageUrl']) && $body['imageUrl'] !== '') {
            $imageUrl = canonicalHttpUrl($body['imageUrl'], 'imageUrl');
        }
        $price = optionalPrice($body['price'] ?? null);

        $findCategory = $database->prepare('SELECT 1 FROM furniture_categories WHERE id = ?');
        $findCategory->execute([$categoryId]);
        if ($findCategory->fetchColumn() === false) {
            throw new ApiException('Categoria não encontrada', 404);
        }

        $findExisting = $database->prepare('SELECT 1 FROM furniture_items WHERE url = ? AND id <> ?');
        $findExisting->execute([$url, $id]);
        if ($findExisting->fetchColumn() !== false) {
            throw new ApiException('Este link já está no catálogo', 409);
        }

        $host = (string) (parse_url($url, PHP_URL_HOST) ?: 'site');
        $source = preg_replace('/^www\./i', '', $host) ?: $host;
        $update = $database->prepare(<<<'SQL'
            UPDATE furniture_items
            SET category_id = ?, url = ?, title = ?, image_url = ?, price = ?, source = ?,
                is_seeded = 0, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            SQL);
        $update->execute([$categoryId, $url, $title, $imageUrl, $price, $source, $id]);
        if ($update->rowCount() === 0) {
            $exists = $database->prepare('SELECT 1 FROM furniture_items WHERE id = ?');
            $exists->execute([$id]);
            if ($exists->fetchColumn() === false) {
                throw new ApiException('Item não encontrado', 404);
            }
        }

        $find = $database->prepare(<<<'SQL'
            SELECT i.*, c.name AS category_name, c.color AS category_color
            FROM furniture_items i
            JOIN furniture_categories c ON c.id = i.category_id
            WHERE i.id = ?
            SQL);
        $find->execute([$id]);
        $item = $find->fetch();
        if (!is_array($item)) {
            throw new ApiException('Item não encontrado', 404);
        }
        sendJson(mapFurniture($item));
    }

    if ($method === 'DELETE' && preg_match('#^/furniture/items/(?<id>\d+)$#', $path, $match) === 1) {
        $delete = $database->prepare('DELETE FROM furniture_items WHERE id = ?');
        $delete->execute([positiveInteger($match['id'], 'id')]);
        if ($delete->rowCount() === 0) {
            throw new ApiException('Item não encontrado', 404);
        }
        sendNoContent();
    }

    if ($method === 'GET' && $path === '/tips') {
        $rows = $database->query('SELECT * FROM tips ORDER BY sort_order, id')->fetchAll();
        sendJson(array_map('mapTip', $rows));
    }

    throw new ApiException('Rota não encontrada', 404);
} catch (ApiException $error) {
    sendJson(['message' => $error->getMessage()], $error->status);
} catch (Throwable $error) {
    error_log('[imoveis-api] ' . $error::class . ': ' . $error->getMessage());
    sendJson(['message' => 'Erro interno da API'], 500);
}
