# Design técnico — variações da lista da casa

## Persistência e contrato

A migration `009_furniture_item_variations.php` cria `furniture_item_variations` com FK para `furniture_items`, `ON DELETE CASCADE`, URL única, título, imagem, preço, origem e timestamps. O soft delete do item principal não aciona a FK e preserva as opções; o serializer as aninha em `FurnitureItem.variations`.

Endpoints:

- `POST /furniture/items/:itemId/variations` cria a partir do link e tenta preview.
- `PATCH /furniture/items/:itemId/variations/:variationId` atualiza os campos editáveis.
- `DELETE /furniture/items/:itemId/variations/:variationId` remove somente a opção.

Consultas de duplicidade consideram URLs de itens principais e variações. A store recarrega a lista após criação/edição e remove localmente após exclusão.

## Componentes

- `FurnitureCatalog`: coordena diálogo, CRUD, toasts e confirmações.
- `FurnitureVariationForm`: link obrigatório e complementos manuais recolhíveis.
- `FurnitureListItem`: grupo visual com linha principal, faixa **+ Variações** e filhos numerados.

## Hierarquia visual

O item principal ganha selo quando possui alternativas. A faixa de adição fica abaixo da linha principal. Cada filho usa recuo, conector terracota, borda tracejada, imagem compacta, rótulo numerado, preço e ações próprias. O tronco é composto por segmentos de cada filho até o seu centro, garantindo que alcance o último ramo em listas de qualquer tamanho; grupos com variações recebem margem inferior maior antes do próximo item.
