# Design técnico — lista da casa em lista

## Dados e API

A migration `008_furniture_purchase_status.php` adiciona `furniture_items.is_purchased` com default falso e índice próprio. `mapFurniture` expõe o campo booleano `isPurchased`.

Endpoints:

- `PATCH /furniture/items/:id/purchased`: valida booleano e atualiza o status.
- `POST /furniture/items/bulk`: valida o lote recebido, resolve os previews, ignora nomes normalizados já vistos e grava a requisição em transação. A migration `010_allow_repeated_furniture_urls.php` permite URLs iguais em itens principais com nomes diferentes.
- `DELETE /furniture/items/bulk`: valida todos os IDs positivos e aplica soft delete em blocos de 500 dentro de uma única transação.

O frontend converte `category` por nome em `categoryId`; a API recebe somente o contrato canônico tipado. A store divide a lista em lotes sequenciais de até 10 itens, calcula SHA-256 do conteúdo normalizado, salva o número de lotes concluídos no `localStorage` e expõe o progresso. A store aplica compra de forma otimista e reverte se a API falhar.

## Componentes

- `FurnitureCatalog`: container; coordena carregamento, filtros, busca textual derivada com debounce de 300 ms e limpeza de timeout, seleção, operações e feedback.
- `FurnitureListItem`: linha apresentacional; recebe item/seleção e emite compra, edição, exclusão e seleção.
- `FurnitureImportDialog`: lê texto/arquivo, valida o contrato, mostra exemplo e emite itens normalizados.
- `FurnitureFilters`: apresenta categoria, busca textual e ordenação; o texto usa `v-model` tipado e não dispara requisições.
- `FurnitureItemForm` e `CategoryForm`: preservam os fluxos individuais existentes.
- `ConfirmDialog` global: recebe do container as confirmações individual e em lote, com foco seguro em “Cancelar”.

## Estados visuais

- Normal: fundo creme, metadados suaves e preço em terracota.
- Selecionado: borda terracota e halo discreto.
- Comprado: fundo verde suave, imagem dessaturada, selo e título riscado.
- Busca: o campo atualiza imediatamente, mas a comparação local normalizada por caixa/acentos aguarda 300 ms; contador e seleção usam somente `visibleItems`.
- Mobile: linha reorganizada em foto/descrição, preço e barra de ações sem rolagem horizontal.

## Segurança e limites

- Arquivo local limitado a 100 KB no cliente.
- Corpo geral limitado por `jsonBody()` na API.
- Arquivo sem limite fixo de contagem, limitado a 100 KB e repartido pelo frontend em lotes de até 10 itens; importação e exclusão não possuem teto fixo de quantidade na API.
- URLs aceitam apenas HTTP(S), sem credenciais.
- Nenhum HTML importado é renderizado como markup.
- SQL usa consultas preparadas; cada requisição de importação usa transação.
- Previews da importação possuem orçamento total de 2 segundos por link para o lote não exceder o tempo usual da hospedagem.
- `writeApiErrorLog()` grava JSON Lines diário em `storage/logs`; a resposta expõe apenas o código de correlação.
