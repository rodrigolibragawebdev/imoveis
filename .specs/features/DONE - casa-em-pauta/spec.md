# Especificação — Casa em Pauta

## Requisitos

- **REQ-01**: cadastrar vários links de imóveis em uma única ação.
- **REQ-02**: exibir um card por imóvel com link, imagem, preço e origem quando disponíveis.
- **REQ-03**: votar em cada imóvel como gostei, não gostei ou muito ruim.
- **REQ-04**: editar uma observação curta diretamente no card.
- **REQ-05**: cadastrar categorias e itens para a casa a partir de links.
- **REQ-06**: filtrar itens por categoria e ordenar por preço.
- **REQ-07**: iniciar o catálogo com categorias e itens essenciais.
- **REQ-08**: reservar uma view para dicas de compra de imóvel.
- **REQ-09**: persistir dados em SQLite por uma API MVC.

## Critérios de aceite

- Cadastro, voto e anotação permanecem após recarregar a página.
- Os filtros não alteram ou duplicam os dados persistidos.
- Falha ao extrair um site não impede o cadastro do link.
- A interface funciona em telas móveis e desktop.

