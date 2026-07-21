# Especificação — lista da casa em lista

## Objetivo

Transformar o catálogo visual de móveis em uma lista operacional para acompanhar compras, cadastrar vários produtos de uma vez e excluir uma seleção.

## Requisitos

- **CASA-01**: apresentar cada item em uma linha, não em grade de cards.
- **CASA-02**: organizar a linha como foto, descrição e preço, seguidos de metadados e CTAs.
- **CASA-03**: permitir marcar e desmarcar um item como comprado, persistindo o estado após recarregar.
- **CASA-04**: diferenciar visualmente itens comprados sem esconder suas informações e ações.
- **CASA-05**: permitir selecionar um item, todos os itens visíveis ou limpar a seleção.
- **CASA-06**: excluir em lote somente os itens selecionados, após confirmação explícita em diálogo visual com ações de cancelar ou excluir.
- **CASA-07**: importar um JSON estruturado colado na tela ou escolhido em arquivo `.json`.
- **CASA-08**: exibir na própria interface um exemplo copiável do JSON aceito.
- **CASA-09**: aceitar nome de categoria no JSON e convertê-lo para a categoria existente.
- **CASA-10**: validar JSON, categorias, URLs, títulos, imagens, preços, duplicatas e limite antes do envio.
- **CASA-11**: limitar cada importação a 50 itens e gravá-la de forma atômica.
- **CASA-12**: manter criação, edição, filtro por categoria e ordenação já existentes.
- **CASA-13**: usar “Ver produto” para itens iniciais em vez de expor a origem técnica “Lista inicial”.

## Formato de importação

```json
{
  "items": [
    {
      "category": "Sala",
      "url": "https://loja.com.br/produto/sofa",
      "title": "Sofá de 3 lugares",
      "imageUrl": "https://loja.com.br/imagens/sofa.jpg",
      "price": 2499.9
    },
    {
      "category": "Cozinha",
      "url": "https://loja.com.br/produto/geladeira",
      "price": 3899
    }
  ]
}
```

`category` e `url` são obrigatórios. `title`, `imageUrl` e `price` são opcionais; quando possível, a API preenche metadados ausentes pelo link.

## Critérios de aceite

- A rota `/casa` apresenta linhas responsivas em desktop e mobile.
- Marcar “Comprei” continua visível após atualizar a página.
- O resumo informa total visível e quantidade comprada.
- Selecionar todos respeita somente o filtro atual.
- Exclusões individual e em lote usam diálogo PrimeVue, sem confirmação nativa do navegador.
- Uma exclusão em lote remove apenas os IDs confirmados.
- JSON inválido não habilita a importação e mostra erro localizado por item.
- Categoria inexistente e link repetido impedem todo o lote.
- Falha durante a gravação não deixa um lote parcialmente importado.
- Typecheck, build, lint PHP, integração e diff check passam.
