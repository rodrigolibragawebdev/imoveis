# Arquitetura

`index.php` roteia HTTP; módulos de domínio calculam ranking/previews; serializers definem JSON; `database.php` conecta e executa migrations versionadas.

`bootstrap.php` normaliza o header `Origin` e libera somente a allowlist exata. As origens oficiais com e sem `www` são fixas; `APP_ORIGIN` acrescenta uma origem para ambiente local ou staging.

Operações de móveis incluem CRUD individual, status comprado, importação transacional e soft delete/restauração por lista de IDs. A migration 011 adiciona `deleted_at`; consultas ativas filtram nulos e a lixeira lista somente inativos. Exclusão, restauração e remoção permanente trabalham em blocos de 500 dentro de uma transação; o hard delete filtra obrigatoriamente `deleted_at IS NOT NULL` e remove variações por cascade. O arquivo de importação é limitado a 100 KB no cliente e enviado pelo frontend em lotes sequenciais de até 10 itens. Duplicatas são comparadas apenas pelo nome normalizado; a migration 010 permite a mesma URL com nomes diferentes.

Títulos são armazenados como `TEXT` e não possuem limite específico de caracteres; a API exige apenas texto não vazio quando o campo é obrigatório.

`logger.php` registra exceções e erros fatais em `storage/logs` com código de correlação. O contexto contém método, rota e identificadores do lote, nunca corpo, headers ou cookies.

`agencies.php` reconhece imobiliárias por palavra-chave normalizada no hostname. A migration 012 adiciona a tabela de regras e a atribuição manual/automática aos imóveis. A reavaliação opera somente sobre o modo automático e não altera `properties.updated_at`, preservando o desempate do ranking.

Agendamentos não duplicam a atribuição: suas consultas fazem join com `properties` e `real_estate_agencies`, expondo a imobiliária atual dentro do objeto `property`.

Variações usam `furniture_item_variations`, introduzida pela migration 009, e são serializadas dentro de `FurnitureItem.variations`. O item principal possui CRUD de variações em rotas aninhadas e a FK usa `ON DELETE CASCADE`.
