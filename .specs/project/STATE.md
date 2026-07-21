# Estado

Em 21/07/2026, a lista da casa passou de cards em grade para linhas responsivas e ganhou status comprado persistente, importação JSON transacional e exclusão por seleção com diálogo PrimeVue. Typecheck, build de produção, lint PHP e integração foram aprovados. O teste PHP cobre migrations, serialização do status comprado, ranking, bairros, duplicatas e fallback do Zoom.

## Preferências registradas

- Manter o teste de integração PHP e os gates de typecheck/build; testes de componente frontend ainda não estão configurados.
- Priorizar classes inline/utility; CSS customizado apenas quando agrega identidade visual.
- Evitar arquitetura excessivamente cerimonial.
- Em PowerShell no Windows, usar `npm.cmd` porque `npm.ps1` pode ser bloqueado pela Execution Policy.

## Observações

- O teste de integração pode emitir no Windows um warning de `unlink` após imprimir `OK`, causado por lock temporário do SQLite durante o cleanup.
