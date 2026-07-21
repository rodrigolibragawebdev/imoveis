# Validação

Gates: `php -l`, `php api/tests/integration.php`, integração HTTP local quando endpoints mudarem e `npm.cmd run typecheck && npm.cmd run build`. O teste temporário cobre status comprado, títulos longos, URLs principais repetidas, soft delete/restauração, preservação de variações, cascata física do schema e correlação do logger. Smokes HTTP usam banco descartável e nunca tocam no SQLite local.
