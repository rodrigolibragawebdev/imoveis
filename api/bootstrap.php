<?php

declare(strict_types=1);

final class ApiException extends RuntimeException
{
    public function __construct(
        string $message,
        public readonly int $status = 400,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, 0, $previous);
    }
}

function loadEnvironmentFile(string $path): void
{
    if (!is_readable($path)) {
        return;
    }

    $allowedKeys = ['APP_ORIGIN', 'IMOVEIS_DATABASE_PATH'];
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }

        [$key, $value] = array_map('trim', explode('=', $line, 2));
        if (!in_array($key, $allowedKeys, true) || getenv($key) !== false) {
            continue;
        }

        if (strlen($value) >= 2) {
            $first = $value[0];
            $last = $value[strlen($value) - 1];
            if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                $value = substr($value, 1, -1);
            }
        }

        putenv("{$key}={$value}");
        $_ENV[$key] = $value;
    }
}

loadEnvironmentFile(dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env');

function sendJson(mixed $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    exit;
}

function sendNoContent(): never
{
    http_response_code(204);
    exit;
}

function sendFile(string $path, string $mimeType): never
{
    if (!is_file($path)) {
        throw new ApiException('Arquivo não encontrado', 404);
    }

    header('Content-Type: ' . $mimeType);
    header('Content-Length: ' . (string) filesize($path));
    readfile($path);
    exit;
}

/** @return array<string, mixed> */
function jsonBody(): array
{
    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > 100_000) {
        throw new ApiException('O corpo da requisição é grande demais', 413);
    }

    $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
    if (!str_starts_with($contentType, 'application/json')) {
        throw new ApiException('Envie os dados como application/json', 415);
    }

    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        throw new ApiException('O corpo da requisição está vazio');
    }

    try {
        $decoded = json_decode($raw, true, 64, JSON_THROW_ON_ERROR);
    } catch (JsonException $error) {
        throw new ApiException('O JSON enviado é inválido', 400, $error);
    }

    if (!is_array($decoded)) {
        throw new ApiException('O corpo da requisição precisa ser um objeto JSON');
    }

    return $decoded;
}

function requestPath(): string
{
    $uriPath = parse_url((string) ($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
    $uriPath = is_string($uriPath) ? rawurldecode($uriPath) : '/';
    $scriptName = str_replace('\\', '/', (string) ($_SERVER['SCRIPT_NAME'] ?? '/api/index.php'));
    $basePath = rtrim(str_replace('\\', '/', dirname($scriptName)), '/');

    if ($basePath !== '' && str_starts_with($uriPath, $basePath)) {
        return '/' . ltrim(substr($uriPath, strlen($basePath)), '/');
    }

    $apiPosition = strpos($uriPath, '/api/');
    if ($apiPosition !== false) {
        return '/' . ltrim(substr($uriPath, $apiPosition + 5), '/');
    }

    return '/' . ltrim($uriPath, '/');
}

function canonicalOrigin(string $value): ?string
{
    $origin = rtrim(trim($value), '/');
    $parts = parse_url($origin);
    if (
        !is_array($parts)
        || !isset($parts['scheme'], $parts['host'])
        || !in_array(strtolower((string) $parts['scheme']), ['http', 'https'], true)
        || isset($parts['user'])
        || isset($parts['pass'])
        || isset($parts['query'])
        || isset($parts['fragment'])
        || (isset($parts['path']) && $parts['path'] !== '')
    ) {
        return null;
    }

    $scheme = strtolower((string) $parts['scheme']);
    $host = strtolower((string) $parts['host']);
    $port = isset($parts['port']) ? ':' . (int) $parts['port'] : '';
    return "{$scheme}://{$host}{$port}";
}

/** @return list<string> */
function allowedRequestOrigins(): array
{
    $configuredOrigin = canonicalOrigin((string) (getenv('APP_ORIGIN') ?: 'https://www.toolsfera.com'));
    return array_values(array_unique(array_filter([
        $configuredOrigin,
        'https://toolsfera.com',
        'https://www.toolsfera.com',
    ], static fn (?string $origin): bool => $origin !== null)));
}

function requireAllowedOrigin(): void
{
    $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
    if ($origin === '') {
        return;
    }

    $canonicalOrigin = canonicalOrigin($origin);
    if ($canonicalOrigin === null || !in_array($canonicalOrigin, allowedRequestOrigins(), true)) {
        throw new ApiException('Origem não permitida', 403);
    }

    header('Access-Control-Allow-Origin: ' . $canonicalOrigin);
    header('Vary: Origin');
}

function canonicalHttpUrl(mixed $value, string $field = 'link'): string
{
    if (!is_string($value)) {
        throw new ApiException("O campo {$field} precisa ser um link");
    }

    $url = trim($value);
    $parts = parse_url($url);
    $scheme = strtolower((string) ($parts['scheme'] ?? ''));

    if (
        $url === ''
        || filter_var($url, FILTER_VALIDATE_URL) === false
        || !in_array($scheme, ['http', 'https'], true)
        || empty($parts['host'])
    ) {
        throw new ApiException("Use um {$field} iniciado por http:// ou https://");
    }

    if (isset($parts['user']) || isset($parts['pass'])) {
        throw new ApiException('Links com credenciais não são permitidos');
    }

    return preg_replace('/#.*$/', '', $url) ?? $url;
}

function positiveInteger(mixed $value, string $field): int
{
    $number = filter_var($value, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if ($number === false) {
        throw new ApiException("O campo {$field} precisa ser um número inteiro positivo");
    }
    return (int) $number;
}

function cleanText(mixed $value, string $field, int $minimum, int $maximum): string
{
    if (!is_string($value)) {
        throw new ApiException("O campo {$field} precisa ser um texto");
    }

    $text = trim($value);
    $length = mb_strlen($text);
    if ($length < $minimum || $length > $maximum) {
        throw new ApiException("O campo {$field} precisa ter entre {$minimum} e {$maximum} caracteres");
    }
    return $text;
}

function nonEmptyText(mixed $value, string $field): string
{
    if (!is_string($value)) {
        throw new ApiException("O campo {$field} precisa ser um texto");
    }

    $text = trim($value);
    if ($text === '') {
        throw new ApiException("O campo {$field} não pode ficar vazio");
    }
    return $text;
}

function optionalPrice(mixed $value): ?float
{
    if ($value === null || $value === '') {
        return null;
    }
    if (!is_numeric($value)) {
        throw new ApiException('O preço precisa ser um número');
    }
    $price = (float) $value;
    if (!is_finite($price) || $price < 0 || $price > 100_000_000) {
        throw new ApiException('O preço informado é inválido');
    }
    return $price;
}

function positiveNumber(mixed $value, string $field, float $max = 100_000_000): float
{
    if (!is_numeric($value)) {
        throw new ApiException("O campo {$field} precisa ser um número");
    }
    $number = (float) $value;
    if (!is_finite($number) || $number <= 0 || $number > $max) {
        throw new ApiException("O campo {$field} informado é inválido");
    }
    return $number;
}

function nonNegativeNumber(mixed $value, string $field, float $max = 100_000_000): float
{
    if (!is_numeric($value)) {
        throw new ApiException("O campo {$field} precisa ser um número");
    }
    $number = (float) $value;
    if (!is_finite($number) || $number < 0 || $number > $max) {
        throw new ApiException("O campo {$field} informado é inválido");
    }
    return $number;
}
