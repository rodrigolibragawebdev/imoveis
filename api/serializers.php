<?php

declare(strict_types=1);

/** @param array<string, mixed> $row */
function mapProperty(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'url' => (string) $row['url'],
        'normalizedUrl' => $row['normalized_url'] !== null ? (string) $row['normalized_url'] : null,
        'title' => (string) $row['title'],
        'imageUrl' => $row['image_url'] !== null ? (string) $row['image_url'] : null,
        'price' => $row['price'] !== null ? (float) $row['price'] : null,
        'source' => (string) $row['source'],
        'location' => $row['location'] !== null ? (string) $row['location'] : null,
        'rating' => $row['rating'] !== null ? (string) $row['rating'] : null,
        'preferenceScore' => $row['preference_score'] !== null ? (int) $row['preference_score'] : null,
        'note' => (string) $row['note'],
        'createdAt' => (string) $row['created_at'],
        'updatedAt' => (string) $row['updated_at'],
    ];
}

/** @param array<string, mixed> $row */
function mapCategory(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'name' => (string) $row['name'],
        'color' => (string) $row['color'],
        'createdAt' => (string) $row['created_at'],
    ];
}

/** @param array<string, mixed> $row */
function mapFurnitureVariation(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'itemId' => (int) $row['item_id'],
        'url' => (string) $row['url'],
        'title' => (string) $row['title'],
        'imageUrl' => $row['image_url'] !== null ? (string) $row['image_url'] : null,
        'price' => $row['price'] !== null ? (float) $row['price'] : null,
        'source' => (string) $row['source'],
        'createdAt' => (string) $row['created_at'],
        'updatedAt' => (string) $row['updated_at'],
    ];
}

/**
 * @param array<string, mixed> $row
 * @param array<int, array<string, mixed>> $variations
 */
function mapFurniture(array $row, array $variations = []): array
{
    return [
        'id' => (int) $row['id'],
        'categoryId' => (int) $row['category_id'],
        'categoryName' => (string) $row['category_name'],
        'categoryColor' => (string) $row['category_color'],
        'url' => (string) $row['url'],
        'title' => (string) $row['title'],
        'imageUrl' => $row['image_url'] !== null ? (string) $row['image_url'] : null,
        'price' => $row['price'] !== null ? (float) $row['price'] : null,
        'source' => (string) $row['source'],
        'isSeeded' => (bool) $row['is_seeded'],
        'isPurchased' => (bool) ($row['is_purchased'] ?? false),
        'deletedAt' => isset($row['deleted_at']) && $row['deleted_at'] !== null ? (string) $row['deleted_at'] : null,
        'variations' => array_map('mapFurnitureVariation', $variations),
        'createdAt' => (string) $row['created_at'],
        'updatedAt' => (string) ($row['updated_at'] ?? $row['created_at']),
    ];
}

/** @param array<string, mixed> $row */
function mapNeighborhood(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'name' => (string) $row['name'],
        'createdAt' => (string) $row['created_at'],
    ];
}

/** @param array<string, mixed> $row */
function mapTip(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'title' => (string) $row['title'],
        'content' => (string) $row['content'],
        'sortOrder' => (int) $row['sort_order'],
    ];
}

/**
 * @param array<string, mixed> $row
 * @param array<int, array<string, mixed>> $notes
 * @param array<int, array<string, mixed>> $photos
 */
function mapAgendamentoRow(array $row, array $notes, array $photos): array
{
    return [
        'id' => (int) $row['id'],
        'propertyId' => (int) $row['property_id'],
        'property' => [
            'id' => (int) $row['property_id'],
            'title' => (string) $row['title'],
            'imageUrl' => $row['image_url'] !== null ? (string) $row['image_url'] : null,
            'price' => $row['price'] !== null ? (float) $row['price'] : null,
            'source' => (string) $row['source'],
            'location' => $row['location'] !== null ? (string) $row['location'] : null,
            'url' => (string) $row['property_url'],
        ],
        'advanced' => $row['advanced'] === null ? null : (bool) $row['advanced'],
        'active' => (bool) $row['active'],
        'notes' => array_map(static fn (array $note): array => [
            'id' => (int) $note['id'],
            'content' => (string) $note['content'],
            'createdAt' => (string) $note['created_at'],
        ], $notes),
        'photos' => array_map(static fn (array $photo): array => [
            'id' => (int) $photo['id'],
            'url' => "/agendamentos/{$row['id']}/photos/{$photo['id']}/file",
            'createdAt' => (string) $photo['created_at'],
        ], $photos),
        'createdAt' => (string) $row['created_at'],
        'updatedAt' => (string) $row['updated_at'],
    ];
}

/** @param array<string, mixed> $row */
function mapFinancingSimulation(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'name' => (string) $row['name'],
        'propertyValue' => (float) $row['property_value'],
        'downPayment' => (float) $row['down_payment'],
        'financedAmount' => (float) $row['financed_amount'],
        'annualRate' => (float) $row['annual_rate'],
        'termMonths' => (int) $row['term_months'],
        'system' => (string) $row['system'],
        'lender' => (string) $row['lender'],
        'firstInstallment' => (float) $row['first_installment'],
        'lastInstallment' => (float) $row['last_installment'],
        'totalPaid' => (float) $row['total_paid'],
        'totalInterest' => (float) $row['total_interest'],
        'createdAt' => (string) $row['created_at'],
    ];
}
