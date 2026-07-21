# Especificação — imobiliárias nos imóveis

## Requisitos

- **IMO-01**: cadastrar, editar e excluir imobiliárias com nome exibido e palavra-chave de domínio.
- **IMO-02**: identificar automaticamente a imobiliária quando a palavra-chave normalizada estiver contida no hostname do anúncio.
- **IMO-03**: usar a palavra-chave mais longa quando mais de uma regra combinar com o mesmo domínio.
- **IMO-04**: exibir o nome da imobiliária no lugar do domínio técnico no card do imóvel.
- **IMO-05**: manter o selo do card sempre editável, inclusive quando a identificação tiver sido automática.
- **IMO-06**: permitir atribuição manual por imóvel para anúncios de agregadores ou domínios sem regra cadastrada.
- **IMO-07**: permitir retornar um imóvel ao modo automático.
- **IMO-08**: reavaliar todos os imóveis automáticos já salvos sem sobrescrever escolhas manuais e sem alterar sua posição no ranking.
- **IMO-09**: identificar automaticamente novos imóveis durante a importação de links.

## Regras

- A comparação usa somente o hostname; palavras presentes no caminho, query ou título não geram match.
- Nome e palavra-chave são independentes: `Auxiliadora Predial` pode usar `auxiliadora`.
- A normalização ignora caixa, acentos, pontos, hífens e espaços. Assim, `quinto andar` combina com `quintoandar.com.br`.
- Uma escolha manual, inclusive vazia, permanece intacta durante reavaliações.
- Excluir uma imobiliária devolve seus imóveis ao modo automático e tenta aplicar as regras restantes.

## Critérios de aceite

- O botão **Imobiliárias** aparece na mesa de decisão e informa a quantidade cadastrada.
- Um anúncio de `www.cardini.com.br` recebe o selo `Cardini` quando a palavra-chave é `cardini`.
- Um anúncio do ZAP sem correspondência exibe **Adicionar imobiliária** e aceita escolha manual.
- Clicar no selo abre a edição e oferece **Voltar à identificação automática**.
- **Reavaliar imóveis** informa quantos foram avaliados, reconhecidos e alterados.
- Typecheck, build, lint PHP e integração passam.
