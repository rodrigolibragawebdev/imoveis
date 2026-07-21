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

- Frontend: `http://localhost:5176`
- API: `http://localhost:5177/api`
- Health check: `http://localhost:5177/api/health`

O banco local fica em `data/casa-em-pauta.sqlite`. As migrations e os dados iniciais são aplicados automaticamente no primeiro acesso à API, sem recriar nem apagar os registros existentes.

## Ranking e organização

- `+1` leva o imóvel ao topo na próxima carga e libera uma nota opcional de 0 a 10.
- Todos os votos preservam o card no lugar atual; a nova posição aparece apenas após atualizar.
- `Muito ruim` oculta o imóvel do ranking principal; o filtro dedicado permite recuperá-lo.
- Bairros desejados recebem prioridade e também podem ser usados como filtro.
- O filtro de duplicatas aponta o mesmo link sem tracking ou candidatos com mesmo bairro, quartos e área praticamente igual. Nada é excluído automaticamente.
- A lista da casa exibe foto, descrição, preço, metadados e ações em linhas responsivas.
- Itens podem ser marcados como comprados, editados ou movidos para a lixeira; o status permanece após recarregar.
- A seleção permite mover todos os itens desejados para a lixeira após confirmação, sem limite fixo de quantidade.
- A **Lixeira** mantém itens inativos no banco, preserva suas variações e permite restaurar um item ou todos de uma vez.
- O botão **Importar JSON** aceita texto colado ou arquivo `.json` de até 100 KB, sem limite fixo de itens na API. A interface envia lotes sequenciais de até 10 itens e mostra cada requisição.
- Ao concluir um lote, o navegador grava um checkpoint no `localStorage`, identificado pelo conteúdo normalizado do arquivo. Se uma requisição falhar, repetir a importação continua do primeiro lote pendente.
- Duplicatas da importação são definidas somente pelo nome normalizado (sem diferença de maiúsculas, acentos ou espaços repetidos). URLs iguais com nomes diferentes são aceitas.
- Títulos não possuem limite próprio de caracteres; continuam sujeitos ao limite total de 100 KB do JSON.
- Falhas internas recebem um código e são registradas em `storage/logs/api-AAAA-MM-DD.log`; os arquivos `.log` não são versionados nem acessíveis pela web.
- Cada item possui o botão **+ Variações** logo abaixo da linha principal. Basta informar outro link; nome, imagem e preço são capturados quando disponíveis e podem ser corrigidos manualmente.

Exemplo de importação:

```json
{
  "items": [
    {
      "category": "Sala",
      "url": "https://loja.com.br/produto/sofa",
      "title": "Sofá de 3 lugares",
      "imageUrl": "https://loja.com.br/imagens/sofa.jpg",
      "price": 2499.9
    },
    {
      "category": "Cozinha",
      "url": "https://loja.com.br/produto/geladeira",
      "price": 3899
    }
  ]
}
```

`category` e `url` são obrigatórios. Use o nome exato de uma categoria já criada. `title`, `imageUrl` e `price` são opcionais; a API tenta preencher os metadados ausentes pelo link.

Links do Zoom tentam preencher nome, imagem e menor preço pelos metadados da página. Quando a proteção do portal impede a leitura, o nome é derivado do próprio link e os demais campos continuam editáveis.

## Scripts

- `npm run dev`: inicia a API PHP e o frontend Vue juntos.
- `npm run dev:api`: inicia somente a API PHP.
- `npm run dev:web`: inicia somente o frontend.
- `npm run typecheck`: valida o TypeScript do frontend.
- `npm run build`: compila o frontend.
- `npm run preview`: serve localmente o build do frontend.
- `php api/tests/integration.php`: valida migrations, ranking, bairros, duplicatas, catálogo, variações e fallback do Zoom em um SQLite temporário.

## Variáveis de ambiente

- `FRONTEND_PORT`: porta do Vite.
- `VITE_APP_BASE_PATH`: base do frontend; localmente `/` e em produção `/imoveis/`.
- `VITE_API_URL`: URL base da API.
- `APP_ORIGIN`: origem autorizada a fazer mutações na API.
- `IMOVEIS_DATABASE_PATH`: caminho do SQLite.

O PHP carrega apenas `APP_ORIGIN` e `IMOVEIS_DATABASE_PATH` do `.env`. O Vite carrega apenas as variáveis usadas pelo frontend. Nunca versione o `.env`.

## Deploy

O push na `main` publica um único artefato na branch `hostinger-deploy`: frontend em `/imoveis` e API em `/imoveis/api`. Consulte [HOSTINGER.md](HOSTINGER.md).
