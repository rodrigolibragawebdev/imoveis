# Tarefas — lista da casa em lista

- [x] **T1 — Persistir compra**
  - Criar migration, serializer, tipo, store e endpoint de status.
  - Gate: migration reaplicável e booleano serializado.
- [x] **T2 — Operações em lote**
  - Criar importação transacional e exclusão por IDs validados.
  - Gate: limites, duplicatas, prepared statements e rollback.
- [x] **T3 — Lista responsiva**
  - Substituir grade por linhas com foto, descrição, preço, metadados e CTAs.
  - Gate: desktop/mobile, estados selecionado/comprado e acessibilidade.
- [x] **T4 — Importador JSON**
  - Permitir colar/abrir arquivo, validar e exibir exemplo.
  - Gate: erros por posição, categoria por nome e botão bloqueado em payload inválido.
- [x] **T5 — Seleção e exclusão**
  - Implementar seleção individual/total, resumo e confirmação.
  - Gate: seleção limitada aos itens visíveis e limpeza após exclusão/filtro.
- [x] **T6 — Validação e documentação**
  - Atualizar teste, README, specs, AGENTS.md e CLAUDE.md.
  - Gate: typecheck, build, PHP lint, integração e diff check.

