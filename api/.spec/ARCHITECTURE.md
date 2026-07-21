# Arquitetura

`index.php` roteia HTTP; módulos de domínio calculam ranking/previews; serializers definem JSON; `database.php` conecta e executa migrations versionadas.

Operações de móveis incluem CRUD individual, status comprado, importação transacional de até 50 itens e exclusão por lista de IDs. `is_purchased` é introduzido pela migration 008 e serializado como `isPurchased`.
