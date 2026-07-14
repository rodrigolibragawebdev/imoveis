# Especificação — ranking, bairros, duplicatas e catálogo editável

## Requisitos

- **RANK-01**: ordenar imóveis avaliados com `+1` no topo do ranking.
- **RANK-02**: manter um imóvel `-1` na posição atual até a próxima carga e colocá-lo no fim após recarregar.
- **RANK-03**: ocultar imóveis “Muito ruim” do ranking padrão e permitir recuperá-los pelo filtro específico.
- **RANK-04**: filtrar imóveis por ranking: ranking ativo, `+1`, sem voto, `-1`, muito ruins e possíveis duplicatas.
- **RANK-05**: filtrar imóveis por bairro.
- **BAIRRO-01**: cadastrar e remover bairros desejados.
- **BAIRRO-02**: dar bônus de ranking a imóveis localizados em bairros desejados.
- **DUP-01**: impedir novos cadastros equivalentes após normalizar o link e remover parâmetros de rastreamento.
- **DUP-02**: apontar imóveis já salvos com link equivalente.
- **DUP-03**: apontar candidatos por proximidade quando bairro, quantidade de quartos e área forem praticamente iguais, sem excluir automaticamente.
- **MOVEL-01**: editar categoria, link, nome, imagem e preço de qualquer móvel já incluído.
- **ZOOM-01**: extrair título, imagem e preço de links do Zoom quando os metadados estiverem acessíveis.
- **ZOOM-02**: gerar título útil a partir do slug do Zoom quando o portal bloquear a leitura.
- **DB-01**: versionar alterações de banco em migrations incrementais.
- **DB-02**: manter schema, seeds, serialização e regras de domínio fora de `database.php`.

## Regras de ranking

- `+1`: base 1000 pontos.
- Sem voto: base 0 pontos.
- `-1`: base -1000 pontos.
- Muito ruim: base -10000 pontos e oculto no ranking padrão.
- Bairro desejado: bônus de 100 pontos dentro de cada faixa.
- Empates: atualização mais recente e depois ID mais recente.

## Critérios de aceite

- Recarregar a página preserva votos, bairros e ordenação.
- Um `-1` só muda de posição quando a lista for carregada novamente.
- “Muito ruim” desaparece imediatamente do ranking padrão, mas aparece em seu filtro.
- O filtro de duplicatas explica se a suspeita veio do link ou da proximidade.
- Excluir um candidato duplicado usa a remoção normal e nunca acontece automaticamente.
- A migration roda uma única vez em banco novo e no banco existente com 35 imóveis.
- Um móvel editado permanece alterado após recarregar.
- O link Zoom de referência produz ao menos um título legível mesmo sob bloqueio.
