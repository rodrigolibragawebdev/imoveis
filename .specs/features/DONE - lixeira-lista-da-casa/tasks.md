# Tarefas — lixeira da lista da casa

- [x] **T1 — Persistência**
  - Criar migration 011, serializer e tipo `deletedAt`.
  - Gate: upgrade preserva itens e variações.
- [x] **T2 — API ativa/inativa**
  - Filtrar consultas ativas, converter deletes e criar rotas de lixeira/restauração.
  - Gate: prepared statements, chunks e transações.
- [x] **T3 — Store**
  - Adicionar estado e ações de lixeira/restauração.
  - Gate: estado ativo e inativo não se misturam.
- [x] **T4 — Interface**
  - Criar `FurnitureTrashDialog` e integrar ao catálogo.
  - Gate: desktop/mobile, vazio, restaurar um/todos e feedback.
- [x] **T5 — Validação e documentação**
  - Atualizar integração, specs, README, AGENTS e arquitetura.
  - Gate: PHP lint, integração, smoke HTTP, typecheck, build e diff check.
- [x] **T6 — Exclusão permanente controlada**
  - Adicionar exclusão individual e esvaziamento da lixeira, com confirmação irreversível e cascade das variações.
  - Gate: somente inativos podem ser apagados; PHP lint, integração, typecheck, build, smoke HTTP e diff check.
