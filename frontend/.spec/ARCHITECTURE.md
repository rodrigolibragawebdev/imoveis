# Arquitetura

Views finas compõem containers de feature. Stores Pinia concentram acesso à API. Componentes recebem props tipadas e emitem ações.

Na comparação de imóveis, `PropertyBoard` coordena a mesa de decisão e `RealEstateAgencyDialog` gerencia imobiliárias. `PropertyCard` e `AgendamentoCard` compartilham `PropertyAgencyBadge`; `useRealEstateAgencies` concentra CRUD, confirmação, feedback e reavaliação. A store `properties.ts` permanece como fonte da lista de regras e das atribuições; componentes apenas emitem intenções tipadas.

Em agendados, `orderedItems` é derivado na store e mantém a ordem recebida dentro de cada grupo, deslocando somente visitas com `advanced === false` para o final.

Na lista da casa, `FurnitureCatalog` é o container, `FurnitureListItem` renderiza o grupo principal/variações, `FurnitureVariationForm` cria/edita opções, `FurnitureImportDialog` valida o JSON e `FurnitureTrashDialog` apresenta inativos com restauração e exclusão permanente. O estado remoto ativo e da lixeira fica separado em `stores/furniture.ts`; seleção, confirmações e abertura de diálogos permanecem estados locais do container.
