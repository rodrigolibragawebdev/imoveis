# Pontos de atenção

- Sites podem bloquear crawlers ou renderizar preço apenas via JavaScript; nesse caso o sistema cadastra fallback.
- A proteção SSRF valida DNS e cada redirecionamento, mas produção pública ainda deveria usar proxy de saída dedicado.

