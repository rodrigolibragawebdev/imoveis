<?php

declare(strict_types=1);

function foldText(?string $value): string
{
    if ($value === null) {
        return '';
    }

    $transliterated = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', mb_strtolower(trim($value), 'UTF-8'));
    $plain = $transliterated !== false ? $transliterated : mb_strtolower(trim($value), 'UTF-8');
    return trim(preg_replace('/[^a-z0-9]+/i', ' ', $plain) ?? '');
}

function normalizeLinkForComparison(string $url): string
{
    $canonical = canonicalHttpUrl($url);
    $parts = parse_url($canonical);
    $host = strtolower((string) ($parts['host'] ?? ''));
    $host = preg_replace('/^www\./', '', $host) ?? $host;
    $path = preg_replace('#/+#', '/', (string) ($parts['path'] ?? '/')) ?? '/';
    $path = rtrim($path, '/') ?: '/';

    $query = [];
    parse_str((string) ($parts['query'] ?? ''), $query);
    foreach (array_keys($query) as $key) {
        $normalizedKey = strtolower((string) $key);
        if (
            str_starts_with($normalizedKey, 'utm_')
            || in_array($normalizedKey, ['_lc', 'fbclid', 'gclid', 'ref', 'referrer', 'source'], true)
        ) {
            unset($query[$key]);
        }
    }
    ksort($query);
    $queryString = http_build_query($query, '', '&', PHP_QUERY_RFC3986);
    $port = isset($parts['port']) && !in_array((int) $parts['port'], [80, 443], true)
        ? ':' . (int) $parts['port']
        : '';

    return "https://{$host}{$port}{$path}" . ($queryString !== '' ? "?{$queryString}" : '');
}

function inferNeighborhood(?string $location): ?string
{
    if ($location === null || trim($location) === '') {
        return null;
    }
    $parts = array_values(array_filter(array_map('trim', explode(',', $location))));
    return $parts[0] ?? null;
}

/** @return array{rooms: ?int, area: ?float} */
function propertySignals(string $title): array
{
    $folded = foldText($title);
    $rooms = null;
    $area = null;

    if (preg_match('/\b(\d+)\s+(?:quarto|quartos|dormitorio|dormitorios)\b/', $folded, $match) === 1) {
        $rooms = (int) $match[1];
    }
    if (preg_match('/\b(\d+(?:[.,]\d+)?)\s*m2?\b/', mb_strtolower($title, 'UTF-8'), $match) === 1) {
        $area = (float) str_replace(',', '.', $match[1]);
    }

    return ['rooms' => $rooms, 'area' => $area];
}

/** @return array{type: string, confidence: string, reason: string}|null */
function duplicateReason(array $left, array $right): ?array
{
    $leftNormalizedUrl = (string) ($left['normalizedUrl'] ?: normalizeLinkForComparison((string) $left['url']));
    $rightNormalizedUrl = (string) ($right['normalizedUrl'] ?: normalizeLinkForComparison((string) $right['url']));
    if ($leftNormalizedUrl === $rightNormalizedUrl) {
        return [
            'type' => 'link',
            'confidence' => 'high',
            'reason' => 'Mesmo anúncio após remover parâmetros de rastreamento do link.',
        ];
    }

    $leftNeighborhood = foldText(inferNeighborhood($left['location']));
    $rightNeighborhood = foldText(inferNeighborhood($right['location']));
    if ($leftNeighborhood === '' || $leftNeighborhood !== $rightNeighborhood) {
        return null;
    }

    $leftSignals = propertySignals((string) $left['title']);
    $rightSignals = propertySignals((string) $right['title']);
    $sameRooms = $leftSignals['rooms'] !== null && $leftSignals['rooms'] === $rightSignals['rooms'];
    $sameArea = $leftSignals['area'] !== null
        && $rightSignals['area'] !== null
        && abs($leftSignals['area'] - $rightSignals['area']) <= 2;

    if ($sameRooms && $sameArea) {
        return [
            'type' => 'proximity',
            'confidence' => 'high',
            'reason' => 'Mesmo bairro, mesma quantidade de quartos e área praticamente igual.',
        ];
    }

    return null;
}

/** @return array<int, array<int, array<string, mixed>>> */
function duplicateMatches(array $properties): array
{
    $matches = [];
    $count = count($properties);
    for ($leftIndex = 0; $leftIndex < $count; $leftIndex++) {
        for ($rightIndex = $leftIndex + 1; $rightIndex < $count; $rightIndex++) {
            $left = $properties[$leftIndex];
            $right = $properties[$rightIndex];
            $reason = duplicateReason($left, $right);
            if ($reason === null) {
                continue;
            }

            $leftId = (int) $left['id'];
            $rightId = (int) $right['id'];
            $matches[$leftId][] = ['propertyId' => $rightId, ...$reason];
            $matches[$rightId][] = ['propertyId' => $leftId, ...$reason];
        }
    }
    return $matches;
}

function matchedPreferredNeighborhood(array $property, array $preferredNeighborhoods): ?string
{
    $haystack = foldText(((string) ($property['location'] ?? '')) . ' ' . ((string) ($property['title'] ?? '')));
    if ($haystack === '') {
        return null;
    }

    foreach ($preferredNeighborhoods as $neighborhood) {
        $needle = foldText((string) $neighborhood['name']);
        if ($needle !== '' && str_contains(" {$haystack} ", " {$needle} ")) {
            return (string) $neighborhood['name'];
        }
    }
    return null;
}

function propertyRankScore(array $property, bool $isPreferred): int
{
    $base = match ($property['rating']) {
        'liked' => 1000,
        'disliked' => -1000,
        'terrible' => -10000,
        default => 0,
    };
    return $base + ($isPreferred ? 100 : 0);
}

/** @return array<int, array<string, mixed>> */
function decorateAndRankProperties(array $properties, array $preferredNeighborhoods): array
{
    $matches = duplicateMatches($properties);
    foreach ($properties as &$property) {
        $property['normalizedUrl'] = $property['normalizedUrl']
            ?: normalizeLinkForComparison((string) $property['url']);
        $property['neighborhood'] = inferNeighborhood($property['location']);
        $property['matchedNeighborhood'] = matchedPreferredNeighborhood($property, $preferredNeighborhoods);
        $property['isPreferredNeighborhood'] = $property['matchedNeighborhood'] !== null;
        $property['rankScore'] = propertyRankScore($property, $property['isPreferredNeighborhood']);
        $property['duplicateMatches'] = $matches[(int) $property['id']] ?? [];
        $property['hasDuplicates'] = $property['duplicateMatches'] !== [];
    }
    unset($property);

    usort($properties, static function (array $left, array $right): int {
        $score = ((int) $right['rankScore']) <=> ((int) $left['rankScore']);
        if ($score !== 0) {
            return $score;
        }
        $updated = strcmp((string) $right['updatedAt'], (string) $left['updatedAt']);
        return $updated !== 0 ? $updated : ((int) $right['id'] <=> (int) $left['id']);
    });

    $position = 1;
    foreach ($properties as &$property) {
        $property['rankPosition'] = $property['rating'] === 'terrible' ? null : $position++;
    }
    unset($property);

    return $properties;
}
