# Casa em Pauta

Aplicação pessoal para comparar imóveis, organizar móveis/eletrodomésticos e reunir dicas de compra.

## Arquitetura

- Frontend: Vue 3, TypeScript, Vite, Vue Router, Pinia, PrimeVue e PrimeFlex.
- API: PHP 8.2, sem framework e sem Composer.
- Persistência: SQLite via `pdo_sqlite`.
- Banco modular: migrations incrementais, seeds, serializers e regras de domínio separados da conexão.
- Preview de links: Open Graph, JSON-LD e fallback extraído da URL quando o portal bloqueia a consulta, incluindo produtos do Zoom.

Node.js é usado somente para desenvolver, validar e compilar o frontend. Toda a API e toda a persistência da aplicação são PHP.

## Requisitos locais

- Node.js 22.
- PHP 8.2 com `pdo_sqlite`, `curl`, `dom`, `iconv` e `mbstring` ativos.

Confira as extensões com `php -m`.

## Como executar

```bash
npm install
npm run dev
```

O projeto possui um `.env` local sem segredos. Para recriá-lo, copie `.env.example` para `.env`.

- Frontend: `http://localhost:4271`
- API: `http://localhost:4272/api`
- Health check: `http://localhost:4272/api/health`

O banco local fica em `data/casa-em-pauta.sqlite`. As migrations e os dados iniciais são aplicados automaticamente no primeiro acesso à API, sem recriar nem apagar os registros existentes.

## Ranking e organização

- `+1` leva o imóvel ao topo imediatamente.
- `-1` preserva o card no lugar atual e o envia ao fim na próxima carga.
- `Muito ruim` oculta o imóvel do ranking principal; o filtro dedicado permite recuperá-lo.
- Bairros desejados recebem prioridade e também podem ser usados como filtro.
- O filtro de duplicatas aponta o mesmo link sem tracking ou candidatos com mesmo bairro, quartos e área praticamente igual. Nada é excluído automaticamente.
- Cards de móveis podem ser editados pelo ícone de lápis: categoria, link, nome, imagem e preço.

Links do Zoom tentam preencher nome, imagem e menor preço pelos metadados da página. Quando a proteção do portal impede a leitura, o nome é derivado do próprio link e os demais campos continuam editáveis.

## Scripts

- `npm run dev`: inicia a API PHP e o frontend Vue juntos.
- `npm run dev:api`: inicia somente a API PHP.
- `npm run dev:web`: inicia somente o frontend.
- `npm run typecheck`: valida o TypeScript do frontend.
- `npm run build`: compila o frontend.
- `npm run preview`: serve localmente o build do frontend.
- `php api/tests/integration.php`: valida migrations, ranking, bairros, duplicatas e fallback do Zoom em um SQLite temporário.

## Variáveis de ambiente

- `FRONTEND_PORT`: porta do Vite.
- `VITE_APP_BASE_PATH`: base do frontend; localmente `/` e em produção `/imoveis/`.
- `VITE_API_URL`: URL base da API.
- `APP_ORIGIN`: origem autorizada a fazer mutações na API.
- `IMOVEIS_DATABASE_PATH`: caminho do SQLite.

O PHP carrega apenas `APP_ORIGIN` e `IMOVEIS_DATABASE_PATH` do `.env`. O Vite carrega apenas as variáveis usadas pelo frontend. Nunca versione o `.env`.

## Deploy

O push na `main` publica um único artefato na branch `hostinger-deploy`: frontend em `/imoveis` e API em `/imoveis/api`. Consulte [HOSTINGER.md](HOSTINGER.md).
