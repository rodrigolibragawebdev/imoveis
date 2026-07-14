import { database } from './connection.js'

const categories = [
  ['Sala', '#B65C3A'],
  ['Cozinha', '#5C7656'],
  ['Quarto', '#A67C52'],
  ['Lavanderia', '#527A7A'],
  ['Escritório', '#7A6652'],
] as const

const items = [
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
] as const

const runSeed = database.transaction(() => {
  const insertCategory = database.prepare(
    'INSERT OR IGNORE INTO furniture_categories (name, color) VALUES (?, ?)',
  )

  for (const category of categories) insertCategory.run(...category)

  const findCategory = database.prepare('SELECT id FROM furniture_categories WHERE name = ?')
  const insertItem = database.prepare(`
    INSERT OR IGNORE INTO furniture_items
      (category_id, url, title, price, source, is_seeded)
    VALUES (?, ?, ?, ?, 'Lista inicial', 1)
  `)

  for (const [categoryName, title, url, price] of items) {
    const category = findCategory.get(categoryName) as { id: number }
    insertItem.run(category.id, url, title, price)
  }
})

runSeed()
console.log('Seed concluída com categorias e itens essenciais para a casa.')

