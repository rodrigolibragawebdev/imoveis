# Design técnico

## API

Rotas Express → controllers → services → repositories → SQLite. DTOs Zod validam entrada nos limites HTTP. O serviço de preview extrai Open Graph, JSON-LD e metadados comuns, mas mantém fallback baseado no domínio.

## Frontend

Views de rota são superfícies de composição. Stores Pinia cuidam de carregamento e mutações remotas. Formulários e cards usam props tipadas e eventos explícitos.

## Mapa de componentes

- `AppShell`: navegação e moldura global.
- `PropertyBoard`: orquestra cadastro e grade de imóveis.
- `PropertyLinkForm`: recebe links em lote e emite submissão.
- `PropertyCard`: apresenta e edita avaliação/nota sem navegação interna.
- `FurnitureCatalog`: orquestra categorias, filtros e itens.
- `FurnitureForm`: cadastra categoria e item.
- `FurnitureFilters`: emite filtro e ordenação.
- `FurnitureCard`: apresenta item e ação de remoção.
- `TipsView`: compõe conteúdo editorial futuro.

