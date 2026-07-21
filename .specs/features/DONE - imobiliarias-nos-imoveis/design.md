# Design técnico

## Persistência

A migration 012 cria `real_estate_agencies` e adiciona `agency_id` e `agency_match_mode` a `properties`. A FK usa `ON DELETE SET NULL`; o modo aceita `automatic` ou `manual`.

## API

- `agencies.php` normaliza palavras-chave, compara hostnames, resolve o match mais específico e reavalia imóveis automáticos.
- `GET|POST /real-estate-agencies`, `PATCH|DELETE /real-estate-agencies/:id`: CRUD da lista.
- `POST /real-estate-agencies/reevaluate`: reprocessa somente imóveis automáticos.
- `PATCH /properties/:id/agency`: salva escolha manual ou restaura o modo automático.
- `GET /properties` expõe `agencyId`, `agencyName` e `agencyMatchMode`.
- `GET /agendamentos` e suas respostas de mutação expõem os mesmos campos dentro de `property`.

A reavaliação não atualiza `properties.updated_at`, pois esse campo participa do desempate do ranking.

## Frontend

- `RealEstateAgencyDialog`: cadastro, edição, remoção e reavaliação.
- `PropertyRankingToolbar`: entrada da gestão e contador.
- `PropertyAgencyBadge`: selo e popover reutilizáveis de atribuição manual/automática.
- `PropertyCard` e `AgendamentoCard`: compõem o mesmo `PropertyAgencyBadge`.
- `useRealEstateAgencies`: centraliza CRUD, confirmações, feedback e reavaliação entre ranking e agendados.
- `properties.ts`: fonte única da lista de imobiliárias e das operações remotas.

O selo preserva a linguagem editorial do card: superfície creme translúcida, texto floresta e ícone de edição discreto.
