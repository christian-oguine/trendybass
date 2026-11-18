// npm run db:migrate: applies new SQL files from src/db/migrations.
import './env.ts'
import { resolve } from 'node:path'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { closeDb, useDb } from '../db/connection.ts'

await migrate(useDb(), { migrationsFolder: resolve(import.meta.dirname, '../db/migrations') })
await closeDb()
console.info('Database is up to date.')
