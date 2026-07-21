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
- **CASA-06A**: permitir excluir toda a seleção sem limite fixo de quantidade, preservando atomicidade.
- **CASA-07**: importar um JSON estruturado colado na tela ou escolhido em arquivo `.json`.
- **CASA-08**: exibir na própria interface um exemplo copiável do JSON aceito.
- **CASA-09**: aceitar nome de categoria no JSON e convertê-lo para a categoria existente.
- **CASA-10**: validar JSON, categorias, URLs, títulos, imagens, preços, duplicatas por nome e limite técnico antes do envio.
- **CASA-11**: importar sem limite fixo de quantidade, respeitando 100 KB no arquivo, enviando lotes sequenciais de até 10 itens e gravando cada lote de forma atômica.
- **CASA-14**: mostrar quantos lotes serão enviados, a requisição atual e quantos lotes já foram concluídos.
- **CASA-15**: salvar o checkpoint de cada arquivo no `localStorage` e retomar do primeiro lote pendente após falha ou recarregamento.
- **CASA-16**: registrar toda resposta de erro com código de correlação em `storage/logs`, sem persistir o conteúdo importado, cookies ou headers.
- **CASA-12**: manter criação, edição, filtro por categoria e ordenação já existentes.
- **CASA-13**: usar “Ver produto” para itens iniciais em vez de expor a origem técnica “Lista inicial”.
- **CASA-17**: filtrar instantaneamente a lista por texto, sem diferença de maiúsculas ou acentos, considerando item principal, categoria, origem, link e variações.

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

`category` e `url` são obrigatórios. `title`, `imageUrl` e `price` são opcionais; quando possível, a API preenche metadados ausentes pelo link. O título não possui limite específico de caracteres.

## Critérios de aceite

- A rota `/casa` apresenta linhas responsivas em desktop e mobile.
- Marcar “Comprei” continua visível após atualizar a página.
- O resumo informa total visível e quantidade comprada.
- Selecionar todos respeita somente o filtro atual.
- A busca textual atualiza lista, resumo e seleção; um termo encontrado em uma variação mantém seu item principal visível.
- Busca sem resultado apresenta o termo procurado e uma ação para limpar o campo.
- Exclusões individual e em lote usam diálogo PrimeVue, sem confirmação nativa do navegador.
- Uma exclusão em lote inativa apenas os IDs confirmados e os disponibiliza na lixeira.
- A inativação de qualquer quantidade selecionada é processada internamente em blocos e concluída integralmente ou revertida.
- JSON inválido não habilita a importação e mostra erro localizado por item.
- Categoria inexistente impede o lote atual. Nomes normalizados iguais são ignorados; URLs iguais com nomes diferentes são aceitas na importação.
- Falha durante a gravação não deixa a requisição atual parcialmente importada; lotes anteriores já concluídos são preservados.
- Reenviar o mesmo conteúdo após uma falha pula os lotes confirmados no checkpoint local.
- Cada `500` apresenta um código que localiza a entrada correspondente no log diário da API.
- Typecheck, build, lint PHP, integração e diff check passam.
