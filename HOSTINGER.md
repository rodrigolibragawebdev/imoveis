# Deploy na Hostinger

Este projeto usa apenas o fluxo de produção:

```text
push em main
  -> typecheck
  -> build do backend e frontend
  -> publica artefato em hostinger-deploy
  -> Hostinger faz o redeploy da aplicação Node.js
```

## Configuração da aplicação

Na Hostinger, crie uma **Node.js Web App** conectada a este repositório e use:

- Branch: `hostinger-deploy`
- Node.js: `22.x`
- Entry file: `dist/server.js`
- Start command: `npm start`
- Build command: `npm run build`

Cadastre no hPanel as variáveis de [hostinger/env.example](hostinger/env.example). Use um caminho absoluto e persistente para `DATABASE_PATH`, fora do diretório de build, para que o SQLite não seja apagado em redeploys.

## Preservar o projeto em `/games`

Backends Node.js ficam fora de `public_html`, e a Hostinger gera um `.htaccess` em `public_html/.htaccess` para encaminhar requisições ao processo Node.

Antes das regras de proxy geradas pela Hostinger, adicione o conteúdo de [hostinger/public-html-games.htaccess](hostinger/public-html-games.htaccess). Essa exceção mantém `public_html/games` sendo atendido diretamente pelo Apache.

Faça backup de `public_html/games` e do `.htaccess` antes de conectar o domínio à aplicação Node. A Hostinger pode regenerar o `.htaccess` durante um redeploy; depois de cada alteração da configuração do app, confirme que a exceção de `/games` continua acima das regras de proxy.

O Express serve o frontend compilado e também responde pelo fallback do Vue Router, portanto acessos diretos a `/imoveis`, `/casa` e `/dicas` continuam funcionando.
