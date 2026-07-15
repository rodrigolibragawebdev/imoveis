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
function mapFurniture(array $row): array
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
