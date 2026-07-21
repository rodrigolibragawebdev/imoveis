# Especificação — lixeira da lista da casa

## Objetivo

Evitar perda acidental de itens da organização doméstica, transformando exclusões em inativação recuperável.

## Requisitos

- **LIX-01**: excluir um ou vários itens deve preencher `deleted_at`, sem remover o registro do banco.
- **LIX-02**: itens inativos não aparecem na lista, filtros, resumo ou seleção ativos.
- **LIX-03**: oferecer uma lixeira acessível pela lista da casa, com título, categoria, preço e data de exclusão.
- **LIX-04**: permitir restaurar um item individualmente.
- **LIX-05**: permitir restaurar todos os itens inativos de uma vez.
- **LIX-06**: exclusão e restauração em lote não possuem limite fixo de quantidade e usam blocos internos transacionais.
- **LIX-07**: variações permanecem vinculadas enquanto o item principal estiver inativo.
- **LIX-08**: nenhuma ação da lixeira realiza exclusão física.

## Critérios de aceite

- Excluir um item faz ele desaparecer da lista ativa e aparecer na lixeira após recarregar.
- Restaurar faz o item voltar com categoria, link, preço, compra e variações preservados.
- Excluir/restaurar toda uma seleção é atômico.
- A lixeira vazia apresenta orientação clara.
- Typecheck, build, lint PHP, integração, smoke HTTP e diff check passam.
