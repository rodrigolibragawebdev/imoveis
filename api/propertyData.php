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
        ->query('SELECT * FROM properties ORDER BY updated_at DESC, id DESC')
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
