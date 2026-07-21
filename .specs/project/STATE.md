# Estado

Em 21/07/2026, a lista da casa passou de cards em grade para linhas responsivas e ganhou status comprado persistente, importação JSON retomável em lotes, variações opcionais e lixeira com soft delete. Itens removidos recebem `deleted_at`, deixam a lista ativa, preservam compra/variações e podem ser restaurados ou excluídos definitivamente, individualmente ou em lote. O hard delete só aceita itens inativos, exige confirmação irreversível na interface e remove variações em cascade. A importação envia requisições sequenciais de até 10 itens, salva checkpoints por conteúdo no `localStorage` e ignora somente nomes normalizados repetidos, mantendo o teto técnico de 100 KB. URLs iguais com nomes diferentes são aceitas e títulos não possuem limite específico de caracteres. Toda resposta de erro gera código de correlação e log protegido em `storage/logs`, sem corpo, headers ou cookies. Typecheck, build de produção, lint PHP e integração foram aprovados.

Em 21/07/2026, a comparação de imóveis ganhou cadastro de imobiliárias, match automático por palavra-chave no hostname e atribuição manual editável em cada card. Novos anúncios são identificados na entrada; o botão de reavaliação atualiza o acervo automático, preserva escolhas manuais e não interfere no desempate do ranking. A migration 012 mantém compatibilidade com bancos existentes. Lint PHP, integração, typecheck e build foram aprovados.

Na mesma data, a identificação de imobiliárias foi estendida aos imóveis agendados. Ranking e agendados compartilham `PropertyAgencyBadge` e `useRealEstateAgencies`; qualquer escolha altera o imóvel original e permanece consistente nas duas telas. O contrato aninhado de agendamentos passou a expor `agencyId`, `agencyName` e `agencyMatchMode`.

## Preferências registradas

- Manter o teste de integração PHP e os gates de typecheck/build; testes de componente frontend ainda não estão configurados.
- Priorizar classes inline/utility; CSS customizado apenas quando agrega identidade visual.
- Evitar arquitetura excessivamente cerimonial.
- Em PowerShell no Windows, usar `npm.cmd` porque `npm.ps1` pode ser bloqueado pela Execution Policy.

## Observações

- O teste de integração pode emitir no Windows um warning de `unlink` após imprimir `OK`, causado por lock temporário do SQLite durante o cleanup.
