# Decisões

- Workspace npm somente para o frontend; Node.js não executa a API.
- API PHP 8.2 sem framework nem Composer, compatível com o mesmo Git Deploy da Hostinger.
- SQLite via PDO, mantido fora de `public_html` em produção para sobreviver aos redeploys.
- PrimeVue em modo styled com PrimeFlex para priorizar classes utilitárias no markup.
- Avaliação de imóvel como enum (`liked`, `disliked`, `terrible`) em vez de pontuação ambígua.
- Preview de link na API PHP, com bloqueio de destinos privados para reduzir risco de SSRF.
- Portas padrão 5176 (web) e 5177 (API), livres na máquina em 14/07/2026 e configuráveis por ambiente.
- Lista da casa em linhas responsivas para privilegiar comparação rápida e ações operacionais.
- Status de compra persistido em `furniture_items.is_purchased`, com atualização otimista e rollback no frontend.
- Importação de móveis limitada a 50 itens e gravada em transação; exclusão em lote limitada a 100 IDs validados.
- JSON de importação usa nome de categoria na interface por legibilidade e `categoryId` no contrato canônico da API.
