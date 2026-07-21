# Arquitetura

Views finas compõem containers de feature. Stores Pinia concentram acesso à API. Componentes recebem props tipadas e emitem ações.

Na lista da casa, `FurnitureCatalog` é o container, `FurnitureListItem` renderiza o grupo principal/variações, `FurnitureVariationForm` cria/edita opções, `FurnitureImportDialog` valida o JSON e `FurnitureTrashDialog` apresenta inativos/restauração. O estado remoto ativo e da lixeira fica separado em `stores/furniture.ts`; seleção e abertura de diálogos permanecem estados locais do container.
