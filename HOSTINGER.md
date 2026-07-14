# Deploy na Hostinger

Este projeto usa apenas o fluxo de produção:

```text
push em main
  -> typecheck
  -> build do backend e frontend
  -> publica o frontend estático em hostinger-deploy
  -> Hostinger atualiza public_html/imoveis
```

## Configuração do frontend

No Git Deploy da Hostinger, use:

- Branch: `hostinger-deploy`
- Diretório: `/imoveis`

O artefato coloca `index.html`, `assets/` e `.htaccess` diretamente nessa pasta. Configure a variável `VITE_API_URL` em **GitHub → Settings → Actions → Variables** com a URL pública do backend Express. Enquanto ela não existir, o build usa `/imoveis/api`.

O backend Express precisa ser publicado separadamente como **Node.js Web App**. Cadastre no hPanel as variáveis de [hostinger/env.example](hostinger/env.example) e use um caminho absoluto e persistente para `DATABASE_PATH`, fora do diretório de build, para que o SQLite não seja apagado em redeploys.

## Preservar o projeto em `/games`

Use o conteúdo de [hostinger/public-html.htaccess](hostinger/public-html.htaccess) em `public_html/.htaccess`. A pasta `/imoveis` também recebe seu próprio arquivo, disponível em [hostinger/imoveis.htaccess](hostinger/imoveis.htaccess).

Faça backup de `public_html/games` e do `.htaccess` da raiz antes de substituir qualquer regra.

O `.htaccess` dentro de `/imoveis` responde pelo fallback do Vue Router, portanto acessos diretos a `/imoveis/casa` e `/imoveis/dicas` continuam funcionando.
