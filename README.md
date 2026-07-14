# Casa em Pauta

Aplicação pessoal para comparar imóveis, organizar móveis/eletrodomésticos e reunir dicas de compra.

## Arquitetura

- Frontend: Vue 3, TypeScript, Vite, Vue Router, Pinia, PrimeVue e PrimeFlex.
- API: PHP 8.2, sem framework e sem Composer.
- Persistência: SQLite via `pdo_sqlite`.
- Preview de links: Open Graph, JSON-LD e fallback extraído da própria URL quando o portal bloqueia a consulta.

Node.js é usado somente para desenvolver, validar e compilar o frontend. Toda a API e toda a persistência da aplicação são PHP.

## Requisitos locais

- Node.js 22.
- PHP 8.2 com `pdo_sqlite`, `curl`, `dom` e `mbstring` ativos.

Confira as extensões com:

```bash
php -m
```

## Como executar

```bash
npm install
npm run dev
```

O projeto já possui um `.env` local sem segredos. Para recriá-lo, copie `.env.example` para `.env`.

- Frontend: `http://localhost:4271`
- API: `http://localhost:4272/api`
- Health check: `http://localhost:4272/api/health`

O banco local fica em `data/casa-em-pauta.sqlite`. As tabelas, categorias e itens iniciais são criados automaticamente no primeiro acesso à API.

## Scripts

- `npm run dev`: inicia a API PHP e o frontend Vue juntos.
- `npm run dev:api`: inicia somente a API PHP.
- `npm run dev:web`: inicia somente o frontend.
- `npm run typecheck`: valida o TypeScript do frontend.
- `npm run build`: compila o frontend.
- `npm run preview`: serve localmente o build do frontend.

## Variáveis de ambiente

- `FRONTEND_PORT`: porta do Vite.
- `VITE_APP_BASE_PATH`: base do frontend; localmente `/` e em produção `/imoveis/`.
- `VITE_API_URL`: URL base da API.
- `APP_ORIGIN`: origem autorizada a fazer mutações na API.
- `IMOVEIS_DATABASE_PATH`: caminho do SQLite.

O PHP carrega apenas `APP_ORIGIN` e `IMOVEIS_DATABASE_PATH` do `.env`. O Vite carrega apenas as variáveis usadas pelo frontend. Nunca versione o `.env`.

## Deploy

O push na `main` publica um único artefato na branch `hostinger-deploy`: frontend em `/imoveis` e API em `/imoveis/api`. Consulte [HOSTINGER.md](HOSTINGER.md).
