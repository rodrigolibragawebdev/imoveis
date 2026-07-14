import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const bundledFrontend = path.resolve(backendRoot, './public')
const workspaceFrontend = path.resolve(backendRoot, '../frontend/dist')

export const env = {
  port: Number(process.env.PORT ?? 4272),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:4271',
  databasePath: path.resolve(backendRoot, process.env.DATABASE_PATH ?? './data/casa-em-pauta.db'),
  frontendDistPath: path.resolve(
    backendRoot,
    process.env.FRONTEND_DIST_PATH ?? (fs.existsSync(bundledFrontend) ? bundledFrontend : workspaceFrontend),
  ),
}
