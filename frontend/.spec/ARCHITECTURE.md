# Arquitetura

Views finas compõem containers de feature. Stores Pinia concentram acesso à API. Componentes recebem props tipadas e emitem ações.

Na lista da casa, `FurnitureCatalog` é o container, `FurnitureListItem` renderiza uma linha e `FurnitureImportDialog` valida/normaliza o JSON. O estado remoto fica em `stores/furniture.ts`; seleção e abertura de diálogos são estados locais do container.
