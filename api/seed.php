<?php

declare(strict_types=1);

function seedDatabase(PDO $database): void
{
    seedFurniture($database);
    seedTips($database);
}

function seedFurniture(PDO $database): void
{
    if ((int) $database->query('SELECT COUNT(*) FROM furniture_categories')->fetchColumn() > 0) {
        return;
    }

    $categories = [
        ['Sala', '#B65C3A'],
        ['Cozinha', '#5C7656'],
        ['Quarto', '#A67C52'],
        ['Lavanderia', '#527A7A'],
        ['Escritório', '#7A6652'],
    ];
    $items = [
        ['Sala', 'Sofá confortável', 'https://www.google.com/search?q=sofa+3+lugares', 2500],
        ['Sala', 'Mesa de jantar', 'https://www.google.com/search?q=mesa+de+jantar+4+lugares', 1200],
        ['Sala', 'Rack ou painel para TV', 'https://www.google.com/search?q=rack+painel+tv', 650],
        ['Cozinha', 'Geladeira frost free', 'https://www.google.com/search?q=geladeira+frost+free', 3500],
        ['Cozinha', 'Fogão ou cooktop', 'https://www.google.com/search?q=fogao+5+bocas', 1400],
        ['Cozinha', 'Micro-ondas', 'https://www.google.com/search?q=microondas+30+litros', 700],
        ['Quarto', 'Cama queen', 'https://www.google.com/search?q=cama+queen+box', 1800],
        ['Quarto', 'Guarda-roupa', 'https://www.google.com/search?q=guarda+roupa+casal', 2200],
        ['Lavanderia', 'Máquina de lavar', 'https://www.google.com/search?q=maquina+de+lavar+12kg', 2300],
        ['Escritório', 'Mesa de trabalho', 'https://www.google.com/search?q=mesa+para+escritorio', 700],
        ['Escritório', 'Cadeira ergonômica', 'https://www.google.com/search?q=cadeira+ergonomica+escritorio', 1100],
    ];

    $database->beginTransaction();
    try {
        $insertCategory = $database->prepare('INSERT OR IGNORE INTO furniture_categories (name, color) VALUES (?, ?)');
        foreach ($categories as $category) {
            $insertCategory->execute($category);
        }

        $findCategory = $database->prepare('SELECT id FROM furniture_categories WHERE name = ?');
        $insertItem = $database->prepare(
            "INSERT OR IGNORE INTO furniture_items (category_id, url, title, price, source, is_seeded, updated_at) VALUES (?, ?, ?, ?, 'Lista inicial', 1, CURRENT_TIMESTAMP)",
        );
        foreach ($items as [$categoryName, $title, $url, $price]) {
            $findCategory->execute([$categoryName]);
            $categoryId = $findCategory->fetchColumn();
            if ($categoryId !== false) {
                $insertItem->execute([(int) $categoryId, $url, $title, $price]);
            }
        }
        $database->commit();
    } catch (Throwable $error) {
        if ($database->inTransaction()) {
            $database->rollBack();
        }
        throw $error;
    }
}

function seedTips(PDO $database): void
{
    if ((int) $database->query('SELECT COUNT(*) FROM tips')->fetchColumn() > 0) {
        return;
    }

    $tips = [
        [
            'Documentação e certidões antes de assinar',
            "Peça a matrícula atualizada do imóvel (emitida há no máximo 30 dias) e a certidão de ônus reais, que mostra se existe hipoteca, penhora ou outra pendência sobre o bem.\nExija também as certidões negativas do vendedor (cível, trabalhista, protestos e Receita Federal). Se o imóvel for financiado, o próprio contrato de financiamento substitui a escritura pública — mas o registro em cartório continua obrigatório.",
        ],
        [
            'Vistoria técnica antes de fechar negócio',
            "Teste tomadas, interruptores e o quadro de disjuntores; verifique se há fiação exposta. Abra torneiras e chuveiros para checar pressão e vazamentos, e observe sinais de infiltração no teto e nas paredes.\nAvalie também o entorno: segurança, comércio, transporte público e barulho em horários diferentes do dia. Qualquer problema encontrado deve ser registrado por escrito e negociado antes da assinatura.",
        ],
        [
            'Aprove o crédito antes de se apaixonar pelo imóvel',
            "Simule o financiamento e busque a aprovação prévia (ou pelo menos uma simulação de CET com 2-3 bancos) antes de negociar valor e sinal. Isso evita perder o sinal caso o banco avalie o imóvel por um valor menor que o negociado.\nCompare sempre o Custo Efetivo Total (CET), não só a taxa de juros anunciada — ele inclui juros, seguros obrigatórios (MIP e DFI) e tarifas.",
        ],
        [
            'Negocie e documente tudo por escrito',
            "Combine prazos de entrega, quem paga cada taxa (ITBI, escritura, registro, comissão de corretagem) e o que acontece em caso de atraso — tudo isso deve estar no contrato, não apenas combinado verbalmente.\nGuarde comprovantes de todos os pagamentos (sinal, parcelas, taxas) e só assine a quitação final depois de conferir se o imóvel foi entregue nas condições combinadas na vistoria.",
        ],
    ];

    $insert = $database->prepare('INSERT INTO tips (title, content, sort_order) VALUES (?, ?, ?)');
    foreach ($tips as $index => [$title, $content]) {
        $insert->execute([$title, $content, $index]);
    }
}
