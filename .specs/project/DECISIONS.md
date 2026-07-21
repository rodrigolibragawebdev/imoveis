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
- Importação de móveis sem limite fixo de quantidade, limitada pelo corpo técnico de 100 KB e enviada em requisições sequenciais de até 10 itens; cada requisição grava em transação. A exclusão em lote aceita todos os IDs validados e os processa em blocos de 500 dentro de uma única transação.
- Checkpoints de importação ficam no `localStorage`, indexados pelo hash do conteúdo normalizado, e avançam somente após resposta bem-sucedida do lote.
- Na importação, somente nomes normalizados iguais são duplicatas; URL repetida com nomes diferentes é aceita. Títulos não possuem limite específico de caracteres.
- JSON de importação usa nome de categoria na interface por legibilidade e `categoryId` no contrato canônico da API.
- Variações são registros filhos do item principal, com URL única e exclusão em cascata; somente o link é obrigatório para criar uma opção.
- Toda resposta de erro possui código de correlação e log JSON Lines diário em `storage/logs`, sem corpo, headers ou cookies da requisição.
- Itens principais usam soft delete com `deleted_at`; ficam fora da lista ativa e podem ser restaurados. A exclusão física só existe na lixeira, somente para inativos, individualmente ou em lote, com confirmação irreversível e cascade das variações.
