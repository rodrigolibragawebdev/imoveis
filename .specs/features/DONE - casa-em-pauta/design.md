# Design técnico

## API

O router PHP valida as entradas, executa consultas preparadas via PDO e persiste em SQLite. O preview extrai Open Graph, JSON-LD e metadados comuns, mas mantém fallback baseado no domínio e na URL quando o portal bloqueia a consulta.

## Frontend

Views de rota são superfícies de composição. Stores Pinia cuidam de carregamento e mutações remotas. Formulários e cards usam props tipadas e eventos explícitos.

## Mapa de componentes

- `AppShell`: navegação e moldura global.
- `PropertyBoard`: orquestra cadastro e grade de imóveis.
- `PropertyLinkForm`: recebe links em lote e emite submissão.
- `PropertyCard`: apresenta e edita avaliação/nota sem navegação interna.
- `FurnitureCatalog`: orquestra categorias, filtros e itens.
- `CategoryForm` e `FurnitureItemForm`: cadastram categoria e criam/editam item.
- `FurnitureFilters`: emite filtro e ordenação.
- `FurnitureListItem`: apresenta item e ações; evolução detalhada em `DONE - lista-da-casa-em-lista`.
- `TipsView`: compõe conteúdo editorial futuro.
