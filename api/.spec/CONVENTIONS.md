# Convenções

`strict_types`, consultas preparadas, funções pequenas, camelCase no JSON, snake_case no SQLite e erros públicos via `ApiException`.

CORS usa allowlist exata e normalizada: `https://toolsfera.com`, `https://www.toolsfera.com` e a origem adicional de `APP_ORIGIN`. Nunca use wildcard nem aceite correspondência parcial de host.

Correspondência de imobiliária usa somente o hostname normalizado, nunca caminho/query/título. Em colisões, a palavra-chave mais longa vence; reavaliações não sobrescrevem `agency_match_mode = 'manual'`.
