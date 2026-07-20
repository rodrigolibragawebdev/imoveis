<?php

declare(strict_types=1);

/** @return array<int, array<string, mixed>> */
function listAgendamentos(PDO $database): array
{
    $rows = $database->query(<<<'SQL'
        SELECT a.*, p.title, p.image_url, p.price, p.source, p.location, p.url AS property_url
        FROM agendamentos a
        JOIN properties p ON p.id = a.property_id
        ORDER BY a.created_at DESC, a.id DESC
        SQL)->fetchAll();

    return array_map(
        static fn (array $row): array => mapAgendamento($database, $row),
        $rows,
    );
}

function findAgendamento(PDO $database, int $id): ?array
{
    $query = $database->prepare(<<<'SQL'
        SELECT a.*, p.title, p.image_url, p.price, p.source, p.location, p.url AS property_url
        FROM agendamentos a
        JOIN properties p ON p.id = a.property_id
        WHERE a.id = ?
        SQL);
    $query->execute([$id]);
    $row = $query->fetch();
    if (!is_array($row)) {
        return null;
    }

    return mapAgendamento($database, $row);
}

/** @param array<string, mixed> $row */
function mapAgendamento(PDO $database, array $row): array
{
    $notesQuery = $database->prepare(
        'SELECT * FROM agendamento_notes WHERE agendamento_id = ? ORDER BY created_at ASC, id ASC',
    );
    $notesQuery->execute([$row['id']]);
    $photosQuery = $database->prepare(
        'SELECT * FROM agendamento_photos WHERE agendamento_id = ? ORDER BY created_at ASC, id ASC',
    );
    $photosQuery->execute([$row['id']]);

    return mapAgendamentoRow($row, $notesQuery->fetchAll(), $photosQuery->fetchAll());
}

function deleteAgendamentoPhotoFiles(PDO $database, int $agendamentoId): void
{
    $query = $database->prepare('SELECT file_path FROM agendamento_photos WHERE agendamento_id = ?');
    $query->execute([$agendamentoId]);
    foreach ($query->fetchAll(PDO::FETCH_COLUMN) as $filePath) {
        unlinkAgendamentoPhoto((string) $filePath);
    }
}

function deletePropertyAgendamentoPhotoFiles(PDO $database, int $propertyId): void
{
    $query = $database->prepare(<<<'SQL'
        SELECT ap.file_path
        FROM agendamento_photos ap
        JOIN agendamentos a ON a.id = ap.agendamento_id
        WHERE a.property_id = ?
        SQL);
    $query->execute([$propertyId]);
    foreach ($query->fetchAll(PDO::FETCH_COLUMN) as $filePath) {
        unlinkAgendamentoPhoto((string) $filePath);
    }
}

function unlinkAgendamentoPhoto(string $relativePath): void
{
    $fullPath = uploadsDirectory() . DIRECTORY_SEPARATOR . $relativePath;
    if (is_file($fullPath)) {
        @unlink($fullPath);
    }
}
