# Design técnico — lista da casa em lista

## Dados e API

A migration `008_furniture_purchase_status.php` adiciona `furniture_items.is_purchased` com default falso e índice próprio. `mapFurniture` expõe o campo booleano `isPurchased`.

Endpoints:

- `PATCH /furniture/items/:id/purchased`: valida booleano e atualiza o status.
- `POST /furniture/items/bulk`: valida de 1 a 50 itens, impede duplicatas, prepara previews e grava tudo em transação.
- `DELETE /furniture/items/bulk`: valida de 1 a 100 IDs positivos e exclui com placeholders preparados.

O frontend converte `category` por nome em `categoryId`; a API recebe somente o contrato canônico tipado. A store aplica compra de forma otimista e reverte se a API falhar.

## Componentes

- `FurnitureCatalog`: container; coordena carregamento, filtros, seleção, operações e feedback.
- `FurnitureListItem`: linha apresentacional; recebe item/seleção e emite compra, edição, exclusão e seleção.
- `FurnitureImportDialog`: lê texto/arquivo, valida o contrato, mostra exemplo e emite itens normalizados.
- `FurnitureFilters`: mantém categoria e ordenação.
- `FurnitureItemForm` e `CategoryForm`: preservam os fluxos individuais existentes.
- `ConfirmDialog` global: recebe do container as confirmações individual e em lote, com foco seguro em “Cancelar”.

## Estados visuais

- Normal: fundo creme, metadados suaves e preço em terracota.
- Selecionado: borda terracota e halo discreto.
- Comprado: fundo verde suave, imagem dessaturada, selo e título riscado.
- Mobile: linha reorganizada em foto/descrição, preço e barra de ações sem rolagem horizontal.

## Segurança e limites

- Arquivo local limitado a 100 KB no cliente.
- Corpo geral limitado por `jsonBody()` na API.
- Lote limitado a 50 itens e exclusão a 100 IDs.
- URLs aceitam apenas HTTP(S), sem credenciais.
- Nenhum HTML importado é renderizado como markup.
- SQL usa consultas preparadas; gravação do lote usa transação.
