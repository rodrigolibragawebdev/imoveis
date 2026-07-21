<?php

declare(strict_types=1);

function normalizeAgencyKeyword(string $value): string
{
    return preg_replace('/[^a-z0-9]+/', '', foldText($value)) ?? '';
}

function propertyHostMatchKey(string $url): string
{
    $host = strtolower((string) (parse_url($url, PHP_URL_HOST) ?? ''));
    return preg_replace('/[^a-z0-9]+/', '', $host) ?? '';
}

/** @return array<int, array<string, mixed>> */
function listRealEstateAgencies(PDO $database): array
{
    $rows = $database
        ->query('SELECT * FROM real_estate_agencies ORDER BY name COLLATE NOCASE')
        ->fetchAll();
    return array_map('mapRealEstateAgency', $rows);
}

/**
 * The most specific keyword wins when more than one agency matches a hostname.
 *
 * @param array<int, array<string, mixed>> $agencies
 * @return array<string, mixed>|null
 */
function matchRealEstateAgency(string $url, array $agencies): ?array
{
    $hostKey = propertyHostMatchKey($url);
    if ($hostKey === '') {
        return null;
    }

    $matches = array_values(array_filter(
        $agencies,
        static fn (array $agency): bool => ($agency['normalizedKeyword'] ?? '') !== ''
            && str_contains($hostKey, (string) $agency['normalizedKeyword']),
    ));
    usort($matches, static function (array $left, array $right): int {
        $specificity = strlen((string) $right['normalizedKeyword']) <=> strlen((string) $left['normalizedKeyword']);
        return $specificity !== 0 ? $specificity : ((int) $left['id'] <=> (int) $right['id']);
    });

    return $matches[0] ?? null;
}

/** @return array{evaluated: int, matched: int, changed: int} */
function reevaluateAutomaticPropertyAgencies(PDO $database): array
{
    $agencies = listRealEstateAgencies($database);
    $properties = $database
        ->query("SELECT id, url, agency_id FROM properties WHERE agency_match_mode = 'automatic'")
        ->fetchAll();
    $update = $database->prepare(
        "UPDATE properties SET agency_id = ? WHERE id = ? AND agency_match_mode = 'automatic'",
    );
    $matched = 0;
    $changed = 0;

    $database->beginTransaction();
    try {
        foreach ($properties as $property) {
            $agency = matchRealEstateAgency((string) $property['url'], $agencies);
            $agencyId = $agency !== null ? (int) $agency['id'] : null;
            if ($agencyId !== null) {
                $matched++;
            }
            $currentAgencyId = $property['agency_id'] !== null ? (int) $property['agency_id'] : null;
            if ($currentAgencyId === $agencyId) {
                continue;
            }
            $update->execute([$agencyId, (int) $property['id']]);
            $changed++;
        }
        $database->commit();
    } catch (Throwable $error) {
        if ($database->inTransaction()) {
            $database->rollBack();
        }
        throw $error;
    }

    return ['evaluated' => count($properties), 'matched' => $matched, 'changed' => $changed];
}
