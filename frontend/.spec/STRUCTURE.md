# Estrutura

`views`, `components/layout`, `components/properties`, `components/agendamentos`, `components/furniture`, `components/tips`, `stores`, `services`, `router`, `types`, `utils` e `assets`.

Features CRUD mantêm container, formulário/diálogo e item visual separados. A lista da casa usa `FurnitureCatalog`, `FurnitureItemForm`, `FurnitureVariationForm`, `FurnitureImportDialog`, `FurnitureTrashDialog` e `FurnitureListItem`.

Imobiliárias usam `RealEstateAgencyDialog` para CRUD/reavaliação, `PropertyRankingToolbar` como entrada e `PropertyCard` para sobrescrita manual por imóvel.
