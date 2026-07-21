# Guia de trabalho para agentes

Este arquivo define as regras permanentes para qualquer agente que altere o Casa em Pauta. Leia também a spec da feature em `.specs/features/` e a documentação técnica de `frontend/.spec/` ou `api/.spec/` conforme a área tocada.

## Produto

O Casa em Pauta é um painel pessoal para:

- comparar, classificar e acompanhar imóveis;
- registrar visitas e anotações;
- planejar móveis e eletrodomésticos da futura casa;
- consultar orientações e simulações de financiamento.

A interface e todas as mensagens são em português do Brasil. Preserve o tom direto, doméstico e acolhedor.

## Stack e arquitetura

- Frontend: Vue 3, TypeScript, Vite, Vue Router, Pinia, PrimeVue e PrimeFlex.
- API: PHP 8.2 sem framework e sem Composer.
- Banco: SQLite via PDO, com migrations incrementais.
- Deploy: GitHub Actions publica frontend e API juntos na branch `hostinger-deploy` para a Hostinger.
- Node.js é usado apenas no frontend e nas ferramentas; não crie um backend Node.

Fluxo principal:

```text
View fina → componente de feature → store Pinia → Axios → api/index.php
                                                     ↓
                      serializers/domínio ← PDO ← SQLite + migrations
```

## Estrutura relevante

- `frontend/src/views`: páginas finas que apenas compõem features.
- `frontend/src/components`: UI organizada por domínio.
- `frontend/src/stores`: estado compartilhado e chamadas da API.
- `frontend/src/services/api.ts`: cliente HTTP e tradução de erros.
- `frontend/src/types`: contratos TypeScript da API.
- `api/index.php`: roteamento HTTP e orquestração de endpoints.
- `api/bootstrap.php`: validação comum, CORS e respostas.
- `api/database.php`: conexão PDO e execução das migrations.
- `api/migrations`: alterações incrementais e idempotentes de schema.
- `api/serializers.php`: contratos JSON em camelCase.
- `api/tests/integration.php`: teste do banco e das regras de domínio.
- `.specs`: visão, decisões, estado e especificações de features.
- `frontend/.spec` e `api/.spec`: documentação técnica por parte.

## Comandos

No Windows com PowerShell, prefira `npm.cmd`; `npm.ps1` pode estar bloqueado pela política de execução.

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run build
php api/tests/integration.php
```

Antes de entregar mudanças PHP, valide também os arquivos modificados:

```powershell
php -l api/index.php
php -l api/serializers.php
php -l api/migrations/NNN_nome.php
```

O aviso de `unlink(...): Resource temporarily unavailable` pode ocorrer no Windows depois de o teste já ter impresso `OK`; é um lock temporário do SQLite no cleanup. Não trate o aviso isolado como falha funcional, mas não esconda outros warnings.

## Convenções do frontend

- Use Vue 3 Composition API com `<script setup lang="ts">`.
- Em SFCs, mantenha a ordem `<template>`, `<script setup>`, `<style scoped>`.
- Views devem permanecer finas. Componentes recebem props tipadas e emitem eventos tipados; não mutam props.
- Stores concentram chamadas HTTP e estado compartilhado. Estado visual efêmero permanece no componente.
- Derive valores com `computed`; use `watch` apenas para efeitos colaterais e sincronização.
- Use `shallowRef` para primitivos ou valores substituídos por inteiro; use `ref`/`reactive` apenas quando a reatividade profunda for necessária.
- Prefira componentes PrimeVue e utilitários PrimeFlex. Use CSS scoped para identidade visual e layouts que as utilities não expressem bem.
- Preserve os tokens de `frontend/src/assets/main.css`: papel, tinta, floresta, terracota e creme.
- Preserve a direção editorial orgânica com Fraunces para títulos e Manrope para corpo.
- Garanta responsividade a partir de 320 px, foco visível, rótulos acessíveis e respeito a `prefers-reduced-motion`.
- Nunca use `v-html` para conteúdo fornecido por usuário.
- Links externos devem usar `target="_blank"` com `rel="noopener noreferrer"`.
- Não introduza Vuetify, Tailwind ou outra biblioteca de UI sem decisão explícita.

## Convenções da API

- Todo arquivo PHP começa com `declare(strict_types=1);`.
- Use consultas preparadas para qualquer dado variável.
- SQLite usa `snake_case`; JSON e TypeScript usam `camelCase`.
- Valide tipo, tamanho, faixa, cardinalidade e protocolo de qualquer entrada antes de consultar ou gravar.
- Erros esperados usam `ApiException` com mensagem pública em português; exceções internas nunca expõem detalhes ao cliente.
- URLs externas aceitam apenas HTTP(S), sem credenciais, e passam pelas proteções de preview contra destinos privados.
- Operações em lote devem impor limite técnico proporcional, remover duplicatas conforme a regra da feature e usar transação quando a intenção for tudo-ou-nada.
- Mudanças de schema sempre entram em uma nova migration numerada. Nunca reescreva uma migration já aplicada.
- Toda resposta de entidade passa pelo serializer correspondente.
- O banco de produção permanece fora de `public_html`; nunca versione SQLite, `.env`, credenciais ou uploads.

## Lista da casa

- `FurnitureCatalog.vue` orquestra filtros, seleção, diálogos e toasts.
- `FurnitureListItem.vue` apresenta o item principal e suas variações aninhadas, com hierarquia visual explícita.
- `FurnitureVariationForm.vue` recebe apenas o link como obrigatório e permite complementar nome, imagem e preço.
- `FurnitureImportDialog.vue` lê arquivo/textarea, mostra o exemplo e normaliza categorias antes do envio.
- `furniture.ts` é a fonte única de itens, filtros e operações remotas.
- O status `isPurchased` é persistido; atualizações otimistas devem reverter em caso de erro.
- Importação JSON não possui limite fixo de itens na API, respeita o corpo técnico de 100 KB e é dividida pelo frontend em requisições sequenciais de até 10 itens; cada requisição é atômica.
- Cada lote concluído atualiza um checkpoint no `localStorage`, indexado pelo SHA-256 do conteúdo normalizado. Em falha, a mesma lista retoma do primeiro lote pendente.
- Na importação, duplicata significa somente nome normalizado igual (ignorando caixa, acentos e espaços repetidos). URL repetida com nomes diferentes é válida.
- Títulos de itens e variações não possuem limite específico de caracteres; valide apenas que sejam textos não vazios quando obrigatórios.
- Variações pertencem a um único item, usam links únicos no catálogo e são excluídas em cascata com o item principal.
- Exclusões individual e em lote exigem seleção/intenção explícita e usam o `ConfirmDialog` centralizado; não use `window.confirm` nesta feature.
- Para seeds com origem técnica `Lista inicial`, a UI usa o CTA humano “Ver produto”.

## Segurança

- Não use `eval`, `new Function`, `innerHTML`, comandos de shell construídos com entrada externa ou desserialização insegura.
- Não relaxe CORS, os headers de segurança ou os limites de `jsonBody()` sem justificar e testar.
- Não registre tokens, caminhos privados de produção ou corpos contendo dados sensíveis.
- Toda resposta de erro usa `writeApiErrorLog()` e vai para `storage/logs` com código de correlação, status, rota e metadados seguros; nunca registre o corpo importado, cookies ou headers.
- Trate preview de links como entrada hostil e preserve as defesas SSRF existentes.
- A exclusão múltipla deve operar somente nos IDs validados recebidos; nunca monte SQL interpolando valores do usuário.
- Excluir item principal na lista ativa significa soft delete por `deleted_at`; hard delete só existe nas rotas da lixeira e deve exigir `deleted_at IS NOT NULL`.
- Exclusão, restauração e remoção permanente múltiplas não possuem limite fixo: a API divide IDs validados em blocos de 500 dentro de uma única transação.
- Consultas da lista ativa sempre filtram `deleted_at IS NULL`; a lixeira é o único fluxo que lista inativos.
- A interface deve confirmar exclusões permanentes, informar que são irreversíveis e manter o foco padrão em cancelar.

## Git e escopo

- Preserve alterações já existentes do usuário.
- Não use `git reset --hard`, não descarte arquivos e não faça commit/push sem pedido explícito.
- Não edite `frontend/dist`; ele é artefato gerado e ignorado.
- Mantenha mudanças focadas na feature e atualize documentação quando contratos, schema, comandos ou arquitetura mudarem.

## Definition of Done

Uma mudança está pronta quando:

1. requisitos e estados de erro estão implementados;
2. contratos TypeScript, serializer e schema permanecem alinhados;
3. `npm.cmd run typecheck` passa;
4. `npm.cmd run build` passa;
5. PHP modificado passa no `php -l`;
6. `php api/tests/integration.php` imprime `OK`;
7. `git diff --check` não aponta erros;
8. specs, README e arquivos de orientação relevantes refletem o comportamento final.
