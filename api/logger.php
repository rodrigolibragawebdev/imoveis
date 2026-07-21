<?php

declare(strict_types=1);

/**
 * Registra uma resposta de erro sem persistir corpo de requisição, cookies ou headers.
 * Retorna um identificador seguro para correlacionar a resposta com o arquivo de log.
 *
 * @param array<string, mixed> $context
 */
function writeApiErrorLog(Throwable $error, array $context = []): string
{
    try {
        $errorId = bin2hex(random_bytes(6));
    } catch (Throwable) {
        $errorId = substr(hash('sha256', uniqid('api-error-', true)), 0, 12);
    }

    $trace = array_map(
        static fn (array $frame): array => array_filter([
            'file' => isset($frame['file']) ? (string) $frame['file'] : null,
            'line' => isset($frame['line']) ? (int) $frame['line'] : null,
            'class' => isset($frame['class']) ? (string) $frame['class'] : null,
            'function' => isset($frame['function']) ? (string) $frame['function'] : null,
        ], static fn (mixed $value): bool => $value !== null),
        array_slice($error->getTrace(), 0, 12),
    );

    $record = [
        'timestamp' => gmdate('c'),
        'errorId' => $errorId,
        'request' => $context,
        'exception' => [
            'class' => $error::class,
            'message' => $error->getMessage(),
            'file' => $error->getFile(),
            'line' => $error->getLine(),
            'trace' => $trace,
        ],
    ];

    try {
        $configuredDirectory = getenv('IMOVEIS_LOG_DIRECTORY');
        $directory = is_string($configuredDirectory) && trim($configuredDirectory) !== ''
            ? rtrim($configuredDirectory, '/\\')
            : dirname(__DIR__) . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'logs';
        if (!is_dir($directory) && !mkdir($directory, 0770, true) && !is_dir($directory)) {
            throw new RuntimeException('Não foi possível criar storage/logs');
        }
        $encoded = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        $written = file_put_contents(
            $directory . DIRECTORY_SEPARATOR . 'api-' . gmdate('Y-m-d') . '.log',
            $encoded . PHP_EOL,
            FILE_APPEND | LOCK_EX,
        );
        if ($written === false) {
            throw new RuntimeException('Não foi possível escrever em storage/logs');
        }
    } catch (Throwable $logError) {
        error_log('[imoveis-api][' . $errorId . '] falha no logger: ' . $logError->getMessage());
        error_log('[imoveis-api][' . $errorId . '] ' . $error::class . ': ' . $error->getMessage());
    }

    return $errorId;
}
