# Tarefas

- [x] **T1 — Schema e domínio**
  - Criar migration, normalização de palavra-chave, match por hostname e precedência por especificidade.
  - Gate: migration funciona em banco novo e upgrade existente.
- [x] **T2 — API e contratos**
  - Criar CRUD, atribuição por imóvel, reavaliação e campos do serializer.
  - Gate: lint PHP e integração.
- [x] **T3 — Gestão no frontend**
  - Criar diálogo e entrada na mesa de decisão.
  - Gate: cadastro, edição, exclusão e feedback de reavaliação tipados.
- [x] **T4 — Selo editável nos cards**
  - Substituir domínio por imobiliária e permitir escolha manual/retorno automático.
  - Gate: cards com e sem match permanecem operáveis em desktop e mobile.
- [x] **T5 — Validação e documentação**
  - Executar gates e atualizar specs, README, AGENTS.md e CLAUDE.md.
- [x] **T6 — Imobiliárias em agendados**
  - Expor os campos no contrato de agendamentos, reutilizar o seletor nos cards e manter as duas telas sincronizadas.
  - Gate: integração, typecheck, build e confirmação visual sem `window.confirm`.
