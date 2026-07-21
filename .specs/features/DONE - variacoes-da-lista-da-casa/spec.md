# Especificação — variações da lista da casa

## Objetivo

Permitir comparar links alternativos do mesmo produto sem poluir a lista com itens principais duplicados.

## Requisitos

- **VAR-01**: cada item principal pode ter zero ou mais variações.
- **VAR-02**: exibir o botão **+ Variações** em uma faixa abaixo de cada item principal.
- **VAR-03**: exigir somente um link para criar a variação.
- **VAR-04**: tentar capturar título, imagem e preço do link; manter a variação como hiperlink quando o preview não estiver disponível.
- **VAR-05**: permitir informar ou corrigir manualmente nome, imagem e preço.
- **VAR-06**: apresentar variações recuadas, conectadas ao item principal e numeradas como “Variação 1”, “Variação 2” etc.
- **VAR-07**: permitir editar e excluir uma variação sem alterar o item principal.
- **VAR-08**: preservar todas as variações quando o item principal for movido para a lixeira.
- **VAR-09**: impedir que um mesmo link exista simultaneamente como item ou variação no catálogo.
- **VAR-10**: o conector vertical deve alcançar o último ramo, sem sobrar linha depois dele, e o grupo completo deve ter separação clara do próximo item principal.

## Critérios de aceite

- Um item sem variações continua compacto e mostra o convite para adicionar links alternativos.
- Após adicionar somente um link, a opção aparece abaixo do item e permanece após recarregar.
- Preview ausente não impede o cadastro; um título derivado do endereço mantém o link identificável.
- A hierarquia entre item principal e variações é clara em desktop e mobile.
- Três ou mais variações mantêm todos os ramos conectados e deixam respiro perceptível antes do grupo seguinte.
- Editar ou excluir uma variação afeta somente a opção escolhida.
- Mover o item principal para a lixeira preserva seus filhos; excluir definitivamente pela lixeira aciona a cascata da FK.
- Typecheck, build, lint PHP, integração e smoke HTTP passam.
