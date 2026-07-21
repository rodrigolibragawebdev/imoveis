<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/logger.php';
require_once __DIR__ . '/ranking.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/serializers.php';
require_once __DIR__ . '/preview.php';
require_once __DIR__ . '/propertyData.php';
require_once __DIR__ . '/agendamentos.php';

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');

$method = 'UNKNOWN';
$path = '/';
$requestContext = [];

register_shutdown_function(static function () use (&$requestContext): void {
    $lastError = error_get_last();
    if (!is_array($lastError) || !in_array($lastError['type'] ?? null, [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        return;
    }
    writeApiErrorLog(new ErrorException(
        (string) ($lastError['message'] ?? 'Erro fatal desconhecido'),
        0,
        (int) ($lastError['type'] ?? E_ERROR),
        (string) ($lastError['file'] ?? __FILE__),
        (int) ($lastError['line'] ?? 0),
    ), [...$requestContext, 'fatal' => true]);
});

try {
    $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
    $path = rtrim(requestPath(), '/') ?: '/';
    $requestContext = ['method' => $method, 'path' => $path];
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
        $propertyId = positiveInteger($match['id'], 'id');
        deletePropertyAgendamentoPhotoFiles($database, $propertyId);
        $delete = $database->prepare('DELETE FROM properties WHERE id = ?');
        $delete->execute([$propertyId]);
        if ($delete->rowCount() === 0) {
            throw new ApiException('Imóvel não encontrado', 404);
        }
        sendNoContent();
    }

    if ($method === 'GET' && $path === '/agendamentos') {
        sendJson(listAgendamentos($database));
    }

    if ($method === 'POST' && $path === '/agendamentos') {
        $body = jsonBody();
        $propertyId = positiveInteger($body['propertyId'] ?? null, 'propertyId');

        $findProperty = $database->prepare('SELECT 1 FROM properties WHERE id = ?');
        $findProperty->execute([$propertyId]);
        if ($findProperty->fetchColumn() === false) {
            throw new ApiException('Imóvel não encontrado', 404);
        }

        $findActive = $database->prepare('SELECT id FROM agendamentos WHERE property_id = ? AND active = 1');
        $findActive->execute([$propertyId]);
        $activeId = $findActive->fetchColumn();
        if ($activeId !== false) {
            sendJson(findAgendamento($database, (int) $activeId));
        }

        $insert = $database->prepare('INSERT INTO agendamentos (property_id) VALUES (?)');
        $insert->execute([$propertyId]);
        $agendamento = findAgendamento($database, (int) $database->lastInsertId());
        if ($agendamento === null) {
            throw new RuntimeException('Não foi possível criar o agendamento');
        }
        sendJson($agendamento, 201);
    }

    if ($method === 'POST' && preg_match('#^/agendamentos/(?<id>\d+)/return$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $update = $database->prepare(
            'UPDATE agendamentos SET active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        );
        $update->execute([$id]);
        $agendamento = findAgendamento($database, $id);
        if ($agendamento === null) {
            throw new ApiException('Agendamento não encontrado', 404);
        }
        sendJson($agendamento);
    }

    if ($method === 'PATCH' && preg_match('#^/agendamentos/(?<id>\d+)$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $body = jsonBody();
        $advanced = array_key_exists('advanced', $body) ? $body['advanced'] : null;
        if (!in_array($advanced, [null, true, false], true)) {
            throw new ApiException('O campo advanced precisa ser verdadeiro, falso ou nulo');
        }

        $update = $database->prepare(
            'UPDATE agendamentos SET advanced = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        );
        $update->execute([$advanced === null ? null : (int) $advanced, $id]);
        $agendamento = findAgendamento($database, $id);
        if ($agendamento === null) {
            throw new ApiException('Agendamento não encontrado', 404);
        }
        sendJson($agendamento);
    }

    if ($method === 'DELETE' && preg_match('#^/agendamentos/(?<id>\d+)$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        deleteAgendamentoPhotoFiles($database, $id);
        $delete = $database->prepare('DELETE FROM agendamentos WHERE id = ?');
        $delete->execute([$id]);
        if ($delete->rowCount() === 0) {
            throw new ApiException('Agendamento não encontrado', 404);
        }
        sendNoContent();
    }

    if ($method === 'POST' && preg_match('#^/agendamentos/(?<id>\d+)/notes$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $findAgendamento = $database->prepare('SELECT 1 FROM agendamentos WHERE id = ?');
        $findAgendamento->execute([$id]);
        if ($findAgendamento->fetchColumn() === false) {
            throw new ApiException('Agendamento não encontrado', 404);
        }

        $body = jsonBody();
        $content = cleanText($body['content'] ?? null, 'content', 1, 500);
        $insert = $database->prepare('INSERT INTO agendamento_notes (agendamento_id, content) VALUES (?, ?)');
        $insert->execute([$id, $content]);

        sendJson(findAgendamento($database, $id), 201);
    }

    if ($method === 'DELETE' && preg_match('#^/agendamentos/(?<id>\d+)/notes/(?<noteId>\d+)$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $noteId = positiveInteger($match['noteId'], 'noteId');
        $delete = $database->prepare('DELETE FROM agendamento_notes WHERE id = ? AND agendamento_id = ?');
        $delete->execute([$noteId, $id]);
        if ($delete->rowCount() === 0) {
            throw new ApiException('Nota não encontrada', 404);
        }
        sendNoContent();
    }

    if ($method === 'POST' && preg_match('#^/agendamentos/(?<id>\d+)/photos$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $findAgendamento = $database->prepare('SELECT 1 FROM agendamentos WHERE id = ?');
        $findAgendamento->execute([$id]);
        if ($findAgendamento->fetchColumn() === false) {
            throw new ApiException('Agendamento não encontrado', 404);
        }

        $file = $_FILES['photo'] ?? null;
        if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            throw new ApiException('Envie uma foto válida no campo "photo"');
        }
        if ((int) $file['size'] > 6_000_000) {
            throw new ApiException('A foto deve ter até 6 MB', 413);
        }

        $tmpPath = (string) $file['tmp_name'];
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = (string) $finfo->file($tmpPath);
        $extension = match ($mimeType) {
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            default => null,
        };
        if ($extension === null) {
            throw new ApiException('A foto precisa ser JPEG, PNG ou WEBP');
        }

        $agendamentoDirectory = uploadsDirectory() . DIRECTORY_SEPARATOR . $id;
        if (!is_dir($agendamentoDirectory) && !mkdir($agendamentoDirectory, 0700, true) && !is_dir($agendamentoDirectory)) {
            throw new RuntimeException('Não foi possível criar a pasta de fotos do agendamento');
        }

        $filename = bin2hex(random_bytes(16)) . '.' . $extension;
        $relativePath = $id . DIRECTORY_SEPARATOR . $filename;
        if (!move_uploaded_file($tmpPath, $agendamentoDirectory . DIRECTORY_SEPARATOR . $filename)) {
            throw new RuntimeException('Não foi possível salvar a foto');
        }

        $insert = $database->prepare(
            'INSERT INTO agendamento_photos (agendamento_id, file_path, mime_type) VALUES (?, ?, ?)',
        );
        $insert->execute([$id, $relativePath, $mimeType]);

        sendJson(findAgendamento($database, $id), 201);
    }

    if (
        $method === 'DELETE'
        && preg_match('#^/agendamentos/(?<id>\d+)/photos/(?<photoId>\d+)$#', $path, $match) === 1
    ) {
        $id = positiveInteger($match['id'], 'id');
        $photoId = positiveInteger($match['photoId'], 'photoId');

        $find = $database->prepare('SELECT file_path FROM agendamento_photos WHERE id = ? AND agendamento_id = ?');
        $find->execute([$photoId, $id]);
        $filePath = $find->fetchColumn();
        if ($filePath === false) {
            throw new ApiException('Foto não encontrada', 404);
        }
        unlinkAgendamentoPhoto((string) $filePath);

        $database->prepare('DELETE FROM agendamento_photos WHERE id = ?')->execute([$photoId]);
        sendNoContent();
    }

    if (
        $method === 'GET'
        && preg_match('#^/agendamentos/(?<id>\d+)/photos/(?<photoId>\d+)/file$#', $path, $match) === 1
    ) {
        $id = positiveInteger($match['id'], 'id');
        $photoId = positiveInteger($match['photoId'], 'photoId');

        $find = $database->prepare(
            'SELECT file_path, mime_type FROM agendamento_photos WHERE id = ? AND agendamento_id = ?',
        );
        $find->execute([$photoId, $id]);
        $photo = $find->fetch();
        if (!is_array($photo)) {
            throw new ApiException('Foto não encontrada', 404);
        }

        sendFile(uploadsDirectory() . DIRECTORY_SEPARATOR . $photo['file_path'], (string) $photo['mime_type']);
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

    if ($method === 'GET' && $path === '/furniture/items/trash') {
        $itemRows = $database->query(<<<'SQL'
            SELECT i.*, c.name AS category_name, c.color AS category_color
            FROM furniture_items i
            JOIN furniture_categories c ON c.id = i.category_id
            WHERE i.deleted_at IS NOT NULL
            ORDER BY i.deleted_at DESC, i.id DESC
            SQL)->fetchAll();
        $variationRows = $database->query(<<<'SQL'
            SELECT v.*
            FROM furniture_item_variations v
            JOIN furniture_items i ON i.id = v.item_id
            WHERE i.deleted_at IS NOT NULL
            ORDER BY v.item_id, v.created_at, v.id
            SQL)->fetchAll();
        $variationsByItem = [];
        foreach ($variationRows as $variationRow) {
            $variationsByItem[(int) $variationRow['item_id']][] = $variationRow;
        }
        sendJson(array_map(
            static fn (array $row): array => mapFurniture($row, $variationsByItem[(int) $row['id']] ?? []),
            $itemRows,
        ));
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
            WHERE i.deleted_at IS NULL
            SQL;
        $parameters = [];
        if ($categoryId !== null) {
            $sql .= ' AND i.category_id = ?';
            $parameters[] = $categoryId;
        }
        $sql .= " ORDER BY {$orderBy}";
        $query = $database->prepare($sql);
        $query->execute($parameters);
        $itemRows = $query->fetchAll();
        $variationRows = $database->query(
            'SELECT * FROM furniture_item_variations ORDER BY item_id, created_at, id',
        )->fetchAll();
        $variationsByItem = [];
        foreach ($variationRows as $variationRow) {
            $variationsByItem[(int) $variationRow['item_id']][] = $variationRow;
        }
        sendJson(array_map(
            static fn (array $row): array => mapFurniture($row, $variationsByItem[(int) $row['id']] ?? []),
            $itemRows,
        ));
    }

    if ($method === 'POST' && $path === '/furniture/items') {
        $body = jsonBody();
        $categoryId = positiveInteger($body['categoryId'] ?? null, 'categoryId');
        $url = canonicalHttpUrl($body['url'] ?? null);
        $title = null;
        if (isset($body['title']) && $body['title'] !== '') {
            $title = nonEmptyText($body['title'], 'title');
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
        $findExisting = $database->prepare(<<<'SQL'
            SELECT 1 FROM furniture_items WHERE url = ?
            UNION ALL
            SELECT 1 FROM furniture_item_variations WHERE url = ?
            LIMIT 1
            SQL);
        $findExisting->execute([$url, $url]);
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

    if ($method === 'POST' && $path === '/furniture/items/bulk') {
        $body = jsonBody();
        $importMeta = $body['importMeta'] ?? null;
        if (is_array($importMeta)) {
            $importId = $importMeta['id'] ?? null;
            $batch = filter_var($importMeta['batch'] ?? null, FILTER_VALIDATE_INT);
            $totalBatches = filter_var($importMeta['totalBatches'] ?? null, FILTER_VALIDATE_INT);
            $requestContext['import'] = array_filter([
                'id' => is_string($importId) && preg_match('/^[a-f0-9]{64}$/', $importId) === 1 ? $importId : null,
                'batch' => is_int($batch) && $batch > 0 ? $batch : null,
                'totalBatches' => is_int($totalBatches) && $totalBatches > 0 ? $totalBatches : null,
            ], static fn (mixed $value): bool => $value !== null);
        }
        $items = $body['items'] ?? null;
        if (!is_array($items) || count($items) < 1) {
            throw new ApiException('Informe pelo menos um item para importar');
        }
        $findCategory = $database->prepare('SELECT 1 FROM furniture_categories WHERE id = ?');
        $normalizedItems = [];
        foreach ($items as $index => $item) {
            if (!is_array($item)) {
                throw new ApiException('Cada item da importação precisa ser um objeto');
            }
            $position = $index + 1;
            $categoryId = positiveInteger($item['categoryId'] ?? null, "items[{$index}].categoryId");
            $url = canonicalHttpUrl($item['url'] ?? null, "items[{$index}].url");

            $title = null;
            if (isset($item['title']) && $item['title'] !== '') {
                $title = nonEmptyText($item['title'], "items[{$index}].title");
            }
            $imageUrl = null;
            if (isset($item['imageUrl']) && $item['imageUrl'] !== '') {
                $imageUrl = canonicalHttpUrl($item['imageUrl'], "items[{$index}].imageUrl");
            }
            $price = optionalPrice($item['price'] ?? null);

            $findCategory->execute([$categoryId]);
            if ($findCategory->fetchColumn() === false) {
                throw new ApiException("A categoria do item {$position} não foi encontrada", 404);
            }
            $normalizedItems[] = compact('categoryId', 'url', 'title', 'imageUrl', 'price');
        }

        $seenNames = [];
        foreach ($database->query('SELECT title FROM furniture_items WHERE deleted_at IS NULL')->fetchAll() as $existingItem) {
            $seenNames[foldText((string) $existingItem['title'])] = true;
        }
        $preparedItems = [];
        foreach ($normalizedItems as $item) {
            $preview = linkPreview($item['url'], 2);
            $finalTitle = $item['title'] ?? $preview['title'];
            $nameKey = foldText($finalTitle);
            if (isset($seenNames[$nameKey])) {
                continue;
            }
            $seenNames[$nameKey] = true;
            $preparedItems[] = [
                ...$item,
                'title' => $finalTitle,
                'imageUrl' => $item['imageUrl'] ?? $preview['imageUrl'],
                'price' => $item['price'] ?? $preview['price'],
                'source' => $preview['source'],
            ];
        }

        if ($preparedItems === []) {
            sendJson([], 201);
        }

        $insert = $database->prepare(
            'INSERT INTO furniture_items (category_id, url, title, image_url, price, source, updated_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        );
        $createdIds = [];
        $database->beginTransaction();
        try {
            foreach ($preparedItems as $item) {
                $insert->execute([
                    $item['categoryId'],
                    $item['url'],
                    $item['title'],
                    $item['imageUrl'],
                    $item['price'],
                    $item['source'],
                ]);
                $createdIds[] = (int) $database->lastInsertId();
            }
            $database->commit();
        } catch (Throwable $error) {
            if ($database->inTransaction()) {
                $database->rollBack();
            }
            throw $error;
        }

        $placeholders = implode(', ', array_fill(0, count($createdIds), '?'));
        $findCreated = $database->prepare(<<<SQL
            SELECT i.*, c.name AS category_name, c.color AS category_color
            FROM furniture_items i
            JOIN furniture_categories c ON c.id = i.category_id
            WHERE i.id IN ({$placeholders})
            ORDER BY i.id
            SQL);
        $findCreated->execute($createdIds);
        sendJson(array_map('mapFurniture', $findCreated->fetchAll()), 201);
    }

    if ($method === 'POST' && preg_match('#^/furniture/items/(?<itemId>\d+)/variations$#', $path, $match) === 1) {
        $itemId = positiveInteger($match['itemId'], 'itemId');
        $body = jsonBody();
        $url = canonicalHttpUrl($body['url'] ?? null);
        $title = null;
        if (isset($body['title']) && $body['title'] !== '') {
            $title = nonEmptyText($body['title'], 'title');
        }
        $imageUrl = null;
        if (isset($body['imageUrl']) && $body['imageUrl'] !== '') {
            $imageUrl = canonicalHttpUrl($body['imageUrl'], 'imageUrl');
        }
        $price = optionalPrice($body['price'] ?? null);

        $findItem = $database->prepare('SELECT 1 FROM furniture_items WHERE id = ? AND deleted_at IS NULL');
        $findItem->execute([$itemId]);
        if ($findItem->fetchColumn() === false) {
            throw new ApiException('Item principal não encontrado', 404);
        }
        $findExisting = $database->prepare(<<<'SQL'
            SELECT 1 FROM furniture_items WHERE url = ?
            UNION ALL
            SELECT 1 FROM furniture_item_variations WHERE url = ?
            LIMIT 1
            SQL);
        $findExisting->execute([$url, $url]);
        if ($findExisting->fetchColumn() !== false) {
            throw new ApiException('Este link já está no catálogo', 409);
        }

        $preview = linkPreview($url);
        try {
            $insert = $database->prepare(<<<'SQL'
                INSERT INTO furniture_item_variations
                  (item_id, url, title, image_url, price, source, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                SQL);
            $insert->execute([
                $itemId,
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

        $find = $database->prepare('SELECT * FROM furniture_item_variations WHERE id = ?');
        $find->execute([(int) $database->lastInsertId()]);
        $variation = $find->fetch();
        if (!is_array($variation)) {
            throw new RuntimeException('Não foi possível criar a variação');
        }
        sendJson(mapFurnitureVariation($variation), 201);
    }

    if ($method === 'DELETE' && $path === '/furniture/items/bulk') {
        $body = jsonBody();
        $ids = $body['ids'] ?? null;
        if (!is_array($ids) || count($ids) < 1) {
            throw new ApiException('Selecione pelo menos um item para excluir');
        }
        $validatedIds = [];
        foreach ($ids as $id) {
            $validatedIds[] = positiveInteger($id, 'ids');
        }
        $validatedIds = array_values(array_unique($validatedIds));
        $deleted = 0;
        $database->beginTransaction();
        try {
            foreach (array_chunk($validatedIds, 500) as $idChunk) {
                $placeholders = implode(', ', array_fill(0, count($idChunk), '?'));
                $delete = $database->prepare(
                    "UPDATE furniture_items SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP "
                    . "WHERE deleted_at IS NULL AND id IN ({$placeholders})",
                );
                $delete->execute($idChunk);
                $deleted += $delete->rowCount();
            }
            $database->commit();
        } catch (Throwable $error) {
            if ($database->inTransaction()) {
                $database->rollBack();
            }
            throw $error;
        }
        sendJson(['deleted' => $deleted]);
    }

    if ($method === 'PATCH' && $path === '/furniture/items/bulk/restore') {
        $body = jsonBody();
        $ids = $body['ids'] ?? null;
        if (!is_array($ids) || count($ids) < 1) {
            throw new ApiException('Selecione pelo menos um item para restaurar');
        }
        $validatedIds = [];
        foreach ($ids as $id) {
            $validatedIds[] = positiveInteger($id, 'ids');
        }
        $validatedIds = array_values(array_unique($validatedIds));
        $restored = 0;
        $database->beginTransaction();
        try {
            foreach (array_chunk($validatedIds, 500) as $idChunk) {
                $placeholders = implode(', ', array_fill(0, count($idChunk), '?'));
                $restore = $database->prepare(
                    "UPDATE furniture_items SET deleted_at = NULL, updated_at = CURRENT_TIMESTAMP "
                    . "WHERE deleted_at IS NOT NULL AND id IN ({$placeholders})",
                );
                $restore->execute($idChunk);
                $restored += $restore->rowCount();
            }
            $database->commit();
        } catch (Throwable $error) {
            if ($database->inTransaction()) {
                $database->rollBack();
            }
            throw $error;
        }
        sendJson(['restored' => $restored]);
    }

    if ($method === 'PATCH' && preg_match('#^/furniture/items/(?<id>\d+)/restore$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $restore = $database->prepare(
            'UPDATE furniture_items SET deleted_at = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NOT NULL',
        );
        $restore->execute([$id]);
        if ($restore->rowCount() === 0) {
            throw new ApiException('Item inativo não encontrado', 404);
        }
        sendJson(['id' => $id, 'restored' => true]);
    }

    if ($method === 'PATCH' && preg_match('#^/furniture/items/(?<id>\d+)/purchased$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $body = jsonBody();
        $isPurchased = $body['isPurchased'] ?? null;
        if (!is_bool($isPurchased)) {
            throw new ApiException('O status de compra precisa ser verdadeiro ou falso');
        }
        $update = $database->prepare(
            'UPDATE furniture_items SET is_purchased = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
        );
        $update->execute([$isPurchased ? 1 : 0, $id]);
        if ($update->rowCount() === 0) {
            $exists = $database->prepare('SELECT 1 FROM furniture_items WHERE id = ? AND deleted_at IS NULL');
            $exists->execute([$id]);
            if ($exists->fetchColumn() === false) {
                throw new ApiException('Item não encontrado', 404);
            }
        }
        sendJson(['id' => $id, 'isPurchased' => $isPurchased]);
    }

    if ($method === 'PATCH' && preg_match('#^/furniture/items/(?<itemId>\d+)/variations/(?<variationId>\d+)$#', $path, $match) === 1) {
        $itemId = positiveInteger($match['itemId'], 'itemId');
        $variationId = positiveInteger($match['variationId'], 'variationId');
        $body = jsonBody();
        $url = canonicalHttpUrl($body['url'] ?? null);
        $title = nonEmptyText($body['title'] ?? null, 'title');
        $imageUrl = null;
        if (isset($body['imageUrl']) && $body['imageUrl'] !== '') {
            $imageUrl = canonicalHttpUrl($body['imageUrl'], 'imageUrl');
        }
        $price = optionalPrice($body['price'] ?? null);

        $findExisting = $database->prepare(<<<'SQL'
            SELECT 1 FROM furniture_items WHERE url = ?
            UNION ALL
            SELECT 1 FROM furniture_item_variations WHERE url = ? AND id <> ?
            LIMIT 1
            SQL);
        $findExisting->execute([$url, $url, $variationId]);
        if ($findExisting->fetchColumn() !== false) {
            throw new ApiException('Este link já está no catálogo', 409);
        }

        $host = (string) (parse_url($url, PHP_URL_HOST) ?: 'site');
        $source = preg_replace('/^www\./i', '', $host) ?: $host;
        $update = $database->prepare(<<<'SQL'
            UPDATE furniture_item_variations
            SET url = ?, title = ?, image_url = ?, price = ?, source = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND item_id = ?
              AND EXISTS (
                SELECT 1 FROM furniture_items
                WHERE furniture_items.id = furniture_item_variations.item_id
                  AND furniture_items.deleted_at IS NULL
              )
            SQL);
        $update->execute([$url, $title, $imageUrl, $price, $source, $variationId, $itemId]);
        if ($update->rowCount() === 0) {
            $exists = $database->prepare('SELECT 1 FROM furniture_item_variations WHERE id = ? AND item_id = ?');
            $exists->execute([$variationId, $itemId]);
            if ($exists->fetchColumn() === false) {
                throw new ApiException('Variação não encontrada', 404);
            }
        }

        $find = $database->prepare('SELECT * FROM furniture_item_variations WHERE id = ? AND item_id = ?');
        $find->execute([$variationId, $itemId]);
        $variation = $find->fetch();
        if (!is_array($variation)) {
            throw new ApiException('Variação não encontrada', 404);
        }
        sendJson(mapFurnitureVariation($variation));
    }

    if ($method === 'PATCH' && preg_match('#^/furniture/items/(?<id>\d+)$#', $path, $match) === 1) {
        $id = positiveInteger($match['id'], 'id');
        $body = jsonBody();
        $categoryId = positiveInteger($body['categoryId'] ?? null, 'categoryId');
        $url = canonicalHttpUrl($body['url'] ?? null);
        $title = nonEmptyText($body['title'] ?? null, 'title');
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

        $findExisting = $database->prepare(<<<'SQL'
            SELECT 1 FROM furniture_items WHERE url = ? AND id <> ?
            UNION ALL
            SELECT 1 FROM furniture_item_variations WHERE url = ?
            LIMIT 1
            SQL);
        $findExisting->execute([$url, $id, $url]);
        if ($findExisting->fetchColumn() !== false) {
            throw new ApiException('Este link já está no catálogo', 409);
        }

        $host = (string) (parse_url($url, PHP_URL_HOST) ?: 'site');
        $source = preg_replace('/^www\./i', '', $host) ?: $host;
        $update = $database->prepare(<<<'SQL'
            UPDATE furniture_items
            SET category_id = ?, url = ?, title = ?, image_url = ?, price = ?, source = ?,
                is_seeded = 0, updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND deleted_at IS NULL
            SQL);
        $update->execute([$categoryId, $url, $title, $imageUrl, $price, $source, $id]);
        if ($update->rowCount() === 0) {
            $exists = $database->prepare('SELECT 1 FROM furniture_items WHERE id = ? AND deleted_at IS NULL');
            $exists->execute([$id]);
            if ($exists->fetchColumn() === false) {
                throw new ApiException('Item não encontrado', 404);
            }
        }

        $find = $database->prepare(<<<'SQL'
            SELECT i.*, c.name AS category_name, c.color AS category_color
            FROM furniture_items i
            JOIN furniture_categories c ON c.id = i.category_id
            WHERE i.id = ? AND i.deleted_at IS NULL
            SQL);
        $find->execute([$id]);
        $item = $find->fetch();
        if (!is_array($item)) {
            throw new ApiException('Item não encontrado', 404);
        }
        sendJson(mapFurniture($item));
    }

    if ($method === 'DELETE' && preg_match('#^/furniture/items/(?<itemId>\d+)/variations/(?<variationId>\d+)$#', $path, $match) === 1) {
        $delete = $database->prepare(<<<'SQL'
            DELETE FROM furniture_item_variations
            WHERE id = ? AND item_id = ?
              AND EXISTS (
                SELECT 1 FROM furniture_items
                WHERE furniture_items.id = furniture_item_variations.item_id
                  AND furniture_items.deleted_at IS NULL
              )
            SQL);
        $delete->execute([
            positiveInteger($match['variationId'], 'variationId'),
            positiveInteger($match['itemId'], 'itemId'),
        ]);
        if ($delete->rowCount() === 0) {
            throw new ApiException('Variação não encontrada', 404);
        }
        sendNoContent();
    }

    if ($method === 'DELETE' && preg_match('#^/furniture/items/(?<id>\d+)$#', $path, $match) === 1) {
        $delete = $database->prepare(
            'UPDATE furniture_items SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP '
            . 'WHERE id = ? AND deleted_at IS NULL',
        );
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

    if ($method === 'GET' && $path === '/financing-simulations') {
        $rows = $database->query('SELECT * FROM financing_simulations ORDER BY created_at DESC, id DESC')->fetchAll();
        sendJson(array_map('mapFinancingSimulation', $rows));
    }

    if ($method === 'POST' && $path === '/financing-simulations') {
        $body = jsonBody();
        $name = cleanText($body['name'] ?? null, 'name', 2, 80);
        $propertyValue = positiveNumber($body['propertyValue'] ?? null, 'propertyValue');
        $downPayment = nonNegativeNumber($body['downPayment'] ?? 0, 'downPayment');
        $financedAmount = positiveNumber($body['financedAmount'] ?? null, 'financedAmount');
        $annualRate = positiveNumber($body['annualRate'] ?? null, 'annualRate', 100);
        $termMonths = positiveInteger($body['termMonths'] ?? null, 'termMonths');
        if ($termMonths > 600) {
            throw new ApiException('O campo termMonths informado é inválido');
        }
        $system = $body['system'] ?? null;
        if (!in_array($system, ['price', 'sac'], true)) {
            throw new ApiException('O sistema de amortização precisa ser "price" ou "sac"');
        }
        $lender = cleanText($body['lender'] ?? null, 'lender', 2, 60);
        $firstInstallment = positiveNumber($body['firstInstallment'] ?? null, 'firstInstallment');
        $lastInstallment = positiveNumber($body['lastInstallment'] ?? null, 'lastInstallment');
        $totalPaid = positiveNumber($body['totalPaid'] ?? null, 'totalPaid', 1_000_000_000);
        $totalInterest = nonNegativeNumber($body['totalInterest'] ?? null, 'totalInterest', 1_000_000_000);

        $insert = $database->prepare(<<<'SQL'
            INSERT INTO financing_simulations (
                name, property_value, down_payment, financed_amount, annual_rate, term_months,
                system, lender, first_installment, last_installment, total_paid, total_interest
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            SQL);
        $insert->execute([
            $name, $propertyValue, $downPayment, $financedAmount, $annualRate, $termMonths,
            $system, $lender, $firstInstallment, $lastInstallment, $totalPaid, $totalInterest,
        ]);

        $find = $database->prepare('SELECT * FROM financing_simulations WHERE id = ?');
        $find->execute([(int) $database->lastInsertId()]);
        $simulation = $find->fetch();
        if (!is_array($simulation)) {
            throw new RuntimeException('Não foi possível criar a simulação');
        }
        sendJson(mapFinancingSimulation($simulation), 201);
    }

    if ($method === 'DELETE' && preg_match('#^/financing-simulations/(?<id>\d+)$#', $path, $match) === 1) {
        $delete = $database->prepare('DELETE FROM financing_simulations WHERE id = ?');
        $delete->execute([positiveInteger($match['id'], 'id')]);
        if ($delete->rowCount() === 0) {
            throw new ApiException('Simulação não encontrada', 404);
        }
        sendNoContent();
    }

    throw new ApiException('Rota não encontrada', 404);
} catch (ApiException $error) {
    sendJson(['message' => $error->getMessage()], $error->status);
} catch (Throwable $error) {
    $errorId = writeApiErrorLog($error, $requestContext);
    sendJson(['message' => 'Erro interno da API', 'errorId' => $errorId], 500);
}
