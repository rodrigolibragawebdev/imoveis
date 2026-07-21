# Arquitetura

Views finas compõem containers de feature. Stores Pinia concentram acesso à API. Componentes recebem props tipadas e emitem ações.

Na comparação de imóveis, `PropertyBoard` coordena a mesa de decisão, `RealEstateAgencyDialog` gerencia imobiliárias e `PropertyCard` mantém a atribuição editável em um popover. A store `properties.ts` concentra a lista de regras e as atribuições; componentes apenas emitem intenções tipadas.

Na lista da casa, `FurnitureCatalog` é o container, `FurnitureListItem` renderiza o grupo principal/variações, `FurnitureVariationForm` cria/edita opções, `FurnitureImportDialog` valida o JSON e `FurnitureTrashDialog` apresenta inativos com restauração e exclusão permanente. O estado remoto ativo e da lixeira fica separado em `stores/furniture.ts`; seleção, confirmações e abertura de diálogos permanecem estados locais do container.
