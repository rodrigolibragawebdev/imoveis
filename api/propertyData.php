<?php

declare(strict_types=1);

/** @return array<int, array<string, mixed>> */
function listPreferredNeighborhoods(PDO $database): array
{
    $rows = $database
        ->query('SELECT * FROM preferred_neighborhoods ORDER BY name COLLATE NOCASE')
        ->fetchAll();
    return array_map('mapNeighborhood', $rows);
}

/** @return array<int, array<string, mixed>> */
function listRankedProperties(PDO $database): array
{
    $rows = $database
        ->query(<<<'SQL'
            SELECT properties.*, real_estate_agencies.name AS agency_name
            FROM properties
            LEFT JOIN real_estate_agencies ON real_estate_agencies.id = properties.agency_id
            ORDER BY properties.updated_at DESC, properties.id DESC
            SQL)
        ->fetchAll();
    $properties = array_map(
        static fn (array $row): array => enrichProperty(mapProperty($row)),
        $rows,
    );
    return decorateAndRankProperties($properties, listPreferredNeighborhoods($database));
}

function findRankedProperty(PDO $database, int $id): ?array
{
    foreach (listRankedProperties($database) as $property) {
        if ((int) $property['id'] === $id) {
            return $property;
        }
    }
    return null;
}
