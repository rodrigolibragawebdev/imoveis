# Estado

Em 21/07/2026, a lista da casa passou de cards em grade para linhas responsivas e ganhou status comprado persistente, importação JSON retomável em lotes, variações opcionais e lixeira com soft delete. Itens removidos recebem `deleted_at`, deixam a lista ativa, preservam compra/variações e podem ser restaurados individualmente ou todos de uma vez. A importação envia requisições sequenciais de até 10 itens, salva checkpoints por conteúdo no `localStorage` e ignora somente nomes normalizados repetidos, mantendo o teto técnico de 100 KB. URLs iguais com nomes diferentes são aceitas e títulos não possuem limite específico de caracteres. Erros internos geram código de correlação e log protegido em `storage/logs`. Typecheck, build de produção, lint PHP e integração foram aprovados.

## Preferências registradas

- Manter o teste de integração PHP e os gates de typecheck/build; testes de componente frontend ainda não estão configurados.
- Priorizar classes inline/utility; CSS customizado apenas quando agrega identidade visual.
- Evitar arquitetura excessivamente cerimonial.
- Em PowerShell no Windows, usar `npm.cmd` porque `npm.ps1` pode ser bloqueado pela Execution Policy.

## Observações

- O teste de integração pode emitir no Windows um warning de `unlink` após imprimir `OK`, causado por lock temporário do SQLite durante o cleanup.
