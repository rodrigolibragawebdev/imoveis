# Casa em Pauta

Aplicação pessoal para comparar imóveis, organizar móveis/eletrodomésticos e reunir dicas de compra.

## Stack

- Frontend: Vue 3, TypeScript, Vite, Vue Router, Pinia, PrimeVue e PrimeFlex
- Backend: Node.js, Express, TypeScript, arquitetura MVC, Zod e SQLite
- Os cards tentam extrair título, imagem e preço dos links. Todos os dados extraídos podem ser corrigidos no cadastro.

## Como executar

```bash
npm install
npm run db:seed
npm run dev
```

Frontend: `http://localhost:4271`  
API: `http://localhost:4272/api`

As portas `4271` e `4272` foram escolhidas após conferir as portas em uso na máquina. O Vite usa `strictPort`, portanto avisará em vez de ocupar silenciosamente outra porta. Ambas podem ser alteradas no `.env`.

## Scripts

- `npm run dev`: inicia API e frontend
- `npm run build`: gera os builds de produção
- `npm run typecheck`: valida TypeScript
- `npm run db:seed`: recria os registros iniciais sem apagar itens já cadastrados

Copie `.env.example` para `.env` somente se quiser alterar portas ou caminhos padrão.

## Deploy

O deploy de produção usa apenas a branch `main` e publica o artefato na branch `hostinger-deploy`. Consulte [HOSTINGER.md](HOSTINGER.md) para configurar a aplicação Node.js e preservar o projeto existente em `/games`.
