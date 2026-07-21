# Design técnico

## Banco e migrations

`database.php` abre o PDO e executa os arquivos ordenados de `api/migrations`. A tabela `schema_migrations` registra cada versão. A migration inicial reproduz o schema legado; as seguintes adicionam `normalized_url`, `updated_at` dos móveis, `preferred_neighborhoods` e a nota opcional `preference_score`. `seed.php` mantém os dados iniciais fora da conexão.

## API

- `ranking.php`: normalização de URL/texto, bairro inferido, score e candidatos duplicados.
- `serializers.php`: contratos JSON de imóveis, móveis, categorias, bairros e dicas.
- `GET /properties`: devolve ranking já ordenado, score, posição, bairro, preferência e sinais de duplicidade.
- `GET|POST /neighborhoods` e `DELETE /neighborhoods/:id`: gerencia bairros desejados.
- `PATCH /furniture/items/:id`: edita o card sem refazer preview involuntariamente.

Links equivalentes são comparados sem fragmento, parâmetros de tracking (`utm_*`, `_lc`, `gclid`, `fbclid`, `ref`) e diferenças triviais de host/barra. A proximidade é apenas heurística de revisão: mesmo bairro, mesmos quartos e área com diferença de até 2 m².

## Componentes Vue

- `PropertyBoard`: superfície de composição; carrega store e coordena toasts.
- `PropertyRankingToolbar`: recebe filtros, bairros e contagens; emite alterações e abertura da gestão de bairros.
- `PreferredNeighborhoodDialog`: lista bairros desejados; emite cadastro e remoção.
- `PropertyCard`: apresenta posição, bairro desejado e motivos de duplicidade; emite voto/exclusão.
- `FurnitureCatalog`: controla filtros, seleção em lote, diálogos e operações do catálogo.
- `FurnitureItemForm`: formulário único para criar/editar; recebe `item` e emite payload tipado.
- `FurnitureListItem`: apresenta foto, descrição, preço, metadados, compra, edição e remoção.
- `FurnitureImportDialog`: valida e normaliza importação JSON antes de enviá-la à store.

O visual segue a direção editorial orgânica já existente: Fraunces/Manrope, creme, floresta e terracota. O ranking ganha uma “mesa de decisão” compacta, com posição tipográfica e chips de filtro, sem transformar a tela em dashboard genérico.
