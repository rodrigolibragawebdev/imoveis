# Design técnico — lixeira da lista da casa

## Dados e API

A migration 011 adiciona `furniture_items.deleted_at TEXT NULL` e índice. Consultas ativas usam `deleted_at IS NULL`.

Endpoints:

- `GET /furniture/items/trash`: lista itens inativos mais recentes primeiro.
- `DELETE /furniture/items/:id`: soft delete individual.
- `DELETE /furniture/items/bulk`: soft delete em blocos de 500 dentro de transação.
- `PATCH /furniture/items/:id/restore`: restauração individual.
- `PATCH /furniture/items/bulk/restore`: restauração em blocos de 500 dentro de transação.

## Frontend

- `furniture.ts`: mantém `trashItems` separado dos itens ativos e concentra carregamento/restauração.
- `FurnitureTrashDialog`: componente apresentacional com lista, vazio, restauração individual e total.
- `FurnitureCatalog`: abre/carrega a lixeira, coordena ações e feedback.

## Segurança

IDs passam por validação positiva e placeholders preparados. Operações em lote são transacionais. A feature não oferece hard delete.
