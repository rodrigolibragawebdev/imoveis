# Deploy na Hostinger

Este projeto usa apenas o fluxo de produção:

```text
push em main
  -> typecheck
  -> build do backend e frontend
  -> publica frontend e API PHP em hostinger-deploy
  -> Hostinger atualiza public_html/imoveis
```

## Configuração do frontend

No Git Deploy da Hostinger, use:

- Branch: `hostinger-deploy`
- Diretório: `/imoveis`

O artefato coloca `index.html`, `assets/`, `.htaccess` e `api/` diretamente nessa pasta. O frontend usa a API do mesmo deploy em `/imoveis/api`.

## Configuração da API

A produção usa PHP 8.2 e SQLite, sem um segundo deploy. Ative as extensões `pdo_sqlite`, `curl`, `dom` e `mbstring` no hPanel. A API cria automaticamente o banco em:

```text
/home/SEU_USUARIO/domains/toolsfera.com/imoveis-data/casa-em-pauta.sqlite
```

Essa pasta fica fora de `public_html`, portanto o banco não é publicado nem apagado pelo auto deploy. O usuário do PHP precisa ter permissão de escrita em `imoveis-data`; normalmente a pasta é criada automaticamente no primeiro acesso.

Depois do deploy, confirme que `https://www.toolsfera.com/imoveis/api/health` e `https://www.toolsfera.com/imoveis/api/properties` respondem com JSON.

## Preservar o projeto em `/games`

Use o conteúdo de [hostinger/public-html.htaccess](hostinger/public-html.htaccess) em `public_html/.htaccess`. A pasta `/imoveis` também recebe seu próprio arquivo, disponível em [hostinger/imoveis.htaccess](hostinger/imoveis.htaccess).

Faça backup de `public_html/games` e do `.htaccess` da raiz antes de substituir qualquer regra.

O `.htaccess` dentro de `/imoveis` responde pelo fallback do Vue Router e deixa `/imoveis/api` ser tratado pelo PHP. Assim, acessos diretos a `/imoveis/casa` e `/imoveis/dicas` continuam funcionando.
