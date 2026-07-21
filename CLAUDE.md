# Contexto do projeto para Claude

Leia `AGENTS.md` antes de agir. Ele é a fonte principal para arquitetura, segurança, comandos e Definition of Done. Este arquivo complementa essas regras com um fluxo de trabalho adequado para Claude Code.

## Antes de alterar

1. Leia a solicitação mais recente e confirme a área afetada.
2. Consulte `.specs/project/PROJECT.md`, `.specs/project/STATE.md` e somente a spec da feature relevante.
3. Para frontend, consulte `frontend/.spec`; para API, consulte `api/.spec`.
4. Verifique `git status --short` e preserve mudanças que já estavam no worktree.
5. Localize código com `rg`/`rg --files`; evite varreduras desnecessárias em `node_modules` e `frontend/dist`.

## Como implementar

- Faça alterações pequenas e coerentes, mantendo os contratos entre Vue, Pinia, Axios, serializer PHP e SQLite.
- Em features não triviais, declare antes o mapa de responsabilidades dos componentes.
- Use `apply_patch` para edições manuais e não sobrescreva arquivos completos sem necessidade.
- Não crie abstrações ou dependências novas quando os padrões existentes resolvem o problema.
- Mensagens visíveis ao usuário ficam em português do Brasil; identificadores de código seguem o estilo do módulo.
- Se uma decisão mudar requisito, persistência, endpoint ou estrutura, registre-a na spec durante a mesma sessão.

## Verificação progressiva

Execute primeiro a validação mais barata e avance até os gates completos:

```powershell
php -l api/arquivo-alterado.php
npm.cmd run typecheck
php api/tests/integration.php
npm.cmd run build
git diff --check
git status --short
```

Em PowerShell, use `npm.cmd`, não `npm`, para evitar o bloqueio comum de `npm.ps1` pela Execution Policy.

## Regras de persistência

- Nova coluna ou tabela exige nova migration em `api/migrations`; não edite uma migration já aplicada.
- Atualize `api/serializers.php` e `frontend/src/types/index.ts` juntos quando o contrato JSON mudar.
- Use prepared statements e transações para operações em lote.
- Mantenha migrations compatíveis com bancos existentes e idempotentes pelo runner.
- Para importações retomáveis, avance checkpoints somente depois da resposta bem-sucedida do lote; o hash do conteúdo identifica a lista sem salvar o arquivo inteiro.
- Toda resposta de erro usa código de correlação e `storage/logs`; nunca registre corpo da requisição, headers, cookies ou tokens.
- Itens da lista ativa usam soft delete: rotas comuns preenchem `deleted_at`, consultas ativas filtram nulos e restaurações são transacionais. Hard delete só é permitido pelas rotas da lixeira, para registros inativos e após confirmação irreversível na interface.

## Regras da interface

- Use Vue 3, Composition API, `<script setup lang="ts">`, PrimeVue e PrimeFlex.
- Preserve Fraunces/Manrope e os tokens de cor existentes.
- Trate desktop e mobile como partes do mesmo requisito.
- Não confunda metadados técnicos com CTAs: rótulos precisam indicar a ação que acontecerá.
- Para listas CRUD, separe container, formulário/diálogo e item de lista.

## Encerramento

Antes de responder:

- revise o diff completo por regressões, XSS, SSRF, SQL inseguro e exclusões amplas;
- atualize `.specs/project/STATE.md` com data, validações e limitações relevantes;
- não diga que algo passou sem ter executado o comando correspondente;
- reporte arquivos-chave, comportamento entregue, testes e qualquer aviso residual;
- não faça commit, push ou deploy sem autorização explícita.
